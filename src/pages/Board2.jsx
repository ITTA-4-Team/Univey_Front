import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import customaxios from '../api/Axios';
import BoardItem from '../components/Board/BoardItem';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";
import { useInView } from 'react-intersection-observer';
import useDidMountEffect from '../hook/useDidMountEffect';


export default function Board2() {
  const [page, setPage] =useState(1);
  const [ref, inView] = useInView();
  const [userInfo,setUserInfo] = useRecoilState(userState)
  const [data,setData]=useState(null);
  
  const [category2, setCategory2] = useState('전체');
  const [category, setCategory] = useState('all');
  const [postType, setPostType] = useState('all')
  const [orderType, setOrderType] = useState('createdAt')


  useEffect(()=>{
    console.log('nomal')
    customaxios.get(`surveys/list/1?category=${category}&postType=${postType}&orderType=${orderType}`,
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
    .then((res)=>{
      setData(res)
    })
    setPage(1)
  },[category,postType,orderType])

  useDidMountEffect(()=>{
    console.log('inView')
    console.log(page)
    const pages = page + 1;
    if (inView) {
      customaxios.get(`surveys/list/${pages}?category=${category}&postType=${postType}&orderType=${orderType}`,
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
      .then((res)=>{
        console.log('res값')
        console.log(res)
        data===null 
        ?setData(res)
        :setData(prev=> [...prev, ...res],)
      })
         setPage(pages)
         
      }
  },[inView])



  data ? console.log(data) : console.log('no')

  function handleCategory(item){
    switch(item){
      case '전체':
        setCategory('all')
        setCategory2('전체')
        break;
      case 'IT':
        setCategory('IT')
        setCategory2('IT')
        break;
      case '교육':
        setCategory('education')
        setCategory2('교육')
        break;
      case '경제':
        setCategory('economy')
        setCategory2('경제')
        break;
      case '사회':
        setCategory('society')
        setCategory2('사회')
        break;
      case '문화':
        setCategory('culture')
        setCategory2('문화')
    }
}

console.log(data)

  return (
    <div>
      <nav>
        <div>
        <ul className='flex space-x-12 ml-left my-7'>
          {['전체','IT', '교육', '경제', '사회', '문화'].map((item, index) => (
            <li
              key={index}

              onClick={() => handleCategory(item)}

              className={`click_highlight ${category2===item ? 'text-highligth' :''}`}
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
            <option value="createdAt">최신순</option>
            <option value="point">포인트순</option>
          </select>
        </div>
       
      </nav>    
     
      <main>
      <div className='w-screen flex flex-col items-center'>
        <hr className='  w-line border-1 border-main_color'/>
        { data && data.map((item, index) =><BoardItem key={item.id} data={item} index={index}/>)}
        <hr className='  w-line border-2 border-main_color'/>
      </div>

      <div ref={ref}></div>
      </main>
    </div> 
  );
}