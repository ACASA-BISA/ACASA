import * as React from "react";
import Box from "@mui/material/Box";
//import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LocationOn } from "@mui/icons-material";
import { Popper } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useEffect, useRef, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { fetchDataAdap } from "./fetchDataAdap";
import { fetchthedataHzd } from "./fetchDataHzd";
/* import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; */

const size = {
  width: 150,
  height: 150,
};

const palette = ["#A52A2A", "#FF4500", "#FFDE4D", "#00FF00", "#059212"];

const palette2 = ["#059212", "#00FF00", "#FFDE4D", "#FFA500", "#FF0000"];

const color_comm = {
  Rice: "#5ec962",
  Wheat: "#f7e465",
  Maize: "#ffcc00",
  Sorghum: "#8b4513",
  Soybean: "#8c7658",
  Chickpea: "#b3a057",
  Pigeonpea: "#de815f",
  Mustard: "#FFDB58",
  Groundnut: "#d2691e",
  Potato: "#ab6042",
  Onion: "#8e507f",
  Cotton: "#5102b0",
  Cattle: "#8B4513",
  Cow: "#ac8e59",
  Buffalo: "#5c2f08",
  Pig: "#FFC0CB",
  Chicken: "#FF8C00",
  Sheep: "#5fdbfa",
  Goat: "#7ca67c",
  Barley: "#5ec962",
};

const unitrisk = {
  "Risk Index": "The risk index is derived from hazard, exposure and vulnerability indices",
  "Hazard Index": "Integrated index which combines multiple hazards",
  "Low temperature induced spikelet sterility": "Number of days with low temperature during anthesis period leading to spikelet sterility",
  "Untimely Rainfall": "Number of untimely rainfall days during the crop season",
  "Low temperature induced pollen sterility": "Number of days with low temperature during pollination under leading to pollen sterility",
  "High temperature induced pollen sterility": "Number of days with high temperature during pollination under leading to pollen sterility",
  "Heat Stress": "Number of days with high temperature",
  "High temperature induced spikelet sterility": "Number of days with high temperature during anthesis period leading to spikelet sterility",
  "Cold Stress": "Number of days with low temperature",
  "Low temperature induced tuberization failure": "Number of days with low temperature leading to tuberization failure",
  "Terminal Heat": "Number of days with high temperature during grain-filling phase",
  "Days of Frost": "Number of frost days",
  "Excess Rainfall and Waterlogging": "Number of excess rainfall days leading to waterlogging",
  "Delayed Monsoon": "Percentage of years with delayed monsoon",
  "Crop water deficit index": "Number of years with moderate or severe drought",
  "Dry Spell": "Number of dry spells",
  "Flood": "Number of flood events",
  "Lodging": "Number of days under high wind and rainfall after booting phase",
  "Biotic": "Number of days with high temperature and humidity leading to blight",
  "Excess Rainfall": "Number of excess rainfall days during the crop season",
  "Temperature-Humidity Index": "Number of days with high THI",
  "Hot days": "Number of days with high temperature",
  "Cold days": "Number of days with low temperature",
  "Extreme Rainfall days": " Number of excess rainfall days",
  "Rainfall Deficit": "Percentage of years with rainfall deficit",
  "Cyclone": "Degree of cyclone proneness",
  "Number of Animals per grid": "Total number of animals per grid [~5 X 5 km]",
  "Vulnerability Index": "Integrated index which combines multiple vulnerability layers",
  "Irrigation": "Area under irrigation per grid, %",
  "Volumetric Soil Water": "Available Water in mm/m",
  "Soil Organic Carbon": "Soil Organic Carbon in %",
  "Agriculture Income": "Agricultural GDP as proxy for income. Agricultural Gross Domestic Product data in US $ per grid [~5 X 5 km]",
  "Rural infrastructure": "Road density used as proxy for rural infrastructure. Road density is length of rural roads per grid, km/grid",
  "Socio-economic Development Indicator": "HDI used as proxy. Global estimates of the United Nations Human Development Index",
  "Feed/Fodder": "Production and Usage of cereal residues in tonnes per grid [~5 X 5 km]",
  "Cropped Area": "Area under crop in hectares per grid [~5 X 5 km]",
};

