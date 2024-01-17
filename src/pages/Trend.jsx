import React, { useEffect, useState } from 'react'
import TrendCarousel from '../components/Trend/TrendCarousel'
import { LiaFireAltSolid } from "react-icons/lia";
import TrendBoard from '../components/Trend/TrendBoard';
import {useQuery} from '@tanstack/react-query'
import axios from 'axios';
import customaxios from '../api/Axios';
export default function Trend() {
  const [trend, SetTrend] = useState();
  // const {data, isLoading } = useQuery({ queryKey: ['Trend'], queryFn: dataset })
  useEffect(()=>{
    dataset();
  },[])

  async function dataset(){
    await customaxios('/trends')
    .then(res=>res.data.data)
    .then((res)=>SetTrend(res))
  }

  return (
    <div>
      <article className='mb-12 mt-24' >
      <TrendCarousel/>
      </article>

      <main>
        <div className='flex text-2xl font-semibold ml-leftxl mb-8'>
        <span>이 달의 트렌드</span>
        <span className='text-4xl'><LiaFireAltSolid /></span>
        </div>
        <ul className='flex space-x-12 ml-leftxl mb-24'>
          {['전체','IT', '교육', '경제', '사회', '문화'].map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>

        <article className='flex w-screen justify-center'>
          <div className='flex w-3/4 h-trend_board mb-10 justify-center'>
          
          {/* { isLoading? <p> 로딩 중입니다</p>: */}
            {trend &&
            trend.map((item)=>{
              return(
              <TrendBoard key={item.id} data={item}/>
            ) }) }
          </div>
        </article>
      </main>
    </div>
  )
}