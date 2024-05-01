import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress, Grid, Typography, Stack
} from '@mui/material';
import {enqueueSnackbar} from "notistack";
import {Link} from "react-router-dom";
import {useApi} from "../../../context/ApiProvider";

export interface CrudListProps {
    title: string;
    endpoint: string;
    crud_actions: {create?: boolean, edit?: boolean, delete?: boolean};
    table: {
        columns: Array<string>;
        render_row: (row: any) => React.ReactNode;
    };
}

const CrudList: React.FC<CrudListProps> = ({endpoint, title, crud_actions, table}) => {
    const api = useApi()
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setIsLoading(true)
        setRows([])
        api?.get(endpoint)
            .then((response: any) => {
                if (!response.ok && !response.body) {
                    throw new Error('Failed to fetch data!')
                }

                return setRows(response.body.results ?? []);
            })
            .catch((error: any) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch data!', {variant: 'error'})
                setRows([])
            })
            .finally(() => setIsLoading(false));
    }, [api, endpoint]);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            firstRender.current = false;
        }
    }, [fetchData]);

    const handleDelete = (row: object) => () => {
        if (!("id" in row)) {
            enqueueSnackbar('Failed to delete!', {variant: 'error'})
            return
        }

        api?.delete(endpoint + "/" + row.id)
            .then((response: any) => {
                if (!response.ok) {
                    throw new Error('Failed to delete')
                }

                enqueueSnackbar('Deleted!', {variant: 'success'})
                fetchData()
            })
            .catch((error: any) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to delete!', {variant: 'error'})
            });
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            {crud_actions.create && <Grid item xs={12}>
                <Button component={Link} variant="contained" color="success" to={endpoint + "/add"}>
                    Create record
                </Button>
            </Grid>}
            <Grid item xs={12}>
                {isLoading ? <LinearProgress /> : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {table.columns.map((column: string) => (
                                        <TableCell key={column}>{column}</TableCell>
                                    ))}
                                    {(crud_actions.edit || crud_actions.delete) && <TableCell>Actions</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows.map((row: any) => (
                                    <TableRow key={row.id}>
                                        {table.render_row(row)}
                                        {(crud_actions.edit || crud_actions.delete) && <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                {crud_actions.edit && <Button component={Link} variant="contained" color="warning" to={endpoint + "/" + row.id + "/edit"}>
                                                    Edit
                                                </Button>}
                                                {crud_actions.delete && <Button variant="contained" color="error" onClick={handleDelete(row)}>
                                                    Delete
                                                </Button>}
                                            </Stack>
                                        </TableCell>}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>)}
            </Grid>
        </Grid>
    );
}

export default CrudList;