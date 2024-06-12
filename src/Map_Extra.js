import React, { useState, useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/WebGLTile';
import Polygon from 'ol/geom/Polygon.js';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import './index.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import {fromLonLat} from 'ol/proj';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import GeoJSON from 'ol/format/GeoJSON.js';

export default function Map_Extra({
  activeCrop, focus='Region', activeRegion,
  activeOpt
}) {
    const ref = useRef(null);
    const mapRef = useRef(null);
    const [overl, setOverl] = useState(null);
    const [vectorLayerr, setvectorLayerr] = useState(null);
    const [countryLayer, setcountryLayer] = useState(null);
    const [maskLayer1, setmaskLayer1] = useState(null);
    
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

    const osmLayer = new TileLayer({
        source: new OSM(),
    });

    useEffect(() => {
      let source1 = null;
      if (activeCrop.rice) {
        if(activeOpt.wsaa){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_WEAGA.tif' }],});}
        else if(activeOpt.lll){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_LASLV.tif' }],});}
        else if(activeOpt.zt){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_ZTILL.tif' }],});}
        else if(activeOpt.bbr){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_BBFIB.tif' }],});}
        else if(activeOpt.es){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_ADPTI.tif' }],});}
        else if(activeOpt.dsrd){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DSDRY.tif' }],});}
        else if(activeOpt.dsrw){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DSWET.tif' }],});}
        else if(activeOpt.sri){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_SRIUT.tif' }],});}
        else if(activeOpt.insu){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_INSUR.tif' }],});}
        else if(activeOpt.adapvari){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_ADVAR.tif' }],});}
        else if(activeOpt.up){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DPURZ.tif' }],});}
        else if(activeOpt.asa){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_DRGHT.tif' }],});}
        else if(activeOpt.rdf){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_MOREN.tif' }],});}
        else if(activeOpt.low){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_PNMLT.tif' }],});}
        else if(activeOpt.high){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_PNMHT.tif' }],});}
        else if(activeOpt.micro){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_MICIR.tif' }],});}
        else if(activeOpt.pwm){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_PWMGT.tif' }],});}
        else if(activeOpt.supp){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_WHSRC.tif' }],});}
        else if(activeOpt.frost){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
        else if(activeOpt.srf){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
        else if(activeOpt.micen){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
        else if(activeOpt.foggun){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
        else if(activeOpt.mech){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
        else if(activeOpt.ft){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
        else if(activeOpt.sc){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
        else if(activeOpt.cc){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Multiplicative_Suitability_Rice_X.tif' }],});}
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
        });
        newOverl.setOpacity(0.85);
        newOverl.setZIndex(90);
        
        newOverl.setStyle(color1);

        if (mapRef.current) {
          mapRef.current.addLayer(newOverl);
          setOverl(newOverl);
        }
      }
    }, [activeCrop,activeOpt,mapRef]);

    const opacity = 0.9;
    osmLayer.setOpacity(opacity);

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
        
        target: ref.current,
        layers: [osmLayer],
        view: ViewV,
      });
    }
    }, [ref, mapRef]);

    return (
      <div>
        <div ref={ref} style={{height:'calc(50vh - 100px)',width:'21vw',marginLeft:0,marginRight:0}} className="map-container" />
      </div>
    );
}