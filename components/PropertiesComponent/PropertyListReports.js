import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Paper } from "@mui/material";
import Chart from "chart.js/auto"; // do not remove
import { Bar } from "react-chartjs-2";
import { useGenerateReport } from "../../containers/PropertiesContainer/PropertyContainerHooks";
import PropertyHistory from "../../components/PropertiesComponent/PropertyHistory";

const PropertyListReports = (props) => {
  const { properties, regularAndHigherScreenSx } = props;
  const {
    data,
    totalProfit,
    totalLoss,
    totalExpenses,
    property_financial_history,
  } = useGenerateReport(properties);

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        display: false,
      },
      noDataMessage: {
        display: false,
      },
      title: {
        display: false,
        text: "I am a title",
      },
    },
  };
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          width: "calc(100% - 2rem)",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Total Properties Overview
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total Profit: ${parseInt(totalProfit).toFixed(2) || 0.0}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {" "}
            {data?.datasets?.length && <Bar options={options} data={data} />}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" gutterBottom>
              Total Loss: ${parseInt(totalLoss).toFixed(2) || 0.0}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total Expenses: ${parseInt(totalExpenses).toFixed(2) || 0.0}
            </Typography>
          </Box>
        </Box>

        <Box>
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
