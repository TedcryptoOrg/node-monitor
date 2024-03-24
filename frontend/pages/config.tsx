import { Button, Group, SimpleGrid, Title } from '@mantine/core';
import TedyTable from '../components/Table';
import { IconTablePlus } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useState } from 'react';
import { RequestType, apiCall } from '../utils/api';

const Configurations = () => {
  const [configData, setConfigData] = useState(undefined);

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
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'city',
      header: 'City',
    },
    {
      accessorKey: 'state',
      header: 'State',
    },
  ];

  const table = useMantineReactTable({
    columns,
    configData,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <ActionIcon
          color='orange'
          onClick={() => {
            table.setEditingRow(row);
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color='red'
          onClick={() => {
            data.splice(row.index, 1); //assuming simple data table
            setData([...data]);
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Box>
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
        <TedyTable table={table}></TedyTable>
      </Group>
    </SimpleGrid>
  );
};

export default Configurations;
