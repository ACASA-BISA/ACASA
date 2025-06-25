import React, { useRef, useState, useEffect, useContext } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { GeoTIFF, TileJSON, Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Style, Fill, Stroke } from "ol/style";
import { FullScreen, ZoomToExtent, defaults as defaultControls } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";
import { Polygon } from "ol/geom";
import Feature from "ol/Feature";
import { ThemeContext } from "./ThemeContext"; // replace with your actual Theme context path

const MultiBandMapViewer = ({ activeCrop, activeRegion, CurrRisk, activeScenario, focus = "Region" }) => {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const [overl, setOverl] = useState(null);
  const [vectorLayerr, setvectorLayerr] = useState(null);
  const [countryLayer, setcountryLayer] = useState(null);
  const [maskLayer1, setmaskLayer1] = useState(null);
  const [tiffLayer, setTiffLayer] = useState(null);

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

  const defaultExtent = [6731721.5, -79003.3, 10843798.3, 4648992.1];
  const view = new View({ center: fromLonLat([71.209, 21.613]), zoom: 3.5 });

  // Setup Base Map
  useEffect(() => {
    const key = "TrN2dn4maoO3C2x0sUpH";
    const source = new TileJSON({
      url: mode === "dark" ? `https://api.maptiler.com/maps/dataviz-dark/tiles.json?key=${key}` : `https://api.maptiler.com/maps/bright-v2/tiles.json?key=${key}`,
      tileSize: 512,
      crossOrigin: "anonymous",
    });

    const baseMapLayer = new TileLayer({ source, opacity: 0.9, zIndex: 10 });

    if (!mapRef.current && ref.current) {
      mapRef.current = new Map({
        target: ref.current,
        controls: defaultControls().extend([new ZoomToExtent({ extent: defaultExtent, className: "ol-zoomtoextenty" }), new FullScreen({ className: "ol-fullscreeny" })]),
        view,
        layers: [baseMapLayer],
      });
    } else {
      const map = mapRef.current;
      map.getLayers().forEach((layer) => {
        if (layer.getSource() instanceof TileJSON) map.removeLayer(layer);
      });
      map.addLayer(baseMapLayer);
    }

    mapRef.current.updateSize();
  }, [mode]);

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

  // Animate Multi-band TIFF
  useEffect(() => {
    if (!mapRef.current) return;

    const totalBands = 34;
    let currentBand = 1;
    let intervalId;

    const modelName = "CHC";
    const baseUrl = "Timeline/classified_34_band_output.tif";

    const loadBand = (band) => {
      const source = new GeoTIFF({
        sources: [
          {
            url: baseUrl,
            bands: [band], // Correct usage
          },
        ],
        sourceOptions: { allowFullFile: true },
      });

      const newLayer = new TileLayer({
        source,
        style: color_IMPACT,
        opacity: 0.85,
        zIndex: 90,
      });

      if (tiffLayer) {
        mapRef.current.removeLayer(tiffLayer);
      }

      mapRef.current.addLayer(newLayer);
      setTiffLayer(newLayer);
    };

    loadBand(currentBand);
    intervalId = setInterval(() => {
      currentBand = (currentBand % totalBands) + 1;
      loadBand(currentBand);
    }, 500);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (tiffLayer) mapRef.current.removeLayer(tiffLayer);
    };
  }, [activeCrop, activeScenario]);

  return <div ref={ref} style={{ width: "200px", height: "200px" }} />;
};

export default MultiBandMapViewer;
