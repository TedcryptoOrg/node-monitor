import React, {useEffect, useState} from "react";
import { Autocomplete, TextField } from '@mui/material';
import {Company} from "../../types/Company";
import {useApi} from "../../context/ApiProvider";

interface CompanyAutocompleteProps {
    company: Company|null,
    setCompany: (company: Company) => void
}

const CompanyAutocomplete: React.FC<CompanyAutocompleteProps> = (
    {
        company,
        setCompany
    }) => {
    const api = useApi();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        api?.get(`/companies`)
            .then(response => {
                if (!response.ok) {
                    throw Error('Failed to fetch')
                }

                return response.body;
            })
            .then(data => {
                setCompanies(data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [company, api]);

    return (
        <>
            <Autocomplete
                options={companies}
                loading={loading}
                selectOnFocus={true}
                clearOnBlur={true}
                handleHomeEndKeys={true}
                getOptionLabel={(option) => option.name}
                value={company
                    ? companies.find((companiesDatum: Company) => companiesDatum.id === company.id)
                    : null}
                onChange={(event, newValue) => {
                    if (newValue && newValue.id !== company?.id) {
                        const selectedRecord = companies.find((companyDatum: Company) => companyDatum.id === newValue.id);
                        if (selectedRecord) {
                            setCompany(selectedRecord);
                        }
                    }
                }}
                renderInput={(params) => <TextField {...params} label="Company" variant="outlined" required />}
            />
        </>
    );
}

export default CompanyAutocomplete;