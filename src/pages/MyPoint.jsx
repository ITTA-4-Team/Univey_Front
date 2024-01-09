import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PointBoard from '../components/my_point/PointBoard';
import MyHomeIcon from '../components/icons/MyHomeIcon';
import PointIcon from '../components/icons/PointIcon';
import { GoPencil } from "react-icons/go";
import { BsLightningChargeFill } from "react-icons/bs";
import customaxios from '../api/Axios';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";

export default function Mypoint() {

    const [point, setPoint] = useState('');
    const [pointData, setPointData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [accessToken, setAccessToken] = useState("");
    const [userInfo,setUserInfo] = useRecoilState(userState)

    // useEffect(() => {
    //     customaxios.get(
    //         '/data/my.json',
    //       // /mypage/points?type=purchase
    //         { headers: { Authorization: `Bearer ${accessToken}` } }
    //     )
    //     .then((response) => {
    //         const data = response.data.data;
    //         setPoint(data.point);
    //     })
    //     .catch((error) => {
    //         console.error('데이터를 불러오는 동안 에러 발생:', error);
    //     });
    // } , []);

    useEffect(() => {
        let apiEndpoint = '';
        if (selectedOption === 'gain') {
            apiEndpoint = '/mypage/point?type=acquisition';  
        } else if (selectedOption === 'purchase') {
            apiEndpoint = '/mypage/point?type=purchase'; 
        } else if (selectedOption === 'usage') {
            apiEndpoint = '/mypage/point?type=usage';
            // /mypage/points?type=usage
        } else {
            apiEndpoint = '/mypage/point?type=all';
        }
        console.log(apiEndpoint)
        customaxios.get(apiEndpoint,
                { headers: { Authorization: `${userInfo.accesstoken}`, } }
            )
        .then((response) => {
            const data = response.data.data;
            setPointData(data);
        })
        .catch((error) => {
            console.error('데이터를 불러오는 동안 에러 발생:', error);
        });
    }, [selectedOption]);  

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

return (
    <div className='lg:mx-56 lg:mt-7 mb-20'>
        <div className="flex items-center">
            <MyHomeIcon className="mr-4 text-main_color" />
            <Link to="/main/my">
                <h1 className="text-main_color text-2xl px-3">마이페이지 > </h1>
            </Link>
            <div className= 'text-main_color pt-1 text-3xl font-thin'>
                <GoPencil/>
            </div>
            <h1 className="text-main_color text-3xl px-3">포인트 </h1>
        </div>
        <div className='mt-10 flex justify-center'>
            <div className='items-center'>
                <div className='flex justify-center items-center space-x-5'>
                    <div><PointIcon/></div>
                    <div className='text-main_color text-4xl'>{point} 포인트</div>
                </div>
                <div className='flex justify-center'>
                    <button 
                        className='flex bg-question_card_bg rounded-2xl py-1 px-8 mt-5'>
                        <div className='pr-2 pt-1'><BsLightningChargeFill/></div>
                        포인트 충전
                    </button>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center mx-36'>
            <div className='w-full'>
                <hr className='w-full border-1 mt-10 border-main_color'/>
                <div className='flex justify-end'>
                <select 
                    name="" 
                    id="" 
                    className='h-10 my-1 outline-none'
                    value={selectedOption}  
                    onChange={handleOptionChange}  
                >
                    <option value="">전체 내역</option>
                    <option value="gain">획득 내역</option>
                    <option value="purchase">충전 내역</option>
                    <option value="usage">사용 내역</option>
                </select>
                </div>
                <hr className='w-full border-1 border-question_card_bg'/>
                {pointData &&
                    pointData.map((item) => (
                    <PointBoard key={item.pointId} data={item} />
                    
                ))}                
                
            </div>
        </div>
    
    </div>
    );
}
