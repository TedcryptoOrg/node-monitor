import React, {useEffect, useState} from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const LastWarningsComponent: React.FC = () => {
    const [lastWarnings, setLastWarnings] = useState<ApiMonitor[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/monitors/warnings`)
            .then(response => response.json())
            .then(data => setLastWarnings(data))
            .catch((error) => {
                console.error('Error:', error);
                setLastWarnings([])
            });
    })

    return (
        <>
            <h3>Warnings</h3>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Monitor</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lastWarnings.map((monitor, index) => (
                            <TableRow key={index}>
                                <TableCell>{monitor.name}</TableCell>
                                <TableCell>{monitor.last_error}</TableCell>
                                <TableCell>{monitor.last_check?.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default LastWarningsComponent;