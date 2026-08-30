import ItemCard from '@/components/ItemCard';
import Info from '@/components/ItemCard/components/Info';
import Status from '@/components/ItemCard/components/Status';
import CardActions from '@/components/ItemCard/components/CardActions';
import { formatDay, formatShortDate } from '@/utils/formatDate';
import classNames from 'classnames';

const TestCard = (props) => {
  const {
    id,
    index,
    isActive,
    name,
    wide,
    openDate,
    deadline,
    startedSessions = 0,
    questionsCount,
    maxScore,
    selectedItems,
  } = props;

  const statusLine = isActive
    ? `Open${startedSessions ? ` · ${startedSessions} taking now` : ''}`
    : `Closed ${formatDay(deadline)}`;

  return (
    <ItemCard
      id={id}
      index={index}
      name={name}
      wide={wide}
      isOpen={isActive}
      className="item-card--tests"
      selectedItems={selectedItems}
      statusLine={statusLine}
      tickTotal={questionsCount}
      meta={`${questionsCount} questions · ${maxScore} points`}
      extraContent={
        wide ? (
          <>
            <Info title="Opens" description={formatShortDate(openDate)} />
            <Info title="Closes" description={formatShortDate(deadline)} />
            <Info
              title="Taking now"
              description={startedSessions}
              className={classNames('item-card__info--count', {
                'item-card__info--zero': !startedSessions,
              })}
            />
          </>
        ) : (
          <>
            <Info title="Opens" description={formatShortDate(openDate)} />
            <Info title="Closes" description={formatShortDate(deadline)} />
            <Info
              title="Questions"
              description={`${questionsCount} · ${maxScore} pts`}
            />
          </>
        )
      }
      status={<Status isActive={isActive} params={['Open', 'Closed']} />}
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

export default TestCard;
