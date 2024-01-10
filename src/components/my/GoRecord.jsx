import React from 'react'
import go_record from '../icons/go_record.svg'

export default function GoRecord() {
  return (
    <div className='ml-56'>
    <div className='bg-question_card_bg
          rounded-3xl flex shadow-lg'>
      <div className='flex items-center ml-9 mr-28 mt-5 relative'>
        <div>
          <h1 className='text-xl font-semibold mb-1 '>
            <span className='text-main_color'>설문 기록&nbsp;</span>
          </h1>
          <p className='w-72 mb-5 text-sm'>생성한 설문, 구매한 설문을 확인해보세요!</p>
        </div>
        <div>        
          <img src={go_record} className='h-28 ml-16'/>
        </div>
      </div>
    </div>
    </div>
  )
}