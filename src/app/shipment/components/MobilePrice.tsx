'use client';
import Button from '@/component/uikit/Button';
import React, { useTransition } from 'react';
import { submitOrderAction } from '../actions';
import { toFaDigits } from '@/lib/nums';

type Props = {
  data: number;
  orders: any;
};

function MobilePrice({ data, orders }: Props) {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(async () => {
      const body = { products: orders };
      await submitOrderAction(body);
    });
  };
  return (
    <div className="md:hidden w-full py-5 bg-white border-t-[1px] border-t-gray-300 fixed bottom-0 left-0 z-60 px-4 flex items-center justify-between">
      <p><span className='font-sans'>{toFaDigits(data)}</span> تومان</p>
      <Button onClick={onClick} text="تکمیل خرید و پرداخت" width="w-fit px-5" />
    </div>
  );
}

export default MobilePrice;
