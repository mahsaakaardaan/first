'use client';
import React, { useEffect, useState } from 'react';
import MapWrapper from '../../add-address/components/MapWrapper';
import Input from '@/component/uikit/Input';
import Button from '@/component/uikit/Button';
import { updateAddressAction } from './actions';

type Props = {
  data: any;
  address_id: string;
};

function AddressForm({ data, address_id }: Props) {
  const [address, setAddress] = useState<any>(null);

  useEffect(() => {
    setAddress([data.lat, data.lang]);
  }, []);

  return (
    <div className="w-full">
      <MapWrapper {...{ address, setAddress }} />
      <form
        className="mt-6 w-full"
        action={(e) =>
          updateAddressAction(
            e,
            address?.lat,
            address?.lng,
            address_id
          )
        }>
        <p>جزيیات آدرس</p>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="آدرس کامل"
            name="full_address"
            defaultValue={data?.full_address}
          />
          <div className="flex items-center gap-4">
            <Input
              placeholder="استان"
              name="country"
              defaultValue={data.country}
            />
            <Input
              placeholder="شهر"
              name="city"
              defaultValue={data.city}
            />
          </div>
          <Input
            placeholder="محله"
            name="location"
            defaultValue={data.location}
          />
          <div className="flex items-center gap-4">
            <Input
              placeholder="طبقه"
              name="floor"
              defaultValue={data.floor}
            />
            <Input
              placeholder="پلاک"
              name="unit"
              defaultValue={data.unit}
            />
          </div>
          <Input
            placeholder="کدپستی"
            name="postal_code"
            defaultValue={data.postal_code}
          />
        </div>
        <Button type="submit" text="ثبت" />
      </form>
    </div>
  );
}

export default AddressForm;
