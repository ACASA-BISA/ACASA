import React, { useState, useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/WebGLTile';
import Polygon from 'ol/geom/Polygon.js';
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
import TileLayer2 from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';

export default function Map_Option({
  activeCrop, focus='Region', activeRegion,
  activeOpt
}) {
    const ref = useRef(null);
    const mapRef = useRef(null);
    const [overl, setOverl] = useState(null);
    const [vectorLayerr, setvectorLayerr] = useState(null);
    const [countryLayer, setcountryLayer] = useState(null);
    const [maskLayer1, setmaskLayer1] = useState(null);
    const [overl2, setOverl2] = useState(null);
    
    const fill = new Fill({
      color: 'rgba(255,255,255,0)',
    });

    const stroke = new Stroke({
      color: 'rgba(0, 0, 0, 1)',
      width: 1,
    });

    const stroke2 = new Stroke({
      color: 'rgba(50, 50, 50, 1)',
      width: 1,
    });

    const ViewV = new View({
      center: fromLonLat([71.2090057,21.6138954]),
      zoom: 3.5,
    });

    const color2 = {
      color: [
        'palette',
        [
        'interpolate',
        ['linear'],
        ['*',['band', 2], 16], 
        0,       // Start color (minimum value)
        1,        // Intermediate color
        2,
        4,
        3,
        5
      ],
      ['rgba(0,0,0,0)','rgba(0,0,0,0)',"rgba(180, 70, 109, 1)", '#FF9A00', "#06D001", "#004D00",
      ],
      ],
    };

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
    });

    useEffect(() => {
      if (ref.current && !mapRef.current) {
        mapRef.current = new Map({
          
          target: ref.current,
          layers: [BingMapNew],
          view: ViewV,
        });
      }
      }, [ref, mapRef]);

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
            url: './StateBoundary/IN_ST.json',
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
          let x = '';
          if (sec>0){
            y = activeRegion.substring(0,sec);
            x = activeRegion.substring(sec+2);
          }
          if(x==='Bangladesh'){
            let urlsourcestr = './DistrictBoundary/BD/'+ y.substring(0,y.length-9) + 'DIV.json';
            let urlcountrystr = './StateBoundary/BD/'+ y.substring(0,y.length-9) + 'ST.json';
            console.log(urlcountrystr);
            sourcet = new VectorSource({
              url: urlsourcestr,
              format: new GeoJSON(),
            });
            countryboundary = new VectorSource({
              url: urlcountrystr,
              format: new GeoJSON(),
            });
          }
          if(x==='Nepal'){
            let urlsourcestr = './DistrictBoundary/NP/'+ y + 'DIV.json';
            let urlcountrystr = './StateBoundary/NP/'+ y + 'ST.json';
            console.log(urlcountrystr);
            sourcet = new VectorSource({
              url: urlsourcestr,
              format: new GeoJSON(),
            });
            countryboundary = new VectorSource({
              url: urlcountrystr,
              format: new GeoJSON(),
            });
          }
          if(x==='Afghanistan'){
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
                  const sizee = mapRef.current.getSize();
                  mapRef.current.getView().fit(extentt,{size:[sizee[0]*1,sizee[1]*1]});
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
                stroke: stroke2,
                }),
            ], 
            opacity: 0.7,
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
                opacity:0.5,
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
    let source1 = null;
    const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residue':'ZTILL','Broad Bed and Furrow':'BBFIB',
      'DSR (Dry Seed)':'DSDRY','DSR (Wet Seed)':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
      'Low-tech Precision Technology':'PNMLT','High-tech Precision Technology':'PNMHT','Deep Placement of Urea':'DR',
      'ICT-based Agro Advisory':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
      'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate wetting and drying':'AWD','Fertilizer rating and timing':'FRT',
      'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};
  
        let urlstr = "xyz.tif";
          urlstr = "./Adap/"+activeCrop+"/Suitability_"+activeCrop+"_"+optcode[activeOpt]+".tif";
        source1 = new GeoTIFF({sources: [{ url: urlstr}],sourceOptions:{allowFullFile:true}});
      //console.log(urlstr);
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

        newOverl.setStyle(color2);

      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setOverl(newOverl);
      }
    }
    
  }, [activeCrop,activeOpt,mapRef]);



    return (
      <div>
        <div ref={ref} style={{height:'calc(48vh - 92px)',width:'21vw',marginLeft:0,marginRight:0}} className="map-container" />
      </div>
    );
}