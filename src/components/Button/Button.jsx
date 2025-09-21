import './Button.scss'
import { icons } from "@/components/icons";
import classNames from "classnames";

const Button = (props) => {
  const {
    className,
    type = 'button',
    iconName,
    text = 'Button',
    /*
    * theme: 'default' | 'dark' | 'primary'
     */
    theme = 'default',
    onClick,
    hidden = false,
    disabled = false,
  } = props

  const IconComponent = icons[iconName];
  return (
    <button disabled={disabled} onClick={onClick} title={text} type={type} className={classNames("button", className, `button--${theme}`)}>
      {IconComponent && <IconComponent className="button__icon" />}
      {hidden ? null : text}
    </button>
  )
}

export default Button