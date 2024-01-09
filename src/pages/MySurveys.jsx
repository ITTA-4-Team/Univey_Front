import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MySurveyBoard from '../components/my_survey/MySurveyBoard';
import MyHomeIcon from '../components/icons/MyHomeIcon';
import { GoPencil } from "react-icons/go";
import customaxios from '../api/Axios';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";

export default function MySurveys({}) {
    const [userInfo,setUserInfo] = useRecoilState(userState)
    const [selectedType, setSelectedType] = useState('created'); 
    const [surveys, setSurveys] = useState([]);

    
    const handleItemClick = (type) => {
        setSelectedType(type);
    };

    useEffect(() => {
        const mySurveyData = () => {
            let endpoint;
            if (selectedType === 'created') {
                endpoint = '/mypage/surveys?type=created';      ///mypage/surveys?type=created
            } else if (selectedType === 'participated') {
                endpoint = '/mypage/surveys?type=participated'; ///mypage/surveys?type=participated
            }
        
            customaxios.get(endpoint,
                {
                    headers:{
                        Authorization: `${userInfo.accesstoken}`,
                    }
                })
                .then((response) => {
                console.log(response.data.data); 
                setSurveys(response.data.data);
                })
                .catch((error) => {
                console.error('Error fetching surveys:', error);
                });
            };
        
            mySurveyData();
        }, [selectedType]);

return (
    <div className='lg:mx-56 lg:mt-7 mb-20'>
        <div className="flex">
            <MyHomeIcon className="mr-4 text-main_color" />
            <Link to="/main/my">
                <h1 className="text-main_color text-2xl px-3">마이페이지 > </h1>
            </Link>
            <div className='text-main_color pt-1 text-3xl font-thin'>
                <GoPencil/>
            </div>
            <h1 className="text-main_color text-3xl px-3">설문 기록 </h1>
        </div>
        <div className='mt-10 flex'>
            <nav>
                <div>
                    <ul className='flex space-x-8 text-xl cursor-default mb-5'>
                    {['생성한 설문','참여한 설문'].map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(index === 0 ? 'created' : 'participated')}
                            className={`${selectedType === (index === 0 ? 'created' : 'participated') ? 'text-main_color' : 'text-sub_text_color'}`} 
                        >
                            {item}
                        </li>
                    ))}
                    </ul>
                </div>
            </nav>    
        </div>
        {surveys.length > 0 && (
            <div>
                {selectedType === 'created' && <MySurveyBoard surveys={surveys} selectedType={selectedType} />}
                {selectedType === 'participated' && <MySurveyBoard surveys={surveys} selectedType={selectedType} />}
                <hr className="overflow-hidden border-t-2 border-main_color w-full h-full"></hr>
            </div>
        )}
    </div>
    );
}
