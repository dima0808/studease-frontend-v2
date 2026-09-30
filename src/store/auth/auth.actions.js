import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import i18n from '@/i18n/config';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (bodyData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/register', bodyData);
      return data.token;
    } catch {
      return rejectWithValue(i18n.t('auth.serverErrors.registerFailed'));
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (bodyData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', bodyData);
      return data.token;
    } catch {
      return rejectWithValue(i18n.t('auth.serverErrors.loginFailed'));
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/auth/current');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || i18n.t('auth.serverErrors.fetchUser'),
      );
    }
  },
);
