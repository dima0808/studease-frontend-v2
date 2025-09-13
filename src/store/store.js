import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/store/filter/filter.slice";
import selectionSlice from "@/store/selection/selection.slice";
import testsSlice from "@/store/tests/tests.slice";

export const store = configureStore({
  reducer: {
    tests: testsSlice,
    filter: filterSlice,
    selection: selectionSlice,
  }
})