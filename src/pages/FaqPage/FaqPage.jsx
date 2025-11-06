import React from 'react';
import './FaqPage.scss';
import { faqQuestion } from '@/pages/FaqPage/faqQuestions.data';

const Faq = () => {
  return (
    <div className="faq-page">
      <h1 className="faq-page__title">
        FAQ — Frequently Asked Questions About Tests
      </h1>
      <div className="faq-page__list">
        {faqQuestion.map((item, idx) => (
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
