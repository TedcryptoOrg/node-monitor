import { Button, Select, Title } from '@mantine/core';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { useEffect, useState } from 'react';
import { RequestType, apiCall } from '../../utils/api';

const ConfigNotificationChannels = ({ id }: { id: number }) => {
  const [notificationData, setNotificationData] = useState<any>({});
  const [notificationChannels, setNotificationChannels] = useState<any[]>([]);

  const getNotificationChannels = (id: number) =>
    apiCall({
      method: RequestType.GET,
      path: `/api/configurations/${id}/notification-channels`,
      beforeRequest: () => {
        console.log();
      },
      successCallback: (data) => {
        console.info('notifications channels data:');
        console.table(data);
        setNotificationData(data);

        // TO-DO: fix this maybe in the BE? Relationship between configuration and notification channels is not correct
        const notificationChannelsOptions = data
          .filter((item: any) => item.id === id)
          .map((item: any) => ({ value: item.id, label: item.name }));

        setNotificationChannels(notificationChannelsOptions);
      },
    });

  useEffect(() => {
    id && getNotificationChannels(id);
  }, [id]);

  return (
    <>
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
        data={notificationChannels || []}
      />
      <Button variant='gradient' onClick={() => {}}>
        Add notification channel
      </Button>
    </>
  );
};

export default ConfigNotificationChannels;