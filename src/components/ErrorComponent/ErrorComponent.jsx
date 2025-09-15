import { MdErrorOutline } from "react-icons/md"
import Button from "@/components/Button"
import "./ErrorComponent.scss"

const ErrorComponent = ({ onRetry, description }) => {
  return (
    <div className="error-component">
      <div className="error-component__icon">
        <MdErrorOutline size={60} />
      </div>
      <h2 className="error-component__title">{description}</h2>
      <p className="error-component__text">
        Something went wrong while fetching data from the server. <br />
        Please try again in a moment ⚡
      </p>
      <Button
        iconName="RetryIcon"
        text="Retry"
        theme="primary"
        className="error-component__btn"
        onClick={onRetry}
      />
    </div>
  )
}

export default ErrorComponent
