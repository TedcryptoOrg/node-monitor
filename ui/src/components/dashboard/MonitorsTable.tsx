import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import {Link} from "react-router-dom";

interface MonitorsTableProps {
    monitors: ApiMonitor[];
}

const MonitorsTable: React.FC<MonitorsTableProps> = ({monitors}) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Configuration</TableCell>
                            <TableCell>Monitor</TableCell>
                            <TableCell>Server</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Last check</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {monitors.map((monitor, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Link to={`/configuration/${monitor.configuration.id}`}>
                                        {monitor.configuration.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{monitor.name}</TableCell>
                                <TableCell>
                                    <Link to={`/server/${monitor.server?.id}`}>
                                        {monitor.server?.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{monitor.last_error}</TableCell>
                                <TableCell>{monitor.last_check?.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default MonitorsTable;