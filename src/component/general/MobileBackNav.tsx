'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

type Props = {};

function MobileBackNav({}: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const hiddenPaths = ['/', '/category', '/social', '/profile','/searched'];
  const shouldHide = hiddenPaths.includes(pathName);
  return (
    <div
      className={`w-full py-2 px-4 flex justify-end md:hidden ${
        shouldHide ? 'hidden' : ''
      }`}>
      <button className="p-2" onClick={() => router.back()}>
        <AiOutlineArrowLeft size={20} />
      </button>
    </div>
  );
}

export default MobileBackNav;
