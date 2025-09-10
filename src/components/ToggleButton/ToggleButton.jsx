import './ToggleButton.scss'
import { useState } from "react";
import classNames from "classnames";
import { isString } from "@/utils/isString";

const ToggleButton = ({ options = [] }) => {
  const [active, setActive] = useState(1)

  return (
    <div className="toggle-button">
      {options.map((option, index) => (
        <button
          key={option.value ?? index}
          title={option.dataTitle}
          className={classNames("toggle-button__option", {
            "toggle-button__option--active": active === index
          }, {
            "toggle-button__option--text": isString(option.content),
          })}
          type="button"
          onClick={() => setActive(index)}
        >
          {option.content}
        </button>
      ))}
    </div>
  )
}

export default ToggleButton
