import React from 'react';
import NavbarAddress from './NavbarAddress';
import NavButton from '../uikit/NavButton';
import { FiBarChart2 } from 'react-icons/fi';
import { FiPercent } from 'react-icons/fi';
import { getAllCategories } from '@/lib/api';
import HomeCategory from './HomeCategory';
import { CategoryType } from '@/lib/types';

const Nav = async () => {
  const categories: CategoryType[] = await getAllCategories();
  return (
    <div className="flex items-center justify-between px-3 border-b-[1px] border-b-solid border-b-gray-300">
      {/* uls */}
      <div className="flex items-center max-md:hidden">
        <NavButton text="دسته بندی کالاها" >
          <HomeCategory data={categories} />
        </NavButton>
        <NavButton
          text="پرفروش‌ترین‌ها"
          icon={<FiBarChart2 />}
          textStyle="text-[0.8em]"
        />
        <NavButton
          text="شگفت‌انگیزها"
          icon={<FiPercent />}
          textStyle="text-[0.8em]"
        />
      </div>
      {/* address */}
      <NavbarAddress />
    </div>
  );
};

export default Nav;
