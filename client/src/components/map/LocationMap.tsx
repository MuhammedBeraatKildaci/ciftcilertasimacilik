import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';

interface Location {
  coordinates: [number, number];
  title: string;
  description?: string;
}

interface LocationMapProps {
  locations: Location[];
  center: [number, number];
  zoom: number;
  height?: string | number;
}

// Leaflet marker icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const LocationMap: React.FC<LocationMapProps> = ({
  locations,
  center,
  zoom,
  height = 400,
}) => {
  return (
    <Box sx={{ height, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coordinates}>
            <Popup>
              <div>
                <h3>{location.title}</h3>
                {location.description && <p>{location.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}; 