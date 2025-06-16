// loadMultibandTiff.js
import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import GeoTIFF from "ol/source/GeoTIFF";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import TileLayerRenderer from "ol/renderer/webgl/TileLayer";
import { IconButton, Slider, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function AnimatedTiffPlayer({ tifUrl }) {
  const mapRef = useRef(null);
  const [currentBand, setCurrentBand] = useState(0);
  const [numBands, setNumBands] = useState(34); // update if dynamic
  const [isPlaying, setIsPlaying] = useState(true);
  const [map, setMap] = useState(null);
  const [tiffLayer, setTiffLayer] = useState(null);

  // Setup OpenLayers map
  useEffect(() => {
    const view = new View({
      ccenter: fromLonLat([71.2090057, 21.6138954]),
      zoom: 3.5,
    });

    const layer = new TileLayer({
      source: new GeoTIFF({
        sources: [{ url: tifUrl, bands: [currentBand + 1] }],
      }),
    });

    const mapInstance = new Map({
      target: mapRef.current,
      layers: [layer],
      view,
    });

    setMap(mapInstance);
    setTiffLayer(layer);

    return () => mapInstance.setTarget(null);
  }, []);

  // Change band on slider or interval
  useEffect(() => {
    if (tiffLayer) {
      const newSource = new GeoTIFF({
        sources: [{ url: tifUrl, bands: [currentBand + 1] }],
      });
      tiffLayer.setSource(newSource);
    }
  }, [currentBand, tiffLayer, tifUrl]);

  useInterval(
    () => {
      setCurrentBand((prev) => (prev + 1) % numBands);
    },
    isPlaying ? 1000 : null
  );

  return (
    <Box>
      <Box
        ref={mapRef}
        sx={{
          width: "100%",
          height: 300,
          border: "1px solid #ccc",
          marginBottom: 2,
        }}
      />

      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <IconButton onClick={() => setIsPlaying((prev) => !prev)} sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Slider
          value={currentBand}
          onChange={(e, v) => {
            setCurrentBand(v);
            setIsPlaying(false);
          }}
          min={0}
          max={numBands - 1}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}
