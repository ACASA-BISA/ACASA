import React from "react";
import { Grid, Paper, Typography, Box, Popper } from "@mui/material";
import "./font.css";
import "./extra.css";
import "./font2.css";
import Summ_Comm from "./Summ_Comm";
import Summ_Loc from "./Summ_Loc";
import Summ_Adapt from "./Summ_Adapt";
import Summ_Adapt2 from "./Summ_Adapt2";
import Summ_Adapt3 from "./Summ_Adapt3";
import Summ_Adapt4 from "./Summ_Adapt4";
import Summ_Adapt5 from "./Summ_Adapt5";
import Summ_Adapt6 from "./Summ_Adapt6";
import Summ_Scenario from "./Summ_Scenario.js";
import Summ_Model from "./Summ_Model.js";
import Summ_Adaptation_Indicator from "./Summ_Adaptation_Indicators.js";
import Map_Risk from "./Map_Risk1";
import Map_Option from "./Map_Option1";
import LegendComp from "./LegendComp.js";
import { fetchthedataHzd } from "./fetchDataHzd.js";
import { fetchDataAdap } from "./fetchDataAdap.js";

export default function AdaptationGlance({
  handleChangeSumm,
  handleChangeOptSumm,
  handleChangeOptSumm2,
  handleChangeOptSumm3,
  handleChangeOptSumm4,
  handleChangeOptSumm5,
  handleChangeOptSumm6,
  cropid,
  crop2,
  crop3,
  area_data3,
  area_data4,
  area_dict,
  CurrRisk2,
  focus2,
  activeRegion2,
  ActiveRegionChange2,
  opt2,
  opt3,
  opt4,
  opt5,
  opt6,
  opt7,
  changeOptLayer2,
  optionlayer2,
}) {
  const [NameScenario, setNameScenario] = React.useState("baseline");

  const handleScenario = (name) => {
    setNameScenario(name);
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
      <Grid container sx={{ marginTop: "85px", marginBottom: "2px", paddingX: "1rem" }} columns={12} spacing={1}>
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
              <Typography sx={{ fontSize: 14, fontWeight: "900", fontFamily: "Jura" }}>Adaptation at a glance</Typography>
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
            <Box
              sx={(theme) => ({
                paddingX: "0px",
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
              <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>Adaptation Indicator: </Typography>
              <Summ_Adaptation_Indicator handleIndicator={changeOptLayer2} activeCrop={crop3} indc={optionlayer2}></Summ_Adaptation_Indicator>
            </Box>
            <Map_Risk activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeScenario={NameScenario}></Map_Risk>
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
            <LegendComp legendData={fetchthedataHzd("Pixel Level", "", "Productivity", "Absolute", activeRegion2, NameScenario, crop2, area_data4)} />
          </Popper>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item xs={4} key="1">
              <Paper elevation={1} ref={paperwidth}>
                <Box
                  sx={{
                    paddingX: "4px",
                    paddingY: "4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: 12,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    })}
                  >
                    Adaptation:{" "}
                  </Typography>
                  <Summ_Adapt activv={opt2} changeOption={handleChangeOptSumm} activeCrop={crop3} CropName={crop2}></Summ_Adapt>
                </Box>
                <Map_Option
                  activeCrop={crop2}
                  focus={focus2}
                  activeRegion={activeRegion2}
                  activeOpt={opt2}
                  area_dict={area_dict}
                  activeScenario={NameScenario}
                  activeOptLayer={optionlayer2}
                  modelName={NameModel}
                ></Map_Option>
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
                <LegendComp legendData={fetchDataAdap(opt2, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="2">
              <Paper elevation={1} ref={box2}>
                <Box
                  sx={{
                    paddingX: "4px",
                    paddingY: "4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: 12,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    })}
                  >
                    Adaptation:{" "}
                  </Typography>
                  <Summ_Adapt2 activv={opt3} changeOption={handleChangeOptSumm2} activeCrop={crop3} CropName={crop2}></Summ_Adapt2>
                </Box>
                <Map_Option
                  activeCrop={crop2}
                  focus={focus2}
                  activeRegion={activeRegion2}
                  activeOpt={opt3}
                  area_dict={area_dict}
                  activeScenario={NameScenario}
                  activeOptLayer={optionlayer2}
                  modelName={NameModel}
                ></Map_Option>
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
                <LegendComp legendData={fetchDataAdap(opt3, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="3">
              <Paper elevation={1} ref={box3}>
                <Box
                  sx={{
                    paddingX: "4px",
                    paddingY: "4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: 12,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    })}
                  >
                    Adaptation:{" "}
                  </Typography>
                  <Summ_Adapt3 activv={opt4} changeOption={handleChangeOptSumm3} activeCrop={crop3} CropName={crop2}></Summ_Adapt3>
                </Box>
                <Map_Option
                  activeCrop={crop2}
                  focus={focus2}
                  activeRegion={activeRegion2}
                  activeOpt={opt4}
                  area_dict={area_dict}
                  activeScenario={NameScenario}
                  activeOptLayer={optionlayer2}
                  modelName={NameModel}
                ></Map_Option>
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
                <LegendComp legendData={fetchDataAdap(opt4, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="4">
              <Paper elevation={1} ref={box4}>
                <Box
                  sx={{
                    paddingX: "4px",
                    paddingY: "4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: 12,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    })}
                  >
                    Adaptation:{" "}
                  </Typography>
                  <Summ_Adapt4 activv={opt5} changeOption={handleChangeOptSumm4} activeCrop={crop3} CropName={crop2}></Summ_Adapt4>
                </Box>
                <Map_Option
                  activeCrop={crop2}
                  focus={focus2}
                  activeRegion={activeRegion2}
                  activeOpt={opt5}
                  area_dict={area_dict}
                  activeScenario={NameScenario}
                  activeOptLayer={optionlayer2}
                  modelName={NameModel}
                ></Map_Option>
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
                <LegendComp legendData={fetchDataAdap(opt5, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="5">
              <Paper elevation={1} ref={box5}>
                <Box
                  sx={{
                    paddingX: "4px",
                    paddingY: "4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: 12,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    })}
                  >
                    Adaptation:{" "}
                  </Typography>
                  <Summ_Adapt5 activv={opt6} changeOption={handleChangeOptSumm5} activeCrop={crop3} CropName={crop2}></Summ_Adapt5>
                </Box>
                <Map_Option
                  activeCrop={crop2}
                  focus={focus2}
                  activeRegion={activeRegion2}
                  activeOpt={opt6}
                  area_dict={area_dict}
                  activeScenario={NameScenario}
                  activeOptLayer={optionlayer2}
                  modelName={NameModel}
                ></Map_Option>
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
                <LegendComp legendData={fetchDataAdap(opt6, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
              </Popper>
            </Grid>
            <Grid item xs={4} key="6">
              <Paper elevation={1} ref={box6}>
                <Box
                  sx={{
                    paddingX: "4px",
                    paddingY: "4px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: 12,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    })}
                  >
                    Adaptation:{" "}
                  </Typography>
                  <Summ_Adapt6 activv={opt7} changeOption={handleChangeOptSumm6} activeCrop={crop3} CropName={crop2}></Summ_Adapt6>
                </Box>
                <Map_Option
                  activeCrop={crop2}
                  focus={focus2}
                  activeRegion={activeRegion2}
                  activeOpt={opt7}
                  area_dict={area_dict}
                  activeScenario={NameScenario}
                  activeOptLayer={optionlayer2}
                  modelName={NameModel}
                ></Map_Option>
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
                <LegendComp legendData={fetchDataAdap(opt7, activeRegion2, optionlayer2, crop2, NameScenario, area_data3)} />
              </Popper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
