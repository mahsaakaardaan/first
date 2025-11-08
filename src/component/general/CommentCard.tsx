import Image from 'next/image';
import React from 'react';
import { FiStar } from 'react-icons/fi';

type Props = {};

function CommentCard({ data }: Props) {
  return (
    <div className="w-full border-b-[1px] border-b-gray-200">
      <div className="w-full flex items-center gap-3 my-2">
        <span className="text-gray-400 text-[14px]">
          {data.user_name}
        </span>
        <div className="text-[12px] bg-green-400 py-1 px-4 rounded-xl text-white">
          خریدار
        </div>
        <div className="text-gray-400 text-[12px]">
          {data.comment_date} مرداد
        </div>
      </div>
      <div className="flex items-center gap-1 mb-2">
        <FiStar className="text-yellow-300" />
        <FiStar className="text-yellow-300" />
        <FiStar className="text-yellow-300" />
        <FiStar />
        <FiStar />
      </div>
      <div className="mb-2">
        {data?.image_url && (
          <div className="relative w-[50px] h-[50px] rounded-xl overflow-hidden">
            <Image src={data?.image_url} fill alt="comment image" />
          </div>
        )}
        <p>{data.comment}</p>
      </div>
      {/* variant */}
      <div></div>
    </div>
  );
}

export default CommentCard;
