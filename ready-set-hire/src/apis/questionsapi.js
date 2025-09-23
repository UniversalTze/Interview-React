/*
Api for the Applicant Endpoint
*/
import request, { BASE_URL, token } from './mainapi'

const QUESTION_URL = `${BASE_URL}/question`;

/** 
 * Get all questions assoicated wiht an interview
 */
export async function getAllQuestions (id, { signal } = {}) {
  const questions = await request(`${QUESTION_URL}?interview_id=eq.${id}`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  })
  const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
  return questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
}

/** 
 * Return first question of interview (sorted on difficulty)
 */
export async function getFirstQuestion (id, { signal } = {}) {
  const questions = await getAllQuestions(id, { signal })
  const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
  const sortedQues = questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  return sortedQues[0];
}

/** 
 * Return first question of interview (sorted on difficulty)
 */
export async function getRemainingQuestions (id, { signal } = {}) {
  const questions = await getAllQuestions(id, { signal })
  const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
  const sortedQues = questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  return sortedQues.slice(1);
}

/** 
 * Get specific question  associated with an interview
 */
export async function getSpecificQuestion (interviewid, questionid, { signal } = {}) {
  const questions = await request(`${QUESTION_URL}?interview_id=eq.${interviewid}&id=eq.${questionid}`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    signal,
  })
  const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
  return questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
}

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