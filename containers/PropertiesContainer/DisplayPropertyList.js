import React from 'react';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { Grid } from '@mui/material';
import PropertyCard from '../../components/PropertiesComponent/PropertyCard';
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
                    <Link href={`/property/${index}`}>
                        <PropertyCard property={property} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default DisplayPropertyList;