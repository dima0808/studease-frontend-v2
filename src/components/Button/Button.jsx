import './Button.scss';
import classNames from 'classnames';

/**
 * theme: 'secondary' | 'primary' | 'danger' | 'ink' | 'ghost'
 * size:  'sm' (34px) | 'md' (42px) | 'lg' (50px) | 'xl' (56px)
 *
 * `icon` is a component — a Lucide glyph — not a name. A button wider than its
 * label (`block`) starts the label at the left padding edge and pushes the
 * trailing icon right; a button that hugs its label centres naturally.
 */
const Button = (props) => {
  const {
    className,
    type = 'button',
    icon: Icon,
    iconSize = 16,
    iconPosition = 'start',
    text = 'Button',
    theme = 'secondary',
    size = 'md',
    block = false,
    onClick,
    hidden = false,
    disabled = false,
    title,
  } = props;

  const iconOnly = hidden || !text;
  const glyph = Icon ? <Icon className="button__icon" size={iconSize} /> : null;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      title={title ?? (iconOnly ? text : undefined)}
      aria-label={iconOnly ? text : undefined}
      className={classNames(
        'button',
        `button--${theme}`,
        `button--${size}`,
        { 'button--icon': iconOnly, 'button--block': block },
        className,
      )}
    >
      {iconPosition === 'start' && glyph}
      {!iconOnly && <span className="button__label">{text}</span>}
      {iconPosition === 'end' && glyph}
    </button>
  );
};

export default Button;
