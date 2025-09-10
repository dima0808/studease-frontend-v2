import classNames from "classnames";
import StartIcon from "@/components/icons/StartIcon";
import EndIcon from "@/components/icons/EndIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import Info from "@/components/TestCard/components/Info";
import Status from "@/components/TestCard/components/Status";
import ActionButton from "@/components/TestCard/components/ActionButton";
import './TestCard.scss'

const TestCard = (props) => {
  const { isActive, title, wide } = props;

  return (
    <div className={classNames("test-card", { "test-card--wide": wide })}>
      <div className="test-card__wrapper">
        <div className="test-card__body">
          <h2 title={title} className="test-card__title">{title}</h2>
          <div className="test-card__description">
            <Info
              title="Start"
              description="23:00 01.12.2024"
              icon={StartIcon}
            />
            <Info
              title="Deadline"
              description="23:00 01.12.2024"
              icon={EndIcon}
            />
            <Info
              title="Taking right now"
              description={1}
              icon={GroupIcon}
            />
          </div>
        </div>
        <div className="test-card__actions">
          <Status isActive={isActive}/>
          <ActionButton />
        </div>
      </div>
    </div>
  )
}

export default TestCard