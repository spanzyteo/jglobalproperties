/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, memo, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Property {
  id: string | number;
  title: string;
  location: string;
  state: string;
  price?: number;
  units?: Array<{ price: string }>;
}

interface MapProps {
  properties: Property[];
}

const Map: React.FC<MapProps> = ({ properties }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Memoize coordinate objects to prevent recreating them on every render
  const stateCoordinates = useMemo<Record<string, [number, number]>>(
    () => ({
      Lagos: [6.5244, 3.3792],
      Abuja: [9.0765, 7.3986],
      Rivers: [4.8156, 7.0498],
      Enugu: [6.5244, 7.5105],
      "Port Harcourt": [4.8156, 7.0498],
    }),
    []
  );

  const locationCoordinates = useMemo<Record<string, [number, number]>>(
    () => ({
      "Lekki Phase 1": [6.4474, 3.5423],
      "Ibeju-Lekki": [6.4667, 3.8667],
      "Victoria Island": [6.4281, 3.4219],
      Gwarinpa: [9.1079, 7.4094],
      Epe: [6.5833, 3.9833],
      Ikeja: [6.6018, 3.3515],
      Badagry: [6.4167, 2.8833],
      Surulere: [6.5028, 3.3611],
      "Wuse II": [9.0579, 7.4951],
      "Oniru Beach": [6.4395, 3.4333],
      Rumuokoro: [4.8971, 7.0058],
      Yaba: [6.5074, 3.3722],
      "Independence Layout": [6.4481, 7.5243],
      Ikoyi: [6.4549, 3.4316],
    }),
    []
  );

  // Initialize map ONCE
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [9.082, 8.6753],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Create a layer group for markers
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersLayerRef.current = null;
    };
  }, []); // Empty dependency array - only run once

  // Update markers when properties change
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    const map = mapRef.current;
    const markersLayer = markersLayerRef.current;

    // Clear existing markers
    markersLayer.clearLayers();

    if (properties.length === 0) {
      // Reset to Nigeria view if no properties
      map.setView([9.082, 8.6753], 6);
      return;
    }

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #941A1A; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const bounds: L.LatLngExpression[] = [];

    properties.forEach((property) => {
      let coords: [number, number] | undefined;

      // Try to find exact location coordinates first
      if (locationCoordinates[property.location]) {
        coords = locationCoordinates[property.location];
      }
      // Fall back to state coordinates with random offset
      else if (stateCoordinates[property.state]) {
        const [lat, lng] = stateCoordinates[property.state];
        const offset = 0.1;
        // Use property ID for consistent random positioning
        const seed =
          typeof property.id === "string" ? property.id.length : property.id;
        const randomLat = ((seed * 9301 + 49297) % 233280) / 233280.0;
        const randomLng = ((seed * 9301 + 49297) % 233281) / 233281.0;

        coords = [
          lat + (randomLat - 0.5) * offset,
          lng + (randomLng - 0.5) * offset,
        ];
      }

      if (coords) {
        const price = property.price
          ? `₦${Number(property.price).toLocaleString()}`
          : property.units?.[0]?.price
          ? `₦${Number(property.units[0].price).toLocaleString()}`
          : "Price on request";

        const popupContent = `
          <div style="min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
            <h3 style="font-weight: 600; margin: 0 0 8px 0; font-size: 14px; color: #111; line-height: 1.4;">
              ${property.title}
            </h3>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong style="color: #333;">📍 Location:</strong> ${property.location}
              </p>
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong style="color: #333;">🏛️ State:</strong> ${property.state}
              </p>
              <p style="margin: 0; font-size: 12px; color: #941A1A; font-weight: 600;">
                <strong style="color: #333;">💰 Price:</strong> ${price}
              </p>
            </div>
          </div>
        `;

        const marker = L.marker(coords, { icon: customIcon });
        marker.bindPopup(popupContent, {
          closeButton: true,
          offset: [0, -10],
        });

        // Show popup on hover (desktop) - Fixed 'this' type
        marker.on("mouseover", function (this: L.Marker) {
          this.openPopup();
        });

        // Close popup when mouse leaves (but keep open if clicked)
        marker.on("mouseout", function (this: L.Marker) {
          const popup = this.getPopup();
          if (!popup?.isOpen() || !(popup as any)._closeButton) {
            this.closePopup();
          }
        });

        // On click, keep popup open
        marker.on("click", function (this: L.Marker) {
          this.openPopup();
        });

        marker.addTo(markersLayer);
        bounds.push(coords);
      }
    });

    // Fit map to show all markers
    if (bounds.length > 0) {
      try {
        const latLngBounds = L.latLngBounds(bounds);
        map.fitBounds(latLngBounds, {
          padding: [50, 50],
          maxZoom: 12,
          animate: true,
          duration: 0.5,
        });
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  }, [properties, locationCoordinates, stateCoordinates]); // Now these are memoized

  return (
    <div className="hidden md:block md:w-1/2 lg:w-3/5 h-screen sticky top-16.75 lg:top-24">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Map, (prevProps, nextProps) => {
  // Only re-render if properties array length or content changes
  if (prevProps.properties.length !== nextProps.properties.length) {
    return false; // Re-render
  }

  // Deep comparison of property IDs
  const prevIds = prevProps.properties.map((p) => p.id).join(",");
  const nextIds = nextProps.properties.map((p) => p.id).join(",");

  return prevIds === nextIds; // Don't re-render if IDs are the same
});
