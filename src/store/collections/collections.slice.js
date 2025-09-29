import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  deleteCollectionByName, deleteCollectionsByNames,
  getAllCollections
} from "@/store/collections/collections.actions";

const initialState = {
  collections: [],
  isLoading: false,
  error: null
}

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.isLoading = false
        state.collections = action.payload
      })
      .addCase(getAllCollections.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.collections = []
      })
      .addCase(deleteCollectionByName.fulfilled, (state, action) => {
        state.collections = state.collections.filter(collection => collection.name !== action.payload)
      })
      .addCase(deleteCollectionsByNames.fulfilled, (state, action) => {
        state.collections = state.collections.filter(collection => !action.payload.some(item => item.name === collection.name))
      })
  }
})


export const selectCollections = createSelector(
  state => state.collections.collections,
  state => state.collections.isLoading,
  state => state.collections.error,
  (collections, isLoading, error) => ({
    data: collections,
    isLoading,
    error,
  })
);


export default collectionsSlice.reducer;