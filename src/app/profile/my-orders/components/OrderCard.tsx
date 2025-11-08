import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

type Props = {
  data: any;
  label: any;
};

function OrderCard({ data }: Props) {
  const total_price = data?.order_items?.reduce(
    (sum: number, order: any) => sum + order.price_is,
    0
  );
  return (
    <Link href={`/profile/my-orders/${data.order_id}`}>
      <div
        // href={`/profile/my-orders/${data.order_id}`}
        className="w-full border-[1px] border-gray-200 rounded-xl p-4 mb-6 cursor-pointer">
        <div className="flex items-center justify-between">
          <p>تحویل شده</p>
          <FiChevronLeft />
        </div>
        <div className="flex items-center gap-4 py-4 border-b-[1px] border-b-gray-200 max-md:hidden">
          <span>تاریخ: {data.order_date}</span>
          <div className="w-[10px] h-[10px] rounded-full bg-gray-400" />
          <span>کد سفارش: {data.order_id}</span>
          <div className="w-[10px] h-[10px] rounded-full bg-gray-400" />
          <span>مبلغ: {total_price} تومان</span>
          <div className="w-[10px] h-[10px] rounded-full bg-gray-400" />
          <span>تخفیف: later تومان</span>
        </div>
        <div className="md:hidden flex flex-col gap-4">
          <span>کد سفارش: {data.order_id}</span>
          <div className='flex items-center justify-between'>
            <span>{data.order_date} later</span>
            <span>قیمت: {total_price} تومان</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          {data.order_items.map((item:any, index:number) => (
            <div key={index} className="relative w-[50px] h-[50px]">
              <Image
                src={item.order_product.thumbnail}
                alt="product image"
                fill
              />
            </div>
          ))}
          <div className="w-[50px] h-[50px] flex items-center justify-center">
            + 2
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
