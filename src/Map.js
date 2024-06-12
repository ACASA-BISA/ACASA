import React, { useState, useEffect, useRef } from 'react';
import OSM from 'ol/source/OSM';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import { Overlay } from 'ol';
import 'ol/ol.css';
import { Feature, View } from 'ol';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import JSONFeature from 'ol/format/JSONFeature.js';
import {Fill, Stroke, Style} from 'ol/style.js';
import jdata from './Maj_Zone.json';
console.log(jdata)

function Mapp(){

    const [map, setMap] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    mapRef.current = map;
    const fill = new Fill({
    color: 'rgba(255,255,255,0.4)',
    });
    const stroke = new Stroke({
    color: '#000000',
    width: 1.25,
    });

    const h_fill = new Fill({
    color: 'rgba(100,190,150,0.4)',
    });
    const h_stroke = new Stroke({
    color: '#1a2b39',
    width: 2.5,
    });

    const vectorLayer = new VectorLayer({
    //background: '#000000',
    source: new VectorSource({
        url: './SA_ST.json',
        format: new GeoJSON(),
    }),
    style: [
        new Style({
        fill: fill,
        stroke: stroke,
        }),
    ],
    });

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const overlay = new Overlay({
    element: container,
    autoPan: {
        animation: {
        duration: 250,
        },
    },
    });

    closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
    }; 

    const source = new GeoTIFF({
    sources: [
        {url: './AEZ_SA.tif',
        },
    ],
    });

    const overl = new TileLayer({
    source: source,
    });
    const osm = new TileLayer({
    source: new OSM(),
    });

    const initialmap = new Map({
    layers: [osm,overl,vectorLayer],
    overlays: [overlay],
    target: mapElement.current,
    view: source.getView(),
    });

    const featureOverlay = new VectorLayer({
    source: new VectorSource(),
    map: map,
    style: [
        new Style({
        fill: h_fill,
        stroke: h_stroke,
        }),
    ],
    });

    let highlight;
    const displayFeatureInfo = function (pixel) {
    const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });

    const info = document.getElementById('info');
    if (feature) {
        info.innerHTML = feature.get('STATE') || '&nbsp;';
    } else {
        info.innerHTML = '&nbsp;';
    }

    if (feature !== highlight) {
        if (highlight) {
        featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
        featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
    }
    };

    map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
    });

    const display_state = function (pixel) {
    const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    let state = feature.get('STATE');
    return state;
    };

    const display_string = function (pixel) {
    const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    let state = feature.get('STATE');
    console.log(state);
    let index = -1;
    for (let i = 0; i < jdata.length; i++) {
        if (jdata[i].STATE == state){
        index = i;
        }
    }
    let maj = jdata[index].MAJORITY;
    return maj;
    };

    map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate;
    const pixel = map.getEventPixel(evt.originalEvent);
    content.innerHTML = '<p>Information:</p><code>State: '+ display_state(pixel) + ' Majority: ' + display_string(pixel) + '</code>';
    overlay.setPosition(coordinate);
    });

    const opacityInput = document.getElementById('opacity-input');
    const opacityOutput = document.getElementById('opacity-output');
    function update() {
    const opacity = parseFloat(opacityInput.value);
    overl.setOpacity(opacity);
    opacityOutput.innerText = opacity.toFixed(2);
    }
    opacityInput.addEventListener('input', update);
    update();

    const opacity = 0.6;
    overl.setOpacity(opacity);

    const op2 = 0.9;
    vectorLayer.setOpacity(op2);

    useEffect(() => {
        setMap(initialmap);
    }, []);


    return (
        <div>
      <div style={{height:'100vh',width:'100%'}} ref={mapElement} className="map-container" />
      <label>
      Layer opacity
      <input id="opacity-input" type="range" min="0" max="1" step="0.01" value="0.6" />
      <span id="opacity-output"></span>
    </label>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <div id="info">&nbsp;</div>
    </div>
    );
}
export default Mapp;
