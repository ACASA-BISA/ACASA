import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography, Box, FormControl, Select, MenuItem, CircularProgress } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import Swal from "sweetalert2";
import MapLegend from "./MapLegend";
import "./Test.css";
import { debounce } from "lodash";

// Leaflet control for Download (top-left, below zoom)
L.Control.DownloadControl = L.Control.extend({
    options: {
        position: "topleft",
        onDownload: () => { },
    },
    onAdd: function (map) {
        const container = L.DomUtil.create(
            "div",
            "leaflet-bar leaflet-control leaflet-control-custom"
        );
        container.style.backgroundColor = "#fff";
        container.style.border = "2px solid rgba(0,0,0,0.2)";
        container.style.borderRadius = "4px";
        container.style.marginTop = "10px"; // Position below zoom controls

        const downloadButton = L.DomUtil.create(
            "a",
            "leaflet-control-button",
            container
        );
        downloadButton.innerHTML = "↓";
        downloadButton.href = "#";
        downloadButton.title = "Download GeoTIFF";
        downloadButton.style.fontSize = "16px";
        downloadButton.style.display = "block";
        downloadButton.style.padding = "0.5px";
        downloadButton.style.textAlign = "center";
        downloadButton.style.cursor = "pointer";
        L.DomEvent.on(downloadButton, "click", (e) => {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this.options.onDownload();
        });

        return container;
    },
    onRemove: function () { },
});

L.control.downloadControl = function (opts) {
    return new L.Control.DownloadControl(opts);
};

// Leaflet control for Fullscreen and Fit to Extent (top-right)
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
        container.style.backgroundColor = "#fff";
        container.style.border = "2px solid rgba(0,0,0,0.2)";
        container.style.borderRadius = "4px";

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
        fullscreenButton.style.display = "block";
        fullscreenButton.style.padding = "2px";
        fullscreenButton.style.textAlign = "center";
        fullscreenButton.style.cursor = "pointer";
        fullscreenButton.style.borderBottom = "1px solid rgba(0,0,0,0.2)";
        L.DomEvent.on(fullscreenButton, "click", (e) => {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this.options.onFullscreen(fullscreenButton);
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
        fitExtentButton.style.display = "block";
        fitExtentButton.style.padding = "2px";
        fitExtentButton.style.textAlign = "center";
        fitExtentButton.style.cursor = "pointer";
        L.DomEvent.on(fitExtentButton, "click", (e) => {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this.options.onFitExtent();
        });

        return container;
    },
    onRemove: function () { },
});

L.control.mapControls = function (opts) {
    return new L.Control.MapControls(opts);
};

