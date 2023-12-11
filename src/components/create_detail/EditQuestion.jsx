import React, { useState, useEffect, useRef } from 'react';
import CopyButtonIcon from "../icons/CopyButtonIcon";
import DeleteButtonIcon from "../icons/DeleteButtonIcon";
import MultipleChoiceIcon from '../icons/MultipleChoiceIcon';
import ShortAnswerIcon from '../icons/ShortAnswerIcon';
import CreateCardTopAsset from '../icons/CreateCardTopAsset';

const EditQuestion = ({ onCancel, onEditQuestion, onRemoveQuestion, initialQuestion, index }) => {
  const [editedQuestion, setEditedQuestion] = useState({ ...initialQuestion });
  const [answers, setAnswers] = useState(initialQuestion.answers || ['']);
  const [questionType, setQuestionType] = useState(initialQuestion.question_type);
  const inputRef = useRef(null);
  const [isRequired, setIsRequired] = useState(initialQuestion.isRequired);

  const handleEditQuestion = () => {
    if (editedQuestion.question.trim() !== '') {
      const updatedQuestion = {
        ...editedQuestion,
        answers: questionType === 'multipleChoice' ? answers : null,
        isRequired: isRequired,
      };

      onEditQuestion(updatedQuestion);
    }
  };

  const handleRemoveQuestion = () => {
    onRemoveQuestion();
  };

  const handleUpdateAnswer = (index, value) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = value;

      if (index === updatedAnswers.length - 1 && value.trim() !== '') {
        updatedAnswers.push('');
      }

      return updatedAnswers;
    });
  };

  const handleClickOutside = (event) => {
    if (inputRef.current) {
      const isInputEmpty = editedQuestion.question.trim() === '';

      if (
        !inputRef.current.contains(event.target) &&
        (event.target.className !== 'bg-question_card_bg' ||
          (event.target.className === 'bg-question_card_bg' && isInputEmpty))
      ) {
        handleEditQuestion();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel, editedQuestion, isRequired]);

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-start">
        <CreateCardTopAsset />
        <div ref={inputRef} className="mb-2 w-full rounded p-5 bg-question_card_bg">
          <div className="flex items-center space-x-4">
            <input
              className="w-full p-1 border-none border-question_card_grey bg-transparent text-text_color"
              placeholder="질문을 작성해주세요"
              value={editedQuestion.question}
              onChange={(e) => setEditedQuestion((prev) => ({ ...prev, question: e.target.value }))}
            />
            <div className="flex items-center space-x-2">
              <input
                id="checked"
                type="checkbox"
                checked={isRequired}
                className="mr-1 mt-2 bg-transparent border border-text_color rounded w-4 h-4 "
                onChange={() => {
                  console.log('Checkbox clicked. Current value:', !isRequired);
                  setIsRequired(!isRequired);
                }}
              />
              <label className="mb-0 mt-1">필수</label>
            </div>
            <div className="flex items-center mt-2">
              <select
                className="p-1 border-b border-question_card_grey bg-transparent text-text_color mr-2"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="multipleChoice">
                  <MultipleChoiceIcon className='pr-1' />
                  객관식
                </option>
                <option value="shortAnswer">
                  <ShortAnswerIcon className='pr-1' />
                  주관식
                </option>
              </select>
            </div>
          </div>
          {questionType === 'multipleChoice' && (
            <div className="mt-2">
              {Array.isArray(initialQuestion.answer) ? (
                // 배열인 경우
                initialQuestion.answer.map((answer, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      className="w-full p-1 border-none border-question_card_grey bg-transparent text-text_color mr-2"
                      placeholder={'응답 추가'}
                      value={answer}
                      onChange={(e) => handleUpdateAnswer(index, e.target.value)}
                    />
                  </div>
                ))
              ) : (
                // 객체인 경우
                Object.values(initialQuestion.answer).map((answer, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      className="w-full p-1 border-none border-question_card_grey bg-transparent text-text_color mr-2"
                      placeholder={'응답 추가'}
                      value={answer}
                      onChange={(e) => handleUpdateAnswer(index, e.target.value)}
                    />
                  </div>
                ))
              )}
            </div>
          )}
          {questionType === 'shortAnswer' && (
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-1 border rounded border-question_card_grey bg-white text-text_color mr-2"
                placeholder={'주관식 서술 문항입니다. 자유롭게 작성해주세요.'}
                value={answers[0]}
                disabled
              />
            </div>
          )}
          <hr className='my-4 py-2 border-question_card_grey'></hr>
          <div className='flex justify-end mt-2'>
            <button className='px-2'>
              <CopyButtonIcon />
            </button>
            <button className='pl-2' onClick={handleRemoveQuestion}>
              <DeleteButtonIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
