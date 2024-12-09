import React, { useState, useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/WebGLTile';
import TileLayer2 from 'ol/layer/Tile';
import tilesource from 'ol/source/TileJSON';
import Polygon from 'ol/geom/Polygon.js';
import 'ol/ol.css';
import './index.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import { styled } from "@mui/material/styles";
import {fromLonLat} from 'ol/proj';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Overlay from 'ol/Overlay';
import {Control, ZoomToExtent, FullScreen, Zoom} from 'ol/control.js';
import './olsm.css';
import Typography from '@mui/material/Typography';
import { Popper } from '@mui/material';
import Slide from '@mui/material/Slide';
import BoxLegend from './BoxLegend';

export default function MApp({
  activeCrop, focus='Region', activeRegion,
  activeOpt, CurrRisk, activeImpact,activeScenario,
  sharedView,handleviewchange,activeOptLayer
}) {

    const ref = useRef(null);
    const mapRef = useRef(null);
    const [overl, setOverl] = useState(null);
    const [vectorLayerr, setvectorLayerr] = useState(null);
    const [countryLayer, setcountryLayer] = useState(null);
    const [maskLayer1, setmaskLayer1] = useState(null);
    const [tiffFilePath, settiffFilePath] = useState("");
    const [missingSource, setmsource] = useState(false);
    let defext = [
      6731721.531032621,
      -300003.34768295793,
      10843798.383928495,
      4918992.169943628
    ];

    const fill = new Fill({
      color: 'rgba(255,255,255,0)',
    });

    const stroke = new Stroke({
      color: 'rgba(0, 0, 0, 1)',
      width: 1,
    });

    const h_fill = new Fill({
      color: 'rgba(255,255,255,0.0)',
    });
    const h_stroke = new Stroke({
      color: '#111111',
      width: 2.5,
    });

    const ViewV = new View({
      center: fromLonLat([71.2090057,21.6138954]),
      zoom: 3.5,
    });

    let ViewV2 = new View({
      center: fromLonLat([71.2090057,21.6138954]),
      zoom: 3.5,
    });

    function checkcrop() {
      const diffcrop = ['Cattle','Buffalo','Goat','Sheep','Pig','Poultry','Rice','Wheat','Maize','Mustard',
        'Cotton','Soybean','Chickpea','Barley'];
      let ans = true;
      diffcrop.forEach((sname) => {
        if(activeCrop===sname){
          ans = false;
        }
      })
      return ans;
    };
    function checkcrop2() {
      const livestock = ['Cattle','Buffalo','Goat','Sheep','Pig','Poultry'];
      let ans = true;
      livestock.forEach((sname) => {
        if(activeCrop===sname){
          ans = false;
        }
      })
      return ans;
    };

    const max = 1;
    function normalize(value) {
      return ['/', value, max];
    };

    const red = normalize(['band', 1]);
    const green = normalize(['band', 2]);
    const blue = normalize(['band', 3]);
    const nir = normalize(['band', 4]);

    const color_comm = {"Rice":'#5ec962',"Wheat":"#f7e465","Maize":"#ffcc00","Sorghum":'#8b4513',"Soybean":"#8c7658",
      "Chickpea":"#b3a057","Pigeonpea":"#de815f","Mustard":"#FFDB58","Groundnut":"#d2691e","Potato":"#ab6042","Onion":"#8e507f",
      "Cotton":"#5102b0","Cattle":"#8B4513","Cow":"#ac8e59","Buffalo":"#5c2f08","Pig":"#FFC0CB","Poultry":"#FF8C00","Sheep":"#5fdbfa",
      "Goat":"#7ca67c","Barley":'#5ec962'
    };
    const color1 = {
      color: [
        'palette',
        [
          'interpolate',
          ['linear'],
          ['/', ['-', nir, green], ['+', nir, blue]],
          -0.1,
          0,
          3,
          10,
        ],
        ['rgba(98, 181, 209, 0)', color_comm[activeCrop]],
      ],
    };

     const color2 = {
      color: [
        'palette',
        [
        'interpolate',
        ['linear'],
        ['*',['band', 1], 16], 
        0,       // Start color (minimum value)
        1,        // Intermediate color
        1,
        3,
        2,
        4,
        3,
        5
      ],
      ['rgba(0,0,0,0)','rgba(0,0,0,0)',"rgba(180, 70, 109, 1)", '#FF9A00', "#06D001", 'rgba(0,0,0,0)',
      ],
      ],
    }; 

    const color4 = {
      color: [
        'palette',
        [
        'interpolate',
        ['linear'],
        ['*',['band', 2], 250], 
        0,       // Start color (minimum value)
        1,        // Intermediate color
        1,
        2,
        2,
        3,
        4,
        5,
        5,
        6
      ],
      ['rgba(0,0,0,0)','rgba(0,0,0,0)',"#059212", '#00FF00', "#FFFF00", "#FFA500",'#FF0000', '#3b528b', '#21918c', '#5ec962', '#fde725',
      ],
      ],
    };

    const color_hazard = {
      color: [
        'palette',
        ['clamp', ['*', ['band', 2], 25], 0, 6],
        ['rgba(0,0,0,0)', 'rgba(150,150,150,1)', '#059212', '#00FF00', '#FFFF00', '#FFA500', '#FF0000']
      ]
    };

    const color_hazard_livestock = {
      color: [
        'palette',
        [
        'interpolate',
        ['linear'],
        ['*',['band', 2], 250], 
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7
      ],
      ['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(150,150,150,1)',"#059212", '#00FF00', "#FFFF00", "#FFA500",'#FF0000', 
      ],
      ],
    };

    const color_hazard_25 = {
      color: [
        'palette',
        [
        'interpolate',
        ['linear'],
        ['*',['band', 2], 250], 
        0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,
        10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,
        20,21,21,22,22,23,23,24,24,25,25,26
      ],
      [
        'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 139, 1)',        // Class 1
        'rgba(70, 130, 180, 1)',     // Class 2
        'rgba(0, 191, 255, 1)',      // Class 3
        'rgba(50, 205, 50, 1)',      // Class 4
        'rgba(255, 255, 0, 1)',      // Class 5
        'rgba(70, 130, 180, 1)',     // Class 6
        'rgba(0, 191, 255, 1)',      // Class 7
        'rgba(50, 205, 50, 1)',      // Class 8
        'rgba(255, 255, 0, 1)',      // Class 9
        'rgba(255, 165, 0, 1)',      // Class 10
        'rgba(0, 191, 255, 1)',      // Class 11
        'rgba(50, 205, 50, 1)',      // Class 12
        'rgba(255, 255, 0, 1)',      // Class 13
        'rgba(255, 165, 0, 1)',      // Class 14
        'rgba(204, 51, 0, 1)',       // Class 15
        'rgba(50, 205, 50, 1)',      // Class 16
        'rgba(255, 255, 0, 1)',      // Class 17
        'rgba(255, 165, 0, 1)',      // Class 18
        'rgba(204, 51, 0, 1)',       // Class 19
        'rgba(128, 0, 0, 1)',        // Class 20
        'rgba(255, 255, 0, 1)',      // Class 21
        'rgba(255, 165, 0, 1)',      // Class 22
        'rgba(204, 51, 0, 1)',       // Class 23
        'rgba(128, 0, 0, 1)',        // Class 24
        'rgba(128, 0, 0, 1)' ,        // Class 25
      ],
      ],
    };

    const colorGradientEx = {
      color: [
        'interpolate',
        ['linear'],
        ['*',['band', 1], 310],
        0, 'rgba(0,0,0,0)',
        10, '#FFF9C4', 
        20, '#FFE680',
        30, '#FFD700',
        40, '#DAA520',
        50, '#A0522D',
        60, '#6B3D1B'
      ]
    };

    const colorGradient2 = {
      color: [
        'interpolate',
        ['linear'],
        ['*',['band', 1], 310],
        0, 'rgba(0,0,0,0)',
        1, '#059212', 
        3, '#00FF00', 
        5,"#FFFF00", 
        7, '#FFA500', 
        11, '#FF0000' 
      ]
    };

    const key = 'TrN2dn4maoO3C2x0sUpH';

// Define the custom legend control
class LegendControl extends Control {
  constructor(options = {}) {
    const button = document.createElement('button');
    button.innerText = 'L'; // The button label
    button.title = 'Display Legend';

    // Style the button
    /* button.style.cssText = `
      width: 20px;
      height: 20px;
      font-size: 12px;
      border: 1px solid black;
      background-color: white;
      cursor: pointer;
      border-radius: 5px;
    `; */

    // Create a container for the control
    const element = document.createElement('div');
    element.className = 'ol-control ol-unselectable box-legend';
    
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    // Legend container
    const legend = document.createElement('div');
    legend.style.cssText = `
      display: none; /* Initially hidden */
      position: relative;
      top: 0px;
      left: 00px;
      background-color: white;
      border: 1px solid black;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;
    legend.id = 'legend';

    // Add color boxes to the legend
    const colors = [
      'rgba(255, 255, 0, 1)', // Box 21
      'rgba(255, 165, 0, 1)', // Box 22
      'rgba(204, 51, 0, 1)', // Box 23
      'rgba(128, 0, 0, 1)', // Box 24
      'rgba(128, 0, 0, 1)', // Box 25
      'rgba(50, 205, 50, 1)', // Box 16
      'rgba(255, 255, 0, 1)', // Box 17
      'rgba(255, 165, 0, 1)', // Box 18
      'rgba(204, 51, 0, 1)', // Box 19
      'rgba(128, 0, 0, 1)', // Box 20
      'rgba(0, 191, 255, 1)', // Box 11
      'rgba(50, 205, 50, 1)', // Box 12
      'rgba(255, 255, 0, 1)', // Box 13
      'rgba(255, 165, 0, 1)', // Box 14
      'rgba(204, 51, 0, 1)', // Box 15
      'rgba(70, 130, 180, 1)', // Box 6
      'rgba(0, 191, 255, 1)', // Box 7
      'rgba(50, 205, 50, 1)', // Box 8
      'rgba(255, 255, 0, 1)', // Box 9
      'rgba(255, 165, 0, 1)', // Box 10
      'rgba(0, 0, 139, 1)', // Box 1
      'rgba(70, 130, 180, 1)', // Box 2
      'rgba(0, 191, 255, 1)', // Box 3
      'rgba(50, 205, 50, 1)', // Box 4
      'rgba(255, 255, 0, 1)', // Box 5
    ];
    legend.style.display = 'none';
    legend.style.gridTemplateColumns = 'repeat(5, 30px)';
    legend.style.gridGap = '2px';
    colors.forEach((color) => {
      const colorBox = document.createElement('div');
      colorBox.style.width = '30px';
      colorBox.style.height = '30px';
      colorBox.style.backgroundColor = color;
      colorBox.style.border = '1px solid black';
      legend.appendChild(colorBox);
    });

    // Toggle legend visibility on button click
    button.addEventListener('click', () => {
      legend.style.display = legend.style.display === 'none' ? 'grid' : 'none';
    });

    // Append legend to the control element
    element.appendChild(legend);
  }
}

      const sourcemap = new tilesource({
        url: `https://api.maptiler.com/maps/bright-v2/tiles.json?key=${key}`, // source URL
        tileSize: 512,
        crossOrigin: 'anonymous'
      });

      const BingMapNew = new TileLayer2({
            source: sourcemap,
        opacity:0.9,
      zIndex:10,
    });

    useEffect(() => {
      const container = document.getElementById('popup2');
      const content = document.getElementById('popup-content2');
  
      if (!container || !content ) {
        console.error('Popup elements not found');
        return;
      }
  
      const overlay = new Overlay({
        element: container,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

    if (ref.current && !mapRef.current) {
        mapRef.current = new Map({
          controls: [
            new FullScreen({
            className: 'ol-fullscreen-comp' 
          }),
          new Zoom({
            className: 'ol-zoom-comp' 
          }),
          new ZoomToExtent({
            extent: defext,
            className: 'ol-zoomtoextent-comp'
          }),
          new LegendControl({
            className: 'box-legend'
          })
        ],
          target: ref.current,
          layers: [BingMapNew],
          view: ViewV,
        });
      }

      const featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: mapRef.current,
        style: [
          new Style({
            fill: h_fill,
            stroke: h_stroke,
          }),
        ],
      });

    let highlight;
    const display_state = function (pixel) {
      const feature = mapRef.current.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      let state = null;
      if(feature){
        if(feature.get('D_NAME_1')){
          state = feature.get('D_NAME_1');
        }
        else{
          state = feature.get('STATE');
        }
      }
      if (feature !== highlight) {
        if (highlight) {
          featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
          if(state){
          featureOverlay.getSource().addFeature(feature);
          }
        }
        highlight = feature;
      }
      return state;
    };

    function getCentroidOfPolygon(geometry) {
      const extentt = geometry.getExtent();
      let x = 0, y=0;
      x = (extentt[0]+extentt[2])/2;
      y = (extentt[1]+extentt[3])/2;
      return [x,y];
    }

    const LocationofEvent = function (pixel) {
      const feature = mapRef.current.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      let cordinates = null;
      if(feature){
        const geometry = feature.getGeometry();
        cordinates = getCentroidOfPolygon(geometry);;
      }
      return cordinates;
    };

    if (mapRef.current) {
      mapRef.current.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }
      //const coordinate = evt.coordinate;
      const pixel = mapRef.current.getEventPixel(evt.originalEvent);
      const contentofbox = display_state(pixel);
      if(contentofbox){
        if(content){
        content.innerHTML = contentofbox.toLowerCase();
        };
        //console.log(overlay);
        overlay.setPosition(LocationofEvent(pixel));
        mapRef.current.addOverlay(overlay);
      }
      else{
        mapRef.current.removeOverlay(overlay);
      }
    });
    }
    }, [ref, mapRef]);

    useEffect(() => {
      let sourcet;
      let countryboundary;
      if (focus==='Region') {
        sourcet = new VectorSource({
          url: './CountryBoundary/SA_Country.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/SA_outline.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='Afghanistan') {
        sourcet = new VectorSource({
          url: './StateBoundary/AF_ST.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/AF.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='Bangladesh') {
        sourcet = new VectorSource({
          url: './StateBoundary/BD_ST.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/BD.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='Bhutan') {
        sourcet = new VectorSource({
          url: './CountryBoundary/BT.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/BT.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='India') {
        sourcet = new VectorSource({
          url: './StateBoundary/IN_ST.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/IN.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='Maldives') {
        sourcet = new VectorSource({
          url: './StateBoundary/MV_ST.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/MV.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='Nepal') {
        countryboundary = new VectorSource({
          url: './CountryBoundary/NP.json',
          format: new GeoJSON(),
        });
        sourcet = new VectorSource({
          url: './StateBoundary/NP_ST.json',
          format: new GeoJSON(),
        });
       } else if (activeRegion==='Pakistan') {
        sourcet = new VectorSource({
          url: './StateBoundary/PK_ST.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/PK.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='Sri Lanka') {
        sourcet = new VectorSource({
          url: './StateBoundary/SL_ST.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/SL.json',
          format: new GeoJSON(),
        });
      } else {
        let sec = activeRegion.indexOf(',');
        let y ='';
        let x = '';
        if (sec>0){
          y = activeRegion.substring(0,sec);
          x = activeRegion.substring(sec+2);
        }
        if(x==='Bangladesh'){
          let urlsourcestr = './DistrictBoundary/BD/'+ y.substring(0,y.length-9) + 'DIV.json';
          let urlcountrystr = './StateBoundary/BD/'+ y.substring(0,y.length-9) + 'ST.json';
          sourcet = new VectorSource({
            url: urlsourcestr,
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: urlcountrystr,
            format: new GeoJSON(),
          });
        }
        else if(x==='Nepal'){
          let urlsourcestr = './DistrictBoundary/NP/'+ y + 'DIV.json';
          let urlcountrystr = './StateBoundary/NP/'+ y + 'ST.json';
          sourcet = new VectorSource({
            url: urlsourcestr,
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: urlcountrystr,
            format: new GeoJSON(),
          });
        }
        else if(x==='Afghanistan'){
          let urlsourcestr = './DistrictBoundary/AF/'+ y.toUpperCase() + '.json';
          let urlcountrystr = './StateBoundary/AF/STATE_'+ y.toUpperCase() + '.json';
          sourcet = new VectorSource({
            url: urlsourcestr,
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: urlcountrystr,
            format: new GeoJSON(),
          });
        }
        else if(x==='India'){
          let urlsourcestr = './DistrictBoundary/IN/STATE_'+ y.toUpperCase() + '.json';
          let urlcountrystr = './StateBoundary/IN/STATE_'+ y.toUpperCase() + '.json';
          sourcet = new VectorSource({
            url: urlsourcestr,
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: urlcountrystr,
            format: new GeoJSON(),
          });
        }
        else if(x==='Sri Lanka'){
          let urlsourcestr = './DistrictBoundary/SL/STATE_'+ y.toUpperCase() + '.json';
          let urlcountrystr = './StateBoundary/SL/STATE_'+ y.toUpperCase() + '.json';
          sourcet = new VectorSource({
            url: urlsourcestr,
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: urlcountrystr,
            format: new GeoJSON(),
          });
        }
        else if(x==='Pakistan'){
          let urlsourcestr = './DistrictBoundary/PK/STATE_'+ y.toUpperCase() + '.json';
          let urlcountrystr = './StateBoundary/PK/STATE_'+ y.toUpperCase() + '.json';
          sourcet = new VectorSource({
            url: urlsourcestr,
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: urlcountrystr,
            format: new GeoJSON(),
          });
        }
        else if(x==='Maldives'){
          let urlsourcestr = './DistrictBoundary/MV/STATE_'+ y.toUpperCase() + '.json';
          let urlcountrystr = './StateBoundary/MV/'+ y.toUpperCase() + '.json';
          sourcet = new VectorSource({
            url: urlsourcestr,
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: urlcountrystr,
            format: new GeoJSON(),
          });
        }
      }

      if (mapRef.current && vectorLayerr) {
        mapRef.current.removeLayer(vectorLayerr);
        setvectorLayerr(null);
      }

      if (mapRef.current && countryLayer) {
        mapRef.current.removeLayer(countryLayer);
        setcountryLayer(null);
      }

      if (countryboundary) {
        const newcountrylayer = new VectorLayer({
            source: countryboundary,
            style: [
                new Style({
                fill: fill,
                stroke: stroke,
                }),
            ], 
            opacity: 0.9,
            zIndex: 205,
        });

        if (mapRef.current) {
          mapRef.current.addLayer(newcountrylayer);
          setcountryLayer(newcountrylayer);
        }
        if (mapRef.current) {
          countryboundary.on('change', function() {
            if (countryboundary.getState() === 'ready') {
              if(countryboundary.getFeatures()) {
                const featuress = countryboundary.getFeatures();
                const polyy = featuress[0].getGeometry();
                /* const polygoncordinates  = polyy.getCoordinates();
                setpolycord(polygoncordinates); */
                const extentt = polyy.getExtent(); 
                const sizee = mapRef.current.getSize();
                let x = 0;
                if(CurrRisk!==""||activeOpt!==""){
                  x = 90;
                }
                mapRef.current.getView().fit(extentt,{size:[sizee[0]*0.9,sizee[1]*0.9],padding:[0,0,x,0]});
                defext = extentt;
            }
            }
          });
        }
      }
      if (sourcet) {
       const newvectorLayer = new VectorLayer({
          source: sourcet,
          style: [
              new Style({
              fill: fill,
              stroke: stroke,
              }),
          ], 
          opacity: 0.9,
          zIndex: 220,
      });

      if (mapRef.current) {
        mapRef.current.addLayer(newvectorLayer);
        setvectorLayerr(newvectorLayer);
      }
      if (mapRef.current) {
          sourcet.on('change', function() {
            if (sourcet.getState() === 'ready') {
              if(sourcet.getFeatures()) {
                const featuress = sourcet.getFeatures();
                // Create a polygon covering the extent of the entire world
                const worldPolygon = new Polygon([
                  [[-20037508.34, -20037508.34], [-20037508.34, 20037508.34], [20037508.34, 20037508.34],
                   [20037508.34, -20037508.34], [-20037508.34, -20037508.34]]
                ]);

                featuress.forEach(featureOne => {
                  const polyone = featureOne.getGeometry();
                  //console.log(polyone.getType());
                  if(polyone.getType()==='MultiPolygon'){
                    const polygons = polyone.getPolygons();
                    polygons.forEach(polygon => {
                    worldPolygon.appendLinearRing(polygon);
                    });
                  }
                  else if(polyone.getType()==='GeometryCollection'){
                    const polygons = polyone.getGeometries();
                    polygons.forEach(polygon => {
                    worldPolygon.appendLinearRing(polygon);
                    });
                  }
                  else{
                  worldPolygon.appendLinearRing(polyone);
                  }
                });

            const maskLayer = new VectorLayer({
              source: new VectorSource({
                features: [new Feature({
                  geometry: worldPolygon,
                })],
              }),
              style: new Style({
                fill: new Fill({
                  color: 'rgba(255,255,255,1)',
                }),
              }),
              opacity:0.6,
              zIndex:100,
            });

            if(maskLayer1){
              mapRef.current.removeLayer(maskLayer1);
              setmaskLayer1(null);
            }
            mapRef.current.addLayer(maskLayer);
            setmaskLayer1(maskLayer);
            }
            }
          });
      }
      }
}, [activeRegion,focus,mapRef,activeOpt,CurrRisk]);

useEffect(() => {
  let source1 = null;
  let opt = 1;
  const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residue':'ZTILL','Broad Bed and Furrow':'BBFIB',
    'DSR (Dry Seed)':'DSDRY','DSR (Wet Seed)':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
    'Low-tech Precision Technology':'PNMLT','High-tech Precision Technology':'PNMHT','Deep Placement of Urea':'DR',
    'ICT-based Agro Advisory':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
    'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate wetting and drying':'AWD','Fertilizer rating and timing':'FRT',
    'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};

    const hazardname = {"District Level": "District Level","Downscaled Risk": "Downscaled Risk","Risk Index": "Risk index","Hazard Index": "Hazard Index",
      "Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
      "Low temperature induced pollen sterility": "Low temperature induced pollen sterility","High temperature induced pollen sterility": "High temperature induced pollen sterility",
      "Heat Stress": "Heat stress","High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
      "Cold Stress": "Cold stress","Low temperature induced tuberization failure": "Low temperature induced tuberization failure",'Untimely Rainfall':"Untimely rainfall",
      "Terminal Heat": "Terminal heat","Days of Frost": "Days of frost","Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
      "Delayed Monsoon": "Delayed monsoon","Drought": "Drought","Dry Spell": "Number of dry spells","Flood": "Flood","Soil Organic Carbon":"Soil organic carbon",
      "Lodging": "Rain and wind causing lodging","Biotic": "High humidity and temperature for blight","Irrigation": "Irrigation","Soil Water Holding Capacity": "Water holding capacity","Income": "Agricultural GDP",
      "Access to Credit": "Access to Credit","Access to Market": "Access to Market","Elevation": "Elevation","Access to Knowledge": "Access to Knowledge","Exposure Index": "Exposure Index",
      "Number of Farmers": "Number of Farmers","Cropped Area": "Extent","Excess Rainfall":"Excess rainfall","Number of Animals per grid":"Number of animals per grid",
      'Cold stress in reproductive stage':'Cold stress in reproductive stage','Heat stress in reproductive stage':"Heat stress in reproductive stage",
      'Heat stress during boll formation':'Heat stress during boll formation','Cold stress during flowering':'Cold stress during flowering',
      'High tempearture during flowering':'High tempearture during flowering','Biotic Stress':'Biotic stress',"Vulnerability Index":'Vulnerability Index',
      "Availability of crop residues":'Residue',"Rural infrastructure":'Road network density',"Cyclone":'Cyclone',"Rainfall Deficit":"Rainfall deficit",
      "Extreme Rainfall days":"Extreme Rainfall Days","Cold days":"Cold Stress","Hot days":"Heat stress or hot days","Temperature-Humidity Index":'THI',
      "Socio-economic Development Indicator":"Human development index"};

    if(activeOpt!==''){
      opt=2;
      let urlstr = "xyz.tif";
      if(activeScenario==='baseline'){
        urlstr = "./Adap/"+activeCrop+"/Suitability_"+activeCrop+"_"+optcode[activeOpt]+".tif";
        if(checkcrop2()===false){
          opt=3;
          urlstr = "./Adap/"+activeCrop+"/"+activeOpt+" Baseline.tif";
        }
      }
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({sources: [{ url: urlstr}],sourceOptions:{allowFullFile:true}});
    }
    else if(CurrRisk!==''){
      opt=3;
      let urlstr = "xyz.tif";
      if(activeScenario==='baseline'){
       urlstr = "./Hazards/"+activeCrop+"/Baseline/ZZ_"+hazardname[CurrRisk]+".tif";
      }
      else if(activeScenario==='ssp245'){
        urlstr = "./Hazards/"+activeCrop+"/SSP245/ZZ_"+hazardname[CurrRisk]+".tif";
       }
      else{
        urlstr = "./Hazards/"+activeCrop+"/SSP585/ZZ_"+hazardname[CurrRisk]+".tif";
      }
      if(CurrRisk==='Hazard Index'){
        opt=4;
        urlstr = "./Hazard_index/"+activeCrop+".tif";
      }
      if(CurrRisk==='Flood'){
        opt=99;
      }
      if(checkcrop2()===false){
        opt=101;
      }
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({sources: [{ url: urlstr}],sourceOptions:{allowFullFile:true}});
    }
    else if(activeImpact['Impact on Productivity'] || activeImpact['Value of Production']){
      let urlstr = "xyz.tif";
      opt=3;
      if(activeImpact['Impact on Productivity']){
        urlstr = "./Impact/"+activeCrop+"_DR.tif";
      }
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({sources: [{ url: urlstr}],sourceOptions:{allowFullFile:true}});
    }
    else{
      let urlstr = './Crop Masks/AllPix/ZZ_Mask_'+activeCrop+'801.tif';
      settiffFilePath(urlstr);
      //console.log(urlstr);
      if(checkcrop()===false){
        urlstr = './Crop Masks/Extent/'+activeCrop+'.tif';
      }
      source1 = new GeoTIFF({sources: [{ url: urlstr }], sourceOptions:{allowFullFile:true} });
    }
    
    source1.on('change', function() {
      const state = source1.getState();
      if (state === 'error') {
        setmsource(true);
      } else if (state === 'ready') {
        setmsource(false);
      }
    });

  if (mapRef.current && overl) {
    mapRef.current.removeLayer(overl);
    setOverl(null);
  }
  //HEAT STRESS	SPIKELET STERILITY HEAT	SPIKELET STERILITY COLD
  if (source1) {
    
    const newOverl = new TileLayer({
      source: source1,
      opacity: 0.85,
      zIndex: 91,
    });

    if(opt===2){
      newOverl.setStyle(color2);
    }
    else if(opt===3){
      newOverl.setStyle(color_hazard);
    }
    else if(opt===4){
      newOverl.setStyle(color4);
    }
    else if(opt==99){
      newOverl.setStyle(color_hazard_25);
    }
    else if(opt==101){
      newOverl.setStyle(color_hazard_livestock);
    }
    else{
      newOverl.setStyle(color1);
      if(checkcrop()===false){
        newOverl.setStyle(colorGradientEx);
      }
    }
    if (mapRef.current) {
      mapRef.current.addLayer(newOverl);
      setOverl(newOverl);
    }
  }
  
}, [CurrRisk,activeCrop,activeOpt,activeImpact,mapRef,activeScenario]);

useEffect(() => {
  let source1 = null;

  let opt = 1;
  const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residue':'ZTILL','Broad Bed and Furrow':'BBFIB',
    'DSR (Dry Seed)':'DSDRY','DSR (Wet Seed)':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
    'Low-tech Precision Technology':'PNMLT','High-tech Precision Technology':'PNMHT','Deep Placement of Urea':'DR',
    'ICT-based Agro Advisory':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
    'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate wetting and drying':'AWD','Fertilizer rating and timing':'FRT',
    'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};

    if(activeOpt!==''){
      opt=2;
      let urlstr = "xyz.tif";
      if(activeScenario==='baseline'){
        urlstr = "./Adap/"+activeCrop+"/Suitability_"+activeCrop+"_"+optcode[activeOpt]+".tif";
        if(checkcrop2()===false){
          opt=3;
          urlstr = "./Adap/"+activeCrop+"/"+activeOpt+" Baseline.tif";
        }
      }
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({sources: [{ url: urlstr}],sourceOptions:{allowFullFile:true}});
    }
    
    /* source1.on('change', function() {
      const state = source1.getState();
      if (state === 'error') {
        setmsource(true);
      } else if (state === 'ready') {
        setmsource(false);
      }
    });

  if (mapRef.current && overl) {
    mapRef.current.removeLayer(overl);
    setOverl(null);
  }
  //HEAT STRESS	SPIKELET STERILITY HEAT	SPIKELET STERILITY COLD
  if (source1) {
    
    const newOverl = new TileLayer({
      source: source1,
      opacity: 0.85,
      zIndex: 91,
    });

    if(opt===2){
      newOverl.setStyle(color2);
    }
    else{
      newOverl.setStyle(color1);
      if(checkcrop()===false){
        newOverl.setStyle(colorGradientEx);
      }
    }
    if (mapRef.current) {
      mapRef.current.addLayer(newOverl);
      setOverl(newOverl);
    }
  } */
  
}, [activeOptLayer,mapRef]);

    return (
    <div style={{overflow:'hidden'}}>
    <div id="popup2" class="ol-popup">
      <div id="popup-content2" style={{textTransform:'capitalize',fontSize:'13px'}}></div>
    </div>
    <div ref={ref} style={{height:'calc(100vh - 155px)',width:'auto',marginLeft:0,marginBottom:'0px',padding:0}} className="map-container" />
    
    <Popper open={missingSource}>
        <div style={{position:'fixed',right:'330px',top:95, boxShadow:'0px 0px 1px #aaa',backgroundColor: 'rgba(14, 33, 1, 0.6)', border: '0px solid black', width:'180px', borderRadius:'5px',padding:'3px'}}>
        <Slide direction="down" in={missingSource} mountOnEnter unmountOnExit>
        <Typography sx={{fontSize: 15, marginLeft:1, marginY:0.5, fontWeight:'bold'}} color="white" gutterBottom>
          Note <Typography sx={{fontSize: 14}} color="white" gutterBottom>
                  Data to be updated soon.
                    </Typography>
        </Typography>
        </Slide>
        </div>
      </Popper> 
    </div>
    );
}