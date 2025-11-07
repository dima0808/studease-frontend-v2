import './Loading.scss';
import classNames from 'classnames';

const Loading = ({ className, text }) => {
  return (
    <div className={classNames('loading', className)}>
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
