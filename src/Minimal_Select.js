import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from '@mui/material';

export function SelectMinimal({
  changeComm
}) {
  const [val2, setVal2] = React.useState('rice');

  const switchco = ['Rice','Wheat','Maize','Sorghum','Finger Millet','Pearl Millet'];
  const switchcoid = ['rice','wheat','maize','sorghum','fmillet','pmillet'];

  const switchffp = ['Potato','Onion','Tomato','Chillies','Mango','Banana'];
  const switchffpid = ['potato','onion','tomato','chilli','mango','banana'];

  const switchfish = ['Freshwater','Bracklish','Marine','Cold water'];
  const switchfishid = ['freshwater','bracklish','marine','coldwater'];

  const switchls = ['Cattle','Buffalo','Goat','Sheet','Pig','Poultry'];
  const switchlsid = ['cattle','buffalo','goat','sheet','pig','poultry'];

  const switchind = ['Cotton','Jute','Rubber','Sugarcane','Tea','Coconut'];
  const switchindid = ['cotton','jute','rubber','sugarcane','tea','coconut'];

  const switchhc = ['Soyabean','Chickpea','Pigeon Pea','Black Gram','Green Gram','Lentil'];
  const switchhcid = ['soyabean','chickpea','ppea','bgram','ggram','lentil'];

  const switchoil = ['Safflower','Sunflower','Rapeseed/Mustard','Sesame','Groundnut'];
  const switchoilid = ['safflower','sunflower','rapeseed','sesame','groundnut'];

  const handleChange = (event) => {
    setVal2(event.target.value)
    changeComm(event.target.value)
  };
  return (
  <FormControl sx={{width: '200px' }}>
  <Select
  disableUnderline
    id="Country-select-id"
    value={val2}
    onChange={handleChange}
    MenuProps={{
      disableScrollLock: true,
    }}
    variant="standard"
    sx={{backgroundColor:'rgba(240, 242, 233,1)'}}
  >
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Cereals</Typography>
        {switchcoid.map((naam,idx) => (
            <MenuItem value={naam}>{switchco[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Legumes</Typography>
        {switchhcid.map((naam,idx) => (
                <MenuItem value={naam}>{switchhc[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Oilseeds</Typography>
        {switchoilid.map((naam,idx) => (
                <MenuItem value={naam}>{switchoil[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Fruits & Vegetables</Typography>
        {switchffpid.map((naam,idx) => (
            <MenuItem value={naam}>{switchffp[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Industrial</Typography>
        {switchindid.map((naam,idx) => (
            <MenuItem value={naam}>{switchind[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Livestock</Typography>
        {switchlsid.map((naam,idx) => (
            <MenuItem value={naam}>{switchls[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Fisheries</Typography>
        {switchfishid.map((naam,idx) => (
            <MenuItem value={naam}>{switchfish[idx]}</MenuItem>
        ))}
    </Select>
    </FormControl>
  );
}