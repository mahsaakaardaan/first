'use server';

import { deleteAddress, setDefaultAddress } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export const deleteAddressAction = async (address_id: string) => {
  const data = await deleteAddress(address_id);
  revalidatePath('/profile/my-addresses');

};

export const setDefaultAddressAction = async (address_id: string) => {
  const data = await setDefaultAddress(address_id);
  revalidatePath('/profile/my-addresses');
};
