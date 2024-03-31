import React, {useEffect, useState} from 'react';
import {LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {ApiAudit} from "../types/ApiAudit";
import {Link} from "react-router-dom";
import ConfigurationLink from "./configurations/ConfigurationLink";
import ServerLink from "./servers/ServerLink";
import {useApi} from "../context/ApiProvider";

const AuditComponent: React.FC = () => {
    const api = useApi();
    const [audits, setAudits] = useState<ApiAudit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            api?.get(`/audit/latest`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }

                    return response.body;
                })
                .then(data => setAudits(data))
                .catch((error) => {
                    console.error('Error:', error);
                    setAudits([])
                })
                .finally(() => setIsLoading(false))
            ;

            firstRender.current = false;
            return;
        }
    }, []);

    return (
        <div>
            <h2>Audit</h2>
            {isLoading ? <LinearProgress /> : (
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Object</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {audits.map((audit, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {audit.configuration && (<><b>Configuration:</b>
                                        <ConfigurationLink configuration={audit.configuration} />
                                    <br/></>)}
                                    {audit.server && (<><b>Server:</b>
                                        <ServerLink server={audit.server} />
                                    <br/></>)}
                                    {audit.monitor && (<><b>Monitor:</b>
                                    <Link to={`/monitor/${audit.monitor?.id}`}>
                                        {audit.monitor?.name}
                                    </Link></>)}
                                </TableCell>
                                <TableCell>{audit.created_at}</TableCell>
                                <TableCell>{audit.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>)}
        </div>
    );
}

export default AuditComponent;