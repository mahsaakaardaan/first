'use client';
import React, { useState } from 'react';
import MapWrapper from './components/MapWrapper';
import Input from '@/component/uikit/Input';
import Button from '@/component/uikit/Button';
import { AddAddressAction } from './actions';

type Props = {};

function page({}: Props) {
  const [address, setAddress] = useState(null);
  return (
    <div className="w-full">
      <MapWrapper {...{ address, setAddress }} />
      <form
        className="mt-6 w-full"
        action={(e) =>
          AddAddressAction(e, address?.lat, address?.lng)
        }>
        <p>جزيیات آدرس</p>
        <div className="flex flex-col gap-4 mt-4">
          <Input placeholder="آدرس کامل" name="full_address" />
          <div className="flex items-center gap-4">
            <Input placeholder="استان" name="country" />
            <Input placeholder="شهر" name="city" />
          </div>
          <Input placeholder="محله" name="location" />
          <div className="flex items-center gap-4">
            <Input placeholder="طبقه" name="floor" />
            <Input placeholder="پلاک" name="unit" />
          </div>
          <Input placeholder="کدپستی" name="postal_code" />
        </div>
        <Button type="submit" text="ثبت" />
      </form>
    </div>
  );
}

export default page;
