import React from 'react';
import { Cell, Pie, PieChart, } from 'recharts';
import { Container } from "@material-ui/core";

const COLORS = ['#0088FE', '#FF00FF', '#00C49F', '#FFFF00', '#FFBB28', '#FF8042', '#008000', '#00FF00'];

const render = ({
                  cx, cy, midAngle, innerRadius, outerRadius, percent
                }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const RADIAN = Math.PI / 180;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieCharts = ({data}) => {

  return (
    <Container>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={render}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index,) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    </Container>
  );
};
export default PieCharts;