// dashboard/src/components/Graph.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import './Graph.css'; // Import the CSS file

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const Graph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'S&P 500 Performance',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  });

  const options = {
    maintainAspectRatio: false, // Make the chart responsive
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    let lastValue = 1000; // Starting value
    const interval = setInterval(() => {
      setData((prevData) => {
        if (prevData.labels.length >= 365) {
          clearInterval(interval);
          return prevData;
        }

        const newLabels = [...prevData.labels];
        if (prevData.labels.length % 7 === 0) {
          newLabels.push(new Date(Date.now() + prevData.labels.length * 24 * 60 * 60 * 1000).toLocaleDateString());
        } else {
          newLabels.push('');
        }

        let newValue = lastValue * (1 + (Math.random() - 0.5) / 100); // Simulate daily percentage change
        lastValue = newValue;

        const newData = [...prevData.datasets[0].data, newValue];

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, 10); // Reduced interval time to 10ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="graph-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;