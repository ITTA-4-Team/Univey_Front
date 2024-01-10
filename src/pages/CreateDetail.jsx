import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserQuestions from '../components/create_detail/UserQuestions';
import RecommendedQuestions from '../components/create_detail/RecommendedQuestions';
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";
import { useParams } from 'react-router';
import customaxios from '../api/Axios';

const CreateDetail = () => {
  const {surveyId} = useParams();
  const {surveyTopic} = useParams();
  const [userQuestions, setUserQuestions] = useState([]);
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [userInfo,setUserInfo] = useRecoilState(userState)
  console.log('createDetail 페이지임')
  console.log(userInfo)
  // useEffect(() => {
  //   axios.get(
  //     '/data/Mock.json',
  //     { headers: { Authorization: `Bearer ${userInfo.accessToken}` } }
  //     ) // /surveys/create/details/${surveyId}
  //     .then((response) => {
  //       const surveyData = response.data.surveyData;

  //       if (surveyData.length > 0) {
  //         setTopic(surveyData[0].topic);
  //         setDescription(surveyData[0].description);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    questions();
    
  }, []);
   function questions(){
    customaxios.get(
      `/surveys/create/details/${surveyId}`,
      { headers: { 
        'ngrok-skip-browser-warning': '69420',
        Authorization: `${userInfo.accesstoken}`
      } }
      ) 
      .then((response) => {
        console.log(response)
        setTopic(response.data.data.topic)
        setDescription(response.data.data.description)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      console.log(surveyTopic)
      const question_topic = {"question":surveyTopic}

      customaxios.post(`/chat-gpt/question`,
      question_topic,
      { headers: {
         Authorization: `${userInfo.accesstoken}`,
         'ngrok-skip-browser-warning': '69420',
         'Accept': 'application/json'
        } }
      ) .then((response) => {
        console.log(response.data.data)
        const recommendedQuestions = response.data.data;
        const jsonString = recommendedQuestions.replace(/\[|\]/g, '').replace(/([^,]+)/g, '"$1"');

        try {
          const dataArray = JSON.parse(`[${jsonString}]`);
          console.log(dataArray[0]);  // 첫 번째 배열을 출력
        } catch (error) {
          console.error("Error parsing JSON:", error.message);
        }
        console.log(Object.keys(recommendedQuestions))
        console.log(Object.values(recommendedQuestions))
        const entries = Object.entries(recommendedQuestions)
          console.log(Array.isArray(entries))

          //response.data.recommendedQuestions -> response.data
          const flattenedRecommendedQuestions = recommendedQuestions.foreach(recommendedQuestion => ({
            question_num: recommendedQuestion[0],
            question: recommendedQuestion[1],
            question_type: 'multipleChoice', 
            isRequired: true,
            answer: recommendedQuestion.slice(2),  
          }));
  
          setRecommendedQuestions(flattenedRecommendedQuestions);
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

  }


  const handleAddQuestion = (recommendedQuestion) => {
    // 추천질문에서 추출
    const { question, question_type, isRequired, answer } = recommendedQuestion;

    const newUserQuestion = {
      question_num: userQuestions.length + 1,
      question,
      question_type,
      isRequired,
      answer,
    };

    setUserQuestions((prevUserQuestions) => [...prevUserQuestions, newUserQuestion]);
  };

  const handleAddAllQuestions = () => {
    // 전체선택
    setUserQuestions((prevUserQuestions) => [
      ...prevUserQuestions,
      ...recommendedQuestions.map((recommendedQuestion, index) => ({
        ...recommendedQuestion,
        question_num: prevUserQuestions.length + 1 + index,
      })),
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...userQuestions];
    updatedQuestions.splice(index, 1);
    setUserQuestions(updatedQuestions);
  };

  return (
    <div className="flex items-stretch lg:mx-28">
      <div className="flex-1">
        <UserQuestions 
          surveyId = {surveyId}
          userQuestions={userQuestions}
          setUserQuestions={setUserQuestions} 
          onRemoveQuestion={handleRemoveQuestion}
          topic={topic} 
          description={description} 
          onAddQuestion={handleAddQuestion}
        />
      </div>
      <div className="border-l border-main_color m-10"></div>
      <div className="flex-1">
        <RecommendedQuestions
          recommendedQuestions={recommendedQuestions}
          onAddQuestion={handleAddQuestion}
          onAddAllQuestions={handleAddAllQuestions}
        />
      </div>
    </div>
  );
};

export default CreateDetail;
  