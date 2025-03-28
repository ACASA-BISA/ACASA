import React from "react";
import { Grid, Paper, Typography, Box, Popper } from "@mui/material";
import "./font.css";
import "./extra.css";
import "./font2.css";
import Summ_Comm from "./Summ_Comm";
import Summ_Loc from "./Summ_Loc";
import Map_Index from "./Map_HazardIndex";
import Map_Hazard from "./Map_Hazard";
import Summ_Scenario from "./Summ_Scenario";
import Summ_Model from "./Summ_Model";
import { fetchthedataHzd } from "./fetchDataHzd.js";
import LegendComp from "./LegendComp.js";

export default function HazardGlance({ handleChangeSumm, cropid, focus2, activeRegion2, ActiveRegionChange2, crop2, CurrRisk2, area_data4 }) {
  const [NameScenario, setNameScenario] = React.useState("baseline");

  const handleScenario = (name) => {
    setNameScenario(name);
  };

  const HazardData = {
    Rice: ["Heat Stress", "Delayed Monsoon", "High temperature induced pollen sterility", "Dry Spell", "Crop water deficit index", "Low temperature induced pollen sterility"],
    Wheat: ["High temperature induced pollen sterility", "Terminal Heat", "Days of Frost", "Untimely Rainfall", "Rainfall Deficit index", "Lodging"],
  };

  const [NameModel, setNameModel] = React.useState("CHC");
  const handleModel = (name) => {
    setNameModel(name);
  };

  const paperwidth = React.useRef(null);
  const [paperWidth, setPaperWidth] = React.useState(0);
  React.useEffect(() => {
    if (paperwidth.current) {
      setPaperWidth(paperwidth.current.offsetWidth);
    }
  }, []);

  const box1 = React.useRef(null);
  const box2 = React.useRef(null);
  const box3 = React.useRef(null);
  const box4 = React.useRef(null);
  const box5 = React.useRef(null);
  const box6 = React.useRef(null);

  return (
    <Paper sx={{ overflow: "hidden", height: "100vh" }}>
      <Grid container sx={{ marginTop: "90px", marginBottom: "2px", paddingX: "1rem" }} columns={12} spacing={1}>
        <Grid item xs={3} key="side">
          <Paper elevation={1} ref={box1}>
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
              <Typography sx={{ fontSize: 14, fontWeight: "900", fontFamily: "Jura" }}>Hazard at a glance</Typography>
            </Box>
            <Box
              sx={(theme) => ({
                paddingX: "8px",
                paddingY: "4px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "4px",
                alignItems: "center",
                backgroundColor: theme.palette.mode === "dark" ? "#2d3136" : "#F7F7F7",
                border: "0px solid black",
              })}
            >
              <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Location: </Typography>
              <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
              <Typography sx={{ marginLeft: "5px", fontSize: 13, fontWeight: "bold" }}>Commodity: </Typography>
              <Summ_Comm changeComm={handleChangeSumm} comm={cropid}></Summ_Comm>
            </Box>
            <Box
              sx={(theme) => ({
                paddingX: "8px",
                paddingY: "4px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "4px",
                alignItems: "center",
                backgroundColor: theme.palette.mode === "dark" ? "#2d3136" : "#F7F7F7",
                border: "0px solid black",
              })}
            >
              <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Scenario: </Typography>
              <Summ_Scenario handleScenario={handleScenario} scn={NameScenario}></Summ_Scenario>
              <Typography sx={{ marginLeft: "5px", fontSize: 13, fontWeight: "bold" }}>Model: </Typography>
              <Summ_Model handleModel={handleModel} mdl={NameModel}></Summ_Model>
            </Box>
            <Map_Index activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={CurrRisk2}></Map_Index>
          </Paper>
          <Popper
            open={true} // Always open
            anchorEl={box1.current} // Anchor to the Grid container
            placement="bottom" // Position it at the bottom
            disablePortal={true} // Stay within the DOM hierarchy
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -70], // Adjust distance from the container
                },
              },
            ]}
          >
            <LegendComp legendData={fetchthedataHzd("Pixel Level", "Hazard Index", "", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
          </Popper>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item xs={4} key="1">
              <Paper elevation={1} ref={paperwidth}>
                <Typography sx={{ fontSize: 13, fontWeight: "800", fontFamily: "Jura" }}>{HazardData[crop2][0]}</Typography>
                <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={HazardData[crop2][0]} activeScenario={NameScenario}></Map_Hazard>
              </Paper>
              <Popper
                open={true} // Always open
                anchorEl={paperwidth.current} // Anchor to the Grid container
                placement="bottom" // Position it at the bottom
                disablePortal={true} // Stay within the DOM hierarchy
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, -70], // Adjust distance from the container
                    },
                  },
                ]}
              >
                <LegendComp legendData={fetchthedataHzd("Pixel Level", HazardData[crop2][0], "", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="2">
              <Paper elevation={1} ref={box2}>
                <Typography sx={{ fontSize: 13, fontWeight: "800", fontFamily: "Jura" }}>{HazardData[crop2][1]}</Typography>
                <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={HazardData[crop2][1]} activeScenario={NameScenario}></Map_Hazard>
              </Paper>
              <Popper
                open={true} // Always open
                anchorEl={box2.current} // Anchor to the Grid container
                placement="bottom" // Position it at the bottom
                disablePortal={true} // Stay within the DOM hierarchy
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, -70], // Adjust distance from the container //-( (paperWidth)/2 - 40),-82
                    },
                  },
                ]}
              >
                <LegendComp legendData={fetchthedataHzd("Pixel Level", HazardData[crop2][1], "", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="3">
              <Paper elevation={1} ref={box3}>
                <Typography sx={{ fontSize: 13, fontWeight: "800", fontFamily: "Jura" }}>{HazardData[crop2][2]}</Typography>
                <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={HazardData[crop2][2]} activeScenario={NameScenario}></Map_Hazard>
              </Paper>
              <Popper
                open={true} // Always open
                anchorEl={box3.current} // Anchor to the Grid container
                placement="bottom" // Position it at the bottom
                disablePortal={true} // Stay within the DOM hierarchy
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, -70], // Adjust distance from the container
                    },
                  },
                ]}
              >
                <LegendComp legendData={fetchthedataHzd("Pixel Level", HazardData[crop2][2], "", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="4">
              <Paper elevation={1} ref={box4}>
                <Typography sx={{ fontSize: 13, fontWeight: "800", fontFamily: "Jura" }}>{HazardData[crop2][3]}</Typography>
                <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={HazardData[crop2][3]} activeScenario={NameScenario}></Map_Hazard>
              </Paper>
              <Popper
                open={true} // Always open
                anchorEl={box4.current} // Anchor to the Grid container
                placement="bottom" // Position it at the bottom
                disablePortal={true} // Stay within the DOM hierarchy
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, -70], // Adjust distance from the container
                    },
                  },
                ]}
              >
                <LegendComp legendData={fetchthedataHzd("Pixel Level", HazardData[crop2][3], "", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="5">
              <Paper elevation={1} ref={box5}>
                <Typography sx={{ fontSize: 13, fontWeight: "800", fontFamily: "Jura" }}>{HazardData[crop2][4]}</Typography>
                <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={HazardData[crop2][4]} activeScenario={NameScenario}></Map_Hazard>
              </Paper>
              <Popper
                open={true} // Always open
                anchorEl={box5.current} // Anchor to the Grid container
                placement="bottom" // Position it at the bottom
                disablePortal={true} // Stay within the DOM hierarchy
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, -70], // Adjust distance from the container
                    },
                  },
                ]}
              >
                <LegendComp legendData={fetchthedataHzd("Pixel Level", HazardData[crop2][4], "", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="6">
              <Paper elevation={1} ref={box6}>
                <Typography sx={{ fontSize: 13, fontWeight: "800", fontFamily: "Jura" }}>{HazardData[crop2][5]}</Typography>
                <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={HazardData[crop2][5]} activeScenario={NameScenario}></Map_Hazard>
              </Paper>
              <Popper
                open={true} // Always open
                anchorEl={box6.current} // Anchor to the Grid container
                placement="bottom" // Position it at the bottom
                disablePortal={true} // Stay within the DOM hierarchy
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, -70], // Adjust distance from the container
                    },
                  },
                ]}
              >
                <LegendComp legendData={fetchthedataHzd("Pixel Level", HazardData[crop2][5], "", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
              </Popper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
