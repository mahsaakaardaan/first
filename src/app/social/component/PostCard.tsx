import Image from 'next/image';
import React from 'react';

type Props = {};

function PostCard({}: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[90%] h-[40vh] relative">
        <Image src="/s3.jpg" fill alt="post" />
      </div>
      <div className='w-[90%]'>
        <h1>title</h1>
        <p>
          The caffeine in coffee works by blocking adenosine receptors
          in your brain — that’s the chemical that makes you feel
          sleepy. So your brain stays alert, focused, and ready to
          code your next feature
        </p>
      </div>
    </div>
  );
}

export default PostCard;
