import ItemCard from '@/components/ItemCard';
import Info from '@/components/ItemCard/components/Info';
import CardActions from '@/components/ItemCard/components/CardActions';
import Status from '@/components/ItemCard/components/Status';
import classNames from 'classnames';

const CollectionCard = (props) => {
  const {
    id,
    index,
    name,
    questionsCount = 0,
    wide,
    selectedItems,
    usedInTests = 0,
  } = props;

  const isUsed = usedInTests > 0;

  return (
    <ItemCard
      id={id}
      index={index}
      name={name}
      wide={wide}
      isOpen={isUsed}
      className="item-card--collections"
      selectedItems={selectedItems}
      statusLine={isUsed ? `In use · ${usedInTests} tests` : 'Unused'}
      meta={`${questionsCount} questions`}
      extraContent={
        <>
          <Info
            title="Questions"
            description={questionsCount}
            className={classNames('item-card__info--count', {
              'item-card__info--zero': !questionsCount,
            })}
          />
          <Info
            title="Used in tests"
            description={usedInTests}
            className={classNames('item-card__info--count', {
              'item-card__info--zero': !isUsed,
            })}
          />
        </>
      }
      status={<Status isActive={isUsed} params={['In use', 'Unused']} />}
      actions={
        <CardActions
          isSelected={selectedItems.some((i) => i.id === id)}
          name={name}
          wide={wide}
          id={id}
        />
      }
    />
  );
};

export default CollectionCard;
