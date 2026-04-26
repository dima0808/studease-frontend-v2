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
import { useEffect, useRef, useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import NotificationMessage from '@/components/NotificationMessage';
import {
  createTransferBundlePayload,
  downloadTransferPayload,
  parseTransferFile,
} from '@/utils/jsonTransfer';

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
    getFullTestById,
    getFullCollectionById,
    createTest,
    createCollection,
    getAllTests,
    getAllCollections,
  } = useActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const importInputRef = useRef(null);

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
  const createData = isCollectionsPage ? createCollection : createTest;
  const getFullData = isCollectionsPage ? getFullCollectionById : getFullTestById;
  const refreshData = isCollectionsPage ? getAllCollections : getAllTests;
  const importKind = isCollectionsPage ? 'collection' : 'test';

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

  const showNotification = (message, type = null) => {
    setNotification(message);
    setNotificationType(type);
  };

  const handleExportSelected = async () => {
    try {
      const items = await Promise.all(
        selectedItems.map((item) => getFullData(item.id).unwrap()),
      );
      const payload = createTransferBundlePayload(importKind, items);

      downloadTransferPayload(importKind, payload, `selected-${items.length}`);
      showNotification(`${items.length} ${importKind}s exported successfully!`);
    } catch (error) {
      console.error('Failed to export selected items:', error);
      showNotification('Error exporting selected data!', 'error');
    }
  };

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    try {
      const result = await parseTransferFile(file, importKind);

      if (result.items.length === 1) {
        navigate(
          `/${isCollectionsPage ? ROUTES.CREATE_COLLECTION : ROUTES.CREATE_TEST}`,
          {
            state: {
              importData: result.items[0],
              importKind,
            },
          },
        );
        return;
      }

      await Promise.all(result.items.map((item) => createData(item).unwrap()));
      await refreshData();
      showNotification(
        `${result.items.length} ${importKind}s imported successfully!`,
      );
    } catch (error) {
      console.error('Failed to import file:', error);
      showNotification(error.message || 'Error importing file!', 'error');
    }
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
              <Button
                disabled={selectedItems.length === 0}
                text="Export"
                onClick={handleExportSelected}
                iconName="ExportIcon"
              />
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
              <Button
                text="Import"
                onClick={() => importInputRef.current?.click()}
                iconName="ImportIcon"
              />
              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={handleImportFile}
              />
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
        title={isCollectionsPage ? 'collections' : 'tests'}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteSelected}
        data={selectedItems}
      />
      {notification && (
        <NotificationMessage
          type={notificationType}
          message={notification}
          onClose={() => {
            setNotification(null);
            setNotificationType(null);
          }}
        />
      )}
    </div>
  );
};

export default Header;
