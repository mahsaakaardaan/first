import { ProductsType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { FiStar } from 'react-icons/fi';

type Props = {
  data: ProductsType;
};

function SProductCard({ data }: Props) {
  return (
    <Link
      href={`/product/${data.id}`}
      className="w-full border-[1px] border-gray-100 p-2 cursor-pointer flex flex-col justify-between">
      <div className="w-full flex items-start justify-between">
        <div className="w-[70%] h-[20vh] relative max-sm:w-[30%]">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          {data?.variants?.map((item, index) => (
            <Fragment key={index}>
              {item.color == 'weight' ? (
                <p className="text-[10px]">{item.hex}</p>
              ) : (
                <div
                  className="w-[7px] h-[7px] border-[1px] border-gray-200 rounded-full"
                  style={{ backgroundColor: item.hex }}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div>
        <p className="truncate">{data.title}</p>
        <div className="flex flex-row-reverse gap-2 items-center">
          <FiStar className="text-yellow-300" />
          <span>4.5</span>
        </div>
        <div className="flex flex-row-reverse items-center justify-between mt-2">
        <div className="text-[0.8em]">
            {(data.variants[0].price * (100 - data.off)) / 100} تومان
          </div>
          {data.off == 0 ? null : (
            <div className="text-[0.5em] px-3 py-1 rounded-full bg-red-400 text-white">
              {data.off}%
            </div>
          )}
          
        </div>
      </div>
    </Link>
  );
}

export default SProductCard;
