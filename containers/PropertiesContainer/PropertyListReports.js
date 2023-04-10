import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Chart from "chart.js/auto";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Profit",
      data: [1500, 2000, 2500, 3000, 3500, 4000],
      borderColor: "#8884d8",
      fill: false,
    },
    {
      label: "Loss",
      data: [-500, -1000, -1500, -2000, -2500, -3000],
      borderColor: "#82ca9d",
      fill: false,
    },
    {
      label: "Expenses",
      data: [1000, 1500, 2000, 2500, 3000, 3500],
      borderColor: "#ffc658",
      fill: false,
    },
  ],
};

const PropertyListReports = ({ properties }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const width = isSmallScreen ? 300 : 600;
  const height = isSmallScreen ? 300 : 400;

  const totalProfit = properties.reduce(
    (total, property) => total + property.profit,
    0
  );
  const totalLoss = properties.reduce(
    (total, property) => total + property.loss,
    0
  );
  const totalExpenses = properties.reduce(
    (total, property) => total + property.expenses,
    0
  );

  React.useEffect(() => {
    const ctx = document.getElementById("property-owner-chart");

    new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, []);

  return (
    <Card sx={{ width, height }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="h2" gutterBottom>
            Total Properties Overview
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Total Profit: ${totalProfit}
          </Typography>
        </Box>
        <canvas
          id="property-owner-chart"
          width={width - 32}
          height={height - 96}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom>
            Total Loss: ${totalLoss}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Total Expenses: ${totalExpenses}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Property Analytics
          </Typography>
          {properties.map((property) => (
            <Box key={property.id} mt={1}>
              <Typography variant="subtitle1">
                Property {property.id}: Occupancy Rate: {property.occupancyRate}
                %, Revenue: ${property.revenue}, Expenses: ${property.expenses},
                Net Profit: ${property.profit}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyListReports;
