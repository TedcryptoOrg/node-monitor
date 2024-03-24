import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { columns, data as initialData } from './makeData';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconSend, IconTrash } from '@tabler/icons-react';

export type TedyTableType = {
  table: TedyTableType;
};

const TedyTable = ({ table }: TedyTableType) => {
  return <MantineReactTable table={table} />;
};

export default TedyTable;
