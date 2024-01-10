import React from 'react';

export default function PointBoard({ data })  {
    const { createdDay, topic, sub, point, remainingPoint, pointType } = data;

    const getSign = () => {
        return pointType === 'POINT_USAGE' ? '-' : '+';
    };
    
    return (
        <div>
            <div className='flex items-center py-2 text-left'>
                <div className='text-lg'>{createdDay}</div>
                <div className='flex ml-24 space-x-2 text-left items-center'>
                    <div className='text-lg'>{topic}</div>
                    <div className='text-sm text-sub_text_color'>{sub}</div>
                </div>
                <div className='ml-auto text-right'>
                    <div className='text-lg'>{`${getSign()}${point} point`}</div>
                    <div className='text-sm text-sub_text_color'>{remainingPoint} point</div>
                </div>
            </div>
            <hr className='w-full border-1 border-question_card_bg'/>
        </div>
        );
    };
