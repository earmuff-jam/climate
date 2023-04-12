import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import PropertyCard from './PropertyCard';
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    cardDisplay: {
        display: 'flex',
    },
    cardContent: { flex: '1 1 auto' },
});

const DisplayPropertyList = ({ properties }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            {properties.map((property, index) => (
                <Grid item xs={12} md={6} key={property.id}>
                        <PropertyCard property={property} index={index}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default DisplayPropertyList;