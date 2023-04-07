import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import { InfoRounded } from '@mui/icons-material';
import Image from "next/image";
import default_img_property from '../../public/default_img_property.jpeg';


const PropertyCard = ({ property }) => {
    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                alt={property.name}
                sx={{ width: { xs: 200, md: 300 }, maxHeight: 200, maxWidth: 200, }}
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
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 500, lineHeight: '28px', mb: '8px' }}>
                        {property.name}
                    </Typography>
                    <IconButton>
                        <InfoRounded />
                    </IconButton>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 400, lineHeight: '24px', mb: '16px' }}>
                    {property.city}, {property.state} {property.zipcode}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 400, lineHeight: '24px', mb: '8px' }}>
                    {property.sqFt} sq ft | {property.numberOfBedRooms} bed | {property.numberOfBathrooms} bath
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 400, lineHeight: '24px' }}>
                    Built in {property.yearBuilt} | Garage: {property.garage}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