export default function LocationCard({ location, commodity, adaption, activeOptLayer, setHeight1, RiskName, scenario, ImpactName, area_data3, area_data4, exploreType, activeScale, displayLayer }) {
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
      setHeight1(cardHeight);
    }
  });

  function checkcrop() {
    const diffcrop = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (commodity === sname) {
        ans = false;
      }
    });
    return ans;
  }

  let AdaptLayerName = "";
  if (activeOptLayer["Biophysical Suitability"]) {
    AdaptLayerName = "Biophysical Suitability";
  }
  if (activeOptLayer["Yield"]) {
    AdaptLayerName = "Yield Benefits";
  }
  if (activeOptLayer["Economic"]) {
    AdaptLayerName = "Economic Viability";
  }
  if (activeOptLayer["Scalability"]) {
    AdaptLayerName = "Scalability";
  }
  if (activeOptLayer["Gender"]) {
    AdaptLayerName = "Gender Suitability";
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

  let data2 = [];
  if (adaption !== "") {
    const adaptation_data = fetchDataAdap(adaption, location, AdaptLayerName, commodity, scenario, area_data3);
    const total = adaptation_data[1].Area + adaptation_data[2].Area + adaptation_data[3].Area + adaptation_data[4].Area + adaptation_data[5].Area;
    data2 = [
      { label: adaptation_data[1].Cat, value: ((adaptation_data[1].Area * 100) / total).toFixed(0) },
      { label: adaptation_data[2].Cat, value: ((adaptation_data[2].Area * 100) / total).toFixed(0) },
      { label: adaptation_data[3].Cat, value: ((adaptation_data[3].Area * 100) / total).toFixed(0) },
      { label: adaptation_data[4].Cat, value: ((adaptation_data[4].Area * 100) / total).toFixed(0) },
      { label: adaptation_data[5].Cat, value: ((adaptation_data[5].Area * 100) / total).toFixed(0) },
    ];
  }

  let data3 = [];
  if (RiskName !== "") {
    const hazard_data = fetchthedataHzd(activeScale, RiskName, ImpactName, displayLayer, location, scenario, commodity, area_data4);
    const total = hazard_data[1].Area + hazard_data[2].Area + hazard_data[3].Area + hazard_data[4].Area + hazard_data[5].Area;
    data3 = [
      { label: hazard_data[1].Cat, value: ((hazard_data[1].Area * 100) / total).toFixed(0) },
      { label: hazard_data[2].Cat, value: ((hazard_data[2].Area * 100) / total).toFixed(0) },
      { label: hazard_data[3].Cat, value: ((hazard_data[3].Area * 100) / total).toFixed(0) },
      { label: hazard_data[4].Cat, value: ((hazard_data[4].Area * 100) / total).toFixed(0) },
      { label: hazard_data[5].Cat, value: ((hazard_data[5].Area * 100) / total).toFixed(0) },
    ];
  }

  function typrstr() {
    if (RiskType() === "Hazard") {
      return "hazard";
    }
    if (RiskType() === "Risk") {
      return "index";
    }
    if (RiskType() === "Exposure") {
      return "exposure";
    }
    if (RiskType() === "Vulnerability") {
      return "vuln.";
    }
  }

  function UnitFind(RiskName) {
    let x = unitrisk[RiskName];
    if (x) {
      x = "(" + x + ")";
      return x;
    }
    return "";
  }

  function RiskMethod() {
    let str = "Estimated risk";
    if (RiskName === "District Level" || RiskName === "Downscaled Risk") {
      str = "Measured risk";
    }
    return str;
  }

  function RiskType() {
    let str = "Hazard";
    if (RiskName === "Risk Index" || RiskName === "District Level" || RiskName === "Downscaled Risk") {
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
      RiskName === "Socio-economic Development Indicator"
    ) {
      str = "Vulnerability";
    }
    return str;
  }

  return (
    <Popper open={true}>
      <div
        ref={cardRef}
        style={{
          position: "fixed",
          right: 50,
          top: adaption === "" ? 142 : 170,
          boxShadow: (theme) => (theme.palette.mode === "dark" ? "0px 0px 0px #000" : "0px 0px 0px #aaa"),
          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#25292e" : "white"),
          border: (theme) => (theme.palette.mode === "dark" ? "0px solid #444" : "0px solid black"),
          width: "280px",
          borderRadius: "15px",
        }}
      >
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ justifyItems: "center", alignContent: "center", marginBottom: "-5px" }}>
            {" "}
            <Typography
              sx={(theme) => ({
                fontSize: 14,
                fontWeight: "bold",
                color: theme.palette.mode === "dark" ? "#81c784" : "#143200",
                marginLeft: "4px",
                marginTop: "-5px",
              })}
            >
              Your Selections
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ marginTop: -2, marginBottom: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <LocationOn
                fontSize="small"
                sx={(theme) => ({
                  color: theme.palette.mode === "dark" ? "#81c784" : "inherit",
                })}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: 14,
                  fontWeight: "bold",
                  color: theme.palette.mode === "dark" ? "#81c784" : "#143200",
                  marginLeft: "4px",
                })}
              >
                {location}
              </Typography>
            </Box>
            <Divider
              sx={(theme) => ({
                bgcolor: theme.palette.mode === "dark" ? "#3a4d3f" : "#e8ffea",
                borderBottomWidth: 2,
                marginTop: 0.3,
                marginBottom: 0.3,
              })}
            />
            {exploreType !== "Regional" && (
              <div>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={(theme) => ({
                      fontSize: 13,
                      color: theme.palette.mode === "dark" ? "#e0e0e0" : "black",
                    })}
                    gutterBottom
                  >
                    Commodity:&nbsp;
                  </Typography>
                  <Typography sx={{ fontSize: 13 }} color="text.secondary">
                    {commodity}
                  </Typography>
                </Box>
                <Divider
                  sx={(theme) => ({
                    bgcolor: theme.palette.mode === "dark" ? "#3a4d3f" : "#e8ffea",
                    borderBottomWidth: 2,
                    marginTop: "0px",
                    marginBottom: 0.3,
                  })}
                />
              </div>
            )}
            {(RiskName !== "" || adaption !== "") && (
              <div>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={(theme) => ({
                      fontSize: 13,
                      color: theme.palette.mode === "dark" ? "#e0e0e0" : "black",
                    })}
                    gutterBottom
                  >
                    Scenario:&nbsp;
                  </Typography>
                  <Typography sx={{ fontSize: 13 }} color="text.secondary">
                    {scenario}
                  </Typography>
                </Box>
                <Divider
                  sx={(theme) => ({
                    bgcolor: theme.palette.mode === "dark" ? "#3a4d3f" : "#e8ffea",
                    borderBottomWidth: 2,
                    marginTop: "0px",
                    marginBottom: 0.3,
                  })}
                />
              </div>
            )}
            {adaption !== "" && (
              <div>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={(theme) => ({
                      fontSize: 13,
                      color: theme.palette.mode === "dark" ? "#e0e0e0" : "black",
                    })}
                    flexWrap
                  >
                    {AdaptLayerName.charAt(0).toUpperCase() + AdaptLayerName.toLowerCase().slice(1)} of&nbsp;
                    <strong>{adaption.charAt(0).toUpperCase() + adaption.slice(1, 4) + adaption.toLowerCase().slice(4)}</strong> by area %:
                  </Typography>
                </Box>
              </div>
            )}
            {RiskName !== "" && (
              <div>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={(theme) => ({
                      fontSize: 13,
                      color: theme.palette.mode === "dark" ? "white" : "black",
                    })}
                  >
                    Risk Method:&nbsp;
                  </Typography>
                  <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
                    {RiskMethod()}
                  </Typography>
                </Box>
                <Typography
                  sx={(theme) => ({
                    fontSize: 13,
                    whiteSpace: "pre-wrap",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  })}
                >
                  {RiskType()}:&nbsp;
                  <Typography component="span" sx={{ fontSize: 13, fontWeight: "bold" }} color="text.secondary">
                    {RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}
                    &nbsp;
                    <Typography component="span" sx={{ fontSize: 12 }}>
                      {UnitFind(RiskName)}
                    </Typography>
                  </Typography>
                </Typography>
              </div>
            )}
            {ImpactName !== "" && (
              <div>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={(theme) => ({
                      fontSize: 13,
                      color: theme.palette.mode === "dark" ? "white" : "black",
                    })}
                  >
                    Impact:&nbsp;
                  </Typography>
                  <Typography sx={{ fontSize: 13 }} color="text.secondary">
                    {ImpactName.charAt(0).toUpperCase() + ImpactName.toLowerCase().slice(1)}
                  </Typography>
                </Box>
              </div>
            )}

            <Typography sx={{ fontSize: 13 }} color="black">
              {adaption === "" && RiskName === "" && ImpactName === "" && (
                <Box sx={{ marginTop: "2px", marginBottom: "-5px" }}>
                  {/* <Divider
                    sx={(theme) => ({
                      bgcolor: theme.palette.mode === "dark" ? "#3a4d3f" : "#e8ffea",
                      borderBottomWidth: 2,
                      marginTop: "0px",
                      marginBottom: 0.3,
                    })}
                  /> */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    {/* {checkcrop() &&
                      commodity !== "Rice" &&
                      commodity !== "Wheat" &&
                      commodity !== "Barley" &&
                      commodity !== "Soybean" &&
                      commodity !== "Cotton" &&
                      commodity !== "Jute" &&
                      commodity !== "Chickpea" &&
                      commodity !== "Maize" &&
                      commodity !== "Mustard" && (
                        <Box
                          sx={(theme) => ({
                            width: 20,
                            height: 20,
                            borderRadius: 1,
                            bgcolor: color_comm[commodity],
                            margin: "4px",
                          })}
                        />
                      )} */}
                    {/* {checkcrop() &&
                      commodity !== "Rice" &&
                      commodity !== "Wheat" &&
                      commodity !== "Barley" &&
                      commodity !== "Soybean" &&
                      commodity !== "Cotton" &&
                      commodity !== "Jute" &&
                      commodity !== "Chickpea" &&
                      commodity !== "Maize" &&
                      commodity !== "Mustard" && (
                        <Typography sx={{ fontSize: 13, margin: "4px" }} color="text.secondary">
                          Area under {commodity.toLowerCase()}
                        </Typography>
                      )} */}

                    <div>
                      {checkcrop() === false && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            margin: "4px",
                            fontWeight: "bold",
                          }}
                          color="text.secondary"
                        >
                          Region having {commodity.toLowerCase()} population
                        </Typography>
                      )}
                      {checkcrop() === true && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            margin: "4px",
                            fontWeight: "bold",
                          }}
                          color="text.secondary"
                        >
                          Area under {commodity.toLowerCase()}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 110,
                            borderRadius: 1,
                            background:
                              "linear-gradient(to top, rgba(255, 249, 196, 1), rgba(255, 230, 128, 1), rgba(255, 215, 0, 1), rgba(218, 165, 32, 1), rgba(160, 82, 45, 1), rgba(107, 61, 27, 1))",
                            margin: "4px",
                            marginLeft: "10px",
                          }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{
                              fontSize: 13,
                              marginX: "4px",
                              marginY: "1px",
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Very high
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 13,
                              marginX: "4px",
                              marginY: "1px",
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            High
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 13,
                              marginX: "4px",
                              marginY: "1px",
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Medium
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 13,
                              marginX: "4px",
                              marginY: "1px",
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Low
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 13,
                              marginX: "4px",
                              marginY: "1px",
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Very Low
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </Box>
                </Box>
              )}

              {adaption !== "" && (
                <Box sx={{ marginTop: "2px", marginBottom: "-5px" }}>
                  {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: "#bbb",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 13, margin:'4px' }} color="text.secondary" gutterBottom> 
                    {commodity} mask
                    </Typography>
                    </Box> */}

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      colors={palette}
                      series={[
                        {
                          arcLabel: (item) => `${item.value}%`,
                          arcLabelMinAngle: 5,
                          data: data2,
                          innerRadius: 25,
                          paddingAngle: 0,
                        },
                      ]}
                      slotProps={{
                        legend: { hidden: true },
                      }}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: "white",
                          fontWeight: "bold",
                        },
                      }}
                      {...size}
                    />
                    {/* <TableContainer component={Paper} sx={{marginTop:'7px', 'td,th':{border:'1px solid rgba(224, 224, 224, 1)',paddingX:'4px',paddingY:'2px'}}}>
            <Table size="small" aria-label="a dense table">
                <TableHead sx={{backgroundColor:'#eeeeee'}}>
                <TableRow>
                    <TableCell colSpan={3} sx={{fontWeight:'bold',backgroundColor:'#4b9e44',color:'#ffffff'}}>Legend & Statistics</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Category</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Area in 1000 ha</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Farmer population in millions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row,index) => (
                    <TableRow
                    key={index}
                    >
                    <TableCell component="th" scope="row" align="left">
                       {row.color}{row.Cat}
                    </TableCell>
                    <TableCell align="center">{row.Area}<Typography sx={{ fontSize: 13, margin:'2px',fontWeight:'normal' }} color="text.secondary" >({row.AreaPerc}%)</Typography></TableCell>
                    <TableCell align="center">{row.Population}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
                </TableContainer> */}
                  </Box>
                  {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 13, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#FF9A00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 13, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: "#06D001",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 13, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Suitable with adaptation benefits
                    </Typography>
                    </Box> */}
                </Box>
              )}
              {(RiskName === "Hazard Index" && checkcrop()) /* &&
                (commodity !== "Rice" ||
                  commodity !== "Wheat" ||
                  commodity !== "Barley" ||
                  commodity !== "Soybean" ||
                  commodity !== "Cotton" ||
                  commodity !== "Chickpea" ||
                  commodity !== "Maize" ||
                  commodity !== "Mustard") */ ||
                (ImpactName === "Productivity" && commodity === "Rice" && (
                  <Box sx={{ marginTop: "2px", marginBottom: "-5px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        gap: "1px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 1,
                            bgcolor: "#FF0000",
                            marginY: "4px",
                            marginX: "2px",
                          }}
                        />
                        <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                          Very High
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 1,
                            bgcolor: "#FFA500",
                            margin: "4px",
                            marginX: "2px",
                          }}
                        />
                        <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                          High
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 1,
                            bgcolor: "#FFDE4D",
                            margin: "4px",
                            marginX: "2px",
                          }}
                        />
                        <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                          Medium
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        gap: "1px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 1,
                            bgcolor: "#00FF00",
                            marginY: "4px",
                            marginX: "2px",
                          }}
                        />
                        <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                          Low
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 1,
                            bgcolor: "#059212",
                            margin: "4px",
                            marginX: "2px",
                          }}
                        />
                        <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                          Very Low
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 1,
                            bgcolor: "#bbb",
                            margin: "4px",
                            marginX: "2px",
                          }}
                        />
                        <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                          Nil
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              {/* {RiskName !== "" && RiskName !== "Hazard Index" && checkcrop()===false &&
                      <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
                      <Box sx={{width: 20,height: 85,borderRadius: 1,background: 'linear-gradient(to bottom, rgba(255,0,0,1),rgba(255, 165, 0,1),rgba(255, 255, 0,1),rgba(0, 255, 0,1),rgba(5, 146, 18,1) )',margin:'4px',marginLeft:'10px'}}/>
                      <Box sx={{display:'flex',flexDirection:'column'}}>
                      <Typography sx={{ fontSize: 13, marginX:'4px',marginY:'1px' }} color="text.secondary" gutterBottom> 
                      Very high
                      </Typography>
                      <Typography sx={{ fontSize: 13, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                      High
                      </Typography>
                      <Typography sx={{ fontSize: 13, marginX:'4px',marginY:'1px'  }} color="text.secondary" gutterBottom> 
                      Medium
                      </Typography>
                      <Typography sx={{ fontSize: 13, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                      Low
                      </Typography>
                      </Box>
                      
                      </Box> 
                    } */}
              {RiskName !== "" && (
                <Box sx={{ marginTop: "2px", marginBottom: "-5px" }}>
                  {/* <Box sx={{width:'100%', display:'flex',alignContent:'center'}}>
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right:10 }}
                      colors={palette}
                      series={[
                        {
                          arcLabel: (item) => `${item.value}`,
                          arcLabelMinAngle: 5,
                          data,
                        },
                      ]}
                      slotProps={{
                        legend: { hidden:true} 
                      }}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      {...size}
                    />
                    </Box> */}
                  {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: "#bbb",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 13, margin:'4px' }} color="text.secondary" gutterBottom> 
                    {commodity} mask
                    </Typography>
                    </Box> */}
                  {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
                    <Box sx={{width: 20,height: 85,borderRadius: 1,background: 'linear-gradient(to bottom, rgba(255,0,0,1),rgba(255, 165, 0,1),rgba(255, 255, 0,1),rgba(0, 255, 0,1),rgba(5, 146, 18,1) )',margin:'4px',marginLeft:'10px'}}/>
                    <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography sx={{ fontSize: 13, marginX:'4px',marginY:'1px' }} color="text.secondary" gutterBottom> 
                    Very high
                    </Typography>
                    <Typography sx={{ fontSize: 13, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    <Typography sx={{ fontSize: 13, marginX:'4px',marginY:'1px'  }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    <Typography sx={{ fontSize: 13, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
                    </Box>
                    </Box> */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      colors={palette2}
                      series={[
                        {
                          arcLabel: (item) => `${item.value}%`,
                          arcLabelMinAngle: 5,
                          data: data3,
                          innerRadius: 22,
                          paddingAngle: 0,
                        },
                      ]}
                      slotProps={{
                        legend: { hidden: true },
                      }}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: "white",
                          fontWeight: "bold",
                        },
                      }}
                      {...size}
                    />
                    {checkcrop() && RiskType() === "Hazard" && (
                      <Typography sx={{ fontSize: 12, margin: "4px", fontWeight: "bold" }} color="text.secondary">
                        Area affected
                      </Typography>
                    )}
                    {checkcrop() && RiskType() !== "Hazard" && (
                      <Typography sx={{ fontSize: 12, margin: "4px", fontWeight: "bold" }} color="text.secondary">
                        Area categories
                      </Typography>
                    )}

                    {checkcrop() === false && (
                      <Typography sx={{ fontSize: 12, margin: "4px", fontWeight: "bold" }} color="text.secondary">
                        Number of {commodity.toLowerCase()} by category
                      </Typography>
                    )}
                  </Box>
                  {/* <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: "1px" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                      <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: "#FF0000", marginY: "4px", marginX: "2px" }} />
                      <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                        Very High
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                      <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: "#FFA500", margin: "4px", marginX: "2px" }} />
                      <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                        High
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                      <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: "#FFDE4D", margin: "4px", marginX: "2px" }} />
                      <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                        Medium
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: "1px" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                      <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: "#00FF00", marginY: "4px", marginX: "2px" }} />
                      <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                        Low
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                      <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: "#059212", margin: "4px", marginX: "2px" }} />
                      <Typography sx={{ fontSize: 12, margin: "4px" }} color="text.secondary" gutterBottom>
                        Very Low
                      </Typography>
                    </Box>
                    {RiskType() === "Hazard" && (
                      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                        <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: "#bbb", margin: "4px", marginX: "2px" }} />
                        <Typography sx={{ fontSize: 12, margin: "4px", marginX: "2px" }} color="text.secondary" gutterBottom>
                          No {typrstr()}
                        </Typography>
                      </Box>
                    )}
                    {RiskType() !== "Hazard" && <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}></Box>}
                  </Box> */}
                </Box>
              )}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Popper>
  );
}
