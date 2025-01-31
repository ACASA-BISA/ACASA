import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SwitchPulses({
  activeCrop,
  changeCrop
}) {
  const switchh = ['Chickpea','Pigeonpea','Black Gram','Green Gram','Lentil'];
  const switchid = ['chickpea','ppea','bgram','ggram','lentil'];
  const disvar = {'chickpea':false,'ppea':false,'bgram':true,'ggram':true,'lentil':true};
  const padd = 8;
  const season = [
    'Analysis done for Rabi/winter season','Analysis done for Rabi/winter season','Analysis done for Rabi/winter season',
    'Analysis done for Rabi/winter season','Analysis done for Rabi/winter season'];

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

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#ccc', // Color for the label text when disabled
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
      <FormGroup>
      {switchid.map((sname,index) => (
        <CustomFormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeCrop[sname]} onChange={changeCrop(sname)} name={sname} />
        }
        key={sname}
        disabled={disvar[sname]}
        label={<Typography variant="body2" sx={{paddingLeft:1}}>{switchh[index]}
        {disvar[sname]===false && <LightTooltip title={
                      <>
                        <span>{season[index]}</span>
                        <br />
                        <Link
                          href="#/resources/?tab=4"
                          target="_blank"
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Read More
                        </Link>
                      </>
                    } placement="top" arrow>
        <IconButton sx={{padding:0,margin:0,paddingX:'4px'}}>
        <InfoOutlinedIcon sx={{fontSize:'12px',padding:0,margin:0}} />
        </IconButton>
        </LightTooltip>}</Typography>}
        />
      ))}
      </FormGroup>
    </FormControl>
  );
}