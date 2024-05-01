import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {TextField, Button, Container, Box, Typography, Grid, FormControlLabel, Checkbox} from '@mui/material';
import {enqueueSnackbar} from "notistack";
import {UserInput} from "../../types/User";
import {Company} from "../../types/Company";
import CompanyAutocomplete from "../Company/CompanyAutocomplete";
import {useApi} from "../../context/ApiProvider";

type RouteParams = {
    [key: number]: string | undefined;
};

const UpsertUser: React.FC = () => {
    const api = useApi();
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
            api?.get(`/users/${id}`)
                .then(response => {
                    if (!response.ok || !response.body) {
                        throw new Error('Failed to fetch user!')
                    }
                    const data = response.body;
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
    }, [id, api]);

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

        api?.[id ? 'put' : 'post'](id ? `/users/${id}` : `/users`, userInput)
            .then(response => {
                if (!response.ok) {
                    const errorMessage = response.body.message || response.body.error || response.body;
                    throw new Error(`Failed to ${id ? 'update' : 'create'}` + (errorMessage ? ': ' + errorMessage : ''))
                }

                enqueueSnackbar(`Successfully ${id ? 'update' : 'create'}!`, {variant: 'success'})
                navigate('/users/')
            })
            .catch((error: any) => {
                enqueueSnackbar(`Failed! Error: ${error}`, {variant: 'error'})
            })
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