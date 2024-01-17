import React from 'react'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, Bar, Area  } from 'recharts';

export default function ComposedChartModel({data}) {
  return (
    <div>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band"  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="응답 수" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="응답 수" stroke="#ff7300" />
        </ComposedChart>
    </div>
  )
}
