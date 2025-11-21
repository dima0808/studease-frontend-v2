import React from 'react';
import './FaqPage.scss';
import { faqQuestion } from '@/pages/FaqPage/faqQuestions.data';
import { fadeUp } from "@/constants/motionVariants";
import Button from "@/components/Button";
import { FaArrowLeft } from "react-icons/fa";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const navigate = useNavigate();

  return (
    <div className="faq-page">
      <Motion.div
        className="info-layout-page__header"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        <div className="info-layout-page__title-container">
          <Button
            className="info-layout-page__back"
            text={<FaArrowLeft size={21} />}
            onClick={() => navigate(-1)}
          />
          <h1 className="info-layout-page__title">FAQ — About Tests</h1>
        </div>
      </Motion.div>

      <div className="faq-page__list">
        {faqQuestion.map((item, idx) => (
          <Motion.div
            key={idx}
            className="faq-page__item"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={(idx + 1) * 0.15}
          >
            <h2 className="faq-page__question">{item.question}</h2>
            <p className="faq-page__answer">{item.answer}</p>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
