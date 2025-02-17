import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Summ_Loc({
  changeReg,focus,activeRegion
}) {

  function initialloc(){
    let strr = "South Asia";
    if(focus!=='Region'){
      strr = activeRegion;
    }
    return strr;
  };
  const [val, setVal] = React.useState(initialloc);

  const handleChange = (event) => 
  {
    setVal(event.target.value);
    if(event.target.value==='South Asia'){
        changeReg('Region','South Asia');
    }
    else{
        changeReg('Country',event.target.value);
    }
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
    <MenuItem value='South Asia' sx={{fontSize:13,paddingY:'2px'}}>South Asia</MenuItem>
    <MenuItem value='Afghanistan' sx={{fontSize:13,paddingY:'2px'}}>Afghanistan</MenuItem>
    <MenuItem value='Bangladesh'sx={{fontSize:13,paddingY:'2px'}}>Bangladesh</MenuItem>
    <MenuItem value='Bhutan' sx={{fontSize:13,paddingY:'2px'}}>Bhutan</MenuItem>
    <MenuItem value='India' sx={{fontSize:13,paddingY:'2px'}}>India</MenuItem>
    <MenuItem value='Nepal' sx={{fontSize:13,paddingY:'2px'}}>Nepal</MenuItem>
    <MenuItem value='Pakistan' sx={{fontSize:13,paddingY:'2px'}}>Pakistan</MenuItem>
    <MenuItem value='Sri Lanka' sx={{fontSize:13,paddingY:'2px'}}>Sri Lanka</MenuItem>
    <MenuItem value='Maldives' sx={{fontSize:13,paddingY:'2px'}}>Maldives</MenuItem>
    </Select>
    </FormControl>
  );
}