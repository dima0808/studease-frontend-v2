import classNames from "classnames";

const Info = (props) => {
  const {
    title,
    description,
    icon: Icon,
    className
  } = props

  return (
    <div className={classNames("item-card__info", className)}>
      <div className="item-card__icon">
        <Icon />
      </div>
      <div className="item-card__info-description">
        <span>{title}: </span>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Info;