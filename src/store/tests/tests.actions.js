import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
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
      return rejectWithValue('Failed to fetch tests');
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
      return rejectWithValue('Failed to fetch test');
    }
  },
);

export const getQuestionsByTestId = createAsyncThunk(
  'tests/getQuestionsByTestId',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/tests/' + testId + '/questions');
      return data;
    } catch {
      return rejectWithValue('Failed to fetch questions');
    }
  },
);

export const getSamplesByTestId = createAsyncThunk(
  'tests/getSamplesByTestId',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/tests/' + testId + '/samples');
      return data;
    } catch {
      return rejectWithValue('Failed to fetch samples');
    }
  },
);

export const getFinishedSessionsByTestId = createAsyncThunk(
  'tests/getFinishedSessionsByTestId',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        '/admin/tests/' + testId + '/finishedSessions',
      );
      return data;
    } catch {
      return rejectWithValue('Failed to fetch finished sessions');
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
      return rejectWithValue('Failed to fetch full test');
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
        error.response.data.message || 'Failed to create test',
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
      return rejectWithValue('Failed to generate questions');
    }
  },
);

export const deleteTestById = createAsyncThunk(
  'tests/deleteTestById',
  async (testId, { rejectWithValue }) => {
    try {
      await api.delete('/admin/tests/' + testId);
      return testId;
    } catch {
      return rejectWithValue('Failed to delete test');
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
    } catch {
      return rejectWithValue('Failed to delete tests');
    }
  },
);
