'use server';

import * as z from "zod";
import { Resend } from "resend";
import { supabase, Resume } from "@/lib/supabase";

const resumeRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  name: z.string().optional(),
  message: z.string().optional(),
});

type ResumeRequestValues = z.infer<typeof resumeRequestSchema>;

type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function getResumeUrl(): Promise<string | null> {
  if (process.env.NEXT_PUBLIC_RESUME_DOWNLOAD_URL) {
    return process.env.NEXT_PUBLIC_RESUME_DOWNLOAD_URL;
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("storage_url")
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Resume fetch error:", error);
    return null;
  }

  return (data as Pick<Resume, "storage_url"> | null)?.storage_url || null;
}

export async function submitResumeRequest(
  formData: ResumeRequestValues
): Promise<ActionResponse> {
  try {
    const validationResult = resumeRequestSchema.safeParse(formData);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues.map((issue) => issue.message).join(" ");
      return { success: false, error: `Validation failed: ${errorMessage}` };
    }

    const { email, name, message } = validationResult.data;

    const { error: dbError } = await supabase.from("resume_requests").insert({
      email,
      name: name || null,
      message: message || null,
    });

    if (dbError) {
      console.error("Supabase resume request insertion failed:", dbError.message);
      return {
        success: false,
        error: "Failed to store your resume request. Please try again later.",
      };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.warn("Resend email credentials missing from environment variables.");
      return {
        success: true,
        message: "Your resume request was saved, but the email notifications could not be sent because email credentials are not fully configured.",
      };
    }

    const resumeUrl = await getResumeUrl();
    const resend = new Resend(resendApiKey);

    const requestorHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0392ea; padding: 24px; color: white; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Resume Request Received</h1>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #1f2937;">
          <h2 style="margin: 0 0 12px 0; font-size: 18px;">Thank you for your interest.</h2>
          <p style="margin: 0 0 16px 0; line-height: 1.6;">Your resume request was processed through Resend. You can download the resume using the link below:</p>
          <p style="margin: 0 0 20px 0;"><a href="${resumeUrl || "#"}" style="color: #0392ea; text-decoration: none; font-weight: 600;">Download Kevin_Resume.pdf</a></p>
          <p style="margin: 0; line-height: 1.6;">Looking forward to connecting.</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "My Resume - Kevin Portfolio",
      html: requestorHtml,
    });

    const ownerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0392ea; padding: 24px; color: white; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Resume Requested</h1>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #1f2937;">
          <p style="margin: 0 0 12px 0; line-height: 1.6;"><strong>${name || "Someone"}</strong> requested your resume through Resend.</p>
          <p style="margin: 0 0 12px 0; line-height: 1.6;">Email: <a href="mailto:${email}" style="color: #0392ea; text-decoration: none;">${email}</a></p>
          ${message ? `<p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">Message: ${message}</p>` : ""}
        </div>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Resume Requested - ${name || email}`,
      html: ownerHtml,
    });

    return {
      success: true,
      message: "Your resume request was sent successfully!",
    };
  } catch (error) {
    console.error("Resume request error:", error);
    return {
      success: false,
      error: "Failed to process request",
    };
  }
}