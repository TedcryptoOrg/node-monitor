import React, {useState, useEffect, useCallback} from 'react';
import {
    Button,
    LinearProgress, Typography, Grid, Card, CardContent, CardActions
} from '@mui/material';
import {useParams} from 'react-router-dom';
import BooleanIcon from "../shared/BooleanIcon";
import {enqueueSnackbar} from "notistack";
import {User} from "../../types/User";
import CompanyLink from "../Company/CompanyLink";

type RouteParams = {
    [key: number]: string;
};

const UserOverview: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id: number };
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch!', {variant: 'error'});
                setUser(null)
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
                    {isLoading ? <LinearProgress /> : (user && (
                        <>
                            <Card>
                                <CardContent>
                                    <p>Username: {user.username}</p>
                                    <p>Is Enabled: <BooleanIcon value={user.is_active}/></p>
                                    <p>Is Admin: <BooleanIcon value={user.is_admin}/></p>
                                    <p>Is Super Admin: <BooleanIcon value={user.is_super_admin}/></p>
                                    <p>Company: <CompanyLink company={user.company}/></p>
                                    <p>Created At: {user.created_at?.toLocaleString()}</p>
                                    <p>Updated At: {user.updated_at?.toLocaleString()}</p>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained"
                                            color="warning"
                                            href={`/users/${user.id}/edit`}
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

export default UserOverview;