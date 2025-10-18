import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { cardVariants } from '@/constants/motionVariants';
import './ItemCard.scss';

const ItemCard = ({
  id,
  index,
  name,
  wide,
  selectedItems = [],
  extraContent, // блок з додатковою інформацією (для тестів/колекцій)
  actions, // блок з діями (наприклад Status + CardActions)
}) => {
  const isSelected = useMemo(
    () => selectedItems.some((item) => item.id === id),
    [selectedItems, id],
  );

  return (
    <Motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      variants={cardVariants}
      className={classNames(
        'item-card',
        { 'item-card--wide': wide },
        { 'item-card--selected': isSelected },
      )}
    >
      <div className="item-card__wrapper">
        <div className="item-card__body">
          <h2 title={name} className="item-card__title">
            {name}
          </h2>
          {extraContent && (
            <div className="item-card__description">{extraContent}</div>
          )}
        </div>
        {actions && <div className="item-card__actions">{actions}</div>}
      </div>
    </Motion.div>
  );
};

export default memo(ItemCard);
