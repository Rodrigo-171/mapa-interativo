"use client";

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function GeoJSONComZoom({ data }: { data: any }) {
  const map = useMap();

  useEffect(() => {
    if (!data) return;

    const geojsonLayer = new L.GeoJSON(data);
    const bounds = geojsonLayer.getBounds();

    map.fitBounds(bounds, { padding: [20, 20] }); // dá o zoom na área
  }, [data, map]);

  return (
    <GeoJSON data={data} style={{ color: "limegreen", fillOpacity: 0.4 }} />
  );
}

export default function MapaDetalhado({ geojson }: { geojson: any }) {
  return (
    <MapContainer
      center={[-18.5, -46.5]}
      zoom={6}
      scrollWheelZoom
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution="&copy; Esri - Imagem de Satélite"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      <TileLayer
        attribution="&copy; Esri - Labels"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
      />
      <GeoJSONComZoom data={geojson} />
    </MapContainer>
  );
}
