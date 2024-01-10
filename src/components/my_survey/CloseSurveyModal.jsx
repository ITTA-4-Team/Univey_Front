import React from 'react';

export default function CloseSurveyModal({ onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
                <p className="mb-4 text-center">
                    설문을 마감할 경우 해당 설문을 다시 진행할 수 없습니다.<br></br>
                    설문을 마감하시겠습니까?
                </p>
                <div className="flex justify-center">
                    <button className="mr-8 px-12 bg-sub_3 rounded-3xl font-semibold" onClick={onClose}>
                        Yes
                    </button>
                    <button className="px-12 bg-sub_3 rounded-3xl font-semibold" onClick={onConfirm}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}