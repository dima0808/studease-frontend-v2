import './Header.scss';
import ToggleButton from '@/components/ToggleButton';
import { ACTION_OPTIONS, VIEW_OPTIONS } from '@/constants/toggleOptions';
import TabsFilter from '@/components/TabsFilter';
import { COLLECTIONS_TAB_FILTERS, TAB_FILTERS } from '@/constants/tabFilters';
import Button from '@/components/Button';
import SearchInput from '@/components/SearchInput';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';
import { filterArr } from '@/utils/filterArr';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, ROUTES_NAV } from '@/constants/routes';
import { useEffect, useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

const Header = () => {
  const { viewMode, sortBy, search } = useSelector((state) => state.filter);
  const { actionMode, selectedItems } = useSelector((state) => state.selection);
  const { tests } = useSelector((state) => state.tests);
  const { collections } = useSelector((state) => state.collections);
  const {
    setViewMode,
    setActionMode,
    selectAll,
    clearSelection,
    setSortBy,
    deleteTestsByIds,
    deleteCollectionsByIds,
  } = useActions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    clearSelection();
    setSortBy('all');
  }, [pathname, clearSelection, setSortBy]);

  const isCollectionsPage = pathname === ROUTES_NAV.COLLECTIONS.href;
  const data = isCollectionsPage ? collections : tests;
  const deleteData = isCollectionsPage
    ? deleteCollectionsByIds
    : deleteTestsByIds;

  const filteredData = filterArr(data, { sortBy, search });

  const handelActiveIndex = (value) => {
    setSortBy(value);
    if (selectedItems.length > 1) {
      clearSelection();
    }
  };

  const handleDeleteSelected = () => {
    deleteData(selectedItems);
    clearSelection();
    setIsModalOpen(false);
  };

  return (
    <div className="header">
      <div className="header__wrapper">
        <h1 className="header__title">
          Your{' '}
          {ROUTES_NAV[
            pathname.toUpperCase().replace('/', '')
          ].title.toLowerCase()}
        </h1>
        <div className="header__view">
          <ToggleButton
            mode={viewMode}
            setMode={setViewMode}
            options={VIEW_OPTIONS}
          />
          <ToggleButton
            mode={actionMode}
            setMode={setActionMode}
            options={ACTION_OPTIONS}
          />
        </div>
      </div>
      <div className="header__wrapper">
        {pathname !== ROUTES_NAV.COLLECTIONS.href ? (
          <TabsFilter
            activeIndex={sortBy}
            handelActiveIndex={handelActiveIndex}
            options={TAB_FILTERS}
          />
        ) : (
          <TabsFilter
            activeIndex={sortBy}
            handelActiveIndex={handelActiveIndex}
            options={COLLECTIONS_TAB_FILTERS}
          />
        )}
        <div className="header__view">
          {actionMode === 'select' ? (
            <>
              <Button
                text={selectedItems.length > 0 ? 'Unselect All' : 'Select All'}
                onClick={() => {
                  if (selectedItems.length > 0) {
                    clearSelection();
                  } else {
                    selectAll(filteredData);
                  }
                }}
              />
              <Button disabled={true} text="Export" iconName="ExportIcon" />
              <Button
                theme="red"
                disabled={selectedItems.length === 0}
                onClick={() => setIsModalOpen(true)}
                text="Delete"
                iconName="RemoveIcon"
              />
            </>
          ) : (
            <>
              <Button disabled={true} text="Import" iconName="ImportIcon" />
              <Button
                onClick={() =>
                  navigate(
                    `/${isCollectionsPage ? ROUTES.CREATE_COLLECTION : ROUTES.CREATE_TEST}`,
                  )
                }
                theme="primary"
                text={`Create a ${isCollectionsPage ? 'collection' : 'test'}`}
                iconName="CreateIcon"
              />
            </>
          )}
          <SearchInput placeholder="Search" />
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        title={pathname === isCollectionsPage ? 'collections' : 'tests'}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteSelected}
        data={selectedItems}
      />
    </div>
  );
};

export default Header;
