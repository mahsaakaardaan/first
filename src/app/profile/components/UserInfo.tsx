'use client';
import { useUserStore } from '@/lib/store/userStore';
import React from 'react';

type Props = {};

function UserInfo({}: Props) {
  const user = useUserStore((state) => state.user);
  return (
    <>
      {user?.name && <p>{user.name}</p>}
      {user?.phone_number && <p>{user.phone_number}</p>}
    </>
  );
}

export default UserInfo;
