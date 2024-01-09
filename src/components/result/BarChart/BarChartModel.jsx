import React from 'react'
import SimpleBar from './SimpleBar'
import SimpleBar2 from './SimpleBar2'

export default function BarChartModel({data}) {
  console.log(data)
  return (
    <div>
      <SimpleBar data={data}/>
    </div>
  )
}
