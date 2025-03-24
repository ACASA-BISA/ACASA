import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Popper, Paper, Grid } from "@mui/material";

export default function Selection_bar({ location, commodity, adaption, RiskName, scenario, ImpactName, modelName, exploreType, activeScale, activeDrawer }) {
  function checkcrop() {
    const diffcrop = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Poultry"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (commodity === sname) {
        ans = false;
      }
    });
    return ans;
  }

  function RiskType() {
    let str = "Hazard";
    if (RiskName === "Risk Index") {
      str = "Risk";
    }
    if (RiskName === "Exposure Index" || RiskName === "Number of Animals per grid" || RiskName === "Cropped Area") {
      str = "Exposure";
    }
    if (
      RiskName === "Vulnerability Index" ||
      RiskName === "Irrigation" ||
      RiskName === "Volumetric Soil Water" ||
      RiskName === "Agriculture Income" ||
      RiskName === "Soil Organic Carbon" ||
      RiskName === "Feed/Fodder" ||
      RiskName === "Rural infrastructure" ||
      RiskName === "Economic Development Indicator"
    ) {
      str = "Vulnerability";
    }
    return str;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid container spacing={1} sx={{ marginTop: "80px", paddingX: "1rem", marginLeft: "210px" }} columns={12}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={(theme) => ({
                  fontSize: 13,
                  fontWeight: "bold",
                  color: theme.palette.mode === "dark" ? "#81c784" : "#143200",
                  marginLeft: "4px",
                })}
              >
                {location}
              </Typography>
            </Box>
            <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontSize: 13 }} color="text.secondary">
                {activeScale.charAt(0).toUpperCase() + activeScale.toLowerCase().slice(1)}
              </Typography>
            </Box>
            {exploreType === "Commodity" && activeDrawer === "future" && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.primary,
                  })}
                  gutterBottom
                >
                  Crop:&nbsp;
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.secondary,
                  })}
                >
                  {commodity}
                </Typography>
              </Box>
            )}

            {exploreType === "Commodity" && activeDrawer === "future2" && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.primary,
                  })}
                  gutterBottom
                >
                  Livestock:&nbsp;
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.secondary,
                  })}
                >
                  {commodity}
                </Typography>
              </Box>
            )}

            <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={(theme) => ({
                  fontSize: 13,
                  color: theme.palette.text.primary,
                })}
                gutterBottom
              >
                Scenario:&nbsp;
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: 13,
                  color: theme.palette.text.secondary,
                })}
              >
                {scenario}
              </Typography>
            </Box>

            <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={(theme) => ({
                  fontSize: 13,
                  color: theme.palette.text.primary,
                })}
                gutterBottom
              >
                Model:&nbsp;
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: 13,
                  color: theme.palette.text.secondary,
                })}
              >
                {modelName}
              </Typography>
            </Box>

            {adaption !== "" && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.primary,
                  })}
                >
                  <strong>{adaption.charAt(0).toUpperCase() + adaption.slice(1, 4) + adaption.toLowerCase().slice(4)}</strong>
                </Typography>
              </Box>
            )}

            {RiskName !== "" && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.primary,
                  })}
                  gutterBottom
                >
                  {RiskType()}:&nbsp;
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.secondary,
                  })}
                >
                  {RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}
                  &nbsp;
                </Typography>
              </Box>
            )}

            {ImpactName !== "" && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <ChevronRightIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.primary })} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.primary,
                  })}
                >
                  Impact:&nbsp;
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.text.secondary,
                  })}
                >
                  {ImpactName.charAt(0).toUpperCase() + ImpactName.toLowerCase().slice(1)}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
