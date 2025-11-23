'use client';
import api from '@/lib/apiConfig';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import moment from 'moment-jalaali';
import { toFaDigits } from '@/lib/nums';

moment.loadPersian({ usePersianDigits: true });

type Props = {};

function page({}: Props) {
  const { storyId } = useParams();
  const [story, setStory] = useState<any>({});

  const router = useRouter();
  const ref = useRef(null);
  useOutSideClick(ref, () => router.back());
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const getStoryById = async () => {
    const { data } = await api.get(`/story/${storyId}`);
    setStory(data.data[0]);
  };

  useEffect(() => {
    getStoryById();
  }, []);

  const date = moment(story.date);

  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-60 bg-[#000000cc] flex items-center justify-center">
      <div
        ref={ref}
        className="w-[320px] h-[480px] bg-white rounded-2xl flex items-center justify-between py-[10px] absolute z-50 flex-col ">
        <div className="w-[300px] h-[400px] relative rounded-2xl overflow-hidden">
          {typeof story?.image === 'string' &&
            story.image.trim() !== '' && (
              <Image src={story.image} alt="story" fill />
            )}
        </div>
        <div className='w-full my-4 px-4'>
          <p>{story?.title}</p>
          <p className='text-[12px]'>{story?.description}</p>
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
  );
}

export default page;
