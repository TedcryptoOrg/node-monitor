import React, {useEffect, useState} from "react";
import { Autocomplete, TextField } from '@mui/material';
import {Chain, ChainDirectory} from "@tedcryptoorg/cosmos-directory";

const chainDirectory = new ChainDirectory();

interface ChainsAutocompleteProps {
    chain: string
    setChain: (chain: string) => void
}

const ChainsAutocomplete: React.FC<ChainsAutocompleteProps> = (
    {
        chain,
        setChain
    }) => {
    const [chains, setChains] = useState<Chain[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chainDirectory.getChains().then((response) => {
            setChains(response.chains);
            setLoading(false);
        });
    }, []);

    return (
        <Autocomplete
            options={chains}
            loading={loading}
            selectOnFocus={true}
            clearOnBlur={true}
            handleHomeEndKeys={true}
            getOptionLabel={(option) => option.name}
            value={chain ? chains.find((c) => c.name === chain) : null}
            onChange={(event, newValue) => {
                setChain(newValue ? newValue.name : '');
            }}
            renderInput={(params) => <TextField {...params} label="Chain Name" variant="outlined" required />}
        />
    );
}

export default ChainsAutocomplete;