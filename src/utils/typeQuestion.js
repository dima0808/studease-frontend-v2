export const typeQuestion = (type) => {
  if (type === 'matching') {
    return { id: Date.now(), leftOption: '', rightOption: '' };
  }

  if (type === 'essay') {
    return {
      answers: [],
    };
  }

  return { id: Date.now(), content: '', isCorrect: false };
};
