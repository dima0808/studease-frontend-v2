import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

export const registerUser = createAsyncThunk('auth/register', async (bodyData, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/register", bodyData);
    return data.token;
  } catch {
    return rejectWithValue("Registration failed. Please try again.");
  }
})

export const loginUser = createAsyncThunk('auth/login', async (bodyData, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/login", bodyData);
    return data.token;
  } catch {
    return rejectWithValue("Login failed. Please try again.");
  }
})