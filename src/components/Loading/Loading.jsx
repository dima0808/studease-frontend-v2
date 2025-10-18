import './Loading.scss';

const Loading = ({ text }) => {
  return (
    <div className="loading">
      <div className="loading__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loading__text">Loading {text}...</p>
    </div>
  );
};

export default Loading;
