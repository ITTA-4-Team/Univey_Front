import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import robot from '../assets/robot.svg'

export default function MainTrendItem({data}) {
  const navigate = useNavigate();
  console.log(data);

  function handleCategory(category){
    switch(category){
      case('economy'):
      return '경제'
      break;
      case('education'):
      return '교육'
      break;
      case('society'):
      return '사회'
      break;
      case('culture'):
      return '문화'
      break;
      default: return(category)
    }
  }
  function handlePart(data){
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

    <button onClick={()=>{handlePart(data)}} className='overflow-hidden border-t-2 border-main_color w-line h-full px-8'>
      <div className='flex'>
        <img src={robot} alt="" />
        <div className='w-full flex flex-col items-start  h-full mt-9 ml-10'>
          <div className='text-3xl font-bold mb-4'>{data.topic}</div>
          <div className='font-semibold mb-6'>{data.description}</div>
          <div className='flex flex-col items-start'>
            <p>{`카테고리 : ${handleCategory(data.category)}`}</p>
            <p>{`문항 수 : 3분 예상`}</p>
            <p>
              대상:{" "}
              {data.age.minAge === 0
                ? "전연령"
                : `${data.age.minAge}대-${data.age.maxAge}대`}
            </p>
            {data.targetRespondents ? (
              <p>
                실제 응답자 수 / 목표 응답자 수: {data.currentRespondents}명 /
                {data.targetRespondents}명
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </button>
    
  )
}
