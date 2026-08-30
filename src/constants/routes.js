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
    title: 'Tests',
    icon: FileText,
  },
  COLLECTIONS: {
    href: '/collections',
    title: 'Collections',
    icon: Layers,
  },
  COURSEBOARDS: {
    href: '/courseboards',
    title: 'Courseboards',
    icon: LayoutDashboard,
    flag: 'Soon',
  },
};

export const ROUTES_NAV_SECONDARY = {
  FAQ: {
    href: '/faq',
    title: 'Help & FAQ',
    icon: HelpCircle,
  },
};
