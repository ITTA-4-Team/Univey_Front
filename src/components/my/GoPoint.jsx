import React from 'react'
import go_point from '../icons/go_point.svg'

export default function GoPoint() {
  return (
    <div className='mr-56'>
    <div className='bg-question_card_bg 
            rounded-3xl flex shadow-lg'>
      <div className='flex items-center ml-9 mr-28 mt-5 relative'>
        <div>
          <h1 className='text-xl mb-1 font-semibold'>
            <span className='text-main_color'>포인트&nbsp;</span>
          </h1>
          <p className='w-72 mb-5 text-sm'>포인트 사용 내역 확인부터 포인트 결제까지 !</p>
        </div>
        <div>        
          <img src={go_point} className='h-28 ml-16'/>
        </div>
      </div>
    </div>
    </div>
  )
}