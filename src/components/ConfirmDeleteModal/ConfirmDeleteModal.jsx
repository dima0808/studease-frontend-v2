import { motion as Motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import './ConfirmDeleteModal.scss';
import Button from '@/components/Button';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title, data }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">
              {data.length > 1
                ? `Oops! Delete these ${title}?`
                : `Delete this ${title.slice(0, -1)}?`}
            </h2>
            <p className="modal-text">Once deleted, there’s no going back.</p>

            <ul className="modal-list">
              {data.map((item) => (
                <li key={item.id} className="modal-list__item">
                  {item.name}
                </li>
              ))}
            </ul>

            <div className="modal-actions">
              <Button text="Cancel" onClick={onClose} />
              <Button
                text="Delete"
                iconName="RemoveIcon"
                onClick={onConfirm}
                theme="red"
              />
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ConfirmDeleteModal;
