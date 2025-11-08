'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiArchive } from 'react-icons/fi';
import {
  countCurrentOrderAction,
  deleteCurrentOrderByIdAction
} from '../actions';
import { useCurrentOrdersStore } from '@/lib/store/CurrentOrdersStore';

type Props = {
  data: any
};

function ShippingProductCard({ data }: Props) {
  const [count, setCount] = useState(data.quantity);
  const removeCurrentOrder = useCurrentOrdersStore(
    (state) => state.removeCurrentOrder
  );

  const onIncrement = async () => {
    if (count < 3) {
      const newCount = count + 1;
      setCount(newCount);
      await countCurrentOrderAction(data.current_order_id, newCount);
    }
  };
  const onDecrement = async () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      await countCurrentOrderAction(data.current_order_id, newCount);
    }
  };

  const onDeleteOrder = async () => {
    await deleteCurrentOrderByIdAction(data.current_order_id);
    removeCurrentOrder(data.current_order_id);
  };

  return (
    <div className="w-full border-b-[1px] border-b-gray-200 p-4 cursor-pointer flex flex-col">
      <Link
        href={`/product/${data.product_id}`}
        className="flex items-start gap-4">
        <div className="w-[200px] h-[200px] max-md:min-w-[100px] max-md:max-w-[100px] max-md:h-[100px] relative overflow-hidden">
          <Image
            src={data.product.thumbnail}
            alt={data.product.title}
            fill
          />
        </div>
        <div className="flex flex-col gap-2 w-[60%]">
          <p className="truncate">{data.product.title}</p>
          <div
            className="w-[20px] h-[20px] rounded-full overflow-hidden"
            style={{ backgroundColor: data.hex }}
          />
          <span className="w-fit py-1 px-3 rounded-2xl bg-red-500 text-[12px] text-white">
            {data.product.off}%
          </span>
          <p>{(data.price * (100 - data.product.off)) / 100}تومان</p>
        </div>
      </Link>
      <div className="flex items-center gap-4 mt-4 justify-end">
        <button
          onClick={onDeleteOrder}
          className="w-[30px] h-[30px] rounded-xs bg-red-200 flex items-center justify-center">
          <FiArchive />
        </button>
        <button
        disabled
          onClick={onDecrement}
          className="w-[30px] h-[30px] rounded-xs bg-gray-200 flex items-center justify-center text-[1.6em]">
          -
        </button>
        <span>{count}</span>
        <button
        disabled
          onClick={onIncrement}
          className="w-[30px] h-[30px] rounded-xs bg-gray-200 flex items-center justify-center text-[1.6em]">
          +
        </button>
      </div>
    </div>
  );
}

export default ShippingProductCard;
