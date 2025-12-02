/*
Api for the Applicant's answer end point
*/
import request, { BASE_URL, token } from './mainapi'

const APPLICANT_ANS_URL = `${BASE_URL}/applicant_answer`;

/**
 * Fetch all answers associated with a specific applicant and interview.
 *
 * @param {number|string} interviewid - The ID of the interview.
 * @param {number|string} applicantid - The ID of the applicant.
 * @param {Object} [options] - Optional fetch options.
 * @param {AbortSignal} [options.signal] - Signal to cancel the request.
 * @returns {Promise<Object[]>} - A promise resolving to an array of applicant answers.
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
 * Fetch all answers submitted by a specific applicant.
 *
 * @param {number|string} applicantid - The ID of the applicant.
 * @param {Object} [options] - Optional fetch options.
 * @param {AbortSignal} [options.signal] - Signal to cancel the request.
 * @returns {Promise<Object[]>} - A promise resolving to an array of applicant answers.
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
 * Create a new applicant answer.
 *
 * @param {Object} post - The applicant answer data to create.
 * @param {Object} [options] - Optional fetch options.
 * @param {AbortSignal} [options.signal] - Signal to cancel the request.
 * @returns {Promise<Object>} - A promise resolving to the created answer.
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
 * Update an existing applicant answer by ID.
 *
 * @param {number|string} id - The ID of the answer to update.
 * @param {Object} post - The updated applicant answer data.
 * @param {Object} [options] - Optional fetch options.
 * @param {AbortSignal} [options.signal] - Signal to cancel the request.
 * @returns {Promise<Object>} - A promise resolving to the updated answer.
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
 * Delete an applicant answer by ID.
 *
 * @param {number|string} id - The ID of the answer to delete.
 * @param {Object} [options] - Optional fetch options.
 * @param {AbortSignal} [options.signal] - Signal to cancel the request.
 * @returns {Promise<Object>} - A promise resolving to the deletion response.
 */
export const deleteApplicantAnswer = (id, { signal } = {}) =>
  request(`${APPLICANT_ANS_URL}?id=eq.${id}`, {
    method: 'DELETE',
     headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });