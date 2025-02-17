import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Summ_Model({
  handleModel
}) {

  const [val, setVal] = React.useState('CHC');

  const handleChange = (event) => 
  {
    setVal(event.target.value);
    handleModel(event.target.value);
  };

  return (
  <FormControl sx={{width: '160px' }}>
  <Select
  disableUnderline
    id="Country-select-id"
    value={val}
    onChange={handleChange}
    MenuProps={{
      disableScrollLock: true,
    }}
    variant="standard"
    sx={(theme) => ({backgroundColor:theme.palette.mode === "dark"
      ? "rgba(60, 75, 60, 1)" 
      : "rgba(235, 247, 233, 1)", fontSize:13})}
  >
    <MenuItem value='CHC' sx={{fontSize:13,paddingY:'2px'}}>CHC</MenuItem>
    <MenuItem value='CANESM5' sx={{fontSize:13,paddingY:'2px'}}>CANESM5</MenuItem>
    <MenuItem value='CNRM-CM6-1' sx={{fontSize:13,paddingY:'2px'}}>CNRM-CM6-1</MenuItem>
    <MenuItem value='CNRM-ESM-1' sx={{fontSize:13,paddingY:'2px'}}>CNRM-ESM-1</MenuItem>
    <MenuItem value='EC-Earth3' sx={{fontSize:13,paddingY:'2px'}}>EC-Earth3</MenuItem>
    <MenuItem value='MIROC6' sx={{fontSize:13,paddingY:'2px'}}>MIROC6</MenuItem>
    </Select>
    </FormControl>
  );
}