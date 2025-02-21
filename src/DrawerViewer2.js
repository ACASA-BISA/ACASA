import * as React from "react";
import React from "react";
import { Grid, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Map_Option from "./Map_Option"; // Assuming this is your map component
import "./font.css";

const top_margin = 5;
let extra = 0;
const Items = ["Go to Home", "Select Region", "Select Commodity", "Select Scenario", "Climatic Risks", "Impact", "Adaptation Options"];
const Items2 = ["Home", "Region", "Commodity", "Scenario", "Risks", "Impact", "Adaptation"];

export default function DrawerV({
  activeCrop,
  activeScenario,
  changeScenario,
  changeCrop,
  LocationData,
  activeRegion,
  changeRegion,
  activeOpt,
  changeOpt,
  CurrRisk,
  changeRisk,
  activeImpact,
  changeImpact,
}) {
  // States for selected options
  const [region, setRegion] = React.useState("South Asia");
  const [commodity, setCommodity] = React.useState("Rice");
  const [futureModel, setFutureModel] = React.useState("Model X");
  const [layer, setLayer] = React.useState("Adaptation Benefits");
  const [subChoice, setSubChoice] = React.useState("Micro-irrigation");

  return (
    <Grid container spacing={2} sx={{ padding: "1rem" }}>
      {/* Left-side Options Panel */}
      <Grid item xs={3}>
        <Paper elevation={2} sx={{ padding: "1rem" }}>
          {/* Dropdown Options */}
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel>Region</InputLabel>
            <Select value={region} onChange={(e) => setRegion(e.target.value)}>
              <MenuItem value="South Asia">South Asia</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel>Commodity</InputLabel>
            <Select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
              <MenuItem value="Rice">Rice</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel>Future Model</InputLabel>
            <Select value={futureModel} onChange={(e) => setFutureModel(e.target.value)}>
              <MenuItem value="Model X">Model X</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel>Layer</InputLabel>
            <Select value={layer} onChange={(e) => setLayer(e.target.value)}>
              <MenuItem value="Technical Suitability">Technical Suitability</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Sub Choice</InputLabel>
            <Select value={subChoice} onChange={(e) => setSubChoice(e.target.value)}>
              <MenuItem value="Micro-irrigation">Micro-irrigation</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Maps Section */}
      <Grid item xs={9}>
        <Grid container spacing={2}>
          {/* Map Title and Map */}
          {["Baseline", "2050s", "2080s"].map((label, index) => (
            <Grid item xs={4} key={index}>
              <Typography variant="h6" align="center">
                {label}
              </Typography>
              <Paper elevation={1} sx={{ width: "100%", height: "40vh" }}>
                <Map_Option
                  activeCrop={commodity}
                  focus={futureModel}
                  activeRegion={region}
                  activeOpt={layer}
                  area_dict={{}} // Assuming you pass area_dict prop
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
