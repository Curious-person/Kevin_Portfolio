-- =========================================================================
-- MIGRATION: REFACTOR PROJECT DETAILS TO PROJECT SECTIONS (1-TO-MANY)
-- Paste and execute this file in your Supabase SQL Editor.
-- =========================================================================

-- 1. Ensure projects table exists
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow public read access on projects'
    ) THEN
        CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
    END IF;
END $$;

-- 2. Create project_sections table
CREATE TABLE IF NOT EXISTS project_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    sequence_order INTEGER NOT NULL,
    title VARCHAR(255),
    content_text TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE project_sections ENABLE ROW LEVEL SECURITY;

-- Create policy for public read-only access
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'project_sections' AND policyname = 'Allow public read access on project_sections'
    ) THEN
        CREATE POLICY "Allow public read access on project_sections" ON project_sections FOR SELECT USING (true);
    END IF;
END $$;

-- Grant table read permissions
GRANT SELECT ON TABLE project_sections TO anon, authenticated;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_project_sections_updated_at ON project_sections;
CREATE TRIGGER update_project_sections_updated_at
    BEFORE UPDATE ON project_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------------------------
-- 3. DATA MIGRATION: Migrate data from legacy project_details
-- -------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'project_details') THEN
        -- Section 1 Migration
        INSERT INTO project_sections (project_id, sequence_order, title, content_text, image_url, created_at, updated_at)
        SELECT 
            pd.project_id,
            1 AS sequence_order,
            pd.section1_title,
            pd.section1_text,
            pd.section1_image_url,
            COALESCE(pd.created_at, NOW()) AT TIME ZONE 'UTC',
            COALESCE(pd.updated_at, NOW()) AT TIME ZONE 'UTC'
        FROM project_details pd
        JOIN projects p ON p.id = pd.project_id
        WHERE pd.section1_title IS NOT NULL OR pd.section1_text IS NOT NULL OR pd.section1_image_url IS NOT NULL;

        -- Section 2 Migration
        INSERT INTO project_sections (project_id, sequence_order, title, content_text, image_url, created_at, updated_at)
        SELECT 
            pd.project_id,
            2 AS sequence_order,
            pd.section2_title,
            pd.section2_text,
            pd.section2_image_url,
            COALESCE(pd.created_at, NOW()) AT TIME ZONE 'UTC',
            COALESCE(pd.updated_at, NOW()) AT TIME ZONE 'UTC'
        FROM project_details pd
        JOIN projects p ON p.id = pd.project_id
        WHERE pd.section2_title IS NOT NULL OR pd.section2_text IS NOT NULL OR pd.section2_image_url IS NOT NULL;

        -- Section 3 Migration
        INSERT INTO project_sections (project_id, sequence_order, title, content_text, image_url, created_at, updated_at)
        SELECT 
            pd.project_id,
            3 AS sequence_order,
            pd.section3_title,
            NULL AS content_text,
            pd.section3_image_url,
            COALESCE(pd.created_at, NOW()) AT TIME ZONE 'UTC',
            COALESCE(pd.updated_at, NOW()) AT TIME ZONE 'UTC'
        FROM project_details pd
        JOIN projects p ON p.id = pd.project_id
        WHERE pd.section3_title IS NOT NULL OR pd.section3_image_url IS NOT NULL;
    END IF;
END $$;

-- -------------------------------------------------------------------------
-- 4. CLEANUP: Drop legacy project_details table
-- -------------------------------------------------------------------------
DROP TABLE IF EXISTS project_details CASCADE;
