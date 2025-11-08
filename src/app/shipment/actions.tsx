'use server';

import {
  countCurrentOrder,
  deleteCurrentOrderById,
  submitOrder
} from '@/lib/api';
import { OrderProductsType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const submitOrderAction = async (body: OrderProductsType) => {
  const res = await submitOrder(body);
  revalidatePath('/shipment');
  return res;
};

export const deleteCurrentOrderByIdAction = async (
  current_order_id: string
) => {
  await deleteCurrentOrderById(current_order_id);
  revalidatePath('/shipment');
};

export const countCurrentOrderAction = async (
  current_order_id: string,
  quantity: number
) => {
  await countCurrentOrder(current_order_id, quantity);
};
