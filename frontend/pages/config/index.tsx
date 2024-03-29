import {
  Box,
  Button,
  Group,
  SimpleGrid,
  Skeleton,
  Switch,
  Title,
} from '@mantine/core';
import {
  IconEdit,
  IconTablePlus,
  IconTrash,
  IconWorldCheck,
  IconWorldOff,
} from '@tabler/icons-react';
import { MRT_TableOptions, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useState } from 'react';
import { RequestType, apiCall } from '../../utils/api';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import Link from 'next/link';
import Table from '../../components/table';

const Configurations = () => {
  const [configData, setConfigData] = useState<ApiConfiguration[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [validationErrors, setValidationErrors] = useState({} as any);

  useEffect(() => {
    getConfigurations();
    getChains();
  }, []);

  const getConfigurations = async () =>
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
        setLoadingData(false);
      },
    });

  const getChains = async () =>
    apiCall({
      method: RequestType.GET,
      url: 'https://chains.cosmos.directory/',
      beforeRequest: () => {
        console.log('chain requesting...');
      },
      successCallback: (data) => {
        console.info('Chains:');
        console.table(data);
      },
    });

  const columns: MRT_TableOptions<ApiConfiguration>['columns'] = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableEditing: false,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      Cell: ({ cell, row }) => (
        <Link href={`/config/${row.getValue('id')}`}>
          {cell.getValue<string>()}
        </Link>
      ),
    },
    {
      header: 'Chain',
      accessorKey: 'chain',
      editVariant: 'select',
      mantineEditSelectProps: {
        data: [
          { value: 'chain 1', label: 'chain 1' },
          { value: 'chain 2', label: 'chain 2' },
        ],
      },
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
            <IconWorldCheck color='#1adb00' />
          ) : (
            <IconWorldOff color='#d80e0e' />
          )}
        </span>
      ),
      editVariant: 'select',
      mantineEditSelectProps: {
        data: [
          { value: 'true', label: 'Enabled' },
          { value: 'false', label: 'Disabled' },
        ],
      },
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
    debugger;
    // updated values from edit modal
    // to-do:
    // 1. convert the value from the select dropdown to a boolean
    console.table(values);
    table.setEditingRow(null);
  };

  const handleAddRow: MRT_TableOptions<any>['onCreatingRowSave'] = async ({
    table,
    row,
    values,
  }) => {
    console.log('adding row');
    console.table(values);
    table.setEditingRow(null);
  };

  const table = useMantineReactTable({
    columns,
    data: configData,
    state: { isLoading: loadingData },
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
    onEditingRowSave:
      handleSaveRow as MRT_TableOptions<ApiConfiguration>['onEditingRowSave'],
    onCreatingRowSave:
      handleAddRow as MRT_TableOptions<ApiConfiguration>['onCreatingRowSave'],
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

      <Group justify='center' grow>
        <Table table={table} />
      </Group>
    </SimpleGrid>
  );
};

export default Configurations;
