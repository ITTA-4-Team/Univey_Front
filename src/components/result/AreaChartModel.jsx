import React from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

export default function AreaChartModel({data}) {
  return (
    <div>
      <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="응답 수" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </div>
  )
}
