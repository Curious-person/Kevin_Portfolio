'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

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
      <div className="glass-panel" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '500px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Thank you!
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your message has been sent successfully. I will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600 }}>Get in Touch</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input id="name" className="form-input" placeholder="John Doe" {...register('name')} />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
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

        <div className="form-group">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="form-input"
            placeholder="Your message here..."
            rows={4}
            {...register('message')}
          />
          {errors.message && <span className="form-error">{errors.message.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%' }}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
