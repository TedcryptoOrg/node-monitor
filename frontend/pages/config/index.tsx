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
  const [chains, setChains] = useState([] as any[]);

  useEffect(() => {
    getConfigurations();
    getChains();
  }, []);

  const getConfigurations = async () =>
    apiCall({
      method: RequestType.GET,
      path: '/api/configurations',
      beforeRequest: () => {},
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
      beforeRequest: () => {},
      successCallback: (data) => {
        console.info('Chains:');
        // from data.chains array build a new array of strings from chain.name, remove the duplicates
        const chains = data.chains
          .map((chain: any) => chain.name)
          .filter((v: any, i: any, a: any) => a.indexOf(v) === i);

        setChains(chains);
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
        data: chains,
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
          { label: 'Enabled', value: 'true' },
          { label: 'Disabled', value: 'false' },
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
    // updated values from edit modal
    // to-do:
    // 1. convert the value from the select dropdown to a boolean
    console.table(values);
    console.log('SAVE');
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
              console.log('Add configuration');
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
