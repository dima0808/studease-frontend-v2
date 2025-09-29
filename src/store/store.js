import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/store/filter/filter.slice";
import selectionSlice from "@/store/selection/selection.slice";
import testsSlice from "@/store/tests/tests.slice";
import authSlice from "@/store/auth/auth.slice";
import collectionsSlice from "@/store/collections/collections.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tests: testsSlice,
    collections: collectionsSlice,
    filter: filterSlice,
    selection: selectionSlice,
  }
})