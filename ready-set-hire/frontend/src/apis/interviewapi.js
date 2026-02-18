/*
Api for the Interview Endpoint
*/
import request, { BASE_URL } from './mainapi'

const INTERVIEW_BASE_URL = `${BASE_URL}/interview`;

/**
 * Fetches all interviews, ordered by ID ascending.
 *
 * @function getAllInterviews
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object[]>} - Array of interview objects.
 */
export const getAllInterviews = ({ signal } = {}) =>
  request(`${INTERVIEW_BASE_URL}?order=id.asc`, {
    method: 'GET',  // optional, fetch defaults to GET
    signal,
  });

/**
 * Fetches a specific interview by ID.
 *
 * @function getSpecificInterview
 * @param {number|string} id - The ID of the interview to fetch.
 * @param {Object} [post] - Unused (reserved for consistency).
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object[]>} - Array containing the interview object.
 */
export const getSpecificInterview = (id, post, { signal } = {}) =>
  request(`${INTERVIEW_BASE_URL}?id=eq.${id}`, {
    method: 'GET',
    signal
  });

/**
 * Creates a new interview.
 *
 * @function createInterview
 * @param {Object} post - The interview data to create.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object>} - The created interview object.
 */
export const createInterview = (post, { signal } = {}) =>
  request(INTERVIEW_BASE_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Updates an existing interview.
 *
 * @function updateInterview
 * @param {number|string} id - The ID of the interview to update.
 * @param {Object} post - The updated interview data.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object>} - The updated interview object.
 */
export const updateInterview = (id, post, { signal } = {}) =>
  request(`${INTERVIEW_BASE_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Deletes an interview by ID.
 *
 * @function deleteInterview
 * @param {number|string} id - The ID of the interview to delete.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<null>} - Returns null if successful.
 */
export const deleteInterview = (id, { signal } = {}) =>
  request(`${INTERVIEW_BASE_URL}?id=eq.${id}`, {
    method: 'DELETE',
    signal,
  });
