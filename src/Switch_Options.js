import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function SwitchOpt({
    activeCrop,
    activeOpt,
    changeOpt
}) {
  const switchh = ['Planting Technology','Water Management','Fertilizer Management'];
  const directswitch = ['Stress Tolerant Variety'];
  const directswitchdown = ['ICT-based Agro Advisory','Crop Insurance'];

  const planting_rice = ['Early Sowing','Precision Land Levelling','Zero Tillage with residue',
  'DSR (Dry Seed)','DSR (Wet Seed)','System of Rice Intensification','Alternate wetting and drying'];

  const water = ['Supplemental Irrigation','Microirrigation','Precision Water Management'];

  const fertilizer_rice = ['Fertilizer rating and timing','Low-tech Precision Technology','High-tech Precision Technology'];

  const planting = ['Early Sowing','Precision Land Levelling','Zero Tillage with residue','Broad Bed and Furrow','Mulching'];

  const fertilizer = ['Fertilizer rating and timing','Low-tech Precision Technology','High-tech Precision Technology'];
  
  const livestock = ['Land Management','Feed Management','Herd Management','Animal Health','Animal Productivity',
  'Manure Management','Information Use','Heat Stress Management'];

  const marine = ['To be Updated'];

/*   const opt2 = ['Weather Services','Laser Land Levelling','Zero Tillage','BBR/FIRB','Early Sowing',
    'DSR (Dry Seed)','DSR (Wet Seed)','SRI','Insurance',
    'Adaptive Varities','Urea Placement','Arid & Semi-Arid','N Fertiliser (RDF)','PNM (Low Tech)',
    'PNM (High Tech)','Micro Irrigation','Precision WM','Supplimentary Irrigation',
    'Frost Gun','Slow Release Fertilizer','Micro-Environment','Fog/Mist Gun','Mechanical Support',
    'Fertilizer Timing','Shading Canopy','Cooling Canopy']; */

/*   const fullList = ['rice','wheat','maize','sorghum','fmillet','pmillet',
    'safflower','sunflower','rapeseed','sesame','groundnut',
    'soyabean','chickpea','ppea','bgram','ggram','lentil',
    'cotton','jute','rubber','sugarcane','tea','coconut',
    'cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater',
    'potato','onion','tomato','chilli','mango','banana'];

  function PopulateOptions() {
    const DisableList = {};
    fullList.forEach((sname) => {
        if(activeCrop[sname] && sname === 'rice'){
          opt.map((option,index) => { 
          DisableList[option] = true;
          const list = [10,2,3,5,6,7,8,11,13,14,15,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'wheat'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'maize'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'sorghum'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,16,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
    });
    return DisableList;
  }

  const [DisableList, setDisableList] = React.useState(
    PopulateOptions
  ); */

  function createInitialTodos() {
  const initialTodos = {};
  switchh.forEach((sname) => {
    initialTodos[sname] = false;
  });
  return initialTodos;
  }

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

  const [state, setState] = React.useState(
    createInitialTodos
  );

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked});
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
        backgroundColor: '#ffe89c',
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
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:1,}}>Select Adaptation Option</Typography>
        </FormLabel>
      {(checkcrop()===true || activeCrop['rice']===true) && directswitch.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
      {checkcrop()===true && switchh.map((sname1) => (
        <FormGroup>
        <FormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={state[sname1]} 
          onChange={handleChange(sname1)} name={sname1} />
        } 
        key={sname1}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname1.charAt(0).toUpperCase()+sname1.toLowerCase().slice(1)}</Typography>}
        />
        {state[sname1] && sname1 === 'Planting Technology' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {planting.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Fertilizer Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {fertilizer.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              }
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Water Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {water.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        </FormGroup>
      ))}
      {activeCrop['rice']===true && switchh.map((sname1) => (
        <FormGroup>
        <FormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={state[sname1]} 
          onChange={handleChange(sname1)} name={sname1} />
        } 
        key={sname1}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname1.charAt(0).toUpperCase()+sname1.toLowerCase().slice(1)}</Typography>}
        />
        {state[sname1] && sname1 === 'Planting Technology' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {planting_rice.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Fertilizer Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {fertilizer_rice.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              }
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Water Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {water.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        </FormGroup>
      ))}
      {(checkcrop()===true || activeCrop['rice']===true) && directswitchdown.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
            {(checkcrop()===false && activeCrop['rice']===false && checkFish()===true) && livestock.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={true}
              key={sname}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname.charAt(0).toUpperCase()+sname.toLowerCase().slice(1)}</Typography>}
              />
           </FormGroup>
            ))}
            {(checkcrop()===false && activeCrop['rice']===false && checkFish()===false) && marine.map((sname) => (
              <div><Box sx={{display:'flex',flexDirection:'column',textAlign:'left'}}>To be updated</Box></div>
            ))}
    </FormControl>
  );
}