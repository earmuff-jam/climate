import React from "react";
import Chart from "chart.js/auto"; // removing this import causes issues
import { Bar } from "react-chartjs-2";

const SampleChart = ({ labels, datasets }) => {
  const data = {
    labels: labels,
    datasets: datasets
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default SampleChart;
