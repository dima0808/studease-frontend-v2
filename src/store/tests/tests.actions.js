import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

const tests = [
  {
    id: 0,
    name: "Python for Beginners 2025 Edition",
    openDate: "09:00 12.09.2025",
    deadline: "18:00 12.09.2025",
    startedSessions: 22,
    isActive: true,
  },
  {
    id: 1,
    name: "JavaScript Basics",
    openDate: "09:00 12.09.2025",
    deadline: "18:00 12.09.2025",
    startedSessions: 2,
    isActive: true,
  },
  {
    id: 2,
    name: "React Fundamentals",
    openDate: "10:00 13.09.2025",
    deadline: "20:00 13.09.2025",
    startedSessions: 5,
    isActive: false,
  },
  {
    id: 3,
    name: "Node.js REST API",
    openDate: "11:00 14.09.2025",
    deadline: "21:00 14.09.2025",
    startedSessions: 2,
    isActive: true,
  },
  {
    id: 4,
    name: "PostgreSQL Queries",
    openDate: "09:30 15.09.2025",
    deadline: "19:00 15.09.2025",
    startedSessions: 4,
    isActive: false,
  },
  {
    id: 5,
    name: "Spring Boot Basics",
    openDate: "12:00 16.09.2025",
    deadline: "22:00 16.09.2025",
    startedSessions: 4,
    isActive: true,
  },
  {
    id: 6,
    name: "CSS Flex & Grid",
    openDate: "13:00 17.09.2025",
    deadline: "23:00 17.09.2025",
    startedSessions: 1,
    isActive: false,
  },
  {
    id: 7,
    name: "HTML5 Semantics",
    openDate: "09:00 18.09.2025",
    deadline: "18:30 18.09.2025",
    startedSessions: 2,
    isActive: true,
  },
  {
    id: 8,
    name: "Redux Toolkit",
    openDate: "11:00 19.09.2025",
    deadline: "20:30 19.09.2025",
    startedSessions: 7,
    isActive: true,
  },
  {
    id: 9,
    name: "TypeScript Intro",
    openDate: "14:00 20.09.2025",
    deadline: "23:00 20.09.2025",
    startedSessions: 1,
    isActive: false,
  },
  {
    id: 10,
    name: "Git & GitHub Workflow",
    openDate: "10:30 21.09.2025",
    deadline: "19:30 21.09.2025",
    startedSessions: 5,
    isActive: true,
  },
  {
    id: 11,
    name: "Testing with Jest",
    openDate: "09:00 22.09.2025",
    deadline: "18:00 22.09.2025",
    startedSessions: 2,
    isActive: false,
  },
  {
    id: 12,
    name: "Docker Basics",
    openDate: "11:00 23.09.2025",
    deadline: "21:00 23.09.2025",
    startedSessions: 16,
    isActive: true,
  },
  {
    id: 13,
    name: "Kubernetes Intro",
    openDate: "12:30 24.09.2025",
    deadline: "22:00 24.09.2025",
    startedSessions: 53,
    isActive: false,
  },
  {
    id: 14,
    name: "Computer Networks",
    openDate: "10:00 25.09.2025",
    deadline: "20:00 25.09.2025",
    startedSessions: 108,
    isActive: true,
  },
  {
    id: 15,
    name: "Operating Systems",
    openDate: "09:00 26.09.2025",
    deadline: "19:00 26.09.2025",
    startedSessions: 4,
    isActive: false,
  },
]

const fetchAllTests = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tests)
    }, 1000)
  })
}

export const getAllTests = createAsyncThunk("tests/getAllTests", async (_, {rejectWithValue}) => {
  try {
    // return await fetchAllTests()
    const { data } = await api.get("/admin/tests")
    return data.tests
  } catch {
    return rejectWithValue("Failed to fetch tests")
  }
})

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