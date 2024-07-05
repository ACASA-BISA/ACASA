import React, { useState, useEffect, useRef } from 'react';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorImage from 'ol/layer/VectorImage';
import VectorLayer from 'ol/layer/Vector';
import ImageLayer from 'ol/layer/Image';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/WebGLTile';
import TileLayer2 from 'ol/layer/Tile';
import RasterSource from 'ol/source/Raster';
import Tile from 'ol/layer/Tile';
import Style from 'ol/style/Style';
import {fromLonLat} from 'ol/proj';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import OSM from 'ol/source/OSM';
import Stroke from 'ol/style/Stroke';
import { Map, View } from 'ol';
import bbox from '@turf/bbox';
import { featureCollection } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { fromFile } from "geotiff";
import { polygon } from "@turf/turf";

async function clipUsingPolygon(
  tiffFilePath,
  polygonCoordinates,
  outputJsonFile
) {
  try {
    // TIFF file using geotiff
    const tiff = await fromFile(tiffFilePath);
    const image = await tiff.getImage();
    const rasters = await image.readRasters();

    // Geotransform
    const tiePoint = image.getTiePoints()[0];
    const pixelScale = image.getFileDirectory().ModelPixelScale;
    const originX = tiePoint.x;
    const originY = tiePoint.y;
    const pixelWidth = pixelScale[0];
    const pixelHeight = -pixelScale[1]; // Assuming negative for north-up images

    // Getting image dimensions
    const width = image.getWidth();
    const height = image.getHeight();

    // Empty array for the mask
    const maskArray = new Uint8Array(width * height).fill(0);

    // Creating turf polygon
    const turfPolygon = polygon([polygonCoordinates]);

    // Filling the mask array based on the polygon
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const geoX = originX + x * pixelWidth;
        const geoY = originY - y * pixelHeight;
        if (booleanPointInPolygon([geoX, geoY], turfPolygon)) {
          maskArray[y * width + x] = 1;
        }
      }
    }

    // Extracting the region using the mask
    const data = rasters[0]; //Single-band image
    const pixels = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x;
        if (maskArray[index]) {
          pixels.push(data[index]);
        }
      }
    }

    // Preparing JSON object with relevant image information
    const jsonOutput = {
      width,
      height,
      pixels,
    };

  } catch (error) {
    console.error("Error processing the TIFF file:", error);
  }
}

