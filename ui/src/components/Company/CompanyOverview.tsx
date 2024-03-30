import React, {useState, useEffect, useCallback} from 'react';
import {
    Button,
    LinearProgress, Typography, Grid, Card, CardContent, CardActions
} from '@mui/material';
import {useParams} from 'react-router-dom';
import BooleanIcon from "../shared/BooleanIcon";
import {enqueueSnackbar} from "notistack";
import {Company} from "../../types/Company";

type RouteParams = {
    [key: number]: string;
};

const DistributeChainOverview: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id: number };
    const [isLoading, setLoading] = useState(true);
    const [company, setCompany] = useState<Company | null>(null);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/companies/${id}`)
            .then(response => response.json())
            .then(data => setCompany(data))
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch!', {variant: 'error'});
                setCompany(null)
            })
            .finally(() => setLoading(false))
        ;
    }, [id]);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            firstRender.current = false
        }
    }, [fetchData, id]);

    return (
        <>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Typography variant="h5">Distribute chain Overview</Typography>
                </Grid>
                <Grid xs={12} md={12}>
                    {isLoading ? <LinearProgress /> : (company && (
                        <>
                            <Card>
                                <CardContent>
                                    <p>Name: {company.name}</p>
                                    <p>Is Enabled: <BooleanIcon value={company.is_active}/></p>
                                    <p>Created At: {company.created_at?.toLocaleString()}</p>
                                    <p>Updated At: {company.updated_at?.toLocaleString()}</p>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained"
                                            color="warning"
                                            href={`/companies/${company.id}/edit`}
                                    >
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}

export default DistributeChainOverview;