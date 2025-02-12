import React, { useState, useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/WebGLTile';
import Polygon from 'ol/geom/Polygon.js';
//import OSM from 'ol/source/OSM';
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
import Tooltip from '@mui/material/Tooltip';
import TileLayer2 from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import Typography from '@mui/material/Typography';

export default function SMap({
  activeCrop, focus='Region', activeRegion,
  activeOpt, CurrRisk='',
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

    const stroke2 = new Stroke({
      color: 'rgba(50, 50, 50, 1)',
      width: 1,
    });

    const ViewV = new View({
      center: fromLonLat([71.2090057,21.6138954]),
      zoom: 3.5,
    });

    const color1 = {
      color: [
        'palette',
        [
        'interpolate',
        ['linear'],
        ['*',['band', 2], 100], 
        -1,       // Start color (minimum value)
        0,        // Intermediate color
        3.5,
        6,
        8.5,
        11,
      ],
      ['rgba(0,0,0,0)','rgba(0,0,0,0)','#5ec962','#21918c','#3b528b','#440154',
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
        else if(activeOpt.wsaa){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/EveryHazard2_Multiplicative_Suitability_Rice_WEAGA.tif' }],});}
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
        });
        newOverl.setOpacity(0.85);
        newOverl.setZIndex(90);
        
        newOverl.setStyle(color1);

        if (mapRef.current) {
          mapRef.current.addLayer(newOverl);
          setOverl(newOverl);
        }
      }
    }, [CurrRisk,activeCrop,activeOpt,mapRef]);

    return (
      <div>
        <Tooltip
      title={<Typography sx={{fontSize:12}}>Productivity</Typography>}
      open={true}
      placement='top'
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -50],
              },
            },
          ],
        },
      }}
      PopperProps={{style:{zIndex:0}}}
    >
      <Tooltip
      title={<Typography sx={{fontSize:12}}>(To be Updated soon)</Typography>}
      open={true}
      placement='top'
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -80],
              },
            },
          ],
        },
      }}
      PopperProps={{style:{zIndex:0}}}
    >
        <div ref={ref} style={{position:'relative',height:'calc(100vh - 192px)',width:'24vw',marginLeft:0,marginRight:0}} className="map-container" />
        </Tooltip>
        </Tooltip>
      </div>
    );
}