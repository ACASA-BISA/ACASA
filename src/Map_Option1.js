import React, { useState, useEffect, useRef, useContext } from "react";
import { Feature, Map, View } from "ol";
import { ThemeContext } from "./ThemeContext";
import TileLayer from "ol/layer/WebGLTile";
import Polygon from "ol/geom/Polygon.js";
import "ol/ol.css";
import "./index.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import { fromLonLat } from "ol/proj";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeoTIFF from "ol/source/GeoTIFF.js";
import GeoJSON from "ol/format/GeoJSON.js";
import TileLayer2 from "ol/layer/Tile";
//import BingMaps from "ol/source/BingMaps";
import tilesource from "ol/source/TileJSON";
import TileJSON from "ol/source/TileJSON";
import { Control, ZoomToExtent, FullScreen, Zoom } from "ol/control.js";
import "./olsm.css";
import { Tooltip, Typography, Box } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import DownloadIcon from "@mui/icons-material/Download";

const optcode = {
  "Stress tolerant variety": "ADVAR",
  "Early sowing/changing planting dates": "ADPTI",
  "Precision land levelling": "LASLV",
  "Zero tillage with residue retention": "ZTILL",
  "Broadbed and furrow": "BBFIB",
  "Dry - Direct seeded rice": "DSDRY",
  "Wet - Direct seeded rice": "DSWET",
  "System of rice intensification": "SRIUT",
  "Supplemental irrigation (water harvesting structures/farm ponds)": "WHSRC",
  "Microirrigation": "MICIR",
  "Precision water management": "PWMGT",
  "Precision fertilizer management": "PNMLT",
  "Precision fertilizer management - High tech": "PNMHT",
  "Deep Placement of Urea": "DR",
  "ICT linked input management": "WEAGA",
  "Crop insurance": "INSUR",
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

export default function Map_Option({ activeCrop, focus = "Region", activeRegion, activeOpt, area_dict, activeScenario, activeOptLayer, modelName }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const [overl, setOverl] = useState(null);
  const [vectorLayerr, setvectorLayerr] = useState(null);
  const [countryLayer, setcountryLayer] = useState(null);
  const [maskLayer1, setmaskLayer1] = useState(null);
  const [population, setpopulation] = useState(0);

  const { mode } = useContext(ThemeContext);

  const fill = new Fill({
    color: mode === "dark" ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)",
  });

  const stroke = new Stroke({
    color: mode === "dark" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    width: 1,
  });

  const stroke2 = new Stroke({
    color: mode === "dark" ? "rgba(240, 242, 233, 1)" : "rgba(50, 50, 50, 1)",
    width: 1,
  });

  const ViewV = new View({
    center: fromLonLat([71.2090057, 21.6138954]),
    zoom: 3.5,
  });

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
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(180, 70, 109, 1)", "#FF9A00", "#06D001", "#004D00"],
    ],
  };

  const color_hazard4 = {
    color: ["palette", ["clamp", ["*", ["band", 2], 250], 0, 4], ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#059212", "#00FF00", "#FFDE4D", "#FFA500", "#FF0000"]],
  };

  const color_adaptation_yield = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 385], 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(150,150,150,1)", "#8B0000", "rgb(248, 36, 36)", "rgba(245, 140, 170, 1)", "rgba(245, 140, 170, 1)", "rgba(109, 233, 109, 1)", "rgba(4, 145, 4, 1)"],
    ],
  };

  const color_hazard = {
    color: ["palette", ["clamp", ["*", ["band", 2], 25], 0, 6], ["rgba(0,0,0,0)", "rgba(150,150,150,1)", "#059212", "#00FF00", "#FFDE4D", "#FFA500", "#FF0000"]],
  };

  const color_hazard_reverse = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 385], 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(150,150,150,1)", "#FF0000", "#FFA500", "#FFDE4D", "#FFDE4D", "#00FF00", "#059212"],
    ],
  };

  const color_adaptation_change = {
    color: [
      "palette",
      ["clamp", ["*", ["band", 2], 25], 0, 6],
      ["rgba(0,0,0,0)", "rgba(200,200,200,1)", "rgba(200,200,200,1)", "rgba(184, 23, 23, 1)", "rgba(245, 140, 170, 1)", "rgba(241, 233, 119, 1)", "rgba(109, 233, 109, 1)", "rgba(4, 145, 4, 1)"],
    ],
  };

  const color_adaptation2 = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 385], 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(150,150,150,1)", "#8B0000", "#FF4500", "#FFDE4D", "#FFDE4D", "#00FF00", "#059212"],
    ],
  };

  const key = "TrN2dn4maoO3C2x0sUpH";

  function checkcrop2() {
    const livestock = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
    let ans = true;
    livestock.forEach((sname) => {
      if (activeCrop === sname) {
        ans = false;
      }
    });
    return ans;
  }

  let defext = [6731721.531032621, -79003.34768295793, 10843798.383928495, 4648992.169943628];

  let filename = "";

  if (activeOpt !== "") {
    filename = activeCrop + "_" + activeOpt + "_" + activeScenario + ".tiff";
  } else {
    filename = activeCrop + "_CropMask_" + activeScenario + ".tiff";
  }

  // Use React to create an MUI icon element
  const iconElement = (
    <DownloadIcon
      style={{
        fontSize: "16px",
        verticalAlign: "middle",
      }}
    />
  );

  // Define the download control
  class DownloadControl extends Control {
    constructor(options = {}) {
      const button = document.createElement("button");
      button.innerHTML = ReactDOMServer.renderToString(iconElement);
      button.title = "Download GeoTIFF Layer";

      const element = document.createElement("div");
      element.className = "ol-control custom-download-control download-button";
      element.appendChild(button);

      super({
        element: element,
        target: options.target,
      });

      // Add event listener for the button click
      button.addEventListener("click", this.handleDownload.bind(this), false);
    }

    handleDownload() {
      const map = this.getMap(); // Get the map instance
      const layers = map.getLayers().getArray(); // Get all layers on the map

      // Find the GeoTIFF layer
      const geoTiffLayer = layers.find((layer) => layer.getSource() instanceof GeoTIFF);

      if (geoTiffLayer) {
        const source_tiff = geoTiffLayer.getSource();
        // Access the URL from the `key_` property
        const geoTiffUrl = source_tiff.key_;
        if (geoTiffUrl) {
          this.downloadFile(geoTiffUrl, filename); // Trigger the download
        } else {
          alert("No URL found for the GeoTIFF layer.");
        }
      } else {
        alert("No GeoTIFF layer is currently displayed on the map.");
      }
    }

    downloadFile(url, filename) {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  useEffect(() => {
    if (!ref.current) return; // Ensure ref is available before proceeding

    // Define the basemap source based on the theme mode
    const sourcemap = new TileJSON({
      url: mode === "dark" ? `https://api.maptiler.com/maps/dataviz-dark/tiles.json?key=${key}` : `https://api.maptiler.com/maps/bright-v2/tiles.json?key=${key}`,
      tileSize: 512,
      crossOrigin: "anonymous",
    });

    const BackMap = new TileLayer2({
      source: sourcemap,
      opacity: 0.9,
      zIndex: 10,
    });

    if (!mapRef.current) {
      // Initialize the map if it doesn't exist
      mapRef.current = new Map({
        controls: [
          new ZoomToExtent({
            extent: defext,
            className: "ol-zoomtoextenty",
          }),
          new Zoom({
            className: "ol-zoom-comp",
          }),
          new FullScreen({
            className: "ol-fullscreeny",
          }),
          new DownloadControl({
            className: "download-button",
          }),
        ],
        target: ref.current,
        layers: [BackMap], // Initial basemap
        view: ViewV,
      });
    } else {
      // Handle theme-based basemap switching
      const layers = mapRef.current.getLayers().getArray();

      layers.forEach((layer) => {
        if (layer && typeof layer.getSource === "function" && layer.getSource() instanceof TileJSON) {
          mapRef.current.removeLayer(layer);
        }
      });

      mapRef.current.addLayer(BackMap);
    }

    // Ensure the map resizes properly
    mapRef.current.updateSize();
  }, [mode, ref, mapRef]); // Re-run when `mode` changes

  useEffect(() => {
    let sourcet;
    let countryboundary;
    if (focus === "Region") {
      //url: "./CountryBoundary/SA_Country.json",
      sourcet = new VectorSource({ url: "./CountryBoundary/SA_outline.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/SA_outline.json", format: new GeoJSON() });
    } else if (activeRegion === "Afghanistan") {
      sourcet = new VectorSource({ url: "./StateBoundary/AF_ST.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/AF.json", format: new GeoJSON() });
    } else if (activeRegion === "Bangladesh") {
      sourcet = new VectorSource({ url: "./StateBoundary/BD_ST.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/BD.json", format: new GeoJSON() });
    } else if (activeRegion === "Bhutan") {
      sourcet = new VectorSource({ url: "./CountryBoundary/BT.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/BT.json", format: new GeoJSON() });
    } else if (activeRegion === "India") {
      sourcet = new VectorSource({ url: "./StateBoundary/IN_ST.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/IN.json", format: new GeoJSON() });
    } else if (activeRegion === "Maldives") {
      sourcet = new VectorSource({ url: "./CountryBoundary/MV.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/MV.json", format: new GeoJSON() });
    } else if (activeRegion === "Nepal") {
      countryboundary = new VectorSource({ url: "./CountryBoundary/NP.json", format: new GeoJSON() });
      sourcet = new VectorSource({ url: "./StateBoundary/NP_ST.json", format: new GeoJSON() });
    } else if (activeRegion === "Pakistan") {
      sourcet = new VectorSource({ url: "./StateBoundary/PK_ST.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/PK.json", format: new GeoJSON() });
    } else if (activeRegion === "Sri Lanka") {
      sourcet = new VectorSource({ url: "./StateBoundary/SL_ST.json", format: new GeoJSON() });
      countryboundary = new VectorSource({ url: "./CountryBoundary/SL.json", format: new GeoJSON() });
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
        console.log(urlcountrystr);
        sourcet = new VectorSource({
          url: urlsourcestr,
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({ url: urlcountrystr, format: new GeoJSON() });
      }
      if (x === "Nepal") {
        let urlsourcestr = "./DistrictBoundary/NP/" + y + "DIV.json";
        let urlcountrystr = "./StateBoundary/NP/" + y + "ST.json";
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
        opacity: mode === "dark" ? 0.8 : 0.9,
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
              const extentt = polyy.getExtent();
              const sizee = mapRef.current.getSize();
              mapRef.current.getView().fit(extentt, { size: [sizee[0] * 1, sizee[1] * 1] });
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
        opacity: mode === "dark" ? 0.8 : 0.7,
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
                    color: mode === "dark" ? "rgba(37, 41, 46, 1)" : "rgba(255,255,255,1)",
                  }),
                }),
                opacity: mode === "dark" ? 0.4 : 0.5,
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
  }, [mode, activeRegion, focus, mapRef]);

  useEffect(() => {
    let source1 = null;
    let opt = 1;
    let urlstr = "xyz.tif";
    if (activeScenario === "baseline") {
      urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Suitability_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
    } else if (activeScenario === "ssp245") {
      urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Suitability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
    } else {
      urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Suitability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
    }
    if (activeOptLayer === "Yield Benefits") {
      if (activeScenario === "baseline") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Yield_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
      } else if (activeScenario === "ssp245") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Yield_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
      } else {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Yield_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
      }
      opt = 222;
    }
    if (activeOptLayer === "Economic Viability") {
      if (activeScenario === "baseline") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Economic_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
      } else if (activeScenario === "ssp245") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Economic_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
      } else {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Economic_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
      }
      opt = 1;
    }
    if (activeOptLayer === "Scalability") {
      if (activeScenario === "baseline") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Scalability_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
      } else if (activeScenario === "ssp245") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Scalability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
      } else {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Scalability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
      }
      opt = 1;
    }
    if (activeOptLayer === "Gender Suitability") {
      if (activeScenario === "baseline") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Gender_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
      } else if (activeScenario === "ssp245") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Gender_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
      } else {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Gender_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
      }
      opt = 1;
    }
    if (activeOptLayer === "Adaptation Benefits") {
      if (activeScenario === "baseline") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Yield_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
      } else if (activeScenario === "ssp245") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Adaptation_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
      } else {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Adaptation_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
      }
      opt = 222;
    }
    if (checkcrop2() === false) {
      opt = 333;
      urlstr = "./Adap/" + activeCrop + "/" + activeOpt + " Baseline.tif";
    }
    source1 = new GeoTIFF({
      sources: [{ url: urlstr }],
      sourceOptions: { allowFullFile: true },
    });
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

      if (opt === 2) {
        newOverl.setStyle(color_hazard_reverse);
      } else if (opt === 3) {
        newOverl.setStyle(color_adaptation_change);
      } else if (opt === 222) {
        newOverl.setStyle(color_adaptation_yield);
      } else if (opt == 5) {
        newOverl.setStyle(color_hazard);
      } else {
        newOverl.setStyle(color_adaptation2);
      }

      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setOverl(newOverl);
      }
    }
  }, [activeCrop, activeOpt, activeOptLayer, activeScenario, mapRef]);

  function getpopulation() {
    if (activeOpt !== "" && Object.keys(area_dict).length > 0) {
      let sec = activeRegion.indexOf(",");
      let y = "";
      let x = "";
      let rowstr = "";
      if (sec > 0) {
        y = activeRegion.substring(0, sec);
        x = activeRegion.substring(sec + 2);
        let statecode = "";
        if (x === "Bangladesh") {
          statecode = y.substring(0, y.length - 9) + "DIV";
          rowstr = activeCrop + "_" + statecode + "_Suitability_" + activeCrop + "_" + optcode[activeOpt];
        } else if (x === "Nepal") {
          statecode = y + "DIV";
          rowstr = activeCrop + "_" + statecode + "_Suitability_" + activeCrop + "_" + optcode[activeOpt];
        } else if (x === "India" || x === "Sri Lanka" || x === "Pakistan") {
          statecode = "STATE_" + y.toUpperCase();
          rowstr = activeCrop + "_" + statecode + "_Suitability_" + activeCrop + "_" + optcode[activeOpt];
        } else if (x === "Maldives" || x === "Afghanistan") {
          statecode = y.toUpperCase();
          rowstr = activeCrop + "_" + statecode + "_Suitability_" + activeCrop + "_" + optcode[activeOpt];
        } else if (x === "Bhutan") {
          statecode = y;
          rowstr = activeCrop + "_" + statecode + "_Suitability_" + activeCrop + "_" + optcode[activeOpt];
        }
      } else {
        rowstr = activeCrop + "_" + activeRegion + "_Suitability_" + activeCrop + "_" + optcode[activeOpt];
      }
      const row_data = area_dict[rowstr.toLowerCase()];
      return Math.round(row_data["Adaptation Benefits_Area"] / 1000000);
    }
    return 0;
  }
  const dt = getpopulation();

  return (
    <div>
      {/* <Tooltip
        title={
          <Typography sx={{ fontSize: 11, fontWeight: "bold", color: mode === "dark" ? "white" : "black" }}>
            <Box
              sx={{
                width: "100%",
                height: 8,
                borderRadius: 0,
                bgcolor: "#06D001",
              }}
            />
            {dt} M people
            <Typography sx={{ fontSize: 11, fontWeight: "bold", color: mode === "dark" ? "white" : "black" }}>under adapt.</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: "bold", color: mode === "dark" ? "white" : "black" }}>benefits</Typography>
          </Typography>
        }
        open={true}
        placement="bottom-start"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [5, -85],
                },
              },
            ],
          },
        }}
        PopperProps={{
          style: { zIndex: 0 },
          sx: {
            "& .MuiTooltip-tooltip": {
              backgroundColor: mode === "dark" ? "#1b1f23" : "#ffffff", // Change to desired background color
            },
          },
        }}
      > */}
      <div
        ref={ref}
        style={{
          height: "calc(48vh - 77px)",
          width: "auto",
          marginLeft: 0,
          marginRight: 0,
        }}
        className="map-container"
      />
      {/* </Tooltip> */}
    </div>
  );
}
