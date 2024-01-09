import React from 'react'
import { PiUploadSimpleLight } from "react-icons/pi";

export default function ResultAnswer({data}) {
  return (
    <div className='h-96 w-4/5 bg-white rounded-xl mb-16 flex flex-col items-center '>
        <div className='h-12 w-11/12 border-b-1 border-sub_line_color mt-6 mb-4 flex justify-between font-semibold'>
            <p>{`${data.question_num}.${data.question}`}</p>
            <div className='flex items-center px-4'>
            <button><PiUploadSimpleLight className='text-3xl'/></button>
            </div>
        </div>

        <div className='flex flex-col w-full ml-28 text-lg'>
            {data.answer.map((item,index)=>{
                return <div className='mb-3'>{`${index+1}. ${item}`}</div>
            })}
        </div>
    </div>
  )
}
