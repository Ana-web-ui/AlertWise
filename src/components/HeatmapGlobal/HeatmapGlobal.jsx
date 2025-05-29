import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Dados reais de eventos climáticos (NASA EONET)
const fetchClimateEvents = async () => {
  try {
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?days=30&status=open');
    const data = await response.json();
    return data.events.map(event => [
      event.geometry[0].coordinates[1],
      event.geometry[0].coordinates[0],
      event.categories[0].id === 'severeStorms' ? 0.8 :
      event.categories[0].id === 'wildfires' ? 0.6 : 0.4
    ]);
  } catch (error) {
    console.error("Erro ao buscar dados climáticos:", error);
    return [];
  }
};

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    const heatLayer = L.heatLayer(points, { radius: 15, blur: 15 }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

const HeatmapGlobal = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const events = await fetchClimateEvents();
      setPoints(events);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <p className="text-lg font-semibold">Carregando dados climáticos...</p>
        </div>
      ) : (
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <HeatmapLayer points={points} />
        </MapContainer>
      )}
    </div>
  );
};

export default HeatmapGlobal;
