import Button from '@/components/Button';
import ActionMenu from '@/components/ItemCard/components/ActionMenu';
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions';
import { useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, ROUTES_NAV } from '@/constants/routes';

const CardActions = (props) => {
  const { id, name, isSelected, wide } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { actionMode } = useSelector((state) => state.selection);
  const { toggleItem, deleteTestById, deleteCollectionById } = useActions();
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
    if (!isCollectionsPage) {
      navigate(`/${ROUTES.TESTS}/${id}`);
    }
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteData(id);
    setIsModalOpen(false);
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
            disabled
            text="Export"
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
          navigateToInfo={navigateToInfo}
          navigateToClone={navigateToClone}
          handleDelete={handleDelete}
          confirmDelete={confirmDelete}
          id={id}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        title={isCollectionsPage ? 'collections' : 'tests'}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        data={[{ id, name }]}
      />
    </>
  );
};

export default CardActions;
