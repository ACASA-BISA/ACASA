import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export function SelectMinimal2({
  changeReg
}) {
  const [val, setVal] = React.useState('SA');

  const countryMap ={};
  countryMap['SA'] = 'South Asia';
  countryMap['AF'] = 'Afghanistan';
  countryMap['BD'] = 'Bangladesh';
  countryMap['BT'] = 'Bhutan';
  countryMap['IN'] = 'India';
  countryMap['NP'] = 'Nepal';
  countryMap['PK'] = 'Pakistan';
  countryMap['LK'] = 'Sri Lanka';
  countryMap['MV'] = 'Maldives';

  const handleChange = (event) => 
  {
    setVal(event.target.value);
    changeReg(countryMap[event.target.value]);
  };

  return (
  <FormControl sx={{width: '200px' }}>
  <Select
  disableUnderline
    id="Country-select-id"
    value={val}
    onChange={handleChange}
    MenuProps={{
      disableScrollLock: true,
    }}
    variant="standard"
    sx={{backgroundColor:'rgba(240, 242, 233,1)'}}
  >
    <MenuItem value='SA'>South Asia</MenuItem>
    <MenuItem value='AF'>Afghanistan</MenuItem>
    <MenuItem value='BD'>Bangladesh</MenuItem>
    <MenuItem value='BT'>Bhutan</MenuItem>
    <MenuItem value='IN'>India</MenuItem>
    <MenuItem value='NP'>Nepal</MenuItem>
    <MenuItem value='PK'>Pakistan</MenuItem>
    <MenuItem value='LK'>Sri Lanka</MenuItem>
    <MenuItem value='MV'>Maldives</MenuItem>
    </Select>
    </FormControl>
  );
}