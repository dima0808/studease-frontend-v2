import Button from '@/components/Button';
import ActionMenu from '@/components/ItemCard/components/ActionMenu';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';
import { useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, ROUTES_NAV } from '@/constants/routes';
import { FRONTEND_PORT, HTTP_PROTOCOL, IP } from '@/constants/config';
import NotificationMessage from '@/components/NotificationMessage';
import {
  createTransferPayload,
  downloadTransferPayload,
} from '@/utils/jsonTransfer';

const CardActions = (props) => {
  const { id, name, isSelected, wide } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const { actionMode } = useSelector((state) => state.selection);
  const { errorTestAction } = useSelector((state) => state.tests);
  const { errorCollectionAction } = useSelector((state) => state.collections);

  const {
    toggleItem,
    deleteTestById,
    deleteCollectionById,
    setErrorTestAction,
    setErrorCollectionAction,
    getFullTestById,
    getFullCollectionById,
  } = useActions();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isCollectionsPage = pathname === ROUTES_NAV.COLLECTIONS.href;

  const deleteData = isCollectionsPage ? deleteCollectionById : deleteTestById;

  const navigateToClone = () => {
    navigate(
      `/${isCollectionsPage ? ROUTES.CREATE_COLLECTION : ROUTES.CREATE_TEST}?cloneId=${id}`,
    );
  };

  const navigateToInfo = () => {
    navigate(`/${isCollectionsPage ? ROUTES.COLLECTIONS : ROUTES.TESTS}/${id}`);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteData(id);
    setIsModalOpen(false);
  };

  const testLink = `${HTTP_PROTOCOL}://${IP}${FRONTEND_PORT}/${id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(testLink);
      setNotification(`Link to test "${name}" copied successfully!`);
    } catch (err) {
      console.error('Failed to copy link:', err);
      setNotification('Error copying link!');
    }
  };

  const handleExport = async () => {
    try {
      const kind = isCollectionsPage ? 'collection' : 'test';
      const data = isCollectionsPage
        ? await getFullCollectionById(id).unwrap()
        : await getFullTestById(id).unwrap();
      const payload = createTransferPayload(kind, data);

      downloadTransferPayload(kind, payload, name);
      setNotification(`"${name}" exported successfully!`);
    } catch (error) {
      console.error('Failed to export:', error);
      setNotification('Error exporting data!');
    }
  };

  return (
    <>
      {actionMode === 'select' ? (
        <input
          type="checkbox"
          className="item-card__checkbox"
          checked={isSelected}
          onChange={() => toggleItem({ id, name })}
        />
      ) : wide ? (
        <div className="item-card__actions--wide">
          {pathname === ROUTES_NAV.TESTS.href && (
            <Button
              text="Copy Link"
              onClick={handleCopyLink}
              iconName="LinkIcon"
              theme="action"
              hidden={true}
            />
          )}
          <Button
            text="Info"
            onClick={navigateToInfo}
            theme="action"
            hidden={true}
            iconName="InfoIcon"
          />
          <Button
            text="Clone"
            onClick={() => navigateToClone()}
            theme="action"
            hidden={true}
            iconName="CloneIcon"
          />
          <Button
            text="Export"
            onClick={handleExport}
            theme="action"
            hidden={true}
            iconName="ExportIcon"
          />
          <Button
            text="Delete"
            onClick={handleDelete}
            theme="action"
            hidden={true}
            iconName="RemoveIcon"
          />
        </div>
      ) : (
        <ActionMenu
          handleCopyLink={handleCopyLink}
          navigateToInfo={navigateToInfo}
          navigateToClone={navigateToClone}
          handleDelete={handleDelete}
          handleExport={handleExport}
          confirmDelete={confirmDelete}
          id={id}
          name={name}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        title={isCollectionsPage ? 'collections' : 'tests'}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        data={[{ id, name }]}
      />

      {(errorTestAction || errorCollectionAction) && (
        <NotificationMessage
          type="error"
          message={isCollectionsPage ? errorCollectionAction : errorTestAction}
          onClose={() => isCollectionsPage ? setErrorCollectionAction(null) : setErrorTestAction(null)}
        />
      )}

      {notification && (
        <NotificationMessage
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default CardActions;
