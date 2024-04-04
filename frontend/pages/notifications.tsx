import { Button, Group, SimpleGrid, Title } from '@mantine/core';
import { IconTablePlus } from '@tabler/icons-react';
const Notifications = () => {
  return (
    <SimpleGrid>
      <Group>
        <SimpleGrid cols={1}>
          <Title order={3}>Notification Channels</Title>
          <Button leftSection={<IconTablePlus size={14} />} variant='gradient'>
            Add notification channel
          </Button>
        </SimpleGrid>
      </Group>

      <Group justify='center'></Group>
    </SimpleGrid>
  );
};

export default Notifications;
