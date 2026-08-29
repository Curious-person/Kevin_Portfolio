-- 2026-08-13: Migrate designs table from class-based aspect ratios to width/height dimensions
-- Dialect: PostgreSQL (Supabase)

ALTER TABLE designs
ADD COLUMN IF NOT EXISTS width INTEGER,
ADD COLUMN IF NOT EXISTS height INTEGER;

-- Backfill dimensions for existing records that only have class-style aspect ratios.
UPDATE designs
SET
  width = CASE
    WHEN width IS NULL AND aspect_ratio = 'aspect-[2/3]' THEN 800
    WHEN width IS NULL THEN 1000
    ELSE width
  END,
  height = CASE
    WHEN height IS NULL AND aspect_ratio = 'aspect-[2/3]' THEN 1200
    WHEN height IS NULL THEN 1000
    ELSE height
  END;

ALTER TABLE designs
ALTER COLUMN width SET NOT NULL,
ALTER COLUMN height SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'designs_width_height_positive'
  ) THEN
    ALTER TABLE designs
    ADD CONSTRAINT designs_width_height_positive CHECK (width > 0 AND height > 0);
  END IF;
END $$;

ALTER TABLE designs
DROP COLUMN IF EXISTS aspect_ratio;

ALTER TABLE designs
ADD COLUMN aspect_ratio NUMERIC GENERATED ALWAYS AS ((width::DECIMAL / NULLIF(height, 0))) STORED;

-- Ensure read access stays public and server-side ingest can write.
GRANT SELECT ON TABLE designs TO anon, authenticated;
GRANT INSERT, SELECT ON TABLE designs TO service_role;
