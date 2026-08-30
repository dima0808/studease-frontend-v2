import './TabsFilter.scss';
import classNames from 'classnames';

const TabsFilter = (props) => {
  const { options = [], activeIndex, handelActiveIndex, counts } = props;

  return (
    <div className="tabs-filter">
      {options.map((option, index) => {
        const count = counts?.[option.value];

        return (
          <button
            key={option.value ?? index}
            type="button"
            title={option.dataTitle}
            className={classNames('tabs-filter__option', {
              'tabs-filter__option--active': option.value === activeIndex,
            })}
            onClick={() => handelActiveIndex(option.value)}
          >
            {option.content}
            {count !== undefined && (
              <span className="tabs-filter__count">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabsFilter;
