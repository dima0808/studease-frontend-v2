import {
  createSelector,
  createSlice,
  isRejected
} from '@reduxjs/toolkit';
import {
  deleteTestById,
  deleteTestsByIds,
  getAllTests,
} from '@/store/tests/tests.actions';

const initialState = {
  tests: [],
  isLoading: false,
  error: null,
  errorTestAction: null
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setErrorTestAction(state, action) {
      state.errorTestAction = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tests = action.payload;
      })
      .addCase(getAllTests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.tests = [];
      })
      .addCase(deleteTestById.fulfilled, (state, action) => {
        state.tests = state.tests.filter((test) => test.id !== action.payload);
        state.errorTestAction = null;
      })
      .addCase(deleteTestsByIds.fulfilled, (state, action) => {
        state.tests = state.tests.filter(
          (test) => !action.payload.some((item) => item.id === test.id),
        );
        state.errorTestAction = null;
      })
      .addMatcher(isRejected(deleteTestById, deleteTestsByIds), (state, action) => {
        state.errorTestAction = action.payload;
      })
  },
});

export const selectTests = createSelector(
  (state) => state.tests.tests,
  (state) => state.tests.isLoading,
  (state) => state.tests.error,
  (tests, isLoading, error) => ({
    data: tests,
    isLoading,
    error,
  }),
);

export const { actions: testsActions } = testsSlice;
export default testsSlice.reducer;
