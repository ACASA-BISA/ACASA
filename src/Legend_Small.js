import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { fetchDataAdap } from "./fetchDataAdap";
import { fetchthedataHzd } from "./fetchDataHzd";

export default function Legend_Small({ location, commodity, adaption, RiskName, scenario, ImpactName, area_data3, area_data4, AdaptLayerName, displayLayer, activeScale }) {
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

  function calcpop(popu) {
    if (popu === 0) {
      return "None";
    }
    if (popu < 0.1) {
      if (displayLayer !== "Absolute") {
        return Math.round(popu) + " M";
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
      return Math.round(popu) + " M";
    }
    return Math.round(popu) + " M";
  }
  function calcarea(popu) {
    if (popu === 0) {
      return "None";
    }
    popu = popu / 1000000;
    if (popu < 0.1) {
      if (displayLayer !== "Absolute") {
        return Math.round(popu) + " Mha";
      } else {
        return "<0.1 Mha";
      }
    }
    if (popu < 1 && popu >= 0.1) {
      if (displayLayer !== "Absolute") {
        return popu.toFixed(1) + " Mha";
      } else {
        return popu.toFixed(1) + " Mha";
      }
    }
    //"+" +
    if (displayLayer !== "Absolute") {
      return Math.round(popu) + " Mha";
    }
    return Math.round(popu) + " Mha";
  }

  //const rows = fetchthedataTable();
  let rowshzd = [];
  rowshzd = fetchthedataHzd(activeScale, RiskName, ImpactName, displayLayer, location, scenario, commodity, area_data4);
  if (adaption !== "") {
    rowshzd = fetchDataAdap(adaption, location, AdaptLayerName, commodity, scenario, area_data3);
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
      RiskName === "Soil Water Holding Capacity" ||
      RiskName === "Agriculture Income" ||
      RiskName === "Soil Organic Carbon" ||
      RiskName === "Feed/Fodder" ||
      RiskName === "Rural infrastructure" ||
      RiskName === "Economic Development Indicator" ||
      RiskName === "Income"
    ) {
      str = "Vulnerability";
    }
    return str;
  }
  //maxWidth:'320px'
  return (
    <div style={{ maxWidth: "320px" }}>
      <Paper elevation={1} sx={{ padding: "10px", borderRadius: "5px", boxShadow: "0px 0px 0px #aaa", textAlign: "left" }}>
        {adaption !== "" && (
          <div>
            <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
              <Typography sx={{ fontSize: 11, marginBottom: "2px" }} color="black">
                {AdaptLayerName.charAt(0).toUpperCase() + AdaptLayerName.toLowerCase().slice(1)} of&nbsp;
                <strong>{adaption.charAt(0).toUpperCase() + adaption.slice(1, 4) + adaption.toLowerCase().slice(4)}</strong>
              </Typography>
            </Box>
          </div>
        )}
        {ImpactName !== "" && (
          <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
            <Typography sx={{ fontSize: 11, marginBottom: "2px" }} color="black">
              Impact on <strong>{ImpactName.toLowerCase()}</strong>
            </Typography>
          </Box>
        )}
        {RiskName !== "" && checkcrop() && (
          <div>
            <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
              <Typography sx={{ fontSize: 11, marginBottom: "2px" }} color="black">
                <strong>{RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}</strong>
              </Typography>
            </Box>
          </div>
        )}
        {RiskName !== "" && checkcrop() === false && (
          <div>
            <Box sx={{ display: "flex", marginTop: "-10px", justifyContent: "center" }}>
              <Typography sx={{ fontSize: 11, marginBottom: "2px" }} color="black">
                <strong>{RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}</strong>
              </Typography>
            </Box>
          </div>
        )}

        {(adaption !== "" || RiskName !== "" || ImpactName !== "") && (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-2px" }}>
              <Typography sx={{ fontSize: 11, marginBottom: "2px" }} color="black">
                <span style={{ color: "#AA5486", fontWeight: "bold" }}>Number of farm households, million</span>
              </Typography>
            </Box>
          </div>
        )}
        <Typography sx={{ fontSize: 12, marginTop: "-5px" }} color="black">
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
                          {checkcrop() === true && (
                            <Box sx={{ width: 58, height: 18, borderRadius: 0, marginBottom: "-4px" }}>
                              <Typography sx={{ fontSize: 10, marginLeft: "2px" }} color="#AA5486" fontWeight="bold">
                                {calcpop(row.Population)}
                              </Typography>
                            </Box>
                          )}
                          <Box
                            sx={{
                              width: 58,
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
                                marginLeft: "3px",
                              }}
                              color={row.color === "rgba(241, 233, 119, 1)" ? "black" : "white"}
                            >
                              <strong>{row.Cat}</strong>
                            </Typography>
                          </Box>
                          <Box sx={{ width: 58, height: 18, borderRadius: 0 }}>
                            <Typography sx={{ fontSize: 10, margin: "2px", marginTop: "0px" }} color="#859F3D" fontWeight="bold">
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
                                    {checkcrop()===true && <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'> {calcpop(row.Population)}</Typography>
                                        </Box>}
                                        <Box sx={{width: 58, height: 18, borderRadius: 0, bgcolor:row.color, alignContent:'center'}}>
                                        <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                        <strong>{row.Cat}</strong>
                                        </Typography>
                                        </Box>
                                        <Box sx={{width: 58, height: 18, borderRadius: 0}}>
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
                                    {checkcrop()===true && <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'> {calcpop(row.Population)}</Typography>
                                        </Box>}
                                        <Box sx={{width: 58, height: 18, borderRadius: 0, bgcolor:row.color, alignContent:'center'}}>
                                        <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                        <strong>{row.Cat}</strong>
                                        </Typography>
                                        </Box>
                                        <Box sx={{width: 58, height: 18, borderRadius: 0}}>
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
        </Typography>
        {(adaption !== "" || RiskName !== "" || ImpactName !== "") && checkcrop() && (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "-4px", marginTop: "-4px" }}>
              <Typography sx={{ fontSize: 11, marginBottom: "2px" }} color="black">
                <span style={{ color: "#859F3D", fontWeight: "bold" }}>Cropped area, million hectare</span>
              </Typography>
            </Box>
          </div>
        )}
        {(adaption !== "" || RiskName !== "" || ImpactName !== "") && checkcrop() === false && (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "-10px", marginTop: "-4px" }}>
              <Typography sx={{ fontSize: 11, marginBottom: "2px" }} color="black">
                <span style={{ color: "#859F3D", fontWeight: "bold" }}>Number of animals, million</span>
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
              marginBottom: "-10px",
              marginTop: "0px",
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
