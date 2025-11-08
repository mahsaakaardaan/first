import Nav from '@/component/general/Nav';
import Navbar from '@/component/general/Navbar';
import Button from '@/component/uikit/Button';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FiShare2 } from 'react-icons/fi';
import { FiBell } from 'react-icons/fi';
import { FiBarChart2 } from 'react-icons/fi';
import { FiList } from 'react-icons/fi';
import { FiStar } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import CommentCard from '@/component/general/CommentCard';
import Link from 'next/link';
import { getProductById, getProductComments } from '@/lib/api';
import { ProductsType } from '@/lib/types';
import { ColorProvider } from './components/colorContext';
import ColorVariants from './components/ColorVariants';
import SideBar from './components/SideBar';
import MobilePrice from './components/MobilePrice';
import CommentsSection from './components/CommentsSection';
import AddCommentButton from './components/AddCommentButton';

type Props = {
  params: {
    productId: number;
  };
};

async function page({ params }: Props) {
  const { productId } = params;
  const data: ProductsType = await getProductById(productId);

  return (
    <ColorProvider>
      <div className="relative">
        {/* <Navbar /> */}
        <Nav />
        <div className="grid grid-cols-4 gap-2 max-md:block relative">
          <div className="grid grid-rows-[auto_auto_auto_auto] col-span-3">
            <div className="w-full max-md:block">
              <div className="w-full  grid grid-cols-2 max-md:flex max-md:flex-col mt-8 gap-4">
                {/* first col image and actions */}
                <div className="flex  max-md:flex-col">
                  <div className="mx-2 p-2 flex flex-col gap-2 max-md:flex-row">
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl">
                      <FiHeart />
                    </div>
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl">
                      <FiShare2 />
                    </div>
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl">
                      <FiBell />
                    </div>
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl">
                      <FiBarChart2 />
                    </div>
                    <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl">
                      <FiList />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="w-full max-md:h-[40vh]  md:aspect-square relative">
                      <Image
                        src={data?.thumbnail}
                        alt="product image"
                        fill
                      />
                    </div>
                    <div className="flex mt-4 gap-2 max-md:mr-4">
                      {[...Array(4)].map((i, index) => (
                        <div
                          key={index}
                          className="w-[50px] aspect-square relative border-[2px] border-purple-300 rounded-xl overflow-hidden">
                          <Image
                            src={data?.thumbnail}
                            alt="product images"
                            fill
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* second col --variants and information */}
                <div className=" flex flex-col justify-between max-md:p-4">
                  <div>
                    <p className="text-purple-300">
                      {data.fa_name} / {data.fa_s_name}
                    </p>
                    {/* <div>کیف دوشی زنانه پرتیزس مدل X4 - 157</div> */}
                    <p>{data?.title}</p>
                    {/* separator */}
                    <div className="w-full h-[1px] bg-gray-300 my-3" />
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <FiStar />
                        <span>۴.۵</span>
                      </div>
                      <Link
                        href={'#comments'}
                        className="flex items-center gap-2 bg-gray-300 py-1 px-3 rounded-2xl">
                        <FiMessageCircle />
                        <span>۵ دیدگاه</span>
                      </Link>
                    </div>
                    <ColorVariants variants={data?.variants} product={data} />
                  </div>
                  {/* footer of top section */}
                  <div className="flex items-center gap-2">
                    <div className="w-full h-[1px] bg-gray-300 " />
                    <div className="border-[1px] border-black py-1 px-8 text-nowrap">
                      همه ویژگی‌ها
                    </div>
                    <div className="w-full h-[1px] bg-gray-300 " />
                  </div>
                </div>
                {/* third col --side bar */}
              </div>
              {/* <SideBar /> */}
            </div>
            <div className="p-4 mt-6 border-b-[1px] border-gray-200">
              <span>معرفی</span>
              <p>{data.description}</p>
            </div>
            <div className="p-4 my-6" id="comments">
              <div className="mb-6">
                <span>دیدگاه‌ها</span>
              </div>
              <div className="flex max-md:flex-col gap-4 relative">
                <div className="w-[30%] h-[30%] max-md:w-full md:sticky md:top-4 p-4 bg-white border-[1px] border-gray-300 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <FiStar />
                    <span>۴.۵</span>
                  </div>
                  <AddCommentButton />
                </div>
                <Suspense fallback={<p>loading</p>}>
                <div className="w-full flex-2/3">
                  <CommentsSection productId={productId} />
                </div>
                </Suspense>
              </div>
            </div>
            {/* questions */}
            {/* <div className="p-4 my-6 border-b-[1px] border-gray-200">
            <div>
              {[...Array(13)].map((i, index) => (
                <CommentCard key={index} />
              ))}
            </div>
          </div> */}
          </div>
          <SideBar data={data} />
        </div>
        <MobilePrice data={data} />
      </div>
    </ColorProvider>
  );
}

export default page;
