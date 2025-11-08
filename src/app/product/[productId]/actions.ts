'use server';

import { addToCard } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addToCardAction = async (body: any) => {
  const res = await addToCard(body);
};
