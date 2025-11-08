'use client';
import React, { useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl
});

type Props = {
  address: any;
  setAddress: React.Dispatch<React.SetStateAction<any>>;
};

function Map({ address, setAddress }: Props) {
  // const [address, setAddress] = useState(null);
  const position: [number, number] = [35.6997, 51.338];

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        map.locate();
        setAddress(e.latlng);
      }
      // locationfound(e) {
      //   setAddress(e.latlng)
      //   map.flyTo(e.latlng, map.getZoom())
      // },
    });

    return address === null ? null : (
      <Marker position={address}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div className="w-full h-[30vh] relative overflow-hidden">
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default Map;
