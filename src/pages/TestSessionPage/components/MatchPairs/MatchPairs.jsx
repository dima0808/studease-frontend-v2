import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion as Motion } from 'framer-motion';
import './MatchPairs.scss';

const MatchPairs = ({ question }) => {
  const leftItems = [...new Set(question.answers.map((a) => a.leftOption))];
  const rightItems = [...new Set(question.answers.map((a) => a.rightOption))];

  const [pairs, setPairs] = useState({});
  const { setValue } = useFormContext();

  const handleDrop = (e, leftValue) => {
    const rightValue = e.dataTransfer.getData('text/plain');

    setPairs((prev) => {
      const updated = { ...prev, [leftValue]: rightValue };

      const answerIds = question.answers
        .filter((a) => updated[a.leftOption] === a.rightOption)
        .map((a) => a.id);
      setValue('answers', answerIds);

      return updated;
    });
  };

  const handleDragStart = (e, rightValue) => {
    e.dataTransfer.setData('text/plain', rightValue);
  };

  const handleRemove = (leftValue) => {
    setPairs((prev) => {
      const updated = { ...prev };
      delete updated[leftValue];
      const answerIds = question.answers
        .filter((a) => updated[a.leftOption] === a.rightOption)
        .map((a) => a.id);
      setValue('answers', answerIds);
      return updated;
    });
  };

  const availableAnswers = rightItems.filter(
    (r) => !Object.values(pairs).includes(r),
  );

  return (
    <div className="match-pairs">
      <div className="match-pairs__table">
        {leftItems.map((left) => (
          <div key={left} className="match-pairs__row">
            <div className="match-pairs__left">{left}</div>
            <div
              className={`match-pairs__slot ${
                pairs[left] ? 'filled' : 'empty'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, left)}
            >
              {pairs[left] ? (
                <Motion.div
                  className="match-pairs__paired"
                  layout
                  onClick={() => handleRemove(left)}
                >
                  {pairs[left]}
                </Motion.div>
              ) : (
                <span className="placeholder">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="match-pairs__answers">
        {availableAnswers.map((right) => (
          <div
            key={right}
            className="match-pairs__answer"
            draggable
            onDragStart={(e) => handleDragStart(e, right)}
            layout
          >
            {right}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchPairs;
