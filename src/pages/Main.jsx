import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/main/Carousel';
import {FiCheckSquare} from 'react-icons/fi'
import GoCreate from '../components/main/GoCreate';
import GoParticipate from '../components/main/GoParticipate';
import axios from 'axios';
import MainTrendItem from '../components/main/MainTrendItem';
import { useQuery } from '@tanstack/react-query';

export default function Main() {
  const [data,setData]=useState(null); 
  const [tren,setTrend]=useState(); 


  useEffect(()=>{
    dataset()
  },[])

  
  async function dataset(){
    await fetch('/data/Board.json')
    .then((res)=>res.json())
    .then((res)=>setData(res.surveyData))
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div >
      <Carousel/>
      <article className=''>
        <div className='flex text-xl font-bold ml-left my-4'>
          <FiCheckSquare className='text-3xl text-main_color mt-1 '/>
          <div className='flex mt-1'> 
            <p className='text-sub_text_color '>&nbsp;&nbsp;설문조사를&nbsp;&nbsp;</p>
            <p className='text-main_color'>생성</p>
            <p className='text-sub_text_color '>하고&nbsp;&nbsp;</p>
            <p className='text-main_color'>참여 </p>
            <p className='text-sub_text_color '>해보세요!</p>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex w-screen ml-leftsm '>
            <Link to='/main/create'><GoCreate/></Link>
            <Link to='/main/Board'><GoParticipate/></Link>
          </div>
        </div>
      </article>

      <article>
        <div className='flex text-xl font-bold ml-left my-4'>
          <FiCheckSquare className='text-3xl text-main_color mt-1'/>
          <div className='flex mt-1'> 
            <p className='text-sub_text_color '>&nbsp;&nbsp;이 달의</p>
            <p className='text-main_color'>설문조사 트렌드</p>
            <p className='text-sub_text_color '>를 확인해보세요!</p>
          </div>
        </div>
      </article>
      
      <article className='h-1/3 mb-4 flex flex-col items-center '>
        
      <div className=' w-screen flex flex-col items-center h-full'>
          {data &&
          data.filter(item => item.trend === true).map((item)=>{
            return(
            <div className='w-screen flex flex-col items-center'>
            <MainTrendItem data={item}/>
          </div>
          )
          })
          }
          {!data && '없어'}
        </div>
        <hr className='  w-line border-1 border-main_color'/>
      </article>
    </div>
  )
}