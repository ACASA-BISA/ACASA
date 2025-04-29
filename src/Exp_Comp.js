import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, Popper, Slider, Button, FormControl, MenuItem, Select } from "@mui/material";
import Map_Option from "./Comp_Map"; // Assuming this is your map component
import "./font.css";
import "./extra.css";
import "./font2.css";
//import PlayArrowIcon from "@mui/icons-material/PlayArrow";
//import PauseIcon from "@mui/icons-material/Pause";
import { styled } from "@mui/material/styles";
//import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Legend_Small from "./Legend_Small";
//import PopperGif from "./PopperGif";

// Array of image URLs, one for each year
const images = [
  { year: 2000, url: "Timeline/Rice_Delayed monsoon_baseline.png" },
  { year: 2001, url: "Timeline/Rice_Delayed monsoon_SSP245.png" },
  { year: 2002, url: "Timeline/Rice_Delayed monsoon_SSP585.png" },
  { year: 2003, url: "Timeline/Rice_Dry spell number_baseline.png" },
  { year: 2004, url: "Timeline/Rice_Dry spell number_SSP245.png" },
  { year: 2005, url: "Timeline/Rice_Dry spell number_SSP585.png" },
  // Add more images as needed
];

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const tabs = ["Biophysical suitability", "Scalability", "Gender suitability", "Yield Benefits", "Economic viability", "Adaptation benefits"];

const ArrowTab = styled(Button)(({ theme, selected, isLast, isFirst }) => ({
  "position": "relative",
  //"padding": "2px 40px 2px 40px",
  "padding": "2px 2px 2px 2px",
  "borderRadius": 0,
  "width": "450px",
  //"marginLeft": "-35px",
  //"clipPath": isLast ? "polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 10% 50%)" : "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 10% 50%)",
  "backgroundColor": selected ? "#BFD77A" : "#A0A0A0",
  "color": selected ? "black" : "white",
  "fontWeight": "bold",
  "textTransform": "none",
  "transition": "all 0.3s",
  "&:first-of-type": {
    marginLeft: 0,
    ///clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
    //paddingLeft: "35px",
  },
  "&:hover": {
    backgroundColor: selected ? theme.palette.grey[300] : theme.palette.grey[500],
    transform: "scale(1.05)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: isFirst ? "0" : "1%",
    height: "100%",
    backgroundColor: "white",
    top: "0px",
    left: "-2px",
    right: "0px",
    bottom: "0px",
    //clipPath: "polygon(0 0, 15% 0, 100% 50%, 15% 100%, 0 100%, 15% 50%)",
    zIndex: 1,
  },
}));

