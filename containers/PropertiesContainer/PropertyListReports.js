import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Chart from "chart.js/auto"; // do not remove
import { Line } from "react-chartjs-2";
import { useGenerateReport } from "./PropertyContainerHooks";

const PropertyListReports = ({ properties }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const width = isSmallScreen ? 300 : 600;
  const height = isSmallScreen ? 300 : 400;
  const { data, totalProfit, totalLoss, totalExpenses } =
    useGenerateReport(properties);
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
        {data?.datasets?.length && <Line data={data} />}
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
