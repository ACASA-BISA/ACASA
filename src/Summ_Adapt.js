import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from '@mui/material';

export default function Summ_Adapt({
  changeOption
}) {
  const [val2, setVal2] = React.useState('adapvari');

  const switchh = ['Stress Tolerant Varieties', 'Agro Technology','Fertilizer Management','Precision Nutrition Management','Water Management','ICT Agro Advisory','Agricultural Insurance'];
  const switchid = ['cp', 'ac', 'fm', 'pnm', 'wm','aa','ai'];

  const switchAA = ['Weather Services'];
  const switchAAid = ['wsaa'];

  const switchAI = ['Insurance'];
  const switchAIid = ['insu'];

  const switchFM = ['Urea Placement','Arid & Semi-Arid','N Fertiliser (RDF)'];
  const switchFMid = ['up','asa','rdf'];

  const switchCP = ['Adaptive Varieties'];
  const switchCPid = ['adapvari'];

  const switchPNM = ['Low Tech','High Tech'];
  const switchPNMid = ['low','high'];

  const switchWM = ['Microirrigation','Precision Management','Supplimentary Irrigation'];
  const switchWMid = ['micro','pwm','supp'];

  const handleChange2 = (event) => {
    setVal2(event.target.value);
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
      sx={{backgroundColor:'rgba(240, 242, 233,1)', fontSize:14}}
    >
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Stress Tolerant Varieties</Typography>
        {switchCPid.map((naam,idx) => (
            <MenuItem value={naam}>{switchCP[idx]}</MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Fertilizer Management</Typography>
        {switchFMid.map((naam,idx) => (
                <MenuItem value={naam}>{switchFM[idx]}</MenuItem>
            ))}
        <Typography variant="subtitle1" sx={{paddingLeft:1,fontWeight:'bold'}}>Precision Nutrition Management</Typography>
        {switchPNMid.map((naam,idx) => (
            <MenuItem value={naam}>{switchPNM[idx]}</MenuItem>
        ))}
    </Select>
    </FormControl>
  );
}