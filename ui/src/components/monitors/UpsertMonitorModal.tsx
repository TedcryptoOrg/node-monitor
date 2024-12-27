import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Box,
} from '@mui/material';
import Switch from '@mui/material/Switch';
import { ApiMonitor, ApiMonitorInput } from '../../types/ApiMonitor';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { MonitorTypeEnum } from '../../types/MonitorTypeEnum';
import UrlCheckConfig from './types/UrlCheckConfig';
import NodeExporterDiskSpaceConfig from "./types/NodeExporterDiskSpaceConfig";
import BlockCheckConfiguration from "./types/BlockCheckConfiguration";
import SignMissCheckConfig from "./types/SignMissCheckConfig";
import PriceFeederMissCountConfig from './types/PriceFeederMissCountConfig';
import { ApiServer } from "../../types/ApiServer";
import { enqueueSnackbar } from "notistack";
import { useApi } from "../../context/ApiProvider";

interface UpsertMonitorModalProps {
  open: boolean;
  fetchData: () => void;
  editMonitor: ApiMonitor | null;
  handleClose: () => void;
  configuration: ApiConfiguration;
}

const UpsertMonitorModal: React.FC<UpsertMonitorModalProps> = ({
  open,
  fetchData,
  editMonitor,
  handleClose,
  configuration
}) => {
  const api = useApi();
  const [name, setName] = useState(editMonitor ? editMonitor.name : '');
  const [isEnabled, setIsEnabled] = useState(editMonitor ? editMonitor.is_enabled : true);
  const [type, setType] = useState(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);
  const [configurationObject, setConfigurationObject] = useState(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});
  const [loading, setLoading] = useState(true);
  const [showServer, setShowServer] = useState(false);
  const [serverId, setServerId] = useState<number | undefined>(editMonitor?.server?.id);
  const [servers, setServers] = useState<ApiServer[]>([]);

  useEffect(() => {
    if (configuration) {
      api?.get(`/configurations/${configuration.id}/servers`)
        .then(response => {
          if (!response.ok) {
            throw Error('Failed to fetch')
          }
          return response.body;
        })
        .then((data: ApiServer[]) => {
          setServers(data);
        });
    }
  }, [configuration, api]);

  useEffect(() => {
    setName(editMonitor ? editMonitor.name : '');
    setIsEnabled(editMonitor ? editMonitor.is_enabled : true);
    setType(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);
    setConfigurationObject(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});
    setServerId(editMonitor ? editMonitor.server?.id : undefined);
    setLoading(false);
  }, [editMonitor]);

  useEffect(() => {
    const serverTypes = [
      MonitorTypeEnum.BLOCK_CHECK,
      MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE,
    ];
    setShowServer(serverTypes.includes(type));
  }, [type]);

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as MonitorTypeEnum);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (type === undefined) {
      enqueueSnackbar('Please select a type!', { variant: 'error' });
      return;
    }
    const server = servers.find((server) => server.id === serverId);
    if (showServer && server === undefined) {
      enqueueSnackbar('Please select a server!', { variant: 'error' });
      return;
    }

    const monitor: ApiMonitorInput = {
      name: name,
      is_enabled: isEnabled,
      configuration_id: configuration.id,
      server_id: server?.id,
      type: type,
      configuration_object: JSON.stringify(configurationObject ?? {})
    };

    const url = editMonitor ? `/monitors/${editMonitor.id}` : `/monitors`;
    api?.[editMonitor ? 'put' : 'post'](url, monitor)
      .then(response => {
        if (response?.ok) {
          enqueueSnackbar(`${editMonitor ? 'Updated' : 'Added'} monitor successfully`, { variant: 'success' });
          fetchData();
        } else {
          throw new Error('Failed to save monitor');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        enqueueSnackbar(`Failed to ${editMonitor ? 'update' : 'add'} monitor`, { variant: 'error' });
      });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMonitor ? 'Edit' : 'Add'} Monitor
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              autoFocus
              label="Name"
              type="text"
              fullWidth
              value={name}
              required
              autoComplete="off"
              onChange={e => setName(e.target.value)}
            />

            {showServer && (
              <FormControl fullWidth>
                <InputLabel>Server</InputLabel>
                <Select
                  value={serverId}
                  label="Server"
                  onChange={e => setServerId(e.target.value as number)}
                >
                  <MenuItem value={undefined}>None</MenuItem>
                  {servers.map((server) => (
                    <MenuItem key={server.id} value={server.id}>
                      {server.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={isEnabled}
                  onChange={e => setIsEnabled(e.target.checked)}
                  name="isEnabled"
                  color="primary"
                />
              }
              label="Is Enabled"
            />

            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                label="Type"
                onChange={handleChangeType}
              >
                {Object.values(MonitorTypeEnum).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              {!loading && (
                <>
                  {type === MonitorTypeEnum.URL_CHECK && (
                    <UrlCheckConfig 
                      config={configurationObject} 
                      setConfig={setConfigurationObject} 
                    />
                  )}
                  {type === MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE && (
                    <NodeExporterDiskSpaceConfig 
                      config={configurationObject} 
                      setConfig={setConfigurationObject} 
                    />
                  )}
                  {type === MonitorTypeEnum.BLOCK_CHECK && (
                    <BlockCheckConfiguration 
                      config={configurationObject} 
                      setConfig={setConfigurationObject} 
                    />
                  )}
                  {type === MonitorTypeEnum.SIGN_MISS_CHECK && (
                    <SignMissCheckConfig 
                      config={configurationObject} 
                      setConfig={setConfigurationObject} 
                    />
                  )}
                  {type === MonitorTypeEnum.PRICE_FEEDER_MISS_COUNT && (
                    <PriceFeederMissCountConfig 
                      config={configurationObject} 
                      setConfig={setConfigurationObject} 
                    />
                  )}
                </>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editMonitor ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpsertMonitorModal;