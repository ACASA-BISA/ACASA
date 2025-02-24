import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function SwitchAnalytics({
  activeCrop,
  changeAna,
}) {
  const switchh = ['Finance Rural','Access to Information','Literacy','Risk','Irrigation','Yield Gap','Crop Topology'];
  const switchid = ['Ana_FR','Ana_AI','Ana_L','Ana_R','Ana_I','Ana_YG','Ana_CT'];

  function createInitialTodos() {
    const initialTodos = {};
    switchid.forEach((sname,index) => {
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
    '&:hover': { 
      backgroundColor: theme.palette.mode === 'dark' ? '#554d38' : '#ffe89c', 
      opacity: 1,
      borderRadius: 12,
      '& .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.7)',
      },
  },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    alignItems: "flex-start",
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#E8E8E8', // Color for the label text when disabled
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:3}}>
      <FormLabel sx={{display:'flex',paddingBottom:1}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:2,}}>Select Adaptation Analytics</Typography><br/>
        </FormLabel>
        <FormLabel sx={{display:'flex',paddingBottom:1}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:0,}}>Heuristic Model</Typography>
        </FormLabel>
      {switchh.map((sname,index) => (
        <FormGroup>
        <CustomFormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={false} onChange={handleChange} 
          name={switchid[index]}/>
        }
        key={switchid[index]}
        disabled={false}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname}</Typography>}
        />
     </FormGroup>
      ))}
    </FormControl>
  );
}