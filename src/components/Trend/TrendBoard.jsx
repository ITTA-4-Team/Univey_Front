import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import trend from '../assets/trend.svg'

export default function TrendBoard({data}) {
  const navigate = useNavigate();
  console.log(data)

  function handlePart(){
    switch(data.status){
      case 'activeSurvey':
        if(data.participated){
          alert(`${data.dead_line[0]}년 ${data.dead_line[1]}월 ${data.dead_line[2]}일에 마감 예정인 설문입니다.`)
        }
        else{
          navigate(`/main/participate/${data.id}`)
        }
        break;
      case 'completedSurvey':
        navigate(`/main/result/${data.id}`)
        break;
      case 'participated':
        navigate(`/main/result/${data.id}`)
        break;
      default: return
  }
  }


  return (
    <div className='w-1/3 border-1 border-main_color mx-5 rounded-2xl flex flex-col items-center'>
      <div className='h-1/2 pt-8'>
        <img src={trend} alt="" />
      </div>
      <hr className='border-1 border-line_color w-11/12 align-middle   '/>
      <main className='flex flex-col w-full h-1/2 pt-8 px-12'>
          <p className='text-main_color text-3xl font-bold mt-5 mb-4'>{data.topic}</p>
          <p className='font-semibold mb-5'>{data.description}</p>
            <p className='mb-1'>대상: {data.age.minAge === 0
                ? "전연령"
                : `${data.age.minAge}대-${data.age.maxAge}대`}</p>
            {data.targetRespondents !== 0 ? (
              <p>
                현재 응답자 수 / 목표 응답자 수: {data.currentRespondents}명 /
                {data.targetRespondents}명
              </p>
            ) : (
              <p>
                현재 응답자 수 : {data.currentRespondents}명
              </p>
            )}
          <p className='flex mb-2'>
            { data.hash && data.hash.map((item)=> <span className='mx-1'>#{item}</span>)}
          </p>
        </main>
        <div className='mb-6 font-semibold text-main_color w-full'>
          <button onClick={()=>handlePart()} className='float-right mr-10'>트렌드 참여하기 &nbsp; &gt; </button> 
        </div>
    </div>
  );
}