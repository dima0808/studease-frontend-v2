import { createAsyncThunk } from "@reduxjs/toolkit";

const tests = [
  {
    id: 0,
    title: "Python for Beginners 2025 Edition",
    start: "09:00 12.09.2025",
    deadline: "18:00 12.09.2025",
    takingNow: 22,
    isActive: true,
  },
  {
    id: 1,
    title: "JavaScript Basics",
    start: "09:00 12.09.2025",
    deadline: "18:00 12.09.2025",
    takingNow: 2,
    isActive: true,
  },
  {
    id: 2,
    title: "React Fundamentals",
    start: "10:00 13.09.2025",
    deadline: "20:00 13.09.2025",
    takingNow: 5,
    isActive: false,
  },
  {
    id: 3,
    title: "Node.js REST API",
    start: "11:00 14.09.2025",
    deadline: "21:00 14.09.2025",
    takingNow: 2,
    isActive: true,
  },
  {
    id: 4,
    title: "PostgreSQL Queries",
    start: "09:30 15.09.2025",
    deadline: "19:00 15.09.2025",
    takingNow: 4,
    isActive: false,
  },
  {
    id: 5,
    title: "Spring Boot Basics",
    start: "12:00 16.09.2025",
    deadline: "22:00 16.09.2025",
    takingNow: 4,
    isActive: true,
  },
  {
    id: 6,
    title: "CSS Flex & Grid",
    start: "13:00 17.09.2025",
    deadline: "23:00 17.09.2025",
    takingNow: 1,
    isActive: false,
  },
  {
    id: 7,
    title: "HTML5 Semantics",
    start: "09:00 18.09.2025",
    deadline: "18:30 18.09.2025",
    takingNow: 2,
    isActive: true,
  },
  {
    id: 8,
    title: "Redux Toolkit",
    start: "11:00 19.09.2025",
    deadline: "20:30 19.09.2025",
    takingNow: 7,
    isActive: true,
  },
  {
    id: 9,
    title: "TypeScript Intro",
    start: "14:00 20.09.2025",
    deadline: "23:00 20.09.2025",
    takingNow: 1,
    isActive: false,
  },
  {
    id: 10,
    title: "Git & GitHub Workflow",
    start: "10:30 21.09.2025",
    deadline: "19:30 21.09.2025",
    takingNow: 5,
    isActive: true,
  },
  {
    id: 11,
    title: "Testing with Jest",
    start: "09:00 22.09.2025",
    deadline: "18:00 22.09.2025",
    takingNow: 2,
    isActive: false,
  },
  {
    id: 12,
    title: "Docker Basics",
    start: "11:00 23.09.2025",
    deadline: "21:00 23.09.2025",
    takingNow: 16,
    isActive: true,
  },
  {
    id: 13,
    title: "Kubernetes Intro",
    start: "12:30 24.09.2025",
    deadline: "22:00 24.09.2025",
    takingNow: 53,
    isActive: false,
  },
  {
    id: 14,
    title: "Computer Networks",
    start: "10:00 25.09.2025",
    deadline: "20:00 25.09.2025",
    takingNow: 108,
    isActive: true,
  },
  {
    id: 15,
    title: "Operating Systems",
    start: "09:00 26.09.2025",
    deadline: "19:00 26.09.2025",
    takingNow: 4,
    isActive: false,
  },
]

const fetchAllTests = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.5
      if (shouldFail) {
        reject(new Error("Server error: unable to load tests"))
      } else {
        resolve(tests)
      }
    }, 1000)
  })
}

export const getAllTests = createAsyncThunk("tests/getAllTests", async () => {
  try {
    return await fetchAllTests()
  } catch {
    throw new Error("Failed to fetch tests")
  }
})
