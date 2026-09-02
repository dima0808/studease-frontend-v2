import {
  FileText,
  HelpCircle,
  Layers,
  LayoutDashboard,
} from 'lucide-react';

export const ROUTES = {
  DEFAULT: '/',
  REGISTER: 'register',
  TESTS: 'tests',
  COLLECTIONS: 'collections',
  COURSEBOARDS: 'courseboards',
  FAQ: 'faq',
  CREATE_TEST: 'create-test',
  CREATE_COLLECTION: 'create-collection',
  SESSION_DETAILS: 'session-details',
};
export const ROUTES_NAV = {
  TESTS: {
    href: '/tests',
    title: 'nav.tests',
    icon: FileText,
  },
  COLLECTIONS: {
    href: '/collections',
    title: 'nav.collections',
    icon: Layers,
  },
  COURSEBOARDS: {
    href: '/courseboards',
    title: 'nav.courseboards',
    icon: LayoutDashboard,
    flag: 'common.soon',
  },
};

export const ROUTES_NAV_SECONDARY = {
  FAQ: {
    href: '/faq',
    title: 'nav.faq',
    icon: HelpCircle,
  },
};
