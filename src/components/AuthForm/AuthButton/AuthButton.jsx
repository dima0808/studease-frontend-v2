import classNames from "classnames";

const AuthButton = (props) => {
  const { title, isLoading } = props;

  return (
    <button type="submit" className={classNames("auth-form__button", {
      "auth-form__button--loading": isLoading,
    })}>
      {title}
    </button>
  )
}

export default AuthButton;