import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from '@mui/material';

export default function Summ_Risk({
  changeRisk
}) {
  const [val2, setVal2] = React.useState('DRYSP');

  const switchHazards = ['Hazard Index','Delayed Monsoon','Temp Lower Limits','Temp Upper Limits','Cold Lower Limit',
  'Rainfall Excess','High RH','Dry Spell','Drought Moderate','Drought Severe',
    'Lodging','Frost','Spikelet Sterility - Cold','Spikelet Sterility - Heat','Spikelet Sterility - Rainfall'];
  const switchHazardsID = ['hindex','DEMON','TEMLO','TEMUP','COLLO','RAINF','HIRHI','DRYSP','DROMO','DROSE',
  'LODGE','FROST','SPICO','SPIHE','SPIRA'];


  const switchVulner = ['Hazard Index','Groundwater Level','Irrigation','Wealth Index','Fertilizer','Income','Literacy','Gender Inclusiveness','Road Density','Slope',
  'Water Holding Capacity','Soil Organic Carbon'];
  const switchVulnerID = ['hindex2','groundwater','irrigation','wealth','fertilizer','income','literacy','gender','road','slope','waterhold','carbon'];

  const switchExposure = ['Exposure Index','Rural Population','Cropped Area'];
  const switchExposureID = ['expoindex','rural','c-area'];

  const handleChange2 = (event) => {
    setVal2(event.target.value);
    changeRisk(event.target.value);
  };
  return (
    <FormControl sx={{width: '140px' }}>
    <Select
    disableUnderline
      id="Country-select-id"
      value={val2}
      onChange={handleChange2}
      MenuProps={{
        disableScrollLock: true,
      }}
      variant="standard"
      sx={{backgroundColor:'rgba(240, 242, 233,1)', fontSize:14}}
    >
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Hazards</Typography>
        {switchHazardsID.map((naam,idx) => (
                <MenuItem value={naam}>{switchHazards[idx]}</MenuItem>
            ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Exposure</Typography>
        {switchExposureID.map((naam,idx) => (
            <MenuItem value={naam}>{switchExposure[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Vulnerabilities</Typography>
        {switchVulnerID.map((naam,idx) => (
            <MenuItem value={naam}>{switchVulner[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Risk</Typography>
            <MenuItem value='riskindex'>Risk Index</MenuItem>
    </Select>
    </FormControl>
  );
}