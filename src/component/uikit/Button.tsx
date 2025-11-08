'use client';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

type Props = {
  text: string;
  children?: ReactNode;
  onClick?: () => void;
  width?: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  text,
  children,
  onClick,
  width = 'w-[90%]',
  href,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      onClick={() => {
        if (href) {
          redirect(href);
        } else {
          onClick && onClick();
        }
      }}
      className={`${width} py-2 bg-purple-300 rounded-xl my-2 cursor-pointer`}>
      {text}
      {children}
    </button>
  );
}

export default Button;
