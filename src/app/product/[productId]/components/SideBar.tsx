'use client';
import Price from '@/component/general/Price';
import Button from '@/component/uikit/Button';
import { ProductsType } from '@/lib/types';
import Image from 'next/image';
import React, { useEffect, useState, useTransition } from 'react';
import { useColor } from './colorContext';
import { addToCardAction } from '../actions';
import { useCurrentOrdersStore } from '@/lib/store/CurrentOrdersStore';
import { redirect, useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';

type Props = {
  data: ProductsType;
};

function SideBar({ data }: Props) {
  const user = useUserStore((state) => state.user);

  const [isBought, setIsBought] = useState(false);
  const router = useRouter();
  const { color } = useColor();
  const currentOrders2 = useCurrentOrdersStore(
    (state) => state.currentOrders2
  );

  const addCurrentOrder = useCurrentOrdersStore(
    (state) => state.addCurrentOrder
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const _isBought = currentOrders2
      ? currentOrders2.some(
          (i) => i.product_id == data.id && i.variant_id == color?.id
        )
      : false;
    setIsBought(_isBought);
  }, [currentOrders2, color]);

  const handleAddToCard = () => {
    if (user?.user_id) {
      startTransition(async () => {
        const body = {
          product_id: data.id,
          variant_id: color?.id
        };
        addCurrentOrder(body);
        await addToCardAction(body);
      });
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="max-md:hidden bg-gray-100 rounded-xl ml-4 p-2 mt-4 h-[20vh] sticky top-4">
      <div className="flex gap-2">
        <div className="relative min-w-[60px] max-w-[60px] h-[60px] rounded-xl overflow-hidden">
          <Image src={data.thumbnail} alt="product image" fill />
        </div>
        <p className="text-[12px] truncate">{data.title}</p>
      </div>
      <Price off={data.off} price={color?.price} />
      {isBought ? (
        <Button
          width="border-[1px] border-solid border-purple-300 bg-transparent w-[90%]"
          text="در سبد شما"
          onClick={() => router.push('/shipment')}
        />
      ) : (
        <Button text="افزودن به سبد خرید" onClick={handleAddToCard} />
      )}
    </div>
  );
}

export default SideBar;
