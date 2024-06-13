import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, legendLabel, backgroundColor, borderColor }) => {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: `${legendLabel}`,
        data: data.map((d) => d.value),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '25rem' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
