import React from "react";
import { Box, Card, CardContent, styled } from "@mui/material";
import Chart from "chart.js/auto"; // do not remove
import { Bar } from "react-chartjs-2";

import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  AttachMoneyRounded,
} from "@mui/icons-material";

import PropertyHistory from "../../components/PropertiesComponent/PropertyHistory";
import { useGenerateReport } from "../../containers/PropertiesContainer/PropertyContainerHooks";

const IconWithTextStyled = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyItems: "center",
  fontSize: "0.7rem",
});

const HeadingStyled = styled("div")({
  fontSize: "1rem",
  fontWeight: 400,
});

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
    },
  };
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #e0e0e0",
            pr: "1rem",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <HeadingStyled>Total Properties Overview</HeadingStyled>
            <IconWithTextStyled>
              <AttachMoneyRounded color="primary" />
              Profit: ${parseInt(totalProfit).toFixed(2) || 0.0}
            </IconWithTextStyled>
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
            <IconWithTextStyled>
              <ArrowDownwardRounded color="error" />
              Loss: ${parseInt(totalLoss).toFixed(2) || 0.0}
            </IconWithTextStyled>
            <IconWithTextStyled>
              <ArrowUpwardRounded color="info" />
              Expenses: ${parseInt(totalExpenses).toFixed(2) || 0.0}
            </IconWithTextStyled>
          </Box>
        </Box>

        <Box>
          <HeadingStyled>Property Analytics</HeadingStyled>
          <PropertyHistory pfhData={property_financial_history} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyListReports;
