import { createSlice, isFulfilled, isRejected } from '@reduxjs/toolkit';
import {
  finishTestSession,
  getCurrentQuestion,
  getNextQuestion,
  getTestSessionById,
  startTestSession,
} from '@/store/testSession/testSession.actions';
import {
  clearIdentity,
  readIdentity,
  saveIdentity,
} from '@/utils/attemptToken';

const STEP = {
  INTRO: 1,
  FORM: 2,
  QUESTIONS: 3,
  FINISHED: 4,
};

const initialState = {
  step: STEP.INTRO,
  testInfo: null,
  // Only populated once the attempt ends (`finish` or a `FORCE_END` message).
  testSession: null,
  // Form prefill only — identity is no longer what authenticates a student.
  credentials: readIdentity(),
  // The `CurrentQuestionDto`: { responseEntryId, questionNumber, totalQuestions, question }
  currentQuestion: null,
  sessionKey: null,
  endsAt: null,
  isLoading: false,
  error: null,
  attemptError: null,
  // HTTP status behind `attemptError`, so a caller can tell "this name is taken"
  // (409) from "the network is down" (null) and give advice that actually helps.
  attemptErrorStatus: null,
  isLoadingTestSession: false,
};

const endAttempt = (state, testSession) => {
  state.step = STEP.FINISHED;
  state.testSession = testSession;
  state.currentQuestion = null;
  state.isLoadingTestSession = false;
  state.credentials = { studentName: '', studentGroup: '' };
  clearIdentity();
};

const testSessionSlice = createSlice({
  name: 'testSession',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
      state.attemptError = null;
      state.attemptErrorStatus = null;
    },
    setCredentials: (state, action) => {
      state.credentials = action.payload;
      saveIdentity(action.payload);
    },
    clearAttemptError: (state) => {
      state.attemptError = null;
      state.attemptErrorStatus = null;
    },
    forceEndTestSession: (state, action) => {
      endAttempt(state, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTestSessionById.pending, (state) => {
        state.testInfo = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestSessionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testInfo = action.payload;
      })
      .addCase(getTestSessionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(finishTestSession.fulfilled, (state, action) => {
        endAttempt(state, action.payload);
      })
      .addCase(startTestSession.pending, (state) => {
        state.attemptError = null;
        state.attemptErrorStatus = null;
        state.isLoadingTestSession = true;
      })
      .addMatcher(
        isFulfilled(startTestSession, getCurrentQuestion, getNextQuestion),
        (state, action) => {
          const { currentQuestion, sessionKey, endsAt } = action.payload;
          state.step = STEP.QUESTIONS;
          state.currentQuestion = currentQuestion;
          state.isLoadingTestSession = false;
          state.attemptError = null;
          state.attemptErrorStatus = null;
          if (sessionKey) state.sessionKey = sessionKey;
          if (endsAt) state.endsAt = endsAt;
        },
      )
      .addMatcher(
        isRejected(
          startTestSession,
          getCurrentQuestion,
          getNextQuestion,
          finishTestSession,
        ),
        (state, action) => {
          const { status, message } = action.payload ?? {};
          state.isLoadingTestSession = false;
          state.attemptError = message ?? null;
          state.attemptErrorStatus = status ?? null;

          // The token is unusable — there is nothing to resume, so send the
          // student back to the start screen.
          if (status === 401) {
            state.step = STEP.INTRO;
            state.currentQuestion = null;
            state.sessionKey = null;
            state.endsAt = null;
          }
        },
      );
  },
});

export const { actions: testSessionActions } = testSessionSlice;

export { STEP };

export default testSessionSlice.reducer;
