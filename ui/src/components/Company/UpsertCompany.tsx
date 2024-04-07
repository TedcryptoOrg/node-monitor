import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {TextField, Button, Container, Box, Typography, Grid, FormControlLabel, Checkbox} from '@mui/material';
import {enqueueSnackbar} from "notistack";
import axios, {AxiosError} from "axios";
import {Company, CompanyInput} from "../../types/Company";
import {useApi} from "../../context/ApiProvider";

type RouteParams = {
    [key: number]: string | undefined;
};

const UpsertCompany: React.FC = () => {
    const api = useApi();
    const { id } = useParams<RouteParams>() as { id?: number };
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        if (id) {
            api?.get(`/companies/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }

                    return response.body
                })
                .then(data => {
                    setName(data.name);
                    setIsActive(data.is_active);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const company: CompanyInput = {
            name: name,
            is_active: isActive,
        };

        const url = id ? `/companies/${id}` : `/companies`;
        api?.[id ? 'put' : 'post'](url, company)
            .then(response => {
                enqueueSnackbar(`Successfully ${id ? 'updated' : 'created'}!`, {variant: 'success'})
                navigate('/companies/' + (response.body?.id ?? id ?? ''))
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
                    { id ? 'Update' : 'Create' } Company
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Name" value={name} onChange={e => setName(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Checkbox checked={isActive} onChange={e => setIsActive(e.target.checked)} />}
                                label="Is Active"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {id ? 'Update' : 'Create'} Company
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default UpsertCompany;