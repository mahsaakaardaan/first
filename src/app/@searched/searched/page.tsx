'use client';
import { useSearch } from '@/app/search/components/searchContext';
import SearchedItemInModal from '@/component/general/SearchedItemInModal';
import api from '@/lib/apiConfig';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Props = {};

function page({}: Props) {
  const router = useRouter();
  const { searched } = useSearch();
  const [searchValue, setSearchValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const ref = useRef(null);
  const pathname = usePathname();
  useOutSideClick(ref, () => router.back());
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const getProducts = async () => {
    if (searched?.length !== 0) {
      const { data } = await api.get('/product/search', {
        params: {
          s: searchValue
        }
      });

      data?.data?.length > 3
        ? setSearchedProducts(data.data.slice(0, 3))
        : setSearchedProducts(data.data);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearchValue(searched);
    }, 1000);
    return () => clearTimeout(delaySearch);
  }, [searched]);

  useEffect(() => {
    getProducts();
  }, [searchValue]);

  if (pathname !== '/searched') return null;

  return (
    <div className="w-screen h-screen absolute top-15 left-0 z-40 flex justify-center">
      <div
        ref={ref}
        className="w-[70%] bg-white shadow-2xl rounded-2xl flex items-center justify-between py-[10px] absolute z-50 flex-col ">
        <div className="w-full">
          {searchedProducts.map((item, index) => (
            <SearchedItemInModal key={index} data={item} />
          ))}
        </div>
        <button
          className="text-blue-400 w-full flex justify-center py-2 items-center"
          onClick={() => router.push(`/search?s=${searched}`)}>
          <div>همه محصولات</div>
        </button>
      </div>
    </div>
  );
}

export default page;
