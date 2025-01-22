import React from 'react';
import { Grid, Paper, Typography, Box, Popper} from '@mui/material';
import './font.css';
import './extra.css';
import './font2.css';
import Summ_Comm from './Summ_Comm';
import Summ_Loc from './Summ_Loc';
import Map_Index from './Map_HazardIndex';
import Map_Hazard from './Map_Hazard';
import Summ_Scenario from './Summ_Scenario';
import Summ_Model from './Summ_Model';

const legendComp = (
    <Paper elevation={1}>
        <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',
            height:'100%',padding:'2px',paddingLeft:'2px',paddingRight:'3px',gap:'0px',backgroundColor:'#ddd'}}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'2px'}}>
                <Box sx={{width: 50, height: 15, borderRadius: 0, bgcolor: '#059212'}}>
                <Typography fontSize='0.62rem' color='white' align='left' fontWeight='bold' sx={{paddingLeft:'3px'}}>Very Low</Typography>
                </Box>
                <Typography fontSize='0.62rem' align='left' fontWeight='bold' sx={{paddingLeft:'2px'}}>NaN</Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'2px'}}>
                <Box sx={{width: 50, height: 15, borderRadius: 0, bgcolor: '#00FF00'}}>
                <Typography fontSize='0.62rem' color='white' align='left' fontWeight='bold' sx={{paddingLeft:'3px'}}>Low</Typography>
                </Box>
                <Typography fontSize='0.62rem' align='left' fontWeight='bold' sx={{paddingLeft:'2px'}}>NaN</Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'2px'}}>
                <Box sx={{width: 50, height: 15, borderRadius: 0, bgcolor: '#FFDE4D'}}>
                <Typography fontSize='0.62rem' color='white' align='left' fontWeight='bold' sx={{paddingLeft:'3px'}}>Medium</Typography>
                </Box>
                <Typography fontSize='0.62rem' align='left' fontWeight='bold' sx={{paddingLeft:'2px'}}>NaN</Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'2px'}}>
                <Box sx={{width: 50, height: 15, borderRadius: 0, bgcolor: '#FFA500'}}>
                <Typography fontSize='0.62rem' color='white' align='left' fontWeight='bold' sx={{paddingLeft:'3px'}}>High</Typography>
                </Box>
                <Typography fontSize='0.62rem' align='left' fontWeight='bold' sx={{paddingLeft:'2px'}}>NaN</Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'2px'}}>
                <Box sx={{width: 50, height: 15, borderRadius: 0, bgcolor: '#E4003A'}}>
                <Typography fontSize='0.62rem' color='white' align='left' fontWeight='bold' sx={{paddingLeft:'3px'}}>Very High</Typography>
                </Box>
                <Typography fontSize='0.62rem' align='left' fontWeight='bold' sx={{paddingLeft:'2px'}}>NaN</Typography>
            </Box>
        </Box>
     </Paper>);

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

    const [NameModel, setNameModel] = React.useState('CANESM5');

    const handleModel = (name) => {
        setNameModel(name);
      };

    const paperwidth = React.useRef(null);
    const [paperWidth, setPaperWidth] = React.useState(0);
    React.useEffect(() => {
            if (paperwidth.current) {
                setPaperWidth(paperwidth.current.offsetWidth);
            }
        }, []);

        const box1 = React.useRef(null);
        const box2 = React.useRef(null);
        const box3 = React.useRef(null);
        const box4 = React.useRef(null);
        const box5 = React.useRef(null);
        const box6 = React.useRef(null);

    return(
        <div style={{overflow:'hidden'}}>
            <Grid container sx={{marginTop:'90px',marginBottom:'2px',paddingX: '1rem'}} columns={12} spacing={1}>
                <Grid item xs={3} key="side">
                    <Paper elevation={1} ref={box1}>
                        <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'24px',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                            <Typography sx={{fontSize:14,fontWeight:'900',fontFamily:"Jura"}}>Hazard at a glance</Typography>
                        </Box>
                        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Location: </Typography>
                            <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
                            <Typography sx={{marginLeft:'5px',fontSize:13,fontWeight:'bold'}}>Commodity: </Typography>
                            <Summ_Comm changeComm={handleChangeSumm} comm={cropid}></Summ_Comm>
                        </Box>
                        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
                            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Scenario: </Typography>
                            <Summ_Scenario handleScenario={handleScenario}></Summ_Scenario>
                            <Typography sx={{marginLeft:'5px',fontSize:13,fontWeight:'bold'}}>Model: </Typography>
                            <Summ_Model handleModel={handleModel}></Summ_Model>
                        </Box>
                        <Map_Index activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={CurrRisk2}></Map_Index>
                    </Paper>
                    <Popper
                            open={true} // Always open
                            anchorEl={box1.current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                                {
                                name: "offset",
                                options: {
                                    offset: [-((paperWidth)/2 - 45),-87], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={1}>
                        <Grid item xs={4} key='1'>
                            <Paper elevation={1}  ref={paperwidth}>
                            <Typography sx={{fontSize:13,fontWeight:'800',fontFamily:"Jura"}}>Heat Stress</Typography>
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                            <Popper
                            open={true} // Always open
                            anchorEl={paperwidth.current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                                {
                                name: "offset",
                                options: {
                                    offset: [-((paperWidth)/2 - 45),-87], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
                        </Grid>
                        <Grid item xs={4} key='2'>
                            <Paper elevation={1} ref={box2}>
                            <Typography sx={{fontSize:13,fontWeight:'bold',fontWeight:'800',fontFamily:"Jura"}}>Delayed Monsoon</Typography>
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Delayed Monsoon' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                            <Popper
                            open={true} // Always open
                            anchorEl={box2.current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                                {
                                name: "offset",
                                options: {
                                    offset: [-((paperWidth)/2 - 45),-87], // Adjust distance from the container //-( (paperWidth)/2 - 40),-82
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
                        </Grid>
                        <Grid item xs={4} key='3'>
                            <Paper elevation={1} ref={box3}>
                            <Typography sx={{fontSize:13,fontWeight:'800',fontFamily:"Jura"}}>Heat Stress</Typography>
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                            <Popper
                            open={true} // Always open
                            anchorEl={box3.current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                                {
                                name: "offset",
                                options: {
                                    offset: [-((paperWidth)/2 - 45),-87], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
                        </Grid>
                        <Grid item xs={4} key='4'>
                            <Paper elevation={1} ref={box4}>
                            <Typography sx={{fontSize:13,fontWeight:'800',fontFamily:"Jura"}}>Heat Stress</Typography>
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                            <Popper
                            open={true} // Always open
                            anchorEl={box4.current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                                {
                                name: "offset",
                                options: {
                                    offset: [-((paperWidth)/2 - 45),-87], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
                        </Grid>
                        <Grid item xs={4} key='5'>
                            <Paper elevation={1} ref={box5}>
                            <Typography sx={{fontSize:13,fontWeight:'800',fontFamily:"Jura"}}>Heat Stress</Typography>
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                            <Popper
                            open={true} // Always open
                            anchorEl={box5.current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                                {
                                name: "offset",
                                options: {
                                    offset: [-((paperWidth)/2 - 45),-87], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
                        </Grid>
                        <Grid item xs={4} key='6'>
                            <Paper elevation={1} ref={box6}>
                            <Typography sx={{fontSize:13,fontWeight:'800',fontFamily:"Jura"}}>Heat Stress</Typography>
                            <Map_Hazard activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk='Heat Stress' activeScenario={NameScenario}></Map_Hazard>
                            </Paper>
                            <Popper
                            open={true} // Always open
                            anchorEl={box6.current} // Anchor to the Grid container
                            placement="bottom" // Position it at the bottom
                            disablePortal={true} // Stay within the DOM hierarchy
                            modifiers={[
                                {
                                name: "offset",
                                options: {
                                    offset: [-((paperWidth)/2 - 45),-87], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};