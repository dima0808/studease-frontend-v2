import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import i18n from '@/i18n/config';
import { parseDate } from '@/utils/parseDate';

export const getAllTests = createAsyncThunk(
  'tests/getAllTests',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/tests');

      return data.tests.map((test) => {
        const openDate = parseDate(test.openDate);
        const deadline = parseDate(test.deadline);
        const now = new Date();

        return {
          ...test,
          isActive: openDate <= now && deadline >= now,
        };
      });
    } catch {
      return rejectWithValue(i18n.t('errors.fetchTests'));
    }
  },
);

export const getTestById = createAsyncThunk(
  'tests/getTestById',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/tests/' + testId);
      return data;
    } catch {
      return rejectWithValue(i18n.t('errors.fetchTest'));
    }
  },
);

export const getQuestionsByTestId = createAsyncThunk(
  'tests/getQuestionsByTestId',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/questions/by-test/' + testId);
      return data;
    } catch {
      return rejectWithValue(i18n.t('errors.fetchQuestions'));
    }
  },
);

export const getSamplesByTestId = createAsyncThunk(
  'tests/getSamplesByTestId',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/samples/' + testId);
      return data;
    } catch {
      return rejectWithValue(i18n.t('errors.fetchSamples'));
    }
  },
);

export const getFinishedSessionsByTestId = createAsyncThunk(
  'tests/getFinishedSessionsByTestId',
  async ({ testId, studentName, studentGroup }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        '/admin/sessions/' + testId,
        {
          params: {
            studentName,
            studentGroup,
          },
        },
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(
        error.response.data.message || i18n.t('errors.fetchSessionDetails'),
      );
    }
  },
);

export const getFullTestById = createAsyncThunk(
  'tests/getFullTestById',
  async (testId, { dispatch, rejectWithValue }) => {
    try {
      const test = await dispatch(getTestById(testId)).unwrap();
      const questions = await dispatch(getQuestionsByTestId(testId)).unwrap();
      const samples = await dispatch(getSamplesByTestId(testId)).unwrap();

      return {
        ...test,
        ...questions,
        ...samples,
      };
    } catch {
      return rejectWithValue(i18n.t('errors.fetchFullTest'));
    }
  },
);

export const createTest = createAsyncThunk(
  'tests/createTest',
  async (testData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/admin/tests', testData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || i18n.t('errors.createTest'),
      );
    }
  },
);

export const generateQuestionsByAI = createAsyncThunk(
  'tests/generateQuestions',
  async (
    { theme, questionType, points, questionsCount },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.get(
        `/admin/questions/generate?theme=${theme}&questionType=${questionType}&points=${points}&questionsCount=${questionsCount}`,
      );
      return data;
    } catch {
      return rejectWithValue(i18n.t('errors.generateQuestions'));
    }
  },
);

export const deleteTestById = createAsyncThunk(
  'tests/deleteTestById',
  async (testId, { rejectWithValue }) => {
    try {
      await api.delete('/admin/tests/' + testId);
      return testId;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || i18n.t('errors.deleteTest'),
      );
    }
  },
);

export const deleteTestsByIds = createAsyncThunk(
  'tests/deleteTestsByIds',
  async (tests, { rejectWithValue }) => {
    try {
      await api.delete('/admin/tests', {
        data: {
          testIds: tests.map((test) => test.id),
        },
      });
      return tests;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || i18n.t('errors.deleteTest'),
      );
    }
  },
);
