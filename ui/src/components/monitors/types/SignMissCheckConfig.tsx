import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import { SignMissCheckConfiguration } from "../../../types/ApiMonitor";

interface SignMissCheckConfigProps {
    config: SignMissCheckConfiguration;
    setConfig: (config: (prevConfig: SignMissCheckConfiguration) => SignMissCheckConfiguration) => void;
}

const SignMissCheckConfig: React.FC<SignMissCheckConfigProps> = ({ config, setConfig }) => {
    const [missTolerance, setMissTolerance] = useState(config.miss_tolerance || 10);
    const [missTolerancePeriodSeconds, setMissTolerancePeriodSeconds] = useState(config.miss_tolerance_period_seconds || 100);
    const [sleepDurationSeconds, setSleepDurationSeconds] = useState(config.sleep_duration_seconds || 5);
    const [alertSleepDurationMinutes, setAlertSleepDurationMinutes] = useState(config.alert_sleep_duration_minutes || 1);
    const [valoperAddress, setValoperAddress] = useState(config.valoper_address || '');
    const [rpc, setRpc] = useState(config.rpc || '');
    const [rest, setRest] = useState(config.rest || '');

    useEffect(() => {
console.log(config);
        setMissTolerance(config.miss_tolerance || 10);
        setMissTolerancePeriodSeconds(config.miss_tolerance_period_seconds || 100);
        setSleepDurationSeconds(config.sleep_duration_seconds || 5);
        setAlertSleepDurationMinutes(config.alert_sleep_duration_minutes || 1);
        setValoperAddress(config.valoper_address || '');
        setRpc(config.rpc || '');
        setRest(config.rest || '');

        if (config.miss_tolerance === undefined) {
            setConfig((prevConfig: SignMissCheckConfiguration) => ({
                ...prevConfig,
                miss_tolerance: 10,
                miss_tolerance_period_seconds: 100,
                sleep_duration_seconds: 5,
                alert_sleep_duration_minutes: 1,
                valoper_address: '',
                rpc: '',
                rest: ''
            }));
        }
    }, [config, setConfig]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((prevConfig: SignMissCheckConfiguration) => ({ ...prevConfig, [name]: value }));

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
            case 'rpc':
                setRpc(value);
                break;
            case 'rest':
                setRest(value);
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
                id="rpc"
                label="RPC"
                type="text"
                fullWidth
                variant="standard"
                value={rpc}
                onChange={handleChange}
                name="rpc"
            />
            <TextField
                margin="dense"
                id="rest"
                label="REST"
                type="text"
                fullWidth
                variant="standard"
                value={rest}
                onChange={handleChange}
                name="rest"
            />
        </>
    );
}

export default SignMissCheckConfig;