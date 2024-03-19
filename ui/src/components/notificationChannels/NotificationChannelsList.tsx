import {
    Button,
    LinearProgress,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {ApiNotificationChannel} from "../../types/ApiNotificationChannel";
import UpsertNotificationChannelModal from "./UpsertNotificationChannelModal";
import BooleanIcon from "../shared/BooleanIcon";
import {enqueueSnackbar} from "notistack";
import {ApiConfiguration} from "../../types/ApiConfiguration";

export interface NotificationChannelsListProps {
    configuration?: ApiConfiguration
}

const NotificationChannelsList: React.FC<NotificationChannelsListProps> = (
    {
        configuration,
    }
) => {
    const [notificationChannels, setNotificationChannels] = useState<ApiNotificationChannel[]>([]);
    const [editNotificationChannel, setEditNotificationChannel] = useState<ApiNotificationChannel|null>(null);
    const [openModal, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isFirstRender = useRef(true);

    const fetchData = useCallback(() => {
        setIsLoading(true)
        let url
        if (configuration) {
            url = `${process.env.REACT_APP_API_HOST}/api/configurations/${configuration.id}/notification-channels`
        } else {
            url = `${process.env.REACT_APP_API_HOST}/api/notification-channels`
        }

        fetch(url)
            .then(response => response.json())
            .then(data => setNotificationChannels(data))
            .catch((error) => {
                console.error('Error:', error);
                setNotificationChannels([])
            })
            .finally(() => setIsLoading(false))
        ;
    }, [setNotificationChannels, setIsLoading])

    useEffect(() => {
        if (isFirstRender.current) {
            fetchData()
            isFirstRender.current = false
        }
    }, [fetchData]);

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setEditNotificationChannel(null);
        setModalOpen(false);
    };

    const handleEdit = (id: number) => {
        const notificationChannel = notificationChannels
            .find((notificationChannel: ApiNotificationChannel) => notificationChannel.id === id);
        if (notificationChannel === undefined) {
            enqueueSnackbar(`No notification channel found with id ${id}`, {variant: 'error'})

            return
        }

        setEditNotificationChannel(notificationChannel)
        handleModalOpen()
    };

    const handleRemove = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/notification-channels/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchData()
            enqueueSnackbar(`Notification channel removed successfully`, {variant: 'success'})
        }).catch((error) => {
            console.error('Error:', error)
            enqueueSnackbar(`Error when deleting notification channel`, {variant: 'error'});
        });
    };

    return (
        <>
            <Typography typography={"h5"}>Notification Channels</Typography>
            {isLoading ? <LinearProgress/> : (<>
                <Button variant="outlined" onClick={handleModalOpen}>
                    Add Notification Channel
                </Button>
                <UpsertNotificationChannelModal
                    open={openModal}
                    fetchData={fetchData}
                    notificationChannel={editNotificationChannel}
                    handleClose={handleModalClose}
                />
                {isLoading ? <LinearProgress /> : <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Enabled</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificationChannels.map((notificationChannel) => (
                                <TableRow key={notificationChannel.id}>
                                    <TableCell>{notificationChannel.id}</TableCell>
                                    <TableCell>{notificationChannel.type}</TableCell>
                                    <TableCell>{notificationChannel.name}</TableCell>
                                    <TableCell>
                                        <BooleanIcon value={notificationChannel.is_enabled} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary"
                                                onClick={() => handleEdit(notificationChannel.id ?? 0)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary"
                                                onClick={() => handleRemove(notificationChannel.id ?? 0)}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </>)}
        </>
    )
}

export default NotificationChannelsList;
