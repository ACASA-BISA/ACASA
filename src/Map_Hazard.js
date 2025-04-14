import React, { useState, useEffect, useRef, useContext } from "react";
import { Feature, Map, View } from "ol";
import { ThemeContext } from "./ThemeContext";
import TileLayer from "ol/layer/WebGLTile";
import TileLayer2 from "ol/layer/Tile";
import tilesource from "ol/source/TileJSON";
import TileJSON from "ol/source/TileJSON";
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
import { Control, ZoomToExtent, FullScreen, Zoom } from "ol/control.js";
import "./olsm.css";
import { Tooltip, Typography, Box } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import DownloadIcon from "@mui/icons-material/Download";

export default function Map_Hazard({ activeCrop, focus = "Region", activeRegion, CurrRisk, activeScenario }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const [overl, setOverl] = useState(null);
  const [vectorLayerr, setvectorLayerr] = useState(null);
  const [countryLayer, setcountryLayer] = useState(null);
  const [maskLayer1, setmaskLayer1] = useState(null);

  let defext = [6731721.531032621, -79003.34768295793, 10843798.383928495, 4648992.169943628];

  const { mode } = useContext(ThemeContext);

  const fill = new Fill({
    color: mode === "dark" ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)",
  });

  const stroke = new Stroke({
    color: mode === "dark" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    width: 1,
  });

  const ViewV = new View({
    center: fromLonLat([71.2090057, 21.6138954]),
    zoom: 3.5,
  });

  console.log(activeCrop);

  function checkcrop() {
    const diffcrop = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken", "Rice", "Wheat", "Maize", "Mustard", "Cotton", "Soybean", "Chickpea", "Barley"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (activeCrop === sname) {
        ans = false;
      }
    });
    return ans;
  }

  const max = 1;
  function normalize(value) {
    return ["/", value, max];
  }

  const red = normalize(["band", 1]);
  const green = normalize(["band", 2]);
  const blue = normalize(["band", 3]);
  const nir = normalize(["band", 4]);

  const color_comm = {
    Rice: "#5ec962",
    Wheat: "#f7e465",
    Maize: "#ffcc00",
    Sorghum: "#8b4513",
    Soybean: "#8c7658",
    Chickpea: "#b3a057",
    Pigeonpea: "#de815f",
    Mustard: "#FFDB58",
    Groundnut: "#d2691e",
    Potato: "#ab6042",
    Onion: "#8e507f",
    Cotton: "#5102b0",
    Cattle: "#8B4513",
    Cow: "#ac8e59",
    Buffalo: "#5c2f08",
    Pig: "#FFC0CB",
    Chicken: "#FF8C00",
    Sheep: "#5fdbfa",
    Goat: "#7ca67c",
    Barley: "#5ec962",
  };
  const color1 = {
    color: ["palette", ["interpolate", ["linear"], ["/", ["-", nir, green], ["+", nir, blue]], -0.1, 0, 3, 10], ["rgba(98, 181, 209, 0)", color_comm[activeCrop]]],
  };

  const color2 = {
    color: [
      "palette",
      [
        "interpolate",
        ["linear"],
        ["*", ["band", 1], 16],
        0, // Start color (minimum value)
        1, // Intermediate color
        1,
        3,
        2,
        4,
        3,
        5,
      ],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(180, 70, 109, 1)", "#FF9A00", "#06D001", "rgba(0,0,0,0)"],
    ],
  };

  const color4 = {
    color: [
      "palette",
      [
        "interpolate",
        ["linear"],
        ["*", ["band", 2], 250],
        0, // Start color (minimum value)
        1, // Intermediate color
        1,
        2,
        2,
        3,
        4,
        5,
        5,
        6,
      ],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#059212", "#00FF00", "#FFFF00", "#FFA500", "#FF0000", "#3b528b", "#21918c", "#5ec962", "#fde725"],
    ],
  };

  const color_hazard = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 25], 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(150,150,150,1)", "#059212", "#00FF00", "#FFFF00", "#FFA500", "#FF0000"],
    ],
  };

  const color_hazard_livestock = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 385], 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(150,150,150,1)", "#059212", "#00FF00", "#FFDE4D", "#FFDE4D", "#FFA500", "#FF0000"],
    ],
  };

  const colorGradientEx = {
    color: ["interpolate", ["linear"], ["*", ["band", 1], 310], 0, "rgba(0,0,0,0)", 10, "#FFF9C4", 20, "#FFE680", 30, "#FFD700", 40, "#DAA520", 50, "#A0522D", 60, "#6B3D1B"],
  };

  const key = "TrN2dn4maoO3C2x0sUpH";

  /*const sourcemap = new tilesource({
        url: `https://api.maptiler.com/maps/bright-v2/tiles.json?key=${key}`, // source URL
        tileSize: 512,
        crossOrigin: 'anonymous'
    });

    const BackMap = new TileLayer2({
        source: sourcemap,
        opacity:0.9,
        zIndex:10,
    });*/

  let filename = "";

  if (CurrRisk !== "") {
    filename = activeCrop + "_" + CurrRisk + "_" + activeScenario + ".tiff";
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
        url: "./StateBoundary/MV_ST.json",
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
      } else if (x === "Nepal") {
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
      } else if (x === "Afghanistan") {
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
      } else if (x === "India") {
        let urlsourcestr = "./DistrictBoundary/IN/STATE_" + y.toUpperCase() + ".json";
        let urlcountrystr = "./StateBoundary/IN/STATE_" + y.toUpperCase() + ".json";
        sourcet = new VectorSource({
          url: urlsourcestr,
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: urlcountrystr,
          format: new GeoJSON(),
        });
      } else if (x === "Sri Lanka") {
        let urlsourcestr = "./DistrictBoundary/SL/STATE_" + y.toUpperCase() + ".json";
        let urlcountrystr = "./StateBoundary/SL/STATE_" + y.toUpperCase() + ".json";
        sourcet = new VectorSource({
          url: urlsourcestr,
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: urlcountrystr,
          format: new GeoJSON(),
        });
      } else if (x === "Pakistan") {
        let urlsourcestr = "./DistrictBoundary/PK/STATE_" + y.toUpperCase() + ".json";
        let urlcountrystr = "./StateBoundary/PK/STATE_" + y.toUpperCase() + ".json";
        sourcet = new VectorSource({
          url: urlsourcestr,
          format: new GeoJSON(),
        });
        countryboundary = new VectorSource({
          url: urlcountrystr,
          format: new GeoJSON(),
        });
      } else if (x === "Maldives") {
        let urlsourcestr = "./DistrictBoundary/MV/STATE_" + y.toUpperCase() + ".json";
        let urlcountrystr = "./StateBoundary/MV/" + y.toUpperCase() + ".json";
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
              /* const polygoncordinates  = polyy.getCoordinates();
                setpolycord(polygoncordinates); */
              const extentt = polyy.getExtent();
              const sizee = mapRef.current.getSize();
              mapRef.current.getView().fit(extentt, { size: [sizee[0] * 1, sizee[1] * 1], padding: [0, 0, 70, 0] });
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
        opacity: mode === "dark" ? 0.8 : 0.9,
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
                opacity: mode === "dark" ? 0.5 : 0.6,
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
    const hazardname = {
      "District Level": "District Level",
      "Downscaled Risk": "Downscaled Risk",
      "Risk Index": "Risk index",
      "Hazard Index": "Hazard Index",
      "Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
      "Low temperature induced pollen sterility": "Low temperature induced pollen sterility",
      "High temperature induced pollen sterility": "High temperature induced pollen sterility",
      "Heat Stress": "Heat stress",
      "High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
      "Cold Stress": "Cold stress",
      "Low temperature induced tuberization failure": "Low temperature induced tuberization failure",
      "Untimely Rainfall": "Untimely rainfall",
      "Terminal Heat": "Terminal heat",
      "Days of Frost": "Days of frost",
      "Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
      "Delayed Monsoon": "Delayed monsoon",
      "Crop water deficit index": "Crop water deficit index",
      "Dry Spell": "Number of dry spells",
      "Flood": "Flood",
      "Soil Organic Carbon": "Soil organic carbon",
      "Lodging": "Rain and wind causing lodging",
      "Biotic": "High humidity and temperature for blight",
      "Irrigation": "Irrigation",
      "Volumetric Soil Water": "Water holding capacity",
      "Income": "Agricultural GDP",
      "Access to Credit": "Access to Credit",
      "Access to Market": "Access to Market",
      "Elevation": "Elevation",
      "Access to Knowledge": "Access to Knowledge",
      "Exposure Index": "Exposure Index",
      "Number of Farmers": "Number of Farmers",
      "Cropped Area": "Extent",
      "Excess Rainfall": "Excess rainfall",
      "Number of Animals per grid": "Number of animals per grid",
      "Cold stress in reproductive stage": "Cold stress in reproductive stage",
      "Heat stress in reproductive stage": "Heat stress in reproductive stage",
      "Heat stress during boll formation": "Heat stress during boll formation",
      "Cold stress during flowering": "Cold stress during flowering",
      "High tempearture during flowering": "High tempearture during flowering",
      "Biotic Stress": "Biotic stress",
      "Vulnerability Index": "Vulnerability Index",
      "Feed/Fodder": "Residue",
      "Rural infrastructure": "Rural Infra",
      "Cyclone": "Cyclone",
      "Rainfall Deficit": "Rainfall deficit",
      "Extreme Rainfall days": "Extreme Rainfall Days",
      "Cold days": "Cold Stress",
      "Hot days": "Heat stress or hot days",
      "Temperature-Humidity Index": "THI",
      "Socio-economic Development Indicator": "Human development index",
    };

    if (CurrRisk !== "") {
      opt = 3;
      let urlstr = "xyz.tif";
      let district_n = "";
      let district_prefix = "";
      let modelName = "CHC";
      let activeScale = "Pixel Level";
      if (activeScale === "District Level") {
        district_n = "District/";
        district_prefix = "District_";
      }
      if (activeScale === "State Level") {
        district_n = "State/";
        district_prefix = "District_";
      }
      if (activeScenario === "baseline") {
        //urlstr = "./Hazards/" + activeCrop + "/Baseline/" + district_n + "ZZ_" + hazardname[CurrRisk] + ".tif";
        //if (checkcrop2() === false) {
        urlstr = "./Hazards/" + activeCrop + "/" + modelName + "/" + district_n + "Baseline/" + `${district_prefix}Baseline_${modelName}_${activeCrop}_${hazardname[CurrRisk]}` + ".tif";
        //}
      } else {
        urlstr =
          "./Hazards/" +
          activeCrop +
          "/" +
          modelName +
          "/" +
          district_n +
          activeScenario.toUpperCase() +
          "/" +
          `${district_prefix}${activeScenario.toUpperCase()}_${modelName}_${activeCrop}_${hazardname[CurrRisk]}` +
          ".tif";
        //}
      }
      source1 = new GeoTIFF({
        sources: [{ url: urlstr }],
        sourceOptions: { allowFullFile: true },
      });
    } else {
      let urlstr = "./Crop Masks/AllPix/ZZ_Mask_" + activeCrop + "801.tif";
      //console.log(urlstr);
      if (checkcrop() === false) {
        urlstr = "./Crop Masks/Extent/" + activeCrop + ".tif";
      }
      source1 = new GeoTIFF({
        sources: [{ url: urlstr }],
        sourceOptions: { allowFullFile: true },
      });
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
        zIndex: 91,
      });

      if (opt === 2) {
        newOverl.setStyle(color2);
      } else if (opt === 3) {
        newOverl.setStyle(color_hazard_livestock);
      } else if (opt === 4) {
        newOverl.setStyle(color4);
      } else {
        newOverl.setStyle(color1);
        if (checkcrop() === false) {
          newOverl.setStyle(colorGradientEx);
        }
      }
      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setOverl(newOverl);
      }
    }
  }, [mode, CurrRisk, activeCrop, mapRef, activeScenario]);

  return (
    <div>
      <div
        ref={ref}
        style={{
          position: "relative",
          height: "calc(50vh - 80px)",
          width: "auto",
          margin: 0,
          padding: 0,
        }}
        className="map-container"
      />
    </div>
  );
}
