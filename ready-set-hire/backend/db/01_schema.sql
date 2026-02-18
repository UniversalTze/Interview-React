CREATE SCHEMA readysethire;

-- Tables
-- The quotation marks are there to get rid of VS code highlighting the column. 
CREATE TABLE readysethire.INTERVIEW (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    job_role VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE readysethire.QUESTION (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL,
    CONSTRAINT fk_question_interview
        FOREIGN KEY (interview_id)
        REFERENCES readysethire.interview (id)
        ON DELETE CASCADE
);

ALTER TABLE readysethire.QUESTION ADD CONSTRAINT TABLE_QUESTIONTYPE
    CHECK (difficulty IN (
        'Easy',
        'Intermediate',
        'Advanced'
    ));

CREATE TABLE readysethire.APPLICANT (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER NOT NULL,
    title VARCHAR(20) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    email_address VARCHAR(255) NOT NULL,
    interview_status VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL,
    CONSTRAINT fk_applicant_interview
        FOREIGN KEY (interview_id)
        REFERENCES readysethire.interview (id)
        ON DELETE CASCADE
);

CREATE TABLE readysethire.APPLICANT_ANSWER (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    applicant_id INTEGER NOT NULL,
    answer TEXT,
    username VARCHAR(20) NOT NULL,
    CONSTRAINT fk_answer_interview
        FOREIGN KEY (interview_id)
        REFERENCES readysethire.interview (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
        REFERENCES readysethire.question (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_answer_applicant
        FOREIGN KEY (applicant_id)
        REFERENCES readysethire.applicant (id)
        ON DELETE CASCADE
);