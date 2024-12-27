import { useMemo } from 'react';
import { navbarItems } from '../../../../Navbar';
import { NAV_SECTIONS, NAV_ITEMS_BY_SECTION } from '../constants';
import { NavSection } from '../types';

export const useNavSections = () => {
  const sections = useMemo(() => {
    const filterItemsBySection = (sectionItems: readonly string[]) => 
      navbarItems.filter(item => sectionItems.includes(item.name));

    return {
      main: {
        title: NAV_SECTIONS.MAIN,
        items: filterItemsBySection(NAV_ITEMS_BY_SECTION[NAV_SECTIONS.MAIN])
      },
      management: {
        title: NAV_SECTIONS.MANAGEMENT,
        items: filterItemsBySection(NAV_ITEMS_BY_SECTION[NAV_SECTIONS.MANAGEMENT])
      },
      system: {
        title: NAV_SECTIONS.SYSTEM,
        items: filterItemsBySection(NAV_ITEMS_BY_SECTION[NAV_SECTIONS.SYSTEM])
      },
      account: {
        title: NAV_SECTIONS.ACCOUNT,
        items: filterItemsBySection(NAV_ITEMS_BY_SECTION[NAV_SECTIONS.ACCOUNT])
      }
    };
  }, []);

  return sections;
};