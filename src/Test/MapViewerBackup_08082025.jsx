// src/components/MapViewer.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Grid,
    Box,
    Breadcrumbs,
    Typography,
    Button,
    CircularProgress,
    useTheme,
} from "@mui/material";
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

// Leaflet control setup (unchanged)
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
    const [allDataReady, setAllDataReady] = useState(false);
    const [breadcrumbData, setBreadcrumbData] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState([]);
    const [adaptationTabs, setAdaptationTabs] = useState([]);
    const [selectedAdaptationTabId, setSelectedAdaptationTabId] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        setMapLoading(internalMapLoading);
    }, [internalMapLoading, setMapLoading]);

    const getTileLayerUrl = () => {
        return theme.palette.mode === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    };

    useEffect(() => {
        if (
            +filters?.commodity_type_id === 1 &&
            (filters?.layer_type === "adaptation" ||
                filters?.layer_type === "adaptation_croptab")
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
    }, [filters?.commodity_type_id, filters?.layer_type, apiUrl, selectedAdaptationTabId]);

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
        setIsFullscreen([]);
        setTiffData([]);
        setAllDataReady(false);
        setBreadcrumbData(null);
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
                }
            });
        } catch (e) {
            console.error("SyncMaps error:", e);
        } finally {
            setIsSyncing(false);
        }
    }, 100);

    const initializeMaps = useCallback(() => {
        if (!tiffData.length || !mapRefs.current.length || !allDataReady) return;

        mapRefs.current = mapRefs.current.slice(0, tiffData.length);
        mapInstances.current = mapInstances.current.slice(0, tiffData.length);
        fullscreenButtonRefs.current = fullscreenButtonRefs.current.slice(
            0,
            tiffData.length
        );
        tileLayerRefs.current = tileLayerRefs.current.slice(0, tiffData.length);

        mapRefs.current.forEach((mapRef, index) => {
            if (!mapRef || mapInstances.current[index]) return;

            if (mapRef && mapRef.offsetParent !== null) {
                console.log(`Initializing map ${index} for layer: ${tiffData[index]?.metadata?.layer_name || "Unknown"}`);
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
                });
                mapInstances.current[index] = map;
                tileLayerRefs.current[index] = tileLayer;

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
                                setTimeout(() => {
                                    if (mapInstances.current[index]) {
                                        mapInstances.current[index].invalidateSize();
                                    }
                                }, 300);
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
                    if (mapInstances.current[index]) {
                        syncMaps(mapInstances.current[index], index);
                    }
                });

                delete L.Icon.Default.prototype._getIconUrl;
                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
                    iconUrl: "/images/leaflet/marker-icon.png",
                    shadowUrl: "/images/leaflet/marker-shadow.png",
                });

                setTimeout(() => {
                    if (mapInstances.current[index]) {
                        mapInstances.current[index].invalidateSize();
                        console.log(`Map ${index} invalidated size after initialization`);
                    }
                }, 100);
            }
        });
    }, [tiffData.length, allDataReady, theme.palette.mode, isFullscreen]);

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

    useEffect(() => {
        fullscreenButtonRefs.current.forEach((button, index) => {
            updateFullscreenButton(button, index);
        });
    }, [isFullscreen]);

    useEffect(() => {
        mapInstances.current.forEach((map, index) => {
            if (map && map.invalidateSize && mapRefs.current[index]) {
                setTimeout(() => {
                    if (mapInstances.current[index]) {
                        mapInstances.current[index].invalidateSize();
                        console.log(`Map ${index} invalidated size due to drawer or sync change`);
                    }
                }, 300);
            }
        });
    }, [drawerOpen, isSyncing]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            mapInstances.current.forEach((map, index) => {
                if (map && mapRefs.current[index]) {
                    setTimeout(() => {
                        if (mapInstances.current[index]) {
                            mapInstances.current[index].invalidateSize();
                            console.log(`Map ${index} invalidated size due to resize`);
                        }
                    }, 100);
                }
            });
        });

        mapRefs.current.forEach((mapRef) => {
            if (mapRef) resizeObserver.observe(mapRef);
        });

        return () => resizeObserver.disconnect();
    }, [tiffData.length]);

    useEffect(() => {
        if (!filters || !filters.geojson || !filters.bbox) {
            cleanupMaps();
            setAllDataReady(false);
            return;
        }

        const fetchTiffData = async () => {
            setInternalMapLoading(true);
            cleanupMaps();
            try {
                console.log("Filters:", filters); // Debug log for filters
                const payload = {
                    analysis_scope_id: +filters.analysis_scope_id,
                    visualization_scale_id: +filters.visualization_scale_id,
                    commodity_id: +filters.commodity_id || null,
                    data_source_id: +filters.data_source_id,
                    climate_scenario_id: +filters.climate_scenario_id,
                    layer_type: filters.layer_type,
                    risk_id: filters.risk_id || null,
                    impact_id: filters.impact_id || null,
                    adaptation_id: filters.adaptation_id || null,
                    adaptation_croptab_id: selectedAdaptationTabId || 6,
                };

                const mandatoryFields = [
                    "analysis_scope_id",
                    "visualization_scale_id",
                    "data_source_id",
                    "climate_scenario_id",
                    "layer_type",
                ];
                if (
                    +filters.commodity_type_id === 1 &&
                    (filters.layer_type === "adaptation" ||
                        filters.layer_type === "adaptation_croptab")
                ) {
                    mandatoryFields.push("adaptation_croptab_id");
                }
                const missingFields = mandatoryFields.filter((field) => !payload[field]);
                if (missingFields.length > 0) {
                    throw new Error(`Missing mandatory fields: ${missingFields.join(", ")}`);
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

                const tifPickerRes = await fetch(`${apiUrl}/layers/tif_picker`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (!tifPickerRes.ok) {
                    throw new Error(`tif_picker error! Status: ${tifPickerRes.status}`);
                }
                const tifPickerData = await tifPickerRes.json();
                console.log("tif_picker API response:", tifPickerData); // Debug log

                if (!tifPickerData.success || !tifPickerData.data) {
                    throw new Error(
                        `Invalid response from tif_picker: success=${tifPickerData.success}, data=${tifPickerData.data ? "present" : "missing"
                        }`
                    );
                }

                const { data } = tifPickerData;
                const fileList = data.raster_files || data.files || [];
                if (!fileList.length) {
                    throw new Error("No raster files available for the selected filters");
                }

                setBreadcrumbData({
                    mask: data.mask || null,
                    commodity: data.commodity || null,
                    level: data.level || null,
                    model: data.model || null,
                    scenario: data.scenario || null,
                    country_id: filters.admin_level === "country" ? filters.admin_level_id : null,
                    state_id: filters.admin_level === "state" ? filters.admin_level_id : null,
                    commodity_id: filters.commodity_id,
                    climate_scenario_id: filters.climate_scenario_id,
                    data_source_id: filters.data_source_id,
                    visualization_scale_id: filters.visualization_scale_id,
                });

                const tiffPromises = fileList.map(async (file) => {
                    if (!file.exists) {
                        throw new Error(`Source file ${file.source_file} does not exist`);
                    }

                    const geotiffRes = await fetch(`${apiUrl}/layers/geotiff`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            admin_level: filters.admin_level,
                            admin_level_id: filters.admin_level_id,
                            source_file: file.source_file,
                            color_ramp: file.ramp,
                        }),
                    });
                    if (!geotiffRes.ok)
                        throw new Error(`geotiff error! Status: ${geotiffRes.status}`);
                    const arrayBuffer = await geotiffRes.arrayBuffer();
                    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                        throw new Error(`Empty or invalid arrayBuffer for ${file.source_file}`);
                    }
                    const clonedBuffer = arrayBuffer.slice(0);

                    return {
                        arrayBuffer: clonedBuffer,
                        metadata: {
                            source_file: file.source_file,
                            color_ramp: file.ramp,
                            layer_name: file.climate_scenario || "Baseline",
                            layer_id:
                                payload.layer_type === "risk"
                                    ? filters.risk_id
                                    : payload.layer_type === "impact"
                                        ? filters.impact_id
                                        : payload.layer_type === "adaptation"
                                            ? filters.adaptation_id
                                            : null,
                            year: file.year || null,
                        },
                    };
                });

                const tiffResults = await Promise.all(tiffPromises);
                setTiffData(tiffResults);
                setIsFullscreen(new Array(tiffResults.length).fill(false));
                if (filters.geojson && filters.bbox) {
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
            }
        };

        fetchTiffData();
    }, [filters, apiUrl, selectedAdaptationTabId, cleanupMaps]);

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
                    `Skipping renderMapLayers for index ${index} due to missing dependencies`
                );
                return;
            }

            const map = mapInstances.current[index];

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
            } else {
                layerRefs.current[index] = [];
            }

            const bounds = [
                [bbox[1], bbox[0]],
                [bbox[3], bbox[2]],
            ];
            boundsRefs.current[index] = bounds;
            map.fitBounds(bounds, { padding: [50, 50] });
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
                    const tooltipText = feature.properties[tooltipNameIndex[filters.admin_level]];
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
            layerRefs.current[index].push(geojsonLayer);

            const { arrayBuffer, metadata } = tiff;
            const clonedBuffer = arrayBuffer.slice(0);
            parseGeoraster(clonedBuffer)
                .then((georaster) => {
                    console.log(
                        `Map ${index} - GeoRaster bands: ${georaster.bands}, Mins: ${georaster.mins}, Maxs: ${georaster.maxs}, Height: ${georaster.height}, Width: ${georaster.width}`
                    );

                    if (!georaster.height || !georaster.width) {
                        console.error(`Invalid GeoRaster dimensions for map ${index}`);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: `Invalid GeoTIFF data for map ${index}`,
                        });
                        return;
                    }

                    const geotiffLayer = new GeoRasterLayer({
                        georaster,
                        opacity: 0.8,
                        pixelValuesToColorFn: (values) => {
                            if (!values || values.length === 0) return "rgba(255, 255, 255, 0)";
                            if (values.length >= 4) {
                                const [r, g, b, a] = values;
                                const alpha = a !== undefined ? a / 255 : 1;
                                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                            }
                            const value = values[0];
                            if (!metadata.color_ramp) return "rgba(255, 255, 255, 0)";
                            const min = georaster.mins[0] || 0;
                            const max = georaster.maxs[0] || 1;
                            if (max === min || value < min || value > max)
                                return "rgba(255, 255, 255, 0)";
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
                        geotiffLayer.addTo(map);
                        layerRefs.current[index].push(geotiffLayer);

                        geotiffLayer.on("click", async (e) => {
                            const { lat, lng } = e.latlng;
                            try {
                                const value = await georaster.getValues([[lng, lat]])[0];
                                L.popup()
                                    .setLatLng(e.latlng)
                                    .setContent(
                                        `Value: ${value !== undefined ? value.toFixed(2) : "N/A"
                                        } at (${lat.toFixed(4)}, ${lng.toFixed(4)})`
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
                        });
                    } else {
                        console.warn(`Map instance or reference missing for index ${index}`);
                    }
                })
                .catch((err) => {
                    console.error("GeoRaster rendering error:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: `Failed to render GeoTIFF layer: ${err.message}`,
                    });
                });
        },
        [filters, theme.palette.mode, allDataReady]
    );

    useEffect(() => {
        if (tiffData.length && filters && filters.geojson && filters.bbox && allDataReady) {
            console.log(`Rendering ${tiffData.length} maps with tiffData`);
            initializeMaps();

            mapRefs.current = mapRefs.current.slice(0, tiffData.length);
            mapInstances.current = mapInstances.current.slice(0, tiffData.length);
            boundsRefs.current = boundsRefs.current.slice(0, tiffData.length);
            layerRefs.current = layerRefs.current.slice(0, tiffData.length);
            fullscreenButtonRefs.current = fullscreenButtonRefs.current.slice(
                0,
                tiffData.length
            );
            tileLayerRefs.current = tileLayerRefs.current.slice(0, tiffData.length);

            tiffData.forEach((tiff, index) => {
                if (mapRefs.current[index] && mapInstances.current[index]) {
                    renderMapLayers(filters.geojson, filters.bbox, tiff, index);
                } else {
                    console.warn(`Map ref or instance missing for index ${index}`);
                }
            });
        }
    }, [tiffData, filters, allDataReady, renderMapLayers, initializeMaps]);

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
    }, [tiffData.length]);

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
            console.log(`Fetching table data for ${layerName}`); // Debug log
            const payload = {
                layer_type: filters?.layer_type,
                country_id: breadcrumbData?.country_id || null,
                state_id: breadcrumbData?.state_id || null,
                commodity_id: breadcrumbData?.commodity_id || null,
                climate_scenario_id: tiffMetadata.year ? breadcrumbData?.climate_scenario_id : 1,
                year: tiffMetadata.year || null,
                data_source_id: breadcrumbData?.data_source_id || null,
                visualization_scale_id: breadcrumbData?.visualization_scale_id || null,
                layer_id: tiffMetadata.layer_id,
            };
            console.log("Table download payload:", payload); // Debug log

            const response = await fetch(`${apiUrl}/layers/table`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Table download failed! Status: ${response.status}`);
            }

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

            // Invalidate the map to ensure tiles are fully rendered
            if (mapInstances.current[mapIndex]) {
                mapInstances.current[mapIndex].invalidateSize();
                console.log(`Map ${mapIndex} invalidated for image capture`);
                await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for rendering
            }

            // Find the parent container that includes the map and legend
            const mapAndLegendContainer = mapContainer.closest(".map-and-legend-container");
            if (!mapAndLegendContainer) {
                throw new Error("Parent container for map and legend not found");
            }

            // Log container details for debugging
            console.log(
                `Map and legend container dimensions: width=${mapAndLegendContainer.offsetWidth}, height=${mapAndLegendContainer.offsetHeight}`
            );

            // Verify legend is present
            const legendElement = mapAndLegendContainer.querySelector(".css-1annchz");
            console.log(`Legend element ${legendElement ? "found" : "not found"} in container`);

            // Capture the map and legend as JPEG using domtoimage
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
                // Fallback to html2canvas
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

            // Download the image
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

    const getGridLayout = (tiffCount) => {
        return { xs: 12, height: tiffCount === 1 ? "100%" : "500px" };
    };

    const gridLayout = getGridLayout(tiffData.length);

    const handleAdaptationTabChange = (tabId) => {
        setSelectedAdaptationTabId(tabId);
    };

    return (
        <Box
            sx={{
                height: "100%",
                overflow: "hidden",
                padding: "0 0px",
                backgroundColor: (theme) => theme.palette.background.paper,
            }}
        >
            <Box sx={{ p: "0 16px", marginTop: "0px" }} className="breadTextFont">
                {breadcrumbData ? (
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator=">"
                        sx={{ fontSize: "14px" }}
                    >
                        {filters?.region && (
                            <Typography
                                key="region"
                                color="text.primary"
                                sx={{ fontSize: "14px !important", fontWeight: "bold !important" }}
                            >
                                {filters.region.join(", ")}
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
                        {breadcrumbData.model && (
                            <Typography
                                key="model"
                                color="text.primary"
                                sx={{ fontSize: "14px !important" }}
                            >
                                Model: {breadcrumbData.model}
                            </Typography>
                        )}
                    </Breadcrumbs>
                ) : (
                    <Typography color="text.secondary" className="breadText">
                        Loading breadcrumb...
                    </Typography>
                )}
            </Box>
            {+filters?.commodity_type_id === 1 &&
                (filters?.layer_type === "adaptation" ||
                    filters?.layer_type === "adaptation_croptab") && (
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
            <Grid container direction="column" sx={{ height: "100%" }}>
                {tiffData.length > 0 ? (
                    tiffData.map((tiff, index) => (
                        <Grid
                            item
                            xs={gridLayout.xs}
                            key={index}
                            sx={{
                                height: gridLayout.height,
                                position: "relative",
                                padding: 1,
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
                                <Typography>{tiff.metadata.layer_name || "Baseline"}</Typography>
                            </Box>
                            <Box
                                className="map-and-legend-container"
                                sx={{
                                    height:
                                        +filters?.commodity_type_id === 1 &&
                                            (filters?.layer_type === "adaptation" ||
                                                filters?.layer_type === "adaptation_croptab")
                                            ? "calc(100% - 80px)"
                                            : "calc(100% - 53px)",
                                    width: "100%",
                                    border: "1px solid #ededed",
                                    position: "relative",
                                    overflow: "hidden",
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
                                    layerName={tiff.metadata.layer_name || "Baseline"}
                                    layerType={filters?.layer_type}
                                    mapIndex={index}
                                    onDownloadGeoTIFF={() =>
                                        handleDownloadGeoTIFF(
                                            tiff.arrayBuffer,
                                            `${tiff.metadata.layer_name || "Baseline"}.tif`
                                        )
                                    }
                                    onDownloadTable={() =>
                                        handleDownloadTable(tiff.metadata.layer_name || "Baseline", tiff.metadata)
                                    }
                                    onDownloadImage={() =>
                                        handleDownloadImage(tiff.metadata.layer_name || "Baseline", index)
                                    }
                                />
                                <MapLegend
                                    tiff={tiff}
                                    breadcrumbData={breadcrumbData}
                                    layerType={filters?.layer_type}
                                    apiUrl={apiUrl}
                                />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Box
                        sx={{
                            height: "100%",
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
        </Box>
    );
}

export default MapViewer;