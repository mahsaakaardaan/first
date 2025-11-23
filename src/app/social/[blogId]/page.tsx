import { getBlogById } from '@/lib/api';
import Image from 'next/image';
import React from 'react';

type Props = {
  params: any;
};

async function page({ params }: Props) {
  const { blogId } = await params;

  const blog = await getBlogById(blogId);

  return (
    <div className="w-full">
      {blog.image && (
        <div className="w-[100%] h-[30vh] relative">
          <Image src={blog.image} alt={blog.title} fill />
        </div>
      )}
      <div className='mt-4 px-4'>
        <h1 className='text-[1.5rem]'>{blog.title}</h1>
        <p className='text-justify text-[1rem]/[1.5rem]'>{blog.text}</p>
      </div>
    </div>
  );
}

export default page;
