import classNames from "classnames";

const Status = (props) => {
  const {
    isActive,
    params = ["Active", "Inactive"]
  } = props;
  return (
    <div className="item-card__status-wrapper">
      <div className={classNames("item-card__status", {
        "item-card__status--inactive": !isActive
      })}>
        {isActive ? params[0] : params[1]}
      </div>
    </div>
  )
}

export default Status