const SCHEMA_VERSION = 1;

const TRANSFER_KINDS = {
  test: {
    single: 'test',
    bundle: 'tests',
    filePrefix: 'studease-test',
  },
  collection: {
    single: 'collection',
    bundle: 'collections',
    filePrefix: 'studease-collection',
  },
};

const makeLocalId = (index = 0) => Date.now() + index;

const safeFilePart = (value) =>
  String(value || 'untitled')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'untitled';

const getTextValue = (...values) =>
  values.find((value) => value !== undefined && value !== null) || '';

const cleanAnswer = (answer, answerIndex, questionType) => {
  if (questionType === 'matching') {
    return {
      id: makeLocalId(answerIndex),
      leftOption: answer.leftOption || '',
      rightOption: answer.rightOption || '',
    };
  }

  return {
    id: makeLocalId(answerIndex),
    content: getTextValue(answer.content, answer.text, answer.value),
    isCorrect: Boolean(answer.isCorrect),
  };
};

const cleanQuestion = (question, questionIndex) => {
  const type = question.type || 'single_choice';
  const answers = Array.isArray(question.answers)
    ? question.answers.filter(
        (answer) => type !== 'matching' || answer.isCorrect !== false,
      )
    : [];

  return {
    id: makeLocalId(questionIndex),
    content: getTextValue(question.content, question.text, question.title),
    points: Number(question.points) || 1,
    type,
    answers: answers.map((answer, answerIndex) =>
      cleanAnswer(answer, answerIndex, type),
    ),
  };
};

const cleanSample = (sample, sampleIndex) => ({
  id: makeLocalId(sampleIndex),
  collectionId: sample.collectionId || sample.id || '',
  points: Number(sample.points) || 1,
  questionsCount: Number(sample.questionsCount) || 1,
});

export const normalizeTransferData = (kind, source = {}) => {
  const base = {
    name: source.name || '',
    questions: Array.isArray(source.questions)
      ? source.questions.map(cleanQuestion)
      : [],
  };

  if (kind === 'collection') {
    return base;
  }

  return {
    ...base,
    openDate: source.openDate || '',
    deadline: source.deadline || '',
    minutesToComplete: Number(source.minutesToComplete) || '',
    maximumScore: source.maximumScore ?? source.maxScore ?? '',
    samples: Array.isArray(source.samples) ? source.samples.map(cleanSample) : [],
  };
};

export const createTransferPayload = (kind, data) => ({
  schemaVersion: SCHEMA_VERSION,
  kind: TRANSFER_KINDS[kind].single,
  exportedAt: new Date().toISOString(),
  data: normalizeTransferData(kind, data),
});

export const createTransferBundlePayload = (kind, items) => ({
  schemaVersion: SCHEMA_VERSION,
  kind: TRANSFER_KINDS[kind].bundle,
  exportedAt: new Date().toISOString(),
  items: items.map((item) => normalizeTransferData(kind, item)),
});

export const downloadJson = (payload, filename) => {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const downloadTransferPayload = (kind, payload, name) => {
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${TRANSFER_KINDS[kind].filePrefix}-${safeFilePart(name)}-${date}.json`;

  downloadJson(payload, filename);
};

export const parseTransferFile = async (file, expectedKind) => {
  const raw = await file.text();
  const payload = JSON.parse(raw);
  const config = TRANSFER_KINDS[expectedKind];

  if (payload.schemaVersion !== SCHEMA_VERSION) {
    throw new Error('Unsupported import file version');
  }

  if (payload.kind === config.single) {
    return {
      isBundle: false,
      items: [normalizeTransferData(expectedKind, payload.data)],
    };
  }

  if (payload.kind === config.bundle && Array.isArray(payload.items)) {
    return {
      isBundle: true,
      items: payload.items.map((item) =>
        normalizeTransferData(expectedKind, item),
      ),
    };
  }

  throw new Error(`This file is not a ${config.single} export`);
};
