'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="glass-panel text-center w-full max-w-[500px] mx-auto p-8 md:p-10">
        <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">
          Thank you!
        </h3>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Your message has been sent successfully. I will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel w-full max-w-[500px] mx-auto p-6 md:p-10 transition-all duration-300">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight text-foreground text-center md:text-left">
        Get in Touch
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="form-group mb-0">
          <label className="form-label text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="name">
            Name
          </label>
          <input id="name" className="form-input" placeholder="John Doe" {...register('name')} />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-group mb-0">
          <label className="form-label text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="john@example.com"
            {...register('email')}
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>

        <div className="form-group mb-0">
          <label className="form-label text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="form-input resize-none"
            placeholder="Your message here..."
            rows={4}
            {...register('message')}
          />
          {errors.message && <span className="form-error">{errors.message.message}</span>}
        </div>

        <Button type="submit" className="w-full py-6 text-sm font-semibold transition-all duration-300" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
