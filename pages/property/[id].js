import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Share } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import default_img_property from '../../public/default_img_property.jpeg';
import Image from 'next/image';
import PropertyReport from '../../containers/PropertiesContainer/PropertyReport';
import PaymentHistory from '../../containers/PropertiesContainer/PaymentHistory';
import { payments } from './constants';

const PropertyDetails = () => {
    const [property, setProperty] = useState({});
    const router = useRouter();
    const route_id = router.query.id;
    useEffect(() => {
        // call supabase to get property with id
        // load it in the property obj.
        setProperty({ id: route_id, name: '129 Issac Newton Crossing', city: 'Little Elm Dallas', state: 'TX', zipcode: '12345', sqFt: '1109', numberOfBedRooms: '2', numberOfBathrooms: '2', yearBuilt: '1985', garage: '2', image: '' });
    }, []);
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    alt={property.name}
                >
                    <Image
                        src={property.image || default_img_property}
                        width={768}
                        height={200}
                        objectFit="contain" // or objectFit="cover"
                    />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {property.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${property.city}, ${property.state} ${property.zipcode}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${property.sqFt} sq. ft. | ${property.numberOfBedRooms} beds | ${property.numberOfBathrooms} baths`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Built in ${property.yearBuilt} | ${property.garage} car garage`}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        {`${property.city}, ${property.state}`}
                    </Typography>
                    <Button variant="contained" color="primary" startIcon={<Share />}>
                        Share with Friends
                    </Button>
                </Box>
            </Card>
            <PaymentHistory payments={payments} />
            <PropertyReport property={property} />
        </Box>
    );
};

export default PropertyDetails;
