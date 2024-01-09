import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../components/icons/CheckIcon";
import { IoIosLink } from "react-icons/io";
import { MdQrCode2 } from "react-icons/md";

export default function CreateComplete() {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    // const newPath = '/';
    // navigate(newPath);
    console.log("move move");
  };

  const handleReturnMainClick = () => {
    navigate("/");
  };

  return (
    <div className="realative h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mb-5">
        <CheckIcon />
        <h1 className="ml-5 text-main_color text-4xl mb-1">설문 생성 완료!</h1>
      </div>
      <div>
        <p className="flex justify-center text-l text-center">
          설문 생성이 완료되었습니다! QR 코드, URL을 통해 설문 조사를
          공유해보세요! <br />
        </p>
      </div>
      <div className="flex justify-center space-x-8 mt-20">
        <button
          className="text-5xl text-main_color"
          onClick={handleReturnMainClick}
        >
          <MdQrCode2 />
        </button>
        <button
          className="text-5xl text-main_color"
          onClick={handleReturnMainClick}
        >
          <IoIosLink />
        </button>

        <button
          className="py-2 px-16 rounded-2xl bg-main_color text-white text-xl"
          onClick={handleReturnClick}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
