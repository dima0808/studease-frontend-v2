import ItemCard from '@/components/ItemCard';
import Info from '@/components/ItemCard/components/Info';
import CardActions from '@/components/ItemCard/components/CardActions';
import Status from '@/components/ItemCard/components/Status';
import CountIcon from '@/components/icons/CountIcon';
import UsedIcon from '@/components/icons/UsedIcon';

const CollectionCard = (props) => {
  const { id, index, name, questionsCount, wide, selectedItems, usedInTests } =
    props;
  return (
    <ItemCard
      id={id}
      index={index}
      name={name}
      wide={wide}
      selectedItems={selectedItems}
      extraContent={
        <>
          <Info
            title="Questions count"
            description={questionsCount}
            icon={CountIcon}
          />
          <Info
            title="Used in the tests"
            description={usedInTests}
            icon={UsedIcon}
          />
        </>
      }
      actions={
        <>
          <Status isActive={usedInTests > 0} params={['In use', 'Not use']} />
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

export default CollectionCard;
