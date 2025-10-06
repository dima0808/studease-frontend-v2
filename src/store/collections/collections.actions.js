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

export const createCollection = createAsyncThunk("collections/createCollection", async (collectionData, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/admin/collections", collectionData);
    return data
  } catch {
    return rejectWithValue("Failed to create collection");
  }
})

export const getCollectionByName = createAsyncThunk("collections/getCollectionByName", async (collectionName, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/admin/collections/' + collectionName)
    return data
  } catch {
    return rejectWithValue("Failed to fetch collection")
  }
})

export const getQuestionsByCollectionName = createAsyncThunk("collections/getQuestionsByCollectionName", async (collectionName, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/admin/collections/' + collectionName + '/questions')
    return data
  } catch {
    return rejectWithValue("Failed to fetch questions")
  }
})

export const getFullCollectionByName = createAsyncThunk("collections/getFullCollectionByName", async (collectionName, { dispatch, rejectWithValue }) => {
  try {
    const collection = await dispatch(getCollectionByName(collectionName)).unwrap()
    const questions = await dispatch(getQuestionsByCollectionName(collectionName)).unwrap()

    return {
      ...collection,
      ...questions
    }
  } catch {
    return rejectWithValue("Failed to fetch full collection")
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