import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Grid, Box, FormControl, Breadcrumbs, Typography, Button, CircularProgress, useTheme, Select, MenuItem, IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import screenfull from "screenfull";
import _ from "lodash";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import MapLegend from "./MapLegend";
import DownloadDropdown from "./DownloadDropdown";
import AnalyticsPage from "./AnalyticsPage";

// Leaflet control setup
L.Control.MapControls = L.Control.extend({
  options: {
    position: "topright",
    isFullscreen: false,
    onFullscreen: () => { },
    onFitExtent: () => { },
    updateFullscreenButton: () => { },
  },
  onAdd: function (map) {
    const container = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control leaflet-control-custom"
    );
    const fullscreenButton = L.DomUtil.create(
      "a",
      "leaflet-control-button",
      container
    );
    fullscreenButton.innerHTML = this.options.isFullscreen ? "⤡" : "⤢";
    fullscreenButton.href = "#";
    fullscreenButton.title = this.options.isFullscreen
      ? "Exit Fullscreen"
      : "Enter Fullscreen";
    fullscreenButton.style.fontSize = "20px";
    L.DomEvent.on(fullscreenButton, "click", (e) => {
      L.DomEvent.stopPropagation(e);
      L.DomEvent.preventDefault(e);
      this.options.onFullscreen();
      this.options.updateFullscreenButton(fullscreenButton);
    });

    const fitExtentButton = L.DomUtil.create(
      "a",
      "leaflet-control-button",
      container
    );
    fitExtentButton.innerHTML = "<strong>E</strong>";
    fitExtentButton.href = "#";
    fitExtentButton.title = "Fit to Extent";
    fitExtentButton.style.fontSize = "16px";
    L.DomEvent.on(fitExtentButton, "click", (e) => {
      L.DomEvent.stopPropagation(e);
      L.DomEvent.preventDefault(e);
      this.options.onFitExtent();
    });

    container.style.backgroundColor = "#fff";
    container.style.border = "2px solid rgba(0,0,0,0.2)";
    container.style.borderRadius = "4px";
    const buttons = container.getElementsByTagName("a");
    for (let btn of buttons) {
      btn.style.display = "block";
      btn.style.padding = "4px";
      btn.style.textAlign = "center";
      btn.style.backgroundColor = "#fff";
      btn.style.borderBottom = "1px solid rgba(0,0,0,0.2)";
      btn.style.cursor = "pointer";
    }
    buttons[buttons.length - 1].style.borderBottom = "none";

    return container;
  },
  onRemove: function () { },
});

L.control.mapControls = function (mapControls) {
  return new L.Control.MapControls(mapControls);
};

