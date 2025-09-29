import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { parseDate } from "@/utils/parseDate";

export const getAllTests = createAsyncThunk(
  "tests/getAllTests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/tests");

      return data.tests.map(test => {
        const openDate = parseDate(test.openDate);
        const deadline = parseDate(test.deadline);
        const now = new Date();

        return {
          ...test,
          isActive: openDate <= now && deadline >= now
        };
      });
    } catch {
      return rejectWithValue("Failed to fetch tests");
    }
  }
);


export const deleteTestById = createAsyncThunk("tests/deleteTestById", async (testId, {rejectWithValue}) => {
  try {
    await api.delete('/admin/tests/' + testId)
    return testId
  } catch {
    return rejectWithValue("Failed to delete test")
  }
})

export const deleteTestsByIds = createAsyncThunk("tests/deleteTestsByIds", async (testIds, {dispatch, rejectWithValue}) => {
  try {
    await Promise.all(testIds.map(test => dispatch(deleteTestById(test.id))))
    return testIds
  } catch {
    return rejectWithValue("Failed to delete tests")
  }
})