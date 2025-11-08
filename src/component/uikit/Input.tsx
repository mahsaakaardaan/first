'use client';
import React, { forwardRef } from 'react';
import { FiSearch } from 'react-icons/fi';

type Props = {
  isSearch?: boolean;
  placeholder?: string;
  ref?: any;
  onClick?: () => void;
  onChange?: () => void;
  value?: string;
  showButton?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  isSearch = false,
  placeholder,
  onChange,
  value,
  ref,
  onClick,
  showButton = false,
  ...rest
}: Props) {
  return (
    <div
      ref={ref}
      className="w-[90%] h-10 bg-gray-200 flex items-center py-2 px-6 rounded-[10px] relative overflow-hidden">
      {isSearch && <FiSearch className="absolute right-2" />}
      <input
        {...rest}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : 'جستجو'}
        className="w-full h-full absolute top-0 right-3 pr-5 outline-none"
      />
      {showButton && (
        <div
          onClick={onClick}
          className="absolute left-3.5 cursor-pointer">
          جستجو
        </div>
      )}
    </div>
  );
}

export default Input;
