import React from 'react';
import ShippingProductCard from './components/ShippingProductCard';
import { getOrders } from '@/lib/api';
import SideBar from './components/SideBar';
import MobilePrice from './components/MobilePrice';
import { cookies } from 'next/headers';

type Props = {};

async function page({}: Props) {
  const cookieStore =await cookies();
  
  const token = cookieStore.get('access_token')?.value;
  const orders = token && await getOrders();
  
  const total_price = orders.reduce(
    (sum: number, order: any) =>
      sum + (order.price * (100 - order.product.off)) / 100,
    0
  );

  const tt = orders.map((item, index) => ({
    product_id: item?.product_id,
    quantity: item.quantity,
    price_is: (item.price * (100 - item.product.off)) / 100,
    variant_id: item.variant_id
  }));

  return (
    <div className="w-full p-4 flex items-start justify-between max-md:block relative">
      <div className="md:w-[70%]">
        {orders.map((item: any, index: number) => (
          <ShippingProductCard key={index} data={item} />
        ))}
      </div>
      <SideBar data={total_price} orders={tt} />
      <MobilePrice data={total_price} orders={tt} />
    </div>
  );
}

export default page;
