import React from 'react';
import SideBar from './components/SideBar';
import { getAllCategories, getSearchedProducts } from '@/lib/api';
import { ProductsType, SubCategoryType } from '@/lib/types';
import SProductCard from './components/SProductCard';

type Props = {
  searchParams: { [key: string]: string | undefined };
};

async function page({ searchParams }: Props) {
  const { category, subCategory, q} = await searchParams;

  

  

  
  const categories = await getAllCategories();

  const chosenSub = categories
    .flatMap((cat) => cat.subs)
    .find((sub) => sub.fa_s_name == subCategory);

  const chosenCategory = categories.find(
    (c) => c.fa_name == category
  );
  const products: ProductsType[] = await getSearchedProducts({
    subCategoryId: chosenSub?.id,
    categoryId: chosenCategory?.id,
    query: q,
  });

  return (
    <div className="grid grid-cols-[1fr_4fr] gap-4 max-md:block p-4">
      {/* sidebar */}
      <div>
        <SideBar />
      </div>
      {/* products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item, index) => (
          <SProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default page;
