/*
  # Update contact_submissions table for job applications

  1. Modified Tables
    - `contact_submissions`
      - Rename columns: `name` → `first_name`, add `last_name`
      - Add `position_applied_for` (text)
      - Add `attachment_url` (text)
      - Keep `email`, `phone`, `message`

  2. Security
    - RLS already enabled on table
    - Existing policies maintained
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'name'
  ) THEN
    ALTER TABLE contact_submissions 
    RENAME COLUMN name TO first_name;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE contact_submissions 
    ADD COLUMN last_name text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'position_applied_for'
  ) THEN
    ALTER TABLE contact_submissions 
    ADD COLUMN position_applied_for text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'attachment_url'
  ) THEN
    ALTER TABLE contact_submissions 
    ADD COLUMN attachment_url text;
  END IF;
END $$;
