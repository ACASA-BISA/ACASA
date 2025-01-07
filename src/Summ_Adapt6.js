import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from '@mui/material';

export default function Summ_Adapt6({
  changeOption,activeCrop,activv
}) {
  const [val2, setVal2] = React.useState(activv);

  function checkcrop() {
    const diffcrop = ['cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater','rice'];
    let ans = true;
    diffcrop.forEach((sname) => {
      if(activeCrop[sname]===true){
        ans = false;
      }
    })
    return ans;
  }

  function checkFish(){
    const fishes = ['freshwater','bracklish','marine','coldwater'];
    let ans = true;
    fishes.forEach((sname) => {
      if(activeCrop[sname]===true){
        ans = false;
      }
    })
    return ans;
  }
  const directswitch = ['Stress Tolerant Variety'];
  const directswitchdown = ['Precision Agro Input Management','Agri. Insurance'];

  const planting_rice = ['Early Sowing','Precision Land Levelling','Zero Tillage with residues',
  'Direct Seeded Rice - Dry','Direct Seeded Rice - Wet','System of Rice Intensification'];

  const water = ['Supplemental Irrigation','Microirrigation','Precision Water Management'];

  const water_rice = ['Supplemental Irrigation','Microirrigation','Precision Water Management','Alternate wetting and drying (AWD)'];

  const fertilizer_rice = ['Fertilizer rating and timing','Precision Fertilizer Management - Low tech (PFM)','Precision Fertilizer Management - High tech'];

  const planting = ['Early Sowing','Precision Land Levelling','Zero Tillage with residues','Broad Bed and Furrow','Mulching'];

  const fertilizer = ['Fertilizer rating and timing','Precision Fertilizer Management - Low tech (PFM)','Precision Fertilizer Management - High tech'];
  
  const livestock = ['Shelter Management','Feed Management','Healthcare Management'];

  const marine = ['To be Updated'];

  const handleChange2 = (event) => {
    setVal2(event.target.value);
    console.log(event.target.value);
    changeOption(event.target.value);
  };

  return (
    <FormControl sx={{width: '160px' }}>
    <Select
    disableUnderline
      id="Country-select-id"
      value={val2}
      onChange={handleChange2}
      MenuProps={{
        disableScrollLock: true,
      }}
      variant="standard"
      sx={{backgroundColor:'rgba(240, 242, 233,1)', fontSize:12}}
    >
        {(checkcrop()===true || activeCrop['rice']===true) && directswitch.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{directswitch[idx]}</MenuItem>
        ))}
        {(checkcrop()===true || activeCrop['rice']===true) && directswitchdown.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{directswitchdown[idx]}</MenuItem>
        ))}
        {(checkcrop()===true || activeCrop['rice']===true) && <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold',fontSize:12}}>Planting Technology</Typography>}
        {checkcrop()===true && planting.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{planting[idx]}</MenuItem>
        ))}
        {activeCrop['rice']===true && planting_rice.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{planting_rice[idx]}</MenuItem>
        ))}
        {(checkcrop()===true || activeCrop['rice']===true) && <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold',fontSize:12}}>Water Management</Typography>}
        {(checkcrop()===true) && water.map((naam,idx) => (
                <MenuItem value={naam} sx={{fontSize:12}}>{water[idx]}</MenuItem>
            ))}
        {(activeCrop['rice']===true) && water_rice.map((naam,idx) => (
                <MenuItem value={naam} sx={{fontSize:12}}>{water_rice[idx]}</MenuItem>
            ))}
        {(checkcrop()===true || activeCrop['rice']===true) && <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold',fontSize:12}}>Fertilizer Management</Typography>}
        {checkcrop()===true && fertilizer.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{fertilizer[idx]}</MenuItem>
        ))}
        {activeCrop['rice']===true && fertilizer_rice.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{fertilizer_rice[idx]}</MenuItem>
        ))}
        {(checkcrop()===false && activeCrop['rice']===false && checkFish()===true) && livestock.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{livestock[idx]}</MenuItem>
        ))}
        {(checkcrop()===false && activeCrop['rice']===false && checkFish()===false) && marine.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:12}}>{marine[idx]}</MenuItem>
        ))}
    </Select>
    </FormControl>
  );
}