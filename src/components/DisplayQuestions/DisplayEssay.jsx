import './DisplayChoice.scss';

const DisplayEssay = ({ question }) => {
  return (
    <div className="display-essay">
      <div className="display-question-header">
        <span className="display-question-type">Essay</span>
      </div>
      <h3 className="display-question-title">{question.content}</h3>
      <div className="display-essay__answer">
        {question.answerContent ? (
          <p>{question.answerContent}</p>
        ) : (
          <em>No answer provided</em>
        )}
      </div>
    </div>
  );
};

export default DisplayEssay;
