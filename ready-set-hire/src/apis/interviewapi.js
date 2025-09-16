/*
Api for the Interview Endpoint
*/
import { BASE_URL } from './mainapi'

const INTERVIEW_BASE_URL = `${BASE_URL}/interview`;

/*
Get all interviews
*/
export const getAllInterviews = ({ signal } = {}) => { 
  request(INTERVIEW_BASE_URL, {
    method: 'GET',  // optional, fetch defaults to GET
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    signal,
  })
};

/**
 * Delete an interview
 */
export const deletePost = (id, { signal } = {}) =>
  request(`${INTERVIEW_BASE_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    signal,
  });
