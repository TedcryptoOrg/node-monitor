import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import {Link} from "react-router-dom";
import ConfigurationLink from "../shared/ConfigurationLink";
import ServerLink from "../shared/ServerLink";

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
                                    <ConfigurationLink configuration={monitor.configuration} />
                                </TableCell>
                                <TableCell>{monitor.name}</TableCell>
                                <TableCell>
                                    {monitor.server && <ServerLink server={monitor.server} />}
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