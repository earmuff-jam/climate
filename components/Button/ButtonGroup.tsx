import { Box } from '@mui/system';
import React from 'react';
import Btn from './Btn';

interface Iprops {
    display: string;
    flexDirection: string;
    justifyContent: string;
    gap: string;
    submitLabel: string;
    handleSubmit: Function;
    cancelLabel: string;
    handleCancel: Function;
}

const ButtonGroup: React.FC<Iprops> = (props) => {

    const { display, flexDirection, justifyContent, gap, submitLabel, handleSubmit, cancelLabel, handleCancel } = props;

    return (
        <Box sx={{ display, flexDirection, justifyContent, gap }}>
            <Btn onClick={handleSubmit}>{submitLabel}</Btn>
            <Btn onClick={handleCancel}>{cancelLabel}</Btn>
        </Box>
    )

};

export default ButtonGroup;