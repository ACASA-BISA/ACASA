import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography, Link } from "@mui/material";
//import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
//import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "./LightTooltip";

export default function SwitchOpt_Crops({ activeCrop, activeOpt, changeOpt, activeOptLayer, changeOptLayer, exploreType, CropName }) {
  const switchh = ["Planting Technology", "Water Management", "Fertilizer Management"];
  const switchh_pulses = ["Planting Technology", "Water Management"];
  const switch_new = ["Water Management"];
  const switch_new2 = ["Fertilizer Management", "Water Management"];

  const directswitch = ["Stress tolerant variety"];
  const directswitchdown = ["ICT linked input management", "Crop insurance"];

  const planting_rice = [
    "Early sowing/changing planting dates",
    "Precision land levelling",
    "Zero tillage with residue retention",
    "Dry - Direct seeded rice",
    "Wet - Direct seeded rice",
    "System of rice intensification",
  ];
  const planting_rice_popup = [
    "Early sowing/changing planting dates",
    "Precision land levelling",
    "Zero tillage with residue retention",
    "Dry - Direct seeded rice",
    "Wet - Direct seeded rice",
    "System of rice intensification",
  ];

  const water = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Precision water management"];
  const water_popup = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Precision water management"];

  const water_rice = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Alternate wetting and drying", "Precision water management"];
  const water_rice_popup = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Alternate wetting and drying", "Precision water management"];

  const fertilizer_rice = ["Smart fertilizer management", "Precision fertilizer management"];
  const fertilizer_rice_popup = ["Smart fertilizer management", "Precision fertilizer management"];

  const planting = ["Early sowing/changing planting dates", "Precision land levelling", "Zero tillage with residue retention", "Broadbed and furrow"];
  const planting_popup = ["Early sowing/changing planting dates", "Precision land levelling", "Zero tillage with residue retention", "Broadbed and furrow"];

  const fertilizer = ["Smart fertilizer management", "Precision fertilizer management"];
  const fertilizer_popup = ["Smart fertilizer management", "Precision fertilizer management"];

  const RegionalAdaptation = [
    "Stress tolerant varieties",
    "Diversification to legumes",
    "Zero tillage and residues",
    "Precision land leveling",
    "Microirrigation",
    "ICT-linked precision water management",
    "ICT-linked precision fertilizer management",
    "ICT-linked precision input management",
    "Nature-based agriculture",
    "Climate-smart agriculture",
    "Insurance",
  ];

  const cropTechnologies = {
    planting: {
      Rice: ["Early sowing/changing planting dates", "Dry - Direct seeded rice", "Wet - Direct seeded rice", "System of rice intensification"],
      Wheat: ["Precision land levelling", "Zero tillage with residue retention", "Broadbed and furrow", "Early sowing/changing planting dates"],
      Barley: ["Zero tillage with residue retention", "Broadbed and furrow", "Early sowing/changing planting dates"],
      Maize: ["Zero tillage with residue retention", "Broadbed and furrow", "Early sowing/changing planting dates", "Mulching"],
      Sorghum: ["Mulching"],
      Millets: ["Mulching"],
      Chickpea: ["Mulching"],
      Pigeonpea: ["Mulching"],
      Soybean: ["Broadbed and furrow", "Mulching"],
      Mustard: ["Broadbed and furrow"],
      Cotton: [],
      Potato: ["Precision land levelling", "Broadbed and furrow"],
      Groundnut: [],
      Lentil: [],
      Jute: [],
    },
    water: {
      Rice: ["Microirrigation", "Alternate wetting and drying", "Precision water management"],
      Wheat: ["Microirrigation", "Precision water management"],
      Barley: ["Microirrigation", "Precision water management"],
      Maize: ["Microirrigation", "Precision water management", "Supplemental irrigation (water harvesting structures/farm ponds)"],
      Sorghum: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Millets: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Chickpea: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Pigeonpea: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Soybean: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Mustard: ["Microirrigation", "Precision water management"],
      Cotton: ["Microirrigation", "Precision water management", "Supplemental irrigation (water harvesting structures/farm ponds)"],
      Potato: ["Microirrigation", "Precision water management"],
      Groundnut: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Lentil: ["Microirrigation", "Precision water management"],
      Jute: [],
    },

    getPlantingTechniques(cropName) {
      return this.planting[cropName] || [];
    },

    getWaterTechniques(cropName) {
      return this.water[cropName] || [];
    },
  };

  function createInitialTodos() {
    const initialTodos = {};
    switchh.forEach((sname) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  }

  function checkcrop() {
    const diffcrop = ["cattle", "buffalo", "goat", "sheep", "pig", "poultry", "freshwater", "bracklish", "marine", "coldwater", "rice"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = false;
      }
    });
    return ans;
  }

  function checkpulses() {
    const cropwithoutfertilizer = ["soyabean", "chickpea", "ppea", "millets"];
    let ans = false;
    cropwithoutfertilizer.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = true;
      }
    });
    return ans;
  }

  function thirdComb() {
    const cropwithoutfertilizer = ["groundnut", "lentil"];
    let ans = false;
    cropwithoutfertilizer.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = true;
      }
    });
    return ans;
  }

  function forthComb() {
    const cropwithoutfertilizer = ["cotton"];
    let ans = false;
    cropwithoutfertilizer.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = true;
      }
    });
    return ans;
  }

  const [state, setState] = React.useState(createInitialTodos);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    "width": 32 + padd,
    "height": 14 + padd,
    "padding": padd / 2,
    "display": "flex",

    "& .MuiSwitch-switchBase": {
      "padding": 2 + padd / 2,
      "&.Mui-checked": {
        "transform": "translateX(16px)",
        "color": "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 10,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.10)",
      boxSizing: "border-box",
    },
    "&:hover": {
      "backgroundColor": theme.palette.mode === "dark" ? "#554d38" : "#ffe89c",
      "opacity": 1,
      "borderRadius": 12,
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.7)",
      },
    },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "alignItems": "flex-start",
    "&.Mui-disabled .MuiTypography-body2": {
      color: theme.palette.mode === "dark" ? "#888" : "#E8E8E8",
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard" sx={{ paddingTop: 1, paddingLeft: 3 }}>
      {
        // sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)
      }
      {exploreType === "Regional" && (
        <div>
          {" "}
          <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "white" : "black",
                fontWeight: "bold",
                fontSize: 14,
                paddingTop: 1,
              })}
            >
              Select adaptation option
            </Typography>
          </FormLabel>
          <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 1 }}>
            {RegionalAdaptation.map((sname) => (
              <FormGroup>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                  disabled={false}
                  key={sname}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname}
                    </Typography>
                  }
                />
              </FormGroup>
            ))}
          </FormControl>
        </div>
      )}
      {exploreType === "Commodity" && (
        <div>
          {" "}
          <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "white" : "black",
                fontWeight: "bold",
                fontSize: 14,
                paddingTop: 1,
              })}
            >
              Select adaptation option for {CropName.toLowerCase()}
            </Typography>
          </FormLabel>
          {(checkcrop() === true || activeCrop["rice"] === true) &&
            directswitch.map((sname) => (
              <FormGroup>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                  disabled={false}
                  key={sname}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname}
                    </Typography>
                  }
                />
              </FormGroup>
            ))}
          {(checkcrop() === true || activeCrop["rice"] === true) &&
            checkpulses() === false &&
            thirdComb() === false &&
            forthComb() === false &&
            switchh.map((sname1) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={state[sname1]} onChange={handleChange(sname1)} name={sname1} />}
                  key={sname1}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname1.charAt(0).toUpperCase() + sname1.slice(1, 4) + sname1.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {state[sname1] && sname1 === "Planting Technology" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {cropTechnologies.getPlantingTechniques(CropName).map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{planting_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Fertilizer Management" && checkpulses() === false && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {fertilizer.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{fertilizer_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {cropTechnologies.getWaterTechniques(CropName).map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {checkcrop() === true &&
            checkpulses() === true &&
            switchh_pulses.map((sname1) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={state[sname1]} onChange={handleChange(sname1)} name={sname1} />}
                  key={sname1}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname1.charAt(0).toUpperCase() + sname1.slice(1, 4) + sname1.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {state[sname1] && sname1 === "Planting Technology" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {cropTechnologies.getPlantingTechniques(CropName).map((sname) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {cropTechnologies.getWaterTechniques(CropName).map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {checkcrop() === true &&
            forthComb() === true &&
            switch_new2.map((sname1) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={state[sname1]} onChange={handleChange(sname1)} name={sname1} />}
                  key={sname1}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname1.charAt(0).toUpperCase() + sname1.slice(1, 4) + sname1.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {state[sname1] && sname1 === "Fertilizer Management" && checkpulses() === false && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {fertilizer.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{fertilizer_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {cropTechnologies.getWaterTechniques(CropName).map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {checkcrop() === true &&
            thirdComb() === true &&
            switch_new.map((sname1) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={state[sname1]} onChange={handleChange(sname1)} name={sname1} />}
                  key={sname1}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname1.charAt(0).toUpperCase() + sname1.slice(1, 4) + sname1.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {cropTechnologies.getWaterTechniques(CropName).map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {(checkcrop() === true || activeCrop["rice"] === true) &&
            directswitchdown.map((sname) => (
              <FormGroup>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                  disabled={false}
                  key={sname}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname}
                    </Typography>
                  }
                />
              </FormGroup>
            ))}
        </div>
      )}
    </FormControl>
  );
}
