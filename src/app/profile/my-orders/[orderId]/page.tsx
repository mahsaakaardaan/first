import { getOrderById } from '@/lib/api';
import React from 'react';
import OrderProductCard from './component/OrderProductCard';
import UserInfo from '../../components/UserInfo';

type Props = {};

async function page({ params }: Props) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  

  return (
    <div>
      <p className="mb-4">جزيیات سفارش</p>
      <div className="flex items-center gap-4">
        <p>کد پیگیری: {orderId}</p>
        <p>تاریخ ثبت سفارش: {order[0].order_date}</p>
      </div>
      <Separator />
      <div>
        <div className="flex items-center gap-4">
          <UserInfo />
        </div>
        <p className='mt-4'>آدرس: {order[0].address.full_address}</p>
      </div>
      <Separator />
      <div className="flex items-center gap-4 mb-4">
        <p>مبلغ: ۲۳۳۴۴۵ تومان</p>
        <p>سود شما: ۳۴۹۵۹ تومان</p>
      </div>
      <div>
        {order[0].order_items?.map((item, index) => (
          <OrderProductCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default page;

const Separator = () => (
  <div className="w-full h-[1px] bg-gray-200 my-3" />
);
