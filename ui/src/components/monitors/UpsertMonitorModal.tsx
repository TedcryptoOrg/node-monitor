import React, {useEffect, useState} from 'react';
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from '@mui/material';
import Switch from '@mui/material/Switch';
import {
    ApiMonitor, ApiMonitorInput,
    BlockAlertConfiguration,
    NodeExporterDiskSpaceUsageConfiguration, PriceFeederMissCountConfiguration, SignMissCheckConfiguration,
    UrlCheckConfiguration
} from '../../types/ApiMonitor';
import {ApiConfiguration} from "../../types/ApiConfiguration";
import {MonitorTypeEnum} from '../../types/MonitorTypeEnum';
import UrlCheckConfig from './types/UrlCheckConfig';
import NodeExporterDiskSpaceConfig from "./types/NodeExporterDiskSpaceConfig";
import BlockCheckConfiguration from "./types/BlockCheckConfiguration";
import SignMissCheckConfig from "./types/SignMissCheckConfig";
import PriceFeederMissCountConfig from './types/PriceFeederMissCountConfig';
import {ApiServer} from "../../types/ApiServer";
import {enqueueSnackbar} from "notistack";

interface UpsertMonitorModalProps {
    open: boolean;
    fetchData: () => void;
    editMonitor: ApiMonitor | null;
    handleClose: () => void;
    configuration: ApiConfiguration;
}

const UpsertMonitorModal: React.FC<UpsertMonitorModalProps> = (
    {
        open,
        fetchData,
        editMonitor,
        handleClose,
        configuration
    }) => {
    const [name, setName] = useState(editMonitor ? editMonitor.name : '');
    const [isEnabled, setIsEnabled] = useState(editMonitor ? editMonitor.is_enabled : true);
    const [type, setType] = useState(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);
    const [configurationObject, setConfigurationObject] = useState(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});
    const [loading, setLoading] = useState(true);
    const [showServer, setShowServer] = useState(false);
    const [serverId, setServerId] = useState(editMonitor ? editMonitor.server?.id : undefined);
    const [servers, setServers] = useState<ApiServer[]>([]);

    useEffect(() => {
        if (configuration) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${configuration.id}/servers`)
                .then(response => response.json())
                .then((data: ApiServer[]) => {
                    setServers(data);
                });
        }
    }, [configuration])

    useEffect(() => {
        setName(editMonitor ? editMonitor.name : '');
        setIsEnabled(editMonitor ? editMonitor.is_enabled : true);
        setType(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);
        setConfigurationObject(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});
        setServerId(editMonitor ? editMonitor.server?.id : 0);
        setLoading(false);
    }, [editMonitor]);

    useEffect(() => {
        const serverTypes = [
            MonitorTypeEnum.BLOCK_CHECK,
            MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE,
        ];
        setShowServer(serverTypes.includes(type));
    }, [type]);

    const customHandleClose = () => {
        setName('URL Check');
        setIsEnabled(true);
        setType(MonitorTypeEnum.URL_CHECK);
        setConfigurationObject({});
        handleClose();
    }

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value as MonitorTypeEnum);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (type === undefined) {
            enqueueSnackbar('Please select a type!', {variant: 'error'});
            return;
        }
        const server = servers.find((server) => server.id === serverId);
        if (showServer && server === undefined) {
            enqueueSnackbar('Please select a server!', {variant: 'error'});
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

        const url = editMonitor
            ? `${process.env.REACT_APP_API_HOST}/api/monitors/${editMonitor.id}`
            : `${process.env.REACT_APP_API_HOST}/api/monitors`;
        const method = editMonitor ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monitor),
        })
            .then(response => {
                if (response.ok) {
                    enqueueSnackbar(`${editMonitor ? 'Edited' : 'Added'} monitor.`, {variant: 'success'});
                    fetchData();
                } else {
                    enqueueSnackbar(`Failed to ${editMonitor ? 'edit' : 'add'} monitor.`, {variant: 'error'});
                }

                return
            })

        customHandleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={customHandleClose}>
                <DialogTitle>{editMonitor ? 'Edit' : 'Add'} Monitor</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the details for the monitor.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            autoComplete={'off'}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        {showServer && (
                            <DialogContentText>
                                <FormControl>
                                    <FormLabel>
                                        Server
                                    </FormLabel>
                                    <Select
                                        value={serverId}
                                        onChange={e => setServerId(e.target.value as number)}
                                    >
                                        <MenuItem key={0} value={0}>
                                            None
                                        </MenuItem>
                                        {servers.map((server) => (
                                            <MenuItem key={server.id} value={server.id}>
                                                {server.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </DialogContentText>
                        )}
                        <DialogContentText>
                            <FormControlLabel
                                label="Is Enabled"
                                control={
                                    <Switch
                                        checked={isEnabled}
                                        onChange={e => setIsEnabled(e.target.checked)}
                                        name="isEnabled"
                                        color="primary"
                                    />
                                }
                            />
                        </DialogContentText>
                        <FormControl>
                            <FormLabel>
                                Type
                            </FormLabel>
                            <Select
                                value={type}
                                onChange={handleChangeType}
                            >
                                {Object.values(MonitorTypeEnum).map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {loading ? (
                            <DialogContent>
                                <CircularProgress />
                            </DialogContent>
                        ) : (
                            (type === MonitorTypeEnum.URL_CHECK && (<UrlCheckConfig config={configurationObject as UrlCheckConfiguration} setConfig={setConfigurationObject} />))
                            || (type === MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE && (<NodeExporterDiskSpaceConfig config={configurationObject as NodeExporterDiskSpaceUsageConfiguration} setConfig={setConfigurationObject} />))
                            || (type === MonitorTypeEnum.BLOCK_CHECK && (<BlockCheckConfiguration config={configurationObject as BlockAlertConfiguration} setConfig={setConfigurationObject} />))
                            || (type === MonitorTypeEnum.SIGN_MISS_CHECK && (<SignMissCheckConfig config={configurationObject as SignMissCheckConfiguration} setConfig={setConfigurationObject} />))
                            || (type === MonitorTypeEnum.PRICE_FEEDER_MISS_COUNT && (<PriceFeederMissCountConfig config={configurationObject as PriceFeederMissCountConfiguration} setConfig={setConfigurationObject} />))
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={customHandleClose}>Cancel</Button>
                        <Button type="submit">{editMonitor ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default UpsertMonitorModal;