import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { cardVariants } from '@/constants/motionVariants';
import TickStrip from '@/components/TickStrip';
import './ItemCard.scss';

/**
 * One item, two shapes. In table view the card *is* the grid row, so its cells
 * are direct children and the column template comes from the page. In grid view
 * it is a bordered card on the surface: state line, name, tick strip, meta.
 */
const ItemCard = ({
  id,
  index,
  name,
  wide,
  className,
  selectedItems = [],
  isOpen = true,
  meta, // table sub-line: "12 questions · 100 points"
  statusLine, // grid state line: "Open · 3 taking now"
  tickTotal, // one tick per question
  extraContent, // <Info /> rows — table cells or grid meta rows
  status, // the table's status tag
  actions,
}) => {
  const isSelected = useMemo(
    () => selectedItems.some((item) => item.id === id),
    [selectedItems, id],
  );

  const motionProps = {
    custom: index,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    layout: true,
    variants: cardVariants,
  };

  if (wide) {
    return (
      <Motion.div
        {...motionProps}
        className={classNames(
          'item-card',
          'item-card--wide',
          { 'item-card--selected': isSelected, 'item-card--closed': !isOpen },
          className,
        )}
      >
        <div className="item-card__name">
          <span title={name} className="item-card__title">
            {name}
          </span>
          {meta && <span className="item-card__meta">{meta}</span>}
        </div>
        {extraContent}
        <span className="item-card__status-cell">{status}</span>
        <div className="item-card__row-actions">{actions}</div>
      </Motion.div>
    );
  }

  return (
    <Motion.div
      {...motionProps}
      className={classNames(
        'item-card',
        { 'item-card--selected': isSelected, 'item-card--closed': !isOpen },
        className,
      )}
    >
      <div className="item-card__head">
        <span
          className={classNames('item-card__state', {
            'item-card__state--closed': !isOpen,
          })}
        >
          {statusLine}
        </span>
        {actions}
      </div>

      <h2 title={name} className="item-card__title">
        {name}
      </h2>

      {tickTotal ? <TickStrip total={tickTotal} uniform /> : null}

      {extraContent && (
        <div className="item-card__meta-block">{extraContent}</div>
      )}
    </Motion.div>
  );
};

export default memo(ItemCard);
