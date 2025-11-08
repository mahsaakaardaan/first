import CommentCard from '@/component/general/CommentCard';
import { getProductComments } from '@/lib/api';
import React from 'react';

type Props = {
  productId: string;
};

async function CommentsSection({ productId }: Props) {
  const comments = await getProductComments(productId);
  return (
    <div>
      {comments.map((item, index) => (
        <CommentCard key={index} data={item} />
      ))}
    </div>
  );
}

export default CommentsSection;
