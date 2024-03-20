import { Button, Group, SimpleGrid, Title } from '@mantine/core';
import TedyTable from '../components/Table';
import { IconTablePlus } from '@tabler/icons-react';

const Configurations = () => {
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
        <TedyTable></TedyTable>
      </Group>
    </SimpleGrid>
  );
};

export default Configurations;
