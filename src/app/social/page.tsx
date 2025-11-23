import React from 'react';
import PostCard from './component/PostCard';
import { getAllBlogs } from '@/lib/api';

type Props = {};

async function page({}: Props) {
  const blogs = await getAllBlogs();
  return (
    <div className='flex flex-col gap-4'>
      {blogs.map((item: any, index: number) => (
        <PostCard data={item} key={index} />
      ))}
    </div>
  );
}

export default page;
