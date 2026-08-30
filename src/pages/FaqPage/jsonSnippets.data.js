// The JSON shapes StudEase imports and exports, shown verbatim on the FAQ.
export const snippets = {
  collection: `{
  "schemaVersion": 1,
  "kind": "collection",
  "exportedAt": "2026-04-26T00:00:00.000Z",
  "data": {
    "name": "Frontend Basics Collection",
    "questions": [
      {
        "content": "Which hook is used for local state in React?",
        "points": 1,
        "type": "single_choice",
        "answers": [
          { "content": "useMemo", "isCorrect": false },
          { "content": "useState", "isCorrect": true },
          { "content": "useEffect", "isCorrect": false }
        ]
      },
      {
        "content": "Choose JavaScript primitive types.",
        "points": 2,
        "type": "multiple_choices",
        "answers": [
          { "content": "string", "isCorrect": true },
          { "content": "number", "isCorrect": true },
          { "content": "array", "isCorrect": false },
          { "content": "boolean", "isCorrect": true }
        ]
      },
      {
        "content": "Explain what asynchronous code means.",
        "points": 3,
        "type": "essay",
        "answers": []
      },
      {
        "content": "Match HTTP status codes with meanings.",
        "points": 4,
        "type": "matching",
        "answers": [
          { "leftOption": "200", "rightOption": "OK" },
          { "leftOption": "201", "rightOption": "Created" },
          { "leftOption": "404", "rightOption": "Not Found" }
        ]
      }
    ]
  }
}`,
  test: `{
  "schemaVersion": 1,
  "kind": "test",
  "exportedAt": "2026-04-26T00:00:00.000Z",
  "data": {
    "name": "JavaScript Checkpoint",
    "openDate": "20.09.2026 12:00",
    "deadline": "30.09.2026 12:00",
    "minutesToComplete": 30,
    "maximumScore": 10,
    "questions": [
      {
        "content": "What does DOM stand for?",
        "points": 1,
        "type": "single_choice",
        "answers": [
          { "content": "Document Object Model", "isCorrect": true },
          { "content": "Data Object Mode", "isCorrect": false }
        ]
      }
    ],
    "samples": []
  }
}`,
  bundle: `{
  "schemaVersion": 1,
  "kind": "collections",
  "exportedAt": "2026-04-26T00:00:00.000Z",
  "items": [
    {
      "name": "HTML Basics",
      "questions": []
    },
    {
      "name": "CSS Basics",
      "questions": []
    }
  ]
}`,
};
