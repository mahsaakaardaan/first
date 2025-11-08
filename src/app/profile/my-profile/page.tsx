'use client';
import Button from '@/component/uikit/Button';
import Input from '@/component/uikit/Input';
import React, { useEffect, useState } from 'react';
import { updateProfileAction } from './actions';

type Props = {};

function page({}: Props) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const res = localStorage.getItem('user');
    if (res) {
      setUser(JSON.parse(res));
    }
  }, []);

  if (!user) return null; // or loading spinner

  return (
    <form
      action={(e) => {
        updateProfileAction(e);
        const name = e.get('name');
        const phone_number = e.get('phone_number');
        const national_id = e.get('national_id');
        const password = e.get('password');
        const newUser = { name, phone_number, national_id, password };
        localStorage.setItem('user', JSON.stringify(newUser));
      }}
      className="w-full md:w-[60%] mx-4 flex flex-col gap-4 justify-center">
      <Input
        placeholder="نام خانوادگی"
        defaultValue={user.name}
        name="name"
      />
      <Input
        placeholder="شماره تلفن"
        name="phone_number"
        defaultValue={user.phone_number}
      />
      <Input
        placeholder="کدملی"
        name="national_id"
        defaultValue={user.national_id}
      />
      <Input
        placeholder="رمز"
        name="password"
        defaultValue={user.password}
      />
      <Button text="ثبت" type="submit" />
    </form>
  );
}

export default page;
