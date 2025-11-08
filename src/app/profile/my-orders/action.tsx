'use server';

import { getAllOrders } from '@/lib/api';

export const getAllOrdersAction = async (status = 'pending') => {
  const  data  = await getAllOrders(status);
  return data;
};
