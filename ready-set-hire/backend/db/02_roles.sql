-- Roles PostgREST will switch between

CREATE ROLE postgrest LOGIN PASSWORD 'postgrestpw';
CREATE ROLE webdemo NOLOGIN; -- so that postgrest can set role webdemo
GRANT webdemo TO postgrest;

-- Grant schema access
-- ALTER SCHEMA readysethire OWNER TO superReadyUser;
-- USAGE on a schema allows a role to reference objects in schema (nothing to do with table access) "can see the door - not read or modify the room"
GRANT USAGE ON SCHEMA readysethire TO webdemo;

REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- This one is for establishing connection for PostgREST and Postgress. 
-- After establishing connection any requests will be given anon role (if unauthenticated by JWT)
-- or authenticated if correct JWT is present.
-- postgress should only have Login, table priviliges and ability to set role. 

-- GRANT Table access to authenticated
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA readysethire
TO webdemo;

-- For 'id' Serial PRIMARY KEY
-- postgres does: readysethire.interview_id_seq (a sequence so that id is unique)
-- This grants access so that it doesn't fail.
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA readysethire TO webdemo;

INSERT INTO readysethire.INTERVIEW
(title, job_role, "description", "status")
VALUES
('Test Interview', 'Software Engineer', 'Cron job testing interview', 'Open');

INSERT INTO readysethire.QUESTION (interview_id, question, difficulty)
VALUES
(
  (SELECT id FROM readysethire.INTERVIEW WHERE title = 'Test Interview'),
  'Explain how garbage collection works.',
  'Intermediate'
);

INSERT INTO readysethire.QUESTION (interview_id, question, difficulty)
VALUES
(
  (SELECT id FROM readysethire.INTERVIEW WHERE title = 'Test Interview'),
  'What is the difference between REST and GraphQL?',
  'Easy'
);

\echo "Complete with no Errors"