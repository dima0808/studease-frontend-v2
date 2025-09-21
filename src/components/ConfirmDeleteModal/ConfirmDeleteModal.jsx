import { motion as Motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import "./ConfirmDeleteModal.scss";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, tests }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
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
              Are you sure you want to delete {tests.length > 1 ? "these tests" : "this test"}?
            </h2>
            <p className="modal-text">This action cannot be undone.</p>

            <ul className="modal-list">
              {tests.map((test) => (
                <li key={test.id} className="modal-list__item">
                  {test.name}
                </li>
              ))}
            </ul>

            <div className="modal-actions">
              <button className="btn cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="btn delete" onClick={onConfirm}>
                Delete
              </button>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmDeleteModal;
