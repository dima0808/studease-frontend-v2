import Button from "@/components/Button";
import { MdOutlineSearchOff } from "react-icons/md"
import './EmptyTests.scss'

const EmptyTests = () => {
  return (
    <div className="empty-tests">
      <div className="empty-tests__icon">
        <MdOutlineSearchOff size={60} />
      </div>
      <h2 className="empty-tests__title">No tests found</h2>
      <p className="empty-tests__text">
        Try adjusting your filters or
        create a new test right now 🚀
      </p>
      <Button iconName="CreateIcon" text="Create a test" theme="primary" className="empty-tests__btn"/>
    </div>
  )
}

export default EmptyTests
