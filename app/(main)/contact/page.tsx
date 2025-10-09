"use client";
import React, { useEffect, useRef } from "react";
// TypeScript declaration for Leaflet global object

const Contact = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (mapInstanceRef.current || !mapRef.current) return;

      // Coordinates for Lekki Ajah Expressway area
      const lat = 6.4698;
      const lng = 3.5852;

      // Initialize map
      const map = window.L.map(mapRef.current).setView([lat, lng], 15);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Create custom marker icon
      const customIcon = window.L.divIcon({
        html: `
          <div style="
            background-color: #ef4444;
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            border: 3px solid #ffffff;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        className: "custom-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });

      // Add marker
      const marker = window.L.marker([lat, lng], { icon: customIcon }).addTo(
        map
      );

      // Add popup
      marker.bindPopup(`
        <div style="text-align: center; font-family: sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
            JGlobal Properties
          </h3>
          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.4;">
            S Deasant Valley<br>
            Lekki Ajah Expressway
          </p>
        </div>
      `);

      // Add zoom control
      map.zoomControl.setPosition("topright");
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row py-[1.25rem] lg:py-[6.75rem] px-8 lg:px-[4.8rem] mt-[6rem] lg:mt-[7.5rem]">
        <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
          {/* Contact Form Section */}
          <div className="flex flex-col items-start gap-4 lg:gap-[1.5rem] w-full lg:w-[46.0625rem]">
            <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[3rem] font-semibold leading-[1.75rem] lg:leading-[3.25rem]">
              How can we help?
            </h1>

            {/* Contact Form */}
            <div className="flex flex-col lg:gap-[1.25rem] gap-[0.25rem] w-full">
              <div className="flex flex-col lg:flex-row gap-[0.5rem] lg:gap-[1.8125rem]">
                <input
                  placeholder="First Name"
                  type="text"
                  className="h-12 px-4 rounded-[0.5rem] border border-[#D9D9D9] text-black text-[0.875rem] leading-[1.125rem] focus:outline-none w-full"
                />
                <input
                  placeholder="Last Name"
                  type="text"
                  className="h-12 px-4 rounded-[0.5rem] border border-[#D9D9D9] text-black text-[0.875rem] leading-[1.125rem] focus:outline-none w-full"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-[0.5rem] lg:gap-[1.8125rem] w-full">
                <input
                  placeholder="Email"
                  type="email"
                  className="h-12 px-4 gap-[0.625rem] rounded-[0.5rem] border border-[#D9D9D9] w-full text-black text-[0.875rem] leading-[1.125rem] focus:outline-none"
                />
                <input
                  placeholder="Phone Number"
                  type="tel"
                  className="h-12 px-4 gap-[0.625rem] rounded-[0.5rem] border border-[#D9D9D9] w-full text-black text-[0.875rem] leading-[1.125rem] focus:outline-none"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-[0.5rem] lg:gap-[1.8125rem] w-full">
                <input
                  placeholder="Whatsapp Number"
                  type="tel"
                  className="h-12 px-4 rounded-[0.5rem] border border-[#D9D9D9] w-full text-black text-[0.875rem] leading-[1.125rem] focus:outline-none"
                />
                <select className="h-12 px-4 rounded-[0.5rem] border border-[#D9D9D9] w-full text-black text-[0.875rem] leading-[1.125rem] focus:outline-none">
                  <option value="" disabled>
                    Who are you
                  </option>
                  <option value="first-time-buyer">A first time buyer</option>
                  <option value="investor">
                    A real estate investor (invested previously)
                  </option>
                </select>
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="border border-[#D9D9D9] gap-2 p-4 rounded-[0.5rem] mt-2 text-black text-[0.875rem] leading-[1.125rem] focus:outline-none resize-none"
              />
              <button
                type="button"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-[0.5rem] transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-[46.0625rem] mt-8 lg:mt-0 z-0">
            <div className="flex flex-col gap-4">
              <h2 className="text-[1.25rem] md:text-[1.5rem] lg:text-[2.25rem] font-semibold leading-[1.5rem] lg:leading-[2.75rem]">
                Find us here
              </h2>
              <div className="w-full">
                {/* Map Container */}
                <div
                  ref={mapRef}
                  className="w-full h-[300px] lg:h-[400px] rounded-[0.5rem] border border-[#D9D9D9] shadow-sm bg-gray-100"
                  style={{ minHeight: "300px" }}
                />

                {/* Address Info */}
                <div className="mt-4 p-4 bg-gray-50 rounded-[0.5rem] border border-[#D9D9D9]">
                  <h3 className="font-semibold text-[0.875rem] text-gray-800 mb-2">
                    JGlobal Properties
                  </h3>
                  <p className="text-[0.75rem] text-gray-600 leading-relaxed">
                    S Deasant Valley
                    <br />
                    Lekki Ajah Expressway
                    <br />
                    Lagos, Nigeria
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-[0.75rem] text-gray-500">
                      📍 Click the marker for more details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
