import { createSelector, createSlice, isRejected } from '@reduxjs/toolkit';
import {
  deleteCollectionById,
  deleteCollectionsByIds,
  getAllCollections,
} from '@/store/collections/collections.actions';

const initialState = {
  collections: [],
  isLoading: false,
  error: null,
  errorCollectionAction: null
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setErrorCollectionAction(state, action) {
      state.errorCollectionAction = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(getAllCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.collections = [];
      })
      .addCase(deleteCollectionById.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (collection) => collection.id !== action.payload,
        );
        state.errorCollectionAction = null;
      })
      .addCase(deleteCollectionsByIds.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (collection) =>
            !action.payload.some((item) => item.id === collection.id),
        );
        state.errorCollectionAction = null;
      })
      .addMatcher(isRejected(deleteCollectionById, deleteCollectionsByIds), (state, action) => {
        state.errorCollectionAction = action.payload;
      })
  },
});

export const selectCollections = createSelector(
  (state) => state.collections.collections,
  (state) => state.collections.isLoading,
  (state) => state.collections.error,
  (collections, isLoading, error) => ({
    data: collections,
    isLoading,
    error,
  }),
);

export const { actions: collectionsActions } = collectionsSlice
export default collectionsSlice.reducer;
