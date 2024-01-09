import React from "react";
// import { LuFileType2 } from 'react-icons/lu'
import line from "../../../assets/bar.svg";
import { useRecoilState } from "recoil";
import { graphState } from "../../../recoil/atoms/userState";

export default function BarList() {
  const [graphInfo, setGraphInfo] = useRecoilState(graphState);
  const details = [1, 2, 3, 4, 5];

  function handleClick(detail) {
    setGraphInfo({ Type: "Bar", Detail: detail });
  }

  return (
    <div className="w-screen flex justify-center mt-5">
      {details.map((item) => {
        return (
          <div
            onClick={() => {
              handleClick(item);
            }}
            className={`${
              graphInfo.Detail === item
                ? "bg-black bg-opacity-20 ResultSelect"
                : "ResultSelect"
            }`}
          >
            <img src={line} alt="" className="mb-8 w-20" />
            <span className="absolute h-10 bottom-0 w-full flex justify-center bg-sub_3 text-lg items-center ">
              Bar chart {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}
