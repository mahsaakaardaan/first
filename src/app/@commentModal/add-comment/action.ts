'use server';
import { addComment } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addCommentAction = async (
  formData: FormData,
  product_id: string,
  variant_id: string,
  path: string
) => {
  const comment = formData.get('comment');
  const file = formData.get('file') || null;

  const data = new FormData();
  data.append('product_id', product_id);
  data.append('variant_id', variant_id);
  if (comment) {
    data.append('comment', comment);
  }
  if (file) {
    data.append('file', file);

    
  }

  await addComment(data);
  revalidatePath(path);
  redirect(path);
};
