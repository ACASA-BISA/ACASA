import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import "../../src/index.css";

// DynamicColorTooltip for Seasonal Rainfall
const DynamicColorTooltip = styled(({ bgColor, textColor, className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow placement="top-start" />
))(({ bgColor, textColor }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 6,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
    maxWidth: 240,
    lineHeight: 1.4,
    fontWeight: 400,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: bgColor,
  },
}));

const MapLegend = ({ tiff, breadcrumbData, layerType, apiUrl, legendType, showHeader = true, glance = false, hazards = false, legendData }) => {
  const theme = useTheme();
  const [localLegendData, setLocalLegendData] = useState(null);
  const [error, setError] = useState(null);

  // Cache for legend data to prevent redundant API calls
  const legendCache = useMemo(() => new Map(), []);

  // Calculate responsive width and font sizes based on screen width
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200; // Fallback for SSR
  let maxLegendWidth = Math.min(screenWidth * (legendType === "Large" ? 0.30 : 0.25), 450); // 30% for Large, 25% for Small, capped at 450px
  maxLegendWidth = glance && hazards ? 320 : glance && !hazards ? 450 : maxLegendWidth; // Preserve glance/hazards overrides
  const minLegendWidth = maxLegendWidth * 0.7; // Minimum width is 70% of max
  const baseFontSize = Math.max(10, Math.min(maxLegendWidth * 0.03, 13)); // Font size based on maxLegendWidth
  const smallFontSize = baseFontSize * 0.9;
  const tinyFontSize = baseFontSize * 0.8;

  // Helper functions
  const checkcrop = () => {
    const diffcrop = ["cattle", "buffalo", "goat", "sheep", "pig", "chicken"];
    return !diffcrop.includes(breadcrumbData?.commodityLabel?.toLowerCase());
  };

  const calcpop = (popu) => {
    const value = Number(popu) || 0; // Ensure numeric value
    if (value === 0) return "0"; // Handle exactly 0, no suffix
    if (value <= 100_000) return "< 0.1 M"; // Handle 0 < value ≤ 100,000
    const popInMillions = value / 1_000_000;
    return popInMillions.toFixed(1) + " M";
  };

  const calcarea = (popu) => {
    const value = Number(popu) || 0; // Ensure numeric value
    const unit = checkcrop() ? " Mha" : " M";
    if (value === 0) return "0"; // Handle exactly 0, no suffix
    if (value <= 100_000) return `< 0.1${unit}`; // Handle 0 < value ≤ 100,000
    const areaInMillions = value / 1_000_000;
    return areaInMillions.toFixed(1) + unit;
  };

  // Generate canvas for commodity layer
  const generateLegendCanvas = async (colorRamp) => {
    const canvas = document.createElement("canvas");
    canvas.width = maxLegendWidth * 0.6;
    canvas.height = 40;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    colorRamp.forEach((color, index) => {
      gradient.addColorStop(index / (colorRamp.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 20);

    ctx.fillStyle = "#000";
    ctx.font = `${tinyFontSize}px Arial`;
    ctx.textAlign = "left";
    ctx.fillText("Low", 0, 35);
    ctx.textAlign = "right";
    ctx.fillText("High", canvas.width, 35);

    return {
      canvas,
      labels: { min: "Low", max: "High" },
    };
  };

  // Fetch legend data with retry logic
  const fetchWithRetry = async (url, options, retries = 1, backoff = 300) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response;
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
      }
    }
  };

  // Fetch or use legend data
  useEffect(() => {
    const fetchLegendData = async () => {
      if (layerType?.toLowerCase() === "commodity" && tiff?.metadata?.color_ramp) {
        try {
          const legendCanvas = await generateLegendCanvas(tiff.metadata.color_ramp);
          setLocalLegendData({ base64: legendCanvas.canvas.toDataURL() });
          setError(null);
        } catch (err) {
          console.error("Error generating legend canvas:", err);
          setLocalLegendData(null);
          setError("Failed to generate legend canvas");
        }
        return;
      }

      try {
        if (!tiff?.metadata?.layer_id) {
          console.warn(`Missing layer_id for layerType: ${layerType}`);
          setLocalLegendData(null);
          setError("Missing layer ID");
          return;
        }

        const cacheKey = JSON.stringify({
          layer_type: layerType?.toLowerCase(),
          layer_id: tiff.metadata.layer_id,
          climate_scenario_id: tiff.metadata.year ? breadcrumbData?.climate_scenario_id : 1,
          year: tiff.metadata.year || null,
          change_metric_id: breadcrumbData?.change_metric_id || 1, // Include change_metric_id in cache key
        });

        if (legendCache.has(cacheKey)) {
          setLocalLegendData(legendCache.get(cacheKey));
          setError(null);
          return;
        }

        const payload = {
          adaptation_croptab_id: breadcrumbData?.adaptation_croptab_id || null,
          layer_type: layerType?.toLowerCase(),
          country_id: breadcrumbData?.country_id || null,
          state_id: breadcrumbData?.state_id || null,
          commodity_id: breadcrumbData?.commodity_id || null,
          climate_scenario_id: (tiff.metadata.year || hazards) ? breadcrumbData?.climate_scenario_id : 1,
          year: tiff.metadata.year || null,
          data_source_id: breadcrumbData?.data_source_id || null,
          visualization_scale_id: breadcrumbData?.visualization_scale_id || null,
          layer_id: tiff.metadata.layer_id,
          intensity_metric_id: breadcrumbData?.intensity_metric_id || null,
          change_metric_id: (tiff.metadata.year || hazards) ? breadcrumbData?.change_metric_id : 1, // Use change_metric_id
        };

        const response = await fetchWithRetry(`${apiUrl}/layers/legend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!result.success || !result.data) throw new Error("No valid legend data returned");
        const data = {
          ...result.data,
          legend: result.data.legend?.filter(
            (item) => item.base_category?.toLowerCase() !== "nil" && item.named_category?.toLowerCase() !== "nil"
          ) || [],
        };
        legendCache.set(cacheKey, data);
        setLocalLegendData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching legend data:", err);
        setLocalLegendData(null);
        setError("Failed to load legend data. Please try again later.");
      }
    };

    fetchLegendData();
  }, [
    tiff?.metadata?.layer_id,
    tiff?.metadata?.year,
    layerType,
    breadcrumbData?.climate_scenario_id,
    breadcrumbData?.adaptation_croptab_id,
    breadcrumbData?.data_source_id,
    breadcrumbData?.visualization_scale_id,
    breadcrumbData?.intensity_metric_id,
    breadcrumbData?.change_metric_id, // Added change_metric_id
    apiUrl,
    hazards,
  ]);

  // Render categorical legend for risk, impact, adaptation
  const renderRiskLegend = () => {
    if (!localLegendData || !localLegendData.legend) return null;

    const sortedLegend = [...localLegendData.legend].sort((a, b) => {
      if (a.base_category?.toLowerCase() === 'na') return -1; // Place 'NA' first
      if (b.base_category?.toLowerCase() === 'na') return 1;
      return 0; // Preserve original order for others
    });

    // Check if any legend item has secondaryText (contains \n)
    const hasSecondaryText = sortedLegend.some(
      (item) => item.named_category && item.named_category.includes("\n")
    );

    const RiskName = localLegendData.header_text?.toLowerCase().includes("seasonal rainfall")
      ? "Seasonal Rainfall"
      : localLegendData.header_text;

    // Split header_text around header_bold_part for bold formatting
    let headerComponents = [];
    if (localLegendData.header_text && localLegendData.header_bold_part) {
      const regex = new RegExp(`(${localLegendData.header_bold_part})`, "i"); // Case-insensitive match
      const parts = localLegendData.header_text.split(regex);
      headerComponents = parts.map((part, index) =>
        part.toLowerCase() === localLegendData.header_bold_part.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        )
      );
    } else {
      headerComponents = [<strong key={0}>{localLegendData.header_text}</strong>];
    }

    return (
      <Box sx={{ maxWidth: maxLegendWidth, minWidth: minLegendWidth }}>
        {showHeader && (
          <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: baseFontSize,
                margin: "5px 0 2px 0",
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              {headerComponents}
            </Typography>
          </Box>
        )}

        {localLegendData.population_text && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-2px" }}>
            <Typography
              sx={{
                fontSize: smallFontSize,
                marginBottom: "2px",
                color: theme.palette.mode === "dark" ? "white" : "black",
                "& span": { color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111", fontStyle: "italic" },
              }}
            >
              <span>{localLegendData.population_text}</span>
            </Typography>
          </Box>
        )}

        <Typography variant="body1">
          <Box sx={{ display: "flex", flexDirection: "row", gap: "4px", flexWrap: "wrap", justifyContent: "center", marginTop: "-5px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: "2px" }}>
              {sortedLegend.map((item, index) => {
                const isRainfall = RiskName === "Seasonal Rainfall";
                const isNA = item.base_category?.toLowerCase() === "na";
                const textColor = isRainfall
                  ? ["<25 mm", "25-50 mm"].map((c) => c.toLowerCase()).includes(item.named_category?.toLowerCase())
                    ? "#111"
                    : "white"
                  : item.text_color || "black";
                const [primaryText, secondaryText] = item.named_category ? item.named_category.split("\n") : [item.named_category, ""];

                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "left",
                      flexDirection: "column",
                      width: "100%",
                      gap: "2px",
                    }}
                  >
                    <Box sx={{ maxWidth: maxLegendWidth / 5, height: glance ? 15 : 18, borderRadius: 0, marginBottom: "-4px" }}>
                      <Typography
                        sx={{
                          fontSize: tinyFontSize,
                          margin: glance ? "0" : "2px",
                          color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                        }}
                      >
                        {!isNA ? calcpop(item.population_value) : ""}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        maxWidth: maxLegendWidth / 5,
                        height: hasSecondaryText ? (glance ? 24 : 28) : (glance ? 15 : 18),
                        borderRadius: 0,
                        bgcolor: item.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: primaryText?.toLowerCase().includes("50-75 mm") || primaryText?.toLowerCase().includes("medium ") ? "center" : "flex-start",
                        cursor: isRainfall ? "pointer" : "default",
                      }}
                    >
                      {isRainfall ? (
                        <DynamicColorTooltip
                          bgColor={item.color}
                          textColor={textColor}
                          title={<Typography fontSize={smallFontSize}>This is dummy information about rainfall category.</Typography>}
                        >
                          <Typography
                            sx={{
                              fontSize: tinyFontSize,
                              marginX: primaryText?.toLowerCase().includes("50-75 mm") ? "0px" : "3px",
                              color: textColor,
                            }}
                            align={primaryText?.toLowerCase().includes("50-75 mm") ? "center" : "left"}
                          >
                            <span
                              style={{
                                display: "block",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                lineHeight: "1.3",
                                fontWeight: "bold",
                                fontSize: secondaryText ? tinyFontSize : tinyFontSize,
                              }}
                            >
                              {primaryText}
                              {secondaryText && (
                                <>
                                  <br />
                                  <span style={{ fontSize: tinyFontSize * 0.8, fontWeight: "normal", fontStyle: "italic" }}>{secondaryText}</span>
                                </>
                              )}
                            </span>
                          </Typography>
                        </DynamicColorTooltip>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: tinyFontSize,
                            marginX: primaryText?.toLowerCase().includes("medium ") ? "0px" : "3px",
                            color: textColor,
                          }}
                          align={primaryText?.toLowerCase().includes("medium ") ? "center" : "left"}
                        >
                          <span
                            style={{
                              display: "block",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: "1.3",
                              fontWeight: "bold",
                              fontSize: secondaryText ? tinyFontSize : tinyFontSize,
                            }}
                          >
                            {primaryText}
                            {secondaryText && (
                              <>
                                <br />
                                <span>{secondaryText}</span>
                              </>
                            )}
                          </span>
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ maxWidth: maxLegendWidth / 5, height: glance ? 15 : 18, borderRadius: 0 }}>
                      <Typography
                        sx={{
                          fontSize: tinyFontSize,
                          margin: glance ? "0" : "2px",
                          marginTop: "0px",
                          color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                        }}
                      >
                        {!isNA ? calcarea(item.commodity_value) : ""}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Typography>

        {localLegendData.commodity_text && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-2px" }}>
            <Typography
              sx={{
                fontSize: smallFontSize,
                margin: glance ? "-2px 0" : "2px",
                color: theme.palette.mode === "dark" ? "white" : "black",
                "& span": { color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111", fontStyle: "italic" },
              }}
            >
              <span>
                {checkcrop()
                  ? `${breadcrumbData?.commodityLabel ?? "Cropped"} area, million hectare (Mha)`
                  : `Number of ${breadcrumbData?.commodityLabel?.toLowerCase()}${breadcrumbData?.commodityLabel?.toLowerCase() === "buffalo" ? "es" : breadcrumbData?.commodityLabel?.toLowerCase() === "sheep" || breadcrumbData?.commodityLabel?.toLowerCase() === "cattle" ? "" : "s"}, million (M)`}
              </span>
            </Typography>
          </Box>
        )}

        {localLegendData.footer_text && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-2px" }}>
            <Typography
              sx={{
                fontSize: tinyFontSize,
                margin: glance ? "-2px 0" : "2px",
                color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                fontStyle: "italic",
              }}
            >
              {localLegendData.footer_text}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  // Render gradient legend for commodity
  const renderDefaultLegend = () => {
    if (!breadcrumbData?.commodityLabel) return null;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }} color="text.primary">
          {checkcrop() ? `Area under ${breadcrumbData.commodityLabel.toLowerCase()}` : `${breadcrumbData.commodityLabel} population`}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 12,
              borderRadius: 6,
              background: "linear-gradient(to right, #fff9c4, #ffe680, #ffd700, #daa520, #a0522d, #6b3d1b)",
              marginBottom: 0.5,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {["Very Low", "Low", "Medium", "High", "Very High"].map((label) => (
              <Typography key={label} sx={{ fontSize: 11, color: "text.secondary" }}>
                {label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    );
  };

  // Render fallback UI for errors
  const renderErrorLegend = () => {
    return (
      <Box sx={{ maxWidth: maxLegendWidth, minWidth: minLegendWidth, textAlign: "center" }}>
        <Typography sx={{ fontSize: baseFontSize, color: theme.palette.error.main }}>
          {error}
        </Typography>
      </Box>
    );
  };

  // Determine which legend to render based on layerType
  const legendContent =
    error ? renderErrorLegend() :
      ["risk", "impact", "adaptation", "adaptation_croptab"].includes(layerType?.toLowerCase())
        ? renderRiskLegend()
        : renderDefaultLegend();

  // Conditionally render the Paper only if there is valid content
  if (!legendContent) return null;

  return (
    <Paper
      elevation={1}
      sx={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        borderRadius: "5px",
        boxShadow: "0px 0px 0px #aaa",
        minWidth: minLegendWidth,
        maxWidth: maxLegendWidth,
        backgroundColor: theme.palette.background.paper,
        padding: "8px",
      }}
      role="tooltip"
      data-popper-placement="bottom"
    >
      {legendContent}
    </Paper>
  );
};

export default MapLegend;