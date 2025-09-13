import Button from "@/components/Button";
import ActionMenu from "@/components/TestCard/components/ActionMenu";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";

const CardActions = (props) => {
  const {
    id,
    isSelected,
    wide
  } = props;

  const { actionMode } = useSelector(state => state.selection)
  const { toggleItem } = useActions()

  return (
    actionMode === 'select' ? (
      <input
        type="checkbox"
        className="test-card__checkbox"
        checked={isSelected}
        onChange={() => {
          toggleItem(id);
        }}
      />
    ) : wide ? (
      <div className="test-card__actions--wide">
        <Button text="Info" theme="action" hidden={true} iconName="InfoIcon" />
        <Button text="Clone" theme="action" hidden={true} iconName="CloneIcon" />
        <Button text="Export" theme="action" hidden={true} iconName="ExportIcon" />
        <Button text="Delete" theme="action" hidden={true} iconName="RemoveIcon" />
      </div>
    ) : (
      <ActionMenu />
    )
  )
}

export default CardActions;