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
import Tooltip from "@mui/material/Tooltip";
import TileLayer2 from "ol/layer/Tile";
import tilesource from "ol/source/TileJSON";
import TileJSON from "ol/source/TileJSON";
import Typography from "@mui/material/Typography";
import { Popper, Slide } from "@mui/material";
import { ZoomToExtent, FullScreen, defaults as defaultControls } from "ol/control.js";
import "./olsm.css";
import Box from "@mui/material/Box";

export default function Map_Risk({ activeCrop, focus = "Region", activeRegion, activeScenario }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const [overl, setOverl] = useState(null);
  const [vectorLayerr, setvectorLayerr] = useState(null);
  const [countryLayer, setcountryLayer] = useState(null);
  const [maskLayer1, setmaskLayer1] = useState(null);

  const [missingSource, setmsource] = useState(false);

  const { mode } = useContext(ThemeContext);

  const fill = new Fill({
    color: mode === "dark" ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)",
  });

  const stroke = new Stroke({
    color: mode === "dark" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    width: 1,
  });

  const stroke2 = new Stroke({
    color: "rgba(100, 100, 100, 1)",
    width: 1,
  });

  const ViewV = new View({
    center: fromLonLat([71.2090057, 21.6138954]),
    zoom: 3.5,
  });

  const color_IMPACT = {
    color: [
      "palette",
      ["interpolate", ["linear"], ["*", ["band", 2], 385], 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 9],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(150,150,150,1)", "#FF0000", "#FFA500", "#FFDE4D", "#FFDE4D", "#00FF00", "#059212", "rgba(150,150,150,1)"],
    ],
  };

  const key = "TrN2dn4maoO3C2x0sUpH";

  /*const sourcemap = new tilesource({
      url: `https://api.maptiler.com/maps/bright-v2/tiles.json?key=${key}`, // source URL
      tileSize: 512,
      crossOrigin: 'anonymous'
    });

    const BingMapNew = new TileLayer2({
          source: sourcemap,
      opacity:0.9,
    zIndex:10,
  });*/

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
  let defext = [6731721.531032621, -79003.34768295793, 10843798.383928495, 4648992.169943628];

  useEffect(() => {
    if (!ref.current) return; // Ensure ref is available

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

    if (ref.current && !mapRef.current) {
      // Initialize map only once
      mapRef.current = new Map({
        controls: defaultControls().extend([
          new ZoomToExtent({
            extent: defext,
            className: "ol-zoomtoextenty",
          }),
          new FullScreen({
            className: "ol-fullscreeny",
          }),
        ]),
        target: ref.current,
        layers: [BingMapNew],
        view: ViewV,
      });
    } else if (mapRef.current) {
      // Ensure we have valid layers before attempting removal
      const layers = mapRef.current.getLayers().getArray(); // Convert to array for iteration

      layers.forEach((layer) => {
        if (layer && typeof layer.getSource === "function" && layer.getSource() instanceof TileJSON) {
          mapRef.current.removeLayer(layer);
        }
      });

      mapRef.current.addLayer(BingMapNew);
    }

    // Ensure the map resizes properly
    mapRef.current.updateSize();
  }, [mode, ref, mapRef]); // Re-run when `mode` changes

  useEffect(() => {
    let sourcet;
    let countryboundary;
    if (focus === "Region") {
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
        countryboundary = new VectorSource({
          url: urlcountrystr,
          format: new GeoJSON(),
        });
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
    const urlstr = "./Impact/" + activeCrop + "_Productivity_" + activeScenario + ".tif";
    //console.log(urlstr);
    source1 = new GeoTIFF({
      sources: [{ url: urlstr }],
      sourceOptions: { allowFullFile: true },
    });

    if (mapRef.current && overl) {
      mapRef.current.removeLayer(overl);
      setOverl(null);
    }

    source1.on("change", function () {
      const state = source1.getState();
      if (state === "error") {
        setmsource(true);
      } else if (state === "ready") {
        setmsource(false);
      }
    });

    if (source1) {
      const newOverl = new TileLayer({
        source: source1,
      });
      newOverl.setOpacity(0.85);
      newOverl.setZIndex(90);

      newOverl.setStyle(color_IMPACT);

      if (mapRef.current) {
        mapRef.current.addLayer(newOverl);
        setOverl(newOverl);
      }
    }
  }, [mode, activeCrop, mapRef]);

  return (
    <div>
      <Tooltip
        title={<Typography sx={{ fontSize: 12 }}>Impact on Productivity</Typography>}
        open={true}
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -50],
                },
              },
            ],
          },
        }}
        PopperProps={{ style: { zIndex: 0 } }}
      >
        <div
          ref={ref}
          style={{
            position: "relative",
            height: "calc(100vh - 235px)",
            width: "24vw",
            marginLeft: 0,
            marginRight: 0,
          }}
          className="map-container"
        />
      </Tooltip>

      <Popper open={missingSource}>
        <div
          style={{
            position: "fixed",
            left: "calc(0vw + 10px)",
            top: "220px",
            boxShadow: "0px 0px 1px #aaa",
            backgroundColor: "rgba(240, 240, 240, 0.8)",
            zIndex: 5,
            border: "0px solid black",
            width: "calc(25vw - 10px)",
            height: "calc(100vh - 230px)",
            borderRadius: "5px",
            padding: "3px",
          }}
        >
          <Slide direction="down" in={missingSource} mountOnEnter unmountOnExit>
            <Box sx={{ height: "100%", alignContent: "center", justifyItems: "center" }}>
              <Typography sx={{ fontSize: 15, fontWeight: "bold" }} color="black" gutterBottom>
                Note{" "}
                <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                  Data to be updated soon.
                </Typography>
              </Typography>
            </Box>
          </Slide>
        </div>
      </Popper>
    </div>
  );
}
