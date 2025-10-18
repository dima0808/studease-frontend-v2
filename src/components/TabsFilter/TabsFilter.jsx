import './TabsFilter.scss';
import classNames from 'classnames';
import { useActions } from '@/hooks/useActions';
import { useSelector } from 'react-redux';

const TabsFilter = (props) => {
  const { options = [], activeIndex, handelActiveIndex } = props;

  return (
    <div className="tabs-filter">
      {options.map((option, index) => (
        <button
          key={option.value ?? index}
          title={option.dataTitle}
          className={classNames('tabs-filter__option', {
            'tabs-filter__option--active': option.value === activeIndex,
          })}
          onClick={() => handelActiveIndex(option.value)}
        >
          {option.content}
        </button>
      ))}
    </div>
  );
};

export default TabsFilter;
