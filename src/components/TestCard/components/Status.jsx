import classNames from "classnames";

const Status = ({ isActive }) => {
  return (
    <div className="test-card__status-wrapper">
      <div className={classNames("test-card__status", {
        "test-card__status--inactive": !isActive
      })}>
        {isActive ? "Active" : "Inactive"}
      </div>
    </div>
  )
}

export default Status