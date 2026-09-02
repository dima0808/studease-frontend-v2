// `content` and `dataTitle` hold i18n keys; TabsFilter resolves them with t().
export const TAB_FILTERS = [
  { value: 'all', content: 'filters.all', dataTitle: 'filters.hint.allTests' },
  {
    value: 'active',
    content: 'filters.open',
    dataTitle: 'filters.hint.openTests',
  },
  {
    value: 'unactive',
    content: 'filters.closed',
    dataTitle: 'filters.hint.closedTests',
  },
];

export const COLLECTIONS_TAB_FILTERS = [
  {
    value: 'all',
    content: 'filters.all',
    dataTitle: 'filters.hint.allCollections',
  },
  {
    value: 'inuse',
    content: 'filters.inUse',
    dataTitle: 'filters.hint.collectionsInUse',
  },
  {
    value: 'notinuse',
    content: 'filters.unused',
    dataTitle: 'filters.hint.collectionsNotInUse',
  },
];
