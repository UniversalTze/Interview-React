/*
Main api.js that is shared across all APIs so code is not reused. 
*/

export const BASE_URL = 'https://comp2140a2.uqcloud.net/api';

export const token = import.meta.env.VITE_A2_WEB_TOKEN;

/**
 * Makes an HTTP request using Fetch API and handles common error cases.
 *
 * - Throws a `Response` object on non-OK responses so React Router's
 *   errorElement can handle it.
 * - Returns parsed JSON or `null` if the response body is empty.
 * - Supports `AbortController` signals for React Router loaders/actions.
 *
 * @async
 * @function request
 * @param {string} url - The full request URL.
 * @param {Object} [options={}] - Fetch options such as method, headers, body, and signal.
 * @returns {Promise<Object|null>} - The parsed JSON response, or `null` if the body is empty.
 * @throws {Response} - When the HTTP status is not OK (>=400).
 */
async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    // Let route errorElement pick this up
    const message = await safeText(res);
    throw new Response(message || res.statusText, { status: res.status });
  }
  // Some mock APIs return empty bodies on DELETE
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/**
 * Safely extracts the text content of a Fetch response.
 * Returns an empty string if reading fails.
 *
 * @async
 * @function safeText
 * @param {Response} res - The Fetch Response object.
 * @returns {Promise<string>} - The response text, or an empty string if unreadable.
 */
async function safeText(res) {
  try { return await res.text(); } catch { return ''; }
}

export default request;