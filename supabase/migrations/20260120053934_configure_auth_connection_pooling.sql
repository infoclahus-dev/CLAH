/*
  # Configure Auth Server Connection Pooling Strategy

  ## Changes Made

  1. Auth Configuration
    - Change auth server connection pooling from fixed number to percentage-based
    - This allows the auth server to scale connection usage based on available database connections
    - Uses 10% of available connections for auth server (more scalable approach)

  ## Technical Details
    - The auth.config table stores Supabase Auth configuration
    - The db_pool_size setting controls how many connections the auth server uses
    - Setting it to a percentage (e.g., "10%") instead of a fixed number (e.g., "10") 
      allows it to scale automatically with database upgrades
*/

-- Update auth server to use percentage-based connection pooling
DO $$
BEGIN
  -- Check if the auth.config table exists (it's a Supabase system table)
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'auth' 
    AND table_name = 'config'
  ) THEN
    -- Update the db_pool_size to use percentage
    UPDATE auth.config 
    SET value = '10%'
    WHERE key = 'db_pool_size';
    
    -- If the setting doesn't exist, insert it
    IF NOT FOUND THEN
      INSERT INTO auth.config (key, value)
      VALUES ('db_pool_size', '10%')
      ON CONFLICT (key) DO UPDATE
      SET value = '10%';
    END IF;
  END IF;
END $$;
