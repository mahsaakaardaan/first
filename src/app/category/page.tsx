import HomeCategory from '@/component/general/HomeCategory';
import MobileBackNav from '@/component/general/MobileBackNav';
import Navbar from '@/component/general/Navbar';
import { getAllCategories } from '@/lib/api';
import React from 'react';

type Props = {};

const page = async ({}: Props) => {
  const categories = await getAllCategories();
  return (
    <div>
      <div className='px-2'>
        </div>
      <HomeCategory data={categories} />
    </div>
  );
};

export default page;
