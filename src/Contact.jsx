import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const position = [28.5691, 77.2786]; 


const ContactUs = () => {
  const mapRef = useRef(null);  
  const mapInstance = useRef(null); 
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapInstance.current) {
      
      mapInstance.current = L.map(mapRef.current, {
        center: position,
        zoom: 12,
        scrollWheelZoom: false,
      });

     
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(mapInstance.current);

    
      const markerIcon = L.icon({
        iconUrl: '/path-to-your-pin-icon.png',  
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      });

     
      const marker = L.marker(position, { icon: markerIcon }).addTo(mapInstance.current);
      marker.bindPopup('farish, ka ghar').openPopup();

     
      marker._icon.classList.add('bouncing-marker');

      setMapLoaded(true);
    }

    
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();  
        mapInstance.current = null;  
      }
    };
  }, []);  
  return (
    <div className="contact-map-container" style={{ height: '500px', width: '500px', overflow: 'hidden' }}>
     
      <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius: '20px', transition: 'all 0.5s ease' }}></div>

   
      {!mapLoaded && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '24px', color: 'gray', opacity: 0.7
        }}>
          Loading map...
        </div>
      )}
    </div>
  );
};

export default ContactUs;
