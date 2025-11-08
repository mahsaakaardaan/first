import Button from '@/component/uikit/Button';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

type Props = {
  data: any
};

function OrderProductCard({ data }: Props) {
  // TODO: add comment from here
  // const router = useRouter();
  // const { setCommentData } = useComment();
  return (
    <div className="w-full p-4 border-t-[1px] border-t-gray-200">
      <Link href={`/product/${data.product_id}`}>
        <div className="flex items-start gap-4">
          <div className="w-[100px] h-[100px] overflow-hidden relative">
            <Image
              src={data.order_product.thumbnail}
              alt={data.order_product.title}
              fill
            />
          </div>
          <div className="flex flex-col justify-between h-[100px]">
            <p>{data.order_product.title}</p>
            {data.order_variant.color == 'weight' ? (
              <div>{data.order_variant.hex}</div>
            ) : (
              <div
                className="w-[20px] h-[20px] rounded-full border-[1px] border-gray-200"
                style={{ backgroundColor: data.order_variant.hex }}
              />
            )}
            <div>{data.price_is} تومان</div>
          </div>
        </div>
      </Link>
      <Button
        text="افزودن کامنت"
        width="w-fill px-4 mt-4"
        // onClick={() => {
        //   setCommentData({
        //     product: data.order_product,
        //     variant: data.order_variant
        //   });
        //   router.push('/add-comment');
        // }}
      />
    </div>
  );
}

export default OrderProductCard;
