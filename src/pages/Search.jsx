import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import customaxios from '../api/Axios';
import BoardItem from '../components/Board/BoardItem';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";

export default function Search() {  
    const [data,setData]=useState(null);
    const {value} = useParams();
    const [userInfo,setUserInfo] = useRecoilState(userState)
    const pagenum =1;
    console.log(`/survyes/search/${pagenum}?keyword=${value}`)
    useEffect(()=>{
      dataset()
    },[])

    async function dataset(){
      await customaxios(`/surveys/search/1?keyword=${value}`,
        { headers: { 
          'ngrok-skip-browser-warning': '69420',
          Authorization: `${userInfo.accesstoken}`,
          'Content-Type': 'application/json'
        } }
      )
      .then((res)=>setData(res.data.data.content))
      .catch((err)=>{
        console.log(err)
      })
    }
    console.log(value)
    
   data && console.log(data[0].topic.includes(value))


  return (
    <div className='item-center '>
      <main className='w-screen flex flex-col items-center mt-3'>
          {(data) && data.map((item)=> (item.topic.includes(value) || item.description.includes(value)) && <BoardItem key={item.id} data={item}/>)}
      </main>
    </div>
  )
}
