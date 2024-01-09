
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";
import customaxios from '../api/Axios'
import axios from 'axios';

export default function LoginHandle() {
    const [userInfo,setUserInfo] = useRecoilState(userState)
    const location = useLocation();
    const navigate = useNavigate();


        useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        customaxios.get(`/users/kakao/callback?code=${code}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
                'Accept': 'application/json'
            }
        })
        .then((res)=>{
            const userName = res.data.data.userName
            const point = res.data.data.point
            const accessToken = res.headers['authorization']
            const info = {name:userName, point:point, accesstoken:accessToken}
            setUserInfo(info)
            localStorage.setItem('userInfo', info);
            console.log(res.status)
            if(res.status === 200){
              console.log('성공')
              navigate('/')
            }
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
