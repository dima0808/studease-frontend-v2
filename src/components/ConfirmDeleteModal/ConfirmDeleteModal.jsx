import { motion as Motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import './ConfirmDeleteModal.scss';
import Button from '@/components/Button';
import { Trash2 } from 'lucide-react';

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">
              {data.length > 1
                ? `Oops! Delete these ${title}?`
                : `Delete this ${title.slice(0, -1)}?`}
            </h2>
            <p className="modal-text">Once deleted, there is no going back.</p>

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
                icon={Trash2}
                onClick={onConfirm}
                theme="danger"
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
