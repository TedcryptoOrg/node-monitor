import { useEffect, useState } from 'react';
import { Group, Code, Container, AppShell, Burger } from '@mantine/core';
import {
  IconDashboard,
  IconNotification,
  IconNetwork,
  IconReport,
  IconAdjustmentsHorizontal,
} from '@tabler/icons-react';
import classes from './index.module.css';
import { useDisclosure, useHeadroom } from '@mantine/hooks';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const views = [
  {
    label: 'Dashboard',
    id: 'dashboard',
    icon: IconDashboard,
    route: '/',
  },
  {
    label: 'Configurations',
    id: 'config',
    icon: IconAdjustmentsHorizontal,
    route: '/config',
  },
  {
    label: 'Notification channels',
    id: 'notification',
    icon: IconNotification,
    route: '/notifications',
  },
  {
    label: 'Network Status',
    id: 'network status',
    icon: IconNetwork,
    route: '/network',
  },
  {
    label: 'Audit',
    id: 'audit',
    icon: IconReport,
    route: '/audit',
  },
];

const Layout = ({ children }: any) => {
  const path = usePathname();

  const [active, setActive] = useState('/'); // this needs to be fixed for onload scenarios
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });

  useEffect(() => {
    setActive(path);
  });

  const links = views.map((item) => (
    <Link
      className={classes.link}
      data-active={item.route === active || undefined}
      href={item.route}
      key={item.id}
      onClick={(event) => {
        pinned && toggle();
        setActive(item.route);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <Code fw={700}>v0.0.1</Code>
      </AppShell.Header>
      <AppShell.Navbar>
        <Group justify='space-between'></Group>
        {links}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
