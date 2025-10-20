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
