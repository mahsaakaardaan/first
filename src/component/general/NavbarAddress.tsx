'use client';
import { useUserStore } from '@/lib/store/userStore';
import React from 'react';
import { FiMapPin } from 'react-icons/fi';

function NavbarAddress() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      {user?.default_address_id &&
        <div className="flex items-center gap-2 py-3">
          <FiMapPin />
          <span>
            ارسال به {user.country}/ {user.city}
          </span>
        </div>
      }
    </>
  );
}

export default NavbarAddress;
