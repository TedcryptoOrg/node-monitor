import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Chain, ChainDirectory } from "@tedcryptoorg/cosmos-directory";

const chainDirectory = new ChainDirectory();

interface ChainsAutocompleteProps {
  chain: string;
  setChain: (chain: string) => void;
}

const ChainsAutocomplete: React.FC<ChainsAutocompleteProps> = ({
  chain,
  setChain,
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
      defaultValue={chain}
      value={chain}
      options={chains.map((chain) => chain.name)}
      loading={loading}
      selectOnFocus={true}
      clearOnBlur={true}
      handleHomeEndKeys={true}
      getOptionLabel={(option) => option}
      onChange={(event, newValue) => {
        setChain(newValue ? newValue : "");
      }}
      renderInput={(params) => (
        <TextField {...params} label="Chain Name" variant="outlined" required />
      )}
    />
  );
};

export default ChainsAutocomplete;
