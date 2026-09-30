import './DisplayChoice.scss';

const DisplayMatchPairs = ({ question, showResults = false }) => {
  const pairsToDisplay = question.answers.filter((a) => a.userSelected)

  return (
    <div className="display-matchpairs">
      <div className="display-question-header">
        <span className="display-question-type">Matching pairs</span>
      </div>
      <h3 className="display-question-title">{question.content}</h3>

      <div className="display-matchpairs__table">
        {pairsToDisplay.length > 0 ? (
          pairsToDisplay.map((pair) => (
            <div
              key={pair.id}
              className={`display-matchpairs__row ${showResults ? (pair.isCorrect ? 'row-correct' : 'row-incorrect') : ''}`}
            >
              <div className="left">{pair.leftOption}</div>
              <div className="arrow">{showResults && !pair.isCorrect ? '≠' : '→'}</div>
              <div className="right">{pair.rightOption}</div>
            </div>
          ))
        ) : (
          <em>{showResults ? "No answers provided" : "No pairs defined"}</em>
        )}
      </div>
    </div>
  );
};

export default DisplayMatchPairs;