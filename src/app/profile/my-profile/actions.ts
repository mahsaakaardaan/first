'use server';

import { updateProfile } from '@/lib/api';
import { redirect } from 'next/navigation';

export const updateProfileAction = async (formData: FormData) => {
  const name = formData.get('name');
  const phone_number = formData.get('phone_number');
  const national_id = formData.get('national_id');
  const password = formData.get('password');

  const body = {
    name,
    phone_number,
    national_id,
    password
  };

  const res = await updateProfile({ body });
  redirect('/profile')
};
