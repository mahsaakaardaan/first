import Nav from '@/component/general/Nav';
import Navbar from '@/component/general/Navbar';
import ProductCard from '@/component/general/ProductCard';
import Story from '@/component/general/Story';
import { getProducts } from '@/lib/api';
import { SearchProvider } from './search/components/searchContext';
import Image from 'next/image';
import Link from 'next/link';
import Slider from '@/component/general/Slider';
import { Fragment } from 'react';

const Home = async () => {
  const products = await getProducts();
  const eProduct = products.filter((item, index) => item.off > 3);

  const slides = [
    {
      image: '/automn.png',
      text: 'پاییز که می‌رسد، بوی قهوه در هوای خنک می‌پیچد و دل آرام می‌گیرد. فصلی‌ست برای فکر کردن، نوشتن، و جرعه‌ای گرما در میان سرمای آرامش‌بخش برگ‌های زرد.',
      search: 'روبوستا'
    },
    {
      image: '/cofe.png',
      text: 'کافه قهوه، جایی‌ست که عطر دانه‌های تازه برشته شده فضا را پر می‌کند و هر جرعه، لحظه‌ای آرامش و انرژی می‌بخشد. جایی برای دیدار دوستان، فکر کردن، یا فقط بودن با خود و یک فنجان گرما.',
      search: 'نیمه'
    }
  ];

  return (
    <div className="w-full">
      <Nav />
      <div className="flex overflow-x-scroll gap-2 my-4">
        {[...Array(13)].map((i, index) => (
          <Story key={index} />
        ))}
      </div>
      <Slider slides={slides} interval={4000} />
      <div className="w-full my-6 bg-purple-400 h-[30vh] flex overflow-x-scroll gap-2 items-center px-6">
        <div className="min-w-[100px] max-w-[100px] h-[25vh] line-clamp-2 flex items-center justify-center text-2xl text-white">
          شگفت انگیز ٪
        </div>
        {eProduct.map((item, index) => (
          <ProductCard key={index} data={item} isFirst={index == 0} />
        ))}
      </div>
      <div className="bg-purple-100 p-2 mt-6">
        <h1 className="mb-4 text-2xl">محصولات ویژه</h1>
        <div className="w-full grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 gap-2 place-items-center ">
          {products.map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
