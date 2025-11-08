import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Story() {
  return <Link href={'/story'} className='flex flex-col items-center cursor-pointer'>
    <div className="min-w-[80px] max-w-[80px] h-[80px] rounded-[80px] relative overflow-hidden border-[2px] border-pink-600">
      <Image
        src={'/person.jpg'}
        alt="story"
        width={80}
        height={80}
        className="w-full h-full object-fill"
      />
    </div>
    <span>معجزه</span>
  </Link>;
}

export default Story;
