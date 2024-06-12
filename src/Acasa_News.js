import * as React from 'react';
import { Paper, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const logoStyle = {
    width: 'auto',
    height: '25vh',
    margin:'20px',
  };

export default function News(

){
    return(
        <div>
            <Box sx={{display:'flex',flexDirection:'column', marginX:'70px',marginY:'20px',gap:'20px'}}>
                <Box sx={{backgroundColor:'#f1f1f1',borderRadius:'8px',display:'flex',flexDirection:'row'}}>
                <Box sx={{marginLeft:'20px'}}>
                <img src={'news.png'}
                style={logoStyle}
                alt="news"/>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', textAlign:'left', padding:'10px',marginX:'50px',marginY:'20px'}}> 
                <Typography variant='h6' sx={{fontWeight:'bold'}}>
                Issue 01
                </Typography>
                <Typography>
                ACASA inaugural newsletter - our mission, vision, approach, events, partner expectations, advisory panel, data and methods, and media presence... 
                <a href="https://mailchi.mp/cgiar/south-asias-first-climate-adaptation-atlas?e=7dab12cfe5" target="_blank" style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}> Read More</a>
                </Typography>
                <Typography sx={{color:'#444444',marginTop:'20px'}}>
                November 2023
                </Typography>
                </Box>
                </Box>
            </Box>
        </div>
    );
}