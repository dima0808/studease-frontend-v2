import classNames from "classnames";
import arrowLeft from "@/assets/icons/arrow-left.svg";

const ToggleButton = (props) => {
  const {
    isCollapsed,
    setIsCollapsed,
  } = props
  return (
    <button
      className="sidebar__toggle"
      type="button"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <img
        className={classNames({
          'sidebar__toggle--right': isCollapsed,
        })}
        src={arrowLeft}
        alt="Arrow left icon"
      />
    </button>
  )
}

export default ToggleButton