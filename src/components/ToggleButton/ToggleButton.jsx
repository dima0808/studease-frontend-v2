import { useState } from "react";
import classNames from "classnames";
import { isString } from "@/utils/isString";
import { icons } from "@/components/icons";
import './ToggleButton.scss'

const ToggleButton = ({ options = [] }) => {
  const [active, setActive] = useState(1)

  return (
    <div className="toggle-button">
      {options.map((option, index) => {
        const IconComponent = icons[option.iconName]

        return (
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
            {IconComponent ? <IconComponent/> : option.content}
          </button>
        )
      })}
    </div>
  )
}

export default ToggleButton
