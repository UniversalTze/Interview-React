/*
Api for the Applicant's answer end point
*/
import request, { BASE_URL, token } from './mainapi'

const APPLICANT_ANS_URL = `${BASE_URL}/applicant_answer`;

/** 
 * Get all answers assoicated wiht an applicant and interview
 */
export const getApplicantAnsSpecificInterview = (interviewid, applicantid,  { signal } = {}) =>
  request(`${APPLICANT_ANS_URL}?applicant_id=eq.${applicantid}&interview_id=eq.${interviewid}&order=id.asc`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });

/**
 * Get all applicants answers
 */
export const getAllApplicantAnswers = (applicantid,  { signal } = {}) =>
  request(`${APPLICANT_ANS_URL}?applicant_id=eq.${applicantid}&order=id.asc`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });

/**
 * Create an Applicant answer
 */
export const createApplicantAnswer = (post, { signal } = {}) =>
  request(APPLICANT_ANS_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Update a Question
 */
export const updateApplicantAnswer = (id, post, { signal } = {}) =>
  request(`${APPLICANT_ANS_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Delete a Question
 */
export const deleteApplicantAnswer = (id, { signal } = {}) =>
  request(`${APPLICANT_ANS_URL}?id=eq.${id}`, {
    method: 'DELETE',
     headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });