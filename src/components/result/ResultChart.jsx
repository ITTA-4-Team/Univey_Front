import React from 'react'
import { useState } from 'react';
import { PiUploadSimpleLight } from "react-icons/pi";
import BarChartModel from './BarChart/BarChartModel';
import { LuPencil } from "react-icons/lu";
import LineChartModel from './LineChartModel';
import PieChartModel from './PieChartModel';
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { graphState } from "../../recoil/atoms/userState";
import { useEffect } from 'react';
import ChartModel from '../../components/result/ChartModel';

export default function ResultChart({data}) {
    const questionNum = data.question_num
    const [graph,SetGraph] = useState('bar');
    const [graphInfo,setGraphInfo] = useRecoilState(graphState)
    const answer = []

    
    useEffect(()=>{
      data.answer.forEach((item,index)=>{
        data.votes &&
        answer.push({name:item, "응답 수": data.votes[index]})
      })
      if(!graphInfo[questionNum]){
        setGraphInfo((prev) => ({...prev, [questionNum]: ['Line','first',answer],}));
      }
    },[])

    // localStorage.setItem(`question${data.question_num}`,JSON.stringify(answer))

  return (
    <div className='h-auto w-4/5 bg-white rounded-xl mb-16 flex flex-col items-center '>
        <div className='h-12 w-11/12 border-b-1 border-sub_line_color mt-6 mb-4 flex justify-between font-semibold'>
            <p>{`${data.question_num}.${data.question}`}</p>
            <div className='flex items-center px-4'>
            <Link to={`./edit/${data.question_num}`}><LuPencil className='text-2xl mr-4 '/></Link>
            <button><PiUploadSimpleLight className='text-3xl'/></button>
            </div>
        </div>

        <div className='flex'>
            <div className='mt-5'>
               {graphInfo[questionNum] && <ChartModel data={graphInfo[questionNum][2]} questionNumber={questionNum}/>}
            </div>
        </div>
    </div>
  )
}
