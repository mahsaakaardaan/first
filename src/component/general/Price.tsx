import { toFaDigits } from '@/lib/nums';
import React from 'react';

function Price({
  off = 0,
  price = 0
}: {
  off?: number;
  price?: number;
}) {
  return (
    <div className="mx-2  flex flex-col items-end">
      <div className="flex items-center justify-between w-full">
        <span className="bg-red-600 text-white py-0.5 px-3 rounded-2xl text-[10px] font-sans font-bold">
          {toFaDigits(off)}%
        </span>
        <span className='font-sans text-black'>{toFaDigits((price * (100 - off)) / 100)}</span>
      </div>
      <span className="line-through text-gray-500 text-[12px] font-sans">
        {toFaDigits(price)}
      </span>
    </div>
  );
}

export default Price;
