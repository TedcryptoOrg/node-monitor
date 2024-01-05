import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import {UrlCheckConfiguration} from "../../../types/ApiMonitor";

interface UrlCheckConfigProps {
    config: UrlCheckConfiguration;
    setConfig: (config: (prevConfig: UrlCheckConfiguration) => UrlCheckConfiguration) => void;
}

const UrlCheckConfig: React.FC<UrlCheckConfigProps> = ({ config, setConfig }) => {
    const [name, setName] = useState(config.name || '');
    const [address, setAddress] = useState(config.address || '');

    useEffect(() => {
        console.log(config);
        setName(config.name || '');
        setAddress(config.address || '');

        if (config.name === undefined) {
            setConfig((prevConfig: UrlCheckConfiguration) => ({
                ...prevConfig,
                name: '',
                address: ''
            }));
        }
    }, [config, setConfig]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((prevConfig: UrlCheckConfiguration) => ({ ...prevConfig, [name]: value }));

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'address':
                setAddress(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <TextField
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                autoComplete={'off'}
                variant="standard"
                value={name}
                onChange={handleChange}
                name="name"
            />
            <TextField
                margin="dense"
                id="address"
                label="Address"
                autoComplete={'off'}
                type="text"
                fullWidth
                variant="standard"
                value={address}
                onChange={handleChange}
                name="address"
            />
        </>
    );
}

export default UrlCheckConfig;