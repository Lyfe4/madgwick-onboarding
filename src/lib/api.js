// =============================================================================
//  src/lib/api.js — HTTP service layer
//  ---------------------------------------------------------------------------
//  All calls to your backend go here.  Every function returns a Promise.
//  Screens / App.jsx should never call fetch() directly.
//
//  HOW TO WIRE UP:
//  1. Set VITE_API_BASE_URL in your .env.local file (see .env.example).
//  2. Replace each stub body with a real request() call.
//  3. Add an Authorization header once you have a JWT:
//       headers: { ...baseHeaders(), Authorization: `Bearer ${getToken()}` }
// =============================================================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function request(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body != null && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // Attach HTTP status + server payload to the thrown error so callers
    // can branch on `e.status === 409` (duplicate email) etc.
    throw Object.assign(
      new Error(err.message ?? `HTTP ${res.status}`),
      { status: res.status, data: err },
    );
  }

  // 204 No Content has no body — return null instead of trying to parse it.
  return res.status === 204 ? null : res.json();
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const auth = {
  /**
   * POST /auth/signup
   * Create a new user account.
   *
   * @param {{ firstName, lastName, email, password, marketing }} payload
   * @returns {Promise<{ userId: string, token: string }>}
   */
  signup(payload) {
    // TODO: replace stub with → return request('POST', '/auth/signup', payload);
    console.info('[api.auth.signup] stub called with', payload);
    return Promise.resolve({ userId: 'demo-user', token: 'demo-token' });
  },

  /**
   * POST /auth/verify-email
   * Validate the 6-digit OTP sent to the user's email.
   *
   * @param {string} email
   * @param {string} code   6-digit string
   * @returns {Promise<void>}
   */
  verifyEmail(email, code) {
    // TODO: return request('POST', '/auth/verify-email', { email, code });
    console.info('[api.auth.verifyEmail] stub called', { email, code });
    return Promise.resolve();
  },

  /**
   * POST /auth/resend-code
   * Ask the backend to send a fresh OTP.
   *
   * @param {string} email
   * @returns {Promise<void>}
   */
  resendCode(email) {
    // TODO: return request('POST', '/auth/resend-code', { email });
    console.info('[api.auth.resendCode] stub called', { email });
    return Promise.resolve();
  },
};

// ---------------------------------------------------------------------------
// Onboarding
// ---------------------------------------------------------------------------

export const onboarding = {
  /**
   * PATCH /onboarding/profile/:userId
   * Persist the completed onboarding form data.
   *
   * Expected shape mirrors EMPTY_FORM in App.jsx (minus password fields,
   * which should never be sent after the signup call).
   *
   * @param {string} userId
   * @param {object} data   — role, experience, goals, interests, organisation, state, heard
   * @returns {Promise<void>}
   */
  saveProfile(userId, data) {
    // TODO: return request('PATCH', `/onboarding/profile/${userId}`, data);
    console.info('[api.onboarding.saveProfile] stub called', { userId, data });
    return Promise.resolve();
  },
};

// ---------------------------------------------------------------------------
// Default export groups all namespaces for convenience:
//   import api from '@/lib/api'
//   api.auth.signup(...)
// ---------------------------------------------------------------------------
export default { auth, onboarding };
