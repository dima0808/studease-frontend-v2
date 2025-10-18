import ItemCard from '@/components/ItemCard';
import Info from '@/components/ItemCard/components/Info';
import Status from '@/components/ItemCard/components/Status';
import CardActions from '@/components/ItemCard/components/CardActions';
import StartIcon from '@/components/icons/StartIcon';
import EndIcon from '@/components/icons/EndIcon';
import GroupIcon from '@/components/icons/GroupIcon';

const TestCard = (props) => {
  const {
    id,
    index,
    isActive,
    name,
    wide,
    openDate,
    deadline,
    startedSessions,
    selectedItems,
  } = props;

  return (
    <ItemCard
      id={id}
      index={index}
      name={name}
      wide={wide}
      selectedItems={selectedItems}
      extraContent={
        <>
          <Info title="Start" description={openDate} icon={StartIcon} />
          <Info title="Deadline" description={deadline} icon={EndIcon} />
          <Info
            title="Taking right now"
            description={startedSessions}
            icon={GroupIcon}
          />
        </>
      }
      actions={
        <>
          <Status isActive={isActive} />
          <CardActions
            isSelected={selectedItems.some((i) => i.id === id)}
            name={name}
            wide={wide}
            id={id}
          />
        </>
      }
    />
  );
};

export default TestCard;
