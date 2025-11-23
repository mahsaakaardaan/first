'use client';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import Image from 'next/image';
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { FiHeart } from 'react-icons/fi';
import moment from 'moment-jalaali';
import { toFaDigits } from '@/lib/nums';

moment.loadPersian({ usePersianDigits: true });

function Story({ data }: { data: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalOpen = searchParams.get('story_id') == data.story_id;

  const openModal = () => {
    router.push(`${pathname}?story_id=${data.story_id}`, { shallow: true });
  };

  const closeModal = () => {
    router.push(pathname, { shallow: true });
  };

  const ref = useRef(null);
  useOutSideClick(ref, () => closeModal());
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden"; // جلوگیری از اسکرول صفحه پشت modal
    } else {
      document.body.style.overflow = ""; // بازگشت اسکرول
    }
    return () => {
      document.body.style.overflow = ""; // cleanup
    };
  }, [modalOpen]);

  const date = moment(data.date);

  return (
    <div>
      <button
        onClick={openModal}
        className="flex flex-col items-center cursor-pointer">
        <div className="min-w-[80px] max-w-[80px] h-[80px] rounded-[80px] relative overflow-hidden border-[2px] border-pink-600">
          <Image
            src={data.image}
            alt="story"
            width={80}
            height={80}
            className="w-full h-full object-fill"
          />
        </div>
        <span className='text-[12px]'>{data.title.length > 11 ? data.title.slice(0,10)+"..." : data.title}</span>
      </button>
      {modalOpen && (
        <div className="w-screen h-screen absolute top-0 left-0 z-60 bg-[#00000077] flex items-center justify-center">
        <div
          ref={ref}
          className="w-[320px] h-[480px] bg-white rounded-2xl flex items-center justify-between py-[10px] absolute z-50 flex-col ">
          <div className="w-[300px] h-[400px] relative rounded-2xl overflow-hidden">
            {typeof data?.image === 'string' &&
              data.image.trim() !== '' && (
                <Image src={data.image} alt="data" fill />
              )}
          </div>
          <div className='w-full my-4 px-4'>
            <p>{data?.title}</p>
            <p className='text-[12px]'>{data?.description}</p>
          </div>
          <div className="w-full px-4 flex justify-end mb-3">
            <FiHeart size={20} />
            {/* <FiShare2 size={15} /> */}
          </div>
          <div className='w-full py-1 px-4'>
          <p className='text-[12px] text-semi-green font-sans'>{toFaDigits(date.fromNow())}</p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Story;