export default function CompV({
  activeCrop,
  activeScenario,
  changeScenario,
  changeCrop,
  LocationData,
  activeRegion,
  changeRegion,
  focus,
  activeOpt,
  changeOpt,
  CurrRisk,
  changeRisk,
  activeImpact,
  changeImpact,
  area_dict3,
  area_dict4,
  activeOptLayer,
  changeOptLayer,
  modelName,
  displayLayer,
  setDisplayLayer,
  activeScale,
  exploreType,
}) {
  let scn = "baseline";
  if (activeScenario["ssp245"]) {
    scn = "ssp245";
  } else if (activeScenario["ssp585"]) {
    scn = "ssp585";
  }

  const [futureModel, setFutureModel] = React.useState("Gender Suitability");
  let sec = activeRegion.indexOf(",");

  const countryMap1 = {};
  countryMap1["South Asia"] = "SA";
  countryMap1["Afghanistan"] = "AF";
  countryMap1["Bangladesh"] = "BD";
  countryMap1["Bhutan"] = "BT";
  countryMap1["India"] = "IN";
  countryMap1["Nepal"] = "NP";
  countryMap1["Pakistan"] = "PK";
  countryMap1["Sri Lanka"] = "LK";
  countryMap1["Maldives"] = "MV";

  let x = "SA";
  let y = "";
  if (sec > 0) {
    x = activeRegion.substring(sec + 2);
    y = activeRegion.substring(0, sec);

    x = countryMap1[x];
  } else {
    x = activeRegion;
    x = countryMap1[x];
  }
  const [reg, setReg] = React.useState(x);
  const [state, setState] = React.useState(y);

  const countryMap = {};
  countryMap["SA"] = "South Asia";
  countryMap["AF"] = "Afghanistan";
  countryMap["BD"] = "Bangladesh";
  countryMap["BT"] = "Bhutan";
  countryMap["IN"] = "India";
  countryMap["NP"] = "Nepal";
  countryMap["PK"] = "Pakistan";
  countryMap["LK"] = "Sri Lanka";
  countryMap["MV"] = "Maldives";

  const handleScenariochange = (event) => {
    //changeScenario(event.target.value);
    setFutureModel(event.target.value);
  };

  const [sharedView, setSharedView] = React.useState(null);

  const handleviewchange = (viewx) => {
    setSharedView({
      center: viewx.getCenter(),
      zoom: viewx.getZoom(),
    });
  };

  let NameImpact = "";
  if (activeImpact["Resilience"]) {
    NameImpact = "Resilience";
  } else if (activeImpact["Value of Production"]) {
    NameImpact = "Value of Production";
  } else if (activeImpact["Productivity"]) {
    NameImpact = "Productivity";
  } else {
    NameImpact = "";
  }

  let AdaptLayerName = "";
  if (activeOptLayer["Biophysical Suitability"]) {
    AdaptLayerName = "Biophysical Suitability";
  }
  if (activeOptLayer["Scalability"]) {
    AdaptLayerName = "Scalability";
  }
  if (activeOptLayer["Gender"]) {
    AdaptLayerName = "Gender Suitability";
  }
  if (activeOptLayer["Yield"]) {
    AdaptLayerName = "Yield Benefits";
  }
  if (activeOptLayer["Economic"]) {
    AdaptLayerName = "Economic Viability";
  }
  if (activeOptLayer["Adaptation Benefits"]) {
    AdaptLayerName = "Adaptation Benefits";
  }
  if (
    activeOptLayer["Biophysical Suitability"] === false &&
    activeOptLayer["Adaptation Benefits"] === false &&
    activeOptLayer["Economic"] === false &&
    activeOptLayer["Scalability"] === false &&
    activeOptLayer["Gender"] === false &&
    activeOptLayer["Yield"] === false
  ) {
    AdaptLayerName = "Biophysical Suitability";
  }

  const Adapt_Title = ["Yield (Baseline)", "Adaptation Benefits (2050s)", "Adaptation Benefits (2080s)"];
  const gridRefs = [React.useRef(null), React.useRef(null), React.useRef(null)];
  const Only_Baseline = React.useRef(null);

  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useInterval(
    () => {
      setCurrentYearIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    },
    isPlaying ? 1000 : null
  );

  // Toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle slider change (manual navigation through timeline)
  const handleSliderChange = (event, newValue) => {
    setCurrentYearIndex(newValue);
    setIsPlaying(false); // Stop autoplay when the slider is moved manually
  };
  const color_for_button = "#4b9e44";
  // Display the current image and year
  const currentImage = images[currentYearIndex];
  //Color: #52af77
  const PrettoSlider = styled(Slider)({
    "color": color_for_button,
    "height": 5,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      "height": 10,
      "width": 12,
      "borderRadius": 2,
      "backgroundColor": "#fff",
      "border": "1px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&::before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      "lineHeight": 1.2,
      "fontSize": 12,
      "background": "unset",
      "padding": 0,
      "width": 32,
      "height": 32,
      "borderRadius": "50% 50% 50% 0",
      "backgroundColor": color_for_button,
      "transformOrigin": "bottom left",
      "transform": "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&::before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  const [paperWidth, setPaperWidth] = React.useState(0);
  const [boxWidth, setBoxWidth] = React.useState(0);
  const [boxHeight, setBoxHeight] = React.useState(0);
  React.useEffect(() => {
    if (Only_Baseline.current) {
      setPaperWidth(Only_Baseline.current.offsetWidth);
    }
  }, []);

  React.useLayoutEffect(() => {
    if (gridRefs[1].current) {
      setBoxWidth(gridRefs[1].current.offsetWidth);
      setBoxHeight(gridRefs[1].current.offsetHeight);
    }
  }, [gridRefs[1].current]);

  function checkcrop() {
    const diffcrop = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (activeCrop === sname) {
        ans = false;
      }
    });
    return ans;
  }

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "alignItems": "flex-start", // Align items to the start
    "&.Mui-disabled .MuiTypography-body2": {
      color: "#ccc", // Color for the label text when disabled
    },
  }));

  const values = ["Biophysical Suitability", "Scalability", "Gender", "Yield", "Economic", "Adaptation Benefits"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    const updatedState = { ...activeOptLayer }; // Copy existing state

    values.forEach((name, i) => {
      updatedState[name] = i <= index; // Select all previous & current tabs
    });

    changeOptLayer(updatedState);
  };

  useEffect(() => {
    if (
      activeOptLayer["Biophysical Suitability"] === false &&
      activeOptLayer["Adaptation Benefits"] === false &&
      activeOptLayer["Economic"] === false &&
      activeOptLayer["Scalability"] === false &&
      activeOptLayer["Gender"] === false &&
      activeOptLayer["Yield"] === false
    ) {
      setSelectedIndex(0);
    }
  }, [activeOptLayer]);

  function RiskType() {
    let str = "Hazard";
    if (CurrRisk === "Risk Index" || CurrRisk === "Exposure Index" || CurrRisk === "Vulnerability Index" || CurrRisk === "District Level" || CurrRisk === "Downscaled Risk") {
      str = "Indices";
    }
    if (CurrRisk === "Number of Animals per grid" || CurrRisk === "Cropped Area") {
      str = "Exposure";
    }
    if (
      CurrRisk === "Irrigation" ||
      CurrRisk === "Volumetric Soil Water" ||
      CurrRisk === "Agriculture Income" ||
      CurrRisk === "Soil Organic Carbon" ||
      CurrRisk === "Feed/Fodder" ||
      CurrRisk === "Rural infrastructure" ||
      CurrRisk === "Socio-economic Development Indicator" ||
      CurrRisk === "Income"
    ) {
      str = "Vulnerability";
    }
    return str;
  }

  return (
    <div className="viewer-container" style={{ overflow: "hidden" }}>
      <Grid container sx={{ marginTop: "0px", paddingX: "1rem" }} columns={12}>
        {activeOpt !== "" && checkcrop() && (
          <Box
            sx={{
              width: "100%",
              marginTop: "0px",
              backgroundColor: "#ddd",
              marginBottom: "2px",
            }}
          >
            {/* <FormGroup  sx={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:0.5,marginY:'2px',
          alignItems:'center',alignContent:'center',justifyItems:'center',justifyContent:'center'}}>
            <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Biophysical Suitability']} name="Biophysical Suitability" 
                onChange={changeOptLayer}
                color="success" sx={{padding:0,marginLeft:1,marginRight:'2px','&.Mui-checked': {
                transform: "scale(1.04)"} }}/>} 
                label={<Typography variant="body2" align='left'  sx={{paddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Biophysical suitability</Typography>}/>
            <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Adaptation Benefits']} name="Adaptation Benefits" 
                onChange={changeOptLayer}
                color="success" sx={{padding:0,marginLeft:1,marginRight:'2px'}}/>} 
                label={<Typography variant="body2" align='left'  sx={{paddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Adaptation benefits</Typography>}/>
            <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Economic']}  name="Economic" 
                onChange={changeOptLayer}
                color="success" sx={{padding:0,marginLeft:1,marginRight:'2px'}}/>} 
                label={<Typography variant="body2" align='left'  sx={{paddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Economic benefits</Typography>}/>
            <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Scalability']} name="Scalability" 
                onChange={changeOptLayer}
                color="success" sx={{padding:0,marginLeft:1,marginRight:'2px'}}/>} 
                label={<Typography variant="body2" align='left'  sx={{paddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Scalability</Typography>}/>
            <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Gender']} name="Gender" 
                onChange={changeOptLayer}
                color="success" sx={{padding:0,marginLeft:1,marginRight:'2px'}}/>} 
                label={<Typography variant="body2" align='left'  sx={{paddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Gender suitability</Typography>}/>
            </FormGroup> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                bgcolor: "background.paper",
              }}
            >
              {tabs.map((label, index) => (
                <ArrowTab
                  key={label}
                  selected={index === selectedIndex}
                  isLast={index === tabs.length - 1} // Identify last tab
                  isFirst={index === 0}
                  onClick={() => handleSelect(index)}
                  disableRipple
                >
                  {label !== "Gender suitability" && (
                    <Typography
                      fontWeight="bold"
                      sx={{
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        fontSize: "11px",
                        fontFamily: "Karla",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {label}
                    </Typography>
                  )}
                  {label === "Gender suitability" && (
                    <Typography
                      fontWeight="bold"
                      sx={{
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        fontSize: "11px",
                        fontFamily: "Karla",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      <FormControl size="small">
                        <Select
                          labelId="GenderOptions"
                          id="future-model-select-idx"
                          sx={{ fontSize: "11px", height: "16px", fontFamily: "Karla", fontWeight: "bold", color: "white" }}
                          value={futureModel}
                          onChange={handleScenariochange}
                        >
                          <MenuItem value="Gender Suitability" sx={{ fontSize: "12px", height: "16px", fontFamily: "Karla" }}>
                            Gender Suitability
                          </MenuItem>
                          <MenuItem value="Female Labourers" sx={{ fontSize: "12px", height: "16px", fontFamily: "Karla" }}>
                            Female Labourers (%)
                          </MenuItem>
                          <MenuItem value="Female Cultivators" sx={{ fontSize: "12px", height: "16px", fontFamily: "Karla" }}>
                            Female Cultivators (%)
                          </MenuItem>
                          <MenuItem value="Agri Labourers" sx={{ fontSize: "12px", height: "16px", fontFamily: "Karla" }}>
                            Percentage agri labourers
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Typography>
                  )}
                </ArrowTab>
              ))}
            </Box>
          </Box>
        )}
        {activeScenario["baseline"] && (
          <Grid item xs={12} key="Only_Baseline" ref={Only_Baseline}>
            <Box
              sx={(theme) => ({
                width: "100%",
                bgcolor: theme.palette.mode === "dark" ? "#2f6742" : "#C1E1C1",
                height: "24px",
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              })}
            >
              <Typography
                align="center"
                sx={(theme) => ({
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "Karla",
                  color: "text.primary",
                })}
              >
                Baseline
              </Typography>
            </Box>
            <Paper
              elevation={1}
              sx={{
                width: "100%",
                height: activeOpt === "" ? "calc(100vh - 155px)" : "calc(100vh - 175px)",
              }}
            >
              <div>
                <Map_Option
                  activeCrop={activeCrop}
                  activeScenario="baseline"
                  focus={focus}
                  activeRegion={activeRegion}
                  activeOpt={activeOpt}
                  CurrRisk={CurrRisk}
                  activeImpact={activeImpact}
                  sharedView={sharedView}
                  handleviewchange={handleviewchange}
                  activeOptLayer={activeOptLayer}
                  ImpactName={NameImpact}
                  displayLayer={displayLayer}
                  exploreType={exploreType}
                  activeScale={activeScale}
                  area_dict3={area_dict3}
                  area_dict4={area_dict4}
                  modelName={modelName}
                ></Map_Option>
                {(CurrRisk !== "" || activeOpt !== "" || NameImpact !== "") && (
                  <Popper
                    open={true} // Always open
                    anchorEl={Only_Baseline.current} // Anchor to the Grid container
                    placement="bottom" // Position it at the bottom
                    disablePortal={true} // Stay within the DOM hierarchy
                    modifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [3, -120], // Adjust distance from the container
                        },
                      },
                    ]}
                  >
                    <Paper
                      elevation={1}
                      id={`legend-baseline`}
                      sx={{
                        maxWidth: "400px",
                        borderRadius: "5px",
                        padding: "3px",
                      }}
                    >
                      <Legend_Small
                        location={activeRegion}
                        commodity={activeCrop}
                        adaption={activeOpt}
                        RiskName={CurrRisk}
                        scenario="baseline"
                        ImpactName={NameImpact}
                        area_data3={area_dict3}
                        area_data4={area_dict4}
                        AdaptLayerName={AdaptLayerName}
                        displayLayer="Absolute"
                        activeScale={activeScale}
                      ></Legend_Small>
                    </Paper>
                  </Popper>
                )}
              </div>
            </Paper>
          </Grid>
        )}
        {activeScenario["baseline"] === false && modelName === "CHC" && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {["Baseline", "2050s"].map((label, index) => (
                <Grid item xs={6} key={index} ref={gridRefs[index]}>
                  <Box
                    sx={(theme) => ({
                      width: "100%",
                      bgcolor: theme.palette.mode === "dark" ? "#2f6742" : "#C1E1C1",
                      height: "24px",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    })}
                  >
                    {AdaptLayerName === "Adaptation Benefits" && (
                      <Typography
                        align="center"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          fontFamily: "Karla",
                          color: "text.primary",
                        }}
                      >
                        {Adapt_Title[index]}
                      </Typography>
                    )}
                    {AdaptLayerName !== "Adaptation Benefits" && (
                      <Typography
                        align="center"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          fontFamily: "Karla",
                          color: "text.primary",
                        }}
                      >
                        {label}
                      </Typography>
                    )}
                    {/* {(label==='2050s'||label==='2080s') && <FormControl size='small'>
                    <Select labelId="Scenariox"
                      id="future-model-select-idx"
                      sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}
                      value={futureModel} onChange={handleScenariochange}>
                        <MenuItem value="Absolute" sx={{paddingLeft:1,fontSize:'13px',height:'20px',fontWeight:'bold',fontFamily:'Karla'}}>Absolute values</MenuItem>
                        <Typography variant="subtitle1" sx={{paddingLeft:1,fontSize:'13px',fontWeight:'bold',fontFamily:'Karla'}}>Change in future</Typography>
                        <MenuItem value="Percentage Change" sx={{fontSize:'13px',height:'20px',fontFamily:'Karla'}}>Percentage change</MenuItem>
                        <MenuItem value="Absolute Change" sx={{fontSize:'13px',height:'20px',fontFamily:'Karla'}}>Absolute change</MenuItem>
                    </Select>
                    </FormControl>} */}
                  </Box>

                  <Paper
                    elevation={1}
                    sx={{
                      width: "100%",
                      height: activeOpt === "" ? "calc(100vh - 155px)" : "calc(100vh - 175px)",
                    }}
                  >
                    {label === "Baseline" && (
                      <div>
                        <Map_Option
                          activeCrop={activeCrop}
                          activeScenario="baseline"
                          focus={focus}
                          activeRegion={activeRegion}
                          activeOpt={activeOpt}
                          CurrRisk={CurrRisk}
                          activeImpact={activeImpact}
                          sharedView={sharedView}
                          handleviewchange={handleviewchange}
                          activeOptLayer={activeOptLayer}
                          ImpactName={NameImpact}
                          displayLayer={displayLayer}
                          exploreType={exploreType}
                          activeScale={activeScale}
                          area_dict3={area_dict3}
                          area_dict4={area_dict4}
                          modelName={modelName}
                        ></Map_Option>
                        {(CurrRisk !== "" || activeOpt !== "" || NameImpact !== "") && (
                          <Popper
                            open={true} // Always open
                            anchorEl={gridRefs[index].current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [3, -120], // Adjust distance from the container
                                },
                              },
                            ]}
                          >
                            <Paper
                              elevation={1}
                              id={`legend-baseline`}
                              sx={{
                                maxWidth: boxWidth - 18,
                                borderRadius: "5px",
                                padding: "3px",
                              }}
                            >
                              <Legend_Small
                                location={activeRegion}
                                commodity={activeCrop}
                                adaption={activeOpt}
                                RiskName={CurrRisk}
                                scenario="baseline"
                                ImpactName={NameImpact}
                                area_data3={area_dict3}
                                area_data4={area_dict4}
                                AdaptLayerName={AdaptLayerName}
                                displayLayer="Absolute"
                                activeScale={activeScale}
                              ></Legend_Small>
                            </Paper>
                          </Popper>
                        )}
                        {/*CurrRisk !== "" && (
                          <Popper
                            open={true}
                            anchorEl={gridRefs[index].current}
                            placement="bottom"
                            disablePortal={true}
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [boxWidth / 3 / 2 + 15 - boxWidth / 2, -(boxWidth / 3 + 180)],
                                },
                              },
                            ]}
                            sx={{ maxWidth: boxWidth / 3 }}
                          >
                            <PopperGif
                              activeCrop={activeCrop}
                              activeScenario={activeScenario}
                              activeRegion={activeRegion}
                              focus={focus}
                              activeOpt={activeOpt}
                              CurrRisk={CurrRisk}
                              activeImpact={activeImpact}
                              activeOptLayer={activeOptLayer}
                              modelName={modelName}
                              displayLayer={displayLayer}
                              activeScale={activeScale}
                              exploreType={exploreType}
                            ></PopperGif>
                          </Popper>
                        )*/}
                      </div>
                    )}
                    {label === "2050s" && (
                      <div>
                        <Map_Option
                          activeCrop={activeCrop}
                          activeScenario={scn}
                          focus={focus}
                          activeRegion={activeRegion}
                          activeOpt={activeOpt}
                          CurrRisk={CurrRisk}
                          activeImpact={activeImpact}
                          sharedView={sharedView}
                          handleviewchange={handleviewchange}
                          activeOptLayer={activeOptLayer}
                          ImpactName={NameImpact}
                          displayLayer={displayLayer}
                          exploreType={exploreType}
                          activeScale={activeScale}
                          area_dict3={area_dict3}
                          area_dict4={area_dict4}
                          modelName={modelName}
                        ></Map_Option>
                        {(CurrRisk !== "" || activeOpt !== "" || NameImpact !== "") /* && RiskType() !== "Vulnerability" && RiskType() !== "Exposure" */ && (
                          <Popper
                            open={true} // Always open
                            anchorEl={gridRefs[index].current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [3, -120], // Adjust distance from the container
                                },
                              },
                            ]}
                          >
                            <Paper
                              elevation={1}
                              id={`legend-${scn}`}
                              sx={{
                                maxWidth: boxWidth - 18,
                                borderRadius: "5px",
                                padding: "3px",
                              }}
                            >
                              <Legend_Small
                                location={activeRegion}
                                commodity={activeCrop}
                                adaption={activeOpt}
                                RiskName={CurrRisk}
                                scenario={scn}
                                ImpactName={NameImpact}
                                area_data3={area_dict3}
                                area_data4={area_dict4}
                                AdaptLayerName={AdaptLayerName}
                                displayLayer={displayLayer}
                                activeScale={activeScale}
                              ></Legend_Small>
                            </Paper>
                          </Popper>
                        )}
                        {/* {(RiskType() === "Vulnerability" || RiskType() === "Exposure" || CurrRisk === "Exposure Index" || CurrRisk === "Vulnerability Index") && (
                          <Popper
                            open={true} // Always open
                            anchorEl={gridRefs[index].current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [4, 32 - boxHeight], // Adjust distance from the container
                                },
                              },
                            ]}
                          >
                            <Box
                              sx={{
                                height: boxHeight - 30,
                                width: boxWidth - 10,
                                bgcolor: "rgba(200, 200, 200, 0.9)",
                                alignContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily: "Karla",
                                }}
                              >
                                No data is currently available for this future scenario
                              </Typography>
                            </Box>
                          </Popper>
                        )} */}
                        {/* CurrRisk !== "" && (
                          <Popper
                            open={true}
                            anchorEl={gridRefs[index].current}
                            placement="bottom"
                            disablePortal={true}
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [boxWidth / 3 / 2 + 15 - boxWidth / 2, -(boxWidth / 3 + 180)],
                                },
                              },
                            ]}
                            sx={{ maxWidth: boxWidth / 3 }}
                          >
                            <PopperGif
                              activeCrop={activeCrop}
                              activeScenario={activeScenario}
                              activeRegion={activeRegion}
                              focus={focus}
                              activeOpt={activeOpt}
                              CurrRisk={CurrRisk}
                              activeImpact={activeImpact}
                              activeOptLayer={activeOptLayer}
                              modelName={modelName}
                              displayLayer={displayLayer}
                              activeScale={activeScale}
                              exploreType={exploreType}
                            ></PopperGif>
                          </Popper>
                        )*/}
                      </div>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {activeScenario["baseline"] === false && modelName !== "CHC" && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {["Baseline", "2050s", "2080s"].map((label, index) => (
                <Grid item xs={4} key={index} ref={gridRefs[index]}>
                  <Box
                    sx={(theme) => ({
                      width: "100%",
                      bgcolor: theme.palette.mode === "dark" ? "#2f6742" : "#C1E1C1",
                      height: "24px",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    })}
                  >
                    <Typography
                      align="center"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Karla",
                        color: "text.primary",
                      }}
                    >
                      {label}
                    </Typography>
                    {/* {(label==='2050s'||label==='2080s') && <FormControl size='small'>
                    <Select labelId="Scenariox"
                    id="future-model-select-idx"
                    sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}
                    value={futureModel} onChange={handleScenariochange}>
                      <MenuItem value="Absolute" sx={{paddingLeft:1,fontSize:'13px',height:'20px',fontWeight:'bold',fontFamily:'Karla'}}>Absolute values</MenuItem>
                      <Typography variant="subtitle1" sx={{paddingLeft:1,fontSize:'13px',fontWeight:'bold',fontFamily:'Karla'}}>Change in future</Typography>
                      <MenuItem value="Percentage Change" sx={{fontSize:'13px',height:'20px',fontFamily:'Karla'}}>Percentage change</MenuItem>
                      <MenuItem value="Absolute Change" sx={{fontSize:'13px',height:'20px',fontFamily:'Karla'}}>Absolute change</MenuItem>
                    </Select>
                    </FormControl>} */}
                  </Box>

                  <Paper
                    elevation={1}
                    sx={{
                      width: "100%",
                      height: activeOpt === "" ? "calc(100vh - 155px)" : "calc(100vh - 175px)",
                    }}
                  >
                    {label === "Baseline" && (
                      <div>
                        <Map_Option
                          activeCrop={activeCrop}
                          activeScenario="baseline"
                          focus={focus}
                          activeRegion={activeRegion}
                          activeOpt={activeOpt}
                          CurrRisk={CurrRisk}
                          activeImpact={activeImpact}
                          sharedView={sharedView}
                          handleviewchange={handleviewchange}
                          activeOptLayer={activeOptLayer}
                          ImpactName={NameImpact}
                          displayLayer={displayLayer}
                          exploreType={exploreType}
                          activeScale={activeScale}
                          area_dict3={area_dict3}
                          area_dict4={area_dict4}
                          modelName={modelName}
                        ></Map_Option>
                        {(CurrRisk !== "" || activeOpt !== "" || NameImpact !== "") && (
                          <Popper
                            open={true} // Always open
                            anchorEl={gridRefs[index].current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [3, -120], // Adjust distance from the container
                                },
                              },
                            ]}
                          >
                            <Paper
                              elevation={1}
                              id={`legend-baseline`}
                              sx={{
                                maxWidth: boxWidth - 18,
                                borderRadius: "5px",
                                padding: "3px",
                              }}
                            >
                              <Legend_Small
                                location={activeRegion}
                                commodity={activeCrop}
                                adaption={activeOpt}
                                RiskName={CurrRisk}
                                scenario="baseline"
                                ImpactName={NameImpact}
                                area_data3={area_dict3}
                                area_data4={area_dict4}
                                AdaptLayerName={AdaptLayerName}
                                displayLayer="Absolute"
                                activeScale={activeScale}
                              ></Legend_Small>
                            </Paper>
                          </Popper>
                        )}
                        {/* {CurrRisk !== "" && (
                          <Popper
                            open={true}
                            anchorEl={gridRefs[index].current}
                            placement="bottom"
                            disablePortal={true}
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [boxWidth / 3 / 2 + 15 - boxWidth / 2, -(boxWidth / 3 + 180)],
                                },
                              },
                            ]}
                            sx={{ maxWidth: boxWidth / 3 }}
                          >
                            <PopperGif
                              activeCrop={activeCrop}
                              activeScenario={activeScenario}
                              activeRegion={activeRegion}
                              focus={focus}
                              activeOpt={activeOpt}
                              CurrRisk={CurrRisk}
                              activeImpact={activeImpact}
                              activeOptLayer={activeOptLayer}
                              modelName={modelName}
                              displayLayer={displayLayer}
                              activeScale={activeScale}
                              exploreType={exploreType}
                            ></PopperGif>
                          </Popper>
                        )} */}
                      </div>
                    )}
                    {label === "2050s" && (
                      <div>
                        <Map_Option
                          activeCrop={activeCrop}
                          activeScenario={scn}
                          focus={focus}
                          activeRegion={activeRegion}
                          activeOpt={activeOpt}
                          CurrRisk={CurrRisk}
                          activeImpact={activeImpact}
                          sharedView={sharedView}
                          handleviewchange={handleviewchange}
                          activeOptLayer={activeOptLayer}
                          ImpactName={NameImpact}
                          displayLayer={displayLayer}
                          exploreType={exploreType}
                          activeScale={activeScale}
                          area_dict3={area_dict3}
                          area_dict4={area_dict4}
                          modelName={modelName}
                        ></Map_Option>
                        {(CurrRisk !== "" || activeOpt !== "" || NameImpact !== "") && (
                          <Popper
                            open={true} // Always open
                            anchorEl={gridRefs[index].current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [3, -120], // Adjust distance from the container
                                },
                              },
                            ]}
                          >
                            <Paper
                              elevation={1}
                              id={`legend-${scn}`}
                              sx={{
                                maxWidth: boxWidth - 18,
                                borderRadius: "5px",
                                padding: "3px",
                              }}
                            >
                              <Legend_Small
                                location={activeRegion}
                                commodity={activeCrop}
                                adaption={activeOpt}
                                RiskName={CurrRisk}
                                scenario={scn}
                                ImpactName={NameImpact}
                                area_data3={area_dict3}
                                area_data4={area_dict4}
                                AdaptLayerName={AdaptLayerName}
                                displayLayer={displayLayer}
                                activeScale={activeScale}
                              ></Legend_Small>
                            </Paper>
                          </Popper>
                        )}
                        {/* {CurrRisk !== "" && (
                          <Popper
                            open={true}
                            anchorEl={gridRefs[index].current}
                            placement="bottom"
                            disablePortal={true}
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [boxWidth / 3 / 2 + 15 - boxWidth / 2, -(boxWidth / 3 + 180)],
                                },
                              },
                            ]}
                            sx={{ maxWidth: boxWidth / 3 }}
                          >
                            <PopperGif
                              activeCrop={activeCrop}
                              activeScenario={activeScenario}
                              activeRegion={activeRegion}
                              focus={focus}
                              activeOpt={activeOpt}
                              CurrRisk={CurrRisk}
                              activeImpact={activeImpact}
                              activeOptLayer={activeOptLayer}
                              modelName={modelName}
                              displayLayer={displayLayer}
                              activeScale={activeScale}
                              exploreType={exploreType}
                            ></PopperGif>
                          </Popper>
                        )} */}
                      </div>
                    )}
                    {label === "2080s" && (
                      <div>
                        <Map_Option
                          activeCrop={activeCrop}
                          activeScenario={scn}
                          focus={focus}
                          activeRegion={activeRegion}
                          activeOpt={activeOpt}
                          CurrRisk={CurrRisk}
                          activeImpact={activeImpact}
                          sharedView={sharedView}
                          handleviewchange={handleviewchange}
                          activeOptLayer={activeOptLayer}
                          ImpactName={NameImpact}
                          displayLayer={displayLayer}
                          exploreType={exploreType}
                          activeScale={activeScale}
                          area_dict3={area_dict3}
                          area_dict4={area_dict4}
                          modelName={modelName}
                        ></Map_Option>
                        {(CurrRisk !== "" || activeOpt !== "" || NameImpact !== "") && (
                          <Popper
                            open={true} // Always open
                            anchorEl={gridRefs[index].current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [3, -120], // Adjust distance from the container
                                },
                              },
                            ]}
                          >
                            <Paper
                              elevation={1}
                              id={`legend-${scn}`}
                              sx={{
                                maxWidth: boxWidth - 18,
                                borderRadius: "5px",
                                padding: "3px",
                              }}
                            >
                              <Legend_Small
                                location={activeRegion}
                                commodity={activeCrop}
                                adaption={activeOpt}
                                RiskName={CurrRisk}
                                scenario={scn}
                                ImpactName={NameImpact}
                                area_data3={area_dict3}
                                area_data4={area_dict4}
                                AdaptLayerName={AdaptLayerName}
                                displayLayer={displayLayer}
                                activeScale={activeScale}
                              ></Legend_Small>
                            </Paper>
                          </Popper>
                        )}
                        {/* {CurrRisk !== "" && (
                          <Popper
                            open={true}
                            anchorEl={gridRefs[index].current}
                            placement="bottom"
                            disablePortal={true}
                            modifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [boxWidth / 3 / 2 + 15 - boxWidth / 2, -(boxWidth / 3 + 180)],
                                },
                              },
                            ]}
                            sx={{ maxWidth: boxWidth / 3 }}
                          >
                            <PopperGif
                              activeCrop={activeCrop}
                              activeScenario={activeScenario}
                              activeRegion={activeRegion}
                              focus={focus}
                              activeOpt={activeOpt}
                              CurrRisk={CurrRisk}
                              activeImpact={activeImpact}
                              activeOptLayer={activeOptLayer}
                              modelName={modelName}
                              displayLayer={displayLayer}
                              activeScale={activeScale}
                              exploreType={exploreType}
                            ></PopperGif>
                          </Popper>
                        )} */}
                      </div>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
