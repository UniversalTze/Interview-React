/*
Api for the Interview Endpoint
*/
import request, { BASE_URL, token } from './mainapi'

const INTERVIEW_BASE_URL = `${BASE_URL}/interview`;

/*
Get all interviews
*/
export const getAllInterviews = ({ signal } = {}) =>
  request(INTERVIEW_BASE_URL, {
    method: 'GET',  // optional, fetch defaults to GET
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });

/**
 * Create an Interview
 */
export const createPost = (post, { signal } = {}) =>
  request(INTERVIEW_BASE_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Update an Interview
 */
export const updatePost = (id, post, { signal } = {}) =>
  request(`${BASE_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Delete an interview
 */
export const deletePost = (id, { signal } = {}) =>
  request(`${INTERVIEW_BASE_URL}?id=eq.${id}`, {
    method: 'DELETE',
     headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  });
