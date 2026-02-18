/*
Api for the Applicant Endpoint
*/
import request, { BASE_URL } from './mainapi'

const APPLICANT_URL = `${BASE_URL}/applicant`;

/**
 * Fetches all applicants associated with an interview.
 *
 * @function getAllApplicants
 * @param {number|string} id - The interview ID.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object[]>} - Array of applicant objects.
 */
export const getAllApplicants = (id, { signal } = {}) => 
  request(`${APPLICANT_URL}?interview_id=eq.${id}&order=id.asc`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    signal,
  });

/**
 * Fetches all applicants with status "Completed" for a given interview.
 *
 * @function getAllApplicantsCompleted
 * @param {number|string} id - The interview ID.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object[]>} - Array of completed applicants.
 */
export const getAllApplicantsCompleted = (id, { signal } = {}) => 
  request(`${APPLICANT_URL}?interview_id=eq.${id}&interview_status=eq.Completed&order=id.asc`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    signal,
  });

/**
 * Fetches a specific applicant associated with an interview.
 *
 * @function getSpecificApplicants
 * @param {number|string} interviewid - The interview ID.
 * @param {number|string} applicantid - The applicant ID.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object[]>} - Array containing the applicant object.
 */
export const getSpecificApplicants = (interviewid, applicantid, { signal } = {}) => 
  request(`${APPLICANT_URL}?interview_id=eq.${interviewid}&id=eq.${applicantid}&order=id.asc`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    signal,
  });

/**
 * Creates a new applicant.
 *
 * @function createApplicant
 * @param {Object} post - The applicant data to create.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object>} - The created applicant object.
 */

export const createApplicant = (post, { signal } = {}) =>
  request(APPLICANT_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    signal,
  });


/**
 * Updates an existing applicant.
 *
 * @function updateApplicant
 * @param {number|string} id - The applicant ID to update.
 * @param {Object} post - The updated applicant data.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object>} - The updated applicant object.
 */
export const updateApplicant = (id, post, { signal } = {}) =>
  request(`${APPLICANT_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Deletes an applicant by ID.
 *
 * @function deleteApplicant
 * @param {number|string} id - The applicant ID to delete.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<null>} - Returns null if successful.
 */
export const deleteApplicant = (id, { signal } = {}) =>
  request(`${APPLICANT_URL}?id=eq.${id}`, {
    method: 'DELETE',
    signal,
  });
