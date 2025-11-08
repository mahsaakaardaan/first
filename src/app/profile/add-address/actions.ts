'use server';
import { addNewAddress, setDefaultAddress } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const AddAddressAction = async (
  formData: FormData,
  lat: any,
  lng: any
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
    lat: lat,
    lang: lng
  };

  const data = await addNewAddress(body);
  await setDefaultAddress(data.data);

  revalidatePath('profile/my-addresses');
  redirect('/profile/my-addresses');
};
