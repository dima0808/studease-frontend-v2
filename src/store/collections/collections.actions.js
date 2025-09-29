import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

export const getAllCollections = createAsyncThunk("collections/getAllCollections", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/admin/collections");
    return data.collections.map((collection => ({...collection, usedInTests: Math.floor(Math.random() * 4)})));
  } catch {
    return rejectWithValue("Failed to fetch collections");
  }
})

export const deleteCollectionByName = createAsyncThunk("collections/deleteCollectionByName", async (collectionName, {rejectWithValue}) => {
  try {
    await api.delete('/admin/collections/' + collectionName)
    return collectionName
  } catch {
    return rejectWithValue("Failed to delete collection")
  }
})

export const deleteCollectionsByNames = createAsyncThunk("collections/deleteCollectionsByNames", async (collectionNames, {dispatch, rejectWithValue}) => {
  try {
    await Promise.all(collectionNames.map(collection => dispatch(deleteCollectionByName(collection.name))))
    return collectionNames
  } catch {
    return rejectWithValue("Failed to delete collections")
  }
})