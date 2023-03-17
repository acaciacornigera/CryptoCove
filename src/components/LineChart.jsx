import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const { Title: AntTitle } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const [chartData, setChartData] = useState(null);
  const change = coinHistory?.data?.change;

  useEffect(() => {
    const coinPrice = [];
    const coinTimestamp = [];

    const history = coinHistory?.data?.history;

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinPrice.push(history[i].price);
      coinTimestamp.push(new Date(history[i].timestamp * 1000).toLocaleDateString());
    }

    const datasets = [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        pointRadius: 2,
        borderWidth: 1,
        pointHoverBackgroundColor: '#ff0000',
      },
    ];

    setChartData({
      labels: coinTimestamp,
      datasets,
    });
  }, [coinHistory]);

  const options = {
    scales: {
      x: {
        reverse: true,  // date sorted from left to right
        ticks: {
          autoSkip: true, 
          maxTicksLimit: '7',
        },
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <>
      <Row className="chart-header">
        <AntTitle level={2} className="chart-title">{coinName} Chart </AntTitle>
        <Col className="price-container">
          <AntTitle level={5} className="price-change">Current Price: ${currentPrice}</AntTitle>
          <AntTitle level={5} className="current-price">
            Period change: <span
              style={{ color: { change } < 0 ? 'red' : 'mediumseagreen' }}>
              {{ change } >= 0 ? '+' : ''}{change}%
            </span>
          </AntTitle>
        </Col>
      </Row>
      {chartData && <Line data={chartData} options={options} />}
    </>
  );
};

export default LineChart
