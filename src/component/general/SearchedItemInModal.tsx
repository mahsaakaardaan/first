'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

type Props = {};

function SearchedItemInModal({ data }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/product/${data.id}`);
        document.body.style.overflow = '';
      }}
      className="w-full border-b-[1px] border-b-gray-200 p-4 cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="relative w-[30px] h-[30px] rounded-2xl overflow-hidden">
          <Image src={data.thumbnail} alt={data.title} fill />
        </div>
        <span>{data.title}</span>
      </div>
    </div>
  );
}

export default SearchedItemInModal;
