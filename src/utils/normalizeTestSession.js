export const normalizeTestSession = (session) => {
  if (!session || !session.responses) return [];

  return session.responses.map((r) => {
    const { question, answerIds, answerContent } = r;

    return {
      id: question.id,
      content: question.content,
      points: question.points,
      type: question.type,

      answers: question.answers.map((a) => ({
        id: a.id,
        isCorrect: answerIds?.includes(a.id) ?? false,
        content: a.content ?? null,
        leftOption: a.leftOption ?? null,
        rightOption: a.rightOption ?? null,
      })),

      answerContent: answerContent ?? null,
    };
  });
};
