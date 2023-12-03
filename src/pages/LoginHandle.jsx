import axios from 'axios';
import React, { useEffect } from 'react'
import { Navigate, useLocation, useParams } from 'react-router';

export default function LoginHandle() {
    const location = useLocation();

        useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        axios.post('https://1ede-222-108-73-38.ngrok-free.app/user/kakao/callback', {
            code: code
        }, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            console.log(response);
        })
        .then((res)=>{
            localStorage.setItem("name",res.data.account.kakaoName);
            Navigate('/main')
        })
        .catch((error) => {
            console.error(error);
        });
      }, []);

  return (
    <div className='flex flex-col items-center h-3/5 justify-center'>
      <p className='text-4xl'>로그인 중입니다</p> 
    </div>
  )
}
