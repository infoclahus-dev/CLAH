/*
  # Fix Security Issues in contact_submissions table

  ## Changes Made

  1. Security Improvements
    - Replace the insecure "Anyone can submit contact form" policy that had `WITH CHECK (true)`
    - Add proper validation to ensure required fields are not empty
    - Validate email format using basic regex pattern
    - Limit message length to prevent abuse (max 5000 characters)
    - Ensure name fields are reasonable length (max 200 characters each)

  2. Policy Details
    - Policy still allows anonymous users to submit contact forms
    - BUT now validates that:
      * first_name is not empty and max 200 chars
      * email is valid format and not empty
      * message is not empty and max 5000 chars
      * Optional fields (phone, service_interest, position_applied_for) can be empty
*/

-- Drop the insecure policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

-- Drop any existing authenticated policy to recreate it
DROP POLICY IF EXISTS "Allow validated submissions from authenticated users" ON contact_submissions;

-- Create a new secure policy with proper validation for anonymous users
CREATE POLICY "Allow validated contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Validate first_name: not empty and reasonable length
    first_name IS NOT NULL 
    AND length(trim(first_name)) > 0 
    AND length(first_name) <= 200
    
    -- Validate email: not empty, valid format, and reasonable length
    AND email IS NOT NULL 
    AND length(trim(email)) > 0
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 200
    
    -- Validate message: not empty and reasonable length
    AND message IS NOT NULL 
    AND length(trim(message)) > 0 
    AND length(message) <= 5000
    
    -- Optional fields can be null or empty, but if provided, should have reasonable length
    AND (last_name IS NULL OR length(last_name) <= 200)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (service_interest IS NULL OR length(service_interest) <= 200)
    AND (position_applied_for IS NULL OR length(position_applied_for) <= 200)
    AND (attachment_url IS NULL OR length(attachment_url) <= 2048)
  );

-- Also add policy for authenticated users to submit (in case they're logged in)
CREATE POLICY "Allow validated submissions from authenticated users"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Same validation rules
    first_name IS NOT NULL 
    AND length(trim(first_name)) > 0 
    AND length(first_name) <= 200
    
    AND email IS NOT NULL 
    AND length(trim(email)) > 0
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 200
    
    AND message IS NOT NULL 
    AND length(trim(message)) > 0 
    AND length(message) <= 5000
    
    AND (last_name IS NULL OR length(last_name) <= 200)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (service_interest IS NULL OR length(service_interest) <= 200)
    AND (position_applied_for IS NULL OR length(position_applied_for) <= 200)
    AND (attachment_url IS NULL OR length(attachment_url) <= 2048)
  );
