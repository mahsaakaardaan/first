import React from 'react';
import CommentCard from './components/CommentCard';
import { getMyComments } from '@/lib/api';

type Props = {};

async function page({}: Props) {
  const myComments = await getMyComments();

  return (
    <div className="p-4">
      <span>دیدگاه‌های من</span>
      <div>
        {myComments.map((item, index) => (
          <CommentCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default page;
