import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {ApiAudit} from "../types/ApiAudit";

const AuditComponent: React.FC = () => {
    const [audits, setAudits] = useState<ApiAudit[]>([]);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/audit/latest`)
                .then(response => response.json())
                .then(data => setAudits(data))
                .catch((error) => {
                    console.error('Error:', error);
                    setAudits([])
                });

            firstRender.current = false;
            return;
        }
    }, []);

    return (
        <div>
            <h2>Audit</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Created At</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {audits.map((audit, index) => (
                            <TableRow key={index}>
                                <TableCell>{audit.created_at}</TableCell>
                                <TableCell>{audit.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AuditComponent;