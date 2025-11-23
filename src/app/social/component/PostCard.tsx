import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import moment from 'moment-jalaali';
import { toFaDigits } from '@/lib/nums';

moment.loadPersian({ usePersianDigits: true });

type Props = { data: any };

function PostCard({ data }: Props) {
  const date = moment(data.date);
  return (
    <Link href={`/social/${data?.blog_id}`} className="w-full flex flex-col items-center cursor-pointer">
      <div className="w-[90%] h-[40vh] relative">
        <Image src={data.image} fill alt="post" />
      </div>
      <div className="w-[90%] mt-2">
        <h1 className='text-shadow-2xs'>{data.title}</h1>
        <p className='text-[0.9rem]'>
          {data.text.length > 100
            ? data.text.slice(0, 99) + '...'
            : data.text}
        </p>
        <p className='text-main-green text-[.8rem] mt-4 font-sans'>{toFaDigits(date.fromNow())}</p>
      </div>
      <div className='w-full h-[1px] bg-semi-green my-4' />
    </Link>
  );
}

export default PostCard;
