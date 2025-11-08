'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function MapWrapper({ address, setAddress }) {
  return (
    <Suspense fallback={<p>Loading map...</p>}>
      <Map {...{ address, setAddress }} />
    </Suspense>
  );
}
