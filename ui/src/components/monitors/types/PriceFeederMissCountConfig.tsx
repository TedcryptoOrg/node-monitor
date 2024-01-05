import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { PriceFeederMissCountConfiguration } from "../../../types/ApiMonitor";

interface PriceFeederMissCountConfigProps {
    config: PriceFeederMissCountConfiguration;
    setConfig: (config: (prevConfig: PriceFeederMissCountConfiguration) => PriceFeederMissCountConfiguration) => void;
}

const PriceFeederMissCountConfig: React.FC<PriceFeederMissCountConfigProps> = ({ config, setConfig }) => {
    const [missTolerance, setMissTolerance] = useState(config.miss_tolerance || 0);
    const [missTolerancePeriodSeconds, setMissTolerancePeriodSeconds] = useState(config.miss_tolerance_period_seconds || 0);
    const [sleepDurationSeconds, setSleepDurationSeconds] = useState(config.sleep_duration_seconds || 0);
    const [alertSleepDurationMinutes, setAlertSleepDurationMinutes] = useState(config.alert_sleep_duration_minutes || 0);
    const [valoperAddress, setValoperAddress] = useState(config.valoper_address || '');
    const [restAddress, setRestAddress] = useState(config.rest_address || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((prevConfig: PriceFeederMissCountConfiguration) => ({ ...prevConfig, [name]: value }));

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
            case 'valoper_address':
                setValoperAddress(value);
                break;
            case 'rest_address':
                setRestAddress(value);
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
                id="valoper_address"
                label="Valoper Address"
                type="text"
                fullWidth
                variant="standard"
                value={valoperAddress}
                onChange={handleChange}
                name="valoper_address"
            />
            <TextField
                margin="dense"
                id="rest_address"
                label="REST Address"
                type="text"
                fullWidth
                variant="standard"
                value={restAddress}
                onChange={handleChange}
                name="rest_address"
            />
        </>
    );
}

export default PriceFeederMissCountConfig;