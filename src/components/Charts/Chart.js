import React from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis, } from 'recharts';

const Chart = ({ data, width, height }) => {

  return (
    <ComposedChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 20, right: 80, bottom: 20, left: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name" label={{position: 'insideBottomRight', offset: 0}}/>
      <YAxis label={{angle: -90, position: 'insideLeft'}}/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey="incomes" barSize={5} fill="#00cc99"/>
      <Bar dataKey="expenses" barSize={5} fill="#cc0000"/>
      <Line type="monotone" dataKey="budget" stroke="#3333cc"/>
    </ComposedChart>
  );
}
export default Chart;