const DataGlance = () => {
    const [countries, setCountries] = useState([]);
    const [commodities, setCommodities] = useState([]);
    const [climateScenarios, setClimateScenarios] = useState([]);
    const [visualizationScales, setVisualizationScales] = useState([]);
    const [geojsonData, setGeojsonData] = useState(null);
    const [selectedCountryId, setSelectedCountryId] = useState(0);
    const [selectedCommodityId, setSelectedCommodityId] = useState("");
    const [selectedScenarioId, setSelectedScenarioId] = useState("");
    const [selectedVisualizationScaleId, setSelectedVisualizationScaleId] = useState("");
    const [selectedIntensityMetricId, setSelectedIntensityMetricId] = useState(2);
    const [selectedChangeMetricId, setSelectedChangeMetricId] = useState(1);
    const [isOptionLoading, setIsOptionLoading] = useState(false);
    const [showCountrySelect, setShowCountrySelect] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hazardData, setHazardData] = useState(null);
    const [tiffData, setTiffData] = useState([]);
    const [allDataReady, setAllDataReady] = useState(false);
    const [renderedMaps, setRenderedMaps] = useState(new Array(8).fill(false));
    const [isFullscreen, setIsFullscreen] = useState(new Array(8).fill(false));

    const mapRefs = useRef(new Array(8).fill(null));
    const mapInstances = useRef(new Array(8).fill(null));
    const layerRefs = useRef(new Array(8).fill([]));
    const tileLayerRefs = useRef(new Array(8).fill(null));
    const geojsonLayerRefs = useRef(new Array(8).fill(null));
    const mapControlRefs = useRef(new Array(8).fill(null));
    const downloadControlRefs = useRef(new Array(8).fill(null));
    const georasterCache = useRef(new Map());
    const isFetchingRef = useRef(false);
    const mapWidths = useRef(new Array(8).fill(300));
    const hasInitializedRef = useRef(false);
    const lastFetchKeyRef = useRef(null);
    const geotiffPromiseCache = useRef(new Map());
    const controlsInitialized = useRef(new Array(8).fill(false)); // Track control initialization

    const apiRand = Math.random().toString(36).substring(2, 15);
    const apiUrl = process.env.REACT_APP_API_URL || `http://52.52.161.42/acasa_api?rand=${apiRand}`;
    const { country } = useParams();

    const breadcrumbData = useMemo(
        () => ({
            commodity: commodities.find((c) => c.commodity_id === selectedCommodityId)?.commodity || null,
            commodity_id: selectedCommodityId || null,
            country_id: selectedCountryId || null,
            state_id: null,
            climate_scenario_id: selectedScenarioId || null,
            visualization_scale_id: selectedVisualizationScaleId || null,
            intensity_metric_id: selectedIntensityMetricId || null,
            change_metric_id: selectedChangeMetricId || null,
            geojson: geojsonData?.geojson || null,
            bbox: geojsonData?.bbox || null,
            region: geojsonData?.region || null,
        }),
        [commodities, selectedCommodityId, selectedCountryId, selectedScenarioId, selectedVisualizationScaleId, selectedIntensityMetricId, selectedChangeMetricId, geojsonData]
    );

    const memoizedHazardData = useMemo(() => hazardData, [hazardData]);
    const memoizedGeojsonData = useMemo(() => geojsonData, [geojsonData]);

    const fetchTiffs = useCallback(
        debounce(async (hazardData, geojsonData, countryId, commodityId, selectRasterFile, fetchGeoTiff) => {
            if (isFetchingRef.current) {
                console.log("Skipping fetchTiffs: fetch already in progress");
                return;
            }

            if (!hazardData || !hazardData.raster_grids || !geojsonData) {
                console.log("Skipping fetchTiffs: dependencies not ready", {
                    hasHazardData: !!hazardData,
                    hasRasterGrids: !!hazardData?.raster_grids,
                    hasGeojson: !!geojsonData,
                });
                return;
            }

            const fetchKey = `${countryId}-${commodityId}-${selectedScenarioId}-${selectedVisualizationScaleId}-${selectedIntensityMetricId}-${selectedChangeMetricId}-${JSON.stringify(
                hazardData.raster_grids.map((g) => g.grid_sequence)
            )}`;

            if (lastFetchKeyRef.current === fetchKey && tiffData.length > 0) {
                console.log("Skipping fetchTiffs: data already fetched for this configuration", { fetchKey });
                return;
            }

            isFetchingRef.current = true;
            setIsLoading(true);
            try {
                const sortedGrids = [...hazardData.raster_grids].sort(
                    (a, b) => (a.grid_sequence || 0) - (b.grid_sequence || 0)
                );
                console.log("Sorted raster grids:", sortedGrids);

                const fetchedSourceFiles = new Set();
                const tiffPromises = sortedGrids.slice(0, 7).map(async (grid) => {
                    const file = selectRasterFile(grid.raster_files);
                    if (!file || !file.exists) {
                        console.warn(`No matching raster file for hazard ${grid.hazard_title || grid.grid_sequence}`);
                        return null;
                    }
                    if (fetchedSourceFiles.has(file.source_file)) {
                        console.log(`Skipping duplicate fetch for source_file: ${file.source_file}`);
                        return null;
                    }
                    fetchedSourceFiles.add(file.source_file);
                    return await fetchGeoTiff(
                        { ...file, hazard_title: grid.hazard_title },
                        grid.grid_sequence,
                        grid.layer_id
                    );
                });

                const tiffResults = await Promise.all(tiffPromises);
                const validTiffResults = tiffResults.filter((result) => result !== null);
                console.log("Valid TIFF results:", validTiffResults);

                if (validTiffResults.length === 0) {
                    console.warn("No valid GeoTIFFs fetched");
                    setTiffData([]);
                    setAllDataReady(true);
                    setRenderedMaps(new Array(8).fill(false));
                    lastFetchKeyRef.current = fetchKey;
                    return;
                }

                georasterCache.current.clear();
                setRenderedMaps(new Array(8).fill(false));
                setTiffData(validTiffResults);
                setAllDataReady(true);
                lastFetchKeyRef.current = fetchKey;
            } catch (err) {
                console.error("Error fetching TIFF data:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || "Failed to load map data.",
                });
                setTiffData([]);
                setAllDataReady(true);
                setRenderedMaps(new Array(8).fill(false));
                lastFetchKeyRef.current = fetchKey;
            } finally {
                setIsLoading(false);
                isFetchingRef.current = false;
                geotiffPromiseCache.current.clear();
            }
        }, 500),
        [tiffData, selectedScenarioId, selectedVisualizationScaleId, selectedIntensityMetricId, selectedChangeMetricId]
    );

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const index = mapRefs.current.indexOf(entry.target);
                if (index !== -1) {
                    mapWidths.current[index] = entry.contentRect.width;
                    console.log(`Map ${index} width updated: ${mapWidths.current[index]}px`);
                    if (mapInstances.current[index]) {
                        mapInstances.current[index].invalidateSize();
                    }
                }
            });
        });

        mapRefs.current.forEach((ref, index) => {
            if (ref) {
                observer.observe(ref);
                mapWidths.current[index] = ref.offsetWidth || 300;
            }
        });

        return () => observer.disconnect();
    }, []);

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

    const fetchData = useCallback(
        async (endpoint, params = "") => {
            setIsOptionLoading(true);
            try {
                const response = await fetchWithRetry(`${apiUrl}/${endpoint}${params}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const { success, data } = await response.json();
                if (!success) throw new Error(`API error: ${endpoint}`);
                console.log(`Fetched ${endpoint}:`, data);
                return data || [];
            } catch (err) {
                console.error(`Error fetching ${endpoint}:`, err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || `Error loading ${endpoint}`,
                });
                return [];
            } finally {
                setIsOptionLoading(false);
            }
        },
        [apiUrl]
    );

    const fetchGeojson = useCallback(
        async (admin_level, admin_level_id) => {
            if (isFetchingRef.current) {
                console.log("Skipping fetchGeojson: already in progress");
                return;
            }
            isFetchingRef.current = true;
            setIsLoading(true);
            try {
                const geojsonRes = await fetchWithRetry(`${apiUrl}/layers/geojson`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        admin_level,
                        admin_level_id,
                    }),
                });
                if (!geojsonRes.ok) throw new Error(`GeoJSON error! Status: ${geojsonRes.status}`);
                const geojsonData = await geojsonRes.json();
                if (!geojsonData.success || !geojsonData.data) {
                    throw new Error("No valid GeoJSON data returned");
                }
                console.log(`Fetched GeoJSON for ${admin_level}${admin_level_id ? `:${admin_level_id}` : ""}:`, geojsonData.data);
                setGeojsonData(geojsonData.data);
            } catch (err) {
                console.error("Error fetching GeoJSON:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || "Failed to load GeoJSON data.",
                });
                setGeojsonData(null);
            } finally {
                setIsLoading(false);
                isFetchingRef.current = false;
            }
        },
        [apiUrl]
    );

    const fetchHazardData = useCallback(
        async (commodityId) => {
            if (!commodityId) {
                console.log("Skipping fetchHazardData: missing commodity", { commodityId });
                return;
            }
            console.log("Starting fetchHazardData");
            isFetchingRef.current = true;
            setIsLoading(true);
            try {
                const admin_level = selectedCountryId !== 0 ? "country" : "total";
                const admin_level_id = selectedCountryId || null;
                console.log("Fetching hazard data with:", { commodity_id: commodityId, admin_level, admin_level_id });
                const response = await fetchWithRetry(`${apiUrl}/layers/hazards_glance`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        commodity_id: commodityId,
                        admin_level,
                        admin_level_id,
                    }),
                });
                const { success, data } = await response.json();
                if (!success) throw new Error("API error: /layers/hazards_glance");
                console.log("Hazard data fetched:", data);
                setHazardData(data);
            } catch (err) {
                console.error("Error fetching hazard data:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || "Error loading hazard data",
                });
                setHazardData(null);
            } finally {
                setIsLoading(false);
                isFetchingRef.current = false;
            }
        },
        [apiUrl, selectedCountryId]
    );

    const selectRasterFile = useCallback(
        (rasterFiles) => {
            console.log("Selecting raster file with filters:", {
                selectedScenarioId,
                selectedIntensityMetricId,
                selectedChangeMetricId,
                selectedVisualizationScaleId,
                availableFiles: rasterFiles,
            });
            const scenario = climateScenarios.find((s) => s.scenario_id === parseInt(selectedScenarioId));
            const scenarioName = scenario?.scenario || "";
            const expectedYear = scenarioName.includes("2050") ? 2050 : scenarioName.includes("2080") ? 2080 : null;

            const matchedFile = rasterFiles.find((file) => {
                const matchesScenario =
                    !selectedScenarioId ||
                    (file.climate_scenario_id === parseInt(selectedScenarioId) &&
                        (!file.year || file.year === expectedYear));
                const matchesIntensity = !selectedIntensityMetricId || file.intensity_metric_id === parseInt(selectedIntensityMetricId || 2);
                const matchesChange = !selectedChangeMetricId || file.change_metric_id === parseInt(selectedChangeMetricId || 1);
                const matchesScale = !selectedVisualizationScaleId || file.visualization_scale_id === parseInt(selectedVisualizationScaleId || 1);
                return matchesScenario && matchesIntensity && matchesChange && matchesScale;
            });

            if (!matchedFile && rasterFiles.length > 0) {
                console.warn("No matching raster file found, falling back to first available file");
                return rasterFiles[0];
            }
            console.log("Selected raster file:", matchedFile);
            return matchedFile;
        },
        [selectedScenarioId, selectedIntensityMetricId, selectedChangeMetricId, selectedVisualizationScaleId, climateScenarios]
    );

    const fetchGeoTiff = useCallback(
        async (file, gridSequence, layerId) => {
            const cacheKey = `${file.source_file}-${selectedCountryId || "total"}-${gridSequence}`;
            if (geotiffPromiseCache.current.has(cacheKey)) {
                console.log(`Returning cached GeoTIFF promise for ${cacheKey}`);
                return geotiffPromiseCache.current.get(cacheKey);
            }

            console.log(`Fetching GeoTIFF for ${file.hazard_title || "hazard"} with grid_sequence: ${gridSequence}`);
            const admin_level = selectedCountryId !== 0 ? "country" : "total";
            const admin_level_id = selectedCountryId || null;
            const promise = fetchWithRetry(`${apiUrl}/layers/geotiff`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    admin_level,
                    admin_level_id,
                    source_file: file.source_file,
                    color_ramp: file.ramp,
                }),
            })
                .then(async (geotiffRes) => {
                    if (!geotiffRes.ok) {
                        throw new Error(`Failed to fetch GeoTIFF: ${geotiffRes.status}`);
                    }
                    const arrayBuffer = await geotiffRes.arrayBuffer();
                    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                        throw new Error(`Empty or invalid arrayBuffer for ${file.source_file}`);
                    }
                    console.log(`GeoTIFF fetched successfully for ${file.hazard_title || "hazard"}, grid_sequence: ${gridSequence}, size: ${arrayBuffer.byteLength} bytes`);
                    const modifiedColorRamp = file.ramp.map((color) =>
                        color.toLowerCase() === "#00ff00" ? "#7FFF00" : color
                    );
                    return {
                        arrayBuffer,
                        metadata: {
                            source_file: file.source_file,
                            color_ramp: modifiedColorRamp,
                            layer_name: file.hazard_title || `Hazard ${gridSequence}`,
                            grid_sequence: gridSequence,
                            layer_id: layerId,
                            year: file.year || null,
                            climate_scenario_id: file.climate_scenario_id || null,
                        },
                    };
                })
                .catch((err) => {
                    console.error(`Error fetching GeoTIFF for ${file.hazard_title || "hazard"}:`, err);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: `Failed to load GeoTIFF for ${file.hazard_title || "hazard"}`,
                    });
                    geotiffPromiseCache.current.delete(cacheKey);
                    return null;
                });

            geotiffPromiseCache.current.set(cacheKey, promise);
            return promise;
        },
        [apiUrl, selectedCountryId]
    );

    const handleDownloadGeoTIFF = useCallback((arrayBuffer, filename) => {
        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
            console.error("Cannot download GeoTIFF: arrayBuffer is empty or invalid", { filename, byteLength: arrayBuffer?.byteLength });
            Swal.fire({
                icon: "error",
                title: "Download Failed",
                text: "No valid GeoTIFF data available to download.",
            });
            return;
        }

        try {
            console.log(`Preparing to download GeoTIFF: ${filename}, size: ${arrayBuffer.byteLength} bytes`);
            const blob = new Blob([arrayBuffer], { type: "image/tiff" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename || "geotiff.tif";
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
    }, []);

    const cleanupMaps = useCallback(() => {
        console.log("Cleaning up maps");
        mapInstances.current.forEach((map, index) => {
            if (map) {
                // Remove all layers
                layerRefs.current[index].forEach((layer) => {
                    if (layer && map.hasLayer(layer)) {
                        map.removeLayer(layer);
                    }
                });
                // Remove tile layer
                if (tileLayerRefs.current[index] && map.hasLayer(tileLayerRefs.current[index])) {
                    map.removeLayer(tileLayerRefs.current[index]);
                }
                // Remove GeoJSON layer
                if (geojsonLayerRefs.current[index] && map.hasLayer(geojsonLayerRefs.current[index])) {
                    map.removeLayer(geojsonLayerRefs.current[index]);
                }
                // Remove map controls
                if (mapControlRefs.current[index]) {
                    map.removeControl(mapControlRefs.current[index]);
                }
                // Remove download control
                if (downloadControlRefs.current[index]) {
                    map.removeControl(downloadControlRefs.current[index]);
                }
                // Remove map event listeners and map itself
                map.off();
                map.remove();
                // Reset references
                mapInstances.current[index] = null;
                layerRefs.current[index] = [];
                tileLayerRefs.current[index] = null;
                geojsonLayerRefs.current[index] = null;
                mapControlRefs.current[index] = null;
                downloadControlRefs.current[index] = null;
                controlsInitialized.current[index] = false;
            }
        });
        georasterCache.current.clear();
        setRenderedMaps(new Array(8).fill(false));
        setIsFullscreen(new Array(8).fill(false));
        setTiffData([]);
        setAllDataReady(false);
        geotiffPromiseCache.current.clear();
    }, []);

    const updateFullscreenButton = useCallback((button, isFull) => {
        if (button) {
            button.innerHTML = isFull ? "⤡" : "⤢";
            button.title = isFull ? "Exit Fullscreen" : "Enter Fullscreen";
        }
    }, []);

    useEffect(() => {
        if (!countries.length) {
            console.log("Countries not loaded yet, skipping country param update");
            return;
        }

        let countryId = 0;
        let admin_level = "total";
        let admin_level_id = null;
        let showSelect = true;

        if (country) {
            const countryName = country.toLowerCase().replace(/[-_]/g, " ");
            const matchedCountry = countries.find(
                (c) =>
                    c.country.toLowerCase().replace(/\s+/g, "") === countryName.replace(/\s+/g, "") && c.status
            );
            if (matchedCountry) {
                console.log(`Setting country to ${matchedCountry.country} (ID: ${matchedCountry.country_id}) from URL`);
                countryId = matchedCountry.country_id;
                admin_level = "country";
                admin_level_id = matchedCountry.country_id;
                showSelect = false;
            } else {
                console.warn(`Country "${country}" not found or inactive, defaulting to South Asia`);
                Swal.fire({
                    icon: "warning",
                    title: "Invalid Country",
                    text: `Country "${country}" not found or inactive. Defaulting to South Asia.`,
                });
            }
        } else {
            console.log("No country param, defaulting to South Asia");
        }

        if (countryId !== selectedCountryId || showCountrySelect !== showSelect) {
            console.log(`Updating selectedCountryId to ${countryId} and showCountrySelect to ${showSelect}`);
            setSelectedCountryId(countryId);
            setShowCountrySelect(showSelect);
            cleanupMaps();
            fetchGeojson(admin_level, admin_level_id);
        } else {
            console.log("Country ID and showCountrySelect unchanged, skipping update");
        }

        return () => {
            isFetchingRef.current = false;
        };
    }, [country, countries, fetchGeojson, cleanupMaps]);

    useEffect(() => {
        if (hasInitializedRef.current) return;
        hasInitializedRef.current = true;

        console.log("Starting initialization");
        const initializeData = async () => {
            setIsLoading(true);
            try {
                const [fetchedCountries, fetchedCommodities, fetchedScenarios, fetchedScales] = await Promise.all([
                    fetchData("lkp/locations/countries"),
                    fetchData("lkp/common/commodities"),
                    fetchData("lkp/common/climate_scenarios"),
                    fetchData("lkp/common/visualization_scales"),
                ]);
                console.log("Dropdown data fetched", { fetchedCountries, fetchedCommodities });

                setCountries(fetchedCountries);
                setCommodities(fetchedCommodities);
                setClimateScenarios(fetchedScenarios);
                setVisualizationScales(fetchedScales);

                let commodityId = "";
                if (fetchedCommodities.length > 0) {
                    const activeCommodities = fetchedCommodities.filter((c) => c.status);
                    if (activeCommodities.length > 0) {
                        commodityId = activeCommodities[0]?.commodity_id;
                        console.log(`Setting default commodity to ID: ${commodityId}`, { activeCommodities });
                        setSelectedCommodityId(commodityId);
                    } else {
                        console.error("No active commodities available");
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No active commodities available. Please try again later.",
                        });
                    }
                } else {
                    console.error("No commodities fetched");
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load commodities. Please try again later.",
                    });
                }

                if (fetchedScenarios.length > 0 && !selectedScenarioId) {
                    const scenarioId = fetchedScenarios[0]?.scenario_id || "";
                    console.log(`Setting default scenario to ID: ${scenarioId}`);
                    setSelectedScenarioId(scenarioId);
                }

                if (fetchedScales.length > 0 && !selectedVisualizationScaleId) {
                    const scaleId = fetchedScales[0]?.scale_id || "";
                    console.log(`Setting default visualization scale to ID: ${scaleId}`);
                    setSelectedVisualizationScaleId(scaleId);
                }

                if (!country) {
                    console.log("Triggering default GeoJSON fetch for South Asia");
                    fetchGeojson("total", null);
                }
            } catch (err) {
                console.error("Initialization error:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to initialize data.",
                });
            } finally {
                setIsLoading(false);
            }
        };

        initializeData();
    }, [fetchData, fetchGeojson, country]);

    useEffect(() => {
        if (!hasInitializedRef.current || !selectedCommodityId) {
            console.log("Not triggering fetchHazardData on filter change:", {
                hasInitialized: hasInitializedRef.current,
                selectedCommodityId,
                isFetching: isFetchingRef.current,
            });
            return;
        }
        console.log(`Triggering fetchHazardData for commodity ${selectedCommodityId}, country ${selectedCountryId}`);
        fetchHazardData(selectedCommodityId);
    }, [selectedCommodityId, selectedCountryId, fetchHazardData]);

    useEffect(() => {
        if (!memoizedHazardData || !memoizedHazardData.raster_grids || !memoizedGeojsonData) {
            console.log("Skipping fetchTiffs: dependencies not ready", {
                hasHazardData: !!memoizedHazardData,
                hasRasterGrids: !!memoizedHazardData?.raster_grids,
                hasGeojson: !!memoizedGeojsonData,
            });
            return;
        }

        console.log("Triggering fetchTiffs");
        fetchTiffs(memoizedHazardData, memoizedGeojsonData, selectedCountryId, selectedCommodityId, selectRasterFile, fetchGeoTiff);

        return () => {
            fetchTiffs.cancel();
        };
    }, [memoizedHazardData, memoizedGeojsonData, selectedCountryId, selectedCommodityId, selectRasterFile, fetchGeoTiff, fetchTiffs]);

    const updateGeoTiffLayer = useCallback(
        async (tiff, index) => {
            if (!mapInstances.current[index] || !mapRefs.current[index] || !tiff) {
                console.warn(`Skipping updateGeoTiffLayer for index ${index}: missing dependencies`, {
                    mapInstance: !!mapInstances.current[index],
                    mapRef: !!mapRefs.current[index],
                    tiff: !!tiff,
                });
                return;
            }

            const map = mapInstances.current[index];
            console.log(`Updating GeoTIFF layer for map ${index}, grid_sequence: ${tiff.metadata.grid_sequence}`);

            // Remove existing layers
            layerRefs.current[index].forEach((layer) => {
                if (layer && map.hasLayer(layer)) {
                    map.removeLayer(layer);
                }
            });
            layerRefs.current[index] = [];

            if (geojsonLayerRefs.current[index] && map.hasLayer(geojsonLayerRefs.current[index])) {
                map.removeLayer(geojsonLayerRefs.current[index]);
                geojsonLayerRefs.current[index] = null;
            }

            // Remove existing controls if they exist
            if (mapControlRefs.current[index]) {
                map.removeControl(mapControlRefs.current[index]);
                mapControlRefs.current[index] = null;
            }
            if (downloadControlRefs.current[index]) {
                map.removeControl(downloadControlRefs.current[index]);
                downloadControlRefs.current[index] = null;
            }
            controlsInitialized.current[index] = false;

            const { arrayBuffer, metadata } = tiff;
            const cacheKey = `${metadata.source_file}-${index}`;
            let georaster = georasterCache.current.get(cacheKey);

            if (!georaster) {
                try {
                    georaster = await parseGeoraster(arrayBuffer);
                    console.log(`Map ${index} - GeoRaster parsed:`, {
                        bands: georaster.bands,
                        mins: georaster.mins,
                        maxs: georaster.maxs,
                        height: georaster.height,
                        width: georaster.width,
                    });
                    georasterCache.current.set(cacheKey, georaster);
                } catch (err) {
                    console.error(`GeoRaster parsing error for map ${index}:`, err);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: `Failed to parse GeoTIFF for map ${index}`,
                    });
                    return;
                }
            }

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
                    const min = georaster.mins[0] || 0;
                    const max = georaster.maxs[0] || 1;
                    if (max === min || value < min || value > max) return "rgba(255, 255, 255, 0)";
                    const colorIndex = Math.min(
                        Math.max(Math.floor(((value - min) / (max - min)) * (metadata.color_ramp.length - 1)), 0),
                        metadata.color_ramp.length - 1
                    );
                    const color = metadata.color_ramp[colorIndex];
                    return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.8)`;
                },
                resolution: 256,
                pane: "overlayPane",
                noDataValue: georaster.noDataValue ?? null,
            });

            try {
                geotiffLayer.addTo(map);
                layerRefs.current[index].push(geotiffLayer);
                console.log(`GeoTIFF layer added to map ${index}`);

                if (memoizedGeojsonData?.geojson) {
                    const geojsonLayer = L.geoJSON(memoizedGeojsonData.geojson, {
                        style: {
                            color: "#000000",
                            weight: 2,
                            opacity: 0.8,
                            fillOpacity: 0,
                        },
                        onEachFeature: (feature, layer) => {
                            layer.bindPopup(
                                feature.properties.name ||
                                feature.properties.NAME ||
                                feature.properties.admin ||
                                "Region"
                            );
                        },
                    });
                    geojsonLayer.addTo(map);
                    geojsonLayerRefs.current[index] = geojsonLayer;
                    console.log(`GeoJSON layer added to map ${index}`);
                    if (memoizedGeojsonData.bbox) {
                        map.fitBounds([
                            [memoizedGeojsonData.bbox[1], memoizedGeojsonData.bbox[0]],
                            [memoizedGeojsonData.bbox[3], memoizedGeojsonData.bbox[2]],
                        ]);
                        console.log(`Map ${index} zoomed to bbox:`, memoizedGeojsonData.bbox);
                    }
                }

                geotiffLayer.on("click", async (e) => {
                    const { lat, lng } = e.latlng;
                    try {
                        const value = await georaster.getValues([[lng, lat]])[0];
                        L.popup()
                            .setLatLng(e.latlng)
                            .setContent(`Value: ${value !== undefined ? value.toFixed(2) : "N/A"} at (${lat.toFixed(4)}, ${lng.toFixed(4)})`)
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
                    setRenderedMaps((prev) => {
                        const newRenderedMaps = [...prev];
                        newRenderedMaps[index] = true;
                        return newRenderedMaps;
                    });
                });

                // Only add controls if not already initialized
                if (!controlsInitialized.current[index]) {
                    // Add download control (top-left)
                    const downloadControl = L.control.downloadControl({
                        position: "topleft",
                        onDownload: () => {
                            if (tiff && tiff.arrayBuffer) {
                                handleDownloadGeoTIFF(tiff.arrayBuffer, `${tiff.metadata.layer_name}.tif`);
                            } else {
                                console.error("No valid GeoTIFF data available for download", { tiff });
                                Swal.fire({
                                    icon: "error",
                                    title: "Download Failed",
                                    text: "No GeoTIFF data available for this map.",
                                });
                            }
                        },
                    });
                    downloadControl.addTo(map);
                    downloadControlRefs.current[index] = downloadControl;

                    // Add map controls (top-right)
                    const mapControl = L.control.mapControls({
                        position: "topright",
                        isFullscreen: isFullscreen[index] || false,
                        onFitExtent: () => {
                            if (memoizedGeojsonData?.bbox && mapInstances.current[index]) {
                                mapInstances.current[index].fitBounds([
                                    [memoizedGeojsonData.bbox[1], memoizedGeojsonData.bbox[0]],
                                    [memoizedGeojsonData.bbox[3], memoizedGeojsonData.bbox[2]],
                                ], { padding: [50, 50] });
                                console.log(`Map ${index} fit to extent`);
                            }
                        },
                        updateFullscreenButton: (button) => updateFullscreenButton(button, isFullscreen[index]),
                    });
                    mapControl.addTo(map);
                    mapControlRefs.current[index] = mapControl;

                    controlsInitialized.current[index] = true;
                    console.log(`Controls initialized for map ${index}`);
                }

                map.invalidateSize();
                console.log(`Map ${index} rendering completed`);
            } catch (err) {
                console.error(`Failed to add layers to map ${index}:`, err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Failed to add layers for map ${index}`,
                });
            }
        },
        [memoizedGeojsonData, isFullscreen, updateFullscreenButton, handleDownloadGeoTIFF]
    );

    const renderMaps = useCallback(() => {
        if (!allDataReady) {
            console.log("Skipping renderMaps: data not ready", { allDataReady, tiffDataLength: tiffData.length });
            return;
        }

        console.log("Rendering maps with tiffData:", tiffData);

        tiffData.forEach((tiff) => {
            const gridSequence = tiff.metadata.grid_sequence;
            const mapIndex = gridSequence === 0 ? 0 : gridSequence;
            if (!mapRefs.current[mapIndex] || mapInstances.current[mapIndex]) {
                console.warn(`Skipping map initialization for index ${mapIndex}:`, {
                    mapRef: !!mapRefs.current[mapIndex],
                    mapInstance: !!mapInstances.current[mapIndex],
                });
                return;
            }

            console.log(`Initializing map ${mapIndex} for grid_sequence: ${gridSequence}`);
            const map = L.map(mapRefs.current[mapIndex], {
                minZoom: 3,
                maxZoom: 18,
                zoom: 5,
                center: [20.5937, 78.9629],
                fadeAnimation: false,
                zoomAnimation: false,
            });
            const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                opacity: 0.1,
                errorTileUrl: "/images/fallback-tile.png",
                preload: 1,
            });
            tileLayer.addTo(map);
            tileLayer.on("load", () => {
                tileLayer.setOpacity(1);
                console.log(`Tile layer loaded for map ${mapIndex}`);
                map.invalidateSize();
            });
            mapInstances.current[mapIndex] = map;
            tileLayerRefs.current[mapIndex] = tileLayer;
            layerRefs.current[mapIndex] = [];

            setTimeout(() => {
                if (mapInstances.current[mapIndex]) {
                    mapInstances.current[mapIndex].invalidateSize();
                    console.log(`Map ${mapIndex} size invalidated`);
                }
            }, 100);
        });

        tiffData.forEach((tiff) => {
            const gridSequence = tiff.metadata.grid_sequence;
            const mapIndex = gridSequence === 0 ? 0 : gridSequence;
            if (mapRefs.current[mapIndex] && mapInstances.current[mapIndex]) {
                console.log(`Rendering GeoTIFF for grid_sequence: ${gridSequence} at map index: ${mapIndex}`);
                updateGeoTiffLayer(tiff, mapIndex);
            } else {
                console.warn(`Map ref or instance missing for grid_sequence: ${gridSequence}, map index: ${mapIndex}`);
            }
        });
    }, [allDataReady, tiffData, updateGeoTiffLayer]);

    useEffect(() => {
        if (allDataReady && tiffData.length > 0) {
            console.log("Triggering renderMaps with tiffData:", tiffData);
            renderMaps();
        } else {
            console.log("Not triggering renderMaps:", { allDataReady, tiffDataLength: tiffData.length });
        }
    }, [allDataReady, tiffData, renderMaps]);

    const handleCountryChange = useCallback(
        (event) => {
            const countryId = event.target.value;
            if (countryId === selectedCountryId) {
                console.log("Country unchanged, skipping update");
                return;
            }
            console.log(`Country changed to ID: ${countryId}`);
            setSelectedCountryId(countryId);
            setShowCountrySelect(true);
            const admin_level = countryId !== 0 ? "country" : "total";
            const admin_level_id = countryId || null;
            cleanupMaps();
            fetchGeojson(admin_level, admin_level_id);
        },
        [fetchGeojson, cleanupMaps, selectedCountryId]
    );

    const handleCommodityChange = useCallback(
        (event) => {
            const commodityId = event.target.value;
            if (commodityId === selectedCommodityId) {
                console.log("Commodity unchanged, skipping update");
                return;
            }
            console.log(`Commodity changed to ID: ${commodityId}`);
            setSelectedCommodityId(commodityId);
            cleanupMaps();
        },
        [selectedCommodityId, cleanupMaps]
    );

    const handleScenarioChange = useCallback(
        (event) => {
            const scenarioId = event.target.value;
            if (scenarioId === selectedScenarioId) {
                console.log("Scenario unchanged, skipping update");
                return;
            }
            console.log(`Scenario changed to ID: ${scenarioId}`);
            setSelectedScenarioId(scenarioId);
            cleanupMaps();
        },
        [selectedScenarioId, cleanupMaps]
    );

    const handleVisualizationScaleChange = useCallback(
        (event) => {
            const scaleId = event.target.value;
            if (scaleId === selectedVisualizationScaleId) {
                console.log("Visualization scale unchanged, skipping update");
                return;
            }
            console.log(`Visualization scale changed to ID: ${scaleId}`);
            setSelectedVisualizationScaleId(scaleId);
            cleanupMaps();
        },
        [selectedVisualizationScaleId, cleanupMaps]
    );

    const handleIntensityMetricChange = useCallback(
        (event) => {
            const value = event.target.value;
            if (+value === +selectedIntensityMetricId) {
                console.log("Intensity metric unchanged, skipping update");
                return;
            }
            console.log(`Intensity metric changed to ID: ${value}`);
            setSelectedIntensityMetricId(+value);
            cleanupMaps();
        },
        [selectedIntensityMetricId, cleanupMaps]
    );

    const handleChangeMetricChange = useCallback(
        (event) => {
            const value = event.target.value;
            if (+value === +selectedChangeMetricId) {
                console.log("Change metric unchanged, skipping update");
                return;
            }
            console.log(`Change metric changed to ID: ${value}`);
            setSelectedChangeMetricId(+value);
            cleanupMaps();
        },
        [selectedChangeMetricId, cleanupMaps]
    );

    return (
        <div>
            <Grid container spacing={1} sx={{ marginTop: "86px", p: 1 }}>
                <Grid item xs={3}>
                    <Paper elevation={1} sx={{ borderRadius: 1 }}>
                        <Box
                            sx={(theme) => ({
                                width: "100%",
                                bgcolor: theme.palette.mode === "dark" ? "#387530" : "#C1E1C1",
                                height: "24px",
                                alignContent: "center",
                                justifyContent: "center",
                                alignItems: "center",
                            })}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: "900", fontFamily: "Jura" }}>
                                Hazard at a Glance
                            </Typography>
                        </Box>
                        <Box sx={{ m: 0.5 }}>
                            <Grid container>
                                <Grid item>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.625, marginRight: "5px" }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Location: </Typography>
                                        <FormControl sx={{ minWidth: "105px" }}>
                                            {showCountrySelect ? (
                                                <Select
                                                    disableUnderline
                                                    variant="standard"
                                                    value={selectedCountryId}
                                                    onChange={handleCountryChange}
                                                    displayEmpty
                                                    inputProps={{ "aria-label": "Country" }}
                                                    IconComponent={ArrowDropDownIcon}
                                                    MenuProps={{
                                                        disableScrollLock: true,
                                                        PaperProps: { sx: { maxHeight: 300 } },
                                                        PopperProps: { modifiers: [{ name: "flip", enabled: false }] },
                                                    }}
                                                    sx={(theme) => ({
                                                        fontSize: "12px",
                                                        height: "24px",
                                                        backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)",
                                                    })}
                                                    disabled={isLoading || isOptionLoading}
                                                >
                                                    <MenuItem value={0} sx={{ fontSize: "12px", paddingY: "2px" }}>
                                                        South Asia
                                                    </MenuItem>
                                                    {countries.map((country) => (
                                                        <MenuItem
                                                            key={country.country_id}
                                                            value={country.country_id}
                                                            disabled={!country.status}
                                                            sx={{ fontSize: "12px", paddingY: "2px" }}
                                                        >
                                                            {country.country}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            ) : (
                                                <Typography variant="body1" sx={{ fontSize: "12px" }}>
                                                    {countries.find((c) => c.country_id === selectedCountryId)?.country || "South Asia"}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.625 }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Commodity: </Typography>
                                        <FormControl sx={{ minWidth: "105px" }}>
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                value={selectedCommodityId}
                                                onChange={handleCommodityChange}
                                                displayEmpty
                                                inputProps={{ "aria-label": "Commodity" }}
                                                IconComponent={ArrowDropDownIcon}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                    PaperProps: { sx: { maxHeight: 300 } },
                                                    PopperProps: { modifiers: [{ name: "flip", enabled: false }] },
                                                }}
                                                sx={(theme) => ({
                                                    fontSize: "12px",
                                                    height: "24px",
                                                    backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)",
                                                })}
                                                disabled={isLoading || isOptionLoading}
                                            >
                                                {commodities.filter((c) => c.status).map((commodity) => (
                                                    <MenuItem
                                                        key={commodity.commodity_id}
                                                        value={commodity.commodity_id}
                                                        sx={{ fontSize: "12px", paddingY: "2px" }}
                                                    >
                                                        {commodity.commodity}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 0.625, marginRight: "5px" }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Scenario: </Typography>
                                        <FormControl sx={{ minWidth: "120px" }}>
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                value={selectedScenarioId}
                                                onChange={handleScenarioChange}
                                                displayEmpty
                                                inputProps={{ "aria-label": "Scenario" }}
                                                IconComponent={ArrowDropDownIcon}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                    PaperProps: { sx: { maxHeight: 300 } },
                                                    PopperProps: { modifiers: [{ name: "flip", enabled: false }] },
                                                }}
                                                sx={(theme) => ({
                                                    fontSize: "12px",
                                                    height: "24px",
                                                    backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)",
                                                })}
                                                disabled={isLoading || isOptionLoading}
                                            >
                                                {climateScenarios.map((scenario) => (
                                                    <MenuItem
                                                        key={scenario.scenario_id}
                                                        value={scenario.scenario_id}
                                                        disabled={!scenario.status}
                                                        sx={{ fontSize: "12px", paddingY: "2px" }}
                                                    >
                                                        {scenario.scenario}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 0.625 }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Scales: </Typography>
                                        <FormControl sx={{ minWidth: "120px" }}>
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                value={selectedVisualizationScaleId}
                                                onChange={handleVisualizationScaleChange}
                                                displayEmpty
                                                inputProps={{ "aria-label": "Visualization Scales" }}
                                                IconComponent={ArrowDropDownIcon}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                    PaperProps: { sx: { maxHeight: 300 } },
                                                    PopperProps: { modifiers: [{ name: "flip", enabled: false }] },
                                                }}
                                                sx={(theme) => ({
                                                    fontSize: "12px",
                                                    height: "24px",
                                                    backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)",
                                                })}
                                                disabled={isLoading || isOptionLoading || visualizationScales.length === 0}
                                            >
                                                {visualizationScales.length === 0 ? (
                                                    <MenuItem value="" sx={{ fontSize: "12px", paddingY: "2px" }}>
                                                        No scales available
                                                    </MenuItem>
                                                ) : (
                                                    visualizationScales.map((scale) => (
                                                        <MenuItem
                                                            key={scale.scale_id}
                                                            value={scale.scale_id}
                                                            disabled={!scale.status}
                                                            sx={{ fontSize: "12px", paddingY: "2px" }}
                                                        >
                                                            {scale.scale}
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 0.625, marginRight: "5px" }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Intensity: </Typography>
                                        <FormControl sx={{ minWidth: "150px" }}>
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                value={selectedIntensityMetricId}
                                                onChange={handleIntensityMetricChange}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                    PaperProps: { sx: { maxHeight: 300 } },
                                                    PopperProps: { modifiers: [{ name: "flip", enabled: false }] },
                                                }}
                                                sx={(theme) => ({
                                                    fontSize: "12px",
                                                    height: "24px",
                                                    backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)",
                                                })}
                                                disabled={isLoading || isOptionLoading}
                                            >
                                                <MenuItem value={1} sx={{ fontSize: "12px", paddingY: "2px" }}>
                                                    Intensity
                                                </MenuItem>
                                                <MenuItem value={2} sx={{ fontSize: "12px", paddingY: "2px" }}>
                                                    Intensity Frequency
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 0.625 }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Metric: </Typography>
                                        <FormControl sx={{ minWidth: "95px" }}>
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                value={selectedChangeMetricId}
                                                onChange={handleChangeMetricChange}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                    PaperProps: { sx: { maxHeight: 300 } },
                                                    PopperProps: { modifiers: [{ name: "flip", enabled: false }] },
                                                }}
                                                sx={(theme) => ({
                                                    fontSize: "12px",
                                                    height: "24px",
                                                    backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)",
                                                })}
                                                disabled={isLoading || isOptionLoading}
                                            >
                                                <MenuItem value={1} sx={{ fontSize: "12px", paddingY: "2px" }}>
                                                    Absolute
                                                </MenuItem>
                                                <MenuItem value={2} sx={{ fontSize: "12px", paddingY: "2px" }}>
                                                    Delta
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ position: "relative" }}>
                            <div
                                ref={(el) => (mapRefs.current[0] = el)}
                                className="map-container"
                                style={{ height: "calc(-233px + 100vh)", width: "100%" }}
                            />
                            {isLoading && (
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
                            {tiffData.find((tiff) => tiff.metadata.grid_sequence === 0) && renderedMaps[0] && (
                                <MapLegend
                                    tiff={tiffData.find((tiff) => tiff.metadata.grid_sequence === 0)}
                                    breadcrumbData={breadcrumbData}
                                    layerType="risk"
                                    apiUrl={apiUrl}
                                    mapWidth={mapWidths.current[0]}
                                />
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={1}>
                        {Array.from({ length: 6 }, (_, index) => {
                            const gridSequence = index + 1;
                            const tiff = tiffData.find((t) => t.metadata.grid_sequence === gridSequence);
                            const grid = memoizedHazardData?.raster_grids?.find((g) => g.grid_sequence === gridSequence);
                            return (
                                <Grid item xs={4} key={`map-${gridSequence}`}>
                                    <Paper elevation={1} sx={{ borderRadius: 1 }}>
                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                                fontWeight: "800",
                                                fontFamily: "Jura",
                                            }}
                                        >
                                            {grid?.hazard_title || "Unnamed Hazard"}
                                        </Typography>
                                        <Box sx={{ position: "relative" }}>
                                            <div
                                                ref={(el) => (mapRefs.current[gridSequence] = el)}
                                                className="map-container"
                                                style={{ height: "calc(-80px + 50vh)", width: "100%" }}
                                            />
                                            {isLoading && (
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
                                            {tiff && renderedMaps[gridSequence] && (
                                                <MapLegend
                                                    tiff={tiff}
                                                    breadcrumbData={breadcrumbData}
                                                    layerType="risk"
                                                    apiUrl={apiUrl}
                                                    mapWidth={mapWidths.current[gridSequence]}
                                                />
                                            )}
                                        </Box>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default DataGlance;