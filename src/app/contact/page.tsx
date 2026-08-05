"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PortfolioNav } from "@/components/portfolio-nav";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/actions/contact";
import { SendIcon, MapPinIcon, PhoneIcon, MessageIcon } from "@/lib/constants";

// Form validation schema matching user specifications
const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactPill({ 
    icon: Icon, 
    title, 
    description 
}: { 
    icon: React.ComponentType<{ className?: string }>; 
    title: string; 
    description: string 
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#f2f2f2]">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-lg font-bold text-[#444]">{title}</p>
                <p className="mt-1 text-sm leading-5 text-[#444]">{description}</p>
            </div>
        </div>
    );
}

/**
 * Contact Page Client Component.
 * Integrates React Hook Form, Zod validation, and the submitContact Server Action.
 */
export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            const response = await submitContact(data);

            if (response.success) {
                if (response.warning) {
                    alert(`${response.message}\n\nNotice: ${response.warning}`);
                } else {
                    alert(response.message || "Thank you! Your message has been sent successfully.");
                }
                reset();
            } else {
                alert(response.error || "Failed to submit. Please check your connection and try again.");
            }
        } catch (err) {
            console.error("Failed to submit contact form:", err);
            alert("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <main className="bg-white text-foreground">
            <section className="mx-auto min-h-screen max-w-432 px-4 pb-10 pt-28 sm:px-8 lg:px-36.25">
                <PortfolioNav active="contact" />

                <div className="mt-24 grid gap-12 lg:grid-cols-[468px_minmax(0,380px)] lg:justify-between lg:gap-16">
                    <div className="max-w-117">
                        <h1 className="font-serif text-[clamp(3rem,4vw,4rem)] leading-none text-black">
                            Have a project in mind?
                        </h1>
                        <p className="mt-4 text-base leading-6 text-[#444]">
                            Let’s build something incredible together. Whether you need a complete design system, a responsive web application, or just want to chat about user-centered design, drop me a line.
                        </p>

                        <div className="mt-8 space-y-6">
                            <ContactPill
                                icon={MessageIcon}
                                title="Drop a message"
                                description="I’ll get back to you within 24 hours."
                            />
                            <ContactPill
                                icon={PhoneIcon}
                                title="Book a Discovery Call"
                                description="Let’s talk architecture and interface — Available Mon-Fri, 9 AM to 6 PM."
                            />
                            <ContactPill
                                icon={MapPinIcon}
                                title="Based In"
                                description="Antipolo, Rizal (Available for remote work worldwide)"
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="text-[14px] font-semibold text-[#71717a]">
                                Your Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                aria-invalid={!!errors.name}
                                className="h-10 "
                                {...register("name")}
                            />
                            {errors.name && (
                                <span className="text-xs font-medium text-destructive">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-[14px] font-semibold text-[#71717a]">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@domain.com"
                                    aria-invalid={!!errors.email}
                                    className="h-10 "
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-xs font-medium text-destructive">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phone" className="text-[14px] font-semibold text-[#71717a]">
                                    Phone (optional)
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 332 245 666"
                                    aria-invalid={!!errors.phone}
                                    className="h-10 "
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <span className="text-xs font-medium text-destructive">
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="subject" className="text-[14px] font-semibold text-[#71717a]">
                                Subject
                            </Label>
                            <Input
                                id="subject"
                                placeholder="Which topic are you interested in?"
                                aria-invalid={!!errors.subject}
                                className="h-10 "
                                {...register("subject")}
                            />
                            {errors.subject && (
                                <span className="text-xs font-medium text-destructive">
                                    {errors.subject.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="message" className="text-[14px] font-semibold text-[#71717a]">
                                Your message
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here."
                                aria-invalid={!!errors.message}
                                className="min-h-30 py-3"
                                {...register("message")}
                            />
                            {errors.message && (
                                <span className="text-xs font-medium text-destructive">
                                    {errors.message.message}
                                </span>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-10 w-full gap-2 bg-[#0392ea] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
                        >
                            {isSubmitting ? "Sending..." : "Send Now"}
                            <SendIcon className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </section>
        </main>
    );
}
