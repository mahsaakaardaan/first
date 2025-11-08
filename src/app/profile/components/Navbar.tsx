import Link from 'next/link';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { FiBell } from 'react-icons/fi';
import { FiHeadphones } from 'react-icons/fi';

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="w-full flex items-center justify-between">
      <Link href={'/'}>
        <FiSettings />
      </Link>
      <div className="flex items-center gap-4">
        <FiBell />
        <FiHeadphones />
      </div>
    </div>
  );
}

export default Navbar;
