import React from 'react';
import AddressForm from './AddressForm';
import { getAddressById } from '@/lib/api';

type Props = {};

async function page({ params }: Props) {
  const { addressId } = await params;
  const res = await getAddressById({ address_id: addressId });

  return (
    <div className="w-full">
      <AddressForm data={res[0]} address_id={addressId} />
    </div>
  );
}

export default page;
