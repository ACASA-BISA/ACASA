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

const MapLegend = ({ tiff, breadcrumbData, layerType, apiUrl }) => {
  const theme = useTheme();
  const [legendData, setLegendData] = useState(null);

  // Helper functions from Legend_Small.jsx
  const checkcrop = () => {
    const diffcrop = ["cattle", "buffalo", "goat", "sheep", "pig", "chicken"];
    return !diffcrop.includes(breadcrumbData?.commodity?.toLowerCase());
  };

  const calcpop = (popu) => {
    if (popu === 0) return "0";
    const popInMillions = popu / 1_000_000; // Assume API returns raw units
    if (popInMillions < 0.1) {
      return layerType === "Absolute" ? "<0.1 M" : popInMillions.toFixed(1) + " M";
    }
    return popInMillions.toFixed(1) + " M";
  };

  const calcarea = (popu) => {
    if (popu === 0) return "0";
    const unit = checkcrop() ? " Mha" : " M";
    const areaInMillions = popu / 1_000_000; // Assume API returns raw units
    if (areaInMillions < 0.1) {
      return layerType === "Absolute" ? `<0.1${unit}` : areaInMillions.toFixed(1) + unit;
    }
    return areaInMillions.toFixed(1) + unit;
  };

  // Function to generate canvas for non-risk layers
  const generateLegendCanvas = async (colorRamp) => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 40;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 200, 0);
    colorRamp.forEach((color, index) => {
      gradient.addColorStop(index / (colorRamp.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 20);

    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Low", 0, 35);
    ctx.textAlign = "right";
    ctx.fillText("High", 200, 35);

    return {
      canvas,
      labels: { min: "Low", max: "High" },
    };
  };

  // Fetch legend data for risk layer or generate canvas for non-risk layers
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
          layer_type: "risk",
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
        setLegendData(data);
      } catch (err) {
        console.error("Error fetching legend data:", err);
        setLegendData(null);
      }
    };

    fetchLegendData();
  }, [tiff, layerType, apiUrl, breadcrumbData]);

  // Render legend for risk layer
  const renderRiskLegend = () => {
    if (!legendData || !legendData.legend) return null;

    return (
      <div style={{ maxWidth: "500px", minWidth: "280px" }}>
        <div className="css-e7t8xt">
          <Typography
            variant="body1"
            sx={{
              fontSize: 11.5,
              fontWeight: "bold",
              color: theme.palette.mode === "dark" ? "white" : "black",
              marginBottom: "2px",
            }}
            className="css-3n90ha"
          >
            {legendData.header_text?.toLowerCase() === "seasonal rainfall" ? "Seasonal rainfall" : legendData.header_text || "Legend"}
          </Typography>
        </div>
        {legendData.population_text && (
          <div className="css-1kgqcmh">
            <Typography
              variant="body1"
              sx={{
                fontSize: 11,
                color: theme.palette.mode === "dark" ? "white" : "black",
                marginBottom: "2px",
                "& span": { color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111", fontStyle: "italic" },
              }}
              className="css-7tocr4"
            >
              <span>Number of rural farm households, million (M)</span>
            </Typography>
          </div>
        )}
        <Typography variant="body1" className="css-av9bhl">
          <div className="css-y8ws96">
            <div />
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
                    className="css-my5uh"
                  >
                    <Box sx={{ width: 63, height: 18, borderRadius: 0, marginBottom: "-4px" }} className="css-131n9v3">
                      <Typography
                        sx={{
                          fontSize: 10,
                          margin: "2px",
                          color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                        }}
                        className="css-ve9das"
                      >
                        {calcpop(item.population_value)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 63,
                        height: 18,
                        borderRadius: 0,
                        bgcolor: item.color,
                        alignContent: "center",
                        cursor: legendData.header_text?.toLowerCase() === "seasonal rainfall" ? "pointer" : "default",
                      }}
                      className={
                        legendData.header_text?.toLowerCase() === "seasonal rainfall" && index === 0
                          ? "css-qpzgzu"
                          : index === 1
                            ? "css-9y66qa"
                            : index === 2
                              ? "css-67plav"
                              : index === 3
                                ? "css-tt78gf"
                                : index === 4
                                  ? "css-f9otmc"
                                  : "css-1v34u7p"
                      }
                    >
                      {legendData.header_text?.toLowerCase() === "seasonal rainfall" ? (
                        <DynamicColorTooltip
                          bgColor={item.color}
                          textColor={["<25 mm", "25-50 mm"].map(c => c.toLowerCase()).includes(item.named_category?.toLowerCase()) ? "#111" : "white"}
                          title={<Typography fontSize={12}>This is dummy information about rainfall category.</Typography>}
                        >
                          <Typography
                            sx={{
                              fontSize: 10,
                              marginY: "auto",
                              marginX: item.named_category?.toLowerCase().includes("50-75 mm") ? "0px" : "3px",
                              color: ["<25 mm", "25-50 mm"].map(c => c.toLowerCase()).includes(item.named_category?.toLowerCase()) ? "#111" : "white",
                            }}
                            align={item.named_category?.toLowerCase().includes("50-75 mm") ? "center" : "left"}
                            className={
                              ["50-75 mm", "75-100 mm", ">100 mm"].map(c => c.toLowerCase()).includes(item.named_category?.toLowerCase())
                                ? "css-1a1q9qf"
                                : "css-9j9cnv"
                            }
                          >
                            <span
                              style={{
                                display: "block",
                                lineHeight: "1.3",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              {item.named_category}
                            </span>
                          </Typography>
                        </DynamicColorTooltip>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: 10,
                            marginY: "auto",
                            marginX: item.named_category?.toLowerCase().includes("medium ") ? "0px" : "3px",
                            color: index <= 4 && index >= 2 ? "#111" : "white",
                          }}
                          align={item.named_category?.toLowerCase().includes("medium ") ? "center" : "left"}
                          className={
                            ["very low", "very high"].map(c => c.toLowerCase()).includes(item.named_category?.toLowerCase())
                              ? "css-1a1q9qf"
                              : "css-9j9cnv"
                          }
                        >
                          <span
                            style={{
                              display: "block",
                              lineHeight: "1.3",
                              fontWeight: "bold",
                              fontSize: "10px",
                            }}
                          >
                            {item.named_category}
                          </span>
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ width: 63, height: 18, borderRadius: 0 }} className="css-vn4hh5">
                      <Typography
                        sx={{
                          fontSize: 10,
                          margin: "2px",
                          marginTop: "0px",
                          color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111",
                        }}
                        className="css-8ewdh6"
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
          <div className="css-1kgqcmh">
            <Typography
              variant="body1"
              sx={{
                fontSize: 11,
                color: theme.palette.mode === "dark" ? "white" : "black",
                marginBottom: "2px",
                "& span": { color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111", fontStyle: "italic" },
              }}
              className="css-7tocr4"
            >
              <span>
                {checkcrop()
                  ? `${breadcrumbData?.commodity} area, million hectare (Mha)`
                  : `Number of ${breadcrumbData?.commodity?.toLowerCase()}${breadcrumbData?.commodity?.toLowerCase() === "buffalo"
                    ? "es"
                    : breadcrumbData?.commodity?.toLowerCase() === "sheep" || breadcrumbData?.commodity?.toLowerCase() === "cattle"
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
                fontSize: 10,
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

  // Render legend for non-risk layers
  const renderDefaultLegend = () => {
    if (!legendData?.base64 || !breadcrumbData?.commodity) return null;

    return (
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 11, sm: 13 },
            fontWeight: "bold",
            whiteSpace: "wrap",
            color: theme.palette.mode === "dark" ? "white" : "black",
          }}
        >
          {`Area under: ${breadcrumbData.commodity || "Unknown"}`}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={legendData.base64}
            alt={`Legend for ${tiff.metadata.layer_name || "layer"}`}
            style={{ maxWidth: "100%", width: { xs: 200, sm: 250 }, height: "auto", loading: "lazy" }}
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
        padding: "10px",
        paddingBottom: "1px",
        borderRadius: "5px",
        boxShadow: "0px 0px 0px #aaa",
        minWidth: { xs: 280, sm: 400 },
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
      }}
      role="tooltip"
      data-popper-placement="bottom"
      className="css-1annchz"
    >
      {legendContent}
    </Paper>
  );
};

export default MapLegend;