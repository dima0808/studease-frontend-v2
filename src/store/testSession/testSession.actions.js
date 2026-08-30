import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import { toApiError } from '@/utils/apiError';
import { clearAttempt, readAttempt, saveAttempt } from '@/utils/attemptToken';

/**
 * An answer carries either `answerIds` or `answerContent` — never both. It must
 * always carry `responseEntryId`: that is what makes a retry safe, because
 * resending the same entry id updates that answer instead of sliding onto the
 * next question.
 */
const buildAnswerBody = ({ responseEntryId, answerIds, answerContent }) =>
  answerContent
    ? { responseEntryId, answerContent }
    : { responseEntryId, answerIds };

/** A `401` means the token is gone or wrong — the attempt cannot be resumed. */
const rejectAttempt = (error, testId, rejectWithValue, fallbackMessage) => {
  const apiError = toApiError(error, fallbackMessage);
  if (apiError.status === 401) {
    clearAttempt(testId);
  }
  return rejectWithValue(apiError);
};

export const getTestSessionById = createAsyncThunk(
  'testSession/getTestSessionById',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/tests/' + testId);
      return data;
    } catch (error) {
      return rejectWithValue(toApiError(error, 'Failed to fetch test').message);
    }
  },
);

export const startTestSession = createAsyncThunk(
  'testSession/startTestSession',
  async ({ testId, credentials }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/tests/${testId}/start`, credentials, {
        skipAttemptToken: true,
      });

      // Shown exactly once — only its hash is persisted server-side, so losing
      // it makes the attempt unrecoverable for this student.
      saveAttempt(testId, {
        attemptToken: data.attemptToken,
        sessionKey: data.sessionKey,
        endsAt: data.endsAt,
      });

      return {
        sessionKey: data.sessionKey,
        endsAt: data.endsAt,
        currentQuestion: data.currentQuestion,
      };
    } catch (error) {
      return rejectWithValue(toApiError(error, 'Failed to start the test'));
    }
  },
);

export const getCurrentQuestion = createAsyncThunk(
  'testSession/getCurrentQuestion',
  async ({ testId }, { rejectWithValue }) => {
    const attempt = readAttempt(testId);
    if (!attempt) {
      return rejectWithValue({
        status: 401,
        message: 'No attempt in progress on this device',
      });
    }

    try {
      const { data } = await api.get(`/tests/${testId}/current-question`);
      return {
        sessionKey: attempt.sessionKey,
        endsAt: attempt.endsAt,
        currentQuestion: data,
      };
    } catch (error) {
      return rejectAttempt(
        error,
        testId,
        rejectWithValue,
        'Failed to fetch the current question',
      );
    }
  },
);

export const getNextQuestion = createAsyncThunk(
  'testSession/getNextQuestion',
  async (
    { testId, responseEntryId, answerIds, answerContent },
    { rejectWithValue },
  ) => {
    const body = buildAnswerBody({ responseEntryId, answerIds, answerContent });

    try {
      const { data } = await api.post(`/tests/${testId}/next-question`, body);
      return { currentQuestion: data };
    } catch (error) {
      const apiError = toApiError(error, 'Failed to fetch the next question');

      // 409: two submissions raced for this attempt. Re-fetch and retry once —
      // but only if the server is still sitting on the entry we answered;
      // otherwise the other submission won and we just move to what it left us.
      if (apiError.status === 409) {
        try {
          const { data: current } = await api.get(
            `/tests/${testId}/current-question`,
          );

          if (current.responseEntryId !== responseEntryId) {
            return { currentQuestion: current };
          }

          const { data } = await api.post(
            `/tests/${testId}/next-question`,
            body,
          );
          return { currentQuestion: data };
        } catch (retryError) {
          return rejectAttempt(
            retryError,
            testId,
            rejectWithValue,
            'Failed to fetch the next question',
          );
        }
      }

      if (apiError.status === 401) {
        clearAttempt(testId);
      }
      return rejectWithValue(apiError);
    }
  },
);

export const finishTestSession = createAsyncThunk(
  'testSession/finishTestSession',
  async (
    { testId, responseEntryId, answerIds, answerContent },
    { rejectWithValue },
  ) => {
    const body = buildAnswerBody({ responseEntryId, answerIds, answerContent });

    try {
      const { data } = await api.post(`/tests/${testId}/finish`, body);
      return data;
    } catch (error) {
      const apiError = toApiError(error, 'Failed to finish the test');

      // `finish` is idempotent, so retrying a raced submission is always safe.
      if (apiError.status === 409) {
        try {
          const { data } = await api.post(`/tests/${testId}/finish`, body);
          return data;
        } catch (retryError) {
          return rejectAttempt(
            retryError,
            testId,
            rejectWithValue,
            'Failed to finish the test',
          );
        }
      }

      if (apiError.status === 401) {
        clearAttempt(testId);
      }
      return rejectWithValue(apiError);
    }
  },
);

export const getCurrentTestSession = createAsyncThunk(
  'testSession/getCurrentTestSession',
  async ({ testId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/tests/${testId}/current-session`);
      return data;
    } catch (error) {
      return rejectAttempt(
        error,
        testId,
        rejectWithValue,
        'Failed to fetch the current test session',
      );
    }
  },
);
