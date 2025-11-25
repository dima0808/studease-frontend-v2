import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from '@/store/auth/auth.actions';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove('token');
      state.firstName = '';
      state.lastName = '';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addMatcher(
        isPending(loginUser, registerUser, getCurrentUser),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(isFulfilled(loginUser, registerUser), (state, action) => {
        state.isLoading = false;
        state.error = null;
        Cookies.set('token', action.payload, { expires: 1 });
      })
      .addMatcher(
        isRejected(loginUser, registerUser, getCurrentUser),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { actions: authActions } = authSlice;
export default authSlice.reducer;