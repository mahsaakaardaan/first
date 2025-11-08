'use client';
import Button from '@/component/uikit/Button';
import React, { useEffect, useState, useTransition } from 'react';
import { submitOrderAction } from '../actions';

type Props = {
  data: number;
  orders: any;
};

function SideBar({ data, orders }: Props) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      // const tt = orders.map((item, index) => ({
      //   product_id: item?.product_id,
      //   quantity: item.quantity,
      //   price_is: (item.price * (100 - item.product.off)) / 100,
      //   variant_id: item.variant_id
      // }));

      const body = { products: orders };

      // console.log('first', body);

      await submitOrderAction(body);
    }); 
  };

  return (
    <div className="max-md:hidden w-[30%] bg-gray-100 rounded-2xl p-4 sticky top-4 left-4">
      <p>مبلغ کل</p>
      <p>{data}تومان</p>
      <Button text="تکمیل خرید و پرداخت" onClick={onClick} />
    </div>
  );
}

export default SideBar;
