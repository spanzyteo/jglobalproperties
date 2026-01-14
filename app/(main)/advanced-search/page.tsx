/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";
// import Map from "../components/advancedSearch/Map";
import MapResults from "../components/advancedSearch/MapResults";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/advancedSearch/Map"), {
  ssr: false,
});

const AdvancedSearch = () => {
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  const handleFilteredResults = useCallback((results: any[]) => {
    setFilteredProperties(results);
  }, []);

  return (
    <div className="mt-[4.1875rem] lg:mt-[6rem] flex flex-col md:flex-row md:justify-between">
      {/* Testing webhook */}
      <Map properties={filteredProperties} />
      <MapResults onFilteredResults={handleFilteredResults} />
    </div>
  );
};

export default AdvancedSearch;
