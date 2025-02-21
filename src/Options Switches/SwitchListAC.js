import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function SwitchesGroup({
  activeCrop,
  activeOpt,
  changeOpt,
  DisableList
}) {
  const switchh = ['Laser Land Levelling','Zero Tillage','BBR/FIRB','Early Sowing','DSR (Dry Seed)','DSR (Wet Seed)','SRI'];
  const switchid = ['lll','zt','bbr','es','dsrd','dsrw','sri'];
  
  const nextswtch = ['Heat Stress Options','Cold Stress Options'];
  const nextswtchid = ['heat','cold'];

  const coldlist = ['Frost Gun','Slow Release Fertilizer','Micro-Environment','Fog/Mist Gun','Mechanical Support'];
  const coldlistid = ['frost','srf','micen','foggun','mech'];

  const heatlist = ['Fertilizer Timing','Shading Canopy','Cooling Canopy'];
  const heatlistid = ['ft','sc','cc'];

  function createInitialTodos() {
    const initialTodos = {};
    nextswtchid.forEach((sname,index) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  }
  
  const [state, setState] = React.useState(
      createInitialTodos
  );
  
  const handleChange = (name) => (event) => {
      setState({ ...state, [name]: event.target.checked });
      
  };

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 32+padd,
    height: 14+padd,
    padding: padd/2,
    display: 'flex',
    
    '& .MuiSwitch-switchBase': {
      padding: 2+padd/2,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          // 4ba046 and 4aba03 and dea426 and b9f04d
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#4ba046',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 10,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.10)',
      boxSizing: 'border-box',
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#554d38" : "#ffe89c",
      opacity: 1,
      borderRadius: 12,
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.7)",
      },
    },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#E8E8E8', // Color for the label text when disabled
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
      
      {switchh.map((sname,index) => (
        <FormGroup>
        <CustomFormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[switchid[index]]} onChange={changeOpt(switchid[index])} 
          name={switchid[index]} />
        }
        disabled={DisableList[sname]}
        key={switchid[index]}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname}</Typography>}
        />
     </FormGroup>
      ))}
      {nextswtch.map((sname,index) => (
        <FormGroup>
        <FormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={state[nextswtchid[index]]} onChange={handleChange(nextswtchid[index])} 
          name={nextswtchid[index]} />
        }
        key={nextswtchid[index]}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname}</Typography>}
        />
        {state[nextswtchid[index]] && nextswtchid[index] === 'heat' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
      
            {heatlist.map((sname,index) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[heatlistid[index]]} 
                onChange={changeOpt(heatlistid[index])} name={heatlistid[index]} 
                />
              }
              disabled={DisableList[sname]}
              key={coldlistid[index]}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[nextswtchid[index]] && nextswtchid[index] === 'cold' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
      
            {coldlist.map((sname,index) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[coldlistid[index]]} 
                onChange={changeOpt(coldlistid[index])} name={coldlistid[index]} 
                />
              }
              disabled={DisableList[sname]}
              key={coldlistid[index]}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
     </FormGroup>
      ))}
    </FormControl>
  );
}