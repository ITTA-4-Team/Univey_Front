import React, { useState } from 'react'
import { useEffect } from 'react'
import BarChartModel from './BarChart/BarChartModel'
import SimpleBar from './BarChart/SimpleBar'
import LineChartModel from './LineChartModel'
import { useRecoilState } from "recoil";
import { graphState } from "../../recoil/atoms/userState";
import { useParams } from 'react-router-dom'
import PieChartModel from './PieChartModel'
import AreaChartModel from './AreaChartModel'
import ComposedChartModel from './ComposedChartModel'

export default function ChartModel({data, type, questionNumber}) {
  const {questionNum} = useParams();

  const number = questionNumber ?? questionNum
  const [graphInfo,setGraphInfo] = useRecoilState(graphState)

    console.log(graphInfo[number])
    function Select(){
      if(graphInfo[number]){
        console.log(graphInfo[number][0])
        console.log(data)
      switch(graphInfo[number][0]){
        case 'Line':
          return <LineChartModel data={data}/>
          break;
        case 'Bar':
          return <BarChartModel data={data}/> 
          break;
        case 'Pie':
          return <PieChartModel data={data}/> 
          break;
        case 'Area':
          return <AreaChartModel data={data}/>
          break;
        case 'Composed':
          return <ComposedChartModel data={data}/>
          break;
      }
    }
    }
  return (
    <div>
      {Select()}
    </div>
  )
}
