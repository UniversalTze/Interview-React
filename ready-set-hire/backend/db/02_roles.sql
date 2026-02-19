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
(title, job_role, "description", "status", username)
VALUES
('Test Interview', 'Software Engineer', 'testing interview, so that there is one on start-up', 'Open', 's4703754');

INSERT INTO readysethire.QUESTION (interview_id, question, difficulty, username)
VALUES
(
  (SELECT id FROM readysethire.INTERVIEW WHERE title = 'Test Interview'),
  'Explain how garbage collection works.',
  'Intermediate',
  's4703754'
);

INSERT INTO readysethire.QUESTION (interview_id, question, difficulty, username)
VALUES
(
  (SELECT id FROM readysethire.INTERVIEW WHERE title = 'Test Interview'),
  'What is the difference between REST and GraphQL?',
  'Easy',
  's4703754'
);

-- Applicant 1: Completed all questions
INSERT INTO readysethire.APPLICANT
(interview_id, title, firstname, surname, phone_number, email_address, interview_status, username)
VALUES
(
  (SELECT id FROM readysethire.INTERVIEW WHERE title = 'Test Interview'),
  'Mr',
  'John',
  'Doe',
  '1234567890',
  'john.doe@example.com',
  'Completed',
  's4703754'
);

-- Applicant 2: Has not done any questions yet
INSERT INTO readysethire.APPLICANT
(interview_id, title, firstname, surname, phone_number, email_address, interview_status, username)
VALUES
(
  (SELECT id FROM readysethire.INTERVIEW WHERE title = 'Test Interview'),
  'Ms',
  'Jane',
  'Smith',
  '9876543210',
  'jane.smith@example.com',
  'Pending',
  's4703754'
);

-- Applicant 1 answers all questions
INSERT INTO readysethire.APPLICANT_ANSWER (interview_id, question_id, applicant_id, answer, username)
SELECT 
    i.id,
    q.id,
    a.id,
    CASE 
        WHEN q.question = 'Explain how garbage collection works.' THEN 'Garbage collection automatically frees memory that is no longer used by the program.'
        WHEN q.question = 'What is the difference between REST and GraphQL?' THEN 'REST uses fixed endpoints and multiple requests; GraphQL allows fetching exactly what you need in a single request.'
    END AS answer,
    's4703754'
FROM readysethire.INTERVIEW i
JOIN readysethire.QUESTION q ON q.interview_id = i.id
JOIN readysethire.APPLICANT a ON a.interview_id = i.id
WHERE i.title = 'Test Interview'
  AND a.firstname = 'John';

\echo 'Complete with no Errors'