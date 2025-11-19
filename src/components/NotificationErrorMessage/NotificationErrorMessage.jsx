import { useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import './NotificationErrorMessage.scss';

const NotificationErrorMessage = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  return (
    <AnimatePresence>
      {message && (
        <Motion.div
          key="notification-error"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="notification-error-message"
        >
          <AlertCircle size={18} className="icon" />
          <span>{message}</span>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationErrorMessage;
