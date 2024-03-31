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
import {User} from "../../types/User";
import CompanyLink from "../Company/CompanyLink";
import UserLink from "./UserLink";
import {useApi} from "../../context/ApiProvider";

const UserComponent: React.FC = () => {
    const api = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState<User[]>([]);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setIsLoading(true)
        api?.get(`/users`)
            .then(response => {
                if (!response.ok) {
                    throw Error('Failed to fetch')
                }

                setUsersData(response.body.results ?? [])
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch users data!', {variant: 'error'})
                setUsersData([])
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            firstRender.current = false;
        }
    }, [fetchData]);

    const handleDelete = (user: User) => () => {
        api?.delete(`/users/${user.id}`)
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
            <h2>Users</h2>
            <Button variant="contained" color="success" href={"/users/add"}>
                Add User
            </Button>
            {isLoading ? <LinearProgress /> : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Is Active</TableCell>
                                <TableCell>Is Admin</TableCell>
                                <TableCell>Is Super Admin</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>
                                        <UserLink user={row} />
                                    </TableCell>
                                    <TableCell>
                                        <BooleanIcon value={row.is_active} />
                                    </TableCell>
                                    <TableCell>
                                        <BooleanIcon value={row.is_admin} />
                                    </TableCell>
                                    <TableCell>
                                        <BooleanIcon value={row.is_super_admin} />
                                    </TableCell>
                                    <TableCell>
                                        <CompanyLink company={row.company} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" onClick={handleDelete(row)}>
                                            Delete
                                        </Button>
                                        <Button variant="contained" color="warning" href={`/users/${row.id}/edit`}>
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

export default UserComponent;