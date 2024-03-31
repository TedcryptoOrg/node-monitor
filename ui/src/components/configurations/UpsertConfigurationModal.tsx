import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ApiConfiguration } from "../../types/ApiConfiguration";
import Switch from "@mui/material/Switch";
import Chains from "../Chains";
import { useSnackbar } from "notistack";

interface ConfigurationModalProps {
  open: boolean;
  fetchData: () => void;
  configuration: ApiConfiguration | null;
  handleClose: any;
}
const UpsertConfigurationModal: React.FC<ConfigurationModalProps> = ({
  open,
  fetchData,
  configuration,
  handleClose,
}) => {
  const [name, setName] = useState(configuration?.name);
  const [chain, setChain] = useState(configuration?.chain);
  const [isEnabled, setIsEnabled] = useState(configuration?.is_enabled);

  const { enqueueSnackbar } = useSnackbar();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnabled(event.target.checked);
  };

  const customHandleClose = () => {
    handleClose();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) {
      enqueueSnackbar("Please enter a name!", { variant: "error" });
      return;
    }
    if (!chain || chain === "") {
      enqueueSnackbar("Please enter a chain!", { variant: "error" });
      return;
    }

    const configurationInput = {
      name: name,
      chain: chain,
      is_enabled: isEnabled,
    };
    console.log("Form submitted", configurationInput);

    const url = configuration
      ? `${process.env.REACT_APP_API_HOST}/api/configurations/${configuration.id}`
      : `${process.env.REACT_APP_API_HOST}/api/configurations`;
    const method = configuration ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(configurationInput),
    })
      .then((response) => {
        if (!response.ok) {
          enqueueSnackbar("Failed to add monitor!", { variant: "error" });
          return;
        }

        return response.json();
      })
      .then((data) => {
        fetchData();
        enqueueSnackbar("Monitor added!", { variant: "success" });
        console.log("Success:", data);
      })
      .catch((error) => {
        enqueueSnackbar("Failed to add monitor!", { variant: "error" });
        console.error("Error:", error);
      });

    customHandleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={customHandleClose}>
        <DialogTitle>Add Monitor</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter the name and chain for the monitor.
            </DialogContentText>
            <DialogContentText>
              <TextField
                defaultValue={name}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                required
                autoComplete={"off"}
                onChange={(e) => setName(e.target.value)}
              />
            </DialogContentText>
            <DialogContentText>
              {chain && (
                <Chains
                  chain={chain}
                  setChain={setChain}
                  //defaultValue={chain.name}
                />
              )}
            </DialogContentText>
            <FormControlLabel
              label="Is Enabled"
              control={
                <Switch
                  checked={isEnabled}
                  onChange={handleSwitchChange}
                  name="isEnabled"
                  color="primary"
                />
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={customHandleClose}>Cancel</Button>
            <Button type="submit">{configuration ? "Edit" : "Add"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UpsertConfigurationModal;
