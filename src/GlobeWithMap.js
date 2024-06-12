import React, { useEffect, useRef, useState } from 'react';
import { Viewer, Globe } from 'react-cesium';
import OlCesium from 'olcs/OLCesium';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/WebGLTile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const GlobeWithMap = () => {
  const olMapRef = useRef(null);
  const [overl, setOverl] = useState(null);

  useEffect(() => {
    const olMap = new Map({
      layers: [
        new TileLayer({
          preload: Infinity,
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const olCesium = new OlCesium({ map: olMap, target: 'ol-cesium-container' });

    olMap.setTarget(null);

    olMapRef.current = olMap;

    return () => {
      olCesium.destroy();
    };
  }, []);


  return (
    <Viewer full>
      <div id="ol-cesium-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <Globe />
    </Viewer>
  );
};

export default GlobeWithMap;
