import { LayoutGrid, Table } from 'lucide-react';

// `content` and `dataTitle` hold i18n keys; ToggleButton resolves them with t().
export const VIEW_OPTIONS = [
  { value: 'table', icon: Table, dataTitle: 'view.table' },
  { value: 'grid', icon: LayoutGrid, dataTitle: 'view.grid' },
];

export const ACTION_OPTIONS = [
  { value: 'view', content: 'view.view', dataTitle: 'view.viewHint' },
  { value: 'select', content: 'view.select', dataTitle: 'view.selectHint' },
];
