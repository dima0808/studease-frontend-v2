import Button from "@/components/Button";
import ActionMenu from "@/components/ItemCard/components/ActionMenu";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { useLocation } from "react-router-dom";
import { ROUTES_NAV } from "@/constants/routes";

const CardActions = (props) => {
  const { id, name, isSelected, wide } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { actionMode } = useSelector((state) => state.selection);
  const { toggleItem, deleteTestById, deleteCollectionByName } = useActions();
  const { pathname } = useLocation();

  const deleteData = pathname === ROUTES_NAV.COLLECTIONS.href ? deleteCollectionByName : deleteTestById;
  const param = pathname === ROUTES_NAV.COLLECTIONS.href ? name : id;

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteData(param);
    setIsModalOpen(false);
  };

  return (
    <>
      {actionMode === "select" ? (
        <input
          type="checkbox"
          className="item-card__checkbox"
          checked={isSelected}
          onChange={() => toggleItem({ id, name })}
        />
      ) : wide ? (
        <div className="item-card__actions--wide">
          <Button text="Info" theme="action" hidden={true} iconName="InfoIcon" />
          <Button text="Clone" theme="action" hidden={true} iconName="CloneIcon" />
          <Button disabled text="Export" theme="action" hidden={true} iconName="ExportIcon" />
          <Button
            text="Delete"
            onClick={handleDelete}
            theme="action"
            hidden={true}
            iconName="RemoveIcon"
          />
        </div>
      ) : (
        <ActionMenu handleDelete={handleDelete} confirmDelete={confirmDelete} id={id} />
      )}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        title={pathname === ROUTES_NAV.COLLECTIONS.href ? "collections" : "tests"}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        data={[{ id, name }]}
      />
    </>
  );
};

export default CardActions;
