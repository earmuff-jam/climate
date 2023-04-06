import React from 'react';
import Image from "next/image";
import { makeStyles } from '@mui/styles';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import default_img_property from '../../public/default_img_property.jpeg';
import Link from 'next/link';
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

const DisplayPropertiesList = ({ properties }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            {properties.map((property, index) => (
                <Grid item xs={12} md={6} key={property.id}>
                    <Link href={`/property/${index}`}>
                        <Card sx={{ display: 'flex' }}>
                            <CardMedia
                                alt={property.name}
                                sx={{ width: { xs: 200, md: 300 }, maxHeight: 200, maxWidth: 200 }}
                            >
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <Image
                                        src={property.image || default_img_property}
                                        style={{
                                            objectFit: "cover",
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </CardMedia>
                            <CardContent sx={{ flex: '1 1 auto' }}>
                                <Typography variant="h5" gutterBottom>
                                    {property.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {property.city}, {property.state} {property.zipcode}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {property.sqFt} sq ft | {property.numberOfBedRooms} bed | {property.numberOfBathrooms} bath
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Built in {property.yearBuilt} | Garage: {property.garage}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default DisplayPropertiesList;


[{ id: 1, name: '123 Main St.', city: 'San Francisco', state: 'CA', zipcode: '12345', sqFt: '1109', numberOfBedRooms: '2', numberOfBathrooms: '2', yearBuilt: '1985', garage: '2', image: '' }]