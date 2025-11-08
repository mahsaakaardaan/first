'use client';
import { CategoryType } from '@/lib/types';
import React, { useState } from 'react';
import Icon from '../uikit/Icon';
import Link from 'next/link';

type Props = {
  data: CategoryType[];
};

function HomeCategory({ data }: Props) {
  const [hoveredData, setHoveredData] = useState<CategoryType>(
    data[0]
  );

  return (
    <div className="w-[70%] h-[50vh] bg-white absolute z-40 shadow-2xl flex max-md:w-full max-md:h-full">
      <div className="w-[30%] max-md:w-[40%] bg-gray-100 h-full">
        {data?.map((item, index) => (
          <Link
            href={{
              pathname: '/search',
              query: { category: item.fa_name }
            }}
            onMouseOver={() => setHoveredData(item)}
            key={index}
            className={`w-full flex items-center gap-2 py-3 pr-1 border-b-[1px] border-b-gray-200 cursor-pointer ${
              hoveredData?.id == item?.id
                ? 'bg-white text-purple-400'
                : ''
            } `}>
            <Icon icon={item.en_name as any} />
            <span className="text-[0.8em]">{item.fa_name}</span>
          </Link>
        ))}
      </div>
      <div className="w-full h-full p-4">
        {hoveredData?.subs?.map((item, index) => (
          <Link
            href={{
              pathname: '/search',
              query: { subCategory: item.fa_s_name }
            }}
            key={index}
            className="flex items-center gap-1 py-2 my-2 cursor-pointer hover:text-purple-300">
            <div className="w-[2px] h-[15px] bg-purple-300" />
            <span className="text-[0.8em]">{item?.fa_s_name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeCategory;
