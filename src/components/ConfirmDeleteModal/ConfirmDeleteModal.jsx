import { motion as Motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import './ConfirmDeleteModal.scss';
import Button from '@/components/Button';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, kind, data }) => {
  const { t } = useTranslation();
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
              {t(
                `confirmDelete.${data.length > 1 ? 'titleMany' : 'titleOne'}_${kind}`,
              )}
            </h2>
            <p className="modal-text">{t('confirmDelete.text')}</p>

            <ul className="modal-list">
              {data.map((item) => (
                <li key={item.id} className="modal-list__item">
                  {item.name}
                </li>
              ))}
            </ul>

            <div className="modal-actions">
              <Button text={t('confirmDelete.cancel')} onClick={onClose} />
              <Button
                text={t('confirmDelete.delete')}
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
