/*
Api for the Applicant Endpoint
*/
import request, { BASE_URL } from './mainapi'

const QUESTION_URL = `${BASE_URL}/question`;

/**
 * Fetches all questions associated with an interview, sorted by difficulty.
 *
 * @async
 * @function getAllQuestions
 * @param {number|string} id - The interview ID.
 * @param {Object} [options={}] - Optional settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object[]>} - Sorted array of questions.
 */
export async function getAllQuestions (id, { signal } = {}) {
  const questions = await request(`${QUESTION_URL}?interview_id=eq.${id}`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    signal,
  })
  const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
  return questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
}


/**
 * Fetches the first (easiest) question from an interview.
 *
 * @async
 * @function getFirstQuestion
 * @param {number|string} id - The interview ID.
 * @param {Object} [options={}] - Optional settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object>} - The first question object.
 */
export async function getFirstQuestion (id, { signal } = {}) {
  const questions = await getAllQuestions(id, { signal })
  const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
  const sortedQues = questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  return sortedQues[0];
}

/**
 * Fetches a specific question associated with an interview and sorts by difficulty.
 *
 * @async
 * @function getSpecificQuestion
 * @param {number|string} interviewid - The ID of the interview.
 * @param {number|string} questionid - The ID of the question.
 * @param {Object} [options={}] - Optional fetch settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object[]>} - An array containing the requested question,
 *                                sorted by difficulty (Easy → Intermediate → Advanced).
 */
export async function getSpecificQuestion (interviewid, questionid, { signal } = {}) {
  const questions = await request(`${QUESTION_URL}?interview_id=eq.${interviewid}&id=eq.${questionid}`, {
    method: 'GET',  // optional, fetch defaults to GET (content defaults to JSON)
    signal,
  })
  const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
  return questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
}

/**
 * Creates a new question.
 *
 * @function createQuestion
 * @param {Object} post - The question data to create.
 * @param {Object} [options={}] - Optional settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object>} - The created question object.
 */
export const createQuestion = (post, { signal } = {}) =>
  request(QUESTION_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Updates an existing question by id.
 *
 * @function updateQuestion
 * @param {number|string} id - The question ID to update.
 * @param {Object} post - The updated question data.
 * @param {Object} [options={}] - Optional settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<Object>} - The updated question object.
 */
export const updateQuestion = (id, post, { signal } = {}) =>
  request(`${QUESTION_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    signal,
  });

/**
 * Deletes a question by ID.
 *
 * @function deleteQuestion
 * @param {number|string} id - The question ID to delete.
 * @param {Object} [options={}] - Optional settings.
 * @param {AbortSignal} [options.signal] - Abort signal for request cancellation.
 * @returns {Promise<null>} - Returns null if successful.
 */
export const deleteQuestion = (id, { signal } = {}) =>
  request(`${QUESTION_URL}?id=eq.${id}`, {
    method: 'DELETE',
    signal,
  });