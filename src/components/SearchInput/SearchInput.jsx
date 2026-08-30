import { Search, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';
import useDebounce from '@/hooks/useDebounce';
import { useState, useEffect } from 'react';
import './SearchInput.scss';

const SearchInput = ({ placeholder }) => {
  const { search } = useSelector((state) => state.filter);
  const { setSearch } = useActions();

  const [value, setValue] = useState(search);

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  return (
    <div className="search-input">
      <Search size={16} className="search-input__icon" />
      <input
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          title="Clear text"
          type="button"
          className="search-input__clear"
          onClick={() => setValue('')}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
