import React from "react";

export default function ExitModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <p className="mb-4 text-center">
          설문 참여가 완료되지 않았습니다.<br></br>
          설문 참여를 마저 진행하시겠습니까?
        </p>
        <div className="flex justify-center">
          <button
            className="mr-8 px-12 bg-sub_3 rounded-3xl font-semibold"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-12 bg-sub_3 rounded-3xl font-semibold"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
