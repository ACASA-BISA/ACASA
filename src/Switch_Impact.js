import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SwitchImpact({
  activeImpact,
  changeImpact,
  activeCrop
}) {
  const switchh = ['Productivity','Resilience','Value of Production'];

  const disvar = {'Productivity':false,'Resilience':true,'Value of Production':false};

  const season = ['','Calculated by Crop Simulation Modelling (CSM)',''];

  const padd = 8;

  const fullList = ['rice','wheat','maize','barley','sorghum','fmillet','pmillet',
    'safflower','sunflower','rapeseed','sesame','groundnut',
    'soyabean','chickpea','ppea','bgram','ggram','lentil',
    'cotton','jute','rubber','sugarcane','tea','coconut',
    'cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater',
    'potato','onion','tomato','chilli','mango','banana'];
  
  const Common = ['Rice','Wheat','Maize','Barley','Sorghum','Finger Millet','Pearl Millet',
    'Safflower','Sunflower','Rapeseed/Mustard','Sesame','Groundnut',
    'Soybean','Chickpea','Pigeonpea','Black Gram','Green Gram','Lentil',
    'Cotton','Jute','Rubber','Sugarcane','Tea','Coconut',
    'Cattle','Buffalo','Goat','Sheep','Pig','Poultry',
    'Freshwater','Bracklish','Marine','Cold water',
    'Potato','Onion','Tomato','Chillies','Mango','Banana'];

  let cropname = 'Rice';
  fullList.forEach((sname,indx) => {
    if(activeCrop[sname]===true){
      cropname = Common[indx];
    }
  });

  const LightTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        //backgroundColor: theme.palette.common.white,
        color: 'rgba(255, 255, 255, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,
        maxWidth: 200,
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

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#E8E8E8', // Color for the label text when disabled
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:3}}>
      <FormLabel sx={{display:'flex',paddingBottom:1}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:2,}}>Select Impact on {cropname.toLowerCase()}</Typography><br/>
        </FormLabel>
      {switchh.map((sname,index) => (
        <FormGroup>
        <CustomFormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeImpact[sname]} onChange={changeImpact(sname)} 
          name={sname}/>
        }
        key={sname}
        disabled={false}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}
        {disvar[sname] && <LightTooltip title={season[index]} placement="top" arrow>
        <IconButton sx={{padding:0,margin:0,paddingX:'4px'}}>
        <InfoOutlinedIcon sx={{fontSize:'12px',padding:0,margin:0}} />
        </IconButton>
        </LightTooltip>}</Typography>}
        />
     </FormGroup>
      ))}
    </FormControl>
  );
}