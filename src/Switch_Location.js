import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchLoc({
  activeRegion,
  changeRegion,
  countryStateMap,
  exploreType,
  handleExploreTypeChange,
}) {
  let sec = activeRegion.indexOf(",");

  const switch_type = [
    "Commodity specific analysis",
    "Regional analysis (non-commodity specific)",
  ];
  const switch_type_id = ["Commodity", "Regional"];

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

  const handleStateChange = (event) => {
    setState(event.target.value);
    changeRegion("State", event.target.value + ", " + countryMap[reg]);
  };
  const handleChange = (event) => {
    setReg(event.target.value);
    setState("");
    if (event.target.value === "SA") {
      changeRegion("Region", countryMap[event.target.value]);
    } else {
      changeRegion("Country", countryMap[event.target.value]);
    }
  };

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 30 + padd,
    height: 12 + padd,
    padding: padd / 2,
    display: "flex",

    "& .MuiSwitch-switchBase": {
      padding: 2 + padd / 2,
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          // 4ba046 and 4aba03 and dea426 and b9f04d
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#4ba046",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 10,
      height: 8,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.10)",
      boxSizing: "border-box",
    },
    '&:hover': { 
      backgroundColor: theme.palette.mode === 'dark' ? '#554d38' : '#ffe89c', 
      opacity: 1,
      borderRadius: 12,
      '& .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.7)',
      },
  },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    alignItems: "flex-start", // Align items to the start
    "&.Mui-disabled .MuiTypography-body2": {
      color: "#CCC", // Color for the label text when disabled
    },
  }));

  return (
    <div>
      <Box sx={{ width: "240px", paddingTop: 2, paddingLeft: 3 }}>
        <Typography sx={(theme) => ({ color: theme.palette.mode === "dark" ? "white" : "black", fontWeight: "bold", fontSize: 14 })}>
          Select location
        </Typography>
      </Box>
      <Box
        sx={{
          paddingTop: 4,
          paddingLeft: 3,
          width: "240px",
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ width: "240px" }}>
          <InputLabel id="Country-label">Country/Region</InputLabel>
          <Select
            labelId="Country-label"
            id="Country-select-id"
            value={reg}
            label="Country/Region"
            onChange={handleChange}
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            <MenuItem value="SA">South Asia</MenuItem>
            <MenuItem value="AF" disabled={true}>Afghanistan</MenuItem>
            <MenuItem value="BD">Bangladesh</MenuItem>
            <MenuItem value="BT" disabled={true}>Bhutan</MenuItem>
            <MenuItem value="IN">India</MenuItem>
            <MenuItem value="NP">Nepal</MenuItem>
            <MenuItem value="PK" disabled={true}>Pakistan</MenuItem>
            <MenuItem value="LK">Sri Lanka</MenuItem>
            <MenuItem value="MV" disabled={true}>Maldives</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          paddingTop: 4,
          paddingLeft: 3,
          width: "240px",
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ width: "240px" }}>
          <InputLabel id="state-label">State/Province</InputLabel>
          {reg === "SA" && (
            <Select
              labelId="state-label"
              id="state-select-id"
              value={state}
              label="State/Province"
              onChange={handleStateChange}
              MenuProps={{
                disableScrollLock: true,
              }}
            ></Select>
          )}
          {reg !== "SA" && (
            <Select
              labelId="state-label"
              id="state-select-id"
              value={state}
              label="State/Province"
              onChange={handleStateChange}
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              {countryStateMap[reg].map((Item, index) => (
                <MenuItem value={Item}>{Item}</MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </Box>
      {/* <Box sx={{width: '240px',paddingTop:2,paddingLeft:3 }}>
    <Typography sx={{color:'black',fontWeight:'bold',fontSize:14}}>Select analysis type</Typography>
    </Box>
    <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:3,paddingTop:1}}>
      {switch_type_id.map((sname,indexx) => (
        <FormGroup>
        <CustomFormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={sname===exploreType?true:false} 
          onChange={handleExploreTypeChange(sname)} name={sname} 
          />
        }
        disabled={false}
        key={sname}
        label={<Typography variant="body2" align='left'  sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
          whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{switch_type[indexx]}</Typography>}
        />
      </FormGroup>
        ))}
    </FormControl> */}
    </div>
  );
}
