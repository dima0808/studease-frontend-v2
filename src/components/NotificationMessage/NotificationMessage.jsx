import { motion as Motion, AnimatePresence } from 'framer-motion';
import './NotificationMessage.scss';

const NotificationMessage = ({ message, onClose, duration = 3000 }) => {
  setTimeout(() => onClose(), duration);

  return (
    <AnimatePresence>
      {message && (
        <Motion.div
          key="notification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="notification-message"
        >
          {message}
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationMessage;
