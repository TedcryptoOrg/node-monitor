import {
  ActionIcon,
  Box,
  Button,
  Group,
  SimpleGrid,
  Title,
} from '@mantine/core';
import {
  IconTablePlus,
  IconWorldCheck,
  IconWorldOff,
} from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useState } from 'react';
import { RequestType, apiCall } from '../utils/api';
import { ApiConfiguration } from '../types/ApiConfiguration';

const Configurations = () => {
  const [configData, setConfigData] = useState<ApiConfiguration[]>([]);

  useEffect(() => {
    getConfigurations();
  }, []);

  const getConfigurations = () =>
    apiCall({
      method: RequestType.GET,
      path: '/api/configurations',
      beforeRequest: () => {
        console.log();
      },
      successCallback: (data) => {
        console.info('Configurations Data:');
        console.table(data);
        setConfigData(data);
      },
    });

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Chain',
      accessorKey: 'chain',
    },
    {
      header: 'Enabled',
      accessorKey: 'is_enabled',
      mantineTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => (
        <span>
          {cell.getValue<boolean>() ? (
            <IconWorldOff color='#d80e0e' />
          ) : (
            <IconWorldCheck color='#1adb00' />
          )}
        </span>
      ),
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
  ];

  const table = useMantineReactTable({
    columns,
    data: configData,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}></Box>
    ),
  });

  return (
    <SimpleGrid>
      <Group>
        <SimpleGrid cols={1}>
          <Title order={3}>Configurations</Title>
          <Title order={6}>Your main configurations</Title>
          <Button leftSection={<IconTablePlus size={14} />} variant='gradient'>
            Add configuration
          </Button>
        </SimpleGrid>
      </Group>

      <Group justify='center'>
        <MantineReactTable table={table}></MantineReactTable>
      </Group>
    </SimpleGrid>
  );
};

export default Configurations;
