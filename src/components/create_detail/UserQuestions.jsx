import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import CreateQuestion from "./CreateQuestion";
import EditQuestion from "./EditQuestion";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import AddButtonIcon from "../icons/AddButtonIcon";
import customaxios from "../../api/Axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import { useQueries } from "react-query";

const UserQuestions = ({
  userQuestions,
  setUserQuestions,
  onAddQuestion,
  onEditQuestion,
  topic,
  description,
}) => {
  const { surveyId } = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [creatingQuestion, setCreatingQuestion] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([""]);
  const [isValid, setIsValid] = useState(
    Array(userQuestions.length).fill(false)
  );
  const Info = JSON.parse(localStorage.getItem("Info"));
  const navigate = useNavigate();

  const handleAddNewQuestion = () => {
    setCreatingQuestion(true);
  };

  const handleAddQuestion = (question) => {
    if (editingIndex !== null) {
      const updatedQuestions = [...userQuestions];
      updatedQuestions[editingIndex] = {
        ...question,
        question_num: editingIndex + 1,
      };
      onEditQuestion(updatedQuestions);
    } else {
      const newQuestion = {
        question_num: userQuestions.length + 1,
        ...question,
        question_type: question.questionType,
        isRequired: question.isRequired,
        answer: question.answer || {},
      };

      console.log("New Question:", newQuestion);
      onAddQuestion(newQuestion); // 직접 newQuestion 전달

      setQuestion("");
      setAnswer([""]);
    }

    setCreatingQuestion(false);
    setEditingIndex(null);
  };

  const handleCopyCreateQuestion = (question) => {
    if (editingIndex !== null) {
      const updatedQuestions = [...userQuestions];
      updatedQuestions[editingIndex] = {
        ...question,
        question_num: editingIndex + 1,
      };
      onEditQuestion(updatedQuestions);
    } else {
      const newQuestion = {
        question_num: userQuestions.length + 1,
        ...question,
        question_type: question.questionType,
        isRequired: question.isRequired,
        answer: question.answer || {},
      };
      onAddQuestion(newQuestion); // 직접 newQuestion 전달
    }

    setCreatingQuestion(true);
  };

  const handleCopyEditQuestion = () => {};

  const handleUpdateQuestion = (updatedQuestion, index) => {
    const updatedQuestions = [...userQuestions];
    updatedQuestions[index] = updatedQuestion;

    setUserQuestions(updatedQuestions);

    if (typeof onEditQuestion === "function") {
      onEditQuestion(updatedQuestions);
    }

    setEditingIndex(null);
  };

  const handleEditQuestion = (index) => {
    setCreatingQuestion(false);
    setEditingIndex(index === editingIndex ? null : index);
    setIsValid((prevIsValid) => {
      const newIsValid = [...prevIsValid];
      newIsValid[index] = true;
      return newIsValid;
    });
  };

  // 선택한 질문 삭제
  const handleRemoveQuestion = (index) => {
    // userQuestions 배열에서 선택한 인덱스의 질문을 제외한 새로운 배열 생성 (splice 대신 filter 사용)
    const updatedQuestions = userQuestions.filter((_, i) => i !== index);

    // 업데이트된 question_num 적용
    const updatedQuestionsWithNum = updatedQuestions.map((question, i) => ({
      ...question,
      question_num: i + 1,
    }));

    // setUserQuestions 함수를 사용하여 상위 컴포넌트의 userQuestions 상태를 업데이트
    setUserQuestions(updatedQuestionsWithNum);
    // 현재 편집 중인 질문이 있을 경우 편집 상태 종료
    setEditingIndex(null);
  };

  const handleClick = () => {
    setCreatingQuestion((prev) => !prev);
    setEditingIndex(null);
  };

  const handleClickOutside = (event) => {
    const inputElement = inputRef.current?.querySelector("input");

    if (
      inputElement &&
      inputElement.value.trim() === "" &&
      !inputRef.current.contains(event.target) &&
      (creatingQuestion || editingIndex !== null)
    ) {
      if (creatingQuestion) {
        setCreatingQuestion(false);
      }
      setEditingIndex(null);
    }
  };

  const handleSubmit = () => {
    const isValidArray = userQuestions.map((userQuestion) => {
      return userQuestion.question_type === "multipleChoice"
        ? Object.keys(userQuestion.answer).length > 0
        : true;
    });

    setIsValid(isValidArray);

    // 유효성이 모두 true일 경우에만 submit 처리
    if (isValidArray.every((isValid) => isValid)) {
      const Info = localStorage.getItem("Info");

      if (userInfo.point < userQuestions.length * 10) {
        alert("포인트가 부족합니다!");
      } else {
        customaxios
          .post(`/surveys/create`, Info, {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              Authorization: `${userInfo.accesstoken}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(userQuestions);
            const id = response.data.data;
            if (userQuestions.length === 0) {
              alert("질문을 입력해주세요");
            } else {
              customaxios
                .post(
                  `/surveys/submit/${id}`,
                  { userQuestions },
                  {
                    headers: {
                      "ngrok-skip-browser-warning": "69420",
                      Authorization: `${userInfo.accesstoken}`,
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((response) => {
                  const point = response.data.data;
                  setUserInfo((prev) => ({ ...prev, point: point }));
                  navigate(`../main/create/qr/${id}`);
                })
                .catch((error) => {
                  console.error("에러 발생:", error);
                });
            }
          })
          .catch((error) => {
            console.error("에러 발생:", error);
          });
      }
    }
  };

  useEffect(() => {
    // 초기에는 모든 질문이 유효하다고 가정...
    const initialIsValidArray = userQuestions.map((userQuestion) => {
      return userQuestion.question_type === "multipleChoice"
        ? Object.keys(userQuestion.answer).length > 0
        : true;
    });
    setIsValid(initialIsValidArray);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [creatingQuestion, editingIndex, userQuestions]);

  console.log("userQuestions:", userQuestions);
  console.log("hideValidationMessage in UserQuestions:", false);
  console.log("isValid array in UserQuestions:", isValid);

  return (
    <div className="flex-1 p-4 mt-16">
      <div className="flex justify-center">
        <BiSolidQuoteAltLeft className="text-main_color" />
        <h2 className="text-2xl font-semibold text-main_color mb-4 px-2">
          {Info.topic}
        </h2>
        <BiSolidQuoteAltRight className="text-main_color" />
      </div>
      <p className="text-center text-sm mb-1">{Info.description}</p>
      <div className="text-right">
        <button
          className="text-main_color border border-main_color rounded-xl px-5 mb-3"
          onClick={handleAddNewQuestion}
        >
          새 문항 생성
        </button>
      </div>

      {userQuestions.map((userQuestion, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <EditQuestion
              onCancel={handleClick}
              onEditQuestion={(updatedQuestion) =>
                handleUpdateQuestion(updatedQuestion, index)
              }
              onCopyEditQuestion={(copiedQuestion) =>
                handleCopyEditQuestion(copiedQuestion, index)
              }
              onRemoveQuestion={() => handleRemoveQuestion(index)}
              initialQuestion={userQuestion}
              userQuestions={userQuestions}
              setUserQuestions={setUserQuestions}
            />
          ) : (
            <QuestionCard
              question={userQuestion.question}
              question_num={userQuestion.question_num}
              question_type={userQuestion.question_type}
              answer={userQuestion.answer}
              onClick={() => handleEditQuestion(index)}
              isEditing={editingIndex !== null}
              isValid={isValid[index]}
              hideValidationMessage={false}
            />
          )}
        </div>
      ))}

      <div className="mt-4 flex" ref={inputRef}>
        {!creatingQuestion &&
          editingIndex === null &&
          userQuestions.length === 0 && (
            <div
              onClick={() => setCreatingQuestion(true)}
              className={`flex-grow p-2 mb-4 bg-question_card_bg rounded text-sub_text_color cursor-pointer`}
            >
              문항을 선택해 주세요.
            </div>
          )}

        {creatingQuestion && (
          <CreateQuestion
            onCancel={() => setCreatingQuestion(false)}
            onAddQuestion={handleAddQuestion}
            onCopyCreateQuestion={handleCopyCreateQuestion}
          />
        )}

        {!creatingQuestion &&
          editingIndex === null &&
          userQuestions.length > 0 && (
            <div
              onClick={() => setCreatingQuestion(true)}
              className={`flex-grow p-2 mb-4 bg-question_card_bg rounded text-sub_text_color cursor-pointer hidden`}
            >
              문항을 선택해 주세요.
            </div>
          )}
      </div>

      <div className="text-right mt-10">
        <button
          className="px-9 py-1 rounded-xl border border-sub_text_color_4 text-sub_text_color_4"
          onClick={handleSubmit}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default UserQuestions;
