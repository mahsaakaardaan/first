import Link from 'next/link';
import React, { ReactNode } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

type Props = {
  text: string;
  href: string;
  icon?: ReactNode;
  style?: string;
};

function PageButton({ text, href, icon,style }: Props) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center justify-between border-b-[1px] border-gray-200 p-4 bg-white hover:bg-gray-100 ${style}`}>
      <div className='flex items-center gap-2'>
        {icon && icon}
        <span>{text}</span>
      </div>
      <FiChevronLeft />
    </Link>
  );
}

export default PageButton;
