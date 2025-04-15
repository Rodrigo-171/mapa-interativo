"use client";

import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

export default function Mapa() {
  const [polygonCoords, setPolygonCoords] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    imagemUrl: "",
  });

  const handleCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const coordinates = layer.getLatLngs();
      setPolygonCoords(coordinates);
    }
  };

  const [geoData, setGeoData] = useState<any>(null);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        const minasGerais = {
          ...data,
          features: data.features.filter(
            (f: any) => f.properties.name === "Minas Gerais"
          ),
        };
        setGeoData(minasGerais);
      });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapContainer
        center={[-18.5, -44]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={() => ({
              fillColor: "rgba(255,255,255,0.3)",
              color: "red",
              weight: 2,
            })}
          />
        )}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {polygonCoords && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 1000,
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "8px",
            width: "300px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            color: '#1d1d1d',
          }}
        >
          <h3 style={{fontWeight: 600}}>Adicionar Fazenda</h3>
          <input
            type="text"
            placeholder="Nome da fazenda"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            style={{ width: "100%", marginBottom: 8, borderBottom: '1px solid #1d1d1d' }}
          />
          <textarea
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
            style={{ width: "100%", marginBottom: 8, borderBottom: '1px solid #1d1d1d' }}
          />
          <input
            type="text"
            placeholder="URL da imagem"
            value={formData.imagemUrl}
            onChange={(e) =>
              setFormData({ ...formData, imagemUrl: e.target.value })
            }
            style={{ width: "100%", marginBottom: 8, borderBottom: '1px solid #1d1d1d' }}
          />
          <button
            onClick={() => {
              console.log("Dados da fazenda:", {
                ...formData,
                coords: polygonCoords,
              });
              setPolygonCoords(null);
              setFormData({ nome: "", descricao: "", imagemUrl: "" });
            }}
            style={{background: 'green', color: 'white', padding: '5px 25px', borderRadius: 10}}
          >
            Salvar
          </button>
        </div>
      )}
    </div>
  );
}
