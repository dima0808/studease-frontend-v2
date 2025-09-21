import classNames from "classnames";
import StartIcon from "@/components/icons/StartIcon";
import EndIcon from "@/components/icons/EndIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import Info from "@/components/TestCard/components/Info";
import Status from "@/components/TestCard/components/Status";
import CardActions from "@/components/TestCard/components/CardActions";
import { memo, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import './TestCard.scss'
import { cardVariants } from "@/constants/motionVariants";

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
  const isSelected = useMemo(() => selectedItems.some(item => item.id === id), [selectedItems, id]);

  return (
    <Motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      variants={cardVariants}
      className={classNames("test-card", { "test-card--wide": wide },
        { "test-card--selected": isSelected })}
    >
      <div className="test-card__wrapper">
        <div className="test-card__body">
          <h2 title={name} className="test-card__title">{name}</h2>
          <div className="test-card__description">
            <Info
              title="Start"
              description={openDate}
              icon={StartIcon}
            />
            <Info
              title="Deadline"
              description={deadline}
              icon={EndIcon}
            />
            <Info
              className="test-card__info--taking-now"
              title="Taking right now"
              description={startedSessions}
              icon={GroupIcon}
            />
          </div>
        </div>
        <div className="test-card__actions">
          <Status isActive={isActive} />
          <CardActions isSelected={isSelected} name={name} wide={wide} id={id}/>
        </div>
      </div>
    </Motion.div>
  )
}

export default memo(TestCard);