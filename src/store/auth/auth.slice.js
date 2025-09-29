import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "@/store/auth/auth.actions";

const initialState = {
  firstName: "",
  lastName: "",
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      state.firstName = "";
      state.lastName = "";
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(loginUser, registerUser), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled(loginUser, registerUser), (state, action) => {
        state.isLoading = false;
        state.error = null;
        Cookies.set("token", action.payload, { expires: 1 / 24 });
      })
      .addMatcher(isRejected(loginUser, registerUser), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: authActions } = authSlice;
export default authSlice.reducer;