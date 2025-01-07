import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import './font.css';
import './extra.css';
import './font2.css';
import Summ_Comm from './Summ_Comm';
import Summ_Loc from './Summ_Loc';
import Map_Index from './Map_HazardIndex';
import Map_Hazard from './Map_Hazard';
import Summ_Scenario from './Summ_Scenario';
import Summ_Model from './Summ_Model';

const legendComp = (<Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: "#FF0000",margin:'4px'}}/>
    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
    Extreme
    </Typography>
    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFA500',margin:'4px'}}/>
    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
    Very High
    </Typography>
    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFFF00',margin:'4px'}}/>
    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
    High
    </Typography>
    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#00FF00',margin:'4px'}}/>
    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
    Medium
    </Typography>
    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#059212',margin:'4px'}}/>
    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
    Low
    </Typography>
    </Box>);

export default function HazardGlance({
    handleChangeSumm,
    cropid,
    focus2,
    activeRegion2,
    ActiveRegionChange2,
    crop2,
    CurrRisk2
}){
    const [NameScenario, setNameScenario] = React.useState('baseline');

    const handleScenario = (name) => {
        setNameScenario(name);
      };

    const [NameModel, setNameModel] = React.useState('CHC');

    const handleModel = (name) => {
        setNameModel(name);
      };

    return(
        <div style={{overflow:'hidden'}}>
            <Grid container sx={{marginTop:'90px',marginBottom:'2px',paddingX: '1rem'}} columns={12} spacing={1}>
                <Grid item xs={3} key="side">
                    <Paper elevation={1}>
                        <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'24px',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                            <Typography sx={{fontSize:14,fontWeight:'bold'}}>Hazard at a Glance</Typography>
                        </Box>
                        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Scenario: </Typography>
                            <Summ_Scenario handleScenario={handleScenario}></Summ_Scenario>
                            <Typography sx={{marginLeft:'5px',fontSize:13,fontWeight:'bold'}}>Model: </Typography>
                            <Summ_Model handleModel={handleModel}></Summ_Model>
                        </Box>
                        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Commodity: </Typography>
                            <Summ_Comm changeComm={handleChangeSumm} comm={cropid}></Summ_Comm>
                            <Typography sx={{marginLeft:'5px',fontSize:13,fontWeight:'bold'}}>Location: </Typography>
                            <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
                        </Box>
                        {legendComp}
                        <Map_Index activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={CurrRisk2}></Map_Index>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={1}>
                        <Grid item xs={4} key='1'>
                            <Paper elevation={1}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Heat Stress</Typography>
                            {legendComp}
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} key='2'>
                            <Paper elevation={1}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Delayed Monsoon</Typography>
                            {legendComp}
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Delayed Monsoon' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} key='3'>
                            <Paper elevation={1}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Heat Stress</Typography>
                            {legendComp}
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} key='4'>
                            <Paper elevation={1}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Heat Stress</Typography>
                            {legendComp}
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} key='5'>
                            <Paper elevation={1}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Heat Stress</Typography>
                            {legendComp}
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} key='6'>
                            <Paper elevation={1}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Heat Stress</Typography>
                            {legendComp}
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};