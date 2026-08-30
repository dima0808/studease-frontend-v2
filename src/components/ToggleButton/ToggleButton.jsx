import classNames from 'classnames';
import { isString } from '@/utils/isString';
import './ToggleButton.scss';

/**
 * The design system's segmented control: one bordered strip, options divided by
 * a 1px rule, the selected option filled accent. No gaps, no per-option border.
 */
const ToggleButton = ({ options = [], mode, setMode }) => {
  return (
    <div className="toggle-button">
      {options.map((option, index) => {
        const Icon = option.icon;
        const isText = isString(option.content);

        return (
          <button
            key={option.value ?? index}
            title={option.dataTitle}
            className={classNames('toggle-button__option', {
              'toggle-button__option--active': mode === option.value,
              'toggle-button__option--text': isText,
            })}
            type="button"
            aria-pressed={mode === option.value}
            onClick={() => setMode(option.value)}
          >
            {Icon ? <Icon size={15} /> : option.content}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleButton;
