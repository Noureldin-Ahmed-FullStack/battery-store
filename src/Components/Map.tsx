import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import icon from "leaflet/dist/images/marker-icon.png";
import L, { LatLngExpression } from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import 'leaflet/dist/leaflet.css';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;
export default function Map() {
  const [position, _setPosition] = useState([30, 31]);
  const LocationMarker = () => {
    useMapEvents({
        click(_e) {
            // setPosition([e.latlng.lat, e.latlng.lng]);
            window.open('https://maps.google.com/maps?q=Mena+palace', "_blank");
            // console.log(`Clicked coordinates: ${e.latlng.lat}, ${e.latlng.lng}`);
        },
    });
    
    return position === null ? null : (
      <Marker position={position as LatLngExpression}></Marker>
  );
};

  return (
    <div className='z-0 position-relative rounded-4 overflow-hidden'>
      <MapContainer center={position as LatLngExpression} zoom={13} style={{ height: '300px', width: '100%' }}>
        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}
