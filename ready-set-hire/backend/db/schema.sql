-- Roles PostgREST will switch between
CREATE ROLE anon NOLOGIN;
CREATE ROLE authenticated NOLOGIN;
CREATE SCHEMA readysethire;

-- Grant schema access
ALTER SCHEMA readysethire OWNER TO superReadyUser;

REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- Tables
CREATE TABLE INTERVIEW (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    job_role VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
);

CREATE TABLE QUESTION (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    CONSTRAINT fk_question_interview
        FOREIGN KEY (interview_id)
        REFERENCES interview (id)
        ON DELETE CASCADE
);

ALTER TABLE QUESTION ADD CONSTRAINT TABLE_QUESTIONTYPE
    CHECK (difficulty IN (
        'Easy',
        'Intermediate',
        'Advanced'
    ));

CREATE TABLE APPLICANT (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER NOT NULL,
    title VARCHAR(20) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    email_address VARCHAR(255) NOT NULL,
    interview_status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_applicant_interview
        FOREIGN KEY (interview_id)
        REFERENCES interview (id)
        ON DELETE CASCADE
);

CREATE TABLE APPLICANT_ANSWER (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    applicant_id INTEGER NOT NULL,
    answer TEXT,
    CONSTRAINT fk_answer_interview
        FOREIGN KEY (interview_id)
        REFERENCES interview (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
        REFERENCES question (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_answer_applicant
        FOREIGN KEY (applicant_id)
        REFERENCES applicant (id)
        ON DELETE CASCADE
);
