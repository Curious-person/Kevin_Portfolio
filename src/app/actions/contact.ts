"use server";

import * as z from "zod";
import { Resend } from "resend";
import { supabase, ContactSubmission } from "@/lib/supabase";

// Contact form input validation schema
const contactActionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactActionValues = z.infer<typeof contactActionSchema>;

interface ActionResponse {
  success: boolean;
  message?: string;
  warning?: string;
  error?: string;
}

/**
 * Server Action that handles contact form submissions.
 * Validates inputs, saves them to Supabase, and emails the portfolio owner via Resend.
 * 
 * @param formData Raw contact submission form details.
 * @returns An ActionResponse indicating success, errors, or warnings.
 */
export async function submitContact(formData: ContactActionValues): Promise<ActionResponse> {
  try {
    // 1. Validate form fields
    const validationResult = contactActionSchema.safeParse(formData);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues.map((e) => e.message).join(" ");
      return { success: false, error: `Validation failed: ${errorMessage}` };
    }

    const { name, email, phone, subject, message } = validationResult.data;

    // 2. Insert into Supabase
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        subject,
        message,
      } as ContactSubmission);

    if (dbError) {
      console.error("Supabase contact insertion failed:", dbError.message);
      return { 
        success: false, 
        error: "Failed to store your submission in our database. Please try again later." 
      };
    }

    // 3. Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.warn("Resend email credentials missing from environment variables.");
      return {
        success: true,
        message: "Your message was saved successfully in our database!",
        warning: "Owner notification email could not be sent because email credentials are not fully configured.",
      };
    }

    try {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0392ea; padding: 24px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 4px 0 0 0; opacity: 0.9;">Portfolio of Kevin Abgao</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #4a5568; line-height: 1.5; margin-bottom: 24px;">
              You have received a new inquiry from your portfolio website. Detail summary:
            </p>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">
                  <a href="mailto:${email}" style="color: #0392ea; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748; font-weight: bold;">${subject}</td>
              </tr>
            </table>

            <div style="background-color: #f7fafc; border-radius: 8px; padding: 16px; border-left: 4px solid #0392ea;">
              <h4 style="margin: 0 0 8px 0; color: #4a5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message</h4>
              <p style="margin: 0; color: #2d3748; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f7fafc; padding: 16px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7;">
            Sent automatically from your Portfolio Web Portal.
          </div>
        </div>
      `;

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `[Portfolio Inquiry] ${subject}`,
        html: htmlContent,
      });

      return {
        success: true,
        message: "Thank you! Your message has been saved and sent successfully.",
      };
    } catch (emailErr: any) {
      console.error("Resend email delivery failed:", emailErr?.message || emailErr);
      return {
        success: true,
        message: "Your message was saved successfully in our database!",
        warning: "We saved your message, but failed to send the email notification. Please check your admin console.",
      };
    }
  } catch (err: any) {
    console.error("Unexpected error in submitContact Server Action:", err);
    return {
      success: false,
      error: "An unexpected system error occurred. Please try again later.",
    };
  }
}
