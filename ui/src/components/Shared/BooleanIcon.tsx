import React from 'react';
import Off from '@mui/icons-material/HighlightOff';
import On from '@mui/icons-material/CheckCircle';

interface BooleanIconProps {
    value: boolean;
}

const BooleanIcon: React.FC<BooleanIconProps> = ({ value }) => {
    return value
        ? <On fontSize={"small"} htmlColor="green" />
        : <Off fontSize={"small"} htmlColor="red" />;
}

export default BooleanIcon;