import { Box, Button, Group, SimpleGrid, Title } from '@mantine/core';
import {
  IconEdit,
  IconTablePlus,
  IconTrash,
  IconWorldCheck,
  IconWorldOff,
} from '@tabler/icons-react';
import {
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
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

  // infer types from columns
  const columns: MRT_TableOptions<ApiConfiguration>['columns'] = [
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

  const handleSaveRow: MRT_TableOptions<any>['onEditingRowSave'] = async ({
    table,
    row,
    values,
  }) => {
    // updated values from edit modal
    console.table(values);
    table.setEditingRow(null); //exit editing mode
  };

  const table = useMantineReactTable({
    columns,
    data: configData,
    positionActionsColumn: 'last',
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <Button
          size='xs'
          variant='gradient'
          onClick={() => table.setEditingRow(row)}
        >
          <IconEdit />
        </Button>
        <Button
          size='xs'
          variant='gradient'
          onClick={() => console.log(row.original)}
        >
          <IconTrash />
        </Button>
      </Box>
    ),
    enableEditing: true,
    onEditingRowSave: handleSaveRow,
  });

  return (
    <SimpleGrid>
      <Group>
        <SimpleGrid cols={1}>
          <Title order={3}>Configurations</Title>
          <Title order={6}>Your main configurations</Title>
          <Button
            leftSection={<IconTablePlus size={14} />}
            variant='gradient'
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
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
