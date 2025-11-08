'use server';

import { updateAddress } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateAddressAction = async (
  formData: FormData,
  lat: any,
  lang: any,
  address_id: string
) => {
  const full_address = formData.get('full_address');
  const country = formData.get('country');
  const city = formData.get('city');
  const location = formData.get('location');
  const floor = formData.get('floor');
  const unit = formData.get('unit');
  const postal_code = formData.get('postal_code');

  const body = {
    full_address,
    country,
    city,
    location,
    floor,
    unit,
    postal_code,
    lat,
    lang
  };

  await updateAddress({ address_id, body });
  revalidatePath('profile/my-addresses');
  redirect('/profile/my-addresses');
};
