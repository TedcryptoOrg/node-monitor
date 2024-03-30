import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {TextField, Button, Container, Box, Typography, Grid, FormControlLabel, Checkbox} from '@mui/material';
import {enqueueSnackbar} from "notistack";
import axios, {AxiosError} from "axios";
import {UserInput} from "../../types/User";
import {Company} from "../../types/Company";
import CompanyAutocomplete from "../Company/CompanyAutocomplete";

type RouteParams = {
    [key: number]: string | undefined;
};

const UpsertUser: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id?: number };
    const [username, setUsername] = useState('');
    const [rawPassword, setRawPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isSuperAdmin, setIsSuperAdmin] = useState(true);
    const [company, setCompany] = useState<Company|undefined>(undefined);
    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        if (id) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/users/${id}`)
                .then(response => response.json())
                .then(data => {
                    setUsername(data.username)
                    setIsActive(data.is_active)
                    setIsAdmin(data.is_admin)
                    setIsSuperAdmin(data.is_super_admin)
                    setCompany(data.company)
                })
                .catch(() => {
                    enqueueSnackbar('Failed to load data!', {variant: 'error'})
                });
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!company) {
            enqueueSnackbar('Please select a company', {variant: 'error'})
            return
        }
        if (!id && !rawPassword) {
            enqueueSnackbar('Please enter a password', {variant: 'error'})
            return
        }

        const userInput: UserInput = {
            username: username,
            is_active: isActive,
            is_admin: isAdmin,
            is_super_admin: isSuperAdmin,
            company_id: company.id,
            ...(rawPassword && { raw_password: rawPassword })
        };

        const method = id ? 'put' : 'post';
        const url = id
            ? `${process.env.REACT_APP_API_HOST}/api/users/${id}`
            : `${process.env.REACT_APP_API_HOST}/api/users`;
        (axios[method] as any)(url, userInput)
            .then((data: Company) => {
                enqueueSnackbar('Successfully updated!', {variant: 'success'})
                navigate('/users/' + (data.id ?? id ?? ''))
            })
            .catch((error: AxiosError) => {
                console.error('Error:', error);

                const data: any = error.response?.data;
                if (data) {
                    const errorMessage = data.message || data.error || data;
                    enqueueSnackbar(`Failed! Error: ${errorMessage}`, {variant: 'error'})

                    return
                }

                enqueueSnackbar(`Failed! Error: ${error}`, {variant: 'error'})
            });
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    { id ? 'Update' : 'Create' } User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Checkbox checked={isActive} onChange={e => setIsActive(e.target.checked)} />}
                                label="Is Active"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Checkbox checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />}
                                label="Is Admin"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Checkbox checked={isSuperAdmin} onChange={e => setIsSuperAdmin(e.target.checked)} />}
                                label="Is Super Admin"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth
                                       label="Raw Password"
                                       value={rawPassword}
                                       required={!id}
                                       onChange={e => setRawPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CompanyAutocomplete company={company ?? null} setCompany={setCompany} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {id ? 'Update' : 'Create'} User
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default UpsertUser;