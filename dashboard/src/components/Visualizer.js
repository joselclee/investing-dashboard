// dashboard/src/components/Visualizer.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const Visualizer = ({ data }) => {
  const mean = data.reduce((acc, value) => acc + value, 0) / data.length;
  const variance = data.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);

  const generateNormalDistribution = (mean, stdDev, numPoints = 100) => {
    const points = [];
    const step = (6 * stdDev) / numPoints;
    for (let i = -3 * stdDev; i <= 3 * stdDev; i += step) {
      const x = mean + i;
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
      points.push({ x, y });
    }
    return points;
  };

  const normalDistributionData = generateNormalDistribution(mean, stdDev);

  const chartData = {
    labels: normalDistributionData.map(point => point.x.toFixed(2)),
    datasets: [
      {
        label: 'Distribution',
        data: normalDistributionData.map(point => point.y),
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
        title: {
          display: true,
          text: 'Probability Density',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Value at Risk (VaR) - Normal Distribution',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Probability Density: ${context.raw.toFixed(4)}`;
          },
        },
      },
    },
  };

  const calculateVaR = (mean, stdDev, confidenceLevel = 0.95) => {
    const zScore = -1.645; // Z-score for 95% confidence level (one-tailed)
    return (mean + zScore * stdDev).toFixed(2);
  };

  const varValue = calculateVaR(mean, stdDev);

  return (
    <div className="graph-container">
      <Line data={chartData} options={options} />
      <div className="var-value">
        <strong>Most probable value at risk:</strong> ${Math.abs(varValue)}
      </div>
    </div>
  );
};

export default Visualizer;