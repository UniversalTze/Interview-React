/*
Api for the Applicant Endpoint
*/
import request, { BASE_URL, token } from './mainapi'

const QUESTION_URL = `${BASE_URL}/question`;

/** 
 * Get all questions assoicated wiht an interview
 */
export const getAllQuestions = (id, { signal } = {}) =>
  request(`${QUESTION_URL}?interview_id=eq.${id}`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  })

/**
 * Create an Applicant
 */
export const createQuestion = (post, { signal } = {}) =>
  request(QUESTION_URL, {
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
export const updateQuestion = (id, post, { signal } = {}) =>
  request(`${QUESTION_URL}?id=eq.${id}`, {
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
export const deleteQuestion = (id, { signal } = {}) =>
  request(`${QUESTION_URL}?id=eq.${id}`, {
    method: 'DELETE',
     headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });