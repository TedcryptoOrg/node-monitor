import React, { useEffect, useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { ApiMonitor } from "../../types/ApiMonitor";
import MonitorsTable from "./MonitorsTable";
import { useApi } from "../../context/ApiProvider";
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`monitoring-tabpanel-${index}`}
      aria-labelledby={`monitoring-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MonitoringIssues: React.FC = () => {
  const api = useApi();
  const [criticalIssues, setCriticalIssues] = useState<ApiMonitor[]>([]);
  const [warnings, setWarnings] = useState<ApiMonitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const firstRender = React.useRef(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (firstRender.current) {
      const fetchData = async () => {
        try {
          const [criticalResponse, warningsResponse] = await Promise.all([
            api?.get(`/monitors/failed`),
            api?.get(`/monitors/warnings`)
          ]);

          if (criticalResponse?.ok) {
            setCriticalIssues(criticalResponse.body);
          }
          if (warningsResponse?.ok) {
            setWarnings(warningsResponse.body);
          }
        } catch (error) {
          console.error('Error fetching monitoring data:', error);
          setCriticalIssues([]);
          setWarnings([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
      firstRender.current = false;
    }
  }, [api]);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: '64px',
            }
          }}
        >
          <Tab 
            icon={<ErrorIcon />} 
            iconPosition="start"
            label={`Critical Issues (${criticalIssues.length})`}
            sx={{
              color: 'error.main',
              '&.Mui-selected': {
                color: 'error.main',
              }
            }}
          />
          <Tab 
            icon={<WarningIcon />} 
            iconPosition="start"
            label={`Warnings (${warnings.length})`}
            sx={{
              color: 'warning.main',
              '&.Mui-selected': {
                color: 'warning.main',
              }
            }}
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <MonitorsTable 
          monitors={criticalIssues} 
          type="error" 
          isLoading={isLoading}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MonitorsTable 
          monitors={warnings} 
          type="warning"
          isLoading={isLoading}
        />
      </TabPanel>
    </Box>
  );
};

export default MonitoringIssues;