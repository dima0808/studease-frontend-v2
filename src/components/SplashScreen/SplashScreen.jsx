import { AnimatePresence, motion as Motion } from 'framer-motion';
import './SplashScreen.scss';

const SplashScreen = ({ showSplash }) => {
  return (
    <AnimatePresence>
      {showSplash && (
        <Motion.div
          className="splash-screen"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <h1 className="splash-title">StudEase</h1>
          <p className="splash-desc">
            The easiest way to learn, test, and grow your skills online.
          </p>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
