'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useTransition
} from 'react';
import Link from 'next/link';
import { FiMapPin, FiMoreVertical } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import {
  deleteAddressAction,
  setDefaultAddressAction
} from '../action';

type Props = {
  data: any;
};

function AddressCard({ data }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onDelete = async (address_id: string) => {
    await deleteAddressAction(address_id);
    setOpen(false);
  };

  const onSetDefault = async (address_id: string) => {
    await setDefaultAddressAction(address_id);
    setOpen(false);
  };

  return (
    <div
      className={`w-full p-4 rounded-2xl border-[1px] border-gray-200 mb-4 flex flex-col gap-4 relative ${
        data?.is_default ? 'text-blue-400' : ''
      }`}
      ref={menuRef}>
      {/* Top row */}
      <div className="flex items-center justify-between"> 
        <div className="flex items-center gap-2">
          <FiMapPin />
          <span>
            {data.country} / {data.city} / {data?.location}
          </span>
        </div>

        {/* Menu button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent Link navigation
            setOpen(!open);
          }}
          className="p-2 rounded-full hover:bg-gray-100">
          <FiMoreVertical />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute left-10 top-10 bg-white text-black rounded-lg shadow-md w-40 z-50">
            <button
              onClick={() => onDelete(data.address_id)}
              className="w-full px-4 py-2 hover:bg-gray-100">
              حذف آدرس
            </button>
            {!data.is_default && (
              <button
                onClick={() => onSetDefault(data.address_id)}
                className="w-full px-4 py-2 hover:bg-gray-100">
                آدرس پیشفرض
              </button>
            )}
            <button
              onClick={() =>
                router.push(
                  `/profile/edit-address/${data.address_id}`
                )
              }
              className="w-full px-4 py-2 hover:bg-gray-100">
              ویرایش آدرس
            </button>
          </div>
        )}
      </div>

      {/* Address details */}
      <p>{data.full_address}</p>
      <p>{data.postal_code}</p>
    </div>
  );
}

export default AddressCard;
