const Info = (props) => {
  const {
    title,
    description,
    icon: Icon,
  } = props
  return (
    <div className="test-card__info">
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