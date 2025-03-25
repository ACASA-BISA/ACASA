import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography, Link } from "@mui/material";
//import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "./LightTooltip";

export default function SwitchOpt_Crops({ activeCrop, activeOpt, changeOpt, activeOptLayer, changeOptLayer, exploreType }) {
  const switchh = ["Planting Technology", "Water Management", "Fertilizer Management"];
  const switchh_pulses = ["Planting Technology", "Water Management"];
  const directswitch = ["Stress Tolerant Variety"];
  const directswitchdown = ["ICT linked Input Management", "Crop Insurance"];

  const planting_rice = ["Early Sowing", "Precision Land Levelling", "Zero Tillage with residues", "Direct Seeded Rice - Dry", "Direct Seeded Rice - Wet", "System of Rice Intensification"];
  const planting_rice_popup = ["Early Sowing", "Precision Land Levelling", "Zero Tillage with residues", "Direct Seeded Rice - Dry", "Direct Seeded Rice - Wet", "System of Rice Intensification"];

  const water = ["Supplemental Irrigation", "Microirrigation", "Precision Water Management"];
  const water_popup = ["Supplemental Irrigation", "Microirrigation", "Precision Water Management"];

  const water_rice = ["Supplemental Irrigation", "Microirrigation", "Alternate Wetting and Drying", "Precision Water Management"];
  const water_rice_popup = ["Supplemental Irrigation", "Microirrigation", "Alternate Wetting and Drying", "Precision Water Management"];

  const fertilizer_rice = ["Smart fertilizer management", "Precision Fertilizer Management"];
  const fertilizer_rice_popup = ["Smart fertilizer management", "Precision Fertilizer Management"];

  const planting = ["Early Sowing", "Precision Land Levelling", "Zero Tillage with residues", "Broad Bed and Furrow"];
  const planting_popup = ["Early Sowing", "Precision Land Levelling", "Zero Tillage with residues", "Broad Bed and Furrow"];

  const fertilizer = ["Smart fertilizer management", "Precision Fertilizer Management"];
  const fertilizer_popup = ["Smart fertilizer management", "Precision Fertilizer Management"];

  const fullList = [
    "rice",
    "wheat",
    "maize",
    "barley",
    "sorghum",
    "fmillet",
    "pmillet",
    "safflower",
    "sunflower",
    "rapeseed",
    "sesame",
    "groundnut",
    "soyabean",
    "chickpea",
    "ppea",
    "bgram",
    "ggram",
    "lentil",
    "cotton",
    "jute",
    "rubber",
    "sugarcane",
    "tea",
    "coconut",
    "cattle",
    "buffalo",
    "goat",
    "sheep",
    "pig",
    "poultry",
    "freshwater",
    "bracklish",
    "marine",
    "coldwater",
    "potato",
    "onion",
    "tomato",
    "chilli",
    "mango",
    "banana",
  ];

  const Common = [
    "Rice",
    "Wheat",
    "Maize",
    "Barley",
    "Sorghum",
    "Finger Millet",
    "Pearl Millet",
    "Safflower",
    "Sunflower",
    "Rapeseed/Mustard",
    "Sesame",
    "Groundnut",
    "Soybean",
    "Chickpea",
    "Pigeonpea",
    "Black Gram",
    "Green Gram",
    "Lentil",
    "Cotton",
    "Jute",
    "Rubber",
    "Sugarcane",
    "Tea",
    "Coconut",
    "Cattle",
    "Buffalo",
    "Goat",
    "Sheep",
    "Pig",
    "Poultry",
    "Freshwater",
    "Bracklish",
    "Marine",
    "Cold water",
    "Potato",
    "Onion",
    "Tomato",
    "Chillies",
    "Mango",
    "Banana",
  ];

  const RegionalAdaptation = [
    "Stress tolerant varieties",
    "Diversification to legumes",
    "Zero tillage and residues",
    "Precision land leveling",
    "Microirrigation",
    "ICT-linked Precision water management",
    "ICT-linked Precision fertilizer management",
    "ICT-linked Precision input management",
    "Nature-based agriculture",
    "Climate-smart agriculture",
    "Insurance",
  ];

  let cropname = "Rice";
  fullList.forEach((sname, indx) => {
    if (activeCrop[sname] === true) {
      cropname = Common[indx];
    }
  });

  /*   const opt2 = ['Weather Services','Laser Land Levelling','Zero Tillage','BBR/FIRB','Early Sowing',
    'DSR (Dry Seed)','DSR (Wet Seed)','SRI','Insurance',
    'Adaptive Varities','Urea Placement','Arid & Semi-Arid','N Fertiliser (RDF)','PNM (Low Tech)',
    'PNM (High Tech)','Microirrigation','Precision WM','Supplimentary Irrigation',
    'Frost Gun','Slow Release Fertilizer','Micro-Environment','Fog/Mist Gun','Mechanical Support',
    'Fertilizer Timing','Shading Canopy','Cooling Canopy']; */

  /*   const fullList = ['rice','wheat','maize','sorghum','fmillet','pmillet',
    'safflower','sunflower','rapeseed','sesame','groundnut',
    'soyabean','chickpea','ppea','bgram','ggram','lentil',
    'cotton','jute','rubber','sugarcane','tea','coconut',
    'cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater',
    'potato','onion','tomato','chilli','mango','banana'];

  function PopulateOptions() {
    const DisableList = {};
    fullList.forEach((sname) => {
        if(activeCrop[sname] && sname === 'rice'){
          opt.map((option,index) => { 
          DisableList[option] = true;
          const list = [10,2,3,5,6,7,8,11,13,14,15,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'wheat'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'maize'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'sorghum'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,16,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
    });
    return DisableList;
  }

  const [DisableList, setDisableList] = React.useState(
    PopulateOptions
  ); */

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

  function checknotFish() {
    const fishes = ["freshwater", "bracklish", "marine", "coldwater"];
    let ans = true;
    fishes.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = false;
      }
    });
    return ans;
  }

  function checkpulses() {
    const cropwithoutfertilizer = ["soyabean", "chickpea", "ppea", "groundnut"];
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
      {/*
      {exploreType === "Commodity" && (
        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 1,
            })}
          >
            Select adaptation indicator for {cropname.toLowerCase()}
          </Typography>
        </FormLabel>
      )}
      {exploreType === "Regional" && (
        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 1,
            })}
          >
            Select adaptation indicator
          </Typography>
        </FormLabel>
      )}
      <FormGroup>
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Biophysical Suitability"]}
              name="Biophysical Suitability"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
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
              Biophysical suitability
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Technical Suitability"]}
              name="Technical Suitability"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
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
              Adaptation benefits
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Economic"]}
              name="Economic"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
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
              Economic benefits
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Scalibility"]}
              name="Scalibility"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
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
              Scalability
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Gender"]}
              name="Gender"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
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
              Gender suitability
            </Typography>
          }
        />
      </FormGroup>
      */}
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
                      {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
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
              Select adaptation option for {cropname.toLowerCase()}
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
                      {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
              </FormGroup>
            ))}
          {checkcrop() === true &&
            checkpulses() === false &&
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
                    {planting.map((sname, idx) => (
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
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
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
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
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
                    {water.map((sname, idx) => (
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
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
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
                    {planting.map((sname) => (
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
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {water.map((sname, idx) => (
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
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
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
          {activeCrop["rice"] === true &&
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
                    {planting_rice.map((sname, idx) => (
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
                                paddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{planting_rice_popup[idx]}</span>
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
                {state[sname1] && sname1 === "Fertilizer Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {fertilizer_rice.map((sname, idx) => (
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
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{fertilizer_rice_popup[idx]}</span>
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
                    {water_rice.map((sname, idx) => (
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
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_rice_popup[idx]}</span>
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
                      {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
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
