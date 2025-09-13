import classNames from "classnames";
import { isString } from "@/utils/isString";
import { icons } from "@/components/icons";
import './ToggleButton.scss'

const ToggleButton = ({ options = [], mode, setMode }) => {
  return (
    <div className="toggle-button">
      {options.map((option, index) => {
        const IconComponent = icons[option.iconName]

        return (
          <button
            key={option.value ?? index}
            title={option.dataTitle}
            className={classNames("toggle-button__option", {
              "toggle-button__option--active": mode === option.value,
            }, {
              "toggle-button__option--text": isString(option.content),
            })}
            type="button"
            onClick={() => setMode(option.value)}
          >
            {IconComponent ? <IconComponent/> : option.content}
          </button>
        )
      })}
    </div>
  )
}

export default ToggleButton
