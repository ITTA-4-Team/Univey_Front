import React from "react";
import { IoRadioButtonOff } from "react-icons/io5";

const QuestionCard = ({
  question,
  question_num,
  question_type,
  answer,
  onClick,
  isValid,
}) => {
  const renderAnswer = () => {
    if (!answer) {
      return <p>No answer available</p>;
    }

    return (
      <div>
        {Object.entries(answer).map(([key, value], index) => (
          <p key={index} className="flex items-center">
            <IoRadioButtonOff className="mr-1" /> {value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-4">
      <div
        className={`bg-question_card_bg border p-4  rounded cursor-pointer ${
          question_type === "multipleChoice" && !isValid
            ? "border border-red-500"
            : ""
        }`}
        onClick={onClick}
      >
        <p className="text-l font-semibold mb-2">
          {question_num}.{question}
        </p>
        {question_type === "multipleChoice" && (
          <div className="text-l font-normal">{renderAnswer()}</div>
        )}
        {question_type === "shortAnswer" && (
          <div className="mt-2">
            <input
              type="text"
              className="w-full p-1 border rounded border-question_card_grey bg-white text-text_color mr-2"
              placeholder={"주관식 서술 문항입니다. 자유롭게 작성해주세요."}
              value={answer[""]}
              disabled
            />
          </div>
        )}
      </div>
      <div>
        {!isValid && (
          <p className="text-red-500 text-left text-sm">
            응답을 추가해 주세요.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
