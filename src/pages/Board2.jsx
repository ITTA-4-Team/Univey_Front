import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import customaxios from '../api/Axios';
import BoardItem from '../components/Board/BoardItem';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";

export default function Board2() {
  const [userInfo,setUserInfo] = useRecoilState(userState)
  const [data,setData]=useState(null);
  const [status,setStatus]=useState(['전체','전체']);
  const [boardData, setboardData] = useState(data);
  const [category, setCategory] = useState('all');
  const [postType, setPostType] = useState('all')
  const [orderType, setOrderType] = useState('createdAt')


  useEffect(()=>{
    customaxios.get(`surveys/list?category=${category}&postType=${postType}&orderTpye=${orderType}`,
    {
      headers: {
           Authorization: `${userInfo.accesstoken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json'
      }
    }
    )
    .then((res)=>res.data.data.content)
    .then((res)=>setData(res))
    .then((res)=>console.log(res))

    console.log(category)
    console.log(postType)
    console.log(orderType)


    console.log()
  },[category,postType,orderType])
  
  data ? console.log(data) : console.log('no')

  function handleCategory(item){
    if(item==='전체'){
      setCategory('all')
    }else{
      setCategory(item)
    }
}

  return (
    <div>
      <nav>
        <div>
        <ul className='flex space-x-12 ml-left my-7'>
          {['전체','IT', '교육', '경제', '사회', '문화'].map((item, index) => (
            <li
              key={index}
              onClick={() => handleCategory(item)}
              className={`click_highlight ${category===item ? 'text-highligth' :''}`}
            >
              {item}
            </li>
          ))}
        </ul>
        </div>
        <div className='flex justify-between'>
        {/* onclick={()=>} */}
          <ul className='flex space-x-5 ml-left my-7'>
          <button onClick={()=>{setPostType('all')}} 
          className={postType === 'all' ? 'select-list-item' : 'common-list-item'}>전체</button>
          <button onClick={()=>{setPostType('activeSurvey')}} className={postType === 'activeSurvey' ? 'select-list-item' : 'common-list-item'}>진행중</button>
          <button onClick={()=>{setPostType('completedSurvey')}} className={postType === 'completedSurvey' ? 'select-list-item' : 'common-list-item'}>완료</button>
          <button onClick={()=>{setPostType('participated')}} className={postType === 'participated' ? 'select-list-item' : 'common-list-item'}>참여</button>

          </ul>
          <select onChange={(e)=>setOrderType(e.target.value)} className='h-10 mr-72 mt-5'>
            <option value="">최신순</option>
            <option value="">포인트순</option>
          </select>
        </div>
       
      </nav>    
     
      <main>
      <div className='w-screen flex flex-col items-center'>
        <hr className='  w-line border-1 border-main_color'/>
        { data && data.map((item) => <BoardItem key={item.id} data={item} />)}
        <hr className='  w-line border-2 border-main_color'/>
      </div>

      </main>
    </div> 
  );
}

