'use client';
import React, { ReactNode, useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';

type Props = {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  textStyle?: string;
  children?: ReactNode;
};
 
function NavButton({
  text,
  icon,
  onClick,
  textStyle,
  children
}: Props) {
  return (
    <div className="group">
      <div
        onClick={onClick}
        className='flex items-center h-[50px] px-3 gap-1 cursor-pointer hover:before:content-[""] hover:before:absolute hover:before:h-[2px] 
    hover:before:w-full hover:before:bg-semi-green hover:before:bottom-0 hover:before:animate-expand relative'>
        {/* icon */}
        {icon ? icon : <FiAlignJustify />}
        <span className={`${textStyle ? textStyle : ''}`}>
          {text}
        </span>
      </div>
      <div className="hidden group-hover:block">{children}</div>
    </div>
  );
}

export default NavButton;
