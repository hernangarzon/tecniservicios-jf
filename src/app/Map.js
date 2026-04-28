"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para iconos de Leaflet
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

function LocationMarker({ posicion, setPosicion }) {
  const map = useMapEvents({
    click(e) {
      setPosicion(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return posicion ? <Marker position={posicion} /> : null;
}

function MapRecenter({ posicion }) {
  const map = useMapEvents({});
  useEffect(() => {
    if (posicion) map.flyTo(posicion, map.getZoom());
  }, [posicion, map]);
  return null;
}

export default function MapComponent({ posicion, setPosicion }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Si no está montado en el cliente, no renderizamos NADA de Leaflet
  if (!mounted) return <div className="h-full w-full bg-[#0D0F12]" />;

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        // El 'key' dinámico basado en un ID único es la clave para evitar el "reused container"
        key="ferrered-map-v1"
        center={posicion} 
        zoom={15} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', position: 'absolute', inset: 0 }}
        zoomControl={false}
      >
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
          attribution='&copy; CARTO'
        />
        <LocationMarker posicion={posicion} setPosicion={setPosicion} />
        <MapRecenter posicion={posicion} />
      </MapContainer>
    </div>
  );
}