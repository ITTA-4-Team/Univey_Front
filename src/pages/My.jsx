import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyHomeIcon from '../components/icons/MyHomeIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import GoRecord from '../components/my/GoRecord';
import GoPoint from '../components/my/GoPoint';
import { GoPencil } from "react-icons/go";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";
import customaxios from '../api/Axios';

export default function My() {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userInfo,setUserInfo] = useRecoilState(userState)

  useEffect(() => {
    customaxios.get('/mypage',
    { headers: { 
      'ngrok-skip-browser-warning': '69420',
      Authorization: `${userInfo.accesstoken}`,
      'Content-Type': 'application/json'
    } }
    )
    .then((res)=>{
      setUserName(res.data.data.userName)
      setEmail(res.data.data.email)
    })
    // axios.get(
    //   '/data/my.json',
    //   // /mypage
    //     { headers: { Authorization: `Bearer ${accessToken}` } }
    //   )
    //   .then((response) => {
    //     const data = response.data.data;
    //     setUserName(data.userName);
    //     setEmail(data.email);
    //   })
    //   .catch((error) => {
    //     console.error('데이터를 불러오는 동안 에러 발생:', error);
    //   });
  }, []);


  

  return (
    <div className='lg:mx-56 lg:mt-7 mb-40'>
      <div className="flex items-center ">
        <MyHomeIcon className="mr-4 text-main_color" />
        <Link to="/main/my">
          <h1 className="text-main_color text-2xl px-3">마이페이지 > </h1>
        </Link>
      </div>
      <div className='flex mt-10 ml-6 text-main_color'>
        <div className='flex items-center'>
          <ProfileIcon/>
          <div className='pl-3'>
            <div className='flex items-center'>
              <p className="text-xl font-semibold px-2">{userName}</p>
              <Link to="/main/my/info">
                <div className='pt-1 text-xl font-thin'>
                  <GoPencil/>
                </div>
              </Link>
            </div>
            <p className="text-l px-2">{email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center lg:mt-7">
          <div className='flex mt-10 w-full justify-center space-x-20'>
            <Link to='/main/my/surveys'><GoRecord/></Link>
            <Link to='/main/my/point'><GoPoint/></Link>
          </div>
      </div>
      
      
    </div>
  );
}

