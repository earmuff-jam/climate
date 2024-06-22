import 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

const PieBarChart = ({ chartType = 'bar', data, legendLabel, backgroundColor, borderColor, height = '25rem' }) => {
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
    <div style={{ width: '100%', height: height }}>
      {chartType === 'pie' ? (
        <Pie
          data={{
            datasets: [
              {
                data: data.map((v) => v.count),
                backgroundColor: data.map((v) => v.color),
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            cutout: '70%',
            borderColor: data.map((v) => v.color),
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.formattedValue} items` || 0;
                  },
                },
              },
            },
          }}
        />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default PieBarChart;
