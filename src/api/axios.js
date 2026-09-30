import axios from 'axios';
import { API_URL } from '@/constants/config';
import Cookies from 'js-cookie';
import { readAttempt } from '@/utils/attemptToken';

/** `/tests/{testId}/…` — the student endpoints that require an attempt token. */
const ATTEMPT_SCOPED_PATH = /^\/tests\/([^/?#]+)\/[^?#]+/;

const MAX_RATE_LIMIT_RETRIES = 2;
const DEFAULT_RETRY_AFTER_MS = 2000;
const MAX_RETRY_AFTER_MS = 30000;

const api = axios.create({
  baseURL: API_URL,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

api.interceptors.request.use((config) => {
  const adminToken = Cookies.get('token');
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  // `/start` issues the token, so it must not present one.
  if (!config.skipAttemptToken) {
    const [, testId] = ATTEMPT_SCOPED_PATH.exec(config.url ?? '') ?? [];
    const attempt = testId ? readAttempt(decodeURIComponent(testId)) : null;
    if (attempt) {
      config.headers['X-Attempt-Token'] = attempt.attemptToken;
    }
  }

  return config;
});

/**
 * Rate limiting is per client IP, so a whole computer lab shares one bucket and
 * `429`s are expected rather than exceptional. Honour `Retry-After` and back
 * off instead of surfacing the failure to the student.
 */
api.interceptors.response.use(null, async (error) => {
  const { config, response } = error;

  if (response?.status !== 429 || !config) {
    throw error;
  }

  const attempt = config.rateLimitRetries ?? 0;
  if (attempt >= MAX_RATE_LIMIT_RETRIES) {
    throw error;
  }

  const retryAfterSeconds = Number(response.headers?.['retry-after']);
  const delay = Number.isFinite(retryAfterSeconds)
    ? retryAfterSeconds * 1000
    : DEFAULT_RETRY_AFTER_MS * 2 ** attempt;

  config.rateLimitRetries = attempt + 1;
  await sleep(Math.min(delay, MAX_RETRY_AFTER_MS));

  return api(config);
});

export default api;
