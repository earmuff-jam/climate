import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Chart from "chart.js/auto"; // do not remove
import { Bar } from "react-chartjs-2";
import { useGenerateReport } from "../../containers/PropertiesContainer/PropertyContainerHooks";
import PropertyHistory from "../../components/PropertiesComponent/PropertyHistory";

const PropertyListReports = (props) => {

  const {
    properties,
    onlySmallScreen,
    smallScreenSx,
    regularAndHigherScreenSx,
  } = props;
  const {
    data,
    totalProfit,
    totalLoss,
    totalExpenses,
    property_financial_history,
  } = useGenerateReport(properties);

  return (
    <Box sx={onlySmallScreen ? smallScreenSx : regularAndHigherScreenSx}>
      <Card>
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
    </Box>
  );
};

export default PropertyListReports;
