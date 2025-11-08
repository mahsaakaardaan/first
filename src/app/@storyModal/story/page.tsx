'use client';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FiShare2 } from 'react-icons/fi';

type Props = {};

function page({}: Props) {
  const router = useRouter();
  const ref = useRef(null);
  useOutSideClick(ref, () => router.back());
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-40 bg-[#000000cc] flex items-center justify-center">
      <div
        ref={ref}
        className="w-[320px] h-[480px] bg-white rounded-2xl flex items-center justify-between py-[10px] absolute z-50 flex-col ">
        <div className="w-[300px] h-[400px] relative rounded-2xl overflow-hidden">
          <Image src="/s3.jpg" fill alt="story" />
        </div>
          <div className="flex items-center gap-3 mb-3">
            <FiHeart size={15} />
            <FiShare2 size={15} />
          </div>
      </div>
    </div>
  );
}

export default page;
