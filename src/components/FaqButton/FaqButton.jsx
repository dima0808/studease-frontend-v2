import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi';
import './FaqButton.scss';

const FaqButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/faq');
  };

  return (
    <Motion.button
      title="FAQ"
      className="faq-button"
      onClick={handleClick}
      initial={{ scale: 0.9, opacity: 0, x: 50, y: -20 }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <FiHelpCircle className="faq-icon" />
    </Motion.button>
  );
};

export default FaqButton;
