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
import tilesource from 'ol/source/TileJSON';
import {Control, ZoomToExtent, FullScreen, Zoom} from 'ol/control.js';
import './olsm.css';
import { Tooltip,Typography,Box } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import DownloadIcon from '@mui/icons-material/Download';

const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residues':'ZTILL','Broad Bed and Furrow':'BBFIB',
  'Direct Seeded Rice - Dry':'DSDRY','Direct Seeded Rice - Wet':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
  'Precision Fertilizer Management':'PNMLT','Precision Fertilizer Management - High tech':'PNMHT','Deep Placement of Urea':'DR',
  'ICT linked Input Management':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
  'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate Wetting and Drying':'AWD','Fertilizer rating and timing':'FRT',
  'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};

export default function Map_Option({
  activeCrop, focus='Region', activeRegion,
  activeOpt, area_dict, activeScenario
}) {
    const ref = useRef(null);
    const mapRef = useRef(null);
    const [overl, setOverl] = useState(null);
    const [vectorLayerr, setvectorLayerr] = useState(null);
    const [countryLayer, setcountryLayer] = useState(null);
    const [maskLayer1, setmaskLayer1] = useState(null);
    const [population, setpopulation] = useState(0);
    
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

    const key = 'TrN2dn4maoO3C2x0sUpH';


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

/*     const BingMapNew = new TileLayer2({
      preload: Infinity,
      source: new BingMaps({
        key: 'AvUc2NPj5dHI1yefH-oLqI4_EzAKBjyYTg3dM9c9lUrZglsLsvB1usgVz330xsZC',
        imagerySet: 'RoadOnDemand',
        // use maxZoom 19 to see stretched tiles instead of the BingMaps
        // "no photos at this zoom level" tiles
        // maxZoom: 19
      }),
      opacity:0.8,
      zIndex:10,
    }); */
    let defext = [
      6731721.531032621,
      -79003.34768295793,
      10843798.383928495,
      4648992.169943628
    ];

    let filename = "";

    if(activeOpt!==''){
      filename = activeCrop+"_"+activeOpt+"_"+activeScenario+'.tiff';
    }
    else{
      filename = activeCrop+"_CropMask_"+activeScenario+".tiff";
    }

    // Use React to create an MUI icon element
    const iconElement = (
      <DownloadIcon
        style={{
          fontSize: '16px', 
          verticalAlign: 'middle',
        }}
      />
    );

    // Define the download control
  class DownloadControl extends Control {
    constructor(options = {}) {
      const button = document.createElement('button');
      button.innerHTML = ReactDOMServer.renderToString(iconElement);;
      button.title = 'Download GeoTIFF Layer';

      const element = document.createElement('div');
      element.className = 'ol-control custom-download-control download-button';
      element.appendChild(button);

      super({
        element: element,
        target: options.target,
      });

      // Add event listener for the button click
      button.addEventListener('click', this.handleDownload.bind(this), false);
    }

    handleDownload() {
      const map = this.getMap(); // Get the map instance
      const layers = map.getLayers().getArray(); // Get all layers on the map

      // Find the GeoTIFF layer
      const geoTiffLayer = layers.find(
        (layer) => layer.getSource() instanceof GeoTIFF
      );

      if (geoTiffLayer) {
        const source_tiff = geoTiffLayer.getSource();
        // Access the URL from the `key_` property
        const geoTiffUrl = source_tiff.key_;
        if (geoTiffUrl) {
          this.downloadFile(geoTiffUrl, filename); // Trigger the download
        } else {
          alert('No URL found for the GeoTIFF layer.');
        }
      } else {
        alert('No GeoTIFF layer is currently displayed on the map.');
      }
    }

    downloadFile(url, filename) {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

    useEffect(() => {
      if (ref.current && !mapRef.current) {
        mapRef.current = new Map({
          controls: [
                      new ZoomToExtent({
                        extent: defext,
                        className: 'ol-zoomtoextenty'
                      }),
                    new Zoom({
                      className: 'ol-zoom-comp' 
                    }),
                      new FullScreen({
                        className: 'ol-fullscreeny'
                      }),
                      new DownloadControl({
                        className: 'download-button'
                      })
                    ],
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
  
        let urlstr = "xyz.tif";
          urlstr = "./Adap/"+activeCrop+"/Baseline/Suitability_"+activeCrop+"_"+optcode[activeOpt]+".tif";
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

  function getpopulation(){
    if(activeOpt!=='' && Object.keys(area_dict).length>0 ){
      let sec = activeRegion.indexOf(',');
      let y ='';
      let x = '';
      let rowstr = "";
      if (sec>0){
        y = activeRegion.substring(0,sec);
        x = activeRegion.substring(sec+2);
        let statecode = '';
        if(x==='Bangladesh'){
          statecode = y.substring(0,y.length-9) + 'DIV';
          rowstr = activeCrop+"_"+statecode+"_Suitability_"+activeCrop+"_"+optcode[activeOpt];
        }
        else if(x==='Nepal'){
          statecode = y + 'DIV';
          rowstr = activeCrop+"_"+statecode+"_Suitability_"+activeCrop+"_"+optcode[activeOpt];
        }
        else if(x==='India'||x==='Sri Lanka'||x==='Pakistan'){
          statecode = 'STATE_'+ y.toUpperCase();
          rowstr = activeCrop+"_"+statecode+"_Suitability_"+activeCrop+"_"+optcode[activeOpt];
        }
        else if(x==='Maldives'||x==='Afghanistan'){
          statecode = y.toUpperCase();
          rowstr = activeCrop+"_"+statecode+"_Suitability_"+activeCrop+"_"+optcode[activeOpt];
        }
        else if(x==='Bhutan'){
          statecode = y;
          rowstr = activeCrop+"_"+statecode+"_Suitability_"+activeCrop+"_"+optcode[activeOpt];
        }
      }
      else{
        rowstr = activeCrop+"_"+activeRegion+"_Suitability_"+activeCrop+"_"+optcode[activeOpt];
      }
      const row_data = area_dict[rowstr.toLowerCase()];
      return Math.round(row_data['Adaptation Benefits_Area']/1000000)
    }
    return 0;
  };
  const dt = getpopulation();

    return (
      <div>
      <Tooltip
      title={<Typography sx={{fontSize:11,fontWeight:'bold'}} color='black'>
        <Box sx={{width: "100%",height: 8,borderRadius: 0,bgcolor: '#06D001'}}/>
        {dt} M people
        <Typography sx={{fontSize:11,fontWeight:'bold'}} color='black'>under adapt.</Typography>
        <Typography sx={{fontSize:11,fontWeight:'bold'}} color='black'>benefits</Typography></Typography>}
      open={true}
      placement='bottom-start'
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [5, -85],
              },
            },
          ],
        },
      }}
      PopperProps={{style:{zIndex:0},
      sx: {
        '& .MuiTooltip-tooltip': {
          backgroundColor: '#ffffff', // Change to desired background color
        },
      },}}
    >
        <div ref={ref} style={{height:'calc(48vh - 92px)',width:'21vw',marginLeft:0,marginRight:0}} className="map-container" />
        </Tooltip> 
      </div>
    );
}