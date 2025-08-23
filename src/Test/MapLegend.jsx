// MapLegend.jsx
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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

const MapLegend = ({ tiff, breadcrumbData, layerType, apiUrl, mapWidth, showHeader = true, padding = "10px" }) => {
  const theme = useTheme();
  const [legendData, setLegendData] = useState(null);

  // Calculate responsive width and font sizes
  const maxLegendWidth = mapWidth ? Math.min(mapWidth, 450) : 450; // 80% of map width, capped at 450px
  console.log({ maxLegendWidth })
  const baseFontSize = mapWidth ? Math.max(10, Math.min(mapWidth * 0.03, 13)) : 11; // Scale font size
  const smallFontSize = baseFontSize * 0.9;
  const tinyFontSize = baseFontSize * 0.8;

  // Helper functions
  const checkcrop = () => {
    const diffcrop = ["cattle", "buffalo", "goat", "sheep", "pig", "chicken"];
    return !diffcrop.includes(breadcrumbData?.commodityLabel?.toLowerCase());
  };

  const calcpop = (popu) => {
    if (popu === 0) return "0";
    const popInMillions = popu / 1_000_000;
    if (popInMillions < 0.1) {
      return layerType === "Absolute" ? "<0.1 M" : popInMillions.toFixed(1) + " M";
    }
    return popInMillions.toFixed(1) + " M";
  };

  const calcarea = (popu) => {
    if (popu === 0) return "0";
    const unit = checkcrop() ? " Mha" : " M";
    const areaInMillions = popu / 1_000_000;
    if (areaInMillions < 0.1) {
      return layerType === "Absolute" ? `<0.1${unit}` : areaInMillions.toFixed(1) + unit;
    }
    return areaInMillions.toFixed(1) + unit;
  };

  // Generate canvas for non-risk layers
  const generateLegendCanvas = async (colorRamp) => {
    const canvas = document.createElement("canvas");
    canvas.width = maxLegendWidth * 0.6; // 60% of legend width for gradient
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

  // Fetch legend data
  useEffect(() => {
    const fetchLegendData = async () => {
      if (layerType?.toLowerCase() !== "risk") {
        if (tiff?.metadata?.color_ramp) {
          try {
            const legendData = await generateLegendCanvas(tiff.metadata.color_ramp);
            setLegendData({ base64: legendData.canvas.toDataURL() });
          } catch (err) {
            console.error("Error generating legend canvas:", err);
            setLegendData(null);
          }
        } else {
          setLegendData(null);
        }
        return;
      }

      if (!tiff?.metadata?.layer_id) {
        setLegendData(null);
        return;
      }

      try {
        const payload = {
          layer_type: layerType,
          country_id: breadcrumbData?.country_id || null,
          state_id: breadcrumbData?.state_id || null,
          commodity_id: breadcrumbData?.commodity_id || null,
          climate_scenario_id: tiff.metadata.year ? breadcrumbData?.climate_scenario_id : 1,
          year: tiff.metadata.year || null,
          data_source_id: breadcrumbData?.data_source_id || null,
          visualization_scale_id: breadcrumbData?.visualization_scale_id || null,
          layer_id: tiff.metadata.layer_id,
        };

        const response = await fetch(`${apiUrl}/layers/legend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Legend API error! Status: ${response.status}`);
        const { success, data } = await response.json();
        if (!success || !data) throw new Error("No valid legend data returned");
        setLegendData({
          ...data,
          legend: data.legend?.filter((item) => item.base_category?.toLowerCase() !== "nil") || [],
        });
      } catch (err) {
        console.error("Error fetching legend data:", err);
        setLegendData(null);
      }
    };

    fetchLegendData();
  }, [tiff, layerType, apiUrl, breadcrumbData]);

  // Render risk legend
  const renderRiskLegend = () => {
    if (!legendData || !legendData.legend) return null;

    return (
      <div style={{ maxWidth: maxLegendWidth, minWidth: maxLegendWidth * 0.7 }}>
        {showHeader &&
          <div>
            <Typography
              variant="body1"
              sx={{
                fontSize: baseFontSize,
                fontWeight: "bold",
                color: theme.palette.mode === "dark" ? "white" : "black",
                marginBottom: "2px",
              }}
            >
              {legendData.header_text?.toLowerCase() === "seasonal rainfall"
                ? "Seasonal rainfall"
                : legendData.header_text || "Legend"}
            </Typography>
          </div>}

        {legendData.population_text && (
          <div>
            <Typography
              variant="body1"
              sx={{
                fontSize: smallFontSize,
                color: theme.palette.mode === "dark" ? "white" : "black",
                marginBottom: "2px",
                "& span": { color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111", fontStyle: "italic" },
              }}
            >
              <span>Number of rural farm households, million (M)</span>
            </Typography>
          </div>
        )}
        <Typography variant="body1">
          <div>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
              {legendData.legend.map((item, index) => (
                <div key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "left",
                      flexDirection: "column",
                      width: "100%",
                      gap: "2px",
                    }}
                  >
                    <Box sx={{ maxWidth: maxLegendWidth / 5, height: 18, borderRadius: 0, marginBottom: "-4px" }}>
                      <Typography
                        sx={{
                          fontSize: tinyFontSize,
                          margin: "2px",
                          color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                        }}
                      >
                        {calcpop(item.population_value)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        maxWidth: maxLegendWidth / 5,
                        height: 18,
                        borderRadius: 0,
                        bgcolor: item.color,
                        alignContent: "center",
                        cursor: legendData.header_text?.toLowerCase() === "seasonal rainfall" ? "pointer" : "default",
                      }}
                    >
                      {legendData.header_text?.toLowerCase() === "seasonal rainfall" ? (
                        <DynamicColorTooltip
                          bgColor={item.color}
                          textColor={["<25 mm", "25-50 mm"].map(c => c.toLowerCase()).includes(item.named_category?.toLowerCase()) ? "#111" : "white"}
                          title={<Typography fontSize={smallFontSize}>This is dummy information about rainfall category.</Typography>}
                        >
                          <Typography
                            sx={{
                              fontSize: tinyFontSize,
                              marginY: "auto",
                              marginX: item.named_category?.toLowerCase().includes("50-75 mm") ? "0px" : "3px",
                              color: ["<25 mm", "25-50 mm"].map(c => c.toLowerCase()).includes(item.named_category?.toLowerCase()) ? "#111" : "white",
                            }}
                            align={item.named_category?.toLowerCase().includes("50-75 mm") ? "center" : "left"}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                lineHeight: "2",
                                fontWeight: "bold",
                                fontSize: tinyFontSize,
                              }}
                            >
                              {item.named_category}
                            </span>
                          </Typography>
                        </DynamicColorTooltip>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: tinyFontSize,
                            marginY: "auto",
                            marginX: item.named_category?.toLowerCase().includes("medium ") ? "0px" : "3px",
                            color: index <= 4 && index >= 2 ? "#111" : "white",
                          }}
                          align={item.named_category?.toLowerCase().includes("medium ") ? "center" : "left"}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: "2",
                              fontWeight: "bold",
                              fontSize: tinyFontSize,
                            }}
                          >
                            {item.named_category}
                          </span>
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ maxWidth: maxLegendWidth / 5, height: 18, borderRadius: 0 }}>
                      <Typography
                        sx={{
                          fontSize: tinyFontSize,
                          margin: "2px",
                          marginTop: "0px",
                          color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                        }}
                      >
                        {calcarea(item.commodity_value)}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              ))}
            </Box>
          </div>
        </Typography>
        {legendData.commodity_text && (
          <div>
            <Typography
              variant="body1"
              sx={{
                fontSize: smallFontSize,
                color: theme.palette.mode === "dark" ? "white" : "black",
                marginBottom: "2px",
                "& span": { color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111", fontStyle: "italic" },
              }}
            >
              <span>
                {checkcrop()
                  ? `${breadcrumbData?.commodityLabel} area, million hectare (Mha)`
                  : `Number of ${breadcrumbData?.commodityLabel?.toLowerCase()}${breadcrumbData?.commodityLabel?.toLowerCase() === "buffalo"
                    ? "es"
                    : breadcrumbData?.commodityLabel?.toLowerCase() === "sheep" || breadcrumbData?.commodityLabel?.toLowerCase() === "cattle"
                      ? ""
                      : "s"
                  }, million (M)`}
              </span>
            </Typography>
          </div>
        )}
        {legendData.footer_text && (
          <div>
            <Typography
              variant="body1"
              sx={{
                fontSize: tinyFontSize,
                color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                fontStyle: "italic",
                margin: "2px",
              }}
            >
              {legendData.footer_text}
            </Typography>
          </div>
        )}
      </div>
    );
  };

  // Render non-risk legend
  const renderDefaultLegend = () => {
    if (!legendData?.base64 || !breadcrumbData?.commodityLabel) return null;

    return (
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: baseFontSize,
            fontWeight: "bold",
            whiteSpace: "wrap",
            color: theme.palette.mode === "dark" ? "white" : "black",
          }}
        >
          {`Area under: ${breadcrumbData.commodityLabel || "Unknown"}`}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={legendData.base64}
            alt={`Legend for ${tiff.metadata.layer_name || "layer"}`}
            style={{ maxWidth: "100%", width: maxLegendWidth * 0.6, height: "auto", loading: "lazy" }}
          />
        </Box>
      </Box>
    );
  };

  // Conditionally render the Paper only if there is valid content
  const legendContent = layerType?.toLowerCase() === "risk" ? renderRiskLegend() : renderDefaultLegend();
  if (!legendContent) return null;

  return (
    <Paper
      elevation={1}
      sx={{
        position: "absolute",
        bottom: theme.spacing(5),
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        padding: padding,
        borderRadius: "5px",
        boxShadow: "0px 0px 0px #aaa",
        minWidth: maxLegendWidth * 0.7,
        maxWidth: mapWidth,
        backgroundColor: theme.palette.background.paper,
        bottom: "0px",
      }}
      role="tooltip"
      data-popper-placement="bottom"
    >
      {legendContent}
    </Paper>
  );
};

export default MapLegend;