import Button from "@/components/Button";
import { MdOutlineSearchOff } from "react-icons/md"
import './EmptyData.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES, ROUTES_NAV } from "@/constants/routes";

const EmptyData = ({ name }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isCollectionsPage = pathname === ROUTES_NAV.COLLECTIONS.href

  return (
    <div className="empty-data">
      <div className="empty-data__icon">
        <MdOutlineSearchOff size={60} />
      </div>
      <h2 className="empty-data__title">No {name} found</h2>
      <p className="empty-data__text">
        Try adjusting your filters or
        create a new {name.slice(0, -1)} right now 🚀
      </p>
      <Button onClick={() => navigate(`/${isCollectionsPage ? ROUTES.CREATE_COLLECTION : ROUTES.CREATE_TEST}`)} iconName="CreateIcon" text={`Create a ${name.slice(0, -1)}`} theme="primary" className="empty-data__btn" />
    </div>
  )
}

export default EmptyData
