import { ROUTES, ROUTES_SECONDARY } from "@/constants/routes";
import MenuItem from "@/components/MenuItem";

const Navigation = () => {
  return (
    <nav className="sidebar__nav">
      <div className="sidebar__nav-main">
        {Object.values(ROUTES).map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
      <div className="sidebar__nav-secondary">
        <MenuItem {...ROUTES_SECONDARY.FAQ}/>
      </div>
    </nav>
  )
}

export default Navigation