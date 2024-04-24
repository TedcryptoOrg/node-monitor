import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import GraphIcon from '@mui/icons-material/GraphicEq';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import NotificationChannelIcon from '@mui/icons-material/Message';
import UserIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CompanyIcon from '@mui/icons-material/House';
import LoggerIcon from '@mui/icons-material/Pages';
import {User} from "./types/User";

const NavbarItem = ({ name, icon: Icon, path }: { name: string, icon: any, path: string }) => (
    <Link to={path}>
      <ListItem button>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
);

export const navbarItems = [
  {
    name: 'Dashboard',
    icon: GraphIcon,
    path: '/',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Configurations',
    icon: SettingsIcon,
    path: '/configurations',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Notification channels',
    icon: NotificationChannelIcon,
    path: '/notification-channels',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Network Status',
    icon: MonitorHeartIcon,
    path: '/network-status',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Users',
    icon: UserIcon,
    path: '/users',
    component: NavbarItem,
    security: (user: User) => user.is_super_admin
  },
  {
    name: 'Company',
    icon: CompanyIcon,
    path: '/companies',
    component: NavbarItem,
    security: (user: User) => user.is_super_admin
  },
  {
    name: 'Tail log',
    icon: LoggerIcon,
    path: '/logger',
    component: NavbarItem,
    security: (user: User) => user.is_super_admin
  },
  {
    name: 'Audit',
    icon: DocumentScanner,
    path: '/audit',
    component: NavbarItem,
    security: () => true
  },
  {
    name: 'Logout',
    icon: LogoutIcon,
    path: '/logout',
    component: NavbarItem,
    security: () => true
  },
];