-- Enable the pg_cron extension to allow for scheduled jobs.
-- This is required by subsequent migrations that use cron.schedule().
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
