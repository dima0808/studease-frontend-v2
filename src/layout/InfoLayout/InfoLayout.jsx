import './InfoLayout.scss';
import { fadeUp } from '@/constants/motionVariants';
import { motion as Motion } from 'framer-motion';

const InfoLayout = ({ children }) => {
  return (
    <Motion.div
      className="info-layout-page"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {children}
    </Motion.div>
  );
};

export default InfoLayout;
