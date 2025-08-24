// src/components/DownloadDropdown.js
import React, { useState, useRef, useEffect } from "react";
import { Box, Tooltip, IconButton } from "@mui/material";

const DownloadDropdown = ({ layerName, layerType, mapIndex, onDownloadGeoTIFF, onDownloadTable, onDownloadImage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Debug log to confirm component rendering
    useEffect(() => {
        console.log(`DownloadDropdown rendered for layer: ${layerName}, mapIndex: ${mapIndex}`);
    }, [layerName, mapIndex]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Box sx={{ position: "absolute", top: "80px", left: "12px", zIndex: 1001 }}>
            <Tooltip title={`Download ${layerName || "Baseline"}`}>
                <IconButton
                    onClick={() => {
                        setIsOpen(!isOpen);
                        console.log(`Download icon clicked for ${layerName}, dropdown isOpen: ${!isOpen}`);
                    }}
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
                    aria-label={`Download ${layerName || "Baseline"}`}
                    aria-expanded={isOpen}
                >
                    <svg
                        style={{ width: "16px", height: "16px" }}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            fill="currentColor"
                            d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"
                        />
                    </svg>
                </IconButton>
            </Tooltip>
            <Box
                ref={dropdownRef}
                className="download-dropdown"
                sx={{
                    display: isOpen ? "block" : "none",
                    position: "absolute",
                    top: "0",
                    left: "33px",
                    background: "white",
                    borderRadius: "5px",
                    padding: "5px",
                    boxShadow: "rgba(0, 0, 0, 0.3) 2px 2px 5px",
                    zIndex: 1000,
                }}
            >
                <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        onDownloadGeoTIFF();
                        setIsOpen(false);
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onDownloadGeoTIFF();
                            setIsOpen(false);
                        }
                    }}
                >
                    Download GeoTIFF
                </Box>
                <Box
                    sx={{
                        width: "150px",
                        height: "1px",
                        backgroundColor: "rgb(204, 204, 204)",
                        marginTop: "4px",
                    }}
                />
                {layerType !== 'commodity' &&
                    (
                        <><Box
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                onDownloadTable();
                                setIsOpen(false);
                            }}
                            role="menuitem"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    onDownloadTable();
                                    setIsOpen(false);
                                }
                            }}
                        >
                            Download Table
                        </Box>
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "1px",
                                    backgroundColor: "rgb(204, 204, 204)",
                                    marginTop: "4px",
                                }}
                            />
                        </>
                    )
                }
                <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        onDownloadImage();
                        setIsOpen(false);
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onDownloadImage();
                            setIsOpen(false);
                        }
                    }}
                >
                    Download Image
                </Box>
            </Box>
        </Box>
    );
};

export default DownloadDropdown;