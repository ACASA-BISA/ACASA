import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Paper, Tooltip, IconButton, CircularProgress, Breadcrumbs, Link, Typography, Menu, MenuItem, } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import HomeIcon from "@mui/icons-material/Home";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fromArrayBuffer } from "geotiff";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import leafletImage from "leaflet-image";
import screenfull from "screenfull";

// Custom Leaflet control for Fullscreen, Fit-to-Extent, and Home buttons
L.Control.MapControls = L.Control.extend({
    options: {
        position: "topright",
    },
    onAdd: function (map) {
        const container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");

        // Fullscreen Button
        const fullscreenButton = L.DomUtil.create("a", "leaflet-control-button", container);
        fullscreenButton.innerHTML = this.options.isFullscreen
            ? '<svg class="MuiSvgIcon-root" style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M5 16h3v3H5v-3zm3-6H5v3h3v-3zm6 6h3v3h-3v-3zm3-6h-3v3h3v-3z" /></svg>'
            : '<svg class="MuiSvgIcon-root" style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>';
        fullscreenButton.href = "#";
        fullscreenButton.title = this.options.isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";
        L.DomEvent.on(fullscreenButton, "click", (e) => {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this.options.onFullscreen();
            fullscreenButton.innerHTML = this.options.isFullscreen
                ? '<svg class="MuiSvgIcon-root" style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>'
                : '<svg class="MuiSvgIcon-root" style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M5 16h3v3H5v-3zm3-6H5v3h3v-3zm6 6h3v3h-3v-3zm3-6h-3v3h3v-3z" /></svg>';
        });

        // Fit-to-Extent Button
        const fitExtentButton = L.DomUtil.create("a", "leaflet-control-button", container);
        fitExtentButton.innerHTML = '<svg class="MuiSvgIcon-root" style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h4v2H4v4H2V4h2zm16 0h-4v2h4v4h2V4h-2zM4 20h4v-2H4v-4H2v6h2zm16 0h-4v-2h4v-4h2v6h-2z" /></svg>';
        fitExtentButton.href = "#";
        fitExtentButton.title = "Fit to Extent";
        L.DomEvent.on(fitExtentButton, "click", (e) => {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this.options.onFitExtent();
        });

        // Home Button
        const homeButton = L.DomUtil.create("a", "leaflet-control-button", container);
        homeButton.innerHTML = '<svg class="MuiSvgIcon-root" style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>';
        homeButton.href = "#";
        homeButton.title = "Reset to Home View";
        L.DomEvent.on(homeButton, "click", (e) => {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this.options.onHome();
        });

        // Styling for buttons
        container.style.backgroundColor = "#fff";
        container.style.border = "2px solid rgba(0,0,0,0.2)";
        container.style.borderRadius = "4px";
        const buttons = container.getElementsByTagName("a");
        for (let btn of buttons) {
            btn.style.display = "block";
            btn.style.padding = "4px";
            btn.style.textAlign = "center";
            btn.style.lineHeight = "40px";
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

function MapViewer({ drawerOpen, filters, geojsonData, apiUrl }) {
    const mapRefs = useRef([]);
    const mapInstances = useRef([]);
    const layerRefs = useRef([]);
    const boundsRefs = useRef([]);
    const [mapLoading, setMapLoading] = useState(false);
    const [tiffData, setTiffData] = useState([]);
    const [renderReady, setRenderReady] = useState(false);
    const [breadcrumbData, setBreadcrumbData] = useState(null);
    const [anchorEl, setAnchorEl] = useState({});
    const [isFullscreen, setIsFullscreen] = useState([]);
    const initialCenter = [20, 77];
    const initialZoom = 5;

    // Initialize maps and add controls
    useEffect(() => {
        if (!tiffData.length || !mapRefs.current.length) return;

        mapRefs.current.forEach((mapRef, index) => {
            if (!mapRef || mapInstances.current[index]) return;

            const map = L.map(mapRef, {
                center: initialCenter,
                zoom: initialZoom,
                minZoom: 3,
                maxZoom: 18,
            });
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
            mapInstances.current[index] = map;

            // Add custom controls
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
                onHome: () => {
                    map.setView(initialCenter, initialZoom);
                },
            });
            mapControl.addTo(map);

            // Fix Leaflet icon path issue
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
                iconUrl: "/images/leaflet/marker-icon.png",
                shadowUrl: "/images/leaflet/marker-shadow.png",
            });
        });

        return () => {
            mapInstances.current.forEach((map, index) => {
                if (map) {
                    map.remove();
                    mapInstances.current[index] = null;
                }
            });
            mapRefs.current = [];
            mapInstances.current = [];
            boundsRefs.current = [];
            setIsFullscreen([]);
            setAnchorEl({});
        };
    }, [tiffData.length]);

    // Resize maps when drawer toggles or fullscreen changes
    useEffect(() => {
        mapInstances.current.forEach((map) => {
            if (map && map.invalidateSize) {
                setTimeout(() => map.invalidateSize(), 300);
            }
        });
    }, [drawerOpen, tiffData.length, isFullscreen]);

    // Fetch TIFF data and breadcrumb data
    useEffect(() => {
        if (!filters || !geojsonData) return;

        const fetchTiffData = async () => {
            setMapLoading(true);
            setTiffData([]);
            setRenderReady(false);
            setBreadcrumbData(null);
            setIsFullscreen([]);
            setAnchorEl({});

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

                setBreadcrumbData({ mask, commodity, level, model, scenario });

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

                    const legendCanvas = generateLegendCanvas(file.ramp);
                    const legendUrl = legendCanvas.toDataURL();

                    return {
                        arrayBuffer,
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
    }, [filters, geojsonData, apiUrl]);

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
        if (!mapInstances.current[index] || !geoJson || !bbox || !tiff || !renderReady) return;
        const map = mapInstances.current[index];

        if (layerRefs.current[index]) {
            layerRefs.current[index].forEach((layer) => map.removeLayer(layer));
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
        parseGeoraster(arrayBuffer)
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
        if (tiffData.length && geojsonData && renderReady) {
            mapRefs.current = mapRefs.current.slice(0, tiffData.length);
            mapInstances.current = mapInstances.current.slice(0, tiffData.length);
            boundsRefs.current = boundsRefs.current.slice(0, tiffData.length);
            tiffData.forEach((tiff, index) => {
                renderMapLayers(geojsonData.geojson, geojsonData.bbox, tiff, index);
            });
        }
    }, [tiffData, geojsonData, renderReady]);

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
        <Box sx={{ height: "100%", overflow: "hidden" }}>
            <Box sx={{ p: '0 16px' }} className="breadTextFont">
                {breadcrumbData ? (
                    <Breadcrumbs aria-label="breadcrumb" separator=">">
                        {breadcrumbData.mask && (
                            <Link underline="hover" color="inherit">
                                {breadcrumbData.mask}
                            </Link>
                        )}
                        {breadcrumbData.commodity && (
                            <Link underline="hover" color="inherit">
                                {breadcrumbData.commodity}
                            </Link>
                        )}
                        {breadcrumbData.level && (
                            <Link underline="hover" color="inherit">
                                {breadcrumbData.level}
                            </Link>
                        )}
                        {breadcrumbData.model && (
                            <Link underline="hover" color="inherit">
                                {breadcrumbData.model}
                            </Link>
                        )}
                        {breadcrumbData.scenario && (
                            <Typography color="text.primary" aria-current="page">
                                {breadcrumbData.scenario}
                            </Typography>
                        )}
                    </Breadcrumbs>
                ) : (
                    <Typography color="text.secondary" className="breadText">Loading breadcrumb...</Typography>
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
                                    bgcolor: "#EDEDED",
                                    height: "30px",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <Typography className="">{tiff.metadata.layer_name || "Baseline"}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    height: "calc(100% - 30px)",
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
                                <Box sx={{ position: "absolute", top: "15%", left: "1%", zIndex: 1000 }}>
                                    <Tooltip title={`Download ${tiff.metadata.layer_name}`}>
                                        <IconButton
                                            onClick={() =>
                                                downloadTiff(tiff.arrayBuffer, `${tiff.metadata.layer_name}.tif`)
                                            }
                                            sx={{
                                                backgroundColor: "white",
                                                boxShadow: 1,
                                                borderRadius: "4px",
                                                padding: "4px",
                                                width: "30px",
                                                height: "30px",
                                                "&:hover": {
                                                    backgroundColor: "white", // Prevent hover from making it transparent
                                                },
                                            }}
                                            aria-label={`Download ${tiff.metadata.layer_name}`}
                                        >
                                            <svg
                                                style={{ width: "16px", height: "16px" }}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"
                                                />
                                            </svg>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Paper
                                    elevation={3}
                                    sx={{ position: "absolute", bottom: 16, right: 16, zIndex: 1000, fontSize: "14px" }}
                                >
                                    <Box sx={{ textAlign: "center", padding: 1 }}>{tiff.metadata.layer_name}</Box>
                                    <img src={tiff.legendBase64} alt="Legend" style={{ maxWidth: "200px" }} />
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