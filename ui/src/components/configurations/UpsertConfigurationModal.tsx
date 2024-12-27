import React, { useEffect, useState } from 'react';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import ConfigurationModal from './modals/ConfigurationModal';

interface UpsertConfigurationModalProps {
  open: boolean;
  fetchData: () => void;
  configuration: ApiConfiguration | null;
  handleClose: () => void;
}

const UpsertConfigurationModal: React.FC<UpsertConfigurationModalProps> = ({
  open,
  fetchData,
  configuration,
  handleClose,
}) => {
  const api = useApi();
  const [name, setName] = useState('');
  const [chain, setChain] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (configuration) {
      setName(configuration.name);
      setChain(configuration.chain);
      setIsEnabled(configuration.is_enabled);
    } else {
      setName('');
      setChain('');
      setIsEnabled(true);
    }
  }, [configuration]);

  const handleSubmit = async () => {
    if (!name || !chain) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    const configData = {
      name,
      chain,
      is_enabled: isEnabled,
    };

    try {
      const response = await api?.[configuration ? 'put' : 'post'](
        configuration ? `/configurations/${configuration.id}` : '/configurations',
        configData
      );

      if (!response?.ok) {
        throw new Error('Failed to save configuration');
      }

      enqueueSnackbar(
        `Configuration ${configuration ? 'updated' : 'created'} successfully`,
        { variant: 'success' }
      );
      fetchData();
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(
        `Failed to ${configuration ? 'update' : 'create'} configuration`,
        { variant: 'error' }
      );
    }
  };

  return (
    <ConfigurationModal
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={configuration ? 'Edit Configuration' : 'Add Configuration'}
      name={name}
      setName={setName}
      chain={chain}
      setChain={setChain}
      isEnabled={isEnabled}
      setIsEnabled={setIsEnabled}
      configuration={configuration}
    />
  );
};

export default UpsertConfigurationModal;