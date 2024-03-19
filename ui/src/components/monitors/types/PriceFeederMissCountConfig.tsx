import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import { PriceFeederMissCountConfiguration } from "../../../types/ApiMonitor";

interface PriceFeederMissCountConfigProps {
    config: PriceFeederMissCountConfiguration;
    setConfig: (config: (prevConfig: PriceFeederMissCountConfiguration) => PriceFeederMissCountConfiguration) => void;
}

const PriceFeederMissCountConfig: React.FC<PriceFeederMissCountConfigProps> = ({ config, setConfig }) => {
    const [missTolerance, setMissTolerance] = useState(config.miss_tolerance || 100);
    const [missTolerancePeriodSeconds, setMissTolerancePeriodSeconds] = useState(config.miss_tolerance_period_seconds || 3600);
    const [sleepDurationSeconds, setSleepDurationSeconds] = useState(config.sleep_duration_seconds || 5);
    const [alertSleepDurationMinutes, setAlertSleepDurationMinutes] = useState(config.alert_sleep_duration_minutes || 60);
    const [valoperAddress, setValoperAddress] = useState(config.valoper_address || '');

    useEffect(() => {
        setMissTolerance(config.miss_tolerance || 100);
        setMissTolerancePeriodSeconds(config.miss_tolerance_period_seconds || 3600);
        setSleepDurationSeconds(config.sleep_duration_seconds || 5);
        setAlertSleepDurationMinutes(config.alert_sleep_duration_minutes || 60);
        setValoperAddress(config.valoper_address || '');

        if (config.miss_tolerance === undefined) {
            setConfig((prevConfig: PriceFeederMissCountConfiguration) => ({
                ...prevConfig,
                miss_tolerance: 100,
                miss_tolerance_period_seconds: 3600,
                sleep_duration_seconds: 5,
                alert_sleep_duration_minutes: 60,
                valoper_address: '',
            }));
        }
    }, [config, setConfig]);

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
                helperText={"Number of blocks to tolerate missing before alerting"}
                type="number"
                fullWidth
                autoComplete={'off'}
                variant="standard"
                value={missTolerance}
                onChange={handleChange}
                name="miss_tolerance"
            />
            <TextField
                margin="dense"
                id="miss_tolerance_period_seconds"
                label="Miss Tolerance Period Seconds"
                helperText={"Number of seconds without missing to reset counter"}
                type="number"
                autoComplete={'off'}
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
                helperText={"Intervals to run the check"}
                autoComplete={'off'}
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
                helperText={"Number of minutes between alerts"}
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
                autoComplete={'off'}
                helperText={"Valoper address to check"}
                type="text"
                fullWidth
                variant="standard"
                value={valoperAddress}
                onChange={handleChange}
                name="valoper_address"
            />
        </>
    );
}

export default PriceFeederMissCountConfig;