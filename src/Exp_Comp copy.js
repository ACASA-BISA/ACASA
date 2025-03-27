import React from "react";
import { Grid, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Map_Option from "./Comp_Map"; // Assuming this is your map component
import "./font.css";
import "./extra.css";
import "./font2.css";
import Legend_Small from "./Legend_Small";

const Comm = [
  "Rice",
  "Wheat",
  "Maize",
  "Barley",
  "Sorghum",
  "Mustard",
  "Groundnut",
  "Soybean",
  "Chickpea",
  "Pigeonpea",
  "Cotton",
  "Jute",
  "Sugarcane",
  "Tea",
  "Potato",
  "Cattle",
  "Buffalo",
  "Goat",
  "Sheep",
  "Pig",
  "Chicken",
];

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
}) {
  let scn = "baseline";
  if (activeScenario["ssp245"]) {
    scn = "ssp245";
  } else if (activeScenario["ssp585"]) {
    scn = "ssp585";
  }

  const [futureModel, setFutureModel] = React.useState("ssp245");
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
    changeScenario(event.target.value);
    setFutureModel(event.target.value);
  };

  const boxref1 = React.useRef(null);
  const boxref2 = React.useRef(null);
  const boxref3 = React.useRef(null);

  const [boxstart1, setboxstart1] = React.useState(0);
  const [boxstart2, setboxstart2] = React.useState(0);
  const [boxstart3, setboxstart3] = React.useState(0);

  const [boxwidth1, setboxwidth1] = React.useState(0);
  const [boxwidth2, setboxwidth2] = React.useState(0);
  const [boxwidth3, setboxwidth3] = React.useState(0);

  React.useEffect(() => {
    if (boxref1.current) {
      setboxstart1(boxref1.current.offsetLeft);
      setboxwidth1(boxref1.current.offsetWidth);
    }
    if (boxref2.current) {
      setboxstart2(boxref2.current.offsetLeft);
      setboxwidth2(boxref2.current.offsetWidth);
    }
    if (boxref3.current) {
      setboxstart3(boxref3.current.offsetLeft);
      setboxwidth3(boxref3.current.offsetWidth);
    }
  });

  const [sharedView, setSharedView] = React.useState(null);

  const handleviewchange = (viewx) => {
    setSharedView({
      center: viewx.getCenter(),
      zoom: viewx.getZoom(),
    });
  };

  return (
    <div className="viewer-container" style={{ overflow: "hidden" }}>
      <Grid container sx={{ marginTop: "0px", paddingX: "1rem" }} columns={12}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {["Baseline", "2050s", "2080s"].map((label, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{ width: "100%", bgcolor: "#C1E1C1", height: "24px", display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", alignItems: "center", gap: "10px" }}
                >
                  <Typography align="center" sx={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Karla" }}>
                    {label}
                  </Typography>
                  {(label === "2050s" || label === "2080s") && (
                    <FormControl size="small">
                      <Select labelId="Scenariox" id="future-model-select-idx" sx={{ fontSize: "14px", height: "20px", fontFamily: "Karla" }} value={futureModel} onChange={handleScenariochange}>
                        <MenuItem value="ssp245" sx={{ fontSize: "14px", height: "20px", fontFamily: "Karla" }}>
                          SSP2-4.5
                        </MenuItem>
                        <MenuItem value="ssp585" sx={{ fontSize: "14px", height: "20px", fontFamily: "Karla" }}>
                          SSP5-8.5
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>

                <Paper elevation={1} sx={{ width: "100%", height: "calc(100vh - 155px)" }}>
                  {label === "Baseline" && (
                    <div ref={boxref1}>
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
                      ></Map_Option>
                      <Legend_Small
                        location={activeRegion}
                        commodity={activeCrop}
                        adaption={activeOpt}
                        RiskName={CurrRisk}
                        scenario="baseline"
                        ImpactName={activeImpact}
                        area_data3={area_dict3}
                        area_data4={area_dict4}
                        open_yes={true}
                        bottom_position={25}
                        left_position={boxstart1 + 5}
                        box_width={boxwidth1 - 10}
                      ></Legend_Small>
                    </div>
                  )}
                  {label === "2050s" && (
                    <div ref={boxref2}>
                      <Map_Option
                        activeCrop={activeCrop}
                        activeScenario="ssp245"
                        focus={focus}
                        activeRegion={activeRegion}
                        activeOpt={activeOpt}
                        CurrRisk={CurrRisk}
                        activeImpact={activeImpact}
                        sharedView={sharedView}
                        handleviewchange={handleviewchange}
                      ></Map_Option>
                      <Legend_Small
                        location={activeRegion}
                        commodity={activeCrop}
                        adaption={activeOpt}
                        RiskName={CurrRisk}
                        scenario="ssp245"
                        ImpactName={activeImpact}
                        area_data3={area_dict3}
                        area_data4={area_dict4}
                        open_yes={true}
                        bottom_position={25}
                        left_position={boxstart2 + 5}
                        box_width={boxwidth2 - 10}
                      ></Legend_Small>
                    </div>
                  )}
                  {label === "2080s" && (
                    <div ref={boxref3}>
                      <Map_Option
                        activeCrop={activeCrop}
                        activeScenario="ssp585"
                        focus={focus}
                        activeRegion={activeRegion}
                        activeOpt={activeOpt}
                        CurrRisk={CurrRisk}
                        activeImpact={activeImpact}
                        sharedView={sharedView}
                        handleviewchange={handleviewchange}
                      ></Map_Option>
                      <Legend_Small
                        location={activeRegion}
                        commodity={activeCrop}
                        adaption={activeOpt}
                        RiskName={CurrRisk}
                        scenario="ssp245"
                        ImpactName={activeImpact}
                        area_data3={area_dict3}
                        area_data4={area_dict4}
                        open_yes={true}
                        bottom_position={25}
                        left_position={boxstart3 + 5}
                        box_width={boxwidth3 - 10}
                      ></Legend_Small>
                    </div>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
