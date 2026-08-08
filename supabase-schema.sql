-- =========================================================================
-- KEVIN PORTFOLIO SUPABASE SCHEMA SQL
-- Paste this file directly into the Supabase SQL Editor.
-- =========================================================================

-- Enable pgcrypto extension for gen_random_uuid() (included by default in modern pg, but good practice to ensure)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- -------------------------------------------------------------------------
-- 1. UTILITY: Trigger function to update updated_at automatically
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- -------------------------------------------------------------------------
-- 2. PROJECTS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read-only access
CREATE POLICY "Allow public read access on projects" 
ON projects FOR SELECT 
USING (true);

-- Auto-update updated_at trigger
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------------------------
-- 3. CASE STUDIES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read-only access
CREATE POLICY "Allow public read access on case_studies" 
ON case_studies FOR SELECT 
USING (true);

-- Auto-update updated_at trigger
CREATE TRIGGER update_case_studies_updated_at 
    BEFORE UPDATE ON case_studies 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------------------------
-- 4. DESIGNS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL, -- Holds Cloudinary secure URL
    aspect_ratio VARCHAR(50) DEFAULT 'aspect-square' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read-only access
CREATE POLICY "Allow public read access on designs" 
ON designs FOR SELECT 
USING (true);

-- Auto-update updated_at trigger
CREATE TRIGGER update_designs_updated_at 
    BEFORE UPDATE ON designs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------------------------
-- 5. EXPERIENCE TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    dates VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read-only access
CREATE POLICY "Allow public read access on experience" 
ON experience FOR SELECT 
USING (true);

-- Auto-update updated_at trigger
CREATE TRIGGER update_experience_updated_at 
    BEFORE UPDATE ON experience 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------------------------
-- 6. STATS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stats (
    id VARCHAR(50) PRIMARY KEY, -- Static identifiers: 'projects', 'designs', 'case-studies'
    value VARCHAR(20) NOT NULL,
    label VARCHAR(100) NOT NULL,
    offset_class VARCHAR(50) DEFAULT 'lg:translate-y-0' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read-only access
CREATE POLICY "Allow public read access on stats" 
ON stats FOR SELECT 
USING (true);

-- Grant table privilege to public Supabase roles
GRANT SELECT ON TABLE stats TO anon, authenticated;

-- Auto-update updated_at trigger
CREATE TRIGGER update_stats_updated_at 
    BEFORE UPDATE ON stats 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------------------------
-- 7. CONTACT SUBMISSIONS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (public anonymous) to INSERT contact submissions
CREATE POLICY "Allow public insert access on contact_submissions" 
ON contact_submissions FOR INSERT 
WITH CHECK (true);

-- Policy: Block read access to public, only authenticated users (or none) can select
CREATE POLICY "Allow only authenticated users to view submissions" 
ON contact_submissions FOR SELECT 
TO authenticated 
USING (true);

-- -------------------------------------------------------------------------
-- 8. PROJECT DETAILS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    section1_title VARCHAR(255),
    section1_text TEXT,
    section1_image_url TEXT,
    section2_title VARCHAR(255),
    section2_text TEXT,
    section2_image_url TEXT,
    section3_title VARCHAR(255),
    section3_image_url TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_details ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read-only access
CREATE POLICY "Allow public read access on project_details"
ON project_details FOR SELECT
USING (true);

-- Grant table privilege to public Supabase roles
GRANT SELECT ON TABLE project_details TO anon, authenticated;

-- =========================================================================
-- 9. SEED DATA INSERTS
-- =========================================================================

-- Seed Projects
INSERT INTO projects (number, title, description, tag) VALUES
('Project 1', 'NU Space', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'System Design'),
('Project 2', 'NU Space', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'System Design'),
('Project 3', 'NU Space', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'System Design');

-- Seed Case Studies
INSERT INTO case_studies (number, title, description, tag) VALUES
('Case Study 1', 'Onboarding Redesign', 'An in-depth user research and design project aimed at identifying and fixing user retention leaks during onboarding, resulting in a 28% completion increase.', 'UX Research & Design'),
('Case Study 2', 'A11y Audit & Update', 'A deep dive into WCAG 2.1 AAA accessibility auditing and user flows redesign for an enterprise platform serving 500k+ active users.', 'Web Accessibility');

-- Seed Designs (Replace these placeholder images with Cloudinary URLs during setup)
INSERT INTO designs (title, image, aspect_ratio) VALUES
('Vesper Crypto Wallet', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop', 'aspect-square'),
('Zenith Mobile App', 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop', 'aspect-[2/3]'),
('Aura Workspace System', 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=600&auto=format&fit=crop', 'aspect-[2/3]'),
('Aether Landing Page', 'https://images.unsplash.com/photo-1785301973694-d95aebf5bdb8?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==', 'aspect-square'),
('Smart Home Interface', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop', 'aspect-square'),
('Futuristic Core Render', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop', 'aspect-[2/3]');

-- Seed Experiences
INSERT INTO experience (company, role, dates) VALUES
('Nexvision Innovations, Inc.', 'Full-Stack and WordPress Developer Intern', 'February 2026 - April 2026'),
('Technology Services Office, NU Manila', 'UI/UX Intern', 'December 2025 - February 2026'),
('Google Developer Groups Manila', 'Technical Production Executive', 'July 2025 - September 2025');

-- Seed Stats
INSERT INTO stats (id, value, label, offset_class) VALUES
('projects', '10', 'Projects', 'lg:translate-y-0'),
('designs', '3', 'Designs', 'lg:translate-y-0'),
('case-studies', '4', 'Case studies', 'lg:translate-y-0');
