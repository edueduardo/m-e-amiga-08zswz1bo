-- This migration documents the schema change for the `ai_response` column
-- in the `virtual_man_interactions` table to include an optional `references` array.
-- The column type remains `jsonb`, so no structural DDL changes are needed.

-- The expected JSON structure for `ai_response` is now updated to include references:
-- {
--   "disclaimer": "string",
--   "communication": "string",
--   "social_behaviors": "string",
--   "expectations_insecurities": "string",
--   "family_situations": "string",
--   "practical_tips": ["string", "string", "string"],
--   "references": [
--     {
--       "type": "string", -- e.g., "book", "article", "website", "research_paper"
--       "title": "string",
--       "author": "string | null",
--       "publisher": "string | null",
--       "url": "string | null",
--       "date": "string | null" -- e.g., "YYYY-MM-DD" or "YYYY"
--     }
--   ] | null
-- }

-- No DDL commands are necessary as the column type is already flexible (jsonb).
-- This file serves as documentation for the evolving schema.


