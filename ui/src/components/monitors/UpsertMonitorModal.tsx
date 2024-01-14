import React, {useEffect, useState} from 'react';
import {
    AlertColor,
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

interface UpsertMonitorModalProps {
    open: boolean;
    fetchData: () => void;
    editMonitor: ApiMonitor | null;
    handleClose: () => void;
    sendNotification: (message: string, severity: AlertColor) => void;
    configuration: ApiConfiguration;
}

const UpsertMonitorModal: React.FC<UpsertMonitorModalProps> = (
    {
        open,
        fetchData,
        editMonitor,
        handleClose,
        sendNotification,
        configuration
    }) => {
    const [name, setName] = useState(editMonitor ? editMonitor.name : '');
    const [isEnabled, setIsEnabled] = useState(editMonitor ? editMonitor.is_enabled : true);
    const [type, setType] = useState(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);
    const [configurationObject, setConfigurationObject] = useState(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setName(editMonitor ? editMonitor.name : '');
        setIsEnabled(editMonitor ? editMonitor.is_enabled : true);
        setType(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);
        setConfigurationObject(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});
        setLoading(false);
    }, [editMonitor]);

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
            sendNotification('Please select a type.', 'error');
            return;
        }

        const monitor: ApiMonitorInput = {
            name: name,
            is_enabled: isEnabled,
            configuration_id: configuration.id,
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
                    sendNotification(`${editMonitor ? 'Edited' : 'Added'} monitor.`, 'success');
                    fetchData();
                } else {
                    sendNotification(`Failed to ${editMonitor ? 'edit' : 'add'} monitor.`, 'error');
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
                    </DialogContent>
                    <DialogContent>
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