import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTestById,
  deleteTestsByIds,
  getAllTests
} from "@/store/tests/tests.actions";

const initialState = {
  tests: [],
  isLoading: false,
  error: null,
}

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTests.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllTests.fulfilled, (state, action) => {
        state.isLoading = false
        state.tests = action.payload
      })
      .addCase(getAllTests.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.tests = []
      })
      .addCase(deleteTestById.fulfilled, (state, action) => {
        state.tests = state.tests.filter(test => test.id !== action.payload)
      })
      .addCase(deleteTestsByIds.fulfilled, (state, action) => {
        state.tests = state.tests.filter(test => !action.payload.some(item => item.id === test.id))
      })
  },
})

export const { actions: testsActions } = testsSlice
export default testsSlice.reducer
