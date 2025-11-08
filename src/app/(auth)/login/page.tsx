'use client';
import Button from '@/component/uikit/Button';
import Input from '@/component/uikit/Input';
import React, { useState } from 'react';
import { handleCurrentOrders, handleLogin } from './loginAction';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';

type Props = {};

function Login({}: Props) {
  const router = useRouter();
  const [input, setInput] = useState({
    phone_number: '',
    password: ''
  });

  const searchParams = useSearchParams();
  const setUser = useUserStore(state => state.setUser)

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const loginAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleLogin({
      phone_number: input.phone_number,
      password: input.password,
    });
   
    

    if (res) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data)
      router.push(callbackUrl);
    }

    
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-[50%] w-[90%]">
        <span className="">ورود و ثبت نام</span>
        <form
          onSubmit={loginAction}
          className="flex flex-col gap-6 mt-6">
          <Input
            placeholder="۰۹---------"
            name="phone_number"
            value={input.phone_number}
            onChange={(e) =>
              setInput({ ...input, phone_number: e.target.value })
            }
          />
          <Input
            placeholder="*****"
            name="password"
            value={input.password}
            onChange={(e) =>
              setInput({ ...input, password: e.target.value })
            }
          />
          <Button type="submit" text="ورود" />
        </form>
      </div>
    </div>
  );
}

export default Login;
