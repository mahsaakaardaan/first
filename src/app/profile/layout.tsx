import React, { ReactNode } from 'react';
import SideBar from './SideBar';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { FiEdit3 } from 'react-icons/fi';
import UserInfo from './components/UserInfo';

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="w-full p-4">
      <Navbar />
      <div className="flex items-center justify-between border-b-[1px] border-gray-200 max-md:hidden">
        <div className="my-4">
          <UserInfo />
        </div>
        <Link href={'/profile/my-profile'}>
          <FiEdit3 className="text-sky-400" />
        </Link>
      </div>
      <div className="w-full flex gap-4 ">
        <div className='max-md:hidden md:w-[35%]'>
          <SideBar />
        </div>
        <div className="w-full h-full p-4 rounded-2xl border-[1px] border-gray-200 max-md:border-0 mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
