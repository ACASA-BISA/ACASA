import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Tooltip, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "./LightTooltip";

export default function SwitchOpt_Livestock({ activeCrop, activeOpt, changeOpt, activeOptLayer, changeOptLayer, exploreType, CropName }) {
  const switchh = ["Planting Technology", "Water Management", "Fertilizer Management"];
  const switchh_pulses = ["Planting Technology", "Water Management"];
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

  const water = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Precision water management"];

  const water_rice = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Precision water management", "Alternate wetting and drying"];

  const fertilizer_rice = ["Fertilizer rating and timing", "Precision fertilizer management"];

  const planting = ["Early sowing/changing planting dates", "Precision land levelling", "Zero tillage with residue retention", "Broadbed and furrow"];

  const fertilizer = ["Fertilizer rating and timing", "Precision fertilizer management"];

  const livestock = ["Shelter management", "Feed management", "Healthcare management"];

  const marine = ["To be Updated"];

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
    'cattle','buffalo','goat','sheep','pig','chicken',
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
    const diffcrop = ["cattle", "buffalo", "goat", "sheep", "pig", "chicken", "freshwater", "bracklish", "marine", "coldwater", "rice"];
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

  function createInitialLivestockSwitches() {
    const initialTodos = {};
    livestock.forEach((sname) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  }

  const [state, setState] = React.useState(createInitialTodos);

  const [livestockstate, setLivestockState] = React.useState(createInitialLivestockSwitches);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleLivestockChange = (name) => (event) => {
    setLivestockState({ ...livestockstate, [name]: event.target.checked });
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
            Select adaptation indicator for {CropName.toLowerCase()}
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
                paddingLeft: "1px",
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
                paddingLeft: "1px",
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
                paddingLeft: "1px",
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
              checked={activeOptLayer["Scalability"]}
              name="Scalability"
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
                paddingLeft: "1px",
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
                paddingLeft: "1px",
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
                        paddingLeft: "1px",
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
                        paddingLeft: "1px",
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
                        paddingLeft: "1px",
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
                                paddingLeft: "1px",
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
                {state[sname1] && sname1 === "Fertilizer Management" && checkpulses() === false && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {fertilizer.map((sname) => (
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
                                paddingLeft: "1px",
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
                    {water.map((sname) => (
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
                                paddingLeft: "1px",
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
                        paddingLeft: "1px",
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
                                paddingLeft: "1px",
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
                    {water.map((sname) => (
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
                                paddingLeft: "1px",
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
                        paddingLeft: "1px",
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
                    {planting_rice.map((sname) => (
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
                                paddingLeft: "1px",
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
                {state[sname1] && sname1 === "Fertilizer Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {fertilizer_rice.map((sname) => (
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
                                paddingLeft: "1px",
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
                    {water_rice.map((sname) => (
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
                                paddingLeft: "1px",
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
                        paddingLeft: "1px",
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
          {
            //Livestock switches
          }
          {activeCrop["cattle"] === true &&
            ["Shelter management", "Feed management", "Healthcare management"].map((snamelive) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={livestockstate[snamelive]} onChange={handleLivestockChange(snamelive)} name={snamelive} />}
                  key={snamelive}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "1px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {snamelive.charAt(0).toUpperCase() + snamelive.slice(1, 4) + snamelive.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {/*{livestockstate[snamelive] && snamelive === "Shelter management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {["Modify shelters", "Shelter for natural hazards", "Modify sheds, planting trees, bathing, and mechanical cooling"].map((sname_shelter) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname_shelter]} onChange={changeOpt(sname_shelter)} name={sname_shelter} />}
                          key={sname_shelter}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname_shelter.charAt(0).toUpperCase() + sname_shelter.slice(1, 4) + sname_shelter.toLowerCase().slice(4)}
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}*/}
                {livestockstate[snamelive] && snamelive === "Shelter management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        { short: "For cold stress", full: "Modify shelters" },
                        { short: "For natural hazards", full: "Appropriate shelter to protect animals from natural hazards." },
                        { short: "Modify sheds and bathing", full: "Modify sheds, planting trees, bathing, and mechanical cooling" },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}{" "}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {/*{livestockstate[snamelive] && snamelive === "Feed management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {[
                      "Ad lib water",
                      "Balanced concentrate with buffer, feed additives, antioxidants, vitamins and probiotics",
                      "Mineral mixture supplementation, bypass proteins and fats",
                      "Modification in feeding pattern, schedule, grazing",
                      "Fodder conservation",
                      "Inclusion of green fodder",
                    ].map((sname_feed) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname_feed]} onChange={changeOpt(sname_feed)} name={sname_feed} />}
                          key={sname_feed}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname_feed.charAt(0).toUpperCase() + sname_feed.slice(1, 4) + sname_feed.toLowerCase().slice(4)}
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}*/}
                {livestockstate[snamelive] && snamelive === "Feed management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        { short: "Ad lib water", full: "Ad lib water" },
                        { short: "Balanced concentrate", full: "Balanced concentrate with buffer, feed additives, antioxidants, vitamins and probiotics" },
                        { short: "Mineral mixture", full: "Mineral mixture supplementation, by pass proteins and fats" },
                        { short: "Change feeding and grazing pattern", full: "Modification in feeding pattern, schedule, grazing" },
                        { short: "Fodder conservation", full: "Fodder conservation" },
                        { short: "Green fodder", full: "Inclusion of green fodder" },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}{" "}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Healthcare management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        { short: "Vaccination", full: "Vaccination" },
                        { short: "Deworming", full: "Deworming" },
                        { short: "Control of vectors", full: "Control of ectoparasites and other vectors" },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}{" "}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {activeCrop["cattle"] && (
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {[
                  {
                    short: "Climate resilient breed",
                    full: "Adoption of climate resilient breeds",
                  },
                  {
                    short: "Estrous confirmation and synchronisation",
                    full: "Reproductive management: Estrous confirmation and synchronisation",
                  },
                  {
                    short: "Climate information",
                    full: "Climate information services and safety nets",
                  },
                  {
                    short: "Diversification",
                    full: "Diversification",
                  },
                ].map(({ short, full }) => (
                  <CustomFormControlLabel
                    key={short}
                    control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                    label={
                      <Typography
                        variant="body2"
                        align="left"
                        sx={{
                          paddingLeft: "1px",
                          maxWidth: "250px",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {short}
                        <LightTooltip
                          title={
                            <>
                              <span>{full}</span>
                              <br />
                              <Link
                                href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                ))}
              </FormGroup>
            </FormControl>
          )}
          {(activeCrop["sheep"] === true || activeCrop["goat"] === true) &&
            ["Shelter management", "Feed management", "Healthcare management"].map((snamelive) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={livestockstate[snamelive]} onChange={handleLivestockChange(snamelive)} name={snamelive} />}
                  key={snamelive}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "1px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {snamelive.charAt(0).toUpperCase() + snamelive.slice(1, 4) + snamelive.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {livestockstate[snamelive] && snamelive === "Shelter management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "For cold stress",
                          full: "Modify shelters",
                        },
                        {
                          short: "For natural hazards",
                          full: "Shelter for natural hazards",
                        },
                        {
                          short: "Modify sheds",
                          full: "Modify sheds, planting trees, ventilation, roof height",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Feed management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Ad lib water",
                          full: "Ad lib water",
                        },
                        {
                          short: "Balanced concentrate",
                          full: "Balanced concentrate with buffer, feed additives, antioxidants, vitamins and probiotics",
                        },
                        {
                          short: "Mineral mixture",
                          full: "Mineral mixture supplementation, by pass proteins and fats",
                        },
                        {
                          short: "Change feeding and grazing pattern",
                          full: "Modification in feeding pattern, schedule, grazing",
                        },
                        {
                          short: "Grassland and Silvi-pasture management",
                          full: "Grassland and Silvi-pasture management",
                        },
                        {
                          short: "Fodder conservation",
                          full: "Fodder conservation",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Healthcare management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Vaccination",
                          full: "Vaccination",
                        },
                        {
                          short: "Deworming",
                          full: "Deworming",
                        },
                        {
                          short: "Control of vectors",
                          full: "Control of ectoparasites and other vectors",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {(activeCrop["sheep"] === true || activeCrop["goat"] === true) && (
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {[
                  {
                    short: "Climate resilient breed",
                    full: "Adoption of climate resilient breeds",
                  },
                  {
                    short: "Estrous confirmation and synchronisation",
                    full: "Reproductive management: Estrous confirmation and synchronisation",
                  },
                  {
                    short: "Climate information",
                    full: "Climate information services and safety nets",
                  },
                ].map(({ short, full }) => (
                  <CustomFormControlLabel
                    key={short}
                    control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                    label={
                      <Typography
                        variant="body2"
                        align="left"
                        sx={{
                          paddingLeft: "1px",
                          maxWidth: "250px",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {short}
                        <LightTooltip
                          title={
                            <>
                              <span>{full}</span>
                              <br />
                              <Link
                                href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                ))}
              </FormGroup>
            </FormControl>
          )}
          {activeCrop["buffalo"] === true &&
            ["Shelter management", "Feed management", "Healthcare management"].map((snamelive) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={livestockstate[snamelive]} onChange={handleLivestockChange(snamelive)} name={snamelive} />}
                  key={snamelive}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "1px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {snamelive.charAt(0).toUpperCase() + snamelive.slice(1, 4) + snamelive.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {livestockstate[snamelive] && snamelive === "Shelter management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Modify sheds and bathing",
                          full: "Modify sheds, planting trees, bathing, and mechanical cooling, wallowing",
                        },
                        {
                          short: "For cold stress",
                          full: "Modify shelters",
                        },
                        {
                          short: "For natural hazards",
                          full: "Shelter for natural hazards",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Feed management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Ad lib water",
                          full: "Ad lib water",
                        },
                        {
                          short: "Balanced concentrate",
                          full: "Balanced concentrate with buffer, feed additives, antioxidants, vitamins and probiotics",
                        },
                        {
                          short: "Mineral mixture",
                          full: "Mineral mixture supplementation, by pass proteins and fats",
                        },
                        {
                          short: "Change feeding and grazing pattern",
                          full: "Modification in feeding pattern, schedule, grazing",
                        },
                        {
                          short: "Fodder conservation",
                          full: "Fodder conservation",
                        },
                        {
                          short: "Green fodder",
                          full: "Inclusion of green fodder",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Healthcare management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Deworming",
                          full: "Deworming",
                        },
                        {
                          short: "Control of vectors",
                          full: "Control of ectoparasites and other vectors",
                        },
                        {
                          short: "Vaccination",
                          full: "Vaccination",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {activeCrop["buffalo"] === true && (
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {[
                  {
                    short: "Estrous confirmation and synchronisation",
                    full: "Reproductive management: Estrous confirmation and synchronisation",
                  },
                  {
                    short: "Climate resilient breed",
                    full: "Adoption of climate resilient breeds",
                  },
                  {
                    short: "Climate information",
                    full: "Climate information services and safety nets",
                  },
                  {
                    short: "Diversification",
                    full: "Diversification",
                  },
                ].map(({ short, full }) => (
                  <CustomFormControlLabel
                    key={short}
                    control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                    label={
                      <Typography
                        variant="body2"
                        align="left"
                        sx={{
                          paddingLeft: "1px",
                          maxWidth: "250px",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {short}
                        <LightTooltip
                          title={
                            <>
                              <span>{full}</span>
                              <br />
                              <Link
                                href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                ))}
              </FormGroup>
            </FormControl>
          )}
          {activeCrop["chicken"] === true &&
            ["Shelter management", "Feed management", "Healthcare management"].map((snamelive) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={livestockstate[snamelive]} onChange={handleLivestockChange(snamelive)} name={snamelive} />}
                  key={snamelive}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "1px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {snamelive.charAt(0).toUpperCase() + snamelive.slice(1, 4) + snamelive.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {livestockstate[snamelive] && snamelive === "Shelter management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Micro climate",
                          full: "Micro climate modification-sheds",
                        },
                        {
                          short: "For natural hazards",
                          full: "Modification of shelter",
                        },
                        {
                          short: "Planting trees",
                          full: "Planting of trees",
                        },
                        {
                          short: "Heating management",
                          full: "Heating management",
                        },
                        {
                          short: "Mechanical cooling",
                          full: "Mechanical cooling",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Feed management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Fat supplementation",
                          full: "Fat supplementation",
                        },
                        {
                          short: "Protein supplementation",
                          full: "Protien and amino acid supplementation",
                        },
                        {
                          short: "Ad lib water",
                          full: "Ad lib water",
                        },
                        {
                          short: "Feed additives",
                          full: "Feed addtivies, electrolyte, antioxidants, vitamins and probiotics",
                        },
                        {
                          short: "Feeding pattern change",
                          full: "Modification in feeding pattern, schedule and space",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Healthcare management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Parasite control",
                          full: "Parasite control",
                        },
                        {
                          short: "Thinning of flock",
                          full: "Thinning of flock",
                        },
                        {
                          short: "Vaccination",
                          full: "Vaccination",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {activeCrop["chicken"] &&
            [
              {
                short: "Climate resilient breed",
                full: "Adoption of climate resilient breed/strain",
              },
              {
                short: "Climate information",
                full: "Climate information services and safety nets",
              },
              {
                short: "Diversification",
                full: "Diversification",
              },
            ].map(({ short, full }) => (
              <FormGroup key={short}>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "1px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {short}
                      <LightTooltip
                        title={
                          <>
                            <span>{full}</span>
                            <br />
                            <Link
                              href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
          {activeCrop["pig"] === true &&
            ["Shelter management", "Feed management", "Healthcare management"].map((snamelive) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={livestockstate[snamelive]} onChange={handleLivestockChange(snamelive)} name={snamelive} />}
                  key={snamelive}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "1px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {snamelive.charAt(0).toUpperCase() + snamelive.slice(1, 4) + snamelive.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {livestockstate[snamelive] && snamelive === "Shelter management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Modify sheds and bathing",
                          full: "Modify sheds, planting trees, bathing, and mechanical cooling, wallowing",
                        },
                        {
                          short: "For cold stress",
                          full: "Modify shelters",
                        },
                        {
                          short: "For natural hazards",
                          full: "Shelter for natural hazards",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Feed management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Ad lib water",
                          full: "Ad lib water",
                        },
                        {
                          short: "Balanced concentrate",
                          full: "Balanced concentrate with buffer, feed additives, antioxidants, vitamins and probiotics",
                        },
                        {
                          short: "Mineral mixture",
                          full: "Mineral mixture supplementation",
                        },
                        {
                          short: "Feeding pattern change",
                          full: "Modification in feeding pattern, schedule",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}

                {livestockstate[snamelive] && snamelive === "Healthcare management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    <FormGroup>
                      {[
                        {
                          short: "Vaccination",
                          full: "Vaccination",
                        },
                        {
                          short: "Deworming",
                          full: "Deworming",
                        },
                        {
                          short: "Control of vectors",
                          full: "Control of ectoparasites and other vectors",
                        },
                      ].map(({ short, full }) => (
                        <CustomFormControlLabel
                          key={short}
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "1px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {short}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{full}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {activeCrop["pig"] === true &&
            [
              {
                short: "Climate resilient breed",
                full: "Adoption of climate resilient breeds",
              },
              {
                short: "ART tools",
                full: "Reproductive management: Use of ART tools",
              },
              {
                short: "Climate information",
                full: "Climate information servics and safetynets",
              },
            ].map(({ short, full }) => (
              <FormGroup key={short}>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[short]} onChange={changeOpt(short)} name={short} />}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "1px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {short}
                      <LightTooltip
                        title={
                          <>
                            <span>{full}</span>
                            <br />
                            <Link
                              href={`#/resources?tab=2&term=${full.toLowerCase().replace(/\s+/g, "-")}`}
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
          {checkcrop() === false &&
            activeCrop["rice"] === false &&
            checknotFish() === false &&
            marine.map((sname) => (
              <div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  To be updated
                </Box>
              </div>
            ))}
        </div>
      )}
    </FormControl>
  );
}
