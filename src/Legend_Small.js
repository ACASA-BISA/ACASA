import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper, Tooltip } from "@mui/material";
import { fetchDataAdap } from "./fetchDataAdap";
import { fetchthedataHzd } from "./fetchDataHzd";

export default function Legend_Small({ location, commodity, adaption, RiskName, scenario, ImpactName, area_data3, area_data4, AdaptLayerName, displayLayer, activeScale }) {
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

  const shelter_master = ["Modify sheds and bathing", "Modify sheds", "For cold stress", "For natural hazards", "Micro climate", "Planting trees", "Heating management", "Mechanical cooling"];
  const feed_master = [
    "Ad lib water",
    "Balanced concentrate",
    "Mineral mixture",
    "Change feeding and grazing pattern",
    "Green fodder",
    "Fodder conservation",
    "Grassland and Silvi-pasture management",
    "Feeding pattern change",
    "Fat supplementation",
    "Protein supplementation",
    "Feed additives",
  ];
  const healthcare_master = ["Vaccination", "Deworming", "Control of vectors", "Parasite control", "Thinning of flock"];

  function calcpop(popu) {
    if (popu === 0) {
      return "None";
    }
    if (popu < 0.1) {
      if (displayLayer !== "Absolute") {
        return popu.toFixed(1) + " M";
      } else {
        return "<0.1 M";
      }
    }
    if (popu < 1 && popu >= 0.1) {
      if (displayLayer !== "Absolute") {
        return popu.toFixed(1) + " M";
      } else {
        return popu.toFixed(1) + " M";
      }
    }
    if (displayLayer !== "Absolute") {
      return popu.toFixed(1) + " M";
    }
    return popu.toFixed(1) + " M";
  }
  function calcarea(popu) {
    if (popu === 0) {
      return "None";
    }
    let unt = " Mha";
    if (checkcrop() === false) {
      unt = " M";
    }
    popu = popu / 1000000;
    if (popu < 0.1) {
      if (displayLayer !== "Absolute") {
        return popu.toFixed(1) + unt;
      } else {
        return "<0.1" + unt;
      }
    }
    if (popu < 1 && popu >= 0.1) {
      if (displayLayer !== "Absolute") {
        return popu.toFixed(1) + unt;
      } else {
        return popu.toFixed(1) + unt;
      }
    }
    //"+" +
    if (displayLayer !== "Absolute") {
      return popu.toFixed(1) + unt;
    }
    return popu.toFixed(1) + unt;
  }

  //const rows = fetchthedataTable();
  let rowshzd = [];
  rowshzd = fetchthedataHzd(activeScale, RiskName, ImpactName, displayLayer, location, scenario, commodity, area_data4);
  if (adaption !== "") {
    rowshzd = fetchDataAdap(activeScale, adaption, location, AdaptLayerName, commodity, scenario, area_data3);
  }

  function RiskType() {
    let str = "Hazard";
    if (
      RiskName === "Risk Index" ||
      RiskName === "Exposure Index" ||
      RiskName === "Vulnerability Index" ||
      RiskName === "District Level" ||
      RiskName === "Downscaled Risk" ||
      RiskName === "Hazard Index"
    ) {
      str = "Indices";
    }
    if (RiskName === "Number of Animals per grid" || RiskName === "Cropped Area") {
      str = "Exposure";
    }
    if (
      RiskName === "Irrigation" ||
      RiskName === "Volumetric Soil Water" ||
      RiskName === "Agriculture Income" ||
      RiskName === "Soil Organic Carbon" ||
      RiskName === "Feed/Fodder" ||
      RiskName === "Rural infrastructure" ||
      RiskName === "Socio-economic Development Indicator" ||
      RiskName === "Income"
    ) {
      str = "Vulnerability";
    }
    return str;
  }
  //maxWidth:'320px'

  if (adaption === "Supplemental irrigation (water harvesting structures/farm ponds)") {
    adaption = "Supplemental irrigation";
  }
  return (
    <div style={{ maxWidth: "500px", minWidth: "280px" }}>
      <Paper elevation={1} sx={{ padding: "10px", paddingBottom: "1px", borderRadius: "5px", boxShadow: "0px 0px 0px #aaa", textAlign: "left", justifyItems: "center" }}>
        {adaption !== "" && (
          <div>
            <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
              <Typography sx={(theme) => ({ fontSize: 11.5, marginBottom: "2px", color: theme.palette.mode === "dark" ? "white" : "black" })}>
                {AdaptLayerName === "Yield Benefits" && "Percent change in "}
                {/* {AdaptLayerName === "Adaptation Benefits" && scenario === "baseline" && "Percent change in "} */}
                {AdaptLayerName === "Biophysical Suitability" && checkcrop() === false && "Suitability"}
                {scenario === "baseline" && AdaptLayerName === "Adaptation Benefits" && <strong>Yield</strong>}
                {AdaptLayerName === "Yield Benefits" && "yield"}
                {(scenario !== "baseline" || AdaptLayerName !== "Adaptation Benefits") &&
                  (AdaptLayerName !== "Biophysical Suitability" || checkcrop() !== false) &&
                  AdaptLayerName !== "Yield Benefits" &&
                  AdaptLayerName.charAt(0).toUpperCase() + AdaptLayerName.toLowerCase().slice(1)}{" "}
                {(scenario !== "baseline" || AdaptLayerName !== "Adaptation Benefits") && checkcrop() === true && (
                  <span>
                    for&nbsp;
                    <strong>{adaption.charAt(0).toUpperCase() + adaption.slice(1, 4) + adaption.toLowerCase().slice(4)}</strong>
                  </span>
                )}
                {checkcrop() === false && (
                  <span>
                    for&nbsp;
                    {shelter_master.includes(adaption) && <strong>shelter management: </strong>}
                    {feed_master.includes(adaption) && <strong>feed management: </strong>}
                    {healthcare_master.includes(adaption) && <strong>healthcare management: </strong>}
                    <strong>{adaption.toLowerCase()}</strong>
                  </span>
                )}
              </Typography>
            </Box>
          </div>
        )}
        {ImpactName !== "" && (
          <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
            <Typography sx={(theme) => ({ fontSize: 11.5, marginBottom: "2px", color: theme.palette.mode === "dark" ? "white" : "black" })}>
              {scenario !== "baseline" && ImpactName === "Productivity" && "Percent change in "}
              {ImpactName === "Productivity" && <strong>Yield </strong>}
              {scenario === "baseline" && ImpactName === "Productivity" && "(kg/ha)"}
              <strong>{ImpactName !== "Productivity" && ImpactName.charAt(0).toUpperCase() + ImpactName.toLowerCase().slice(1)}</strong>
            </Typography>
          </Box>
        )}
        {RiskName !== "" && checkcrop() && (
          <div>
            <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
              <Typography sx={(theme) => ({ fontSize: 11.5, marginBottom: "2px", color: theme.palette.mode === "dark" ? "white" : "black" })}>
                <strong>{RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}</strong>
              </Typography>
            </Box>
          </div>
        )}
        {RiskName !== "" && checkcrop() === false && (
          <div>
            <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
              <Typography sx={(theme) => ({ fontSize: 11.5, marginBottom: "2px", color: theme.palette.mode === "dark" ? "white" : "black" })}>
                {RiskName === "Seasonal Rainfall" && <strong>Annual rainfall</strong>}
                {RiskName !== "Seasonal Rainfall" && <strong>{RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}</strong>}
              </Typography>
            </Box>
          </div>
        )}

        {(adaption !== "" || RiskName !== "" || ImpactName !== "") && (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-2px" }}>
              <Typography
                sx={(theme) => {
                  const spanColor = theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111";

                  return {
                    "fontSize": 11,
                    "marginBottom": "2px",
                    "color": theme.palette.mode === "dark" ? "white" : "black",
                    "& span": { color: spanColor, fontWeight: "normal", fontStyle: "italic" },
                  };
                }}
              >
                <span>Number of rural farm households, million (M)</span>
              </Typography>
            </Box>
          </div>
        )}
        <Typography sx={{ fontSize: 11, marginTop: "-5px" }} color="black">
          {/* { adaption === '' && RiskName === '' && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#5ec962',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" > 
                    Area under {commodity.toLowerCase()}
                    </Typography>
                    </Box>
                    </Box>} */}

          {/* {adaption !== '' &&
                    <Box sx={{width:'100%', display:'flex',flexDirection:'row',padding:0,justifyItems:'center',marginTop:'1px'}}>   
                    {rows.map((row,index) => ( 
                        <Box sx={{width:'33%',display:'flex',alignItems:'left',flexDirection:'column'}}>
                          {row.color}
                          <Box>
                          <Typography sx={{ fontSize: 10.5, fontWeight:'bold', margin:'2px'}} color="black" > {row.Cat} for {calcpop(row.Population)}</Typography>
                          {row.Cat==='Suitable' && <Typography sx={{ fontSize: 10, fontWeight:'normal'}} color="black" > (No significant hazards)</Typography>}
                          </Box>
                        </Box>
                        
                    ))}
                    </Box>
                    } */}
          {
            <div>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  justifyItems: "center",
                  marginTop: "1px",
                }}
              >
                {(ImpactName === "Productivity" || ImpactName === "Resilience") && (
                  <Box
                    sx={{
                      width: 20,
                      height: 18,
                      borderRadius: 0,
                      bgcolor: "rgba(150,150,150,1)",
                      alignContent: "center",
                      marginTop: "16px",
                      marginRight: "2px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        marginY: "auto",
                        marginLeft: "3px",
                      }}
                      color="white"
                    >
                      <strong>NA</strong>
                    </Typography>
                  </Box>
                )}
                {(AdaptLayerName === "Yield Benefits" ||
                  (AdaptLayerName === "Adaptation Benefits" && scenario === "baseline") ||
                  AdaptLayerName === "Economic Viability" ||
                  AdaptLayerName === "Scalability" ||
                  AdaptLayerName === "Gender Suitability" ||
                  AdaptLayerName === "Female labourer suitability" ||
                  AdaptLayerName === "Female cultivator suitability") && (
                  <Tooltip
                    title={
                      <Box
                        sx={{
                          width: 80,
                          height: 18,
                          borderRadius: 0,
                          bgcolor: "#A52A2A",
                          alignContent: "center",
                          marginTop: "16px",
                          marginRight: "2px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 10,
                            marginY: "auto",
                            marginX: "3px",
                          }}
                          color="white"
                        >
                          <strong>Unsuitable area</strong>
                        </Typography>
                      </Box>
                    }
                    placement="top"
                    open={true}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "white",
                          padding: 0,
                          //boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
                        },
                      },
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [20, 25], // adjust this if you want to tweak distance from anchor
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <div></div>
                    {/* <Box
                      sx={{
                        width: 20,
                        height: 18,
                        borderRadius: 0,
                        bgcolor: "#A52A2A",
                        alignContent: "center",
                        marginTop: "16px",
                        marginRight: "2px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 10,
                          marginY: "auto",
                          marginLeft: "3px",
                        }}
                        color="white"
                      >
                        <strong>US</strong>
                      </Typography>
                    </Box> */}
                  </Tooltip>
                )}

                {rowshzd.map((row, index) => (
                  <div>
                    {index !== 0 && (
                      <div>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "left",
                            flexDirection: "column",
                            width: "100%",
                            gap: "2px",
                          }}
                        >
                          {
                            //checkcrop() === true && ()
                            <Box sx={{ width: 63, height: 18, borderRadius: 0, marginBottom: "-4px" }}>
                              <Typography sx={(theme) => ({ fontSize: 10, marginLeft: "2px", color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111" })} fontWeight="bold">
                                {calcpop(row.Population)}
                              </Typography>
                            </Box>
                          }
                          {AdaptLayerName === "Adaptation Benefits" && scenario !== "baseline" && adaption !== "" ? (
                            <Box
                              sx={{
                                width: 90, //was 63
                                height: 18 + 10,
                                borderRadius: 0,
                                bgcolor: row.color,
                                alignContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  marginY: "auto",
                                  marginX: row.Cat.includes("Medium ") ? "0px" : "1px",
                                }}
                                color="white"
                                align="center"
                              >
                                {row.Cat.split("\n").map((line, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      display: "block",
                                      lineHeight: "1.3", // Adjust line height
                                      fontStyle: i === 1 ? "italic" : "normal",
                                      fontWeight: i === 1 ? "normal" : "bold",
                                      fontSize: i === 1 ? 8 : 10,
                                    }}
                                  >
                                    {line}
                                  </span>
                                ))}
                              </Typography>
                            </Box>
                          ) : null}
                          {(AdaptLayerName === "Gender Suitability" || AdaptLayerName === "Female labourer suitability" || AdaptLayerName === "Female cultivator suitability") && adaption !== "" && (
                            <Box
                              sx={{
                                width: 70,
                                height: 18 + 10,
                                borderRadius: 0,
                                bgcolor: row.color,
                                alignContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  marginY: "auto",
                                  marginX: row.Cat.includes("Medium ") ? "0px" : "1px",
                                }}
                                color={index <= 3 && index >= 2 ? "#111" : "white"}
                                align="center"
                              >
                                {row.Cat.split("\n").map((line, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      display: "block",
                                      lineHeight: "1.3", // Adjust line height
                                      fontStyle: i === 1 ? "italic" : "normal",
                                      fontWeight: i === 1 ? "normal" : "bold",
                                      fontSize: i === 1 ? 8 : 10,
                                    }}
                                  >
                                    {line}
                                  </span>
                                ))}
                              </Typography>
                            </Box>
                          )}
                          {((AdaptLayerName === "Biophysical Suitability" || AdaptLayerName === "Yield Benefits") && adaption !== "") || ImpactName !== "" ? (
                            <Box
                              sx={{
                                width: 63,
                                height: 18 + 10,
                                borderRadius: 0,
                                bgcolor: row.color,
                                alignContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  marginY: "auto",
                                  marginX: row.Cat.includes("Medium ") ? "0px" : "1px",
                                }}
                                color={index <= 4 && index >= 2 ? "#111" : "white"}
                                align="center"
                              >
                                {row.Cat.split("\n").map((line, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      display: "block",
                                      lineHeight: "1.3", // Adjust line height
                                      fontStyle: i === 1 ? "italic" : "normal",
                                      fontWeight: i === 1 ? "normal" : "bold",
                                      fontSize: i === 1 ? 8 : 10,
                                    }}
                                  >
                                    {line}
                                  </span>
                                ))}
                              </Typography>
                            </Box>
                          ) : null}
                          {(RiskName === "Seasonal Rainfall") ? (
                            <Box
                              sx={{
                                width: 63,
                                height: 18,
                                borderRadius: 0,
                                bgcolor: row.color,
                                alignContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  marginY: "auto",
                                  marginX: row.Cat.includes("Medium ") ? "0px" : "3px",
                                }}
                                color={index <= 2 && index >= 1 ? "#111" : "white"}
                                align={row.Cat.includes("Medium ") ? "center" : "left"}
                              >
                                {row.Cat.split("\n").map((line, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      display: "block",
                                      lineHeight: "1.3", // Adjust line height
                                      fontStyle: i === 1 ? "italic" : "normal",
                                      fontWeight: i === 1 ? "normal" : "bold",
                                      fontSize: i === 1 ? 8 : 10,
                                    }}
                                  >
                                    {line}
                                  </span>
                                ))}
                              </Typography>
                            </Box>
                          ) : null}

                          {/*{(AdaptLayerName === "Biophysical Suitability" || AdaptLayerName === "Yield Benefits") && adaption !== "" && (
                            <Box
                              sx={{
                                width: 63,
                                height: 18 + 10,
                                borderRadius: 0,
                                bgcolor: row.color,
                                alignContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  marginY: "auto",
                                  marginX: row.Cat.includes("Medium ") ? "0px" : "1px",
                                  //alignContent: "center",
                                  //justifyContent: "center",
                                }}
                                color={index <= 4 && index >= 2 ? "#111" : "white"}
                                align="center"
                              >
                                {row.Cat.split("\n").map((line, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      display: "block",
                                      lineHeight: "1.3", // Reduce this value as needed
                                      fontStyle: i === 1 ? "italic" : "normal",
                                      fontWeight: i === 1 ? "normal" : "bold",
                                      fontSize: i === 1 ? 8 : 10,
                                    }}
                                  >
                                    {line}
                                  </span>
                                ))}
                              </Typography>
                            </Box>
                          )}*/}
                          {!(
                            (AdaptLayerName === "Adaptation Benefits" && scenario !== "baseline" && adaption !== "") ||
                            ((AdaptLayerName === "Biophysical Suitability" ||
                              AdaptLayerName === "Yield Benefits" ||
                              AdaptLayerName === "Gender Suitability" ||
                              AdaptLayerName === "Female labourer suitability" ||
                              AdaptLayerName === "Female cultivator suitability") &&
                              adaption !== "") || (RiskName === "Seasonal Rainfall") ||
                            ImpactName !== ""
                          ) && (
                            <Box
                              sx={{
                                width: 63,
                                height: 18,
                                borderRadius: 0,
                                bgcolor: row.color,
                                alignContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  marginY: "auto",
                                  marginX: row.Cat.includes("Medium ") ? "0px" : "3px",
                                }}
                                color={index <= 4 && index >= 2 ? "#111" : "white"}
                                align={row.Cat.includes("Medium ") ? "center" : "left"}
                              >
                                <strong>{row.Cat}</strong>
                              </Typography>
                            </Box>
                          )}
                          <Box sx={{ width: 63, height: 18, borderRadius: 0 }}>
                            <Typography
                              sx={(theme) => ({ fontSize: 10, margin: "2px", marginTop: "0px", color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111" })}
                              fontWeight="bold"
                            >
                              {calcarea(row.Area)}
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    )}
                  </div>
                ))}
              </Box>
              {/* {rowshzd.map((row,index) => (
                          <div>
                          {index===0 &&
                              <div>
                                  <Box sx={{display:'flex',alignItems:'left',flexDirection:'row',width:'100%'}}>
                                      <Box sx={{width: 110,height: 18,borderRadius: 0,bgcolor:row.color, margin:0, alignContent:'center'}}>
                                      <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                          <strong>{row.Cat}</strong>
                                      </Typography>
                                      </Box>
                                      {checkcrop()===true && <Box>
                                      <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'>{calcpop(row.Population)}</Typography>
                                      </Box>}
                                      <Box>
                                      <Typography sx={{ fontSize: 10, margin:'2px'}} color="#859F3D" fontWeight='bold'>{calcarea(row.Area)}</Typography>
                                      </Box>
                                  </Box>
                              </div>
                          }
                          </div>
                      ))} */}
            </div>
          }
          {/* {(((RiskName !== "" && RiskType()==="Vulnerability"))) &&
                    <div>
                      <Box sx={{width:'100%', display:'flex',flexDirection:'row',padding:0,justifyItems:'center',marginTop:'1px'}}>   
                      {rowshzd.map((row,index) => (
                          <div>
                          {index!==0 && 
                                <div>
                                    <Box sx={{display:'flex',alignItems:'left',flexDirection:'column',width:'100%',gap:'2px'}}>
                                    {checkcrop()===true && <Box sx={{width: 63, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'> {calcpop(row.Population)}</Typography>
                                        </Box>}
                                        <Box sx={{width: 63, height: 18, borderRadius: 0, bgcolor:row.color, alignContent:'center'}}>
                                        <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                        <strong>{row.Cat}</strong>
                                        </Typography>
                                        </Box>
                                        <Box sx={{width: 63, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#859F3D" fontWeight='bold'> {calcarea(row.Area)}</Typography>
                                        </Box>
                                    </Box>
                                </div>
                                }
                          </div>
                      ))}
                      </Box>
                    </div>
                    }
                    {(((RiskName !== "" && (RiskType()==="Exposure"||RiskType()==='Risk')))) &&
                    <div>
                    <Box sx={{width:'100%', display:'flex',flexDirection:'row',padding:0,justifyItems:'center',marginTop:'1px'}}>   
                      {rowshzd.map((row,index) => (
                          <div>
                          {index!==0 && 
                                <div>
                                    <Box sx={{display:'flex',alignItems:'left',flexDirection:'column',width:'100%',gap:'2px'}}>
                                    {checkcrop()===true && <Box sx={{width: 63, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'> {calcpop(row.Population)}</Typography>
                                        </Box>}
                                        <Box sx={{width: 63, height: 18, borderRadius: 0, bgcolor:row.color, alignContent:'center'}}>
                                        <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                        <strong>{row.Cat}</strong>
                                        </Typography>
                                        </Box>
                                        <Box sx={{width: 63, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#859F3D" fontWeight='bold'> {calcarea(row.Area)}</Typography>
                                        </Box>
                                    </Box>
                                </div>
                                }
                          </div>
                      ))}
                      </Box>
                    </div>
                    } */}
          {
            //Green Color of "#859F3D"
            //Purple Color of "#AA5486"
          }
        </Typography>
        {(adaption !== "" || RiskName !== "" || ImpactName !== "") && checkcrop() && (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-2px" }}>
              <Typography
                sx={(theme) => {
                  const spanColor = theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111";

                  return {
                    "fontSize": 11,
                    "marginBottom": "2px",
                    "color": theme.palette.mode === "dark" ? "white" : "black",
                    "& span": { color: spanColor, fontWeight: "normal", fontStyle: "italic" },
                  };
                }}
              >
                <span>{commodity} area, million hectare (Mha)</span>
              </Typography>
            </Box>
          </div>
        )}
        {(adaption !== "" || RiskName !== "" || ImpactName !== "") && checkcrop() === false && (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-2px" }}>
              <Typography
                sx={(theme) => {
                  const spanColor = theme.palette.mode === "dark" ? theme.palette.text.secondary : "#111";

                  return {
                    "fontSize": 11,
                    "marginBottom": "2px",
                    "color": theme.palette.mode === "dark" ? "white" : "black",
                    "& span": { color: spanColor, fontWeight: "normal", fontStyle: "italic" },
                  };
                }}
              >
                <span>
                  Number of {commodity.toLowerCase()}
                  {commodity === "Buffalo" ? "es" : commodity === "Sheep" || commodity === "Cattle" ? "" : "s"}, million (M)
                </span>
              </Typography>
            </Box>
          </div>
        )}
        {RiskType() === "Vulnerability" && (
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "-2px",
              marginTop: "-2px",
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                marginX: "-2px",
                fontWeight: "normal",
              }}
              color="text.secondary"
            >
              (Lower {RiskName.toLowerCase()} depicts higher vulnerability)
            </Typography>
          </Box>
        )}
      </Paper>
    </div>
  );
}
