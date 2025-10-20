import { createSlice } from '@reduxjs/toolkit';
import { getTestSessionById } from '@/store/testSession/testSession.actions';

const initialState = {
  step: 1, // 1 - вступ, 2 - дані користувача, 3 - питання
  testInfo: null,
  userData: {
    fullName: '',
    group: '',
  },
  isLoading: false,
  error: null,
  answers: [],
  isFinished: false,
};

const testSessionSlice = createSlice({
  name: 'testSession',
  initialState,
  reducers: {
    nextStep(state) {
      if (state.step < 3) state.step += 1;
    },
    prevStep(state) {
      if (state.step > 1) state.step -= 1;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setTestInfo(state, action) {
      state.testInfo = action.payload;
    },
    saveAnswer(state, action) {
      state.answers.push(action.payload);
    },
    finishTest(state) {
      state.isFinished = true;
    },
    resetSession() {
      return initialState;
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
      });
  },
});

export const { actions: testSessionActions } = testSessionSlice;

export default testSessionSlice.reducer;
