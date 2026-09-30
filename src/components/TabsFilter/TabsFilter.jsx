import './TabsFilter.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const TabsFilter = (props) => {
  const { options = [], activeIndex, handelActiveIndex, counts } = props;
  const { t } = useTranslation();

  return (
    <div className="tabs-filter">
      {options.map((option, index) => {
        const count = counts?.[option.value];

        return (
          <button
            key={option.value ?? index}
            type="button"
            title={option.dataTitle ? t(option.dataTitle) : undefined}
            className={classNames('tabs-filter__option', {
              'tabs-filter__option--active': option.value === activeIndex,
            })}
            onClick={() => handelActiveIndex(option.value)}
          >
            {t(option.content)}
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
