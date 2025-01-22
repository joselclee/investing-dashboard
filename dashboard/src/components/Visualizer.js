import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const Visualizer = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Simulation Results',
        data: data,
        borderColor: 'rgba(40, 40, 134, 0.75)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Simulation Results',
      },
    },
  };

  const calculateVaR = (data) => {
    const absoluteValues = data.map(value => Math.abs(value));
    const sum = absoluteValues.reduce((acc, value) => acc + value, 0);
    return (sum / data.length).toFixed(2);
  };

  return (
    <div className="graph-container">
      <Line data={chartData} options={options} />
      <div className="var-value">
        <strong>VaR:</strong> {calculateVaR(data)}
      </div>
    </div>
  );
};

export default Visualizer;