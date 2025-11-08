import Image from 'next/image';
import Price from './Price';
import Link from 'next/link';
import { ProductsType } from '@/lib/types';

export default function ProductCard({
  isFirst,
  data
}: {
  isFirst?: boolean;
  data: ProductsType;
}) {
  return (
    <Link
      href={`/product/${data?.id}`}
      className={`min-w-[200px] max-w-[200px] h-[25vh] bg-gray-50 cursor-pointer ${
        isFirst ? 'rounded-tr-[15px] rounded-br-[15px]' : ''
      }`}>
      <div
        className={`min-w-[180px] max-w-[180px] h-[15vh] relative m-auto mt-2 overflow-hidden ${
          isFirst ? 'rounded-tr-[12px]' : ''
        }`}>
        <Image src={data?.thumbnail} alt="product image" fill />
      </div>
      <div className="w-full m-1">
        <p className="text-[0.8em] truncate line-clamp-1 px-1">
          {data?.title}
        </p>
        <Price off={data.off} price={data?.variants[0].price} />
      </div>
    </Link>
  );
}
