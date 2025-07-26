import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Paper, Tooltip, IconButton, CircularProgress, Breadcrumbs, Typography } from "@mui/material";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fromArrayBuffer } from "geotiff";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import screenfull from "screenfull";

// Custom Leaflet control for Fullscreen, Fit-to-Extent
L.Control.MapControls = L.Control.extend({
    options: {
        position: "topright",
        isFullscreen: false,
        onFullscreen: () => { },
        onFitExtent: () => { },
        updateFullscreenButton: () => { }, // New callback to update button
    },
    onAdd: function (map) {
        const container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");

        const fullscreenButton = L.DomUtil.create("a", "leaflet-control-button", container);
        fullscreenButton.innerHTML = this.options.isFullscreen ? "⤡" : "⤢";
        fullscreenButton.href = "#";
        fullscreenButton.title = this.options.isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";
        fullscreenButton.style.fontSize = "20px";
        L.DomEvent.on(fullscreenButton, "click", (e) => {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this.options.onFullscreen();
            // Call update function to sync button appearance
            this.options.updateFullscreenButton(fullscreenButton);
        });

        const fitExtentButton = L.DomUtil.create("a", "leaflet-control-button", container);
        fitExtentButton.innerHTML = '<strong>E</strong>';
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

L.control.mapControls = function (options) {
    return new L.Control.MapControls(options);
};

function MapViewer({ drawerOpen, filters, apiUrl }) {
    const mapRefs = useRef([]);
    const mapInstances = useRef([]);
    const layerRefs = useRef([]);
    const boundsRefs = useRef([]);
    const fullscreenButtonRefs = useRef([]); // New ref to store fullscreen button DOM elements
    const [mapLoading, setMapLoading] = useState(false);
    const [tiffData, setTiffData] = useState([]);
    const [renderReady, setRenderReady] = useState(false);
    const [breadcrumbData, setBreadcrumbData] = useState(null);
    const [anchorEl, setAnchorEl] = useState({});
    const [isFullscreen, setIsFullscreen] = useState([]);

    // Cleanup function for maps and layers
    const cleanupMaps = () => {
        mapInstances.current.forEach((map, index) => {
            if (map) {
                map.remove();
                mapInstances.current[index] = null;
            }
        });
        mapRefs.current = [];
        mapInstances.current = [];
        layerRefs.current = [];
        boundsRefs.current = [];
        fullscreenButtonRefs.current = []; // Clear button refs
        setIsFullscreen([]);
        setAnchorEl({});
        setTiffData([]);
        setRenderReady(false);
        setBreadcrumbData(null);
    };

    // Update fullscreen button appearance
    const updateFullscreenButton = (button, index) => {
        if (button) {
            const isFull = isFullscreen[index] || false;
            button.innerHTML = isFull ? "⤡" : "⤢";
            button.title = isFull ? "Exit Fullscreen" : "Enter Fullscreen";
        }
    };

    // Initialize maps
    useEffect(() => {
        if (!tiffData.length || !mapRefs.current.length) return;

        // Ensure mapRefs and mapInstances are in sync
        mapRefs.current = mapRefs.current.slice(0, tiffData.length);
        mapInstances.current = mapInstances.current.slice(0, tiffData.length);
        fullscreenButtonRefs.current = fullscreenButtonRefs.current.slice(0, tiffData.length);

        mapRefs.current.forEach((mapRef, index) => {
            if (!mapRef || mapInstances.current[index]) return;

            // Initialize map only if DOM element exists
            if (mapRef && mapRef.offsetParent !== null) {
                const map = L.map(mapRef, {
                    minZoom: 3,
                    maxZoom: 18,
                });
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }).addTo(map);
                mapInstances.current[index] = map;

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
                                setTimeout(() => map.invalidateSize(), 300);
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
                        if (boundsRefs.current[index]) {
                            map.fitBounds(boundsRefs.current[index], { padding: [50, 50] });
                        }
                    },
                    updateFullscreenButton: (button) => {
                        fullscreenButtonRefs.current[index] = button; // Store button ref
                        updateFullscreenButton(button, index);
                    },
                });
                mapControl.addTo(map);

                delete L.Icon.Default.prototype._getIconUrl;
                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
                    iconUrl: "/images/leaflet/marker-icon.png",
                    shadowUrl: "/images/leaflet/marker-shadow.png",
                });
            }
        });

        return cleanupMaps;
    }, [tiffData.length]);

    // Update fullscreen buttons when isFullscreen changes
    useEffect(() => {
        fullscreenButtonRefs.current.forEach((button, index) => {
            updateFullscreenButton(button, index);
        });
    }, [isFullscreen]);

    // Resize maps when drawer toggles or fullscreen changes
    useEffect(() => {
        mapInstances.current.forEach((map, index) => {
            if (map && map.invalidateSize && mapRefs.current[index]) {
                setTimeout(() => map.invalidateSize(), 300);
            }
        });
    }, [drawerOpen, isFullscreen]);

    // Fetch TIFF data and breadcrumb data
    useEffect(() => {
        if (!filters || !filters.geojson || !filters.bbox) {
            cleanupMaps();
            return;
        }

        const fetchTiffData = async () => {
            setMapLoading(true);
            cleanupMaps(); // Clear previous maps and refs before fetching new data

            try {
                const tifPickerRes = await fetch(`${apiUrl}/layers/tif_picker`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        analysis_scope_id: +filters.analysis_scope_id,
                        visualization_scale_id: +filters.visualization_scale_id,
                        commodity_id: +filters.commodity_id,
                        data_source_id: +filters.data_source_id,
                        climate_scenario_id: +filters.climate_scenario_id,
                        layer_type: filters.layer_type,
                        risk_id: filters.risk_id,
                        impact_id: filters.impact_id,
                        adaptation_id: filters.adaptation_id,
                    }),
                });
                if (!tifPickerRes.ok) throw new Error(`tif_picker error! Status: ${tifPickerRes.status}`);
                const tifPickerData = await tifPickerRes.json();
                if (!tifPickerData.success || !tifPickerData.data) {
                    throw new Error("No valid data returned from tif_picker");
                }

                const { data: { raster_files, commodity, scenario, files, mask, level, model } } = tifPickerData;
                const fileList = raster_files || files || [];
                if (!fileList.length) {
                    throw new Error("No raster files available for the selected filters");
                }

                setBreadcrumbData({ mask, commodity, level, model });

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
                    if (!geotiffRes.ok) throw new Error(`geotiff error! Status: ${geotiffRes.status}`);
                    const arrayBuffer = await geotiffRes.arrayBuffer();
                    const clonedBuffer = arrayBuffer.slice(0);

                    const legendCanvas = generateLegendCanvas(file.ramp);
                    const legendUrl = legendCanvas.toDataURL();

                    return {
                        arrayBuffer: clonedBuffer,
                        metadata: {
                            source_file: file.source_file,
                            color_ramp: file.ramp,
                            layer_name: file.climate_scenario,
                        },
                        legendBase64: legendUrl,
                    };
                });

                const tiffResults = await Promise.all(tiffPromises);
                setTiffData(tiffResults);
                setIsFullscreen(new Array(tiffResults.length).fill(false));
                setAnchorEl(Object.fromEntries(tiffResults.map((_, i) => [i, null])));
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setRenderReady(true);
            } catch (err) {
                console.error("Error fetching TIFF data:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || "Failed to load map data.",
                });
            } finally {
                setMapLoading(false);
            }
        };

        fetchTiffData();
    }, [filters, apiUrl]);

    const generateLegendCanvas = (colorRamp) => {
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 20;
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 200, 0);
        colorRamp.forEach((color, index) => {
            gradient.addColorStop(index / (colorRamp.length - 1), color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 20);
        return canvas;
    };

    const renderMapLayers = (geoJson, bbox, tiff, index) => {
        if (
            !mapInstances.current[index] ||
            !mapRefs.current[index] ||
            !geoJson ||
            !bbox ||
            !tiff ||
            !renderReady
        ) {
            console.warn(`Skipping renderMapLayers for index ${index} due to missing dependencies`);
            return;
        }

        const map = mapInstances.current[index];

        // Clear existing layers
        if (layerRefs.current[index]) {
            layerRefs.current[index].forEach((layer) => {
                if (map.hasLayer(layer)) {
                    map.removeLayer(layer);
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

        const geojsonLayer = L.geoJSON(geoJson, {
            style: {
                color: "black",
                weight: 1,
                fill: false,
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

                const geotiffLayer = new GeoRasterLayer({
                    georaster,
                    opacity: 1.0,
                    pixelValuesToColorFn: (values) => {
                        if (!values || values.length === 0) return "rgba(255, 255, 255, 1)";
                        if (values.length >= 4) {
                            const [r, g, b, a] = values;
                            const alpha = a !== undefined ? a / 255 : 1;
                            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                        }
                        const value = values[0];
                        if (!metadata.color_ramp) return "rgba(255, 255, 255, 1)";
                        const min = georaster.mins[0] || 0;
                        const max = georaster.maxs[0] || 1;
                        if (max === min || value < min || value > max) return "rgba(255, 255, 255, 1)";
                        const colorIndex = Math.min(
                            Math.max(Math.floor(((value - min) / (max - min)) * (metadata.color_ramp.length - 1)), 0),
                            metadata.color_ramp.length - 1
                        );
                        return metadata.color_ramp[colorIndex];
                    },
                    resolution: 256,
                    pane: "overlayPane",
                });

                // Ensure map is still valid before adding layer
                if (mapInstances.current[index] && mapRefs.current[index]) {
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
    };

    useEffect(() => {
        if (tiffData.length && filters && filters.geojson && filters.bbox && renderReady) {
            // Ensure refs are in sync with tiffData
            mapRefs.current = mapRefs.current.slice(0, tiffData.length);
            mapInstances.current = mapInstances.current.slice(0, tiffData.length);
            boundsRefs.current = boundsRefs.current.slice(0, tiffData.length);
            layerRefs.current = layerRefs.current.slice(0, tiffData.length);
            fullscreenButtonRefs.current = fullscreenButtonRefs.current.slice(0, tiffData.length);

            tiffData.forEach((tiff, index) => {
                if (mapRefs.current[index] && mapInstances.current[index]) {
                    renderMapLayers(filters.geojson, filters.bbox, tiff, index);
                }
            });
        }
    }, [tiffData, filters, renderReady]);

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

    const downloadTiff = (arrayBuffer, filename) => {
        const blob = new Blob([arrayBuffer], { type: "image/tiff" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getGridLayout = (tiffCount) => {
        return { xs: 12, height: tiffCount === 1 ? "100%" : "500px" };
    };

    const gridLayout = getGridLayout(tiffData.length);

    return (
        <Box sx={{ height: "100%", overflow: "hidden", padding: "0 10px" }}>
            <Box sx={{ p: "0 16px", marginTop: "0px" }} className="breadTextFont">
                {breadcrumbData ? (
                    <Breadcrumbs aria-label="breadcrumb" separator=">" sx={{ fontSize: "14px" }}>
                        {Object.entries(breadcrumbData).map(([key, value]) =>
                            value ? (
                                <Typography key={key} color="text.primary" sx={{ fontSize: "14px !important" }}>
                                    {value}
                                </Typography>
                            ) : null
                        )}
                    </Breadcrumbs>
                ) : (
                    <Typography color="text.secondary" className="breadText">
                        Loading breadcrumb...
                    </Typography>
                )}
            </Box>
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
                                sx={{
                                    height: "calc(100% - 53px)",
                                    width: "100%",
                                    border: "1px solid #ededed",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    ref={(el) => (mapRefs.current[index] = el)}
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                />
                                {mapLoading && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            zIndex: 1000,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <CircularProgress size={40} color="primary" />
                                    </Box>
                                )}
                                <Box sx={{ position: "absolute", top: "80px", left: "12px", zIndex: 1001 }}>
                                    <Tooltip title={`Download ${tiff.metadata.layer_name}`}>
                                        <IconButton
                                            onClick={() => downloadTiff(tiff.arrayBuffer, `${tiff.metadata.layer_name}.tif`)}
                                            sx={{
                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                boxShadow: 1,
                                                borderRadius: "4px",
                                                padding: "4px",
                                                width: "30px",
                                                height: "30px",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                                                },
                                                transition: "background-color 0.3s",
                                                color: "inherit",
                                            }}
                                            aria-label={`Download ${tiff.metadata.layer_name}`}
                                        >
                                            <svg
                                                style={{ width: "16px", height: "16px" }}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                            </svg>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        position: "absolute",
                                        bottom: (theme) => theme.spacing(5),
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        zIndex: 1000,
                                        padding: (theme) => theme.spacing(1.25, 2.5),
                                        minWidth: { xs: 300, sm: 400 },
                                        backgroundColor: (theme) => theme.palette.background.paper,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: { xs: "11px", sm: "13px" },
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap",
                                                color: (theme) => theme.palette.text.primary,
                                            }}
                                        >
                                            Area under {breadcrumbData?.commodity || "Unknown"}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            {tiff?.legendBase64 && (
                                                <img
                                                    src={tiff.legendBase64}
                                                    alt={`Legend for ${tiff.metadata.layer_name || "layer"}`}
                                                    style={{
                                                        maxWidth: "100%",
                                                        width: { xs: 200, sm: 250 },
                                                        height: "auto",
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} sx={{ height: "100%", position: "relative" }}>
                        <Box
                            ref={(el) => (mapRefs.current[0] = el)}
                            sx={{ height: "100%", width: "100%", border: "0px solid #999" }}
                        />
                        {mapLoading && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 1000,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CircularProgress size={40} color="primary" />
                            </Box>
                        )}
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default MapViewer;