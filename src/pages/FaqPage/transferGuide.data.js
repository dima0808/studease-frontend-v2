/**
 * The import/export reference. It was Ukrainian while the rest of the app was
 * English; it is English here for the same reason the FAQ is.
 */
export const guideCards = [
  {
    title: 'Export one test or collection',
    text: 'Open Tests or Collections, use the actions on the row or card, and choose Export. StudEase downloads a JSON file you can import back later.',
  },
  {
    title: 'Export several at once',
    text: 'Switch the second segmented control to Select, tick what you need, and press Export. You get one bundle file with an items array.',
  },
  {
    title: 'Import a single item',
    text: 'Press Import on Tests or Collections and choose the JSON. A file with one item opens the create form with the fields already filled in.',
  },
  {
    title: 'Import a bundle',
    text: 'A file with several items is created straight away. Import a bundle of tests from Tests, and a bundle of collections from Collections.',
  },
];

export const questionTypes = [
  {
    type: 'single_choice',
    description:
      'One right answer: exactly one object in answers carries isCorrect: true.',
  },
  {
    type: 'multiple_choices',
    description:
      'Several right answers: every correct option carries isCorrect: true.',
  },
  {
    type: 'essay',
    description: 'An open question. Leave answers as an empty array.',
  },
  {
    type: 'matching',
    description:
      'Pairs to match. leftOption and rightOption are enough — wrong pairs are not needed.',
  },
];

export const RAIL = [
  {
    title: 'Still stuck',
    text: 'Write to your instructor first — most problems with an attempt are theirs to reopen, not ours.',
  },
  {
    title: 'Supported browsers',
    text: 'Chrome · Edge · Firefox / Current versions, on a laptop or desktop.',
  },
];
