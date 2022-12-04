import { Button } from '@mui/material';
import React from 'react';

interface Iprops {
    variant?: string;
    onClick: Function;
    children: any;
}

const Btn: React.FC<Iprops> = (props: any) => {
    const { variant = 'text', onClick, children } = props;
    return (
        <Button variant={variant} onClick={onClick}>{children}</Button>
    )
};

export default Btn;