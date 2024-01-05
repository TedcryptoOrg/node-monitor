import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import {NodeExporterDiskSpaceUsageConfiguration} from "../../../types/ApiMonitor";

interface NodeExporterDiskSpaceConfigProps {
    config: NodeExporterDiskSpaceUsageConfiguration;
    setConfig: (config: (prevConfig: NodeExporterDiskSpaceUsageConfiguration) => NodeExporterDiskSpaceUsageConfiguration) => void;
}

const NodeExporterDiskSpaceConfig: React.FC<NodeExporterDiskSpaceConfigProps> = ({ config, setConfig }) => {
    const [address, setAddress] = useState(config.address || '');
    const [threshold, setThreshold] = useState(config.threshold || 80);
    const [alertSleepDurationMinutes, setAlertSleepDurationMinutes] = useState(config.alert_sleep_duration_minutes || 30);
    const [checkIntervalSeconds, setCheckIntervalSeconds] = useState(config.check_interval_seconds || 60);

    useEffect(() => {
        setAddress(config.address || '');
        setThreshold(config.threshold || 0);
        setAlertSleepDurationMinutes(config.alert_sleep_duration_minutes || 30);
        setCheckIntervalSeconds(config.check_interval_seconds || 60);

        if (config.address === undefined) {
            setConfig((prevConfig: NodeExporterDiskSpaceUsageConfiguration) => ({
                ...prevConfig,
                address: '',
                threshold: 0,
                alert_sleep_duration_minutes: 30,
                check_interval_seconds: 60
            }));
        }
    }, [config, setConfig]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((prevConfig: NodeExporterDiskSpaceUsageConfiguration) => ({ ...prevConfig, [name]: value }));

        switch (name) {
            case 'address':
                setAddress(value);
                break;
            case 'threshold':
                setThreshold(parseInt(value));
                break;
            case 'alert_sleep_duration_minutes':
                setAlertSleepDurationMinutes(parseInt(value));
                break;
            case 'check_interval_seconds':
                setCheckIntervalSeconds(parseInt(value));
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
                autoComplete={'off'}
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
                helperText={"Threshold percentage to alert on"}
                type="number"
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
                helperText={"Number of minutes to sleep between alerts"}
                type="number"
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
                helperText={"Interval between checks"}
                type="number"
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