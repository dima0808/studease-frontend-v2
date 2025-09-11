import './SearchInput.scss'
import { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import { MdClear } from "react-icons/md";

const SearchInput = (props) => {
  const { placeholder } = props
  const [value, setValue] = useState('')

  return (
    <div className="search-input">
      <SearchIcon className="search-input__icon"/>
      <input
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {value && <button title="Clear text" type="button" className="search-input__clear" onClick={() => setValue('')}>
        <MdClear size={19} className={"search-input__clear-icon"} />
      </button>}
    </div>
  )
}

export default SearchInput