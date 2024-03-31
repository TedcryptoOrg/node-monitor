import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from "@mui/material";
import UpsertConfigurationModal from "./UpsertConfigurationModal";
import BooleanIcon from "../shared/BooleanIcon";
import ConfigurationLink from "./ConfigurationLink";
import MonitorsStatus from "../monitors/MonitorsStatus";
import {enqueueSnackbar} from "notistack";
import {useApi} from "../../context/ApiProvider";

import { enqueueSnackbar } from "notistack";

const ConfigurationsComponent: React.FC = () => {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [configurationsData, setConfigurationsData] = useState([]);
  const [editMonitor, setEditMonitor] = useState(null);
  const firstRender = React.useRef(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    api?.get(`/configurations`)
      .then(response => {
          if (!response.ok) {
              enqueueSnackbar('Failed to fetch configuration data!', {variant: 'error'})
          }

          return response.body;
      })
      .then(data => setConfigurationsData(data))
      .catch((error) => {
          console.error('Error:', error);
          setConfigurationsData([])
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setEditMonitor(null);
  };

  useEffect(() => {
    if (firstRender.current) {
      fetchData();
      firstRender.current = false;
    }
  }, [fetchData]);

  const handleEdit = (id: number) => {
    console.log("edit", id, configurationsData);
    const monitor = configurationsData.find(
      (monitor: any) => monitor.id === id
    );
    if (monitor) {
      setEditMonitor(monitor);
      setOpenModal(true);
    } else {
      console.error(`No monitor found with id ${id}`);
    }
  };

  const handleRemove = (id: number) => {
    api?.delete(`/configurations/${id}`)
      .then(() => {
          fetchData()
          enqueueSnackbar('Configuration removed successfully!', {variant: 'success'})
      }).catch((error) => {
          console.error('Error:', error)
      });
  };

  return (
    <div>
      <h2>Configurations</h2>
      <p>Your main configurations</p>
      <Button variant="outlined" onClick={handleModalOpen}>
        Add Configuration
      </Button>
      <UpsertConfigurationModal
        open={openModal}
        fetchData={fetchData}
        configuration={editMonitor}
        handleClose={handleModalClose}
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Chain</TableCell>
                <TableCell>Is Enabled</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {configurationsData.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <ConfigurationLink configuration={row} />
                  </TableCell>
                  <TableCell>{row.chain}</TableCell>
                  <TableCell>
                    <BooleanIcon value={row.is_enabled} />
                  </TableCell>
                  <TableCell>
                    <MonitorsStatus monitors={row.monitors} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(row.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemove(row.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ConfigurationsComponent;
