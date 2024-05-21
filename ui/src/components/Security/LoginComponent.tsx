import React, {useState} from 'react';
import {Button, TextField, Grid, Box, Stack} from '@mui/material';
import {AxiosError} from 'axios';
import {enqueueSnackbar} from 'notistack';
import {useApi} from "../../context/ApiProvider";
import {useUserStore} from "../../stores/useUserStore";
import {useNavigate} from "react-router-dom";

const LoginComponent: React.FC = () => {
    const api = useApi();
    const {handleLoginResponse} = useUserStore();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        api?.post('/login', {
            username: username,
            password: password
        }).then((response) => {
            handleLoginResponse(response);
            window.location.href = '/';
        }).catch((error: any) => {
            console.error('Error:', error);
            if (error instanceof AxiosError && error.response?.data.message !== undefined) {
                enqueueSnackbar(error.response.data.message, {variant: 'error'});
                return;
            }

            enqueueSnackbar('Failed to log in!', {variant: 'error'});
        })
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <form onSubmit={handleLogin}>
                        <Stack padding={5} spacing={5}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginComponent;