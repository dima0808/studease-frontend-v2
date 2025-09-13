import classNames from "classnames";

const Info = (props) => {
  const {
    title,
    description,
    icon: Icon,
    className
  } = props

  return (
    <div className={classNames("test-card__info", className)}>
      <div className="test-card__icon">
        <Icon />
      </div>
      <div className="test-card__info-description">
        <span>{title}: </span>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Info;