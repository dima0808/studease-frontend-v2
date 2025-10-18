import React from 'react';
import './FaqPage.scss';

const faqItems = [
  {
    question: 'How do I take the test?',
    answer:
      "To take the test, select an answer for each question and click 'Next' to proceed to the following question. At the end of the test, click 'Finish' to see your results.",
  },
  {
    question: 'How long does the test take?',
    answer:
      'Each test has a time limit, which is shown at the beginning. Keep an eye on the timer at the top of the page.',
  },
  {
    question: 'What if I want to change my answer?',
    answer:
      'You can change your answer to any question until the test is finished. Simply select a new answer and continue.',
  },
  {
    question: 'How are the results displayed?',
    answer:
      'After completing the test, you will receive a summary score and the correct answers. Some tests may provide a detailed analysis for each question.',
  },
  {
    question: 'Can I retake the test?',
    answer:
      'It depends on the test settings. Some tests allow multiple attempts, while others can only be taken once.',
  },
  {
    question: 'Technical requirements',
    answer:
      'To take the tests, you need a modern browser (Chrome, Firefox, Edge) and a stable internet connection. Tests are adapted for both desktop and mobile devices.',
  },
  {
    question: 'Contact support',
    answer:
      'If you encounter any issues with the test, contact our support team via email: support@example.com.',
  },
];

const Faq = () => {
  return (
    <div className="faq-page">
      <h1 className="faq-page__title">
        FAQ — Frequently Asked Questions About Tests
      </h1>
      <div className="faq-page__list">
        {faqItems.map((item, idx) => (
          <div key={idx} className="faq-page__item">
            <h2 className="faq-page__question">{item.question}</h2>
            <p className="faq-page__answer">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
