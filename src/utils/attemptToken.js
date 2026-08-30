/**
 * Attempt-token storage for the student test flow.
 *
 * The token is a bearer credential handed out exactly once by `/start` — it is
 * kept in `sessionStorage`, never in `localStorage`, so that a stale token
 * cannot outlive the tab on a shared lab machine. Keyed by `testId` so two tabs
 * on different tests do not collide. It is deliberately never put into Redux,
 * a URL or a log line.
 */

const keyFor = (testId) => `studease.attempt.${testId}`;

const storage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export const readAttempt = (testId) => {
  if (!testId) return null;

  try {
    const raw = storage()?.getItem(keyFor(testId));
    if (!raw) return null;

    const attempt = JSON.parse(raw);
    return attempt?.attemptToken ? attempt : null;
  } catch {
    return null;
  }
};

export const hasAttempt = (testId) => readAttempt(testId) !== null;

export const saveAttempt = (testId, { attemptToken, sessionKey, endsAt }) => {
  try {
    storage()?.setItem(
      keyFor(testId),
      JSON.stringify({ attemptToken, sessionKey, endsAt }),
    );
  } catch {
    /* private mode / storage disabled — the attempt simply cannot be resumed */
  }
};

export const clearAttempt = (testId) => {
  try {
    storage()?.removeItem(keyFor(testId));
  } catch {
    /* nothing to clean up */
  }
};

const IDENTITY_KEY = 'studease.identity';

/** Form prefill only. Session-scoped for the same shared-machine reason. */
export const readIdentity = () => {
  try {
    const raw = storage()?.getItem(IDENTITY_KEY);
    const identity = raw ? JSON.parse(raw) : null;
    return {
      studentName: identity?.studentName ?? '',
      studentGroup: identity?.studentGroup ?? '',
    };
  } catch {
    return { studentName: '', studentGroup: '' };
  }
};

export const saveIdentity = (identity) => {
  try {
    storage()?.setItem(IDENTITY_KEY, JSON.stringify(identity));
  } catch {
    /* prefill is a convenience, not a requirement */
  }
};

export const clearIdentity = () => {
  try {
    storage()?.removeItem(IDENTITY_KEY);
  } catch {
    /* nothing to clean up */
  }
};
