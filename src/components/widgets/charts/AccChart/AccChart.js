import { memo } from 'react';
import { Box } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: { display: false },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: true,
          fontFamily: 'SFProText-Regular',
          fontSize: 12,
          fontColor: '#77838f',
          padding: 30,
          min: 0,
          max: 1,
          stepSize: 0.25,
        },
        gridLines: {
          display: true,
          drawBorder: false,
          color: '#f2f2f2',
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 15,
      backgroundColor: '#01a1c3',
      borderWidth: 10,
      borderColor: '#fff',
      hitRadius: 15,
      hoverRadius: 15,
      hoverBorderWidth: 10,
    },
    line: {
      tension: 0,
      borderWidth: 5,
      borderColor: '#01a1c3',
      fill: false,
    },
  },
  legend: {
    display: false,
  },
  layout: {
    padding: {
      right: 20,
      top: 20,
      bottom: 20,
    },
  },
};

const data = {
  labels: Array.from({ length: 6 }).map(() => ''),
  datasets: [
    {
      label: 'Alert Trend',
      data: Array.from({ length: 6 }).map(() => Math.random()),
      fill: false,
    },
  ],
};

const AccChart = ({ ...boxProps }) => {
  return (
    <Box height={250} {...boxProps}>
      <Line options={options} data={data} />
    </Box>
  );
};

export default memo(AccChart);
