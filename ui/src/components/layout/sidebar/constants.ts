export const DRAWER_WIDTH = 280;

export const NAV_SECTIONS = {
  MAIN: 'Main',
  MANAGEMENT: 'Management',
  SYSTEM: 'System',
  ACCOUNT: 'Account',
} as const;

export const NAV_ITEMS_BY_SECTION = {
  [NAV_SECTIONS.MAIN]: ['Dashboard', 'Configurations', 'Network Status'],
  [NAV_SECTIONS.MANAGEMENT]: ['Notification channels', 'Users', 'Company'],
  [NAV_SECTIONS.SYSTEM]: ['Tail log', 'Audit'],
  [NAV_SECTIONS.ACCOUNT]: ['Logout'],
} as const;