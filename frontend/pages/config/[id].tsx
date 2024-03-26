import {
  Button,
  Card,
  Grid,
  Group,
  List,
  Select,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';

const ConfigDetails = () => {
  const router = useRouter();
  console.log('🚀 ~ ConfigDetails ~ router.query.id:', router.query.id);

  return (
    <SimpleGrid>
      <Group grow>
        <Grid>
          <Grid.Col span={6}>
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Title order={5}>Configuration Overview</Title>
              <List>
                <List.Item>Name:</List.Item>
                <List.Item>Chain:</List.Item>
                <List.Item>Is Enabled:</List.Item>
                <List.Item>Created At:</List.Item>
                <List.Item>Updated At:</List.Item>
              </List>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={4}>Configuration Notification Channels</Title>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Enabled</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>Type</td>
                  <td>Name</td>
                  <td>Enabled</td>
                  <td>Actions</td>
                </tr>
              </tbody>
            </table>
            <Select
              label='Your favorite library'
              placeholder='Pick value'
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Button variant='gradient' onClick={() => {}}>
              Add notification channel
            </Button>
          </Grid.Col>
        </Grid>
      </Group>
      <Group grow>
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Grid>
            <Grid.Col span={12}>
              <Title order={3}>Servers</Title>
              <Button variant='gradient' onClick={() => {}}>
                Add server
              </Button>
              <table>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Is Enabled</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Address</td>
                  <td>Is Enabled</td>
                  <td>Status</td>
                  <td>
                    <Button variant='gradient' onClick={() => {}}>
                      Edit
                    </Button>
                    <Button variant='gradient' onClick={() => {}}>
                      Remove
                    </Button>
                  </td>
                </tr>
              </table>
            </Grid.Col>
            <Grid.Col span={12}>
              <Title order={3}>Monitors</Title>
              <Button variant='gradient' onClick={() => {}}>
                Add Monitor
              </Button>
              <table>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Is Enabled</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Address</td>
                  <td>Is Enabled</td>
                  <td>Status</td>
                  <td>
                    <Button variant='gradient' onClick={() => {}}>
                      Edit
                    </Button>
                    <Button variant='gradient' onClick={() => {}}>
                      Remove
                    </Button>
                  </td>
                </tr>
              </table>
            </Grid.Col>
          </Grid>
        </Card>
      </Group>
    </SimpleGrid>
  );
};

export default ConfigDetails;
