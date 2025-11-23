'use client';
import { useUserStore } from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiMapPin } from 'react-icons/fi';

function NavbarAddress() {
  const router = useRouter()
  const user = useUserStore((state) => state.user);
  return (
    <>
      {user?.default_address_id !== 0 ?
        <div className="flex items-center gap-2 py-3">
          <FiMapPin />
          <span>
            ارسال به {user.country}/ {user.city}
          </span>
        </div> : <button className='bg-semi-green py-2 px-4 rounded-sm' onClick={() => router.push('/profile/add-address')} >آدرس شما کجاست؟</button>
      }
    </>
  );
}

export default NavbarAddress;
