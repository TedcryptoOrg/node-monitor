import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import {NodeExporterDiskSpaceUsageConfiguration} from "../../../types/ApiMonitor";

interface NodeExporterDiskSpaceConfigProps {
    config: NodeExporterDiskSpaceUsageConfiguration;
    setConfig: (config: (prevConfig: NodeExporterDiskSpaceUsageConfiguration) => NodeExporterDiskSpaceUsageConfiguration) => void;
}

const NodeExporterDiskSpaceConfig: React.FC<NodeExporterDiskSpaceConfigProps> = ({ config, setConfig }) => {
    const [address, setAddress] = useState(config.address || '');
    const [threshold, setThreshold] = useState(config.threshold || '');
    const [alertSleepDurationMinutes, setAlertSleepDurationMinutes] = useState(config.alert_sleep_duration_minutes || '');
    const [checkIntervalSeconds, setCheckIntervalSeconds] = useState(config.check_interval_seconds || '');

    useEffect(() => {
        setAddress(config.address || '');
        setThreshold(config.threshold || '');
        setAlertSleepDurationMinutes(config.alert_sleep_duration_minutes || '');
        setCheckIntervalSeconds(config.check_interval_seconds || '');
    }, [config]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((prevConfig: NodeExporterDiskSpaceUsageConfiguration) => ({ ...prevConfig, [name]: value }));

        switch (name) {
            case 'address':
                setAddress(value);
                break;
            case 'threshold':
                setThreshold(value);
                break;
            case 'alert_sleep_duration_minutes':
                setAlertSleepDurationMinutes(value);
                break;
            case 'check_interval_seconds':
                setCheckIntervalSeconds(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <TextField
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                value={address}
                onChange={handleChange}
                name="address"
            />
            <TextField
                margin="dense"
                id="threshold"
                label="Threshold"
                type="text"
                fullWidth
                variant="standard"
                value={threshold}
                onChange={handleChange}
                name="threshold"
            />
            <TextField
                margin="dense"
                id="alert_sleep_duration_minutes"
                label="Alert Sleep Duration Minutes"
                type="text"
                fullWidth
                variant="standard"
                value={alertSleepDurationMinutes}
                onChange={handleChange}
                name="alert_sleep_duration_minutes"
            />
            <TextField
                margin="dense"
                id="check_interval_seconds"
                label="Check Interval Seconds"
                type="text"
                fullWidth
                variant="standard"
                value={checkIntervalSeconds}
                onChange={handleChange}
                name="check_interval_seconds"
            />
        </>
    );
}

export default NodeExporterDiskSpaceConfig;