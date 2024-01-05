import React, {useEffect, useState} from 'react';
import {
    Button,
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
    ApiMonitor,
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
    configuration: ApiConfiguration;
}

const UpsertMonitorModal: React.FC<UpsertMonitorModalProps> = ({ open, fetchData, editMonitor, handleClose, configuration }) => {
    const [name, setName] = useState(editMonitor ? editMonitor.name : '');
    const [isEnabled, setIsEnabled] = useState(editMonitor ? editMonitor.is_enabled : true);
    const [type, setType] = useState(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);
    const [configurationObject, setConfigurationObject] = useState(editMonitor ? JSON.parse(editMonitor.configuration_object) : null);

    useEffect(() => {
        setName(editMonitor ? editMonitor.name : 'URL Check');
        setIsEnabled(editMonitor ? editMonitor.is_enabled : true);
        setType(editMonitor ? editMonitor.type : MonitorTypeEnum.URL_CHECK);

        console.log(editMonitor);

        setConfigurationObject(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});
    }, [editMonitor]);

    const handleChangeType = (event: SelectChangeEvent) => {
        const selectedType = event.target.value as MonitorTypeEnum;

        setConfigurationObject(editMonitor ? JSON.parse(editMonitor.configuration_object) : {});

        const defaultNames: {[key: string]: string} = {};
        defaultNames[MonitorTypeEnum.URL_CHECK] = 'URL Check';
        defaultNames[MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE] = 'Node Exporter Disk Space';
        defaultNames[MonitorTypeEnum.BLOCK_CHECK] = 'Block Check';
        defaultNames[MonitorTypeEnum.SIGN_MISS_CHECK] = 'Sign Miss Check';
        defaultNames[MonitorTypeEnum.PRICE_FEEDER_MISS_COUNT] = 'Price Feeder Miss Count';

        if (name.length === 0 || name === defaultNames[type]) {
            setName(defaultNames[selectedType] ?? 'Unknown');
        }

        setType(selectedType);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const monitor: ApiMonitor = {
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
            .then(response => response.json())
            .then(data => {
                fetchData();
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
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
                        {type === MonitorTypeEnum.URL_CHECK && <UrlCheckConfig config={configurationObject as UrlCheckConfiguration} setConfig={setConfigurationObject} />}
                        {type === MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE && <NodeExporterDiskSpaceConfig config={configurationObject as NodeExporterDiskSpaceUsageConfiguration} setConfig={setConfigurationObject} />}
                        {type === MonitorTypeEnum.BLOCK_CHECK && <BlockCheckConfiguration config={configurationObject as BlockAlertConfiguration} setConfig={setConfigurationObject} />}
                        {type === MonitorTypeEnum.SIGN_MISS_CHECK && <SignMissCheckConfig config={configurationObject as SignMissCheckConfiguration} setConfig={setConfigurationObject} />}
                        {type === MonitorTypeEnum.PRICE_FEEDER_MISS_COUNT && <PriceFeederMissCountConfig config={configurationObject as PriceFeederMissCountConfiguration} setConfig={setConfigurationObject} />}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{editMonitor ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default UpsertMonitorModal;