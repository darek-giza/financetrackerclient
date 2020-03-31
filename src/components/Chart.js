import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Container } from '@material-ui/core';

const Chart = ({ data }) => {
  return (
    <Container className="chart-container">
      <LineChart width={1200} height={600} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="incomes"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
        <Line type="monotone" dataKey="budget" stroke="#f50057" />
      </LineChart>
    </Container>
  );
};
export default Chart;
