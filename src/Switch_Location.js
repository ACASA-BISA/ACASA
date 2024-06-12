import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';

export default function BasicSelect({
  activeRegion,
  changeRegion,
  countryStateMap
}) {
  let sec = activeRegion.indexOf(',');

  const countryMap1 ={};
  countryMap1['South Asia'] = 'SA';
  countryMap1['Afghanistan'] = 'AF';
  countryMap1['Bangladesh'] = 'BD';
  countryMap1['Bhutan'] = 'BT';
  countryMap1['India'] = 'IN';
  countryMap1['Nepal'] = 'NP';
  countryMap1['Pakistan'] = 'PK';
  countryMap1['Sri Lanka'] = 'LK';
  countryMap1['Maldives'] = 'MV';

  let x = 'SA';
  let y = '';
  if (sec>0){
    x = activeRegion.substring(sec+2);
    y = activeRegion.substring(0,sec);

    x = countryMap1[x];
  }
  else{
    x = activeRegion;
    x = countryMap1[x];
  }
  const [reg, setReg] = React.useState(x);
  const [state, setState] = React.useState(y);
  
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

  const handleStateChange = (event) => {
    setState(event.target.value);
    changeRegion('State',event.target.value+", "+countryMap[reg]);
  };
  const handleChange = (event) => {
    setReg(event.target.value);
    if(event.target.value==='SA'){
      changeRegion('Region',countryMap[event.target.value]);
    }
    else{
      changeRegion('Country',countryMap[event.target.value]);
    }
  };

  return (
    <div>
    <Box sx={{width: '240px',paddingTop:2,paddingLeft:3 }}>
    <Typography sx={{color:'black',fontWeight:'bold',fontSize:14}}>Select Location</Typography>
    </Box>
    <Box sx={{paddingTop:4,paddingLeft:3, width: '240px',justifyContent:'center' }}>
      <FormControl sx={{width: '240px' }}>
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
    </Box>
    <Box sx={{paddingTop:4,paddingLeft:3, width: '240px',justifyContent:'center' }}>
      <FormControl sx={{width:  '240px' }}>
        <InputLabel id="state-label">State/Province</InputLabel>
        { reg==='SA' && <Select
          labelId="state-label"
          id="state-select-id"
          value={state}
          label="State/Province"
          onChange={handleStateChange}
          MenuProps={{
            disableScrollLock: true,
          }}>
         </Select> }
         { reg!=='SA' && <Select
          labelId="state-label"
          id="state-select-id"
          value={state}
          label="State/Province"
          onChange={handleStateChange}
          MenuProps={{
            disableScrollLock: true,
          }}>
         {countryStateMap[reg].map((Item,index)=>(
          <MenuItem value={Item}>{Item}</MenuItem>
         ))}
          </Select> }
       
      </FormControl>
    </Box>
    </div>
  );
}
