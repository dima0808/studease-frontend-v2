import { AnimatePresence, motion as Motion} from "framer-motion";
import './SplashScreen.scss'

const SplashScreen = (props) => {
  const {
    showSplash
  } = props

  return (
    <AnimatePresence>
      {showSplash && (
        <Motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="splash-title"
          >
            StudEase
          </h1>

          <p className="splash-desc">
            The easiest way to learn, test, and grow your skills online.
          </p>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen