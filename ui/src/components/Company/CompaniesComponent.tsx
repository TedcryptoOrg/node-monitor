import React from 'react';
import {TableCell,} from '@mui/material';
import BooleanIcon from "../Shared/BooleanIcon";
import {Company} from "../../types/Company";
import CompanyLink from "./CompanyLink";
import CrudList from "../Shared/Crud/CrudList";

const CompaniesComponent: React.FC = () => {
    return (
        <CrudList title={'Companies'} endpoint={"/companies"} crud_actions={{create: true, delete: true, edit: true}} table={{
            columns: ['ID', 'Name', 'Is Active'],
            render_row: (row: Company) => (
                <>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                        <CompanyLink company={row} />
                    </TableCell>
                    <TableCell>
                        <BooleanIcon value={row.is_active} />
                    </TableCell>
                </>
            )
        }} />
    );
}

export default CompaniesComponent;
