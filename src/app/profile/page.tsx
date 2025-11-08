import React from 'react';
import SideBar from './SideBar';

type Props = {};

async function page({}: Props) {
  
  
  return (
    <div className="w-full">
      <div className='md:hidden'>
        <SideBar />
      </div>
    </div>
  );
}

export default page;
