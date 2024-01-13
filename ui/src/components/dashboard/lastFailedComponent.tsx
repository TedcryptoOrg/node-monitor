import React, {useEffect, useState} from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const LastFailedComponent: React.FC = () => {
    const [lastFailed, setLastFailed] = useState<ApiMonitor[]>([])
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/monitors/failed`)
                .then(response => response.json())
                .then(data => setLastFailed(data))
                .catch((error) => {
                    console.error('Error:', error);
                    setLastFailed([])
                });

            firstRender.current = false;
            return;
        }
    }, [])

    return (
        <>
            <h3>On going issues</h3>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Monitor</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lastFailed.map((monitor, index) => (
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

export default LastFailedComponent;