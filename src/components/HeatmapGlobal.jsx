import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const fetchClimateEvents = async () => {
  try {
    const response = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?days=30&status=open"
    );
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error("Erro ao buscar dados climáticos:", error);
    return [];
  }
};

const HeatmapLayer = ({ events }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || events.length === 0) return;

    const points = events.map((event) => [
      event.geometry[0].coordinates[1],
      event.geometry[0].coordinates[0],
      event.categories[0].id === "severeStorms"
        ? 0.8
        : event.categories[0].id === "wildfires"
        ? 0.6
        : 0.4,
    ]);

    const heatLayer = L.heatLayer(points, { radius: 15, blur: 15 }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, events]);

  return null;
};

const HeatmapGlobal = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchClimateEvents();
      setEvents(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <p className="text-lg font-semibold">
            Carregando dados climáticos...
          </p>
        </div>
      ) : (
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          attributionControl={false}
          worldCopyJump={true}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <HeatmapLayer events={events} />
          {events.map((event, idx) => {
            const [lon, lat] = event.geometry[0].coordinates;
            const isImage = event.sources[0]?.url.endsWith(".jpg");

            return (
              <Marker key={idx} position={[lat, lon]}>
                <Popup>
                  {/* Ícone de localização no topo */}
                  <img
                    src="/local-icon.png"
                    alt="Ícone de localização"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginBottom: "5px",
                    }}
                  />
                  <br />
                  <strong>{event.title}</strong>
                  <br />
                  Categoria: {event.categories[0].title}
                  <br />
                  Fonte:{" "}
                  <a
                    href={event.sources[0]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver mais
                  </a>
                  <br />
                  {isImage && (
                    <img
                      src={event.sources[0].url}
                      alt="Evento"
                      style={{
                        width: "100px",
                        height: "auto",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default HeatmapGlobal;