export default function PieValue({
    activeCrop, focus='Region', activeRegion,
    activeOpt, CurrRisk, activeImpact,
  }) {
       /* const fill = new Fill({
        color: 'rgba(0,0,0,1)',
      });
  
      const stroke = new Stroke({
        color: 'rgba(0, 0, 0, 1)',
        width: 1,
      });
      
    useEffect(() => {
        const mask_value = 255;
        const calculatePercentage = (rasterData, vectorMask) => {
            let count = 0;
            let total = 0;
             // Assuming the mask is defined by the alpha channel
      
            for (let i = 0; i < rasterData.length; i++) {
              let pixel = rasterData[i];
              let mask_pixel = vectorMask[i];
      
              if (mask_pixel === mask_value) {
                let value = pixel[0];
                if (value >= 3.5 && value <= 6) {
                  count++;
                }
                total++;
              }
            }
      
            let percentage = (count / total) * 100;
            console.log('Percentage of values in range:', percentage);
          };
        console.log("Here");

        let countryboundary;
        if (focus==='Region') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/SA_outline.json',
            format: new GeoJSON(),
          });
        } else if (activeRegion==='Afghanistan') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/AF.json',
            format: new GeoJSON(),
          });
        } else if (activeRegion==='Bangladesh') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/BD.json',
            format: new GeoJSON(),
          });
        } else if (activeRegion==='Bhutan') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/BT.json',
            format: new GeoJSON(),
          });
        } else if (activeRegion==='India') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/IN.json',
            format: new GeoJSON(),
          });
        } else if (activeRegion==='Maldives') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/MV.json',
            format: new GeoJSON(),
          });
        } else if (activeRegion==='Nepal') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/NP.json',
            format: new GeoJSON(),
          });
         } else if (activeRegion==='Pakistan') {
          countryboundary = new VectorSource({
            url: './CountryBoundary/PK.json',
            format: new GeoJSON(),
          });
        } else if (activeRegion==='Sri Lanka') {
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
            let urlcountrystr = './StateBoundary/BD/'+ y.substring(0,y.length-9) + 'ST.json';
            countryboundary = new VectorSource({
              url: urlcountrystr,
              format: new GeoJSON(),
            });
          }
          if(x==='Nepal'){
            let urlcountrystr = './StateBoundary/NP/'+ y + 'ST.json';
            countryboundary = new VectorSource({
              url: urlcountrystr,
              format: new GeoJSON(),
            });
          }
          if(x==='Afghanistan'){
            let urlcountrystr = './StateBoundary/AF/STATE_'+ y.toUpperCase() + '.json';
            countryboundary = new VectorSource({
              url: urlcountrystr,
              format: new GeoJSON(),
            });
          }
        }

        let source1 = null;
        const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Levelling':'LASLV','Zero Tillage':'ZTILL','Broad Bed and Furrow':'BBFIB',
            'DSR (Dry Seed)':'DSDRY','DSR (Wet Seed)':'DSWET','System of Rice Intensification':'SRIUT','Farm Pond':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
            'Low Tech Precision Technology':'PNMLT','High Tech Precision Technology':'PNMHT','Deep Placement of Urea':'DR',
            'ICT Agro Advisory':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
            'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate wetting and drying':'AWD','Fertilizer rating and timing':'FRT',
            'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};

        const hazardname = {"District Level": "District Level","Downscaled Risk": "Downscaled Risk","Risk Index": "Risk Index","Hazard Index": "Hazard Index","Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
            "Low temperature induced pollen sterility": "Low temperature induced pollen sterility","High temperature induced pollen sterility": "High temperature induced pollen sterility",
            "Heat Stress": "Heat stress","Heat Stress": "Heat stress","High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
            "Cold Stress": "Cold stress","Low temperature induced tuberization failure": "Low temperature induced tuberization failure",'Untimely Rainfall':"Untimely rainfall",
            "Terminal Heat": "Terminal heat","Days of Frost": "Days of Frost","Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
            "Delayed Monsoon": "Delayed monsoon","Drought": "Drought","Dry Spell": "Number of dry spells","Flood": "Flood",
            "Lodging": "Rain and wind causing lodging","Biotic": "High humidity and temperature for blight","Irrigation": "Irrigation","Water Holding": "Water Holding","Income": "Income",
            "Access to Credit": "Access to Credit","Access to Market": "Access to Market","Elevation": "Elevation","Access to Knowledge": "Access to Knowledge","Exposure Index": "Exposure Index",
            "Number of Farmers": "Number of Farmers","Cropped Area": "Cropped Area","Excess Rainfall":"Excess rainfall"
        }
        let urlstr = "";
        if(activeOpt!==''){
            urlstr = "./Adap/"+activeCrop+"/Suitability_"+activeCrop+"_"+optcode[activeOpt]+".tif";
            source1 = new GeoTIFF({sources: [{ url: urlstr}],sourceOptions:{allowFullFile:true}});
            }
        else if(CurrRisk!==''){
            urlstr = "./Hazards/"+activeCrop+"/ZZ_"+hazardname[CurrRisk]+".tif";
            source1 = new GeoTIFF({sources: [{ url: urlstr}],sourceOptions:{allowFullFile:true}});
            }
        else{
            urlstr = './Crop Masks/AllPix/ZZ_Mask_'+activeCrop+'801.tif';
            source1 = new GeoTIFF({sources: [{ url: urlstr }], sourceOptions:{allowFullFile:true} });
            }
  
        if (countryboundary) {
          let newcountrylayer = new VectorImage({
              source: countryboundary,
              style: [
                new Style({
                fill: fill,
                stroke: stroke,
                }),
            ],
          });

            if (countryboundary.getState() === 'ready') {
              if(countryboundary.getFeatures()) {
                const featuress = countryboundary.getFeatures();
                console.log(featuress);
              }
            }
          

        }
    }, [activeRegion,focus,activeOpt,CurrRisk,activeCrop,activeImpact]); */

    return(
        <div>

        </div>
    )
  }