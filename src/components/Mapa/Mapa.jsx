import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {
  const position = [-23.5505, -46.6333];

  return (
    <div className="h-full rounded-xl overflow-hidden border border-gray-300">
      <MapContainer 
        center={[-12.51, -47.64]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Exemplo de localização <br /> em São Paulo.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;