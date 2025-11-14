import './DisplayChoice.scss';

const DisplayMatchPairs = ({ question }) => {
  const correctPairs = question.answers.filter((a) => a.isCorrect);

  return (
    <div className="display-matchpairs">
      <div className="display-question-header">
        <span className="display-question-type">Matching</span>
      </div>
      <h3 className="display-question-title">{question.content}</h3>

      {correctPairs.length > 0 ? (
        <div className="display-matchpairs__table">
          {correctPairs.map((pair) => (
            <div key={pair.id} className="display-matchpairs__row">
              <div className="left">{pair.leftOption}</div>
              <div className="arrow">→</div>
              <div className="right">{pair.rightOption}</div>
            </div>
          ))}
        </div>
      ) : (
        <em>No correct pairs</em>
      )}
    </div>
  );
};

export default DisplayMatchPairs;
