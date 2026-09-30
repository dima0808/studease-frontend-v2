import classNames from 'classnames';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';
import EmptyData from '@/components/EmptyData';
import { filterArr } from '@/utils/filterArr';
import './GenericListPage.scss';

const GenericListPage = ({
  name, // "collections" | "tests"
  selector, // state => state.collections / state.tests
  getAllAction, // () => dispatch(...)
  renderItem, // (item, index, viewMode, selectedItems) => JSX
  columns = [], // table header labels, left to right
  hasSort = false,
}) => {
  const { viewMode, search, sortBy } = useSelector((state) => state.filter);
  const { data, isLoading, error } = useSelector(selector);
  const { selectedItems } = useSelector((state) => state.selection);
  const { t } = useTranslation();

  useEffect(() => {
    getAllAction();
  }, [getAllAction]);

  const filteredData = filterArr(data, { search, ...(hasSort && { sortBy }) });

  if (isLoading) return <Loading text={t(`entities.${name}`)} />;
  if (error)
    return <ErrorComponent description={error} onRetry={getAllAction} />;
  if (filteredData.length === 0) return <EmptyData name={name} />;

  const isTable = viewMode === 'table';

  return (
    <div
      key={viewMode + search + (hasSort ? sortBy : '')}
      className={classNames('list-page', `${name}-page`, {
        'list-page--grid': !isTable,
        'list-page--table': isTable,
        [`${name}-page__grid`]: !isTable,
        [`${name}-page__table`]: isTable,
      })}
    >
      {isTable && columns.length > 0 && (
        <div className={classNames('list-page__head', `${name}-page__head`)}>
          {columns.map((column, index) => (
            <span key={column || index}>{column}</span>
          ))}
        </div>
      )}

      <AnimatePresence>
        {filteredData.map((item, index) =>
          renderItem(item, index, viewMode, selectedItems),
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenericListPage;
