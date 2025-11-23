'use client';
import React, { useEffect, useRef, useState } from 'react';
import Input from '../uikit/Input';
import { useSearch } from '@/app/search/components/searchContext';
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import SearchedItemInModal from './SearchedItemInModal';
import api from '@/lib/apiConfig';
import useSearchRequest from '@/lib/hooks/useSearchRequest';

type Props = {};

function NavBarSearch({}: Props) {
  const inputRef = useRef<any>(null);
  const router = useRouter();
  const { searched, setSearched } = useSearch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalOpen = searchParams.get('search') == '1';
  const [searchValue, setSearchValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const searchRequest = useSearchRequest();

  const openModal = () => {
    router.push(`${pathname}?search=1`, { shallow: true });
  };

  const closeModal = () => {
    router.push(pathname, { shallow: true });
  };

  useOutSideClick(inputRef, () => closeModal());
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه پشت modal
    } else {
      document.body.style.overflow = ''; // بازگشت اسکرول
    }
    return () => {
      document.body.style.overflow = ''; // cleanup
    };
  }, [modalOpen]);

  const getProducts = async () => {
    if (searched?.length !== 0) {
      const data1 = await api.get('/product/search', {
        params: {
          s: searchValue
        }
      });

      const data = data1.data;

      data?.data?.length > 3
        ? setSearchedProducts(data.data.slice(0, 3))
        : setSearchedProducts(data.data);
    }
    // const result = await searchRequest(searched);
    // setSearchedProducts(result);
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

  return (
    <div className="w-full">
      <Input
        value={searched}
        onChange={async (e) => {
          setSearched(e.target.value);
          //   const result = await searchRequest(e.target.value);
          //   setSearchedProducts(result);
        }}
        isSearch={true}
        onFocus={openModal}
      />
      {modalOpen && (
        <div className="w-screen h-screen absolute top-0 left-0 z-60 bg-[#00000000] flex pt-15 justify-center">
          <div className="w-screen h-[100vh] absolute top-15 left-0 z-60 bg-[#00000077] flex pt-2 justify-center">
            <div
              ref={inputRef}
              className="w-[80%] bg-white rounded-2xl flex items-center justify-between py-[10px] absolute z-50 flex-col ">
              <div className="w-full">
                {searchedProducts?.map((item, index) => (
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
        </div>
      )}
    </div>
  );
}

export default NavBarSearch;
