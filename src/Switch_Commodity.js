import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SwitchCereals from './Commodity Switches/SwitchListCO';
import SwitchLegumes from './Commodity Switches/SwitchListHC';
import SwitchFruits from './Commodity Switches/SwitchListFFP';
import SwitchLivestock from './Commodity Switches/SwitchListLS';
import SwitchFish from './Commodity Switches/SwitchListFISH';
import SwitchOilseeds from './Commodity Switches/SwtichListOIL';
import SwitchIndustrial from './Commodity Switches/SwitchListIND';

export default function SwitchesGroup({
    activeCrop,
    changeCrop
}) {
  const switchh = ['Cereals','Legumes','Oilseeds','Fruits and Vegetables','Industrial Crops',"Livestock"];
  const switchid = ['cereals', 'legumes', 'oilseeds', 'fruits', 'industrial', 'livestock'];
  const disvar = {'cereals':false, 'legumes':false, 'oilseeds':false, 'fruits':false, 'industrial':false, 'livestock':false};

  console.log(activeCrop);
  
  function createInitialTodos() {
  const initialTodos = {};
  switchid.forEach((sname,index) => {
    initialTodos[sname] = index === 0;
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
    <FormControl component="fieldset" variant="standard"  sx={{paddingTop:1, paddingLeft:3}}>
      <FormLabel sx={{display:'flex',paddingBottom:1}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:1,}}>Select Commodity</Typography>
        </FormLabel>
      
      {switchid.map((sname,index) => (
        <FormGroup>
        <CustomFormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={state[sname]} 
          onChange={handleChange(sname)} name={sname} />
        } 
        key={sname}
        disabled={disvar[sname]}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{switchh[index]}</Typography>}
        />
        {state[sname] && sname === 'cereals' && (
            <SwitchCereals activeCrop={activeCrop} changeCrop={changeCrop} />)}
        {state[sname] && sname === 'legumes' && (
            <SwitchLegumes activeCrop={activeCrop} changeCrop={changeCrop}/>)}
        {state[sname] && sname === 'oilseeds' && (
            <SwitchOilseeds activeCrop={activeCrop} changeCrop={changeCrop}/>)}
        {state[sname] && sname === 'fruits' && (
            <SwitchFruits activeCrop={activeCrop} changeCrop={changeCrop}/>)}
        {state[sname] && sname === 'industrial' && (
            <SwitchIndustrial activeCrop={activeCrop} changeCrop={changeCrop} />)}
        {state[sname] && sname === 'livestock' && (
            <SwitchLivestock activeCrop={activeCrop} changeCrop={changeCrop} />)}
        {state[sname] && sname === 'fisheries' && (
            <SwitchFish activeCrop={activeCrop} changeCrop={changeCrop} />)}
        </FormGroup>
      ))}
    </FormControl>
  );
}