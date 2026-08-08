import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file to ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
  );
}

/**
 * Supabase client instance configured with project URL and anonymous key.
 * Used for both client-side queries (when RLS permits) and Server Actions.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Type definition for a Portfolio Project.
 */
export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  created_at: string;
  updated_at: string;
}

/**
 * Type definition for a Portfolio Case Study.
 */
export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  created_at: string;
  updated_at: string;
}

/**
 * Type definition for a Creative Design Asset.
 */
export interface Design {
  id: string;
  title: string;
  image: string; // Cloudinary secure URL
  aspect_ratio: string;
  created_at: string;
  updated_at: string;
}

/**
 * Type definition for a Career/Experience item.
 */
export interface Experience {
  id: string;
  company: string;
  role: string;
  dates: string;
  created_at: string;
  updated_at: string;
}

/**
 * Type definition for Highlight Statistics count metrics.
 */
export interface Stats {
  id: string; // 'projects' | 'designs' | 'case-studies'
  value: string;
  label: string;
  offset_class: string;
  created_at: string;
  updated_at: string;
}

/**
 * Type definition for contact form message submissions.
 */
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submitted_at?: string;
}

/**
 * Type definition for an uploaded Resume record.
 */
export interface Resume {
  id: string;
  filename: string;
  storage_url: string;
  file_size?: number;
  version?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Type definition for a Resume request submission.
 */
export interface ResumeRequest {
  id: string;
  email: string;
  name?: string;
  message?: string;
  requested_at?: string;
}

/**
 * Type definition for expanded project detail sections.
 */
export interface ProjectDetail {
  id: string;
  project_id: string;
  section1_title?: string | null;
  section1_text?: string | null;
  section1_image_url?: string | null;
  section2_title?: string | null;
  section2_text?: string | null;
  section2_image_url?: string | null;
  section3_title?: string | null;
  section3_image_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
