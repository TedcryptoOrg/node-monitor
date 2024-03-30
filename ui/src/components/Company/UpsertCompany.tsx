import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {TextField, Button, Container, Box, Typography, Grid, FormControlLabel, Checkbox} from '@mui/material';
import {enqueueSnackbar} from "notistack";
import axios, {AxiosError} from "axios";
import {Company, CompanyInput} from "../../types/Company";

type RouteParams = {
    [key: number]: string | undefined;
};

const UpsertCompany: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id?: number };
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        if (id) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/companies/${id}`)
                .then(response => response.json())
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

        const method = id ? 'put' : 'post';
        const url = id
            ? `${process.env.REACT_APP_API_HOST}/api/companies/${id}`
            : `${process.env.REACT_APP_API_HOST}/api/companies`;
        (axios[method] as any)(url, company)
            .then((data: Company) => {
                enqueueSnackbar('Successfully updated!', {variant: 'success'})
                navigate('/companies/' + (data.id ?? id ?? ''))
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