import PageButton from '@/component/uikit/PageButton';
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { FiMessageSquare } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

type Props = {};

function SideBar({}: Props) {
  return (
    <div className="w-full md:min-w-[35%] mt-4">
      <PageButton
        style="md:hidden"
        text="اطلاعات کاربری"
        href="/profile/my-profile"
        icon={<FiUser />}
      />
      <PageButton
        text="سفارش‌های من"
        href="/profile/my-orders"
        icon={<FiShoppingBag />}
      />
      <PageButton
        text="دیدگاه‌های من"
        href="/profile/my-comments"
        icon={<FiMessageSquare />}
      />
      <PageButton
        text="آدرس‌های من"
        href="/profile/my-addresses"
        icon={<FiMapPin />}
      />
    </div>
  );
}

export default SideBar;
