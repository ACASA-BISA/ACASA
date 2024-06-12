import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SwitchCereals({
  activeCrop,
  changeCrop
}) {
  const switchh = ['Rice','Wheat','Maize','Sorghum','Finger Millet','Pearl Millet'];
  const switchid = ['rice','wheat','maize','sorghum','fmillet','pmillet'];
  
  const padd = 8;
  const season = ['Rice is planted in multiple seasons in different countries. Here this analysis is only for monsoon season (also known as \'Kharif\' in India, \'Aman\' in Bangladesh,and \'Yala\' in Sri Lanka)',
  'Season: B','Season: C','Season: D','Season: E','Season: F'];

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      //backgroundColor: theme.palette.common.white,
      color: 'rgba(255, 255, 255, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 13,
      maxWidth: 250,
    },
  }));

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
  return (
    <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
      
      {switchh.map((sname,index) => (
        <FormGroup>
        <FormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeCrop[switchid[index]]} onChange={changeCrop(switchid[index])} name={switchid[index]} />
        }
        key={switchid[index]}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname}
        <LightTooltip title={season[index]} placement="top" arrow>
        <IconButton sx={{padding:0,margin:0,paddingX:'4px'}}>
        <InfoOutlinedIcon sx={{fontSize:'12px',padding:0,margin:0}} />
        </IconButton>
        </LightTooltip></Typography>}
        />
     </FormGroup>
      ))}
    </FormControl>
  );
}