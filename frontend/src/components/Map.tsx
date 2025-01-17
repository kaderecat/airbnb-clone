/* eslint-disable @typescript-eslint/ban-ts-comment */
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,

  iconRetinaUrl: markerIcon2x,

  shadowUrl: markerShadow,
});

interface MapProps {
  center: L.LatLngExpression;
}

const Map = ({ center }: MapProps) => {
  return (
    <MapContainer
      id="asd"
      center={center as L.LatLngExpression}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={center} />}
    </MapContainer>
  );
};

export default Map;
