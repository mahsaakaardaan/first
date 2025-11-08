'use client';
import { ProductsType, VariantType } from '@/lib/types';
import React, { Fragment, useEffect } from 'react';
import { useColor } from './colorContext';
import { useCommentStore } from '@/lib/store/CommentStore';

type Props = {
  variants: VariantType[];
  product: ProductsType;
};

function ColorVariants({ variants, product }: Props) {
  const { color, setColor } = useColor();
  const setCommentData = useCommentStore(
    (state) => state.setCommentData
  );

  useEffect(() => {
    setCommentData((prev) => ({ ...prev, product: product }));
    if (!color) {
      setColor(variants[0]);
      setCommentData((prev) => ({ ...prev, variant: variants[0] }));
    }
  }, []);
  return (
    <div className="mt-6">
      {variants[0]?.color == 'weight' ? (
        <span>وزن</span>
      ) : (
        <span>رنگها</span>
      )}
      <div className="flex items-center gap-2 my-4">
        {variants.map((item, index) => (
          <Fragment key={index}>
            {item.color == 'weight' ? (
              <div
                onClick={() => {
                  setColor(item);
                  setCommentData((prev) => ({
                    ...prev,
                    variant: item
                  }));
                }}
                key={index}
                className={`bg-purple-200 py-1 px-4 rounded-2xl cursor-pointer ${
                  color?.hex == item.hex
                    ? 'border-[2px] border-purple-400'
                    : ''
                }`}>
                {item.hex}
              </div>
            ) : (
              <div
                onClick={() => {
                  setColor(item);
                  setCommentData((prev) => ({
                    ...prev,
                    variant: item
                  }));
                }}
                key={index}
                className={`w-[30px] h-[30px] rounded-full cursor-pointer border-[1px] border-gray-200 ${
                  color?.color == item.color
                    ? 'border-[5px] border-purple-400'
                    : ''
                }`}
                style={{ backgroundColor: item?.hex }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ColorVariants;
