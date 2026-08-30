/**
 * The student-facing FAQ. English, because the interface is English — if the
 * app becomes bilingual these strings belong in a locale file, not here.
 * `**bold**` marks the words a student is looking for on the screen.
 */
export const faqQuestions = [
  {
    question: 'How does an attempt actually work?',
    answer:
      'Questions come one at a time. Answer, press **Next** — **Finish** on the last one — and the server keeps each answer as you go. Nothing is lost if the tab closes.',
  },
  {
    question: 'What should I take a test on?',
    answer:
      'A laptop or desktop with a current Chrome, Edge or Firefox. Phones and tablets work, but a small screen can make long questions harder to read.',
  },
  {
    question: 'The page froze or will not open.',
    answer:
      'Check your connection and reload. If it persists, clear the browser cache or try another device — your attempt is on the server, not in the tab.',
  },
  {
    question: 'Which question types can appear?',
    answer:
      'Single choice, multiple choice, essay, and matching pairs.',
  },
  {
    question: 'Can I go back to a previous question?',
    answer: 'Usually not. Check your answer before you press **Next**.',
  },
  {
    question: 'What happens when the time runs out?',
    answer:
      'The attempt closes itself. Everything you had already answered is kept.',
  },
  {
    question: 'Can I retake a test?',
    answer:
      'Only if your instructor or an administrator opens a new attempt for you.',
  },
  {
    question: 'Why can I not see my mark?',
    answer:
      'Marks appear only if your instructor turned that on. Otherwise you see your own answers without scoring.',
  },
  {
    question: 'What can I see after I finish?',
    answer:
      'Your own answers, always. Correct answers and a mark only if your instructor allows it.',
  },
  {
    question: 'An error appeared when the test started.',
    answer:
      'Reload the page. The session is restored from the server, and the clock has not been running against you in the meantime.',
  },
  {
    question: 'How is my attempt monitored?',
    answer:
      'Tab switches, copy events and disconnects are logged and sent with your result. Nothing else about your device is recorded.',
  },
];
