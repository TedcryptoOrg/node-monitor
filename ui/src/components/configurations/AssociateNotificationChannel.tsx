import React, { useEffect, useState } from 'react';
import {Button, Grid} from '@mui/material';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { ApiNotificationChannel } from '../../types/ApiNotificationChannel';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import {enqueueSnackbar} from "notistack";
import {ApiConfigurationNotificationChannelInput} from "../../types/ApiConfigurationNotificationChannel";
import {eventEmitter} from "../../services/Events/EventEmitter";
import {EventsEnum} from "../../services/Events/EventsEnum";
import {useApi} from "../../context/ApiProvider";

interface AssociateNotificationChannelProps {
    configuration: ApiConfiguration;
}

const AssociateNotificationChannel: React.FC<AssociateNotificationChannelProps> = ({ configuration }) => {
    const api = useApi();
    const [notificationChannels, setNotificationChannels] = useState<ApiNotificationChannel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<ApiNotificationChannel | null>(null);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            api?.get(`/notification-channels`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }

                    return response.body
                })
                .then(data => setNotificationChannels(data));
            firstRender.current = false;
        }
    }, [setNotificationChannels, firstRender]);

    const handleAdd = () => {
        if (!selectedChannel) {
            enqueueSnackbar('Please select a notification channel!', {variant: 'error'});
            return;
        }
        const configurationNotificationChannel: ApiConfigurationNotificationChannelInput = {
            configuration_id: configuration.id,
            notification_channel_id: selectedChannel.id,
        }
        api?.post(`/configurations/${configuration.id}/notification-channels`, configurationNotificationChannel)
            .then(async (response) => {
                if (!response.ok) {
                    throw Error('Failed to associate notification channel')
                }

                return response.body
            })
            .then(data => {
                setSelectedChannel(null);
                eventEmitter.emit(EventsEnum.NOTIFICATION_CHANNEL_ASSOCIATED);
                enqueueSnackbar(`Successfully associated notification channel`, {variant: 'success'})
            })
            .catch((error) => enqueueSnackbar(`Failed to associate notification channel: ${error}`, {variant: 'error'}))
        ;
    };

    return (
        <Grid container spacing={0} paddingTop={2}>
            <Grid xs={12}>
                <Autocomplete
                    options={notificationChannels}
                    getOptionLabel={(option) => option.name}
                    value={selectedChannel}
                    onChange={(event, newValue) => {
                        setSelectedChannel(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Notification Channels" required variant="outlined" />}
                />
            </Grid>
            <Grid xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleAdd}>
                    Add
                </Button>
            </Grid>
        </Grid>
    );
};

export default AssociateNotificationChannel;