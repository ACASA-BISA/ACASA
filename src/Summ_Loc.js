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
    sx={{backgroundColor:'rgba(235, 247, 233,1)', fontSize:14}}
  >
    <MenuItem value='South Asia'>South Asia</MenuItem>
    <MenuItem value='Afghanistan'>Afghanistan</MenuItem>
    <MenuItem value='Bangladesh'>Bangladesh</MenuItem>
    <MenuItem value='Bhutan'>Bhutan</MenuItem>
    <MenuItem value='India'>India</MenuItem>
    <MenuItem value='Nepal'>Nepal</MenuItem>
    <MenuItem value='Pakistan'>Pakistan</MenuItem>
    <MenuItem value='Sri Lanka'>Sri Lanka</MenuItem>
    <MenuItem value='Maldives'>Maldives</MenuItem>
    </Select>
    </FormControl>
  );
}