import React, { useEffect, useState } from 'react';
import BoardItem from '../components/Board/BoardItem';

export default function Board() {
  const [data,setData]=useState(null);
  const [status,setStatus]=useState('전체');
  const [complete, setComplete] = useState(null);
  const [uncomplete, setUnComplete] = useState(null);
  useEffect(()=>{
    dataset()
  },[])

  
  async function dataset(){
    await fetch('/data/Board.json')
    .then((res)=>res.json())
    .then((res)=>setData(res.surveyData))
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleStatus(state){
    setStatus(state)
  }

  useEffect(()=>{
    if(data){
      const uncom = data.filter((item)=>
        // console.log(item.status)
        item.status=='uncomplete'
      )
      const com = data.filter((item)=>
      item.status=='complete'
    )
    setComplete(com);
    setUnComplete(uncom);

    console.log('실행')
  }
  
  
},[data])


  return (
    <div>
      <nav>
        <ul className='flex space-x-12 ml-left my-7'>
          <li>IT</li>
          <li>교육</li>
          <li>경제</li>
          <li>사회</li>
          <li>문화</li>
        </ul>
      </nav>
      <nav>
      {/* onclick={()=>} */}
        <ul className='flex space-x-5 ml-left my-7'>
        <button onClick={()=>handleStatus('전체')} className={`${status === "전체" ? 'select-list-item' : 'common-list-item'}`}>전체</button>
        <button onClick={()=>handleStatus('진행중')}className={`${status === '진행중' ? 'select-list-item' : 'common-list-item'}`}>진행중</button>
        <button onClick={()=>handleStatus('완료')}className={`${status === "완료" ? 'select-list-item' : 'common-list-item'}`}>완료</button>
        </ul>
      </nav>

      <main>
      <div className='w-screen flex flex-col items-center'>
        {(data) &&
          ((status === '전체') ?
            data.map((item) => <BoardItem key={item.id} data={item} />) :
            (status === '완료' ?
              complete.map((item) => <BoardItem key={item.id} data={item} />) :
              uncomplete.map((item) => <BoardItem key={item.id} data={item} />)
            )
          )
        }
        <hr className='  w-line border-1 border-main_color'/>
      </div>

      </main>
    </div> 
  );
}

