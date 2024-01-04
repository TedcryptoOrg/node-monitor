import React from 'react';
import {AlertColor, Snackbar} from '@mui/material';
import Alert from '@mui/material/Alert';

interface CustomSnackbarProps {
    open: boolean;
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
    message: string;
    severity?: AlertColor;
    autoHideDuration?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, handleClose, message, severity, autoHideDuration }) => {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration ?? 6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity ?? 'error'} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbar;