import { SvgIconComponent } from '@mui/icons-material';

export interface NavItem {
  name: string;
  icon: SvgIconComponent;
  path: string;
  security: (user: any) => boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}