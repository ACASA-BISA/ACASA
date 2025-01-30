import React from 'react';
import { Grid, Paper, Typography, Box, Popper } from '@mui/material';
import Map_Adaptation from './Map_Adaptation';
import './font.css';
import Summ_Comm from './Summ_Comm';
import Summ_Loc from './Summ_Loc';
import Summ_Scenario from './Summ_Scenario';
import Summ_Model from './Summ_Model';

export default function Adaptation_Analytics2({
    cropid, focus2, activeRegion2, activeOpt,
    ActiveRegionChange2, handleChangeSumm
}){
    const paperwidth = React.useRef(null);
    const [paperHeight, setPaperHeight] = React.useState(0);
    const [paperWidth, setPaperWidth] = React.useState(0);

    const box2 = React.useRef(null);
    const box3 = React.useRef(null);
    const box4 = React.useRef(null);
    const box5 = React.useRef(null);
    const box6 = React.useRef(null);
    // Use useEffect to set the height after the component mounts
    React.useEffect(() => {
        if (paperwidth.current) {
        setPaperHeight(paperwidth.current.offsetHeight);
        setPaperWidth(paperwidth.current.offsetWidth);
        }
    }, []);

    const [NameScenario, setNameScenario] = React.useState('baseline');
    
        const handleScenario = (name) => {
            setNameScenario(name);
          };
    
        const [NameModel, setNameModel] = React.useState('CANESM5');
    
        const handleModel = (name) => {
            setNameModel(name);
          };

    return(
        <div style={{overflow:'hidden'}}>
            <Grid container sx={{marginTop:'85px',marginBottom:'2px',paddingX: '1rem'}} columns={14} spacing={1}>
                
                <Grid item xs={14} key="Side_Maps" sx={{marginLeft:'60px'}}>
                <Grid container spacing={1}>
                <Grid item xs={4} key="Side_Bar">
                    <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'22px',
                            display:'flex',flexDirection:'row',
                            alignContent:'center',justifyContent:'center',alignItems:'center',
                            gap:'10px'}}>
                            <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold',fontFamily:'Karla'}}>Technical Suitability</Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{marginLeft:'25px'}} ref={paperwidth}>
                                <Map_Adaptation activeCrop={cropid} focus={focus2} activeRegion={activeRegion2} activeOpt={activeOpt}></Map_Adaptation>
                                <Typography
                                    sx={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: 'left bottom',
                                        whiteSpace: 'nowrap',
                                        padding: '2px',
                                        backgroundColor: '#f0f0f0',
                                        border: '0px solid #ccc',
                                        height:'22px',
                                        width: paperHeight - 4,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Baseline
                                </Typography>
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
                                        offset: [-( (paperWidth)/2 - 60),-95], // Adjust distance from the container
                                    },
                                    },
                                ]}
                                >
                                <Paper elevation={1}>
                                    <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                        <Typography fontSize='0.62rem' fontWeight='bold' align='left'>Legend Title and Area:</Typography>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                            <Typography fontSize='0.62rem'>Very Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                            <Typography fontSize='0.62rem'>Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                            <Typography fontSize='0.62rem'>Medium</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                            <Typography fontSize='0.62rem'>High</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                            <Typography fontSize='0.62rem'>Very High</Typography>
                                        </Box>
                                    </Box>
                                 </Paper>
                            </Popper>
                        </Grid>
                        
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar2">
                    <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'22px',
                            display:'flex',flexDirection:'row',
                            alignContent:'center',justifyContent:'center',alignItems:'center',
                            gap:'10px'}}>
                            <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold',fontFamily:'Karla'}}>Economic Benefits</Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{marginLeft:'25px'}} ref={box2}>
                                <Map_Adaptation activeCrop={cropid} focus={focus2} activeRegion={activeRegion2} activeOpt={activeOpt}></Map_Adaptation>
                                <Typography
                                    sx={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: 'left bottom',
                                        whiteSpace: 'nowrap',
                                        padding: '2px',
                                        backgroundColor: '#f0f0f0',
                                        border: '0px solid #ccc',
                                        height:'22px',
                                        width: paperHeight - 4,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Baseline
                                </Typography>
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
                                        offset: [-( (paperWidth)/2 - 60),-95], // Adjust distance from the container
                                    },
                                    },
                                ]}
                                >
                                <Paper elevation={1}>
                                    <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                        <Typography fontSize='0.62rem' fontWeight='bold' align='left'>Legend Title and Area:</Typography>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                            <Typography fontSize='0.62rem'>Very Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                            <Typography fontSize='0.62rem'>Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                            <Typography fontSize='0.62rem'>Medium</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                            <Typography fontSize='0.62rem'>High</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                            <Typography fontSize='0.62rem'>Very High</Typography>
                                        </Box>
                                    </Box>
                                 </Paper>
                            </Popper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar3">
                    <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'22px',
                            display:'flex',flexDirection:'row',
                            alignContent:'center',justifyContent:'center',alignItems:'center',
                            gap:'10px'}}>
                            <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold',fontFamily:'Karla'}}>Scalability</Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{marginLeft:'25px'}} ref={box3}>
                                <Map_Adaptation activeCrop={cropid} focus={focus2} activeRegion={activeRegion2} activeOpt={activeOpt}></Map_Adaptation>
                                <Typography
                                    sx={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: 'left bottom',
                                        whiteSpace: 'nowrap',
                                        padding: '2px',
                                        backgroundColor: '#f0f0f0',
                                        border: '0px solid #ccc',
                                        height:'22px',
                                        width: paperHeight - 4,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Baseline
                                </Typography>
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
                                        offset: [-( (paperWidth)/2 - 60),-95], // Adjust distance from the container
                                    },
                                    },
                                ]}
                                >
                                <Paper elevation={1}>
                                    <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                        <Typography fontSize='0.62rem' fontWeight='bold' align='left'>Legend Title and Area:</Typography>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                            <Typography fontSize='0.62rem'>Very Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                            <Typography fontSize='0.62rem'>Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                            <Typography fontSize='0.62rem'>Medium</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                            <Typography fontSize='0.62rem'>High</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                            <Typography fontSize='0.62rem'>Very High</Typography>
                                        </Box>
                                    </Box>
                                 </Paper>
                            </Popper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="2Side_Bar1">
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{marginLeft:'25px'}} ref={box4}>
                                <Map_Adaptation activeCrop={cropid} focus={focus2} activeRegion={activeRegion2} activeOpt={activeOpt}></Map_Adaptation>
                                <Typography
                                    sx={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: 'left bottom',
                                        whiteSpace: 'nowrap',
                                        padding: '2px',
                                        backgroundColor: '#f0f0f0',
                                        border: '0px solid #ccc',
                                        height:'22px',
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    2050s/2080s
                                </Typography>
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
                                        offset: [-( (paperWidth)/2 - 60),-95], // Adjust distance from the container
                                    },
                                    },
                                ]}
                                >
                                <Paper elevation={1}>
                                    <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                        <Typography fontSize='0.62rem' fontWeight='bold' align='left'>Legend Title and Area:</Typography>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                            <Typography fontSize='0.62rem'>Very Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                            <Typography fontSize='0.62rem'>Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                            <Typography fontSize='0.62rem'>Medium</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                            <Typography fontSize='0.62rem'>High</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                            <Typography fontSize='0.62rem'>Very High</Typography>
                                        </Box>
                                    </Box>
                                 </Paper>
                            </Popper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="2Side_Bar2">
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{marginLeft:'25px'}} ref={box5}>
                                <Map_Adaptation activeCrop={cropid} focus={focus2} activeRegion={activeRegion2} activeOpt={activeOpt}></Map_Adaptation>
                                <Typography
                                    sx={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: 'left bottom',
                                        whiteSpace: 'nowrap',
                                        padding: '2px',
                                        backgroundColor: '#f0f0f0',
                                        border: '0px solid #ccc',
                                        height:'22px',
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    2050s/2080s
                                </Typography>
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
                                        offset: [-( (paperWidth)/2 - 60),-95], // Adjust distance from the container
                                    },
                                    },
                                ]}
                                >
                                <Paper elevation={1}>
                                    <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                        <Typography fontSize='0.62rem' fontWeight='bold' align='left'>Legend Title and Area:</Typography>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                            <Typography fontSize='0.62rem'>Very Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                            <Typography fontSize='0.62rem'>Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                            <Typography fontSize='0.62rem'>Medium</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                            <Typography fontSize='0.62rem'>High</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                            <Typography fontSize='0.62rem'>Very High</Typography>
                                        </Box>
                                    </Box>
                                 </Paper>
                            </Popper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="2Side_Bar3">
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{marginLeft:'25px'}} ref={box6}>
                                <Map_Adaptation activeCrop={cropid} focus={focus2} activeRegion={activeRegion2} activeOpt={activeOpt}></Map_Adaptation>
                                <Typography
                                    sx={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: 'left bottom',
                                        whiteSpace: 'nowrap',
                                        padding: '2px',
                                        backgroundColor: '#f0f0f0',
                                        border: '0px solid #ccc',
                                        height:'22px',
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    2050s/2080s
                                </Typography>
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
                                        offset: [-( (paperWidth)/2 - 60),-95], // Adjust distance from the container
                                    },
                                    },
                                ]}
                                >
                                <Paper elevation={1}>
                                    <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                        <Typography fontSize='0.62rem' fontWeight='bold' align='left'>Legend Title and Area:</Typography>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                            <Typography fontSize='0.62rem'>Very Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                            <Typography fontSize='0.62rem'>Low</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                            <Typography fontSize='0.62rem'>Medium</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                            <Typography fontSize='0.62rem'>High</Typography>
                                        </Box>
                                        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                            <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                            <Typography fontSize='0.62rem'>Very High</Typography>
                                        </Box>
                                    </Box>
                                 </Paper>
                            </Popper>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
                </Grid>
                <Box
                    sx={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'left bottom',
                        marginTop:'-60px',
                        marginLeft:'60px',
                        width:'calc(100vh - 95px)'}}>
                    <Box sx={{width:'100%',bgcolor:'#dddddd',height:'24px',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                        <Typography sx={{fontSize:14,fontWeight:'bold'}}>Adaptation Analytics</Typography>
                    </Box>
                    <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',backgroundColor:'#ffffff',border:'0px solid black'}}>
                        <Typography sx={{fontSize:13,fontWeight:'bold'}}>Scenario: </Typography>
                        <Summ_Scenario handleScenario={handleScenario}></Summ_Scenario>
                        <Typography sx={{marginLeft:'5px',fontSize:13,fontWeight:'bold'}}>Model: </Typography>
                        <Summ_Model handleModel={handleModel}></Summ_Model>
                        <Typography sx={{fontSize:13,fontWeight:'bold'}}>Commodity: </Typography>
                        <Summ_Comm changeComm={handleChangeSumm} comm={cropid}></Summ_Comm>
                        <Typography sx={{marginLeft:'5px',fontSize:13,fontWeight:'bold'}}>Location: </Typography>
                        <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
                    </Box>
                </Box>
            </Grid>
        </div>
    );
};