import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import SMap from './Map_3d';
import { Accordion } from '@mui/material';
import {Paper} from '@mui/material';
import Summ_Comm from './Summ_Comm';
import Summ_Loc from './Summ_Loc';
import Summ_Adapt from './Summ_Adapt';
import Summ_Adapt2 from './Summ_Adapt2';
import Summ_Adapt3 from './Summ_Adapt3';
import Summ_Adapt4 from './Summ_Adapt4';
import Map_Risk from './Map_Risk1';
import Map_Option from './Map_Option1';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Popper from '@mui/material/Popper';

export default function Summ1(
    crop2,focus2,activeRegion2,option,CurrRisk2,handleChangeSumm,ActiveRegionChange2,opt2,
    handleChangeOptSumm,option2,opt3,handleChangeOptSumm2,option3,opt4,handleChangeOptSumm3,
    option4,opt5,handleChangeOptSumm4,option5
){
    return(
        <div><Box sx={{width:'auto', display:'flex',height:'calc(100vh - 80px)',flexDirection:'row',justifyContent:'center',marginX:'auto',marginTop:'80px',backgroundColor:'#fff'}} gap='2vw'>
        
        <Box sx={{display:'flex',flexDirection:'column',gap:'2vh',marginTop:'4px',alignItems:'center'}}>
        <Popper
        open={true}
        >
        <div style={{position:'fixed',right:10,top:90, boxShadow:'0px 0px 0px #aaa',backgroundColor: 'white', border: '0px solid black', width:'280px', borderRadius:'15px' }}>
        </div>
        </Popper>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{justifyItems:'center',alignContent:'center',marginY:'-5px',width:'48vw',backgroundColor:'#F7F7F7'}}
        > <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>Layers at a glance</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{position:'absolute'}}>VE</AccordionDetails>
        </Accordion>


        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',width:'47vw',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
        <Typography sx={{fontSize:14,fontWeight:'bold'}}>Commodity: </Typography>
        <Summ_Comm changeComm={handleChangeSumm}></Summ_Comm>
        <Typography sx={{marginLeft:'20px',fontSize:14,fontWeight:'bold'}}>Location: </Typography>
        <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',gap:'2vh'}}> 
        <Paper elevation={1}>
        <Map_Risk activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={CurrRisk2}></Map_Risk>
        </Paper>
        <Paper elevation={1}>
        <SMap activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={option} CurrRisk={CurrRisk2}></SMap>
        </Paper>
        </Box>
        
        </Box>
        
        <Box sx={{display:'flex',flexDirection:'column',gap:'2vh',marginTop:'4px'}}>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt activv={opt2} changeOption={handleChangeOptSumm} activeCrop={crop2}></Summ_Adapt></Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={option2}></Map_Option>
        </Paper>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt2 activv={opt3} changeOption={handleChangeOptSumm2} activeCrop={crop2}></Summ_Adapt2></Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={option3}></Map_Option>
        </Paper>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'2vh',marginTop:'4px'}}>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt3 activv={opt4} changeOption={handleChangeOptSumm3} activeCrop={crop2}></Summ_Adapt3></Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={option4}></Map_Option>
        </Paper>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt4 activv={opt5} changeOption={handleChangeOptSumm4} activeCrop={crop2}></Summ_Adapt4></Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={option5}></Map_Option>
        </Paper>
        </Box>
        </Box></div>
    );
}
