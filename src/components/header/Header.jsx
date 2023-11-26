import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HandleSearch from './HandleSearch';
import Logo from './Logo';
export default function Header() {
  return (
    <nav className=' relative h-1/7  px-36 border-b-1 border-line_color'>
      <div className='text-sm absolute right-80 text-sub_text_color bottom-120 mt-3'>
        <span>로그인</span>
        <span className='m-3'> | </span>
        <span>회원가입</span>
      </div>
      <div className=' flex justify-evenly h-28 items-center pt-4'>
        <div className='flex'>
          <Link to='/main' className='mb-5'>
            <Logo/>
          </Link>
        <ul className=' text-lg flex font-semibold text-text_color justify-around w-72 ml-16 mt-2'>
          <Link to='/main/create' className='click_highlight'>설문생성</Link>
          <Link to='/main/board' className='click_highlight'>설문보기</Link>
          <Link to='/main/trend'className='click_highlight'>트렌드</Link>
        </ul>
        </div>
        <div className='ml-36 flex w-1/3'>
          <HandleSearch/>
          <Link to='/main/my'><button className=' text-4xl text-main_color ml-4'><FaUserCircle/></button></Link>
        </div>
      </div>
    </nav>
  );
}