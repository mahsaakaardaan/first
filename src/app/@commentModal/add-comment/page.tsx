'use client';
import { useColor } from '@/app/product/[productId]/components/colorContext';
import Button from '@/component/uikit/Button';
import Input from '@/component/uikit/Input';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useComment } from './commentContext';
import { addCommentAction } from './action';
import { useCommentStore } from '@/lib/store/CommentStore';
import { FiImage } from 'react-icons/fi';

type Props = {};

function page({}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const ref = useRef(null);
  const commentData = useCommentStore((state) => state.commentData);
  const [file, setFile] = useState<File | null>(null);

  useOutSideClick(ref, () => router.back());
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-40 bg-[#000000cc] flex items-center justify-center">
      <div
        ref={ref}
        className="w-[520px] max-md:w-[320px] h-[480px] bg-white rounded-2xl p-4  ">
        <form
          className="flex flex-col justify-between h-full"
          action={(e) => {
            addCommentAction(
              e,
              commentData?.product?.id,
              commentData?.variant?.id,
              `/product/${commentData?.product?.id}`
            );
            setTimeout(() => {
              router.back()
            },1000)
          }}>
          <div>
            <div className="flex items-start gap-4 mb-4">
              {commentData?.product?.thumbnail && (
                <div className="w-[100px] h-[100px] overflow-hidden relative">
                  <Image
                    src={commentData?.product?.thumbnail}
                    alt="gggg"
                    fill
                  />
                </div>
              )}
              <div>
                <p>{commentData?.product?.title}</p>
                <>
                  {commentData?.variant?.color == 'weight' ? <div className='py-1 px-4 bg-main-green text-white rounded-2xl w-fit'>{commentData?.variant?.hex}</div> : <div
                    className="w-[20px] h-[20px] rounded-full border-[1px] border-gray-200 mt-4"
                    style={{
                      backgroundColor: commentData?.variant?.hex
                    }}
                  />}
                </>
              </div>
            </div>
            {file && (
              <div className="w-[200px] h-[100px] relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="image"
                  fill
                />
              </div>
            )}
            <label
              htmlFor="imageUpload"
              className="w-[30px] h-[30px] rounded-full bg-semi-green flex items-center justify-center my-4">
              <FiImage />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              name="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Input
              name="comment"
              placeholder="نظر خود را در مورد این کالا با دیگران به اشتراک بگذارید..."
            />
          </div>
          <Button text="ثبت دیدگاه" width="w-fit px-4" />
        </form>
      </div>
    </div>
  );
}

export default page;
