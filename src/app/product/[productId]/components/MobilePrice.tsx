'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { useColor } from './colorContext';
import { ProductsType } from '@/lib/types';
import Button from '@/component/uikit/Button';
import { addToCardAction } from '../actions';
import { useCurrentOrdersStore } from '@/lib/store/CurrentOrdersStore';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';
import { handleCurrentOrders } from '@/app/(auth)/login/loginAction';


type Props = {
  data: ProductsType;
};

function MobilePrice({ data }: Props) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [isBought, setIsBought] = useState<boolean>(false);
  const { color } = useColor();
  const [isPending, startTransition] = useTransition();
  const currentOrders2 = useCurrentOrdersStore(
    (state) => state.currentOrders2
  );
  const addCurrentOrder = useCurrentOrdersStore(
    (state) => state.addCurrentOrder
  );

  useEffect(() => {
    const _isBought = currentOrders2
      ? currentOrders2?.some(
          (i) => i.product_id == data.id && i.variant_id == color?.id
        )
      : false;
    setIsBought(_isBought);
  }, [color, currentOrders2]);

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
    <div className="md:hidden fixed z-60 bottom-0 left-0 w-full px-4 py-4 shadow-2xl bg-white border-t-[1px] border-gray-300">
      <div className="flex items-center justify-between gap-4">
        {isBought ? (
          <Button
            text="در سبد شما"
            width="w-[50%] bg-transparent border-[1px] border-semi-green"
            onClick={() => router.push('/shipment')}
          />
        ) : (
          <Button
            text="افزودن به سبد حرید"
            width="w-[50%]"
            onClick={handleAddToCard}
          />
        )}
        <span>
          {color?.price && (color?.price * (100 - data.off)) / 100}{' '}
          تومان
        </span>
      </div>
    </div>
  );
}

export default MobilePrice;
