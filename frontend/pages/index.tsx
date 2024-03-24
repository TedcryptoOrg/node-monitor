'use client';
import { Grid, Group, SimpleGrid, Skeleton, Title } from '@mantine/core';
import TedyTable from '../components/Table';
import { useEffect, useState } from 'react';
import { apiCall, RequestType } from '../utils/api';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [loadingWarnings, setLoadingWarnings] = useState(true);

  useEffect(() => {
    getIssues();
    getWarnings();
  }, []);

  // TO-DO: get this from the api
  const tableHeaders = [
    'Configuration',
    'Monitor',
    'Server',
    'Message',
    'Last check',
  ];

  const getIssues = () =>
    apiCall({
      method: RequestType.GET,
      path: '/api/monitors/failed',
      beforeRequest: () => {
        console.log();
      },
      successCallback: (data) => {
        console.table(data);
        setIssues(data);
        setLoadingIssues(false);
      },
    });

  const getWarnings = () =>
    apiCall({
      method: RequestType.GET,
      path: '/api/monitors/warnings',
      beforeRequest: () => {
        console.log();
      },
      successCallback: (data) => {
        console.table(data);
        setWarnings(data);
        setLoadingWarnings(false);
      },
    });

  return (
    <SimpleGrid>
      <h3>Dashboard</h3>
      <Group justify='center' grow>
        <Grid align='stretch' justify='stretch'>
          <Grid.Col span={12}>
            <Title order={3}>On going issues</Title>
            <Skeleton visible={loadingIssues}>
              <TedyTable></TedyTable>
            </Skeleton>
          </Grid.Col>

          <Grid.Col span={12} mt={50}>
            <Title order={3}>Warnings</Title>
            <Skeleton visible={loadingWarnings}>
              <TedyTable></TedyTable>
            </Skeleton>
          </Grid.Col>
        </Grid>
      </Group>
    </SimpleGrid>
  );
};

export default Dashboard;
