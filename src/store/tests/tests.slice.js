import { createSlice } from "@reduxjs/toolkit";
import { getAllTests } from "@/store/tests/tests.actions";

const initialState = {
  tests: [],
  isLoading: false,
  error: null,
}

const testsSlice = createSlice({
  name: "tests",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllTests.pending, (state) => {
      state.isLoading = true
      state.error = null
    }).addCase(getAllTests.fulfilled, (state, action) => {
      state.isLoading = false
      state.tests = action.payload
    }).addCase(getAllTests.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.tests = []
    })
  },
})


export const { actions: testsActions } = testsSlice
export default testsSlice.reducer