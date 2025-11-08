'use client';
import Button from '@/component/uikit/Button';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

function AddCommentButton({}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      text="ثبت دیدگاه شما"
      onClick={() => {
        const isLoggedIn = document.cookie.includes('access_token=');
        if (!isLoggedIn) {
          router.push(
            `/login?callbackUrl=${encodeURIComponent(pathname)}`
          );
        } else {
          router.push(`/add-comment`);
        }
      }}
    />
  );
}

export default AddCommentButton;
