import {
  Button,
  Card,
  Grid,
  Group,
  List,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RequestType, apiCall } from '../../utils/api';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { IconWorldCheck, IconWorldOff } from '@tabler/icons-react';
import dayjs from 'dayjs';
import ConfigNotificationChannels from '../../components/notificationChannels';

const ConfigDetails = () => {
  const router = useRouter();

  const [configData, setConfigData] = useState<ApiConfiguration>({});

  useEffect(() => {
    router.query.id && getConfiguration(router.query.id as string);
  }, []);

  const getConfiguration = (id: string) =>
    apiCall({
      method: RequestType.GET,
      path: `/api/configurations/${id}`,
      beforeRequest: () => {
        console.log();
      },
      successCallback: (data) => {
        console.info('Configuration Data:');
        console.table(data);
        setConfigData(data);
      },
    });

  return (
    <SimpleGrid>
      <Group grow>
        <Grid>
          <Grid.Col span={6}>
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Title order={5}>Configuration Overview</Title>
              <List listStyleType='none'>
                <List.Item>Name: {configData.name}</List.Item>
                <List.Item>Chain: {configData.chain}</List.Item>
                <List.Item>
                  Is Enabled:{' '}
                  {configData.is_enabled ? (
                    <IconWorldCheck color='#1adb00' />
                  ) : (
                    <IconWorldOff color='#d80e0e' />
                  )}
                </List.Item>
                <List.Item>
                  Created At:{' '}
                  {dayjs(configData.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </List.Item>
                <List.Item>
                  Updated At:{' '}
                  {dayjs(configData.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                </List.Item>
              </List>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <ConfigNotificationChannels id={configData.id} />
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
