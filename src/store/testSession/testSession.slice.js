import { createSlice } from '@reduxjs/toolkit';
import { getTestSessionById } from '@/store/testSession/testSession.actions';

const questions = [
  { id: 1, text: 'Столиця України?', options: ['Львів', 'Київ', 'Одеса'] },
  {
    id: 2,
    text: 'Коли Україна здобула незалежність?',
    options: ['1990', '1991', '1992'],
  },
  {
    id: 3,
    text: 'Яка найбільша річка в Україні?',
    options: ['Дніпро', 'Південний Буг', 'Дунай'],
  },
  {
    id: 4,
    text: 'Хто є автором твору "Кобзар"?',
    options: ['Іван Франко', 'Леся Українка', 'Тарас Шевченко'],
  },
  {
    id: 5,
    text: 'Яка гора є найвищою в Україні?',
    options: ['Говерла', 'Піп Іван', 'Бребенескул'],
  },
];

const initialState = {
  step: 1, // 1 - вступ, 2 - дані користувача, 3 - питання
  testInfo: null,
  userData: {
    fullName: '',
    group: '',
  },
  questions,
  isLoading: false,
  error: null,
  answers: [],
  isFinished: false,
};

const testSessionSlice = createSlice({
  name: 'testSession',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    saveAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    finishTest: (state) => {
      state.isFinished = true;
    },
    resetSession: (state) => {
      state.step = 3;
      state.userData = null;
      state.answers = [];
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
