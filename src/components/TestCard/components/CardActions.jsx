import Button from "@/components/Button";
import ActionMenu from "@/components/TestCard/components/ActionMenu";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const CardActions = (props) => {
  const { id, name, isSelected, wide } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { actionMode } = useSelector((state) => state.selection);
  const { toggleItem, deleteTestById } = useActions();

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteTestById(id);
    setIsModalOpen(false);
  };

  return (
    <>
      {actionMode === "select" ? (
        <input
          type="checkbox"
          className="test-card__checkbox"
          checked={isSelected}
          onChange={() => toggleItem({ id, name })}
        />
      ) : wide ? (
        <div className="test-card__actions--wide">
          <Button text="Info" theme="action" hidden={true} iconName="InfoIcon" />
          <Button text="Clone" theme="action" hidden={true} iconName="CloneIcon" />
          <Button text="Export" theme="action" hidden={true} iconName="ExportIcon" />
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
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        tests={[{ id, name }]}
      />
    </>
  );
};

export default CardActions;