function MapViewer({
  drawerOpen,
  filters,
  adaptations,
  selectedAdaptationId,
  setSelectedAdaptationId,
  selectedRiskId,
  setSelectedRiskId,
  selectedImpactId,
  setSelectedImpactId,
  mapLoading,
  setMapLoading,
  climateScenarios,
}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const theme = useTheme();
  const mapRefs = useRef([]);
  const mapInstances = useRef([]);
  const layerRefs = useRef([]);
  const boundsRefs = useRef([]);
  const fullscreenButtonRefs = useRef([]);
  const tileLayerRefs = useRef([]);
  const isZoomingRef = useRef([]);
  const [internalMapLoading, setInternalMapLoading] = useState([false, false, false]);
  const [tiffData, setTiffData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [allDataReady, setAllDataReady] = useState(false);
  const [breadcrumbData, setBreadcrumbData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState([false, false, false]);
  const [noGeoTiffAvailable, setNoGeoTiffAvailable] = useState([false, false, false]);
  const [adaptationTabs, setAdaptationTabs] = useState([]);
  const [selectedAdaptationTabId, setSelectedAdaptationTabId] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedIntensityMetric, setSelectedIntensityMetric] = useState("Intensity Frequency");
  const [selectedScenario, setSelectedScenario] = useState(3);
  const [selectedChangeMetric, setSelectedChangeMetric] = useState("Absolute");
  const [isOptionLoading, setIsOptionLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [viewMode, setViewMode] = useState("all");
  const [toggleChangeMetric, setToggleChangeMetric] = useState(true);
  const [toggleIntensityMetric, setToggleIntensityMetric] = useState(false);
  const isFetchingRef = useRef(false);
  const lastTiffDataRef = useRef([]);
  const lastViewModeRef = useRef("all");
  const mapsInitializedRef = useRef(false);
  const georasterCache = useRef(new Map());
  const hasRenderedRef = useRef([]);

  // Memoize filters
  const memoizedFilters = useMemo(
    () => ({
      ...filters,
      geojson: filters?.geojson ? JSON.parse(JSON.stringify(filters.geojson)) : null,
      bbox: filters?.bbox ? [...filters.bbox] : null,
    }),
    [filters]
  );

  useEffect(() => {
    console.log("Filters updated:", memoizedFilters);
  }, [memoizedFilters]);

  useEffect(() => {
    if (!selectedRiskId) {
      setSelectedRiskId(1);
    }
  }, [selectedRiskId, setSelectedRiskId]);

  useEffect(() => {
    setMapLoading(internalMapLoading.some(loading => loading));
  }, [internalMapLoading, setMapLoading]);

  useEffect(() => {
    if (
      +memoizedFilters?.commodity_type_id === 1 &&
      (memoizedFilters?.layer_type === "adaptation" ||
        memoizedFilters?.layer_type === "adaptation_croptab")
    ) {
      const fetchAdaptationTabs = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/lkp/specific/adaptation_croptabs`,
            { method: "GET", headers: { "Content-Type": "application/json" } }
          );
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const { success, data } = await response.json();
          if (!success) throw new Error("Error loading adaptation tabs");

          // Filter out tabs with status: false
          const activeTabs = data.filter(tab => tab.status);

          // Group tabs 3, 4, 5 under "Gender Suitability"
          const groupedTabs = [
            ...activeTabs.filter(tab => ![3, 4, 5].includes(tab.tab_id)),
            {
              tab_id: "gender_group",
              tab_name: "Gender Suitability",
              subTabs: activeTabs
                .filter(tab => [3, 4, 5].includes(tab.tab_id))
                .sort((a, b) => a.tab_id - b.tab_id),
            },
          ].filter(tab => tab.subTabs ? tab.subTabs.length > 0 : true);

          // Sort tabs to maintain order: 1, 2, gender_group, 
          const sortedTabs = groupedTabs.sort((a, b) => {
            const order = [1, 2, "gender_group", 6, 7, 8];
            const aIndex = a.tab_id === "gender_group" ? "gender_group" : a.tab_id;
            const bIndex = b.tab_id === "gender_group" ? "gender_group" : b.tab_id;
            return order.indexOf(aIndex) - order.indexOf(bIndex);
          });

          console.log('&&&&&&&&&&', sortedTabs);
          setAdaptationTabs(sortedTabs || []);
          if (sortedTabs?.length > 0 && !selectedAdaptationTabId) {
            setSelectedAdaptationTabId(1);
          }
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message || "Error loading adaptation tabs",
          });
          setAdaptationTabs([]);
        }
      };
      fetchAdaptationTabs();
    } else {
      setAdaptationTabs([]);
      setSelectedAdaptationTabId("");
    }
  }, [memoizedFilters?.commodity_type_id, memoizedFilters?.layer_type, apiUrl, selectedAdaptationTabId]);

  const cleanupMaps = useCallback(() => {
    mapInstances.current.forEach((map, index) => {
      if (map) {
        if (layerRefs.current[index]) {
          layerRefs.current[index].forEach((layer) => {
            if (layer && map.hasLayer(layer)) {
              try {
                map.removeLayer(layer);
              } catch (e) {
                console.warn(`Failed to remove layer at index ${index}:`, e);
              }
            }
          });
          layerRefs.current[index] = [];
        }
        if (tileLayerRefs.current[index] && map.hasLayer(tileLayerRefs.current[index])) {
          try {
            map.removeLayer(tileLayerRefs.current[index]);
          } catch (e) {
            console.warn(`Failed to remove tile layer at index ${index}:`, e);
          }
        }
        try {
          map.off();
          map.remove();
        } catch (e) {
          console.warn(`Failed to remove map at index ${index}:`, e);
        }
        mapInstances.current[index] = null;
      }
    });
    mapRefs.current = [];
    mapInstances.current = [];
    layerRefs.current = [];
    boundsRefs.current = [];
    fullscreenButtonRefs.current = [];
    tileLayerRefs.current = [];
    isZoomingRef.current = [];
    setIsFullscreen([false, false, false]);
    setTiffData([]);
    setNoGeoTiffAvailable([false, false, false]);
    setAllDataReady(false);
    setBreadcrumbData(null);
    mapsInitializedRef.current = false;
    georasterCache.current.clear();
    hasRenderedRef.current = [];
  }, []);

  const updateFullscreenButton = (button, index) => {
    if (button) {
      const isFull = isFullscreen[index] || false;
      button.innerHTML = isFull ? "⤡" : "⤢";
      button.title = isFull ? "Exit Fullscreen" : "Enter Fullscreen";
    }
  };

  const syncMaps = useCallback(
    _.throttle((sourceMap, sourceIndex) => {
      if (isSyncing) return;
      setIsSyncing(true);
      try {
        const visibleIndices = viewMode === "single" ? [0] : [0, 1, 2];
        mapInstances.current.forEach((map, index) => {
          if (
            map &&
            index !== sourceIndex &&
            visibleIndices.includes(index) &&
            mapInstances.current[index]
          ) {
            map.setView(sourceMap.getCenter(), sourceMap.getZoom(), { animate: true });
            _.debounce(() => map.invalidateSize(), 100)();
          }
        });
      } catch (e) {
        console.error("SyncMaps error:", e);
      } finally {
        setIsSyncing(false);
      }
    }, 50),
    [isSyncing, viewMode]
  );

  const getTileLayerUrl = () => {
    return theme.palette.mode === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  };

  const updateGeoTiffLayer = useCallback(async (tiff, index) => {
    if (!mapInstances.current[index] || !mapRefs.current[index] || !tiff || tiff.noGeoTiff) {
      console.warn(`Skipping updateGeoTiffLayer for index ${index}: ${tiff.noGeoTiff ? "No file matched" : "Invalid map or tiff data"}`);
      setInternalMapLoading(prev => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
      return;
    }

    const map = mapInstances.current[index];
    const currentZoom = map.getZoom();
    const cacheKey = `${tiff.metadata.source_file}-${index}-${currentZoom}`;

    // Skip update if layer is already cached for this zoom level
    if (georasterCache.current.has(cacheKey) && hasRenderedRef.current[index]) {
      console.log(`Skipping GeoTIFF update for index ${index}: already cached for zoom ${currentZoom}`);
      setInternalMapLoading(prev => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
      return;
    }

    setInternalMapLoading(prev => {
      const newLoading = [...prev];
      newLoading[index] = true;
      return newLoading;
    });

    const { arrayBuffer, metadata } = tiff;
    let georaster;
    if (georasterCache.current.has(cacheKey)) {
      georaster = georasterCache.current.get(cacheKey);
    } else {
      try {
        georaster = await parseGeoraster(arrayBuffer.slice(0));
        georasterCache.current.set(cacheKey, georaster);
      } catch (err) {
        console.error(`GeoRaster parsing error for index ${index}:`, err);
        setInternalMapLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
        throw err;
      }
    }

    // Dynamic resolution based on zoom level
    const resolution = currentZoom < 7 ? 128 : 256;

    const geotiffLayer = new GeoRasterLayer({
      georaster,
      opacity: 0.8,
      pixelValuesToColorFn: (values) => {
        if (!values || values.length === 0) return "rgba(255, 255, 255, 0)";
        if (values.length >= 4) {
          const [r, g, b, a] = values;
          return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        }
        const value = values[0];
        if (!metadata.color_ramp) return "rgba(255, 255, 255, 0)";
        const min = georaster.mins[0] || 0;
        const max = georaster.maxs[0] || 1;
        if (max === min || value < min || value > max) return "rgba(255, 255, 255, 0)";
        const colorIndex = Math.min(
          Math.max(
            Math.floor(((value - min) / (max - min)) * (metadata.color_ramp.length - 1)),
            0
          ),
          metadata.color_ramp.length - 1
        );
        return `rgba(${parseInt(metadata.color_ramp[colorIndex].slice(1, 3), 16)}, ${parseInt(
          metadata.color_ramp[colorIndex].slice(3, 5), 16
        )}, ${parseInt(metadata.color_ramp[colorIndex].slice(5, 7), 16)}, 0.8)`;
      },
      resolution,
      pane: "overlayPane",
      fadeAnimation: true,
    });

    // Remove old GeoTIFF layer
    if (layerRefs.current[index]) {
      const oldLayer = layerRefs.current[index].find(layer => layer instanceof GeoRasterLayer);
      if (oldLayer && map.hasLayer(oldLayer)) {
        map.removeLayer(oldLayer);
      }
      layerRefs.current[index] = layerRefs.current[index].filter(layer => !(layer instanceof GeoRasterLayer));
    }

    try {
      geotiffLayer.addTo(map);
      layerRefs.current[index].push(geotiffLayer);

      geotiffLayer.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        try {
          const value = await georaster.getValues([[lng, lat]])[0];
          L.popup()
            .setLatLng(e.latlng)
            .setContent(`Value: ${value !== undefined ? value.toFixed(2) : "N/A"} at (${lat.toFixed(4)}, ${lng.toFixed(4)})`)
            .openOn(map);
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to retrieve raster value.",
          });
        }
      });

      geotiffLayer.on("load", () => {
        console.log(`GeoTIFF layer ${index} loaded`);
        _.debounce(() => map.invalidateSize(), 100)();
        setInternalMapLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
      });

      geotiffLayer.on("error", (err) => {
        console.error(`GeoTIFF layer error for map ${index}:`, err);
        setInternalMapLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
      });

      setTiffData(prev => {
        const newTiffData = [...prev];
        newTiffData[index] = tiff;
        return newTiffData;
      });
      lastTiffDataRef.current[index] = tiff;
      hasRenderedRef.current[index] = true;
    } catch (err) {
      console.error(`Failed to add GeoTIFF layer to map ${index}:`, err);
      setInternalMapLoading(prev => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
    }
  }, []);

  const renderMapLayers = useCallback(
    (geoJson, bbox, tiff, index) => {
      if (
        !mapInstances.current[index] ||
        !mapRefs.current[index] ||
        !geoJson ||
        !bbox ||
        !tiff ||
        !allDataReady
      ) {
        console.warn(`Skipping renderMapLayers for index ${index}`);
        return;
      }

      if (hasRenderedRef.current[index] && _.isEqual(tiff, lastTiffDataRef.current[index])) {
        console.log(`Skipping renderMapLayers for index ${index}: no data change`);
        return;
      }

      const map = mapInstances.current[index];
      const bounds = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
      boundsRefs.current[index] = bounds;

      // Clear existing layers
      if (layerRefs.current[index]) {
        layerRefs.current[index].forEach(layer => {
          if (map.hasLayer(layer)) {
            map.removeLayer(layer);
          }
        });
        layerRefs.current[index] = [];
      }

      // Create a feature group for GeoJSON
      const geojsonFeatureGroup = L.featureGroup();
      const geojsonLayer = L.geoJSON(geoJson, {
        style: {
          color: theme.palette.mode === "dark" ? "white" : "black",
          weight: 1,
          fill: false,
          transition: "color 0.2s ease",
        },
        onEachFeature: (feature, layer) => {
          const tooltipNameIndex = {
            total: "country",
            country: "state",
            state: "district",
          };
          const tooltipText = feature.properties[tooltipNameIndex[memoizedFilters.admin_level]];
          if (tooltipText) {
            layer.bindTooltip(tooltipText, {
              permanent: false,
              direction: "auto",
              className: "map-tooltip",
            });
          }
        },
      });

      geojsonFeatureGroup.addLayer(geojsonLayer);

      // Create mask polygon
      const worldBounds = [
        [
          [-90, -180],
          [-90, 180],
          [90, 180],
          [90, -180],
          [-90, -180],
        ],
      ];

      const flipCoordinates = (coords) => {
        if (!Array.isArray(coords)) return coords;
        if (typeof coords[0] === "number" && typeof coords[1] === "number") {
          return [coords[1], coords[0]];
        }
        return coords.map(flipCoordinates);
      };

      const geojsonCoords = geoJson.features
        .filter(feature => feature.geometry && ["Polygon", "MultiPolygon"].includes(feature.geometry.type))
        .map(feature => {
          const { type, coordinates } = feature.geometry;
          try {
            return type === "Polygon" ? flipCoordinates(coordinates) : flipCoordinates(coordinates).flat(1);
          } catch (e) {
            console.warn(`Error processing geometry for feature at index ${index}:`, e);
            return [];
          }
        })
        .filter(coords => coords.length > 0);

      let maskPolygon;
      if (geojsonCoords.length > 0) {
        try {
          maskPolygon = L.polygon(
            [worldBounds[0], ...geojsonCoords],
            {
              color: "transparent",
              fillColor: "#ffffff",
              fillOpacity: 0.8,
              weight: 0,
              interactive: false,
              pane: "maskPane",
            }
          );
        } catch (e) {
          console.error(`Error creating mask polygon for index ${index}:`, e);
          maskPolygon = L.polygon(worldBounds, {
            color: "transparent",
            fillColor: "#ffffff",
            fillOpacity: 0.8,
            weight: 0,
            interactive: false,
            pane: "maskPane",
          });
        }
      }

      if (!map.getPane("maskPane")) {
        map.createPane("maskPane");
        map.getPane("maskPane").style.zIndex = 350;
      }

      // Add layers to map
      geojsonFeatureGroup.addTo(map);
      if (maskPolygon) {
        maskPolygon.addTo(map);
        layerRefs.current[index].push(maskPolygon);
      }
      layerRefs.current[index].push(geojsonFeatureGroup);

      map.fitBounds(bounds, { padding: [50, 50], animate: true });
      _.debounce(() => map.invalidateSize(), 100)();

      // Update GeoTIFF layer only if tiff is valid
      if (!tiff.noGeoTiff) {
        updateGeoTiffLayer(tiff, index).catch(err => {
          console.error(`Error updating GeoTIFF layer for index ${index}:`, err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Failed to update GeoTIFF layer for map ${index}: ${err.message}`,
          });
          setInternalMapLoading(prev => {
            const newLoading = [...prev];
            newLoading[index] = false;
            return newLoading;
          });
        });
      } else {
        setInternalMapLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
      }
    },
    [theme.palette.mode, allDataReady, updateGeoTiffLayer]
  );

  const initializeMaps = useCallback(() => {
    if (mapsInitializedRef.current) {
      console.log("Maps already initialized, skipping");
      return;
    }

    mapRefs.current = mapRefs.current.slice(0, 3);
    mapInstances.current = mapInstances.current.slice(0, 3);
    fullscreenButtonRefs.current = fullscreenButtonRefs.current.slice(0, 3);
    tileLayerRefs.current = tileLayerRefs.current.slice(0, 3);
    layerRefs.current = layerRefs.current.slice(0, 3);
    isZoomingRef.current = new Array(3).fill(false);
    hasRenderedRef.current = new Array(3).fill(false);

    [0, 1, 2].forEach((index) => {
      const mapRef = mapRefs.current[index];
      if (!mapRef || mapInstances.current[index]) return;

      if (mapRef && mapRef.offsetParent !== null) {
        const map = L.map(mapRef, {
          minZoom: 3,
          maxZoom: 18,
          zoom: 3,
          fadeAnimation: true,
          zoomAnimation: true,
          zoomSnap: 0.25,
          zoomDelta: 0.25,
          center: [20, 80],
          renderer: L.canvas(),
        });

        const tileLayer = L.tileLayer(getTileLayerUrl(), {
          attribution:
            theme.palette.mode === "dark"
              ? '&copy; <a href="https://carto.com/attributions">CARTO</a>'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          opacity: 0,
          errorTileUrl: "/images/fallback-tile.png",
          preload: 1,
        });

        tileLayer.addTo(map);
        tileLayer.on("load", () => {
          tileLayer.setOpacity(1);
          _.debounce(() => map.invalidateSize(), 100)();
        });
        tileLayer.on("error", (err) => {
          console.error(`Tile layer error for map ${index}:`, err);
        });

        mapInstances.current[index] = map;
        tileLayerRefs.current[index] = tileLayer;
        layerRefs.current[index] = [];

        const mapControl = L.control.mapControls({
          isFullscreen: isFullscreen[index] || false,
          onFullscreen: () => {
            if (screenfull.isEnabled) {
              screenfull.toggle(mapRef).then(() => {
                setIsFullscreen(prev => {
                  const newState = [...prev];
                  newState[index] = !newState[index];
                  return newState;
                });
                _.debounce(() => map.invalidateSize(), 100)();
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: "Fullscreen Not Supported",
                text: "Your browser does not support the fullscreen API.",
              });
            }
          },
          onFitExtent: () => {
            if (boundsRefs.current[index] && mapInstances.current[index]) {
              mapInstances.current[index].fitBounds(boundsRefs.current[index], { padding: [50, 50], animate: true });
              syncMaps(mapInstances.current[index], index);
            }
          },
          updateFullscreenButton: (button) => {
            fullscreenButtonRefs.current[index] = button;
            updateFullscreenButton(button, index);
          },
        });
        mapControl.addTo(map);

        // Throttled event handlers for zoom and move
        const throttledSync = _.throttle(() => syncMaps(map, index), 50);

        map.on("zoomstart", () => {
          isZoomingRef.current[index] = true;
        });
        map.on("zoomend", () => {
          isZoomingRef.current[index] = false;
          if (tiffData[index] && !tiffData[index].noGeoTiff && !hasRenderedRef.current[index]) {
            updateGeoTiffLayer(tiffData[index], index);
          }
          throttledSync();
        });
        map.on("move", throttledSync);

        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
          iconUrl: "/images/leaflet/marker-icon.png",
          shadowUrl: "/images/leaflet/marker-shadow.png",
        });

        _.debounce(() => map.invalidateSize(), 100)();
      }
    });
    mapsInitializedRef.current = true;
  }, [isFullscreen, syncMaps, theme.palette.mode, tiffData, updateGeoTiffLayer]);

  useEffect(() => {
    initializeMaps();
  }, [initializeMaps]);

  useEffect(() => {
    if (lastViewModeRef.current === viewMode) {
      console.log(`Skipping viewMode useEffect: viewMode unchanged (${viewMode})`);
      return;
    }

    lastViewModeRef.current = viewMode;
    const visibleIndices = viewMode === "single" ? [0] : [0, 1, 2];
    [0, 1, 2].forEach((index) => {
      if (mapInstances.current[index] && mapRefs.current[index]) {
        const mapContainer = mapRefs.current[index].parentElement;
        mapContainer.style.display = visibleIndices.includes(index) ? "block" : "none";
        if (visibleIndices.includes(index)) {
          if (!hasRenderedRef.current[index] && tiffData[index] && memoizedFilters.geojson && memoizedFilters.bbox) {
            console.log(`Rendering layers for map ${index} due to viewMode change to ${viewMode}`);
            renderMapLayers(memoizedFilters.geojson, memoizedFilters.bbox, tiffData[index], index);
          }
          mapInstances.current[index].invalidateSize();
          console.log(`Invalidated size for map ${index} due to viewMode change to ${viewMode}`);
          if (index !== 0 && mapInstances.current[0]) {
            mapInstances.current[index].setView(
              mapInstances.current[0].getCenter(),
              mapInstances.current[0].getZoom(),
              { animate: false }
            );
          }
        }
      }
    });
  }, [viewMode, tiffData, memoizedFilters.geojson, memoizedFilters.bbox, renderMapLayers]);

  useEffect(() => {
    mapInstances.current.forEach((map, index) => {
      if (map && tileLayerRefs.current[index] && mapRefs.current[index]) {
        tileLayerRefs.current[index].setOpacity(0);
        map.removeLayer(tileLayerRefs.current[index]);
        const newTileLayer = L.tileLayer(getTileLayerUrl(), {
          attribution:
            theme.palette.mode === "dark"
              ? '&copy; <a href="https://carto.com/attributions">CARTO</a>'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          opacity: 0,
          errorTileUrl: "/images/fallback-tile.png",
          preload: 1,
        });
        newTileLayer.addTo(map);
        tileLayerRefs.current[index] = newTileLayer;
        newTileLayer.on("load", () => {
          newTileLayer.setOpacity(1);
          console.log(`New tile layer loaded for map ${index}`);
          map.invalidateSize();
        });
        if (layerRefs.current[index]) {
          layerRefs.current[index].forEach((layer) => {
            if (layer instanceof L.GeoJSON) {
              layer.setStyle({
                color: theme.palette.mode === "dark" ? "white" : "black",
                weight: 1,
                fill: false,
                transition: "color 0.2s ease",
              });
            }
          });
        }
        map.invalidateSize();
      }
    });
  }, [theme.palette.mode]);

  const fetchWithRetry = async (url, options, retries = 3, backoff = 300) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) return response;
        throw new Error(`HTTP error! Status: ${response.status}`);
      } catch (err) {
        if (i === retries - 1) throw err;
        console.warn(`Retry ${i + 1}/${retries} for ${url}:`, err);
        await new Promise((resolve) => setTimeout(resolve, backoff * Math.pow(2, i)));
      }
    }
  };

  const fetchTiffData = async () => {
    if (isFetchingRef.current) {
      console.log("Skipping fetchTiffData: already in progress");
      return;
    }
    isFetchingRef.current = true;
    setInternalMapLoading([true, true, true]);
    setIsOptionLoading(true);
    setNoGeoTiffAvailable([false, false, false]);
    cleanupMaps();
    try {
      console.log("fetchTiffData triggered with filters:", memoizedFilters);
      const payload = {
        analysis_scope_id: +memoizedFilters.analysis_scope_id,
        visualization_scale_id: +memoizedFilters.visualization_scale_id,
        commodity_id: +memoizedFilters.commodity_id || null,
        data_source_id: +memoizedFilters.data_source_id,
        climate_scenario_id: +memoizedFilters.climate_scenario_id,
        layer_type: memoizedFilters.layer_type || "risk",
        risk_id: selectedRiskId || 1,
        impact_id: selectedImpactId || null,
        adaptation_id: selectedAdaptationId || null,
        adaptation_croptab_id: selectedAdaptationTabId || 6,
      };

      if (payload.layer_type !== "commodity") {
        const mandatoryFields = [
          "analysis_scope_id",
          "visualization_scale_id",
          "data_source_id",
          "climate_scenario_id",
          "layer_type",
        ];
        if (
          +memoizedFilters.commodity_type_id === 1 &&
          (memoizedFilters.layer_type === "adaptation" ||
            memoizedFilters.layer_type === "adaptation_croptab")
        ) {
          mandatoryFields.push("adaptation_croptab_id");
        }
        const missingFields = mandatoryFields.filter((field) => !payload[field]);
        if (missingFields.length > 0) {
          throw new Error(`Missing mandatory fields: ${missingFields.join(", ")}`);
        }
      }

      if (
        ["risk", "impact", "adaptation", "adaptation_croptab"].includes(payload.layer_type) &&
        !payload.commodity_id
      ) {
        throw new Error(`Commodity ID is required for ${payload.layer_type} layer type`);
      }

      const tifPickerRes = await fetchWithRetry(`${apiUrl}/layers/tif_picker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const tifPickerData = await tifPickerRes.json();
      console.log("tif_picker API response:", tifPickerData);

      if (!tifPickerData.success || !tifPickerData.data) {
        throw new Error(`Invalid response from tif_picker: success=${tifPickerData.success}, data=${tifPickerData.data ? "present" : "missing"}`);
      }

      const { data } = tifPickerData;
      const fileList = data.raster_files || data.files || [];
      if (!fileList.length) {
        throw new Error("No raster files available for the selected filters");
      }

      // Set default metrics based on API response
      setSelectedChangeMetric(data.default_change_metric_id === 1 ? "Absolute" : "Delta");
      setSelectedIntensityMetric(data.default_intensity_metric_id === 1 ? "Intensity" : "Intensity Frequency");
      setToggleChangeMetric(data.toggle_change_metric);
      setToggleIntensityMetric(data.toggle_intensity_metric);

      setFileList(fileList);
      const selectedCommodity = memoizedFilters.commodities?.find(
        (item) => item.commodity_id === memoizedFilters?.commodity_id
      );
      const commodityLabel = selectedCommodity ? selectedCommodity.commodity : null;
      setBreadcrumbData({
        mask: data.mask || null,
        commodityLabel: commodityLabel,
        commodity: data.commodity || null,
        level: data.level || null,
        model: data.model || null,
        scenario: data.scenario || null,
        country_id: memoizedFilters.country_id,
        state_id: memoizedFilters.state_id,
        commodity_id: memoizedFilters.commodity_id,
        climate_scenario_id: memoizedFilters.climate_scenario_id,
        data_source_id: memoizedFilters.data_source_id,
        visualization_scale_id: memoizedFilters.visualization_scale_id,
        adaptation_croptab_id: payload.layer_type === 'adaptation' && +memoizedFilters?.commodity_type_id === 1 ? selectedAdaptationTabId : null,
        intensity_metric_id: selectedIntensityMetric === "Intensity Frequency" ? 2 : 1,
        change_metric_id: selectedChangeMetric === "Absolute" ? 1 : 2,
      });

      let tiffPromises;
      if (payload.layer_type === "commodity") {
        const availableFiles = fileList.filter(file => file.exists && file.ramp).slice(0, 3);
        tiffPromises = Array(3).fill().map(async (_, index) => {
          const file = availableFiles.length === 1 ? availableFiles[0] : availableFiles[index] || availableFiles[0];
          if (!file || !file.exists) {
            console.warn(`No file matched for index ${index}`);
            setInternalMapLoading(prev => {
              const newLoading = [...prev];
              newLoading[index] = false;
              return newLoading;
            });
            return { noGeoTiff: true, metadata: { layer_name: ["Baseline", "2050s", "2080s"][index] } };
          }
          setInternalMapLoading(prev => {
            const newLoading = [...prev];
            newLoading[index] = true;
            return newLoading;
          });
          const geotiffRes = await fetchWithRetry(`${apiUrl}/layers/geotiff`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              admin_level: memoizedFilters.admin_level,
              admin_level_id: memoizedFilters.admin_level_id,
              source_file: file.source_file,
              color_ramp: file.ramp,
            }),
          });
          const arrayBuffer = await geotiffRes.arrayBuffer();
          if (!arrayBuffer || arrayBuffer.byteLength === 0) {
            throw new Error(`Empty or invalid arrayBuffer for ${file.source_file}`);
          }
          console.log(`GeoTIFF fetched for index ${index}, size: ${arrayBuffer.byteLength} bytes`);
          const clonedBuffer = arrayBuffer.slice(0);

          return {
            arrayBuffer: clonedBuffer,
            metadata: {
              source_file: file.source_file,
              color_ramp: file.ramp,
              layer_name: ["Baseline", "2050s", "2080s"][index],
              layer_id: null,
              year: [null, 2050, 2080][index],
              intensity_metric: null,
              climate_scenario_id: file.climate_scenario_id,
              change_metric: null,
            },
          };
        });
      } else {
        const defaultFilters = [
          {
            climate_scenario_id: 1,
            year: null,
            intensity_metric_id: selectedIntensityMetric.toLowerCase() === "intensity frequency" ? 2 : 1,
            change_metric_id: 1,
            metric: selectedIntensityMetric,
            changeMetric: "Absolute",
            label: "Baseline",
          },
          {
            climate_scenario_id: selectedScenario,
            year: 2050,
            intensity_metric_id: selectedIntensityMetric.toLowerCase() === "intensity frequency" ? 2 : 1,
            change_metric_id: selectedChangeMetric.toLowerCase() === "absolute" ? 1 : 2,
            metric: selectedIntensityMetric,
            changeMetric: selectedChangeMetric,
            label: "2050s",
          },
          {
            climate_scenario_id: selectedScenario,
            year: 2080,
            intensity_metric_id: selectedIntensityMetric.toLowerCase() === "intensity frequency" ? 2 : 1,
            change_metric_id: selectedChangeMetric.toLowerCase() === "absolute" ? 1 : 2,
            metric: selectedIntensityMetric,
            changeMetric: selectedChangeMetric,
            label: "2080s",
          },
        ];

        const existingFiles = fileList.filter((file) =>
          defaultFilters.some((filter) =>
            file.climate_scenario_id === filter.climate_scenario_id &&
            file.year === filter.year &&
            file.intensity_metric_id === filter.intensity_metric_id &&
            file.change_metric_id === filter.change_metric_id &&
            file.exists === true &&
            Array.isArray(file.ramp) && file.ramp.length > 0
          )
        );

        tiffPromises = defaultFilters.map(async (filter, index) => {
          let file = existingFiles.find(
            (f) =>
              f.climate_scenario_id === filter.climate_scenario_id &&
              f.year === filter.year &&
              f.intensity_metric_id === filter.intensity_metric_id &&
              f.change_metric_id === filter.change_metric_id &&
              Array.isArray(f.ramp) && f.ramp.length > 0
          );

          if (!file && fileList.length > 0) {
            file = fileList.find(f => f.exists === true && Array.isArray(f.ramp) && f.ramp.length > 0);
            console.warn(`No file matched for filter at index ${index}, falling back to first available file`);
          }

          if (!file || !file.exists) {
            console.warn(`No file matched for index ${index}:`, filter);
            setInternalMapLoading(prev => {
              const newLoading = [...prev];
              newLoading[index] = false;
              return newLoading;
            });
            return { noGeoTiff: true, metadata: { layer_name: filter.label } };
          }

          setInternalMapLoading(prev => {
            const newLoading = [...prev];
            newLoading[index] = true;
            return newLoading;
          });

          const geotiffRes = await fetchWithRetry(`${apiUrl}/layers/geotiff`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              admin_level: memoizedFilters.admin_level,
              admin_level_id: memoizedFilters.admin_level_id,
              source_file: file.source_file,
              color_ramp: file.ramp,
            }),
          });
          const arrayBuffer = await geotiffRes.arrayBuffer();
          if (!arrayBuffer || arrayBuffer.byteLength === 0) {
            throw new Error(`Empty or invalid arrayBuffer for ${file.source_file}`);
          }
          console.log(`GeoTIFF fetched for index ${index}, size: ${arrayBuffer.byteLength} bytes`);
          const clonedBuffer = arrayBuffer.slice(0);

          return {
            arrayBuffer: clonedBuffer,
            metadata: {
              source_file: file.source_file,
              color_ramp: file.ramp,
              layer_name: filter.label,
              layer_id: ({ risk: selectedRiskId, adaptation: selectedAdaptationId, impact: selectedImpactId }[payload.layer_type] ?? null),
              year: filter.year,
              intensity_metric: filter.metric,
              climate_scenario_id: file.climate_scenario_id,
              change_metric: filter.changeMetric,
            },
          };
        });
      }

      const tiffResults = await Promise.all(tiffPromises);
      const validTiffResults = tiffResults.filter((result) => !result.noGeoTiff);
      let finalTiffData = tiffResults;
      if (validTiffResults.length < 3) {
        const firstTiff = validTiffResults[0] || { noGeoTiff: true, metadata: { layer_name: "Baseline" } };
        finalTiffData = Array(3).fill().map((_, index) => ({
          ...firstTiff,
          metadata: {
            ...firstTiff.metadata,
            layer_name: ["Baseline", "2050s", "2080s"][index],
            year: [null, 2050, 2080][index],
          },
        }));
      }
      georasterCache.current.clear();
      hasRenderedRef.current = new Array(3).fill(false);
      setTiffData(finalTiffData);
      setNoGeoTiffAvailable(tiffResults.map((result) => !!result.noGeoTiff));
      lastTiffDataRef.current = finalTiffData;
      setIsFullscreen(new Array(3).fill(false));
      if (memoizedFilters.geojson && memoizedFilters.bbox) {
        setAllDataReady(true);
      }
    } catch (err) {
      console.error("Error fetching TIFF data:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to load map data.",
      });
      setTiffData([]);
      setNoGeoTiffAvailable([false, false, false]);
      setAllDataReady(false);
    } finally {
      setInternalMapLoading([false, false, false]);
      setIsOptionLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    console.log("fetchTiffData useEffect triggered", {
      filters: memoizedFilters,
      selectedAdaptationTabId,
      selectedRiskId,
      selectedImpactId,
      selectedAdaptationId,
    });

    if (
      !memoizedFilters ||
      (!memoizedFilters.layer_type && memoizedFilters.layer_type !== "commodity") ||
      !memoizedFilters.analysis_scope_id ||
      !memoizedFilters.visualization_scale_id ||
      !memoizedFilters.data_source_id ||
      (memoizedFilters.layer_type !== "commodity" && !memoizedFilters.climate_scenario_id)
    ) {
      console.log("Skipping fetchTiffData: filters are not fully populated", memoizedFilters);
      setInternalMapLoading([false, false, false]);
      setIsOptionLoading(false);
      return;
    }

    const debouncedFetch = _.debounce(fetchTiffData, 500);
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [memoizedFilters, selectedAdaptationTabId, selectedRiskId, selectedImpactId, selectedAdaptationId]);

  const memoizedTiffData = useMemo(() => {
    console.log("Memoizing tiffData:", tiffData);
    return tiffData;
  }, [tiffData]);

  const debouncedRenderMaps = useCallback(
    _.debounce(() => {
      console.log("debouncedRenderMaps triggered", {
        tiffDataLength: memoizedTiffData.length,
        geojson: !!memoizedFilters.geojson,
        bbox: !!memoizedFilters.bbox,
        allDataReady,
      });
      if (memoizedTiffData.length && memoizedFilters?.geojson && memoizedFilters?.bbox && allDataReady) {
        console.log(`Rendering ${memoizedTiffData.length} maps with tiffData`, memoizedTiffData);
        const visibleIndices = viewMode === "single" ? [0] : [0, 1, 2];
        memoizedTiffData.forEach((tiff, index) => {
          if (
            mapRefs.current[index] &&
            mapInstances.current[index] &&
            visibleIndices.includes(index) &&
            !hasRenderedRef.current[index]
          ) {
            console.log(`Triggering renderMapLayers for index ${index}`);
            renderMapLayers(memoizedFilters.geojson, memoizedFilters.bbox, tiff, index);
          } else {
            console.log(`Skipping renderMapLayers for index ${index}: already rendered or not visible`);
          }
        });
      }
    }, 150),
    [memoizedTiffData, memoizedFilters.geojson, memoizedFilters.bbox, allDataReady, renderMapLayers, viewMode]
  );

  useEffect(() => {
    debouncedRenderMaps();
    return () => {
      debouncedRenderMaps.cancel();
    };
  }, [debouncedRenderMaps]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const paths = document.querySelectorAll("path.leaflet-interactive");
      paths.forEach((path) => {
        path.style.outline = "none";
      });
    });

    const mapContainers = document.querySelectorAll(".leaflet-container");
    mapContainers.forEach((container) => {
      observer.observe(container, { childList: true, subtree: true });
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on("vite:beforeUpdate", () => {
        cleanupMaps();
      });
    }
  }, [cleanupMaps]);

  const handleDownloadGeoTIFF = (arrayBuffer, filename) => {
    try {
      const blob = new Blob([arrayBuffer], { type: "image/tiff" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log(`GeoTIFF downloaded: ${filename}`);
    } catch (err) {
      console.error("GeoTIFF download error:", err);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Failed to download GeoTIFF file.",
      });
    }
  };

  const handleDownloadTable = async (layerName, tiffMetadata) => {
    try {
      console.log(`Fetching table data for ${layerName}`);
      const payload = {
        layer_type: memoizedFilters?.layer_type || "risk",
        country_id: breadcrumbData?.country_id || null,
        state_id: breadcrumbData?.state_id || null,
        commodity_id: breadcrumbData?.commodity_id || null,
        climate_scenario_id: tiffMetadata.year ? breadcrumbData?.climate_scenario_id : 1,
        year: tiffMetadata.year || null,
        data_source_id: breadcrumbData?.data_source_id || null,
        visualization_scale_id: breadcrumbData?.visualization_scale_id || null,
        layer_id: tiffMetadata.layer_id || selectedRiskId || selectedAdaptationId,
        adaptation_croptab_id: breadcrumbData?.adaptation_croptab_id || null,
        intensity_metric_id: selectedIntensityMetric.toLowerCase() === "intensity frequency" ? 2 : 1,
        change_metric_id: selectedChangeMetric.toLowerCase() === "absolute" ? 1 : 2,
      };
      console.log("Table download payload:", payload);

      const response = await fetchWithRetry(`${apiUrl}/layers/table`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${layerName || "Table"}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log(`Table downloaded: ${layerName}.csv`);
    } catch (err) {
      console.error("Table download error:", err);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: `Failed to download table for ${layerName}: ${err.message}`,
      });
    }
  };

  const handleDownloadImage = async (layerName, mapIndex) => {
    try {
      console.log(`Capturing image for ${layerName} at map index ${mapIndex}`);
      const mapContainer = mapRefs.current[mapIndex];
      if (!mapContainer) {
        throw new Error("Map container not found");
      }

      if (mapInstances.current[mapIndex]) {
        mapInstances.current[mapIndex].invalidateSize();
        console.log(`Map ${mapIndex} invalidated for image capture`);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      const mapAndLegendContainer = mapContainer.closest(".map-and-legend-container");
      if (!mapAndLegendContainer) {
        throw new Error("Parent container for map and legend not found");
      }

      console.log(`Map and legend container dimensions: width=${mapAndLegendContainer.offsetWidth}, height=${mapAndLegendContainer.offsetHeight}`);

      const legendElement = mapAndLegendContainer.querySelector(".css-1annchz");
      console.log(`Legend element ${legendElement ? "found" : "not found"} in container`);

      let imgData;
      try {
        imgData = await domtoimage.toJpeg(mapAndLegendContainer, {
          bgcolor: "#fff",
          quality: 0.8,
          width: mapAndLegendContainer.offsetWidth,
          height: mapAndLegendContainer.offsetHeight,
        });
        console.log(`Image captured for ${layerName} using domtoimage`);
      } catch (error) {
        console.warn(`domtoimage failed for ${layerName}:`, error);
        const canvas = await html2canvas(mapAndLegendContainer, {
          scale: 1,
          useCORS: true,
          backgroundColor: "#fff",
        });
        imgData = canvas.toDataURL("image/jpeg", 0.8);
        console.log(`Image captured for ${layerName} using html2canvas`);
      }

      if (!imgData) {
        throw new Error("Failed to capture image data");
      }

      const a = document.createElement("a");
      a.href = imgData;
      a.download = `${layerName || "Map"}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log(`Image downloaded: ${layerName}.jpg`);
    } catch (err) {
      console.error(`Image download error for ${layerName}:`, err);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: `Failed to download image for ${layerName}: ${err.message}`,
      });
    }
  };

  const handleIntensityMetricChange = (value) => {
    setSelectedIntensityMetric(value);
    setIsOptionLoading(true);
    const intensityMetricId = value.toLowerCase() === "intensity frequency" ? 2 : 1;
    const indicesToUpdate = [0, 1, 2];
    let pendingUpdates = indicesToUpdate.length;

    indicesToUpdate.forEach((index) => {
      const year = index === 0 ? null : index === 1 ? 2050 : 2080;
      const climateScenarioId = index === 0 ? 1 : selectedScenario;
      const changeMetricId = index === 0 ? 1 : selectedChangeMetric.toLowerCase() === "absolute" ? 1 : 2;

      let file = fileList.find(
        (f) =>
          f.climate_scenario_id === climateScenarioId &&
          f.year === year &&
          f.intensity_metric_id === intensityMetricId &&
          f.change_metric_id === changeMetricId &&
          f.exists === true &&
          Array.isArray(f.ramp) && f.ramp.length > 0
      );

      if (!file && fileList.length > 0) {
        file = fileList.find((f) => f.exists === true && Array.isArray(f.ramp) && f.ramp.length > 0);
        console.warn(`No file matched for intensity metric change at index ${index}, falling back to first available file`);
      }

      if (file) {
        fetchGeoTiff(file, index, value, index === 0 ? "Absolute" : selectedChangeMetric, () => {
          pendingUpdates--;
          if (pendingUpdates === 0) {
            setIsOptionLoading(false);
          }
        });
      } else {
        console.warn(`No file matched for index ${index}, metric ${value}, scenario ${climateScenarioId}, year ${year || "Baseline"}`);
        setNoGeoTiffAvailable(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
        setTiffData(prev => {
          const newTiffData = [...prev];
          newTiffData[index] = { noGeoTiff: true, metadata: { layer_name: ["Baseline", "2050s", "2080s"][index] } };
          return newTiffData;
        });
        setInternalMapLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
        pendingUpdates--;
        if (pendingUpdates === 0) {
          setIsOptionLoading(false);
        }
      }
    });
  };

  const handleScenarioChange = (value) => {
    setSelectedScenario(value);
    setIsOptionLoading(true);
    const indicesToUpdate = [1, 2];
    let pendingUpdates = indicesToUpdate.length;

    indicesToUpdate.forEach((index) => {
      const year = index === 1 ? 2050 : 2080;
      const intensityMetricId = selectedIntensityMetric.toLowerCase() === "intensity frequency" ? 2 : 1;
      const changeMetricId = selectedChangeMetric.toLowerCase() === "absolute" ? 1 : 2;

      let file = fileList.find(
        (f) =>
          f.climate_scenario_id === value &&
          f.year === year &&
          f.intensity_metric_id === intensityMetricId &&
          f.change_metric_id === changeMetricId &&
          f.exists === true &&
          Array.isArray(f.ramp) && f.ramp.length > 0
      );

      if (!file && fileList.length > 0) {
        file = fileList.find((f) => f.exists === true && Array.isArray(f.ramp) && f.ramp.length > 0);
        console.warn(`No file matched for scenario change at index ${index}, falling back to first available file`);
      }

      if (file) {
        fetchGeoTiff(file, index, selectedIntensityMetric, selectedChangeMetric, () => {
          pendingUpdates--;
          if (pendingUpdates === 0) {
            setIsOptionLoading(false);
          }
        });
      } else {
        console.warn(`No file matched for index ${index}, scenario ${value}, year ${year}`);
        setNoGeoTiffAvailable(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
        setTiffData(prev => {
          const newTiffData = [...prev];
          newTiffData[index] = { noGeoTiff: true, metadata: { layer_name: ["2050s", "2080s"][index - 1] } };
          return newTiffData;
        });
        setInternalMapLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
        pendingUpdates--;
        if (pendingUpdates === 0) {
          setIsOptionLoading(false);
        }
      }
    });
  };

  const handleChangeMetricChange = (value) => {
    setSelectedChangeMetric(value);
    setIsOptionLoading(true);
    const indicesToUpdate = [1, 2];
    let pendingUpdates = indicesToUpdate.length;

    indicesToUpdate.forEach((index) => {
      const year = index === 1 ? 2050 : 2080;
      const intensityMetricId = selectedIntensityMetric.toLowerCase() === "intensity frequency" ? 2 : 1;
      const changeMetricId = value.toLowerCase() === "absolute" ? 1 : 2;

      let file = fileList.find(
        (f) =>
          f.climate_scenario_id === selectedScenario &&
          f.year === year &&
          f.intensity_metric_id === intensityMetricId &&
          f.change_metric_id === changeMetricId &&
          f.exists === true &&
          Array.isArray(f.ramp) && f.ramp.length > 0
      );

      if (!file && fileList.length > 0) {
        file = fileList.find((f) => f.exists === true && Array.isArray(f.ramp) && f.ramp.length > 0);
        console.warn(`No file matched for change metric at index ${index}, falling back to first available file`);
      }

      if (file) {
        fetchGeoTiff(file, index, selectedIntensityMetric, value, () => {
          pendingUpdates--;
          if (pendingUpdates === 0) {
            setIsOptionLoading(false);
          }
        });
      } else {
        console.warn(`No file matched for index ${index}, change metric ${value}, year ${year}`);
        setNoGeoTiffAvailable(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
        setTiffData(prev => {
          const newTiffData = [...prev];
          newTiffData[index] = { noGeoTiff: true, metadata: { layer_name: ["2050s", "2080s"][index - 1] } };
          return newTiffData;
        });
        setInternalMapLoading(prev => {
          const newLoading = [...prev];
          newLoading[index] = false;
          return newLoading;
        });
        pendingUpdates--;
        if (pendingUpdates === 0) {
          setIsOptionLoading(false);
        }
      }
    });
  };

  const fetchGeoTiff = async (file, index, metric, changeMetric, onComplete) => {
    if (!file.exists) {
      console.warn(`No file matched for index ${index}, skipping fetch`);
      setTiffData(prev => {
        const newTiffData = [...prev];
        newTiffData[index] = { noGeoTiff: true, metadata: { layer_name: ["Baseline", "2050s", "2080s"][index] } };
        return newTiffData;
      });
      setNoGeoTiffAvailable(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
      setInternalMapLoading(prev => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
      onComplete();
      return;
    }

    try {
      setInternalMapLoading(prev => {
        const newLoading = [...prev];
        newLoading[index] = true;
        return newLoading;
      });
      const geotiffRes = await fetchWithRetry(`${apiUrl}/layers/geotiff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_level: memoizedFilters.admin_level,
          admin_level_id: memoizedFilters.admin_level_id,
          source_file: file.source_file,
          color_ramp: file.ramp,
        }),
      });
      const arrayBuffer = await geotiffRes.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error(`Empty or invalid arrayBuffer for ${file.source_file}`);
      }
      console.log(`GeoTIFF fetched for index ${index}, size: ${arrayBuffer.byteLength} bytes`);
      const clonedBuffer = arrayBuffer.slice(0);

      const newTiff = {
        arrayBuffer: clonedBuffer,
        metadata: {
          source_file: file.source_file,
          color_ramp: file.ramp,
          layer_name: ["Baseline", "2050s", "2080s"][index],
          layer_id: memoizedFilters.layer_type === "risk" ? selectedRiskId : memoizedFilters.layer_type === "adaptation" ? selectedAdaptationId : memoizedFilters.layer_type === "impact" ? selectedImpactId : null,
          year: index === 0 ? null : index === 1 ? 2050 : 2080,
          intensity_metric: metric,
          climate_scenario_id: file.climate_scenario_id,
          change_metric: changeMetric,
        },
      };

      georasterCache.current.delete(`${file.source_file}-${index}`);
      hasRenderedRef.current[index] = false;

      setTiffData(prev => {
        const newTiffData = [...prev];
        newTiffData[index] = newTiff;
        return newTiffData;
      });

      if (mapInstances.current[index]) {
        await updateGeoTiffLayer(newTiff, index);
      }
      onComplete();
    } catch (err) {
      console.error("Error fetching GeoTIFF:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to load GeoTIFF data.",
      });
      setTiffData(prev => {
        const newTiffData = [...prev];
        newTiffData[index] = { noGeoTiff: true, metadata: { layer_name: ["Baseline", "2050s", "2080s"][index] } };
        return newTiffData;
      });
      setNoGeoTiffAvailable(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
      setInternalMapLoading(prev => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
      onComplete();
    }
  };

  useEffect(() => {
    const handlePopoverFocus = () => {
      const popovers = document.querySelectorAll(".MuiPopover-root[aria-hidden='true']");
      popovers.forEach((popover) => {
        const focusedElement = popover.querySelector(":focus");
        if (focusedElement) {
          popover.removeAttribute("aria-hidden");
          console.log("Removed aria-hidden from popover due to focused descendant");
        }
      });
    };

    document.addEventListener("focusin", handlePopoverFocus);
    return () => {
      document.removeEventListener("focusin", handlePopoverFocus);
    };
  }, []);

  const getGridLayout = () => {
    return { xs: viewMode === "single" ? 12 : 4, height: "100%" };
  };

  const gridLayout = getGridLayout();

  const handleAdaptationTabChange = (tabId) => {
    setSelectedAdaptationTabId(tabId);
  };

  const toggleAnalytics = () => {
    setShowAnalytics((prev) => !prev);
  };

  const handleViewSingle = () => {
    setViewMode("single");
  };

  const handleViewAll = () => {
    setViewMode("all");
  };

  const defaultTiffData = Array(3).fill(null).map((_, index) => ({
    arrayBuffer: null,
    metadata: {
      layer_name: ["Baseline", "2050s", "2080s"][index],
      source_file: null,
      color_ramp: null,
      layer_id: null,
      year: [null, 2050, 2080][index],
      intensity_metric: null,
      climate_scenario_id: null,
      change_metric: null,
    },
  }));

  const selectStyles = {
    minWidth: "130px",
    height: "22px",
    color: "black",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[700],
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[900],
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiSelect-icon": {
      color: theme.palette.grey[700],
    },
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        padding: "0 0px",
        backgroundColor: (theme) => theme.palette.background.paper,
        position: "relative",
      }}
    >
      <Box
        sx={{
          p: "0 16px",
          marginTop: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="breadTextFont"
      >
        <Box sx={{ flexGrow: 1 }}>
          {breadcrumbData && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator=">"
              sx={{ fontSize: "14px" }}
            >
              {memoizedFilters?.region && (
                <Typography
                  key="region"
                  color="text.primary"
                  sx={{ fontSize: "14px !important", fontWeight: "bold !important" }}
                >
                  {memoizedFilters.region.join(", ")}
                </Typography>
              )}
              {breadcrumbData.level && (
                <Typography
                  key="level"
                  color="text.primary"
                  sx={{ fontSize: "14px !important" }}
                >
                  {breadcrumbData.level}
                </Typography>
              )}
              <Typography
                key="layer"
                color="text.primary"
                sx={{ fontSize: "14px !important" }}
              >
                {breadcrumbData.commodity}
              </Typography>
              {breadcrumbData.scenario && (
                <Typography
                  key="scenario"
                  color="text.primary"
                  sx={{ fontSize: "14px !important" }}
                >
                  Scenario: {breadcrumbData.scenario}
                </Typography>
              )}
            </Breadcrumbs>
          )}
        </Box>
        <IconButton
          onClick={toggleAnalytics}
          title={showAnalytics ? "Hide climate projections" : "Show climate projections"}
          sx={{ ml: 2 }}
        >
          <BarChartIcon />
        </IconButton>
      </Box>
      {+memoizedFilters?.commodity_type_id === 1 &&
        (memoizedFilters?.layer_type === "adaptation" ||
          memoizedFilters?.layer_type === "adaptation_croptab") && (
          <Box
            sx={{
              p: "0 16px",
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%-10px",
            }}
          >
            {adaptationTabs.map((tab) =>
              tab.tab_id === "gender_group" ? (
                <FormControl
                  key={tab.tab_id}
                  sx={{
                    flex: 1,
                  }}
                >
                  <Select
                    disableUnderline
                    value={selectedAdaptationTabId}
                    onChange={(e) => handleAdaptationTabChange(e.target.value)}
                    variant="standard"
                    disabled={internalMapLoading.some((loading) => loading)}
                    renderValue={(selected) => {
                      const isSubTabSelected = tab.subTabs.some(
                        (subTab) => +subTab.tab_id === +selected
                      );
                      return isSubTabSelected
                        ? tab.subTabs.find((subTab) => +subTab.tab_id === +selected)?.tab_name
                        : "Gender Suitability";
                    }}
                    sx={(theme) => ({
                      backgroundColor: tab.subTabs.some(
                        (subTab) => +subTab.tab_id === +selectedAdaptationTabId
                      )
                        ? "rgb(191, 215, 122)"
                        : theme.palette.mode === "dark"
                          ? "rgba(60, 75, 60, 1)"
                          : "rgba(235, 247, 233, 1)",
                      fontSize: 13,
                      paddingY: "3px",
                      "& .MuiSelect-select": {
                        paddingY: "3px",
                      },
                    })}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    {tab.subTabs.map((subTab) => (
                      <MenuItem
                        key={subTab.tab_id}
                        value={subTab.tab_id}
                        sx={{ fontSize: 13, paddingY: "2px" }}
                      >
                        {subTab.tab_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Button
                  key={tab.tab_id}
                  variant={+selectedAdaptationTabId === +tab.tab_id ? "contained" : "outlined"}
                  onClick={() => handleAdaptationTabChange(tab.tab_id)}
                  disabled={internalMapLoading.some((loading) => loading)}
                  sx={{
                    flex: 1,
                    textTransform: "none",
                    fontSize: "13px",
                    padding: "2px 12px",
                    borderRadius: "4px",
                    backgroundColor: +selectedAdaptationTabId === +tab.tab_id
                      ? "rgb(191, 215, 122)"
                      : "transparent",
                    borderColor: (theme) =>
                      +selectedAdaptationTabId === +tab.tab_id
                        ? "rgb(191, 215, 122)"
                        : theme.palette.grey[500],
                    color: (theme) =>
                      +selectedAdaptationTabId === +tab.tab_id
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                  }}
                >
                  {tab.tab_name}
                </Button>
              )
            )}
          </Box>
        )
      }
      <Box
        sx={{
          position: "relative",
          height:
            +memoizedFilters?.commodity_type_id === 1 &&
              (memoizedFilters?.layer_type === "adaptation" ||
                memoizedFilters?.layer_type === "adaptation_croptab")
              ? "calc(100% - 52px)"
              : "calc(100% - 36px)",
          width: "100%",
        }}
      >
        <Grid
          container
          direction="row"
          sx={{
            height: "100%",
            width: "100%",
            padding: "0 10px 0 0",
          }}
        >
          {defaultTiffData.map((tiff, index) => (
            <Grid
              item
              xs={gridLayout.xs}
              key={`map-${index}`}
              sx={{
                height: gridLayout.height,
                position: "relative",
                padding: "10px 0 0 16px",
                display: viewMode === "all" || (viewMode === "single" && index === 0) ? "flex" : "none",
                flexDirection: "column",
                flexGrow: viewMode === "single" ? 1 : 0,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "#C1E1C1",
                  height: "30px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>
                    {tiffData[index]?.metadata.layer_name || defaultTiffData[index].metadata.layer_name}
                  </Typography>

                  {memoizedFilters.layer_type && memoizedFilters.layer_type !== "commodity" && index === 0 && toggleIntensityMetric && (
                    <Select
                      value={selectedIntensityMetric}
                      onChange={(e) => handleIntensityMetricChange(e.target.value)}
                      sx={selectStyles}
                      disabled={isOptionLoading}
                    >
                      <MenuItem value="Intensity">Intensity</MenuItem>
                      <MenuItem value="Intensity Frequency">Intensity Frequency</MenuItem>
                    </Select>
                  )}

                  {memoizedFilters.layer_type && memoizedFilters.layer_type !== "commodity" && index !== 0 && (
                    <>
                      <Select
                        value={selectedScenario}
                        onChange={(e) => handleScenarioChange(e.target.value)}
                        sx={selectStyles}
                        disabled={isOptionLoading}
                      >
                        {climateScenarios
                          .filter((scenario) => scenario.scenario_id !== 1)
                          .map((scenario) => (
                            <MenuItem key={scenario.scenario_id} value={scenario.scenario_id}>
                              {scenario.scenario}
                            </MenuItem>
                          ))}
                      </Select>

                      {toggleChangeMetric && (
                        <Select
                          value={selectedChangeMetric}
                          onChange={(e) => handleChangeMetricChange(e.target.value)}
                          sx={selectStyles}
                          disabled={isOptionLoading}
                        >
                          <MenuItem value="Absolute">Absolute</MenuItem>
                          <MenuItem value="Delta">Delta</MenuItem>
                        </Select>
                      )}
                    </>
                  )}
                </Box>

                {index === 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {viewMode === "all" ? (
                      <IconButton
                        onClick={handleViewSingle}
                        title="Show only Baseline map"
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={handleViewAll}
                        title="Show all maps"
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <ViewModuleIcon />
                      </IconButton>
                    )}
                  </Box>
                )}
              </Box>
              <Box
                className="map-and-legend-container"
                sx={{
                  height:
                    +memoizedFilters?.commodity_type_id === 1 &&
                      (memoizedFilters?.layer_type === "adaptation" ||
                        memoizedFilters?.layer_type === "adaptation_croptab")
                      ? "calc(100% - 52px)"
                      : "calc(100% - 36px)",
                  width: "100%",
                  border: "1px solid #ededed",
                  position: "relative",
                  overflow: "hidden",
                  visibility: "visible",
                  opacity: 1,
                }}
              >
                <Box
                  ref={(el) => {
                    mapRefs.current[index] = el;
                    if (el) {
                      console.log(`Map ref set for index ${index}`);
                    }
                  }}
                  sx={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    zIndex: 1000,
                    display: "block",
                    visibility: "visible",
                    opacity: 1,
                  }}
                />
                {internalMapLoading[index] && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      zIndex: 1200,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
                {noGeoTiffAvailable[index] && !internalMapLoading[index] && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      zIndex: 1100,
                      color: theme.palette.text.primary,
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    <Typography>No GeoTIFF available for this selection</Typography>
                  </Box>
                )}
                {tiffData[index] && !tiffData[index].noGeoTiff && (
                  <DownloadDropdown
                    layerName={tiffData[index].metadata.layer_name}
                    layerType={memoizedFilters?.layer_type || "risk"}
                    mapIndex={index}
                    onDownloadGeoTIFF={() =>
                      handleDownloadGeoTIFF(tiffData[index].arrayBuffer, `${tiffData[index].metadata.layer_name}.tif`)
                    }
                    onDownloadTable={() => handleDownloadTable(tiffData[index].metadata.layer_name, tiffData[index].metadata)}
                    onDownloadImage={() => handleDownloadImage(tiffData[index].metadata.layer_name, index)}
                  />
                )}
                {tiffData[index] && !tiffData[index].noGeoTiff && (
                  <MapLegend
                    tiff={tiffData[index]}
                    breadcrumbData={breadcrumbData}
                    layerType={memoizedFilters?.layer_type || "risk"}
                    apiUrl={apiUrl}
                    legendType="Large"
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: 0,
            bottom: 0,
            backgroundColor: "lightblue",
            zIndex: 1500,
            padding: "16px 16px 0 16px",
            height: "500px",
            width: "500px",
            display: showAnalytics && !internalMapLoading.some(loading => loading) && breadcrumbData ? "block" : "none",
          }}
        >
          <AnalyticsPage filters={memoizedFilters} />
        </Box>
      </Box>
    </Box>
  );
}

export default MapViewer;