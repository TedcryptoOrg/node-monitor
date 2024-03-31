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
    LinearProgress
} from '@mui/material';
import BooleanIcon from "../shared/BooleanIcon";
import {enqueueSnackbar} from "notistack";
import {Company} from "../../types/Company";
import CompanyLink from "./CompanyLink";
import {useApi} from "../../context/ApiProvider";

const CompaniesComponent: React.FC = () => {
    const api = useApi()
    const [isLoading, setIsLoading] = useState(true);
    const [companiesData, setCompaniesData] = useState([]);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setIsLoading(true)
        api?.get(`/companies`)
            .then(response => {
                if (!response.ok) {
                    enqueueSnackbar('Failed to fetch companies data!', {variant: 'error'})
                }

                return response.body;
            })
            .then(data => setCompaniesData(data.results ?? []))
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch companies data!', {variant: 'error'})
                setCompaniesData([])
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            firstRender.current = false;
        }
    }, [fetchData]);

    const handleDelete = (company: Company) => () => {
        api?.delete(`/companies/${company.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete')
                }

                enqueueSnackbar('Deleted!', {variant: 'success'})
                fetchData()
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to delete!', {variant: 'error'})
            });
    }

    return (
        <div>
            <h2>Companies</h2>
            <Button variant="contained" color="success" href={"/companies/add"}>
                Add Companies
            </Button>
            {isLoading ? <LinearProgress /> : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Is Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companiesData.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>
                                        <CompanyLink company={row} />
                                    </TableCell>
                                    <TableCell>
                                        <BooleanIcon value={row.is_active} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" onClick={handleDelete(row)}>
                                            Delete
                                        </Button>
                                        <Button variant="contained" color="warning" href={`/companies/${row.id}/edit`}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </div>
    );
}

export default CompaniesComponent;