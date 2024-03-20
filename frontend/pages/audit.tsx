import { Group, SimpleGrid, Title } from '@mantine/core';
import TedyTable from '../components/Table';

const AuditView = () => {
  return (
    <Group>
      <SimpleGrid cols={1}>
        <Title order={3}>Audit</Title>
      </SimpleGrid>
      <TedyTable></TedyTable>
    </Group>
  );
};

export default AuditView;
