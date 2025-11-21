import { motion as Motion } from 'framer-motion';
import './ErrorTest.scss';
import Button from '@/components/Button';
import classNames from 'classnames';

const ErrorBlock = ({
  message,
  className,
  image,
  onReload,
  buttonText,
  showErrorText = true,
}) => {
  return (
    <Motion.div
      className={classNames('error-test', className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {image && (
        <div className="error-test__image">
          <img src={image} alt="Error illustration" />
        </div>
      )}

      {showErrorText && <p className="error-test__title">404 Error</p>}

      <p className="error-test__message">{message}</p>

      {onReload && <Button onClick={onReload} text={buttonText} theme="red" />}
    </Motion.div>
  );
};

export default ErrorBlock;
