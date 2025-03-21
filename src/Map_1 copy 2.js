import React, { useState, useEffect, useRef } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/WebGLTile";
import TileLayer2 from "ol/layer/Tile";
import Polygon from "ol/geom/Polygon.js";
import "ol/ol.css";
import "./index.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import { fromLonLat } from "ol/proj";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import BingMaps from "ol/source/BingMaps";
import GeoTIFF from "ol/source/GeoTIFF.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Overlay from "ol/Overlay";
import { FullScreen, Zoom } from "ol/control.js";
import OSM from "ol/source/OSM";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { fromFile } from "geotiff";
import { polygon } from "@turf/turf";

//const fs = require("fs");

async function clipUsingPolygon(tiffFilePath, polygonCoordinates) {
  try {
    // TIFF file using geotiff
    console.log("Here1");
    const tiff = await fromFile("C:/code/acasa-app/public/Hazards/Rice/ZZ_Number of dry spells.tif");
    console.log("Here2");
    const image = await tiff.getImage();
    const rasters = await image.readRasters();

    // Geotransform
    const tiePoint = image.getTiePoints()[0];
    const pixelScale = image.getFileDirectory().ModelPixelScale;
    const originX = tiePoint.x;
    const originY = tiePoint.y;
    const pixelWidth = pixelScale[0];
    const pixelHeight = -pixelScale[1]; // Assuming negative for north-up images

    //Geo coordinates -> pixel coordinates
    function geoToPixel(geoX, geoY) {
      const pixelX = Math.round((geoX - originX) / pixelWidth);
      const pixelY = Math.round((originY - geoY) / pixelHeight);
      return [pixelX, pixelY];
    }

    //Polygon coordinates -> pixel coordinates
    const pixelPolygon = polygonCoordinates.map(([geoX, geoY]) => geoToPixel(geoX, geoY));

    // Getting image dimensions
    const width = image.getWidth();
    const height = image.getHeight();

    // Empty array for the mask
    const maskArray = new Uint8Array(width * height).fill(0);
    console.log("Here");
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

export default function MApp({ activeCrop, focus = "Region", activeRegion, activeOpt, CurrRisk, activeImpact }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const [overl, setOverl] = useState(null);
  const [vectorLayerr, setvectorLayerr] = useState(null);
  const [countryLayer, setcountryLayer] = useState(null);
  const [maskLayer1, setmaskLayer1] = useState(null);
  const [tiffFilePath, settiffFilePath] = useState("");
  const [polycord, setpolycord] = useState(null);

  const fill = new Fill({
    color: "rgba(255,255,255,0)",
  });

  const stroke = new Stroke({
    color: "rgba(0, 0, 0, 1)",
    width: 1,
  });

  const ViewV = new View({
    center: fromLonLat([71.2090057, 21.6138954]),
    zoom: 3.5,
  });

  const max = 1;
  function normalize(value) {
    return ["/", value, max];
  }

  const red = normalize(["band", 1]);
  const green = normalize(["band", 2]);
  const blue = normalize(["band", 3]);
  const nir = normalize(["band", 4]);

  const color1 = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["/", ["-", nir, green], ["+", nir, blue]], -0.1, 0, 3, 10],
      [
        "rgba(98, 181, 209, 0)",
        "#440154",
        "#3b528b",
        "#21918c",
        "#5ec962",
        "#fde725",
        "rgba(140, 150, 250, 1)",
        "rgba(98, 181, 209, 1)",
        "rgba(90, 230, 153, 1)",
        "rgba(250, 181, 109, 1)",
        "rgba(180, 70, 109, 1)",
      ],
    ],
  };

  const color2 = {
    color: [
      "palette",
      [
        "interpolate",
        ["linear"],
        ["*", ["band", 2], 16],
        0, // Start color (minimum value)
        1, // Intermediate color
        2,
        4,
        3,
        5,
      ],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(180, 70, 109, 1)", "rgba(98, 181, 209, 1)", "#00A600", "#004D00"],
    ],
  };

  const color_hazard = {
    color: [
      "palette",
      [
        "interpolate",
        ["linear"],
        ["*", ["band", 2], 310],
        0, // Start color (minimum value)
        1, // Intermediate color
        3.5,
        2,
        6,
        3,
        8.5,
        4,
        11,
        5,
      ],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#5ec962", "#21918c", "#3b528b", "#440154"],
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
      key: "Atn0vmES8VxxGdRJ5nDXIu77cQnFlfa1OfQiDIYJMfuiBfL9jNAzky4SU0sXCKyW",
      imagerySet: "RoadOnDemand",
      // use maxZoom 19 to see stretched tiles instead of the BingMaps
      // "no photos at this zoom level" tiles
      // maxZoom: 19
    }),
    opacity: 0.8,
    zIndex: 10,
  });

  useEffect(() => {
    const container = document.getElementById("popup2");
    const content = document.getElementById("popup-content2");

    if (!container || !content) {
      console.error("Popup elements not found");
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
            className: "ol-fullscreenx",
          }),
          new Zoom({
            className: "ol-zoomx",
          }),
        ],
        target: ref.current,
        layers: [BingMapNew],
        //overlays: [overlay],
        view: ViewV,
      });
    }

    const display_state = function (pixel) {
      const feature = mapRef.current.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      let state = null;
      if (feature) {
        if (feature.get("D_NAME_1")) {
          state = feature.get("D_NAME_1");
        } else {
          state = feature.get("STATE");
        }
      }
      return state;
    };

    function getCentroidOfPolygon(geometry) {
      const extentt = geometry.getExtent();
      let x = 0,
        y = 0;
      x = (extentt[0] + extentt[2]) / 2;
      y = (extentt[1] + extentt[3]) / 2;
      return [x, y];
    }

    const LocationofEvent = function (pixel) {
      const feature = mapRef.current.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      let cordinates = null;
      if (feature) {
        const geometry = feature.getGeometry();
        cordinates = getCentroidOfPolygon(geometry);
      }
      return cordinates;
    };

    if (mapRef.current) {
      mapRef.current.on("pointermove", function (evt) {
        if (evt.dragging) {
          return;
        }
        //const coordinate = evt.coordinate;
        const pixel = mapRef.current.getEventPixel(evt.originalEvent);
        const contentofbox = display_state(pixel);
        if (contentofbox) {
          if (content) {
            content.innerHTML = contentofbox.toLowerCase();
          }
          //console.log(overlay);
          overlay.setPosition(LocationofEvent(pixel));
          mapRef.current.addOverlay(overlay);
        } else {
          mapRef.current.removeOverlay(overlay);
        }
      });
    }
  }, [ref, mapRef]);

  useEffect(() => {
    let sourcet;
    let countryboundary;
    if (focus === "Region") {
      sourcet = new VectorSource({
        url: "./CountryBoundary/SA_outline.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/SA_outline.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "Afghanistan") {
      sourcet = new VectorSource({
        url: "./StateBoundary/AF_ST.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/AF.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "Bangladesh") {
      sourcet = new VectorSource({
        url: "./StateBoundary/BD_ST.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/BD.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "Bhutan") {
      sourcet = new VectorSource({
        url: "./CountryBoundary/BT.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/BT.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "India") {
      sourcet = new VectorSource({
        url: "./StateBoundary/IN_ST.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/IN.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "Maldives") {
      sourcet = new VectorSource({
        url: "./CountryBoundary/MV.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/MV.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "Nepal") {
      countryboundary = new VectorSource({
        url: "./CountryBoundary/NP.json",
        format: new GeoJSON(),
      });
      sourcet = new VectorSource({
        url: "./StateBoundary/NP_ST.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "Pakistan") {
      sourcet = new VectorSource({
        url: "./StateBoundary/PK_ST.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/PK.json",
        format: new GeoJSON(),
      });
    } else if (activeRegion === "Sri Lanka") {
      sourcet = new VectorSource({
        url: "./StateBoundary/SL_ST.json",
        format: new GeoJSON(),
      });
      countryboundary = new VectorSource({
        url: "./CountryBoundary/SL.json",
        format: new GeoJSON(),
      });
    } else {
      let sec = activeRegion.indexOf(",");
      let y = "";
      let x = "";
      if (sec > 0) {
        y = activeRegion.substring(0, sec);
        x = activeRegion.substring(sec + 2);
      }
      if (x === "Bangladesh") {
        let urlsourcestr = "./DistrictBoundary/BD/" + y.substring(0, y.length - 9) + "DIV.json";
        let urlcountrystr = "./StateBoundary/BD/" + y.substring(0, y.length - 9) + "ST.json";
        sourcet = new VectorSource({
          url: urlsourcestr,
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: urlcountrystr,
          format: new GeoJSON(),
        });
      }
      if (x === "Nepal") {
        let urlsourcestr = "./DistrictBoundary/NP/" + y + "DIV.json";
        let urlcountrystr = "./StateBoundary/NP/" + y + "ST.json";
        sourcet = new VectorSource({
          url: urlsourcestr,
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: urlcountrystr,
          format: new GeoJSON(),
        });
      }
      if (x === "Afghanistan") {
        let urlsourcestr = "./DistrictBoundary/AF/" + y.toUpperCase() + ".json";
        let urlcountrystr = "./StateBoundary/AF/STATE_" + y.toUpperCase() + ".json";
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
        countryboundary.on("change", function () {
          if (countryboundary.getState() === "ready") {
            if (countryboundary.getFeatures()) {
              const featuress = countryboundary.getFeatures();
              const polyy = featuress[0].getGeometry();
              const polygoncordinates = polyy.getCoordinates();
              setpolycord(polygoncordinates);
              const extentt = polyy.getExtent();
              const sizee = mapRef.current.getSize();
              mapRef.current.getView().fit(extentt, { size: [sizee[0] * 0.8, sizee[1] * 0.8] });
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
        sourcet.on("change", function () {
          if (sourcet.getState() === "ready") {
            if (sourcet.getFeatures()) {
              const featuress = sourcet.getFeatures();
              // Create a polygon covering the extent of the entire world
              const worldPolygon = new Polygon([
                [
                  [-20037508.34, -20037508.34],
                  [-20037508.34, 20037508.34],
                  [20037508.34, 20037508.34],
                  [20037508.34, -20037508.34],
                  [-20037508.34, -20037508.34],
                ],
              ]);

              featuress.forEach((featureOne) => {
                const polyone = featureOne.getGeometry();
                //console.log(polyone.getType());
                if (polyone.getType() === "MultiPolygon") {
                  const polygons = polyone.getPolygons();
                  polygons.forEach((polygon) => {
                    worldPolygon.appendLinearRing(polygon);
                  });
                } else if (polyone.getType() === "GeometryCollection") {
                  const polygons = polyone.getGeometries();
                  polygons.forEach((polygon) => {
                    worldPolygon.appendLinearRing(polygon);
                  });
                } else {
                  worldPolygon.appendLinearRing(polyone);
                }
              });

              const maskLayer = new VectorLayer({
                source: new VectorSource({
                  features: [
                    new Feature({
                      geometry: worldPolygon,
                    }),
                  ],
                }),
                style: new Style({
                  fill: new Fill({
                    color: "rgba(255,255,255,1)",
                  }),
                }),
                opacity: 0.6,
                zIndex: 100,
              });

              if (maskLayer1) {
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
  }, [activeRegion, focus, mapRef]);

  useEffect(() => {
    let source1 = null;
    let opt = 1;
    const optcode = {
      "Stress Tolerant Variety": "ADVAR",
      "Early Sowing": "ADPTI",
      "Levelling": "LASLV",
      "Zero Tillage": "ZTILL",
      "Broad Bed and Furrow": "BBFIB",
      "DSR (Dry Seed)": "DSDRY",
      "DSR (Wet Seed)": "DSWET",
      "System of Rice Intensification": "SRIUT",
      "Farm Pond": "WHSRC",
      "Microirrigation": "MICIR",
      "Precision Water Management": "PWMGT",
      "Low Tech Precision Technology": "PNMLT",
      "High Tech Precision Technology": "PNMHT",
      "Deep Placement of Urea": "DR",
      "ICT Agro Advisory": "WEAGA",
      "Crop Insurance": "INSUR",
      "Land Management": "LMGT",
      "Feed Management": "FMGT",
      "Herd Management": "HMGT",
      "Animal Health": "ANHLT",
      "Animal Productivity": "ANPRO",
      "Mulching": "MULCH",
      "Alternate wetting and drying": "AWD",
      "Smart fertilizer management": "FRT",
      "Manure Management": "MNMGT",
      "Information Use": "INFO",
      "Heat Stress Management": "HSMGT",
    };

    const hazardname = {
      "District Level": "District Level",
      "Downscaled Risk": "Downscaled Risk",
      "Risk Index": "Risk Index",
      "Hazard Index": "Hazard Index",
      "Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
      "Low temperature induced pollen sterility": "Low temperature induced pollen sterility",
      "High temperature induced pollen sterility": "High temperature induced pollen sterility",
      "Heat Stress": "Heat stress",
      "Heat Stress": "Heat stress",
      "High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
      "Cold Stress": "Cold stress",
      "Low temperature induced tuberization failure": "Low temperature induced tuberization failure",
      "Untimely Rainfall": "Untimely rainfall",
      "Terminal Heat": "Terminal heat",
      "Days of Frost": "Days of Frost",
      "Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
      "Delayed Monsoon": "Delayed monsoon",
      "Drought": "Drought",
      "Dry Spell": "Number of dry spells",
      "Flood": "Flood",
      "Lodging": "Rain and wind causing lodging",
      "Biotic": "High humidity and temperature for blight",
      "Irrigation": "Irrigation",
      "Water Holding": "Water Holding",
      "Income": "Income",
      "Access to Credit": "Access to Credit",
      "Access to Market": "Access to Market",
      "Elevation": "Elevation",
      "Access to Knowledge": "Access to Knowledge",
      "Exposure Index": "Exposure Index",
      "Number of Farmers": "Number of Farmers",
      "Cropped Area": "Cropped Area",
      "Excess Rainfall": "Excess rainfall",
    };

    if (activeOpt !== "") {
      opt = 2;
      const urlstr = "./Adap/" + activeCrop + "/Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({ sources: [{ url: urlstr }], sourceOptions: { allowFullFile: true } });
    } else if (CurrRisk !== "") {
      opt = 3;
      const urlstr = "./Hazards/" + activeCrop + "/ZZ_" + hazardname[CurrRisk] + ".tif";
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({ sources: [{ url: urlstr }], sourceOptions: { allowFullFile: true } });
    } else {
      const urlstr = "./Crop Masks/AllPix/ZZ_Mask_" + activeCrop + "801.tif";
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({ sources: [{ url: urlstr }], sourceOptions: { allowFullFile: true } });
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

      if (opt === 2) {
        newOverl.setStyle(color2);
      } else if (opt === 3) {
        newOverl.setStyle(color_hazard);
      } else {
        newOverl.setStyle(color1);
      }

      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setOverl(newOverl);
      }
    }
  }, [CurrRisk, activeCrop, activeOpt, activeImpact, mapRef]);

  useEffect(() => {
    if (tiffFilePath !== "" && polycord !== null) {
      clipUsingPolygon(tiffFilePath, polycord);
    }
  }, [tiffFilePath, polycord]);

  return (
    <div>
      <div id="popup2" class="ol-popup">
        <div id="popup-content2" style={{ textTransform: "capitalize", fontSize: "13px" }}></div>
      </div>
      <div ref={ref} style={{ height: "calc(100vh - 80px)", width: "auto", marginTop: "80px", marginLeft: 0, marginBottom: "-16px" }} className="map-container" />
    </div>
  );
}
