import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons missing in Leaflet + Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

export default function OffersMap({ offers, onMarkerClick, userLocation }) {
  const { lang, t } = useLanguage();
  const defaultCenter = [21.5433, 39.1728]; // Default to Jeddah

  const nameField = `restaurantName_${lang}`;

  // Find priority center: User Location > First Offer > Default Jeddah
  const initialCenter = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : (offers.length > 0 ? [offers[0].coordinates.lat, offers[0].coordinates.lng] : defaultCenter);

  return (
    <div style={{ flex: 1, height: '100%', minHeight: '600px', width: '100%', position: 'relative', borderRadius: 'inherit', overflow: 'hidden', zIndex: 1 }}>
      <MapContainer center={initialCenter} zoom={12} style={{ height: '100%', minHeight: '600px', width: '100%', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={initialCenter} />
        
        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
              <div style={{ padding: '0.25rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{lang === 'ar' ? 'موقعك الحالي' : 'Your Location'}</h4>
              </div>
            </Popup>
          </Marker>
        )}
        
        {offers.map((offer) => (
          <Marker 
            key={offer.id} 
            position={[offer.coordinates.lat, offer.coordinates.lng]}
            eventHandlers={{
              click: () => onMarkerClick(offer)
            }}
          >
            <Popup>
              <div style={{ minWidth: '150px', padding: '0.25rem' }}>
                <img 
                  src={offer.offerImageUrl} 
                  alt={offer[nameField]} 
                  style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }}
                />
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{offer[nameField]}</h4>
                <p style={{ margin: '0', fontSize: '0.8rem', color: '#666' }}>{offer.category}</p>
                <button 
                  onClick={() => onMarkerClick(offer)}
                  style={{ 
                    marginTop: '0.5rem', 
                    width: '100%', 
                    padding: '0.5rem', 
                    background: '#ff4757', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {t('view_details')}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
