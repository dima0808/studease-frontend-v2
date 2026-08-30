import classNames from 'classnames';

/**
 * A label/value row. The value is a measurement, so it is set in Archivo 800
 * with locked digit widths. No icon: the label already says what it is.
 */
const Info = (props) => {
  const { title, description, className } = props;

  return (
    <div className={classNames('item-card__info', className)}>
      <span className="item-card__info-label">{title}</span>
      <span className="item-card__info-value">{description}</span>
    </div>
  );
};

export default Info;
