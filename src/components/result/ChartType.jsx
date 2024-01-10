import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { graphState } from "../../recoil/atoms/userState";

export default function ChartType({type, img}) {
  const [graphInfo,setGraphInfo] = useRecoilState(graphState)
  const {questionNum} =useParams();
  useEffect(()=>{
  },[])

  function handleClick(){
    console.log(questionNum)
    const origin = graphInfo[questionNum]
    const updatedState = [type, ...origin.slice(1)];
    console.log(updatedState)
    setGraphInfo((prev) => ({...prev, [questionNum]: updatedState,}));
  }

  return (
    <div className='w-36 h-36 border-2 rounded-xl ml-8 flex flex-col justify-center items-center relative text-main_color hover:cursor-pointer hover:bg-black hover:bg-opacity-10' onClick={()=>handleClick()}>
        <img src={img} alt="" className='mb-8 w-20'/>
        <span className='absolute h-10 bottom-0 w-full flex justify-center bg-sub_3 text-lg items-center '>{type} chart
        </span>
    </div>
  )
}
