import React from 'react';
import { Grid } from '@mui/material';
import CategoryList from '../components/CategoryList/CategoryList';

const Categories = () => {

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            padding={'6rem'}
            style={{ minHeight: '100vh' }}
        >
            <CategoryList />
        </Grid>
    )

};

export default Categories;