import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

export const Table = ({ table }: any) => {
  return <MantineReactTable table={table} />;
};

export default Table;
