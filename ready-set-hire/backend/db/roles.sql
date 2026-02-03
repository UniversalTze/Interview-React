-- Roles PostgREST will switch between
CREATE ROLE anon NOLOGIN;
CREATE ROLE authenticated NOLOGIN;
CREATE ROLE postgrest LOGIN PASSWORD 'postgrestpw';


-- This one is for establishing connection for PostgREST and Postgress. 
-- After establishing connection any requests will be given anon role (if unauthenticated by JWT)
-- or authenticated if correct JWT is present.
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA readysethire TO postgrest;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA readysethire TO postgrest;

-- GRANT Table access to authenticated
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA readysethire
TO authenticated;

-- For 'id' Serial PRIMARY KEY
-- postgres does: readysethire.interview_id_seq (a sequence so that id is unique)
-- This grants access so that it doesn't fail.
GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA readysethire
TO authenticated;