import { RotateCw } from 'lucide-react';
import Button from '@/components/Button';
import './ErrorComponent.scss';

const ErrorComponent = ({ onRetry, description }) => {
  return (
    <div className="error-component">
      <p className="error-component__kicker">Could not load</p>
      <h2 className="error-component__title">{description}</h2>
      <hr className="error-component__rule" />
      <p className="error-component__text">
        The server did not answer. Nothing you have done is lost — try again in
        a moment, and tell your instructor if it keeps happening.
      </p>
      <Button
        icon={RotateCw}
        text="Try again"
        theme="primary"
        size="lg"
        className="error-component__btn"
        onClick={onRetry}
      />
    </div>
  );
};

export default ErrorComponent;
