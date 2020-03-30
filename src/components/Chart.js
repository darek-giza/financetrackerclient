import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

const data = [
  {
    name: 'January',
    incomes: 5000,
    expenses: 3000,
    budget: 2000,
  },
  {
    name: 'February',
    incomes: 4000,
    expenses: 5000,
    budget: 1000,
  },
  {
    name: 'March',
    incomes: 2000,
    expenses: 2500,
    budget: 500,
  },
  {
    name: 'April',
    incomes: 3000,
    expenses: 2000,
    budget: 1000,
  },
  {
    name: 'May',
    incomes: 3000,
    expenses: 3000,
    budget: 1000,
  },
  {
    name: 'June',
    incomes: 5000,
    expenses: 5000,
    budget: 1000,
  },
  {
    name: 'July',
    incomes: 4000,
    expenses: 3000,
    budget: 2000,
  },
  {
    name: 'August',
    incomes: 4500,
    expenses: 5500,
    budget: 1000,
  },
  {
    name: 'September',
    incomes: 3500,
    expenses: 3500,
    budget: 1000,
  },
  {
    name: 'October',
    incomes: 4000,
    expenses: 4000,
    budget: 1000,
  },
  {
    name: 'November',
    incomes: 5000,
    expenses: 4000,
    budget: 2000,
  },
  {
    name: 'December',
    incomes: 4000,
    expenses: 5500,
    budget: 500,
  },
];

const Chart = () => {
  return (
    <LineChart width={1000} height={600} data={data}>
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
  );
};
export default Chart;
