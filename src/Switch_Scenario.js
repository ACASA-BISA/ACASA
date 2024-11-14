import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function SwitchScenario({
  activeScenario,
  changeScenario,
}) {
  const switchh = ['Baseline','SSP 2-4.5 2050s','SSP 5-8.5 2050s'];
  const switchid = ['baseline','ssp245','ssp585'];
  const disvar ={'baseline':false,'ssp245':false,'ssp585':false}
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
    '&:hover': { 
        backgroundColor: '#ffe89c ',
        opacity:1,
        borderRadius: 12,
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.7)',
          },
     },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#ccc', // Color for the label text when disabled
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:3}}>
      <FormLabel sx={{display:'flex',paddingBottom:1}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:2,}}>Select Scenario</Typography><br/>
        </FormLabel>
      {switchh.map((sname,index) => (
        <FormGroup>
        <CustomFormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeScenario[switchid[index]]} onChange={changeScenario(switchid[index])} 
          name={switchid[index]}/>
        }
        key={switchid[index]}
        disabled={disvar[switchid[index]]}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname}</Typography>}
        />
     </FormGroup>
      ))}
    </FormControl>
  );
}