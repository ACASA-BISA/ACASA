import React, { useState, useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
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
import {FullScreen, Zoom} from 'ol/control.js';
import OSM from 'ol/source/OSM';

export default function MApp({
  activeCrop, focus='Region', activeRegion,
  activeOpt, CurrRisk, activeImpact,
}) {

    const ref = useRef(null);
    const mapRef = useRef(null);
    const [overl, setOverl] = useState(null);
    const [vectorLayerr, setvectorLayerr] = useState(null);
    const [countryLayer, setcountryLayer] = useState(null);
    const [maskLayer1, setmaskLayer1] = useState(null);

    const [isRasterLayerReady, setIsRasterLayerReady] = useState(false);
    const [isVectorLayerReady, setIsVectorLayerReady] = useState(false);
    const [isMapReady, setIsMapReady] = useState(false);

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

    const max = 1;
    function normalize(value) {
      return ['/', value, max];
    };

    const red = normalize(['band', 1]);
    const green = normalize(['band', 2]);
    const blue = normalize(['band', 3]);
    const nir = normalize(['band', 4]);

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
        ['rgba(98, 181, 209, 0)','#440154', '#3b528b', '#21918c', '#5ec962', '#fde725',
        'rgba(140, 150, 250, 1)','rgba(98, 181, 209, 1)','rgba(90, 230, 153, 1)',
        'rgba(250, 181, 109, 1)','rgba(180, 70, 109, 1)'],
      ],
    };
    
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
      ['rgba(0,0,0,0)','rgba(0,0,0,0)',"rgba(180, 70, 109, 1)", 'rgba(98, 181, 209, 1)', "#00A600", "#004D00",
      ],
      ],
    };

    const color_hazard = {
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

/*     const BingMapNew = new TileLayer({
       source: new OSM(),
        opacity: 0.9,
     });
 */
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
      let opt = 1;
      if (activeCrop.rice) {
        if (CurrRisk['HINDEX']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/Hazard index.tif' }]});}
        else if(CurrRisk['HEAT STRESS1']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/ZZ_Heat stress.tif' }]});}
        else if(CurrRisk['HEAT STRESS2']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/ZZ_High temperature induced spikelet sterility.tif' }],});}
        else if(CurrRisk['COLD STRESS']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/ZZ_Low temperature induced spikelet sterility.tif' }],});}
        else if(CurrRisk['DELMON']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/ZZ_Delayed monsoon.tif' }],});}
        else if(CurrRisk['SPI']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/ZZ_Drought.tif' }],});}
        else if(CurrRisk['DSN']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/ZZ_Number of dry spells.tif'  }],});}
        else if(CurrRisk['FLOOD']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Aman Rice/ZZ_Flood.tif' }],});}
        
        else if(activeOpt['ICT Agro Advisory']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_WEAGA.tif' }],});}
        else if(activeOpt['Levelling']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_LASLV.tif' }],});}
        else if(activeOpt['Zero Tillage']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_ZTILL.tif' }],});}
        else if(activeOpt['Broad Bed and Furrow']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_BBFIB.tif' }],});}
        else if(activeOpt['Early Sowing']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_ADPTI.tif' }],});}
        else if(activeOpt['DSR (Dry Seed)']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_DSDRY.tif' }],});}
        else if(activeOpt['DSR (Wet Seed)']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_DSWET.tif' }],});}
        else if(activeOpt['SRI']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_SRIUT.tif' }],});}
        else if(activeOpt['Crop Insurance']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_INSUR.tif' }],});}
        else if(activeOpt['Stress Tolerant Variety']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_ADVAR.tif' }],});}
        else if(activeOpt['Deep Placement of Urea']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_DPURZ.tif' }],});}
        else if(activeOpt['Low Tech Precision Technology']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_PNMLT.tif' }],});}
        else if(activeOpt['High Tech Precision Technology']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_PNMHT.tif' }],});}
        else if(activeOpt['Microirrigation']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_MICIR.tif' }],});}
        else if(activeOpt['Precision Management']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_PWMGT.tif' }],});}
        else if(activeOpt['Farm Pond']){source1 = new GeoTIFF({sources: [{ url: './Rice/Suitability_Rice_WHSRC.tif' }],});}
        else if(activeImpact['Impact on Productivity']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Rice_y.tif' }],});}
        else if(activeImpact['Value of Production']){source1 = new GeoTIFF({sources: [{ url: './Multiplicative_with_zeros/Rice_x.tif' }],});}
        else{
          source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Rice801.tif' }] });
        }
      } else if (activeCrop.maize) {
        if (CurrRisk['HINDEX']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Hazard index.tif' }]});}
        else if(CurrRisk['HEAT STRESS1']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Heat stress.tif' }]});}
        else if(CurrRisk['HEAT STRESS2']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_High temperature induced pollen sterility.tif' }],});}
        else if(CurrRisk['COLD STRESS']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Cold Stress.tif' }],});}
        else if(CurrRisk['ERWL']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Excess rain and waterlogging.tif' }],});}
        else if(CurrRisk['DELMON']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Delayed monsoon.tif' }],});}
        else if(CurrRisk['SPI']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Drought.tif' }],});}
        else if(CurrRisk['DSN']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Number of dry spells.tif'  }],});}
        else if(CurrRisk['FLOOD']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Maize/ZZ_Flood.tif' }],});}

        else if(activeOpt['ICT Agro Advisory']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_WEAGA.tif' }],});}
        else if(activeOpt['Levelling']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_LASLV.tif' }],});}
        else if(activeOpt['Zero Tillage']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_ZTILL.tif' }],});}
        else if(activeOpt['Broad Bed and Furrow']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_BBFIB.tif' }],});}
        else if(activeOpt['Early Sowing']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_ADPTI.tif' }],});}
        else if(activeOpt['Mulching']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_MULCH.tif' }],});}
        else if(activeOpt['Crop Insurance']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_INSUR.tif' }],});}
        else if(activeOpt['Stress Tolerant Variety']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_ADVAR.tif' }],});}
        else if(activeOpt['Fertilizer rating and timing']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_FRT.tif' }],});}
        else if(activeOpt['Low Tech Precision Technology']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_PNMLT.tif' }],});}
        else if(activeOpt['High Tech Precision Technology']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_PNMHT.tif' }],});}
        else if(activeOpt['Microirrigation']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_MICIR.tif' }],});}
        else if(activeOpt['Precision Water Management']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_PWMGT.tif' }],});}
        else if(activeOpt['Farm Pond']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_WHSRC.tif' }],});}
        else if(activeImpact['Impact on Productivity']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_x.tif' }],});}
        else if(activeImpact['Value of Production']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Maize/Suitability_Maize_y.tif' }],});}

        else{
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Maize801.tif' }]});
        }
      } else if (activeCrop.wheat) {
        if (CurrRisk['HINDEX']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Wheat/ZZ_Hazard index.tif' }]});}
        else if(CurrRisk['HEAT STRESS']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Wheat/ZZ_High temperature induced pollen sterility.tif' }]});}
        else if(CurrRisk['TERMINAL HEAT']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Wheat/ZZ_Terminal heat.tif' }],});}
        else if(CurrRisk['FROST']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Wheat/ZZ_Days of frost.tif' }],});}
        else if(CurrRisk['ERWL']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Wheat/ZZ_Untimely rainfall.tif' }],});}
        else if(CurrRisk['SPI']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Wheat/ZZ_Drought.tif' }],});}
        else if(CurrRisk['LODGE']){source1 = new GeoTIFF({sources: [{ url: './Hazards/Wheat/ZZ_Rain and wind causing lodging.tif'  }],});}

        else if(activeOpt['ICT Agro Advisory']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_WEAGA.tif' }],});}
        else if(activeOpt['Levelling']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_LASLV.tif' }],});}
        else if(activeOpt['Zero Tillage']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_ZTILL.tif' }],});}
        else if(activeOpt['Broad Bed and Furrow']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_BBFIB.tif' }],});}
        else if(activeOpt['Early Sowing']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_ADPTI.tif' }],});}
        else if(activeOpt['Mulching']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_MULCH.tif' }],});}
        else if(activeOpt['Crop Insurance']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_INSUR.tif' }],});}
        else if(activeOpt['Stress Tolerant Variety']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_ADVAR.tif' }],});}
        else if(activeOpt['Fertilizer rating and timing']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_FRT.tif' }],});}
        else if(activeOpt['Low Tech Precision Technology']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_PNMLT.tif' }],});}
        else if(activeOpt['High Tech Precision Technology']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_PNMHT.tif' }],});}
        else if(activeOpt['Microirrigation']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_MICIR.tif' }],});}
        else if(activeOpt['Precision Water Management']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_PWMGT.tif' }],});}
        else if(activeOpt['Farm Pond']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_WHSRC.tif' }],});}
        else if(activeImpact['Impact on Productivity']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_x.tif' }],});}
        else if(activeImpact['Value of Production']){opt=2;source1 = new GeoTIFF({sources: [{ url: './Adap/Wheat/Suitability_Wheat_y.tif' }],});}

        else{
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Wheat801.tif' }] });
        }
      } else if (activeCrop.rapeseed) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Mustard801.tif' }] });
      } else if (activeCrop.ppea) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Pigeonpea801.tif' }] });
      } else if (activeCrop.potato) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Potato801.tif' }] });
      } else if (activeCrop.pmillet) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_PearlMillet801.tif' }] });
      } else if (activeCrop.sorghum) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Sorghum801.tif' }] });
      } else if (activeCrop.onion) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Onion801.tif' }] });
      } else if (activeCrop.soyabean) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Soybean801.tif' }] });
      } else if (activeCrop.cotton) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Cotton801.tif' }] });
      } else if (activeCrop.fmillet) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Millet801.tif' }] });
      } else if (activeCrop.chickpea) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Chickpea801.tif' }] });
      } else if (activeCrop.groundnut) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Groundnut801.tif' }] });
      } else if (activeCrop.lentil) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Lentil801.tif' }] });
      } else if (activeCrop.sugarcane) {
        source1 = new GeoTIFF({sources: [{ url: './Crop Masks/AllPix/ZZ_Mask_Sugarcane801.tif' }] });
      }
  
      if (mapRef.current && overl) {
        mapRef.current.removeLayer(overl);
        setOverl(null);
      }
      //HEAT STRESS	SPIKELET STERILITY HEAT	SPIKELET STERILITY COLD
      if (source1) {
        const newOverl = new TileLayer({
          source: source1,
          opacity: 0.85,
          zIndex: 90,
        });
        newOverl.setStyle(color_hazard);
        if(opt===2){
          newOverl.setStyle(color2);
        }
        //console.log(source1.getAttributions());

        if (mapRef.current) {
          mapRef.current.addLayer(newOverl);
          setOverl(newOverl);
          setIsRasterLayerReady(true);
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
                mapRef.current.getView().fit(extentt,{size:[sizee[0]*0.8,sizee[1]*0.8]});
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
              opacity:0.7,
              zIndex:100,
            });

            if(maskLayer1){
              mapRef.current.removeLayer(maskLayer1);
              setmaskLayer1(null);
            }
            mapRef.current.addLayer(maskLayer);
            setmaskLayer1(maskLayer);
            setIsVectorLayerReady(true);
            }
            }
          });
      }
      }
}, [activeRegion,focus,mapRef]);

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
            className: 'ol-fullscreenx' 
          }),
          new Zoom({
            className: 'ol-zoomx' 
          }),
        ],
          target: ref.current,
          layers: [BingMapNew],
          //overlays: [overlay],
          view: ViewV,
        });
      }
    setIsMapReady(true);

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

    return (
      <div>
      <div id="popup2" class="ol-popup">
      <div id="popup-content2" style={{textTransform:'capitalize',fontSize:'13px'}}></div>
      </div>
    <div ref={ref} style={{height:'calc(100vh - 80px)',width:'auto',marginTop:'80px',marginLeft:0,marginBottom:'-16px'}} className="map-container" />
    </div>
    );
}