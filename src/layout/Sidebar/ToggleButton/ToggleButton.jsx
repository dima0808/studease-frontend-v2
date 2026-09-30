import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ToggleButton = (props) => {
  const { isCollapsed, setIsCollapsed } = props;
  const { t } = useTranslation();
  const Icon = isCollapsed ? PanelLeftOpen : PanelLeftClose;
  const label = isCollapsed ? t('sidebar.expand') : t('sidebar.collapse');

  return (
    <button
      className="sidebar__toggle"
      type="button"
      title={label}
      aria-label={label}
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <Icon size={16} />
    </button>
  );
};

export default ToggleButton;
