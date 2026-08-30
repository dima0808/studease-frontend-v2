import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const ToggleButton = (props) => {
  const { isCollapsed, setIsCollapsed } = props;
  const Icon = isCollapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <button
      className="sidebar__toggle"
      type="button"
      title={isCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'}
      aria-label={isCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'}
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <Icon size={16} />
    </button>
  );
};

export default ToggleButton;
