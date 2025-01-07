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
    sx={{backgroundColor:'rgba(235, 247, 233,1)', fontSize:13}}
  >
    <MenuItem value='CHC' sx={{fontSize:13,paddingY:'2px'}}>CHC</MenuItem>
    <MenuItem value='ISIMIP' sx={{fontSize:13,paddingY:'2px'}}>ISIMIP</MenuItem>
    </Select>
    </FormControl>
  );
}