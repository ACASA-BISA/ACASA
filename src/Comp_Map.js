import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/WebGLTile";
import TileLayer2 from "ol/layer/Tile";
import TileJSON from "ol/source/TileJSON";
import tilesource from "ol/source/TileJSON";
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
import Overlay from "ol/Overlay";
import { Control, ZoomToExtent, FullScreen, Zoom } from "ol/control.js";
import "./olsm.css";
import Typography from "@mui/material/Typography";
import { Popper } from "@mui/material";
import Slide from "@mui/material/Slide";
import ReactDOMServer from "react-dom/server";
import DownloadIcon from "@mui/icons-material/Download";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { fetchLocationData } from "./fetchLocationData";
import { fetchLocationDataAdap } from "./fetchLocationDataAdap";
import ReactDOM from "react-dom";
import PopperGif from "./PopperGif";

export default function MApp({
  activeCrop,
  focus = "Region",
  activeRegion,
  activeOpt,
  CurrRisk,
  activeImpact,
  activeScenario,
  sharedView,
  handleviewchange,
  activeOptLayer,
  ImpactName,
  displayLayer,
  activeScale,
  exploreType,
  area_dict3,
  area_dict4,
  modelName,
}) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const [overl, setOverl] = useState(null);
  const [Sociolayer, setSocioLayer] = useState(null);
  const [Scalelayer, setScaleLayer] = useState(null);
  const [Adaptlayer, setAdaptLayer] = useState(null);
  const [Biolayer, setBioLayer] = useState(null);
  const [vectorLayerr, setvectorLayerr] = useState(null);
  const [countryLayer, setcountryLayer] = useState(null);
  const [maskLayer1, setmaskLayer1] = useState(null);
  const [tiffFilePath, settiffFilePath] = useState("");
  const [missingSource, setmsource] = useState(false);
  let defext = [6731721.531032621, -300003.34768295793, 10843798.383928495, 4918992.169943628];

  const [filename, setFilename] = useState("");

  useEffect(() => {
    let newFilename = activeCrop + "_CropMask_" + activeScenario + ".tiff"; // Default

    if (activeOpt && activeOpt.trim() !== "") {
      let opt_suffix = "";
      if (activeOptLayer["Adaptation Benefits"]) opt_suffix = "Adaptation Benefits";
      if (activeOptLayer["Economic"]) opt_suffix = "Economic Viability";
      if (activeOptLayer["Scalability"]) opt_suffix = "Scalability";
      newFilename = `${activeCrop}_${activeOpt}_${opt_suffix}_${activeScenario}.tiff`;
    } else if (CurrRisk && CurrRisk.trim() !== "") {
      newFilename = `${activeCrop}_${CurrRisk}_${activeScenario}.tiff`;
    } else if (activeImpact["Productivity"] || activeImpact["Value of Production"] || activeImpact["Resilience"]) {
      newFilename = `${activeCrop}_Impact_${activeScenario}.tiff`;
    }

    //console.log("Updated filename:", newFilename); // Debugging
    setFilename(newFilename);
  }, [activeOpt, CurrRisk, activeImpact, activeCrop, activeScenario, activeRegion, activeOptLayer]); // Dependencies ensure updates

  const { mode } = useContext(ThemeContext);

  const fill = new Fill({
    color: mode === "dark" ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)",
  });

  const stroke = new Stroke({
    color: mode === "dark" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    width: 1,
  });

  const h_fill = new Fill({
    color: "rgba(255,255,255,0.0)",
  });
  const h_stroke = new Stroke({
    color: mode === "dark" ? "#e0e0e0" : "#111111",
    width: 2.5,
  });

  const ViewV = new View({
    center: fromLonLat([71.2090057, 21.6138954]),
    zoom: 3.5,
  });

  let ViewV2 = new View({
    center: fromLonLat([71.2090057, 21.6138954]),
    zoom: 3.5,
  });

  function checkcrop() {
    const diffcrop = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Poultry", "Rice", "Wheat", "Maize", "Mustard", "Cotton", "Soybean", "Chickpea", "Barley", "Jute"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (activeCrop === sname) {
        ans = false;
      }
    });
    return ans;
  }
  function checkcrop2() {
    const livestock = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Poultry"];
    let ans = true;
    livestock.forEach((sname) => {
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
    Jute: "#f7e465",
    Cattle: "#8B4513",
    Cow: "#ac8e59",
    Buffalo: "#5c2f08",
    Pig: "#FFC0CB",
    Poultry: "#FF8C00",
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
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#059212", "#00FF00", "#FFDE4D", "#FFA500", "#FF0000", "#3b528b", "#21918c", "#5ec962", "#fde725"],
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

  /* const color_hazard_reverse = {
    color: ["palette", ["interpolate", ["linear"], ["*", ["band", 2], 385]], ["rgba(0,0,0,0)", "rgba(150,150,150,1)", "#FF0000", "#FFA500", "#FFDE4D", "#00FF00", "#059212"]],
  };
 */
  const color_hazard2 = {
    color: ["palette", ["clamp", ["*", ["band", 2], 25], 0, 6], ["rgba(0,0,0,0)", "#059212", "#00FF00", "#FFDE4D", "#FFA500", "#FF0000"]],
  };
  //Old Yellow: '#FFFF00'
  const color_hazard4 = {
    color: ["palette", ["clamp", ["*", ["band", 2], 250], 0, 4], ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#059212", "#00FF00", "#FFDE4D", "#FFA500", "#FF0000"]],
  };

  const color_hazard3 = {
    color: [
      "palette",
      ["clamp", ["*", ["band", 2], 25], 0, 6],
      ["rgba(0,0,0,0)", "rgba(150,150,150,0)", "rgba(4, 145, 4, 1)", "rgba(109, 233, 109, 1)", "rgba(241, 233, 119, 1)", "rgba(245, 140, 170, 1)", "rgba(184, 23, 23, 1)"],
    ],
  };

  const color_adaptation_change = {
    color: [
      "palette",
      ["clamp", ["*", ["band", 2], 25], 0, 6],
      ["rgba(0,0,0,0)", "rgba(200,200,200,1)", "rgba(200,200,200,1)", "rgba(184, 23, 23, 1)", "rgba(245, 140, 170, 1)", "rgba(241, 233, 119, 1)", "rgba(109, 233, 109, 1)", "rgba(4, 145, 4, 1)"],
    ],
  };

  const color_hazard_change = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 250], 0, 1, 24, 2, 48, 3, 72, 5, 96, 6],
      ["rgba(0,0,0,0)", "rgba(150,150,150,0)", "rgba(184, 23, 23, 1)", "rgba(245, 140, 170, 1)", "rgba(241, 233, 119, 1)", "rgba(109, 233, 109, 1)", "rgba(4, 145, 4, 1)"],
    ],
  };

  const color_hazard_livestock = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 385], 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(150,150,150,1)", "#059212", "#00FF00", "#FFDE4D", "#FFDE4D", "#FFA500", "#FF0000"],
    ],
  };

  const color_hazard_25 = {
    color: [
      "palette",
      [
        "interpolate",
        ["linear"],
        ["*", ["band", 2], 250],
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13,
        14,
        14,
        15,
        15,
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
      ],
      [
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 139, 1)", // Class 1
        "rgba(70, 130, 180, 1)", // Class 2
        "rgba(0, 191, 255, 1)", // Class 3
        "rgba(50, 205, 50, 1)", // Class 4
        "rgba(255, 255, 0, 1)", // Class 5
        "rgba(70, 130, 180, 1)", // Class 6
        "rgba(0, 191, 255, 1)", // Class 7
        "rgba(50, 205, 50, 1)", // Class 8
        "rgba(255, 255, 0, 1)", // Class 9
        "rgba(255, 165, 0, 1)", // Class 10
        "rgba(0, 191, 255, 1)", // Class 11
        "rgba(50, 205, 50, 1)", // Class 12
        "rgba(255, 255, 0, 1)", // Class 13
        "rgba(255, 165, 0, 1)", // Class 14
        "rgba(204, 51, 0, 1)", // Class 15
        "rgba(50, 205, 50, 1)", // Class 16
        "rgba(255, 255, 0, 1)", // Class 17
        "rgba(255, 165, 0, 1)", // Class 18
        "rgba(204, 51, 0, 1)", // Class 19
        "rgba(128, 0, 0, 1)", // Class 20
        "rgba(255, 255, 0, 1)", // Class 21
        "rgba(255, 165, 0, 1)", // Class 22
        "rgba(204, 51, 0, 1)", // Class 23
        "rgba(128, 0, 0, 1)", // Class 24
        "rgba(128, 0, 0, 1)", // Class 25
      ],
    ],
  };

  const XYZ = {
    color: [
      "interpolate",
      ["linear"],
      ["*", ["band", 1], 100],
      0,
      "rgba(0,0,0,0)",
      1,
      "rgba(255, 230, 128, 1)",
      2,
      "rgba(255, 215, 0, 1)",
      3,
      "rgba(182, 138, 28, 1)",
      4,
      "rgba(216, 111, 63, 1)",
      5,
      "rgba(110, 61, 26, 1)",
    ],
  };

  const colorGradientEx = {
    color: ["palette", ["clamp", ["*", ["band", 2], 240], 0, 5], ["rgba(0,0,0,0)", "rgba(255, 230, 128, 1)", "rgb(238, 206, 22)", "rgb(199, 158, 54)", "rgb(184, 86, 41)", "rgba(110, 61, 26, 1)"]],
  };

  const colorGradient2 = {
    color: ["interpolate", ["linear"], ["*", ["band", 1], 310], 0, "rgba(0,0,0,0)", 1, "#059212", 3, "#00FF00", 5, "#FFDE4D", 7, "#FFA500", 11, "#FF0000"],
  };

  const key = "TrN2dn4maoO3C2x0sUpH";

  // Define the custom legend control
  class LegendControl extends Control {
    constructor(options = {}) {
      const button = document.createElement("button");
      button.innerText = "L"; // The button label
      button.title = "Display Legend";

      // Create a container for the control
      const element = document.createElement("div");
      element.className = "ol-control ol-unselectable box-legend";

      element.appendChild(button);

      super({
        element: element,
        target: options.target,
      });

      // Legend container
      const legend = document.createElement("div");
      legend.style.cssText = `
      display: none;
      position: relative;
      top: 0px;
      left: 00px;
      background-color: ${mode === "dark" ? "#25292e" : "white"};
      border: 1px solid ${mode === "dark" ? "#e0e0e0" : "black"};
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;
      legend.id = "legend";

      // Add color boxes to the legend
      const colors = [
        "rgba(255, 255, 0, 1)", // Box 21
        "rgba(255, 165, 0, 1)", // Box 22
        "rgba(204, 51, 0, 1)", // Box 23
        "rgba(128, 0, 0, 1)", // Box 24
        "rgba(128, 0, 0, 1)", // Box 25
        "rgba(50, 205, 50, 1)", // Box 16
        "rgba(255, 255, 0, 1)", // Box 17
        "rgba(255, 165, 0, 1)", // Box 18
        "rgba(204, 51, 0, 1)", // Box 19
        "rgba(128, 0, 0, 1)", // Box 20
        "rgba(0, 191, 255, 1)", // Box 11
        "rgba(50, 205, 50, 1)", // Box 12
        "rgba(255, 255, 0, 1)", // Box 13
        "rgba(255, 165, 0, 1)", // Box 14
        "rgba(204, 51, 0, 1)", // Box 15
        "rgba(70, 130, 180, 1)", // Box 6
        "rgba(0, 191, 255, 1)", // Box 7
        "rgba(50, 205, 50, 1)", // Box 8
        "rgba(255, 255, 0, 1)", // Box 9
        "rgba(255, 165, 0, 1)", // Box 10
        "rgba(0, 0, 139, 1)", // Box 1
        "rgba(70, 130, 180, 1)", // Box 2
        "rgba(0, 191, 255, 1)", // Box 3
        "rgba(50, 205, 50, 1)", // Box 4
        "rgba(255, 255, 0, 1)", // Box 5
      ];

      legend.style.display = "none";
      legend.style.gridTemplateColumns = "repeat(5, 30px)";
      legend.style.gridGap = "2px";
      colors.forEach((color) => {
        const colorBox = document.createElement("div");
        colorBox.style.width = "30px";
        colorBox.style.height = "30px";
        colorBox.style.backgroundColor = color;
        colorBox.style.border = `1px solid ${mode === "dark" ? "#e0e0e0" : "black"}`;
        legend.appendChild(colorBox);
      });

      // Toggle legend visibility on button click
      button.addEventListener("click", () => {
        legend.style.display = legend.style.display === "none" ? "grid" : "none";
      });

      // Append legend to the control element
      element.appendChild(legend);
    }
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

  const iconPlayGif = (
    <GifBoxIcon
      style={{
        fontSize: "22px",
        verticalAlign: "middle",
      }}
    />
  );

  class DownloadControl extends Control {
    constructor(options = {}) {
      const button = document.createElement("button");
      button.innerHTML = ReactDOMServer.renderToString(iconElement);
      //button.title = 'Download Options';
      button.classList.add("download-button");

      // Create dropdown container
      const dropdown = document.createElement("div");
      dropdown.className = "download-dropdown";
      dropdown.style.display = "none";
      dropdown.style.position = "absolute";
      dropdown.style.background = "white";
      dropdown.style.borderRadius = "5px";
      dropdown.style.padding = "5px";
      dropdown.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.3)";
      dropdown.style.zIndex = "1000";

      // Create GeoTIFF download option
      const geoTiffOption = document.createElement("div");
      geoTiffOption.innerText = "Download GeoTIFF";
      geoTiffOption.style.cursor = "pointer";
      geoTiffOption.onclick = () => this.handleDownloadGeoTIFF();

      // Create CSV download option
      const csvOption = document.createElement("div");
      csvOption.innerText = "Download Table";
      csvOption.style.cursor = "pointer";
      csvOption.onclick = () => this.handleDownloadCSV();

      const divider_custom = document.createElement("div");
      divider_custom.style.width = "150px";
      divider_custom.style.height = "1px";
      divider_custom.style.backgroundColor = "#ccc";
      divider_custom.style.marginTop = "4px";

      // Append options to dropdown
      dropdown.appendChild(geoTiffOption);
      dropdown.appendChild(divider_custom);
      dropdown.appendChild(csvOption);

      // Create control container
      const element = document.createElement("div");
      element.className = "ol-control";
      element.appendChild(button);
      element.appendChild(dropdown);

      super({ element: element, target: options.target });

      // Show/hide dropdown on hover
      button.addEventListener("mouseenter", () => (dropdown.style.display = "block"));
      element.addEventListener("mouseleave", () => (dropdown.style.display = "none"));
    }

    handleDownloadGeoTIFF() {
      const map = this.getMap();
      const layers = map.getLayers().getArray();
      const geoTiffLayer = layers.find((layer) => layer.getSource() instanceof GeoTIFF);

      if (geoTiffLayer) {
        const source_tiff = geoTiffLayer.getSource();
        const geoTiffUrl = source_tiff.key_;
        if (geoTiffUrl) {
          this.downloadFile(geoTiffUrl, filename);
        } else {
          alert("No URL found for the GeoTIFF layer.");
        }
      } else {
        alert("No GeoTIFF layer is currently displayed on the map.");
      }
    }

    handleDownloadCSV() {
      let csvContent = [];
      if (CurrRisk !== "") {
        csvContent = fetchLocationData(activeRegion, activeCrop, activeScenario, CurrRisk, area_dict4);
      } else if (activeOpt !== "") {
        csvContent = fetchLocationDataAdap(activeRegion, activeCrop, activeScenario, activeOpt, area_dict3, activeOptLayer);
      }
      console.log(csvContent);
      const headers = Object.keys(csvContent[0]);
      const rows = csvContent.map((row) => headers.map((header) => row[header]).join(","));

      // Combine the headers and rows into a single string with newline separation
      const csvString = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      let filenametable = "No_data.csv";
      if (CurrRisk !== "") {
        filenametable = activeRegion + "_" + activeCrop + "_" + activeScenario + "_" + CurrRisk + ".csv";
      } else if (activeOpt !== "") {
        let opt_suffix = "";
        if (activeOptLayer["Adaptation Benefits"]) opt_suffix = "Adaptation Benefits";
        if (activeOptLayer["Economic"]) opt_suffix = "Economic Viability";
        if (activeOptLayer["Scalability"]) opt_suffix = "Scalability";
        filenametable = activeRegion + "_" + activeCrop + "_" + activeScenario + "_" + activeOpt + "_" + opt_suffix + ".csv";
      }
      this.downloadFile(url, filenametable);
      URL.revokeObjectURL(url);
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

  const popperControlRef = useRef(null);

  class PopperControl extends Control {
    constructor(options = {}) {
      const button = document.createElement("button");
      button.innerHTML = ReactDOMServer.renderToString(iconPlayGif);
      button.title = "Display Gif";
      button.classList.add("popper-button");

      const element = document.createElement("div");
      element.className = "ol-control ol-unselectable popper-gif-container";
      const popperContainer = document.createElement("div");
      popperContainer.style.cssText = `
      display: none;
      position: relative;
      top: 0px;
      right: 30px;
      background-color: ${mode === "dark" ? "#25292e" : "white"};
      border: 1px solid ${mode === "dark" ? "#e0e0e0" : "black"};
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
      z-index:1000;
    `;

      element.appendChild(button);
      element.appendChild(popperContainer);

      super({ element });

      let isOpen = false;

      button.addEventListener("click", () => {
        isOpen = !isOpen;
        popperContainer.style.display = isOpen ? "block" : "none";
      });

      this.popperContainer = popperContainer;
    }

    setReactComponent(reactComponent) {
      ReactDOM.render(reactComponent, this.popperContainer);
    }
  }

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

    // Ensure the reference exists before proceeding
    if (!ref.current) return;

    // Define basemap source based on theme mode
    const sourcemap = new TileJSON({
      url: mode === "dark" ? `https://api.maptiler.com/maps/dataviz-dark/tiles.json?key=${key}` : `https://api.maptiler.com/maps/bright-v2/tiles.json?key=${key}`,
      tileSize: 512,
      crossOrigin: "anonymous",
    });

    const BingMapNew = new TileLayer2({
      source: sourcemap,
      opacity: 0.9,
      zIndex: 10,
    });

    if (!mapRef.current) {
      // Initialize the map if it does not exist
      mapRef.current = new Map({
        controls: [
          new FullScreen({
            className: "ol-fullscreen-comp",
          }),
          new Zoom({
            className: "ol-zoom-comp",
          }),
          new ZoomToExtent({
            extent: defext,
            className: "ol-zoomtoextent-comp",
          }),
          new LegendControl(),
        ],
        target: ref.current,
        layers: [BingMapNew], // Set initial basemap
        view: ViewV,
      });
    } else {
      // Replace existing basemap when theme mode changes
      const layers = mapRef.current.getLayers().getArray();

      layers.forEach((layer) => {
        if (layer && typeof layer.getSource === "function" && layer.getSource() instanceof TileJSON) {
          mapRef.current.removeLayer(layer);
        }
      });

      mapRef.current.addLayer(BingMapNew);
    }

    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: mapRef.current,
      style: [
        new Style({
          fill: h_fill,
          stroke: h_stroke,
        }),
      ],
    });

    let highlight;

    const display_state = (pixel) => {
      const feature = mapRef.current.forEachFeatureAtPixel(pixel, (feature) => feature);
      let state = null;

      if (feature) {
        state = feature.get("D_NAME_1") || feature.get("STATE");
      }

      if (feature !== highlight) {
        if (highlight) featureOverlay.getSource().removeFeature(highlight);
        if (feature && state) featureOverlay.getSource().addFeature(feature);
        highlight = feature;
      }

      return state;
    };

    function getCentroidOfPolygon(geometry) {
      const extentt = geometry.getExtent();
      return [(extentt[0] + extentt[2]) / 2, (extentt[1] + extentt[3]) / 2];
    }

    const LocationofEvent = (pixel) => {
      const feature = mapRef.current.forEachFeatureAtPixel(pixel, (feature) => feature);
      return feature ? getCentroidOfPolygon(feature.getGeometry()) : null;
    };

    if (mapRef.current) {
      mapRef.current.on("pointermove", (evt) => {
        if (evt.dragging) return;

        const pixel = mapRef.current.getEventPixel(evt.originalEvent);
        const contentofbox = display_state(pixel);

        if (contentofbox) {
          content.innerHTML = contentofbox.toLowerCase();
          overlay.setPosition(LocationofEvent(pixel));
          mapRef.current.addOverlay(overlay);
        } else {
          mapRef.current.removeOverlay(overlay);
        }
      });
    }

    // Ensure the map resizes properly
    mapRef.current.updateSize();
  }, [mode, ref, mapRef]); // Re-run effect when `mode` changes

  const downloadControlRef = useRef(null);

  useEffect(() => {
    if (downloadControlRef.current) {
      mapRef.current.removeControl(downloadControlRef.current);
      downloadControlRef.current = null;
    }

    // Create and add new instance
    const downloadControl = new DownloadControl({ className: "download-button" });
    mapRef.current.addControl(downloadControl);
    downloadControlRef.current = downloadControl;

    if (CurrRisk !== "") {
      if (!popperControlRef.current) {
        // Prevent duplicate addition
        const popperControl = new PopperControl();
        mapRef.current.addControl(popperControl);
        popperControlRef.current = popperControl;
      }
    } else {
      if (popperControlRef.current) {
        mapRef.current.removeControl(popperControlRef.current);
        popperControlRef.current = null;
      }
    }
  }, [filename, CurrRisk]);

  useEffect(() => {
    if (popperControlRef.current) {
      popperControlRef.current.setReactComponent(
        <PopperGif
          activeCrop={activeCrop}
          activeScenario={activeScenario}
          activeRegion={activeRegion}
          focus={focus}
          activeOpt={activeOpt}
          CurrRisk={CurrRisk}
          activeImpact={activeImpact}
          activeOptLayer={activeOptLayer}
          modelName="CHC"
          displayLayer={displayLayer}
          activeScale={activeScale}
          exploreType={exploreType}
        />
      );
    }
  }, [activeCrop, activeScenario, activeRegion, focus, activeOpt, CurrRisk, activeImpact, activeOptLayer, displayLayer, activeScale, exploreType]);

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
              let x = 0;
              if (CurrRisk !== "" || activeOpt !== "" || ImpactName !== "") {
                x = 90;
              }
              mapRef.current.getView().fit(extentt, {
                size: [sizee[0] * 0.9, sizee[1] * 0.9],
                padding: [0, 0, x, 0],
              });
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
                opacity: mode === "dark" ? 0.4 : 0.9,
                zIndex: 100,
              });

              if (maskLayer1) {
                //console.log("Removing old mask layer");
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
  }, [mode, activeRegion, focus, mapRef, activeOpt, CurrRisk]);

  useEffect(() => {
    let source1 = null;
    let opt = 1;
    const optcode = {
      "Stress Tolerant Variety": "ADVAR",
      "Early Sowing": "ADPTI",
      "Precision Land Levelling": "LASLV",
      "Zero Tillage with residues": "ZTILL",
      "Broad Bed and Furrow": "BBFIB",
      "Direct Seeded Rice - Dry": "DSDRY",
      "Direct Seeded Rice - Wet": "DSWET",
      "System of Rice Intensification": "SRIUT",
      "Supplemental Irrigation": "WHSRC",
      "Microirrigation": "MICIR",
      "Precision Water Management": "PWMGT",
      "Precision Fertilizer Management": "PNMLT",
      "Precision Fertilizer Management - High tech": "PNMHT",
      "Deep Placement of Urea": "DR",
      "ICT linked Input Management": "WEAGA",
      "Crop Insurance": "INSUR",
      "Land Management": "LMGT",
      "Feed Management": "FMGT",
      "Herd Management": "HMGT",
      "Animal Health": "ANHLT",
      "Animal Productivity": "ANPRO",
      "Mulching": "MULCH",
      "Alternate Wetting and Drying": "AWD",
      "Fertilizer rating and timing": "FRT",
      "Manure Management": "MNMGT",
      "Information Use": "INFO",
      "Heat Stress Management": "HSMGT",
    };

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
      "Drought": "Drought",
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
      "Rainfall Deficit index": "Rainfall deficit",
      "Rainfall Deficit Index": "Rainfall deficit",
      "Extreme Rainfall days": "Extreme Rainfall Days",
      "Cold days": "Cold Stress",
      "Hot days": "Heat stress or hot days",
      "Temperature-Humidity Index": "THI",
      "Economic Development Indicator": "Human development index",
      "Seasonal Rainfall": "climatology_prec",
      "Maximum Temperature": "climatology_tmax",
      "Minimum Temperature": "climatology_tmin",
    };

    if (exploreType === "Commodity") {
      if (activeOpt !== "") {
        opt = 333;
        let urlstr = "xyz.tif";
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/Baseline/Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/SSP245/Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/SSP585/Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        }
        if (checkcrop2() === false) {
          opt = 333;
          urlstr = "./Adap/" + activeCrop + "/" + activeOpt + " Baseline.tif";
        }
        settiffFilePath(urlstr);
        source1 = new GeoTIFF({ sources: [{ url: urlstr }], sourceOptions: { allowFullFile: true } });
      } else if (CurrRisk !== "") {
        opt = 3;
        let urlstr = "xyz.tif";
        let district_n = "";
        if (activeScale === "District Level") {
          district_n = "District/";
        }
        if (activeScale === "State Level") {
          district_n = "State/";
        }
        if (activeScenario === "baseline") {
          //urlstr = "./Hazards/" + activeCrop + "/Baseline/" + district_n + "ZZ_" + hazardname[CurrRisk] + ".tif";
          //if (checkcrop2() === false) {
          urlstr = "./Hazards/" + activeCrop + "/" + modelName + "/" + district_n + "Baseline/" + "ZZ_" + hazardname[CurrRisk] + ".tif";
          //}
        } else {
          if (displayLayer === "Absolute Change") {
            opt = 102;
            urlstr = "./Hazards/" + activeCrop + "/" + activeScenario.toUpperCase() + "/" + district_n + "Abs_ZZ_" + hazardname[CurrRisk] + ".tif";
          } else if (displayLayer === "Percentage Change") {
            opt = 102;
            urlstr = "./Hazards/" + activeCrop + "/Percentage Change/" + activeScenario.toUpperCase() + "/" + district_n + "Cat_ZZ_" + hazardname[CurrRisk] + ".tif";
          } else {
            //urlstr = "./Hazards/" + activeCrop + "/" + activeScenario.toUpperCase() + "/" + district_n + "ZZ_" + hazardname[CurrRisk] + ".tif";
            //if (checkcrop2() === false) {
            urlstr = "./Hazards/" + activeCrop + "/" + modelName + "/" + district_n + activeScenario.toUpperCase() + "/ZZ_" + hazardname[CurrRisk] + ".tif";
            //}
          }
        }
        /* if(CurrRisk==='Hazard Index'){
          opt=4;
          urlstr = "./Hazard_index/"+activeCrop+".tif";
        } */
        /* if (CurrRisk === "Flood") {
          opt = 99;
        } */
        if (CurrRisk === "Seasonal Rainfall" || CurrRisk === "Maximum Temperature" || CurrRisk === "Minimum Temperature") {
          opt = 4;
          urlstr = "./BaseClimate/" + hazardname[CurrRisk] + ".tif";
        }
        if (checkcrop2() === false) {
          opt = 101;
        }
        settiffFilePath(urlstr);
        source1 = new GeoTIFF({
          sources: [{ url: urlstr }],
          sourceOptions: { allowFullFile: true },
        });
      } else if (activeImpact["Productivity"] || activeImpact["Value of Production"] || activeImpact["Resilience"]) {
        let urlstr = "xyz.tif";
        opt = 3;
        if (activeImpact["Productivity"]) {
          urlstr = "./Impact/" + activeCrop + "_DR.tif";
        } else if (activeImpact["Resilience"]) {
          urlstr = "./Impact/" + activeCrop + "/ZZ_NT_" + activeScenario + "_CV.tif";
        } else {
          urlstr = "./Impact/" + activeCrop + "/ZZ_" + activeScenario + "_vop_NT_wheat_USD.tif";
        }
        settiffFilePath(urlstr);
        source1 = new GeoTIFF({
          sources: [{ url: urlstr }],
          sourceOptions: { allowFullFile: true },
        });
      } else {
        let urlstr = "./Crop Masks/Extent/" + activeCrop + ".tif";
        settiffFilePath(urlstr);
        source1 = new GeoTIFF({
          sources: [{ url: urlstr }],
          sourceOptions: { allowFullFile: true },
        });
      }

      source1.on("change", function () {
        const state = source1.getState();
        if (state === "error") {
          setmsource(true);
        } else if (state === "ready") {
          setmsource(false);
        }
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
        newOverl.setStyle(color_hazard);
      } else if (opt === 3) {
        newOverl.setStyle(color_hazard_livestock);
        if (
          CurrRisk === "Irrigation" ||
          CurrRisk === "Volumetric Soil Water" ||
          CurrRisk === "Agriculture Income" ||
          CurrRisk === "Soil Organic Carbon" ||
          CurrRisk === "Feed/Fodder" ||
          CurrRisk === "Rural infrastructure" ||
          CurrRisk === "Economic Development Indicator" ||
          CurrRisk === "Income"
        ) {
          newOverl.setStyle(color_hazard_reverse);
        }
      } else if (opt === 333) {
        newOverl.setStyle(color_hazard_reverse);
        //newOverl.setStyle(color_hazard4);
      } else if (opt === 4) {
        newOverl.setStyle(color4);
      } else if (opt === 99) {
        newOverl.setStyle(color_hazard_25);
      } else if (opt === 101) {
        newOverl.setStyle(color_hazard_livestock);
        if (
          CurrRisk === "Irrigation" ||
          CurrRisk === "Volumetric Soil Water" ||
          CurrRisk === "Agriculture Income" ||
          CurrRisk === "Soil Organic Carbon" ||
          CurrRisk === "Feed/Fodder" ||
          CurrRisk === "Rural infrastructure" ||
          CurrRisk === "Economic Development Indicator" ||
          CurrRisk === "Income"
        ) {
          newOverl.setStyle(color_hazard_reverse);
        }
      } else if (opt === 102) {
        newOverl.setStyle(color_hazard3);
      } else if (opt === 801) {
        newOverl.setStyle(color_hazard_change);
      } else {
        newOverl.setStyle(colorGradientEx);
      }
      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setOverl(newOverl);
      }
    }
  }, [CurrRisk, activeCrop, activeOpt, activeImpact, mapRef, activeScenario, displayLayer, activeScale, exploreType]);

  useEffect(() => {
    let source_bio = null;
    let source_adapt = null;
    let source_socio = null;
    let source_scale = null;
    let found = false;
    let opt = 1;
    const optcode = {
      "Stress Tolerant Variety": "ADVAR",
      "Early Sowing": "ADPTI",
      "Precision Land Levelling": "LASLV",
      "Zero Tillage with residues": "ZTILL",
      "Broad Bed and Furrow": "BBFIB",
      "DSR (Dry Seed)": "DSDRY",
      "DSR (Wet Seed)": "DSWET",
      "System of Rice Intensification": "SRIUT",
      "Supplemental Irrigation": "WHSRC",
      "Microirrigation": "MICIR",
      "Precision Water Management": "PWMGT",
      "Precision Fertilizer Management": "PNMLT",
      "High-tech Precision Technology": "PNMHT",
      "Deep Placement of Urea": "DR",
      "ICT linked Input Management": "WEAGA",
      "Crop Insurance": "INSUR",
      "Land Management": "LMGT",
      "Feed Management": "FMGT",
      "Herd Management": "HMGT",
      "Animal Health": "ANHLT",
      "Animal Productivity": "ANPRO",
      "Mulching": "MULCH",
      "Alternate wetting and drying": "AWD",
      "Fertilizer rating and timing": "FRT",
      "Manure Management": "MNMGT",
      "Information Use": "INFO",
      "Heat Stress Management": "HSMGT",
    };

    if (activeOpt !== "") {
      opt = 2;
      let urlstr = "xyz.tif";
      if (!Biolayer && activeOptLayer["Biophysical Suitability"]) {
        found = true;
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/Baseline/Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/SSP245/Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/SSP585/Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        }
        source_bio = new GeoTIFF({
          sources: [{ url: urlstr }],
          sourceOptions: { allowFullFile: true },
        });
      }

      if (!Adaptlayer && activeOptLayer["Adaptation Benefits"]) {
        found = true;
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/Baseline/Tech/ADAP_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/SSP245/Tech/ADAP_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/SSP585/Tech/ADAP_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        }
        source_adapt = new GeoTIFF({
          sources: [{ url: urlstr }],
          sourceOptions: { allowFullFile: true },
        });
      }

      if (!Sociolayer && activeOptLayer["Economic"]) {
        found = true;
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/Baseline/Socio/ECO_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/SSP245/Socio/ECO_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/SSP585/Socio/ECO_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        }
        source_socio = new GeoTIFF({
          sources: [{ url: urlstr }],
          sourceOptions: { allowFullFile: true },
        });
      }

      if (!Scalelayer && activeOptLayer["Scalability"]) {
        found = true;
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/Baseline/Scale/SCA_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/SSP245/Scale/SCA_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/SSP585/Scale/SCA_Suitability_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        }
        source_scale = new GeoTIFF({
          sources: [{ url: urlstr }],
          sourceOptions: { allowFullFile: true },
        });
      }
    }

    if (mapRef.current && overl && found) {
      mapRef.current.removeLayer(overl);
    }

    if (activeOptLayer["Biophysical Suitability"] === false && Biolayer) {
      mapRef.current.removeLayer(Biolayer);
      setBioLayer(null);
    }
    if (activeOptLayer["Adaptation Benefits"] === false && Adaptlayer) {
      mapRef.current.removeLayer(Adaptlayer);
      setAdaptLayer(null);
    }
    if (activeOptLayer["Economic"] === false && Sociolayer) {
      mapRef.current.removeLayer(Sociolayer);
      setSocioLayer(null);
    }
    if (activeOptLayer["Scalability"] === false && Scalelayer) {
      mapRef.current.removeLayer(Scalelayer);
      setScaleLayer(null);
    }

    if (source_bio && activeOptLayer["Biophysical Suitability"]) {
      const newOverl = new TileLayer({
        source: source_bio,
        opacity: 1,
        zIndex: 92,
      });

      if (opt === 2) {
        newOverl.setStyle(color_hazard4);
      }
      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setBioLayer(newOverl);
      }
    }
    if (source_adapt && activeOptLayer["Adaptation Benefits"]) {
      const newOverl = new TileLayer({
        source: source_adapt,
        opacity: 1,
        zIndex: 93,
      });

      if (opt === 2) {
        newOverl.setStyle(color_adaptation_change);
      }
      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setAdaptLayer(newOverl);
      }
    }
    if (activeOptLayer["Economic"] && source_socio) {
      const newOverl = new TileLayer({
        source: source_socio,
        opacity: 1,
        zIndex: 94,
      });
      if (opt === 2) {
        newOverl.setStyle(color_adaptation_change);
      }
      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setSocioLayer(newOverl);
      }
    }
    if (source_scale && activeOptLayer["Scalability"]) {
      const newOverl = new TileLayer({
        source: source_scale,
        opacity: 1,
        zIndex: 95,
      });
      if (opt === 2) {
        newOverl.setStyle(color_hazard);
      }
      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setScaleLayer(newOverl);
      }
    }
  }, [activeOptLayer, activeOpt, mapRef]);
  //let optionname = activeOpt;
  return (
    <div style={{ overflow: "hidden" }}>
      <div id="popup2" class="ol-popup">
        <div id="popup-content2" style={{ textTransform: "capitalize", fontSize: "13px" }}></div>
      </div>
      <div ref={ref} style={{ height: activeOpt === "" ? "calc(100vh - 155px)" : "calc(100vh - 175px)", width: "auto", marginLeft: 0, marginBottom: "0px", padding: 0 }} className="map-container" />

      <Popper open={missingSource}>
        <div
          style={{
            position: "fixed",
            right: "330px",
            top: 95,
            boxShadow: "0px 0px 1px #aaa",
            backgroundColor: "rgba(14, 33, 1, 0.6)",
            border: "0px solid black",
            width: "180px",
            borderRadius: "5px",
            padding: "3px",
          }}
        >
          <Slide direction="down" in={missingSource} mountOnEnter unmountOnExit>
            <Typography sx={{ fontSize: 15, marginLeft: 1, marginY: 0.5, fontWeight: "bold" }} color="white" gutterBottom>
              Note{" "}
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Data to be updated soon.
              </Typography>
            </Typography>
          </Slide>
        </div>
      </Popper>
    </div>
  );
}
