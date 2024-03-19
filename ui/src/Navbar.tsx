import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import GraphIcon from '@mui/icons-material/GraphicEq';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import NotificationChannelIcon from '@mui/icons-material/Message';

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
    component: NavbarItem
  },
  {
    name: 'Configurations',
    icon: SettingsIcon,
    path: '/configurations',
    component: NavbarItem
  },
  {
    name: 'Notification channels',
    icon: NotificationChannelIcon,
    path: '/notification-channels',
    component: NavbarItem
  },
  {
    name: 'Network Status',
    icon: MonitorHeartIcon,
    path: '/network-status',
    component: NavbarItem
  },
  {
    name: 'Audit',
    icon: DocumentScanner,
    path: '/audit',
    component: NavbarItem
  },
];