import React from 'react';
import AddressForm from './AddressForm';
import { getAddressById } from '@/lib/api';


export default async function page({ params }:{params: any}) {
  const { addressId } = await params;
  const res = await getAddressById({ address_id: addressId });

  return (
    <div className="w-full">
      <AddressForm data={res[0]} address_id={addressId} />
    </div>
  );
}

