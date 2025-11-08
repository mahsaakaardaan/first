import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

type Props = {
  data: any;
};

function CommentCard({ data }: Props) {
  return (
    <Link href={`/product/${data.product_id}`}>
      <div className="w-full border-b-[1px] border-b-gray-400 py-4 cursor-pointer">
        {/* top section */}
        <div className="flex items-center justify-between border-b-[1px] border-b-gray-200 pb-4">
          <div className="flex items-center gap-6">
            <div className="relative w-[40px] h-[40px]">
              <Image
                src={data.product.thumbnail}
                alt="product image"
                fill
              />
            </div>
            <p>{data.product.title}</p>
          </div>
          <div className="flex items-center gap-2 py-1 px-4 rounded-2xl bg-green-300">
            <FiCheckCircle size={15} />
            <p className="text-[0.8em]">تایید شده</p>
          </div>
        </div>
        {/* middle section */}
        <div className="py-4 border-b-[1px] border-b-gray-200">
          {data.image_url && <div className="w-[50px] h-[50px] relative rounded-xl mb-2 overflow-hidden">
            <Image src={data.image_url} alt="image" fill />
          </div>}
          <p className="text-[0.8em] text-gray-500">{data.comment}</p>
        </div>
        {/* bottom section */}
        <div className="pt-4 flex items-center gap-6">
          <div
            className="h-[20px] w-[20px] rounded-full border-[1px] border-gray-200"
            style={{ backgroundColor: data.variant.hex }}
          />
          <p className="text-[0.6em] text-gray-400">
            {' '}
            تاریخ: {data.comment_date}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CommentCard;
