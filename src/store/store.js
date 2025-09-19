import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/store/filter/filter.slice";
import selectionSlice from "@/store/selection/selection.slice";
import testsSlice from "@/store/tests/tests.slice";
import authSlice from "@/store/auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tests: testsSlice,
    filter: filterSlice,
    selection: selectionSlice,
  }
})