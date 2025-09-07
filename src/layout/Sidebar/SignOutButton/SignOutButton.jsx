import SingOutIcon from "@/components/icons/SingOutIcon";

const SignOutButton = (props) => {
  const { isCollapsed } = props;

  return (
    <button title="Sign out" className="sidebar__button" type="button">
      <SingOutIcon />
      {!isCollapsed ? <span>Sign out</span> : ""}
    </button>
  )
}

export default SignOutButton