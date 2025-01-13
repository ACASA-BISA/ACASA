import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import Map_Adaptation from './Map_Adaptation';
import './font.css';

export default function Adaptation_Analytics({
    cropid, focus2, activeRegion2, activeOpt
}){
    const paperwidth = React.useRef(null);
    const [paperHeight, setPaperHeight] = React.useState(0);

    // Use useEffect to set the height after the component mounts
    React.useEffect(() => {
        if (paperwidth.current) {
        setPaperHeight(paperwidth.current.offsetHeight);
        }
    }, []);

    return(
        <div style={{overflow:'hidden'}}>
            <Grid container sx={{marginTop:'85px',marginBottom:'2px',paddingX: '1rem'}} columns={12} spacing={1}>
                <Grid item xs={4} key="Side_Bar">
                    <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'22px',
                            display:'flex',flexDirection:'row',
                            alignContent:'center',justifyContent:'center',alignItems:'center',
                            gap:'10px'}}>
                            <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold',fontFamily:'Karla'}}>Baseline</Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={9}>
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
                                    Technical Suitability
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The technical suitability:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar2">
                    <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'22px',
                            display:'flex',flexDirection:'row',
                            alignContent:'center',justifyContent:'center',alignItems:'center',
                            gap:'10px'}}>
                            <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold',fontFamily:'Karla'}}>2050s</Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={9}>
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
                                    Technical Suitability
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The technical suitability:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar3">
                    <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'22px',
                            display:'flex',flexDirection:'row',
                            alignContent:'center',justifyContent:'center',alignItems:'center',
                            gap:'10px'}}>
                            <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold',fontFamily:'Karla'}}>2080s</Typography>
                    </Box>
                    <Grid container>
                        <Grid item xs={9}>
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
                                    Technical Suitability
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The technical suitability:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar">
                    <Grid container>
                        <Grid item xs={9}>
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
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Socio-Economic Benefits
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The Socio-Economic Benefits:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar">
                    <Grid container>
                        <Grid item xs={9}>
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
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Socio-Economic Benefits
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The Socio-Economic Benefits:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar">
                    <Grid container>
                        <Grid item xs={9}>
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
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Socio-Economic Benefits
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The Socio-Economic Benefits:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar">
                    <Grid container>
                        <Grid item xs={9}>
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
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Scalability
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The Scalability:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar">
                    <Grid container>
                        <Grid item xs={9}>
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
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Scalability
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The Scalability:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} key="Side_Bar">
                    <Grid container>
                        <Grid item xs={9}>
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
                                        width: paperHeight - 2,
                                        fontSize:'14px'
                                    }}
                                    >
                                    Scalability
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid  item xs={3}>
                            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid #aaa',justifyContent:'top',alignItems:'left',height:'100%',paddingLeft:'5px'}}>
                                <Typography fontSize='12px' fontWeight='bold' align='left'>The Scalability:</Typography>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#059212'}} />
                                    <Typography fontSize='12px'>Very Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#00FF00'}} />
                                    <Typography fontSize='12px'>Low</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFDE4D'}} />
                                    <Typography fontSize='12px'>Medium</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#FFA500'}} />
                                    <Typography fontSize='12px'>High</Typography>
                                </Box>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',gap:'5px'}}>
                                    <Box sx={{width: 10, height: 10, borderRadius: 0, bgcolor: '#E4003A'}} />
                                    <Typography fontSize='12px'>Very High</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};