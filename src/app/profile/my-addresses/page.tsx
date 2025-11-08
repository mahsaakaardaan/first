import Button from '@/component/uikit/Button';
import { getUserAddresses } from '@/lib/api';
import React from 'react';
import AddressCard from './components/AddressCard';

type Props = {};

async function page({}: Props) {
  const userAddresses = await getUserAddresses();


  return <div>
    <div className='flex items-center justify-between'>
      <span>آدرس‌ها</span>
      <Button text='افزودن آدرس جدید' width='w-contain p-5' href="/profile/add-address" />
    </div>
    <div>
      {userAddresses.map((item,index) => <AddressCard key={index} data={item} />)}
      </div>
  </div>;
}

export default page;
