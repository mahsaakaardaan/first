'use server';

import { getOrders, userLogin } from '@/lib/api';

export async function handleLogin({
  phone_number,
  password
}: {
  phone_number: string;
  password: string;
}) {
  const res = await userLogin({ phone_number, password });
  return res;
}

export async function handleCurrentOrders() {
  const {data} = await getOrders();
  return data;
}
