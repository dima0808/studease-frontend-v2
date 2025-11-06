import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';

export const getTestSessionById = createAsyncThunk(
  'tests/getTestById',
  async (testId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/tests/' + testId);
      return data;
    } catch {
      return rejectWithValue('Failed to fetch test');
    }
  },
);

export const startTestSession = createAsyncThunk(
  'testSession/startTestSession',
  async ({ testId, credentials }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/tests/${testId}/start`, credentials);
      const testSession = await dispatch(
        getCurrentTestSession({ testId, credentials }),
      ).unwrap();
      return { data, testSession };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getNextQuestion = createAsyncThunk(
  'testSession/getNextQuestion',
  async (
    { testId, credentials, answerIds, answerContent },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { data } = await api.post(`/tests/${testId}/next-question`, {
        credentials,
        answerIds,
        answerContent,
      });
      const testSession = await dispatch(
        getCurrentTestSession({ testId, credentials }),
      ).unwrap();
      return { data, testSession };
    } catch {
      return rejectWithValue('Failed to fetch next question');
    }
  },
);

export const finishTestSession = createAsyncThunk(
  'testSession/finishTestSession',
  async (
    { testId, credentials, answerIds, answerContent },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.post(`/tests/${testId}/finish`, {
        credentials,
        answerIds,
        answerContent,
      });
      return data;
    } catch {
      return rejectWithValue('Failed to finish test session');
    }
  },
);

export const getCurrentQuestion = createAsyncThunk(
  'testSession/getCurrentQuestion',
  async ({ testId, credentials }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/tests/${testId}/current-question`,
        credentials,
      );
      const testSession = await dispatch(
        getCurrentTestSession({ testId, credentials }),
      ).unwrap();
      return { data, testSession };
    } catch {
      return rejectWithValue('Failed to fetch current question');
    }
  },
);

export const getCurrentTestSession = createAsyncThunk(
  'testSession/getCurrentTestSession',
  async ({ testId, credentials }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/tests/${testId}/current-session`,
        credentials,
      );
      return data;
    } catch {
      return rejectWithValue('Failed to fetch current test session');
    }
  },
);
