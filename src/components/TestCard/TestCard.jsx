import classNames from "classnames";
import StartIcon from "@/components/icons/StartIcon";
import EndIcon from "@/components/icons/EndIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import Info from "@/components/TestCard/components/Info";
import Status from "@/components/TestCard/components/Status";
import CardActions from "@/components/TestCard/components/CardActions";
import { memo, useMemo } from "react";
import './TestCard.scss'

const TestCard = (props) => {
  const {
    id,
    isActive,
    title,
    wide,
    start,
    deadline,
    takingNow,
    selectedIds,
  } = props;
  const isSelected = useMemo(() => selectedIds.includes(id), [selectedIds, id]);

  return (
    <div
      className={classNames("test-card", { "test-card--wide": wide },
        { "test-card--selected": isSelected })}
    >
      <div className="test-card__wrapper">
        <div className="test-card__body">
          <h2 title={title} className="test-card__title">{title}</h2>
          <div className="test-card__description">
            <Info
              title="Start"
              description={start}
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
              description={takingNow}
              icon={GroupIcon}
            />
          </div>
        </div>
        <div className="test-card__actions">
          <Status isActive={isActive} />
          <CardActions isSelected={isSelected} wide={wide} id={id}/>
        </div>
      </div>
    </div>
  )
}

export default memo(TestCard);