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
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver'

export default function ResultChart({data}) {
    const chartRef = useRef();
    const questionNum = data.question_num
    const [graphInfo,setGraphInfo] = useRecoilState(graphState)
    const answer = []

    console.log(data.answer[0])
    // console.log(graphInfo[questionNum][2][0].name)
    
    useEffect(()=>{
      data.answer.forEach((item,index)=>{
        console.log({name:item, "응답 수": data.votes[index]})
        data.votes &&
        answer.push({name:item, "응답 수": data.votes[index]})
      })
      if(!graphInfo[questionNum] || data.answer[0]!==graphInfo[questionNum][2][0].name){
        setGraphInfo((prev) => ({...prev, [questionNum]: ['Bar','first',answer],}))
      }
    },[])

    // localStorage.setItem(`question${data.question_num}`,JSON.stringify(answer))

    async function handleSharing(){
      try {
        const div = chartRef.current;
        const canvas = await html2canvas(div, { scale: 2 });
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, "Result.png");
          }
        });
      } catch (error) {
        console.error("Error converting div to image:", error);
      }
    }
  return (
    <div className='h-auto w-4/5 bg-white rounded-xl mb-16 flex flex-col items-center ' ref={chartRef}>
        <div className='h-12 w-11/12 border-b-1 border-sub_line_color mt-6 mb-4 flex justify-between font-semibold'>
            <p>{`${data.question_num}.${data.question}`}</p>
            <div className='flex items-center px-4'>
            <Link to={`./edit/${data.question_num}`}><LuPencil className='text-2xl mr-4 '/></Link>
            <button onClick={handleSharing}><PiUploadSimpleLight className='text-3xl'/></button>
            </div>
        </div>

        <div className='flex'>
            <div className='mt-5' >
               {graphInfo[questionNum] && <ChartModel data={graphInfo[questionNum][2]} questionNumber={questionNum}/>}
            </div>
        </div>
    </div>
  )
}
