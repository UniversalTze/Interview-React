/*
Api for the Applicant Endpoint
*/
import { BASE_URL } from './mainapi'

const APPLICANT_URL = `${BASE_URL}/applicant`;

/** 
 * Get all applicants assoicated wiht an interview
 */
export const getAllApplicants = (id, { signal } = {}) => { 
  request(`${APPLICANT_URL}?interview_id=eq.${id}`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    signal,
  })
};

/**
 * Create an Applicant
 */
export const createApplicant = (post, { signal } = {}) =>
  request(APPLICANT_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
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
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
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
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    signal,
  });
