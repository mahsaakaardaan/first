import Link from 'next/link';
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { FiGrid } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { FiInstagram } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
// hover:animate-pulse

function BottomTabBar() {
  return (
    <div className="w-full flex items-center justify-between fixed z-50 bottom-[env(safe-area-inset-bottom)] left-0 right-0 border-t-[1px] border-t-gray-300 md:hidden bg-white">
      <div className="flex flex-1 items-center justify-center  hover:bg-gray-100 py-6 cursor-pointer">
        <Link href={'/'}>
          <FiHome size={25} />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center  hover:bg-gray-100 py-6 cursor-pointer">
        <Link href={'/category'}>
          <FiGrid size={25} />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center  hover:bg-gray-100 py-6 cursor-pointer">
        <Link href={'/shipment'}>
          <FiShoppingCart size={25} />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center  hover:bg-gray-100 py-6 cursor-pointer">
        <Link href={'/social'}>
          <FiInstagram size={25} />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center  hover:bg-gray-100 py-6 cursor-pointer">
        <Link href={'/profile'}>
          <FiUser size={25} />
        </Link>
      </div>
    </div>
  );
}

export default BottomTabBar;
