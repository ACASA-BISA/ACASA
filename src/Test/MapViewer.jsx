import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Grid, Box, Breadcrumbs, Typography, Button, CircularProgress, useTheme, Select, MenuItem, IconButton, } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart"; // Icon for analytics toggle
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
import AnalyticsPage from "./AnalyticsPage"; // Import AnalyticsPage

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
  const [internalMapLoading, setInternalMapLoading] = useState(false);
  const [tiffData, setTiffData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [allDataReady, setAllDataReady] = useState(false);
  const [breadcrumbData, setBreadcrumbData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState([]);
  const [adaptationTabs, setAdaptationTabs] = useState([]);
  const [selectedAdaptationTabId, setSelectedAdaptationTabId] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedIntensityMetric, setSelectedIntensityMetric] = useState("Intensity");
  const [selectedScenario, setSelectedScenario] = useState(2);
  const [selectedChangeMetric, setSelectedChangeMetric] = useState("Absolute");
  const [isOptionLoading, setIsOptionLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false); // State for toggling AnalyticsPage
  const isFetchingRef = useRef(false);
  const lastTiffDataRef = useRef([]);
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
    setMapLoading(internalMapLoading);
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
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
          const { success, data } = await response.json();
          if (!success) throw new Error("Error loading adaptation tabs");
          setAdaptationTabs(data || []);
          if (data?.length > 0 && !selectedAdaptationTabId) {
            setSelectedAdaptationTabId(6);
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
  }, [
    memoizedFilters?.commodity_type_id,
    memoizedFilters?.layer_type,
    apiUrl,
    selectedAdaptationTabId,
  ]);

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
        if (
          tileLayerRefs.current[index] &&
          map.hasLayer(tileLayerRefs.current[index])
        ) {
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
    setIsFullscreen([]);
    setTiffData([]);
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

  const syncMaps = _.debounce((sourceMap, sourceIndex) => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      mapInstances.current.forEach((map, index) => {
        if (map && index !== sourceIndex && mapInstances.current[index]) {
          map.setView(sourceMap.getCenter(), sourceMap.getZoom(), {
            animate: false,
          });
          if (
            tiffData[index] &&
            mapInstances.current[index] &&
            !hasRenderedRef.current[index]
          ) {
            renderMapLayers(
              memoizedFilters.geojson,
              memoizedFilters.bbox,
              tiffData[index],
              index
            );
          }
        }
      });
    } catch (e) {
      console.error("SyncMaps error:", e);
    } finally {
      setIsSyncing(false);
    }
  }, 300);

  const getTileLayerUrl = () => {
    return theme.palette.mode === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  };

  const initializeMaps = useCallback(() => {
    if (!tiffData.length || !mapRefs.current.length || !allDataReady) {
      console.warn("Skipping initializeMaps due to missing dependencies", {
        tiffDataLength: tiffData.length,
        mapRefsLength: mapRefs.current.length,
        allDataReady,
      });
      return;
    }
    if (mapsInitializedRef.current) {
      console.log("Maps already initialized, skipping");
      return;
    }

    mapRefs.current = mapRefs.current.slice(0, 3);
    mapInstances.current = mapInstances.current.slice(0, 3);
    fullscreenButtonRefs.current = fullscreenButtonRefs.current.slice(0, 3);
    tileLayerRefs.current = tileLayerRefs.current.slice(0, 3);
    layerRefs.current = layerRefs.current.slice(0, 3);
    hasRenderedRef.current = new Array(3).fill(false);

    mapRefs.current.forEach((mapRef, index) => {
      if (!mapRef || mapInstances.current[index]) return;

      if (mapRef && mapRef.offsetParent !== null) {
        console.log(`Initializing map for index ${index}, container size: ${mapRef.offsetWidth}x${mapRef.offsetHeight}`);
        const map = L.map(mapRef, {
          minZoom: 3,
          maxZoom: 18,
          zoom: 3,
          fadeAnimation: false,
          zoomAnimation: false,
        });
        const tileLayer = L.tileLayer(getTileLayerUrl(), {
          attribution:
            theme.palette.mode === "dark"
              ? '&copy; <a href="https://carto.com/attributions">CARTO</a>'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          opacity: 0.1,
          errorTileUrl: "/images/fallback-tile.png",
          preload: 1,
        });
        tileLayer.addTo(map);
        tileLayer.on("load", () => {
          tileLayer.setOpacity(1);
          console.log(`Tile layer loaded for map ${index}`);
          map.invalidateSize();
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
                setIsFullscreen((prev) => {
                  const newState = [...prev];
                  newState[index] = !newState[index];
                  return newState;
                });
                setTimeout(() => mapInstances.current[index]?.invalidateSize(), 300);
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
              mapInstances.current[index].fitBounds(boundsRefs.current[index], {
                padding: [50, 50],
              });
              syncMaps(mapInstances.current[index], index);
            }
          },
          updateFullscreenButton: (button) => {
            fullscreenButtonRefs.current[index] = button;
            updateFullscreenButton(button, index);
          },
        });
        mapControl.addTo(map);

        map.on("moveend zoomend", () => {
          if (mapInstances.current[index])
            syncMaps(mapInstances.current[index], index);
        });

        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
          iconUrl: "/images/leaflet/marker-icon.png",
          shadowUrl: "/images/leaflet/marker-shadow.png",
        });

        setTimeout(() => mapInstances.current[index]?.invalidateSize(), 100);
      } else {
        console.warn(`Map ref not visible for index ${index}`);
      }
    });
    mapsInitializedRef.current = true;
  }, [tiffData.length, allDataReady, theme.palette.mode, isFullscreen, syncMaps]);

  // Update tile layers and GeoJSON styles when theme changes
  useEffect(() => {
    mapInstances.current.forEach((map, index) => {
      if (map && tileLayerRefs.current[index] && mapRefs.current[index]) {
        tileLayerRefs.current[index].setOpacity(0);
        setTimeout(() => {
          if (mapInstances.current[index] && tileLayerRefs.current[index]) {
            map.removeLayer(tileLayerRefs.current[index]);
            const newTileLayer = L.tileLayer(getTileLayerUrl(), {
              attribution:
                theme.palette.mode === "dark"
                  ? '&copy; <a href="https://carto.com/attributions">CARTO</a>'
                  : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              opacity: 0.1,
              errorTileUrl: "/images/fallback-tile.png",
              preload: 1,
            });
            newTileLayer.addTo(map);
            tileLayerRefs.current[index] = newTileLayer;
            newTileLayer.on("load", () => {
              newTileLayer.setOpacity(1);
              console.log(`New tile layer loaded for map ${index}`);
            });
            setTimeout(() => {
              if (mapInstances.current[index]) {
                mapInstances.current[index].invalidateSize();
              }
            }, 200);
            console.log(`Theme changed to ${theme.palette.mode} for map ${index}`);
          }
        }, 200);

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
      }
    });
  }, [theme.palette.mode]);

  // Retry logic for API calls
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
    setInternalMapLoading(true);
    setIsOptionLoading(true);
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

      // Skip mandatory fields check for commodity layer
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
        ["risk", "impact", "adaptation", "adaptation_croptab"].includes(
          payload.layer_type
        ) &&
        !payload.commodity_id
      ) {
        throw new Error(
          `Commodity ID is required for ${payload.layer_type} layer type`
        );
      }

      const tifPickerRes = await fetchWithRetry(
        `${apiUrl}/layers/tif_picker`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const tifPickerData = await tifPickerRes.json();
      console.log("tif_picker API response:", tifPickerData);

      if (!tifPickerData.success || !tifPickerData.data) {
        throw new Error(
          `Invalid response from tif_picker: success=${tifPickerData.success}, data=${tifPickerData.data ? "present" : "missing"}`
        );
      }

      const { data } = tifPickerData;
      const fileList = data.raster_files || data.files || [];
      if (!fileList.length) {
        throw new Error("No raster files available for the selected filters");
      }

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
        country_id:
          memoizedFilters.admin_level === "country"
            ? memoizedFilters.admin_level_id
            : null,
        state_id:
          memoizedFilters.admin_level === "state"
            ? memoizedFilters.admin_level_id
            : null,
        commodity_id: memoizedFilters.commodity_id,
        climate_scenario_id: memoizedFilters.climate_scenario_id,
        data_source_id: memoizedFilters.data_source_id,
        visualization_scale_id: memoizedFilters.visualization_scale_id,
      });

      let tiffPromises;
      if (payload.layer_type === "commodity") {
        // For commodity layer, use raster_files directly (up to 3)
        tiffPromises = fileList.slice(0, 3).map(async (file, index) => {
          if (!file.exists || !file.ramp) {
            console.warn(`File at index ${index} does not exist or has no ramp`);
            return null;
          }
          const geotiffRes = await fetchWithRetry(
            `${apiUrl}/layers/geotiff`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                admin_level: memoizedFilters.admin_level,
                admin_level_id: memoizedFilters.admin_level_id,
                source_file: file.source_file,
                color_ramp: file.ramp,
              }),
            }
          );
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
              layer_name: file.climate_scenario || `Map ${index + 1}`,
              layer_id: null,
              year: file.year || null,
              intensity_metric: null,
              climate_scenario_id: file.climate_scenario_id,
              change_metric: null,
            },
          };
        });
      } else {
        // Original logic for non-commodity layers
        const defaultFilters = [
          {
            climate_scenario_id: 1,
            year: null,
            intensity_metric_id: selectedIntensityMetric === "Intensity Frequency" ? 2 : 1,
            change_metric_id: 1,
            metric: selectedIntensityMetric,
            changeMetric: "Absolute",
            label: "Baseline",
          },
          {
            climate_scenario_id: selectedScenario,
            year: 2050,
            intensity_metric_id: selectedIntensityMetric === "Intensity Frequency" ? 2 : 1,
            change_metric_id: selectedChangeMetric === "Absolute" ? 1 : 2,
            metric: selectedIntensityMetric,
            changeMetric: selectedChangeMetric,
            label: "2050s",
          },
          {
            climate_scenario_id: selectedScenario,
            year: 2080,
            intensity_metric_id: selectedIntensityMetric === "Intensity Frequency" ? 2 : 1,
            change_metric_id: selectedChangeMetric === "Absolute" ? 1 : 2,
            metric: selectedIntensityMetric,
            changeMetric: selectedChangeMetric,
            label: "2080s",
          },
        ];

        const existingFiles = fileList.filter((file) =>
          defaultFilters.some(
            (filter) =>
              file.exists === true &&
              file.climate_scenario_id === filter.climate_scenario_id &&
              (filter.year ? file.year === filter.year : !file.year) &&
              file.intensity_metric_id === filter.intensity_metric_id &&
              file.change_metric_id === filter.change_metric_id &&
              file.ramp
          )
        );

        if (existingFiles.length < defaultFilters.length) {
          console.warn(
            `Not all default GeoTIFFs found. Found ${existingFiles.length} out of ${defaultFilters.length}`
          );
        }

        tiffPromises = defaultFilters.map(async (filter, index) => {
          const file = existingFiles.find(
            (f) =>
              f.climate_scenario_id === filter.climate_scenario_id &&
              (filter.year ? f.year === filter.year : !f.year) &&
              f.intensity_metric_id === filter.intensity_metric_id &&
              f.change_metric_id === filter.change_metric_id &&
              f.ramp
          );
          if (!file) {
            console.warn(
              `No existing file found for climate_scenario_id ${filter.climate_scenario_id}, intensity_metric_id ${filter.intensity_metric_id}, change_metric_id ${filter.change_metric_id}, year ${filter.year || "Baseline"}`
            );
            return null;
          }

          const geotiffRes = await fetchWithRetry(
            `${apiUrl}/layers/geotiff`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                admin_level: memoizedFilters.admin_level,
                admin_level_id: memoizedFilters.admin_level_id,
                source_file: file.source_file,
                color_ramp: file.ramp,
              }),
            }
          );
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
              layer_id: payload.layer_type === "risk" ? selectedRiskId : null,
              year: filter.year,
              intensity_metric: filter.metric,
              climate_scenario_id: filter.climate_scenario_id,
              change_metric: filter.changeMetric,
            },
          };
        });
      }

      const tiffResults = await Promise.all(tiffPromises);
      const validTiffResults = tiffResults.filter((result) => result !== null);
      georasterCache.current.clear();
      hasRenderedRef.current = new Array(validTiffResults.length).fill(false);
      setTiffData([...validTiffResults]);
      lastTiffDataRef.current = [...validTiffResults];
      setIsFullscreen(new Array(validTiffResults.length).fill(false));
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
      setAllDataReady(false);
    } finally {
      setInternalMapLoading(false);
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

    // Skip if filters are null or missing critical fields
    if (
      !memoizedFilters ||
      (!memoizedFilters.layer_type && memoizedFilters.layer_type !== "commodity") ||
      !memoizedFilters.analysis_scope_id ||
      !memoizedFilters.visualization_scale_id ||
      !memoizedFilters.data_source_id ||
      (memoizedFilters.layer_type !== "commodity" && !memoizedFilters.climate_scenario_id)
    ) {
      console.log("Skipping fetchTiffData: filters are not fully populated", memoizedFilters);
      setInternalMapLoading(false);
      setIsOptionLoading(false);
      return;
    }

    const debouncedFetch = _.debounce(fetchTiffData, 500);
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [
    memoizedFilters,
    selectedAdaptationTabId,
    selectedRiskId,
    selectedImpactId,
    selectedAdaptationId,
  ]);

  const updateGeoTiffLayer = useCallback(
    async (tiff, index) => {
      if (
        !mapInstances.current[index] ||
        !mapRefs.current[index] ||
        !tiff
      ) {
        console.warn(
          `Skipping updateGeoTiffLayer for index ${index} due to missing dependencies`,
          {
            mapInstance: !!mapInstances.current[index],
            mapRef: !!mapRefs.current[index],
            tiff,
          }
        );
        return;
      }

      const map = mapInstances.current[index];

      // Remove existing GeoTIFF layer
      if (layerRefs.current[index]) {
        const geotiffLayer = layerRefs.current[index].find(
          (layer) => layer instanceof GeoRasterLayer
        );
        if (geotiffLayer && map.hasLayer(geotiffLayer)) {
          try {
            map.removeLayer(geotiffLayer);
            console.log(`Removed existing GeoTIFF layer for map ${index}`);
          } catch (e) {
            console.warn(`Failed to remove GeoTIFF layer at index ${index}:`, e);
          }
        }
        layerRefs.current[index] = layerRefs.current[index].filter(
          (layer) => !(layer instanceof GeoRasterLayer)
        );
      }

      const { arrayBuffer, metadata } = tiff;
      console.log(
        `Processing GeoTIFF for index ${index}, metadata:`,
        metadata,
        `buffer size: ${arrayBuffer.byteLength}`
      );

      const cacheKey = `${metadata.source_file}-${index}`;
      let georaster;
      if (georasterCache.current.has(cacheKey)) {
        console.log(`Using cached GeoRaster for index ${index}`);
        georaster = georasterCache.current.get(cacheKey);
      } else {
        const clonedBuffer = arrayBuffer.slice(0);
        try {
          georaster = await parseGeoraster(clonedBuffer);
          console.log(`Map ${index} - GeoRaster parsed successfully`, {
            bands: georaster.bands,
            mins: georaster.mins,
            maxs: georaster.maxs,
            height: georaster.height,
            width: georaster.width,
            projection: georaster.projection,
            noDataValue: georaster.noDataValue,
          });

          if (!georaster.height || !georaster.width) {
            console.error(`Invalid GeoRaster dimensions for map ${index}`);
            throw new Error(`Invalid GeoTIFF data for map ${index}`);
          }
          georasterCache.current.set(cacheKey, georaster);
        } catch (err) {
          console.error(`GeoRaster parsing error for index ${index}:`, err);
          throw err;
        }
      }

      const geotiffLayer = new GeoRasterLayer({
        georaster,
        opacity: 0.8,
        pixelValuesToColorFn: (values) => {
          if (!values || values.length === 0) {
            console.warn(`No pixel values for map ${index}`);
            return "rgba(255, 255, 255, 0)";
          }
          if (values.length >= 4) {
            const [r, g, b, a] = values;
            const alpha = a !== undefined ? a / 255 : 1;
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }
          const value = values[0];
          if (!metadata.color_ramp) {
            console.warn(`No color ramp for map ${index}`);
            return "rgba(255, 255, 255, 0)";
          }
          const min = georaster.mins[0] || 0;
          const max = georaster.maxs[0] || 1;
          if (max === min || value < min || value > max) {
            console.warn(
              `Invalid pixel value ${value} for map ${index}, min: ${min}, max: ${max}`
            );
            return "rgba(255, 255, 255, 0)";
          }
          const colorIndex = Math.min(
            Math.max(
              Math.floor(
                ((value - min) / (max - min)) * (metadata.color_ramp.length - 1)
              ),
              0
            ),
            metadata.color_ramp.length - 1
          );
          return `rgba(${parseInt(
            metadata.color_ramp[colorIndex].slice(1, 3),
            16
          )}, ${parseInt(
            metadata.color_ramp[colorIndex].slice(3, 5),
            16
          )}, ${parseInt(
            metadata.color_ramp[colorIndex].slice(5, 7),
            16
          )}, 0.8)`;
        },
        resolution: 256,
        pane: "overlayPane",
      });

      if (mapInstances.current[index] && mapRefs.current[index]) {
        try {
          geotiffLayer.addTo(map);
          layerRefs.current[index].push(geotiffLayer);
          map.invalidateSize();
          console.log(`GeoTIFF layer added to map ${index}`);

          geotiffLayer.on("click", async (e) => {
            const { lat, lng } = e.latlng;
            try {
              const value = await georaster.getValues([[lng, lat]])[0];
              L.popup()
                .setLatLng(e.latlng)
                .setContent(
                  `Value: ${value !== undefined ? value.toFixed(2) : "N/A"} at (${lat.toFixed(
                    4
                  )}, ${lng.toFixed(4)})`
                )
                .openOn(map);
            } catch (err) {
              console.error("Error fetching GeoTIFF value:", err);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to retrieve raster value.",
              });
            }
          });

          geotiffLayer.on("load", () => {
            console.log(`GeoTIFF layer ${index} loaded successfully`);
            map.invalidateSize();
          });
          geotiffLayer.on("error", (err) => {
            console.error(`GeoTIFF layer error for map ${index}:`, err);
          });
        } catch (err) {
          console.error(`Failed to add GeoTIFF layer to map ${index}:`, err);
          throw err;
        }
      } else {
        console.warn(`Map instance or reference missing for index ${index}`);
      }

      setTiffData((prev) => {
        const newTiffData = [...prev];
        newTiffData[index] = tiff;
        console.log(`tiffData updated for index ${index}:`, newTiffData[index]);
        return newTiffData;
      });
      lastTiffDataRef.current[index] = tiff;
      hasRenderedRef.current[index] = true;
    },
    []
  );

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
        console.warn(
          `Skipping renderMapLayers for index ${index} due to missing dependencies`,
          {
            mapInstance: !!mapInstances.current[index],
            mapRef: !!mapRefs.current[index],
            geoJson,
            bbox,
            tiff,
            allDataReady,
          }
        );
        return;
      }

      if (hasRenderedRef.current[index] && _.isEqual(tiff, lastTiffDataRef.current[index])) {
        console.log(`Skipping renderMapLayers for index ${index}: no data change`);
        return;
      }

      const map = mapInstances.current[index];

      // Initialize GeoJSON and bounds only if not already set
      if (!layerRefs.current[index] || !layerRefs.current[index].find(layer => layer instanceof L.GeoJSON)) {
        const bounds = [
          [bbox[1], bbox[0]],
          [bbox[3], bbox[2]],
        ];
        boundsRefs.current[index] = bounds;
        map.fitBounds(bounds, { padding: [50, 50] });
        map.invalidateSize();
        syncMaps(map, index);

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
            const tooltipText =
              feature.properties[tooltipNameIndex[memoizedFilters.admin_level]];
            if (tooltipText) {
              layer.bindTooltip(tooltipText, {
                permanent: false,
                direction: "auto",
                className: "map-tooltip",
              });
            }
          },
        });
        geojsonLayer.addTo(map);
        layerRefs.current[index] = layerRefs.current[index] || [];
        layerRefs.current[index].push(geojsonLayer);
      }

      // Update GeoTIFF layer
      updateGeoTiffLayer(tiff, index).catch((err) => {
        console.error(`Error updating GeoTIFF layer for index ${index}:`, err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to update GeoTIFF layer for map ${index}: ${err.message}`,
        });
      });
    },
    [theme.palette.mode, allDataReady, syncMaps, memoizedFilters, updateGeoTiffLayer]
  );

  // Memoize tiffData to prevent unnecessary MapLegend re-renders
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
      if (
        memoizedTiffData.length &&
        memoizedFilters?.geojson &&
        memoizedFilters?.bbox &&
        allDataReady
      ) {
        console.log(
          `Rendering ${memoizedTiffData.length} maps with tiffData`,
          memoizedTiffData
        );
        initializeMaps();
        memoizedTiffData.forEach((tiff, index) => {
          if (mapRefs.current[index] && mapInstances.current[index]) {
            console.log(`Triggering renderMapLayers for index ${index}`);
            renderMapLayers(
              memoizedFilters.geojson,
              memoizedFilters.bbox,
              tiff,
              index
            );
          } else {
            console.warn(`Map ref or instance missing for index ${index}`);
          }
        });
      }
    }, 300),
    [
      memoizedTiffData,
      memoizedFilters.geojson,
      memoizedFilters.bbox,
      allDataReady,
      initializeMaps,
      renderMapLayers,
    ]
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
        climate_scenario_id: tiffMetadata.year
          ? breadcrumbData?.climate_scenario_id
          : 1,
        year: tiffMetadata.year || null,
        data_source_id: breadcrumbData?.data_source_id || null,
        visualization_scale_id: breadcrumbData?.visualization_scale_id || null,
        layer_id: tiffMetadata.layer_id || selectedRiskId,
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

      const mapAndLegendContainer = mapContainer.closest(
        ".map-and-legend-container"
      );
      if (!mapAndLegendContainer) {
        throw new Error("Parent container for map and legend not found");
      }

      console.log(
        `Map and legend container dimensions: width=${mapAndLegendContainer.offsetWidth}, height=${mapAndLegendContainer.offsetHeight}`
      );

      const legendElement = mapAndLegendContainer.querySelector(".css-1annchz");
      console.log(
        `Legend element ${legendElement ? "found" : "not found"} in container`
      );

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
    const intensityMetricId = value === "Intensity Frequency" ? 2 : 1;
    const indicesToUpdate = [0, 1, 2];
    let pendingUpdates = indicesToUpdate.length;

    indicesToUpdate.forEach((index) => {
      const year = index === 0 ? null : index === 1 ? 2050 : 2080;
      const climateScenarioId = index === 0 ? 1 : selectedScenario;
      const changeMetricId = index === 0 ? 1 : selectedChangeMetric === "Absolute" ? 1 : 2;
      const file = fileList.find(
        (f) =>
          f.climate_scenario_id === climateScenarioId &&
          (year ? f.year === year : !f.year) &&
          f.intensity_metric_id === intensityMetricId &&
          f.change_metric_id === changeMetricId &&
          f.ramp
      );
      if (file) {
        fetchGeoTiff(file, index, value, index === 0 ? "Absolute" : selectedChangeMetric, () => {
          pendingUpdates--;
          if (pendingUpdates === 0) {
            setIsOptionLoading(false);
          }
        });
      } else {
        console.warn(
          `No file found for intensity metric change: index ${index}, metric ${value}, scenario ${climateScenarioId}, year ${year || "Baseline"}`
        );
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
      const intensityMetricId = selectedIntensityMetric === "Intensity Frequency" ? 2 : 1;
      const changeMetricId = selectedChangeMetric === "Absolute" ? 1 : 2;
      const file = fileList.find(
        (f) =>
          f.climate_scenario_id === value &&
          f.year === year &&
          f.intensity_metric_id === intensityMetricId &&
          f.change_metric_id === changeMetricId &&
          f.ramp
      );
      if (file) {
        fetchGeoTiff(file, index, selectedIntensityMetric, selectedChangeMetric, () => {
          pendingUpdates--;
          if (pendingUpdates === 0) {
            setIsOptionLoading(false);
          }
        });
      } else {
        console.warn(
          `No file found for scenario change: index ${index}, scenario ${value}, year ${year}`
        );
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
      const intensityMetricId = selectedIntensityMetric === "Intensity Frequency" ? 2 : 1;
      const changeMetricId = value === "Absolute" ? 1 : 2;
      const file = fileList.find(
        (f) =>
          f.climate_scenario_id === selectedScenario &&
          f.year === year &&
          f.intensity_metric_id === intensityMetricId &&
          f.change_metric_id === changeMetricId &&
          f.ramp
      );
      if (file) {
        fetchGeoTiff(file, index, selectedIntensityMetric, value, () => {
          pendingUpdates--;
          if (pendingUpdates === 0) {
            setIsOptionLoading(false);
          }
        });
      } else {
        console.warn(
          `No file found for change metric: index ${index}, change metric ${value}, year ${year}`
        );
        pendingUpdates--;
        if (pendingUpdates === 0) {
          setIsOptionLoading(false);
        }
      }
    });
  };

  const fetchGeoTiff = async (file, index, metric, changeMetric, onComplete) => {
    try {
      const geotiffRes = await fetchWithRetry(
        `${apiUrl}/layers/geotiff`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_level: memoizedFilters.admin_level,
            admin_level_id: memoizedFilters.admin_level_id,
            source_file: file.source_file,
            color_ramp: file.ramp,
          }),
        }
      );
      const arrayBuffer = await geotiffRes.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error(`Empty or invalid arrayBuffer for ${file.source_file}`);
      }
      const clonedBuffer = arrayBuffer.slice(0);

      const newTiff = {
        arrayBuffer: clonedBuffer,
        metadata: {
          source_file: file.source_file,
          color_ramp: file.ramp,
          layer_name: `${index === 0 ? "Baseline" : index === 1 ? "2050s" : "2080s"}`,
          layer_id: memoizedFilters.layer_type === "risk" ? selectedRiskId : null,
          year: index === 0 ? null : index === 1 ? 2050 : 2080,
          intensity_metric: metric,
          climate_scenario_id: file.climate_scenario_id,
          change_metric: changeMetric,
        },
      };

      georasterCache.current.delete(`${file.source_file}-${index}`);
      hasRenderedRef.current[index] = false;

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
      onComplete();
    }
  };

  // Fix MUI Popover aria-hidden issue
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

  const getGridLayout = (tiffCount) => {
    return { xs: tiffCount > 1 ? 4 : 12, height: "100%" };
  };

  const gridLayout = getGridLayout(tiffData.length);

  const handleAdaptationTabChange = (tabId) => {
    setSelectedAdaptationTabId(tabId);
  };

  // Toggle AnalyticsPage visibility
  const toggleAnalytics = () => {
    setShowAnalytics((prev) => !prev);
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
          justifyContent: "space-between", // Align breadcrumb and button
        }}
        className="breadTextFont"
      >
        <Box sx={{ flexGrow: 1 }}>
          {breadcrumbData ? (
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
          ) : (
            <Typography color="text.secondary" className="breadText">
              Loading breadcrumb...
            </Typography>
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
          <Box sx={{ p: "8px 16px", display: "flex", gap: 1, flexWrap: "wrap" }}>
            {adaptationTabs.map((tab) => (
              <Button
                key={tab.tab_id}
                variant={
                  +selectedAdaptationTabId === +tab.tab_id ? "contained" : "outlined"
                }
                onClick={() => handleAdaptationTabChange(tab.tab_id)}
                disabled={!tab.status || internalMapLoading}
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  padding: "4px 12px",
                  borderRadius: "16px",
                }}
              >
                {tab.tab_name}
              </Button>
            ))}
          </Box>
        )}
      <Box
        sx={{
          position: "relative", // Positioning context for AnalyticsPage
          height:
            +memoizedFilters?.commodity_type_id === 1 &&
              (memoizedFilters?.layer_type === "adaptation" ||
                memoizedFilters?.layer_type === "adaptation_croptab")
              ? "calc(100% - 80px)"
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
          {tiffData.length > 0 ? (
            tiffData.map((tiff, index) => (
              <Grid
                item
                xs={gridLayout.xs}
                key={`map-${index}`}
                sx={{
                  height: gridLayout.height,
                  position: "relative",
                  padding: "10px 0 0 16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "#C1E1C1",
                    height: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography>{tiff.metadata.layer_name}</Typography>
                  {memoizedFilters.layer_type !== "commodity" && index === 0 && (
                    <Select
                      value={selectedIntensityMetric}
                      onChange={(e) => handleIntensityMetricChange(e.target.value)}
                      sx={{ minWidth: "120px", height: "24px" }}
                      disabled={isOptionLoading}
                    >
                      <MenuItem value="Intensity">Intensity</MenuItem>
                      <MenuItem value="Intensity Frequency">Intensity Frequency</MenuItem>
                    </Select>
                  )}
                  {memoizedFilters.layer_type !== "commodity" && index !== 0 && (
                    <>
                      <Select
                        value={selectedScenario}
                        onChange={(e) => handleScenarioChange(e.target.value)}
                        sx={{ minWidth: "120px", height: "24px" }}
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
                      <Select
                        value={selectedChangeMetric}
                        onChange={(e) => handleChangeMetricChange(e.target.value)}
                        sx={{ minWidth: "120px", height: "24px" }}
                        disabled={isOptionLoading}
                      >
                        <MenuItem value="Absolute">Absolute</MenuItem>
                        <MenuItem value="Delta">Delta</MenuItem>
                      </Select>
                    </>
                  )}
                </Box>
                <Box
                  className="map-and-legend-container"
                  sx={{
                    height:
                      +memoizedFilters?.commodity_type_id === 1 &&
                        (memoizedFilters?.layer_type === "adaptation" ||
                          memoizedFilters?.layer_type === "adaptation_croptab")
                        ? "calc(100% - 80px)"
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
                      if (el && !mapRefs.current[index]) {
                        mapRefs.current[index] = el;
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
                  {internalMapLoading && (
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
                  <DownloadDropdown
                    layerName={tiff.metadata.layer_name}
                    layerType={memoizedFilters?.layer_type || "risk"}
                    mapIndex={index}
                    onDownloadGeoTIFF={() =>
                      handleDownloadGeoTIFF(
                        tiff.arrayBuffer,
                        `${tiff.metadata.layer_name}.tif`
                      )
                    }
                    onDownloadTable={() =>
                      handleDownloadTable(tiff.metadata.layer_name, tiff.metadata)
                    }
                    onDownloadImage={() =>
                      handleDownloadImage(tiff.metadata.layer_name, index)
                    }
                  />
                  <MapLegend
                    tiff={tiff}
                    breadcrumbData={breadcrumbData}
                    layerType={memoizedFilters?.layer_type || "risk"}
                    apiUrl={apiUrl}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                position: "absolute",
                top:
                  +memoizedFilters?.commodity_type_id === 1 &&
                    (memoizedFilters?.layer_type === "adaptation" ||
                      memoizedFilters?.layer_type === "adaptation_croptab")
                    ? 80
                    : 30,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {internalMapLoading ? (
                <CircularProgress />
              ) : (
                <Typography>No data available for the selected filters.</Typography>
              )}
            </Box>
          )}
        </Grid>
        {/* AnalyticsPage: Always mounted, toggled with CSS */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.95)", // Semi-transparent white
            zIndex: 1500, // Above map (zIndex: 1000) and loading overlay (zIndex: 1200)
            padding: "16px 16px 0 16px",
            height: "450px",
            width: "600px",
            display: showAnalytics && !internalMapLoading && breadcrumbData ? "block" : "none", // Toggle visibility
          }}
        >
          <AnalyticsPage filters={memoizedFilters} />
        </Box>
      </Box>
    </Box>
  );
}

export default MapViewer;