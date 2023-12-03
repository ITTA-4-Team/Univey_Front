import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { KAKAO_AUTH_URL } from '../api/OAuth';

export default function Login() {



  return (
    <div className='flex flex-col items-center h-3/5'>
      <p className='mt-24 mb-5 text-3xl'>로그인</p>
        <hr className='border-1 border-main_color w-1/5'/>
      <a className='mt-20' href={KAKAO_AUTH_URL}>
      <img src="https://url.kr/i7uwbq" alt="" />
      </a>
      <a className='mt-20' href={KAKAO_AUTH_URL}>
      <img src="https://url.kr/rtbgyv" alt="" />
      </a>
    </div>
  )
}
