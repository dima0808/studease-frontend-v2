import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';

export const getAllCollections = createAsyncThunk(
  'collections/getAllCollections',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/collections');
      return data.collections.map((collection) => ({
        ...collection,
      }));
    } catch {
      return rejectWithValue('Failed to fetch collections');
    }
  },
);

export const createCollection = createAsyncThunk(
  'collections/createCollection',
  async (collectionData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/admin/collections', collectionData);
      return data;
    } catch {
      return rejectWithValue('Failed to create collection');
    }
  },
);

export const getCollectionById = createAsyncThunk(
  'collections/getCollectionById',
  async (collectionId, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/admin/collections/' + collectionId);
      return data;
    } catch {
      return rejectWithValue('Failed to fetch collection');
    }
  },
);

export const getQuestionsByCollectionId = createAsyncThunk(
  'collections/getQuestionsByCollectionId',
  async (collectionId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        '/admin/collections/' + collectionId + '/questions',
      );
      return data;
    } catch {
      return rejectWithValue('Failed to fetch questions');
    }
  },
);

export const getFullCollectionById = createAsyncThunk(
  'collections/getFullCollectionById',
  async (collectionId, { dispatch, rejectWithValue }) => {
    try {
      const collection = await dispatch(
        getCollectionById(collectionId),
      ).unwrap();
      const questions = await dispatch(
        getQuestionsByCollectionId(collectionId),
      ).unwrap();

      return {
        ...collection,
        ...questions,
      };
    } catch {
      return rejectWithValue('Failed to fetch full collection');
    }
  },
);

export const deleteCollectionById = createAsyncThunk(
  'collections/deleteCollectionById',
  async (collectionId, { rejectWithValue }) => {
    try {
      await api.delete('/admin/collections/' + collectionId);
      return collectionId;
    } catch {
      return rejectWithValue('Failed to delete collection');
    }
  },
);

export const deleteCollectionsByIds = createAsyncThunk(
  'collections/deleteCollectionsByIds',
  async (collections, { dispatch, rejectWithValue }) => {
    try {
      await Promise.all(
        // todo: change to batch delete endpoint when available
        collections.map((collection) =>
          dispatch(deleteCollectionById(collection.id)),
        ),
      );
      return collections;
    } catch {
      return rejectWithValue('Failed to delete collections');
    }
  },
);
