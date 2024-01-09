import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyHomeIcon from "../components/icons/MyHomeIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import { GoPencil } from "react-icons/go";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userState";
import customaxios from "../api/Axios";

export default function MyInfo({ name, nickName, email, phoneNumber }) {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [nameValue, setNameValue] = useState(name);
  const [emailValue, setEmailValue] = useState(email);
  const [nickNameValue, setNickNameValue] = useState(nickName);
  const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber);
  const [category, setCategory] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isNickNameValid, setIsNickNameValid] = useState(true);

  useEffect(() => {
    customaxios
      .get("/mypage/info", {
        headers: { Authorization: `${userInfo.accesstoken}` },
      })
      .then((response) => {
        const data = response.data.data;
        setNameValue(data.name);
        setEmailValue(data.email);
        setNickNameValue(data.nickName);
        setPhoneNumberValue(data.phoneNumber);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 동안 에러 발생:", error);
      });
  }, []);

  const handleNickNameChange = (nickNameValue) => {
    setNickNameValue(nickNameValue);

    customaxios
      .get(`/mypage/info/${nickNameValue}/exists`, {
        headers: { Authorization: `${userInfo.accesstoken}` },
      }) //`/mypage/info/${value}/exists` /data/Nickname.json
      .then((response) => {
        const isAvailable = response.data.data;
        setIsNickNameValid(isAvailable);
      })
      .catch((error) => {
        console.error("닉네임 중복 확인 중 에러 발생:", error);
      });
  };

  const handleSubmit = () => {
    const formData = {
      name: nameValue,
      email: emailValue,
      nickName: nickNameValue,
      phoneNumber: phoneNumberValue,
      //   category: category,
    };

    customaxios
      .patch("/mypage/info", formData, {
        headers: { Authorization: `${userInfo.accesstoken}` },
      })
      .then((response) => {
        console.log("서버 응답:", response.data);
        alert("개인정보가 수정되었습니다.");
      })
      .catch((error) => {
        console.error("데이터 전송 중 에러 발생:", error);
      });

    console.log("patch:", formData);
  };

  return (
    <div className="lg:mx-56 lg:mt-7 mb-20">
      <div className="flex items-center">
        <MyHomeIcon className="mr-4 text-main_color" />
        <Link to="/main/my">
          <h1 className="text-main_color text-2xl px-3">마이페이지 > </h1>
        </Link>
        <div className="text-main_color pt-1 text-3xl font-thin">
          <GoPencil />
        </div>
        <h1 className="text-main_color text-3xl px-3">개인정보 수정 </h1>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="items-center">
          <div>
            <ProfileIcon />
          </div>
          <p className="text-sm mt-1">프로필 사진 변경</p>
        </div>
      </div>

      <div className="items-center mx-40 mt-3">
        <div className="flex flex-row space-x-4 mt-2 mb-6">
          <div className="flex-1">
            <label className="flex flex-col space-y-2 mt-3 mb-4 text-xl font-semibold text-main_color">
              <span className="flex items-center">성명</span>
            </label>
            <input
              className="info-input"
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>
          <div className="flex-1" style={{ marginLeft: "50px" }}>
            <label className="flex flex-col space-y-2 mt-3 mb-4 text-xl font-semibold text-main_color">
              <span className="flex items-center">닉네임</span>
            </label>
            <input
              className={`info-input ${
                !isNickNameValid ? "border border-red-500" : ""
              }`}
              type="text"
              value={nickNameValue}
              onChange={(e) => handleNickNameChange(e.target.value)}
            />
            {!isNickNameValid && (
              <p className="text-red-500 text-sm mt-1 pl-3">
                중복된 닉네임입니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-4 mt-2 mb-6">
          <div className="flex-1">
            <label className="flex flex-col space-y-2 mt-3 mb-4 text-xl font-semibold text-main_color">
              <span className="flex items-center">이메일</span>
            </label>
            <input
              className="info-input"
              type="이메일"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </div>
          <div className="flex-1" style={{ marginLeft: "50px" }}>
            <label className="flex flex-col space-y-2 mt-3 mb-4 text-xl font-semibold text-main_color">
              <span className="flex items-center">전화번호</span>
            </label>
            <input
              className="info-input"
              type="text"
              value={phoneNumberValue}
              onChange={(e) => setPhoneNumberValue(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mb-20">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-right py-1 px-8 bg-sub_3 text-xl rounded-2xl"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
