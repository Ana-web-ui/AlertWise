import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const localizacaoIcone = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const Mapa = ({ dadosClima }) => {
  const lat = dadosClima?.coord?.lat;
  const lon = dadosClima?.coord?.lon;

  const position = lat && lon ? [lat, lon] : [-12.51, -47.64]; // posição default

  return (
    <div className="h-full rounded-xl overflow-hidden border border-gray-300">
      <MapContainer
        center={position}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position} icon={localizacaoIcone}>
          <Popup>
            {dadosClima?.weather?.[0]
              ? `${dadosClima.name}: ${dadosClima.weather[0].description}, ${dadosClima.main.temp}°C`
              : "Local padrão"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default Mapa;
