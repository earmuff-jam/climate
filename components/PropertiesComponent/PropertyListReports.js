import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Chart from "chart.js/auto"; // do not remove
import { Bar } from "react-chartjs-2";
import { useGenerateReport } from "../../containers/PropertiesContainer/PropertyContainerHooks";
import PropertyHistory from "../../components/PropertiesComponent/PropertyHistory";

const PropertyListReports = ({ properties }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const width = isSmallScreen ? '20rem' : '44rem';
  const height = isSmallScreen ? '10rem' : '30rem';
  const {
    data,
    totalProfit,
    totalLoss,
    totalExpenses,
    property_financial_history,
  } = useGenerateReport(properties);

  return (
    <Card sx={{ width, height, overflow: "auto" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="h2" gutterBottom>
            Total Properties Overview
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Total Profit: ${parseInt(totalProfit).toFixed(2) || 0.0}
          </Typography>
        </Box>
        {data?.datasets?.length && <Bar data={data} />}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom>
            Total Loss: ${parseInt(totalLoss).toFixed(2) || 0.0}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Total Expenses: ${parseInt(totalExpenses).toFixed(2) || 0.0}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Property Analytics
          </Typography>
          <PropertyHistory pfhData={property_financial_history} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyListReports;
