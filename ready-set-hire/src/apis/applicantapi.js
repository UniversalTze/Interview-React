/*
Api for the Applicant Endpoint
*/
import request, { BASE_URL, token } from './mainapi'

const APPLICANT_URL = `${BASE_URL}/applicant`;

/** 
 * Get all applicants assoicated wiht an interview
 */
export const getAllApplicants = (id, { signal } = {}) => 
  request(`${APPLICANT_URL}?interview_id=eq.${id}&order=id.asc`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });

/**
 * Create an Applicant
 */
export const createApplicant = (post, { signal } = {}) =>
  request(APPLICANT_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Update an Applicant
 */
export const updateApplicant = (id, post, { signal } = {}) =>
  request(`${APPLICANT_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Delete an Applicant
 */
export const deleteApplicant = (id, { signal } = {}) =>
  request(`${APPLICANT_URL}?id=eq.${id}`, {
    method: 'DELETE',
     headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });
