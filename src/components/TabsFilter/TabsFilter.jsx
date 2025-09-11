import './TabsFilter.scss'
import { useState } from "react";
import classNames from "classnames";

const TabsFilter = (props) => {
  const {
    options = [],
  } = props

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="tabs-filter">
      {options.map((option, index) => (
        <button
          key={option.value ?? index}
          title={option.dataTitle}
          className={classNames("tabs-filter__option", { "tabs-filter__option--active": index === activeIndex })}
          onClick={() => setActiveIndex(index)}
        >
          {option.content}
        </button>
      ))}
    </div>
  )
}

export default TabsFilter