import { useState } from 'react';
import { Group, Code, Container, AppShell, Burger } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconDatabaseImport,
  IconReceipt2,
} from '@tabler/icons-react';
import classes from './index.module.css';
import { useDisclosure, useHeadroom } from '@mantine/hooks';

import Link from 'next/link';

const views = [
  {
    label: 'Dashboard',
    id: 'dashboard',
    icon: IconBellRinging,
    route: '/',
  },
  {
    label: 'Configurations',
    id: 'configurations',
    icon: IconReceipt2,
    route: '/config',
  },
  {
    label: 'Notification channels',
    id: 'notification',
    icon: IconFingerprint,
    route: '/notifications',
  },
  {
    label: 'Network Status',
    id: 'network',
    icon: IconKey,
    route: '/status',
  },
  {
    label: 'Audit',
    id: 'audit',
    icon: IconDatabaseImport,
    route: '/audit',
  },
];

const Layout = ({ children }: any) => {
  const [active, setActive] = useState('dashboard');
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });

  const links = views.map((item) => (
    <Link
      className={classes.link}
      data-active={item.id === active || undefined}
      href={item.route}
      key={item.id}
      onClick={(event) => {
        pinned && toggle();
        setActive(item.id);
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
