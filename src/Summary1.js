import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, Button } from '@mui/material';
import SMap from './Map_3d';

export default function Summ(
    activeCrop,focus,activeRegion,activeOpt,CurrRisk
){
    return(
        <div><Box sx={{width:'auto', display:'flex',height:'calc(100vh - 90px)',flexDirection:'row',justifyContent:'center',marginX:'auto',marginTop:'85px'}} gap='4vw'>
        <Paper elevation={1}>
        <SMap activeCrop={activeCrop} focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk}></SMap>
        </Paper>
        <Paper elevation={1}>
        <SMap activeCrop={activeCrop} focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk}></SMap>
        </Paper>
        <Paper elevation={1}>
        <SMap activeCrop={activeCrop} focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk}></SMap>
        </Paper>
        </Box></div>
    );
}
