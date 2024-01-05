import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { BlockAlertConfiguration } from "../../../types/ApiMonitor";

interface BlockCheckConfigurationProps {
    config: BlockAlertConfiguration;
    setConfig: (config: (prevConfig: BlockAlertConfiguration) => BlockAlertConfiguration) => void;
}

const BlockCheckConfiguration: React.FC<BlockCheckConfigurationProps> = ({ config, setConfig }) => {
    const [missTolerance, setMissTolerance] = useState(config.miss_tolerance || 0);
    const [missTolerancePeriodSeconds, setMissTolerancePeriodSeconds] = useState(config.miss_tolerance_period_seconds || 0);
    const [sleepDurationSeconds, setSleepDurationSeconds] = useState(config.sleep_duration_seconds || 0);
    const [alertSleepDurationMinutes, setAlertSleepDurationMinutes] = useState(config.alert_sleep_duration_minutes || 0);
    const [rpc, setRpc] = useState(config.rpc || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((prevConfig: BlockAlertConfiguration) => ({ ...prevConfig, [name]: value }));

        switch (name) {
            case 'miss_tolerance':
                setMissTolerance(Number(value));
                break;
            case 'miss_tolerance_period_seconds':
                setMissTolerancePeriodSeconds(Number(value));
                break;
            case 'sleep_duration_seconds':
                setSleepDurationSeconds(Number(value));
                break;
            case 'alert_sleep_duration_minutes':
                setAlertSleepDurationMinutes(Number(value));
                break;
            case 'rpc':
                setRpc(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <TextField
                margin="dense"
                id="miss_tolerance"
                label="Miss Tolerance"
                type="number"
                fullWidth
                variant="standard"
                value={missTolerance}
                onChange={handleChange}
                name="miss_tolerance"
            />
            <TextField
                margin="dense"
                id="miss_tolerance_period_seconds"
                label="Miss Tolerance Period Seconds"
                type="number"
                fullWidth
                variant="standard"
                value={missTolerancePeriodSeconds}
                onChange={handleChange}
                name="miss_tolerance_period_seconds"
            />
            <TextField
                margin="dense"
                id="sleep_duration_seconds"
                label="Sleep Duration Seconds"
                type="number"
                fullWidth
                variant="standard"
                value={sleepDurationSeconds}
                onChange={handleChange}
                name="sleep_duration_seconds"
            />
            <TextField
                margin="dense"
                id="alert_sleep_duration_minutes"
                label="Alert Sleep Duration Minutes"
                type="number"
                fullWidth
                variant="standard"
                value={alertSleepDurationMinutes}
                onChange={handleChange}
                name="alert_sleep_duration_minutes"
            />
            <TextField
                margin="dense"
                id="rpc"
                label="RPC"
                type="text"
                fullWidth
                variant="standard"
                value={rpc}
                onChange={handleChange}
                name="rpc"
            />
        </>
    );
}

export default BlockCheckConfiguration;