import SingOutIcon from "@/components/icons/SingOutIcon";
import { Link } from "react-router-dom";
import { useActions } from "@/hooks/useActions";

const SignOutButton = (props) => {
  const { isCollapsed } = props;
  const { logout } = useActions()

  return (
    <Link to="/" onClick={() => logout()} title="Sign out" className="sidebar__button" type="button">
      <SingOutIcon />
      {!isCollapsed ? <span>Sign out</span> : ""}
    </Link>
  )
}

export default SignOutButton