import React, { useState, useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import { extent } from 'ol/extent';
import TileLayer from 'ol/layer/WebGLTile';
import TileLayer2 from 'ol/layer/Tile';
import Polygon from 'ol/geom/Polygon.js';
import 'ol/ol.css';
import './index.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import {fromLonLat} from 'ol/proj';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import BingMaps from 'ol/source/BingMaps';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Overlay from 'ol/Overlay';
//import RasterSource from 'ol/source/Raster';
import {FullScreen, Zoom} from 'ol/control.js';
//import {getVectorContext} from 'ol/render.js';
/* import OLCesium from 'olcs/OLCesium';
import {JulianDate} from 'cesium';
import { Cartesian3, createWorldTerrainAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium'; */

export default function MApp({
  activeCrop, focus='Region', activeRegion,
  activeOpt, CurrRisk, activeImpact,
}) {
  
    const ref = useRef(null);
    const mapRef = useRef(null);
    //const ol3d = useRef(null);
    const [overl, setOverl] = useState(null);
    const [vectorLayerr, setvectorLayerr] = useState(null);
    const [countryLayer, setcountryLayer] = useState(null);
    const [maskLayer1, setmaskLayer1] = useState(null);
    //const [dimens, setDimens] = useState('3D');
    
    /*const handleclick = () => {
      if (dimens==='2D'){
        setDimens('3D');
        if(ol3d.current){
          ol3d.current.setEnabled(false);
        }
        if(mapRef.current && ref.current){
          mapRef.current.setTarget(ref.current);
        }
      }
      else{
        setDimens('2D');
        if(mapRef.current){
          if(ol3d.current){
            ol3d.current.setEnabled(true);
          } 
          mapRef.current.setTarget(null);
        }
      }
    };*/

    const container = document.getElementById('popup2');
    const content = document.getElementById('popup-content2');
    const closer = document.getElementById('popup-closer2');

    const overlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    if(closer){
    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
    const fill = new Fill({
      color: 'rgba(255,255,255,0)',
    });

    const stroke = new Stroke({
      color: 'rgba(0, 0, 0, 1)',
      width: 1,
    });

    const ViewV = new View({
      center: fromLonLat([71.2090057,21.6138954]),
      zoom: 3.5,
    });

    const max = 3000;
    function normalize(value) {
      return ['/', value, max];
    };

    const red = normalize(['band', 1]);
    const nir = normalize(['band', 4]);

    const color1 = {
      color: [
        'palette',
        [
          'interpolate',
          ['linear'],
          ['/', ['-', nir, red], ['+', nir, red]],
          -0.1,
          0,
          3,
          10,
        ],
        ['rgba(98, 181, 209, 0)','#440154', '#3b528b', '#21918c', '#5ec962', '#fde725',
        'rgba(56, 150, 59, 1)','rgba(98, 181, 209, 1)','rgba(90, 230, 153, 1)',
        'rgba(98, 181, 209, 0)'],
      ],
    };

    /* const osmLayer = new TileLayer({
        source: new OSM(),
        opacity: 0.9,
    }); */

    const BingMapNew = new TileLayer2({
      preload: Infinity,
      source: new BingMaps({
        key: 'Atn0vmES8VxxGdRJ5nDXIu77cQnFlfa1OfQiDIYJMfuiBfL9jNAzky4SU0sXCKyW',
        imagerySet: 'RoadOnDemand',
        // use maxZoom 19 to see stretched tiles instead of the BingMaps
        // "no photos at this zoom level" tiles
        // maxZoom: 19
      }),
      opacity:0.8,
      zIndex:10,
    })

    useEffect(() => {
      let source1 = null;
      if (activeCrop.rice) {
        if (CurrRisk['hindex']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_hindex.tif' }]});}
        else if(CurrRisk['DEMON']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_DEMON.tif' }]});}
        else if(CurrRisk['TEMLO']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_TEMLO.tif' }],});}
        else if(CurrRisk['TEMUP']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_TEMUP.tif' }],});}
        //else if(CurrRisk['COLLO']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_COLLO.tif' }],});}
        else if(CurrRisk['RAINF']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_RAINF.tif' }],});}
        else if(CurrRisk['HIRHI']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_HIRHI.tif' }],});}
        else if(CurrRisk['DRYSP']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_DRYSP.tif' }],});}
        else if(CurrRisk['DROMO']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_DROMO.tif' }],});}
        //else if(CurrRisk['DROSE']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_DROSE.tif' }],});}
        //else if(CurrRisk['LODGE']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_LODGE.tif' }],});}
        //else if(CurrRisk['FROST']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_FROST.tif' }],});}
        else if(CurrRisk['SPICO']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_SPICO.tif' }],});}
        else if(CurrRisk['SPIHE']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_SPIHE.tif' }],});}
        //else if(CurrRisk['SPIRA']){source1 = new GeoTIFF({sources: [{ url: './Crop_TIFF_files/Rice_Hazard2/New_Rice_SPIRA.tif' }],});}
        else if(activeOpt['ICT Agro Advisory']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_WEAGA.tif' }],});}
        else if(activeOpt['Levelling']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_LASLV.tif' }],});}
        else if(activeOpt['Zero Tillage']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_ZTILL.tif' }],});}
        else if(activeOpt['Broad Bed and Furrow']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_BBFIB.tif' }],});}
        else if(activeOpt['Early Sowing']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_ADPTI.tif' }],});}
        else if(activeOpt['DSR (Dry Seed)']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DSDRY.tif' }],});}
        else if(activeOpt['DSR (Wet Seed)']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DSWET.tif' }],});}
        else if(activeOpt['SRI']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_SRIUT.tif' }],});}
        else if(activeOpt['Crop Insurance']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_INSUR.tif' }],});}
        else if(activeOpt['Stress Tolerant Variety']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_ADVAR.tif' }],});}
        else if(activeOpt['Deep Placement of Urea']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DPURZ.tif' }],});}
        //else if(activeOpt.asa){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DRGHT.tif' }],});}
        //else if(activeOpt.rdf){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_MOREN.tif' }],});}
        else if(activeOpt['Low Tech Precision Technology']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_PNMLT.tif' }],});}
        else if(activeOpt['High Tech Precision Technology']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_PNMHT.tif' }],});}
        else if(activeOpt['Microirrigation']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_MICIR.tif' }],});}
        else if(activeOpt['Precision Management']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_PWMGT.tif' }],});}
        else if(activeOpt['Farm Pond']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_WHSRC.tif' }],});}
        else if(activeImpact['Impact on Productivity']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Rice_y.tif' }],});}
        else if(activeImpact['Value of Production']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Rice_x.tif' }],});}
        else{
          source1 = new GeoTIFF({sources: [{ url: './Crop Masks/New1/New_ACASA_RICE_MASK.tif' }] });
        }
      } else if (activeCrop.maize) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/New1/New_ACASA_MAIZE_MASK.tif' }]});
      } else if (activeCrop.wheat) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/New1/New_ACASA_WHEAT_MASK.tif' }] });
      } else if (activeCrop.barley) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/New1/New_ACASA_BARLEY_MASK.tif' }] });
      } else if (activeCrop.mustard) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/New1/New_ACASA_MUSTARD_MASK.tif' }] });
      } else if (activeCrop.ppea) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/New1/New_ACASA_PPEA_MASK.tif' }] });
      } else if (activeCrop.potato) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/New1/New_ACASA_POTATO_MASK.tif' }] });
      }
  
      if (mapRef.current && overl) {
        mapRef.current.removeLayer(overl);
        setOverl(null);
      }
      
      if (source1) {
        const newOverl = new TileLayer({
          source: source1,
          opacity: 0.85,
          zIndex: 90,
        });
        
        newOverl.setStyle(color1);

        if (mapRef.current) {
          mapRef.current.addLayer(newOverl);
          setOverl(newOverl);
        }
      }
    }, [CurrRisk,activeCrop,activeOpt,activeImpact,mapRef]);
 
    useEffect(() => {
      let sourcet;
      let countryboundary;
      if (focus==='Region') {
        sourcet = new VectorSource({
          url: './CountryBoundary/SA_outline.json',
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
          url: './CountryBoundary/IN.json',
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: './CountryBoundary/IN.json',
          format: new GeoJSON(),
        });
      } else if (activeRegion==='Maldives') {
        sourcet = new VectorSource({
          url: './CountryBoundary/MV.json',
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
        if (sec>0){
          y = activeRegion.substring(0,sec);
        }
        if(y==='Barisal Division'){
          sourcet = new VectorSource({
            url: './DistrictBoundary/BD/BarishalDIV.json',
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: './StateBoundary/BD/BarishalST.json',
            format: new GeoJSON(),
          });
        }
        if(y==='Chittagong Division'){
          sourcet = new VectorSource({
            url: './DistrictBoundary/BD/ChattagramDIV.json',
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: './StateBoundary/BD/ChattagramST.json',
            format: new GeoJSON(),
          });
        }
        if(y==='Dhaka Division'){
          sourcet = new VectorSource({
            url: './DistrictBoundary/BD/DhakaDIV.json',
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: './StateBoundary/BD/DhakaST.json',
            format: new GeoJSON(),
          });
        }
        if(y==='Khulna Division'){
          sourcet = new VectorSource({
            url: './DistrictBoundary/BD/KhulnaDIV.json',
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: './StateBoundary/BD/KhulnaST.json',
            format: new GeoJSON(),
          });
        }
        if(y==='Sylhet Division'){
          sourcet = new VectorSource({
            url: './DistrictBoundary/BD/SylhetDIV.json',
            format: new GeoJSON(),
          });
          countryboundary = new VectorSource({
            url: './StateBoundary/BD/SylhetST.json',
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
                const extentt = polyy.getExtent(); 
                
                mapRef.current.getView().fit(extentt,{padding:[0,0,0,0]});
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
                  if(polyone.getType()==='MultiPolygon'){
                    const polygons = polyone.getPolygons();
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
              opacity:0.7,
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
    }, [activeRegion,focus,mapRef]);

    useEffect(() => {
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        controls: [
          new FullScreen({
          className: 'ol-fullscreenx' 
        }),
        new Zoom({
          className: 'ol-zoomx' 
        }),
      ],
        target: ref.current,
        layers: [BingMapNew],
        overlays: [overlay],
        view: ViewV,
      });
    }
    const container = document.getElementById('popup2');
    const content = document.getElementById('popup-content2');
    const closer = document.getElementById('popup-closer2');

    if (!container || !content || !closer) {
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

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

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
          state = feature.get('STATE')
        }
      }
      return state;
    };

    function getCentroidOfPolygon(geometry) {
      const extentt = geometry.getExtent();
      let x = 0, y=0;
      x = (extentt[0]+extentt[1])/2;
      y = (extentt[2]+extentt[3])/2;
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
      mapRef.current.on('singleclick', function (evt) {
      if (evt.dragging) {
        return;
      }
      //const coordinate = evt.coordinate;
      const pixel = mapRef.current.getEventPixel(evt.originalEvent);
      if(content){
      content.innerHTML = display_state(pixel);
      };
      //console.log(overlay);
      overlay.setPosition(LocationofEvent(pixel));
      mapRef.current.addOverlay(overlay);
    });
    }
    }, [ref, mapRef]);

    return (
      <div>
    <div ref={ref} style={{height:'calc(100vh - 80px)',width:'auto',marginTop:'80px',marginLeft:0,marginBottom:'-16px'}} className="map-container" />
    <div id="popup2" class="ol-popup">
      <a href="#" id="popup-closer2" class="ol-popup-closer"></a>
      <div id="popup-content2"></div>
      </div>
    </div>
    );
}