import { Box, Typography } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // do not remove

const PropertyReport = ({ property }) => {
  const data = {
    labels: ['Square Feet', 'Bedrooms', 'Bathrooms', 'Garage'],
    datasets: [
      {
        label: 'Property Features',
        data: [
          parseInt(property.sqFt),
          parseInt(property.numberOfBedRooms),
          parseInt(property.numberOfBathrooms),
          parseInt(property.garage),
        ],
        backgroundColor: [
          '#5A5A5A',
          '#FF5A5A',
          '#FFBA5A',
          '#5AD2FF',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {property.name} Report
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Typography variant="h6">Property Features</Typography>
          <div sx={{ position: 'relative', height: '40vh', width: '80vw' }}>
            <Doughnut data={data} options={options} />
          </div>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Typography variant="h6">Bedrooms vs Bathrooms</Typography>
          <div sx={{ position: 'relative', height: '40vh', width: '80vw' }}>
            <Bar
              data={{
                labels: ['Bedrooms', 'Bathrooms'],
                datasets: [
                  {
                    label: 'Number of Rooms',
                    data: [
                      parseInt(property.numberOfBedRooms),
                      parseInt(property.numberOfBathrooms),
                    ],
                    backgroundColor: [
                      '#FF5A5A',
                      '#FFBA5A',
                    ],
                    borderColor: '#fff',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Typography variant="h6">Square Feet vs Garage</Typography>
          <div sx={{ position: 'relative', height: '40vh', width: '80vw' }}>
            <Bar
              data={{
                labels: ['Square Feet', 'Garage'],
                datasets: [
                  {
                    label: 'Property Size',
                    data: [
                      parseInt(property.sqFt),
                      parseInt(property.garage),
                    ],
                    backgroundColor: [
                      '#5A5A5A',
                      '#5AD2FF',
                    ],
                    borderColor: '#fff',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </Box>
      </Box>
    </Box >
  );
};

export default PropertyReport;
