'use client';
import { toFaDigits } from '@/lib/nums';
import { useUserStore } from '@/lib/store/userStore';
import Image from 'next/image';
import React from 'react';

type Props = {};

function UserInfo({}: Props) {
  const user = useUserStore((state) => state.user);
  return (
    <div className='flex items-center gap-2'>
      <div className='w-[50px] h-[50px] rounded-full relative'>
        <Image src="/user.jpeg" alt="user profile" fill />
      </div>
      <div className="flex flex-col">
        {user?.name && <p>{user.name}</p>}
        {user?.phone_number && <p className='font-sans'>{toFaDigits(user.phone_number)}</p>}
      </div>
    </div>
  );
}

export default UserInfo;
