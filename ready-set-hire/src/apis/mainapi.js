/*
Main api.js that is shared across all APIs so code is not reused. 
*/

export const BASE_URL = 'https://comp2140a2.uqcloud.net/api';

export const token = import.meta.env.VITE_A2_WEB_TOKEN;
/**
 * Small helper to handle fetch + errors consistently.
 * Passing signal: request.signal from loaders/actions lets React Router cancel 
 * fetches when the user navigates away. We also throw on non-OK HTTP so your route’s 
 * error boundary can render a friendly message.
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

async function safeText(res) {
  try { return await res.text(); } catch { return ''; }
}

export default request;