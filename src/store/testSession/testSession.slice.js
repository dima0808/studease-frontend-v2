import { createSlice, isFulfilled, isRejected } from '@reduxjs/toolkit';
import {
  finishTestSession,
  getCurrentQuestion,
  getNextQuestion,
  getTestSessionById,
  startTestSession,
} from '@/store/testSession/testSession.actions';
import Cookies from 'js-cookie';

const initialState = {
  step: 1,
  testInfo: null,
  testSession: null,
  credentials: {
    studentName: Cookies.get('studentName') || '',
    studentGroup: Cookies.get('studentGroup') || '',
  },
  question: null,
  isLoading: false,
  error: null,
  errorStartTest: null,
  isLoadingTestSession: false,
  answerIds: [],
  answerContent: null,
};

const testSessionSlice = createSlice({
  name: 'testSession',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCredentials: (state, action) => {
      state.credentials = action.payload;
      Cookies.set('studentName', action.payload.studentName);
      Cookies.set('studentGroup', action.payload.studentGroup);
    },
    toggleAnswerId: (state, action) => {
      const answerId = action.payload.answerId;
      const isSingleChoice = action.payload.isSingleChoice;
      if (isSingleChoice) {
        state.answerIds = [answerId];
      } else {
        if (state.answerIds.includes(answerId)) {
          state.answerIds = state.answerIds.filter((id) => id !== answerId);
        } else {
          state.answerIds.push(answerId);
        }
      }
    },
    forceEndTestSession: (state, action) => {
      state.step = 4;
      state.testSession = action.payload;
      state.credentials = {
        studentName: '',
        studentGroup: '',
      };
      Cookies.remove('studentName');
      Cookies.remove('studentGroup');
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
      .addCase(getCurrentQuestion.rejected, (state) => {
        state.step = 1;
      })
      .addCase(finishTestSession.fulfilled, (state, action) => {
        state.step = 4;
        state.testSession = action.payload;
        state.credentials = {
          studentName: '',
          studentGroup: '',
        };
        Cookies.remove('studentName');
        Cookies.remove('studentGroup');
      })
      .addCase(startTestSession.pending, (state) => {
        state.errorStartTest = null;
        state.isLoadingTestSession = true;
      })
      .addCase(startTestSession.rejected, (state, action) => {
        console.log(action.payload);
        state.errorStartTest = action.payload;
        state.isLoadingTestSession = false;
      })
      .addMatcher(
        isFulfilled(startTestSession, getCurrentQuestion, getNextQuestion),
        (state, action) => {
          state.step = 3;
          state.question = action.payload.data;
          state.testSession = action.payload.testSession;
          state.isLoadingTestSession = false;
        },
      );
  },
});

export const { actions: testSessionActions } = testSessionSlice;

export default testSessionSlice.reducer;
