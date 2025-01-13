import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, MenuItem, Select, FormControl, Popper, InputLabel, Slider, IconButton} from '@mui/material';
import Map_Option from './Comp_Map';  // Assuming this is your map component
import './font.css';
import './extra.css';
import './font2.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { styled } from '@mui/material/styles';
import Legend_Small from './Legend_Small';

// Array of image URLs, one for each year
const images = [
  { year: 2000, url: 'Timeline/Rice_Delayed monsoon_baseline.png' },
  { year: 2001, url: 'Timeline/Rice_Delayed monsoon_SSP245.png' },
  { year: 2002, url: 'Timeline/Rice_Delayed monsoon_SSP585.png' },
  { year: 2003, url: 'Timeline/Rice_Dry spell number_baseline.png' },
  { year: 2004, url: 'Timeline/Rice_Dry spell number_SSP245.png' },
  { year: 2005, url: 'Timeline/Rice_Dry spell number_SSP585.png' },
  // Add more images as needed
];

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback
  useEffect(() => {
      savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
      function tick() {
          savedCallback.current();
      }
      if (delay !== null) {
          const id = setInterval(tick, delay);
          return () => clearInterval(id);
      }
  }, [delay]);
};

export default function CompV({
  activeCrop,
  activeScenario,
  changeScenario,
  changeCrop,
  LocationData,
  activeRegion,
  changeRegion,
  focus,
  activeOpt,
  changeOpt,
  CurrRisk,
  changeRisk,
  activeImpact,
  changeImpact,
  area_dict3,
  area_dict4,
  activeOptLayer,
  changeOptLayer
}) {
    let scn = 'baseline';
    if(activeScenario['ssp245']){
        scn ='ssp245';
    }
    else if(activeScenario['ssp585']){
        scn ='ssp585';
    }
    
    const [futureModel, setFutureModel] = React.useState('Absolute');
    let sec = activeRegion.indexOf(',');

    const countryMap1 ={};
    countryMap1['South Asia'] = 'SA';
    countryMap1['Afghanistan'] = 'AF';
    countryMap1['Bangladesh'] = 'BD';
    countryMap1['Bhutan'] = 'BT';
    countryMap1['India'] = 'IN';
    countryMap1['Nepal'] = 'NP';
    countryMap1['Pakistan'] = 'PK';
    countryMap1['Sri Lanka'] = 'LK';
    countryMap1['Maldives'] = 'MV';
  
    let x = 'SA';
    let y = '';
    if (sec>0){
      x = activeRegion.substring(sec+2);
      y = activeRegion.substring(0,sec);
  
      x = countryMap1[x];
    }
    else{
      x = activeRegion;
      x = countryMap1[x];
    }
    const [reg, setReg] = React.useState(x);
    const [state, setState] = React.useState(y);
    
    const countryMap ={};
    countryMap['SA'] = 'South Asia';
    countryMap['AF'] = 'Afghanistan';
    countryMap['BD'] = 'Bangladesh';
    countryMap['BT'] = 'Bhutan';
    countryMap['IN'] = 'India';
    countryMap['NP'] = 'Nepal';
    countryMap['PK'] = 'Pakistan';
    countryMap['LK'] = 'Sri Lanka';
    countryMap['MV'] = 'Maldives';

    const handleScenariochange = (event) => {
      changeScenario(event.target.value);
      setFutureModel(event.target.value);
    } 

    const [sharedView, setSharedView] = React.useState(null);

    const handleviewchange = (viewx) => {
      setSharedView({
        center: viewx.getCenter(),
        zoom: viewx.getZoom(),
      });
    };

    const gridRefs = [React.useRef(null), React.useRef(null), React.useRef(null)];

    const [currentYearIndex, setCurrentYearIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Auto-play interval, changes image every 1 second (1000ms)
    useInterval(
        () => {
            setCurrentYearIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        },
        isPlaying ? 1000 : null
    );

    // Toggle play/pause
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // Handle slider change (manual navigation through timeline)
    const handleSliderChange = (event, newValue) => {
        setCurrentYearIndex(newValue);
        setIsPlaying(false); // Stop autoplay when the slider is moved manually
    };
    const color_for_button = '#4b9e44';
    // Display the current image and year
    const currentImage = images[currentYearIndex];
    //Color: #52af77
    const PrettoSlider = styled(Slider)({
        color: color_for_button,
        height: 5,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 10,
          width: 12,
          borderRadius: 2,
          backgroundColor: '#fff',
          border: '1px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&::before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 12,
          background: 'unset',
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: '50% 50% 50% 0',
          backgroundColor: color_for_button,
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          '&::before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      });
    
  return (
    <div className='viewer-container' style={{overflow:'hidden'}}>
    <Grid container sx={{marginTop:'0px',paddingX: '1rem'}} columns={12}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {['Baseline', '2050s', '2080s'].map((label, index) => (
            <Grid item xs={4} key={index} ref={gridRefs[index]}>
              <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'24px',
                display:'flex',flexDirection:'row',
                alignContent:'center',justifyContent:'center',alignItems:'center',
                gap:'10px'}}>
                <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold',fontFamily:'Karla'}}>{label}</Typography>
                {(label==='2050s'||label==='2080s') && <FormControl size='small'>
                <Select labelId="Scenariox"
                  id="future-model-select-idx"
                  sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}
                  value={futureModel} onChange={handleScenariochange}>
                    <MenuItem value="Absolute" sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}>Absolute</MenuItem>
                    <MenuItem value="Percentage Change" sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}>Percentage Change</MenuItem>
                </Select>
                </FormControl>}
              </Box>
              
              <Paper elevation={1} sx={{ width: '100%', height: 'calc(100vh - 155px)' }}>
                {label==='Baseline'&&
                <div>
                  <Map_Option activeCrop={activeCrop} activeScenario='baseline' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}
                  sharedView={sharedView} handleviewchange={handleviewchange} activeOptLayer={activeOptLayer}></Map_Option>
                  {(CurrRisk!=='' || activeOpt!=='') && <Popper
                  open={true} // Always open
                  anchorEl={gridRefs[index].current} // Anchor to the Grid container
                  placement="bottom" // Position it at the bottom
                  disablePortal={true} // Stay within the DOM hierarchy
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [3, -130], // Adjust distance from the container
                      },
                    },
                  ]}
                >
                  <Paper elevation={1} sx={{ maxWidth: '100%',borderRadius: "5px",padding:'3px'}}>
                  <Legend_Small location={activeRegion} commodity={activeCrop} adaption={activeOpt} RiskName={CurrRisk}
                      scenario='baseline' ImpactName={activeImpact} area_data3={area_dict3} area_data4={area_dict4}></Legend_Small>
                  </Paper>
                </Popper>}
                {(CurrRisk!=='' || activeOpt!=='') && <Popper
                    open={true} // Always open
                    anchorEl={gridRefs[index].current} // Anchor to the Grid container
                    placement="bottom" // Position it at the bottom
                    disablePortal={true} // Stay within the DOM hierarchy
                    modifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [(gridRefs[index].current.offsetWidth / 3)/2 + 15 - ( gridRefs[index].current.offsetWidth / 2), -(( gridRefs[index].current.offsetWidth / 3 ) + 130 + 50)], // Adjust distance from the container
                        },
                      },
                    ]}
                  >
                    <Box display="flex" flexDirection="column" alignItems="center" sx={{border:'1px solid #eee'}}>
                    <Box sx={{width:'90%',bgcolor:'#E4E0E1',height:'18px',marginTop:'1px'}}>
                        <Typography align="center" sx={{fontSize:'12px',fontWeight:'bold'}}>Year: {currentImage.year}</Typography>
                    </Box> 
                    <Box display="flex" flexDirection="row" sx={{width:'100%'}}  alignItems="center" justifyContent="center" gap="8px">
                        <IconButton onClick={handlePlayPause} sx={{color: color_for_button,border:'1px solid #eee',borderRadius:'8px',padding:'2px'}}>
                            {isPlaying ? <PauseIcon sx={{fontSize:'15px'}} /> : <PlayArrowIcon sx={{fontSize:'15px'}} />}
                        </IconButton>
                        <Box sx={{ width: '60%', mt: 0, mb: 0 }}>
                            <PrettoSlider
                                value={currentYearIndex}
                                min={0}
                                max={images.length - 1}
                                step={1}
                                marks={images.map((img, idx) => ({
                                    value: idx,
                                    //label: img.year.toString(),
                                }))}
                                onChange={handleSliderChange}
                                aria-labelledby="timeline-slider"
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    </Box>
                    <Box
                        component="img"
                        src={currentImage.url}
                        alt={`Year ${currentImage.year}`}
                        sx={{ width: '100%', maxWidth: ( gridRefs[index].current.offsetWidth / 3), height: 'auto', mb: 0 }}
                    />  
                </Box>
                </Popper>}
                </div>}
                {label==='2050s'&&
                <div>
                  <Map_Option activeCrop={activeCrop} activeScenario='ssp245' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}
                  sharedView={sharedView} handleviewchange={handleviewchange} activeOptLayer={activeOptLayer}></Map_Option>
                  {(CurrRisk!=='' || activeOpt!=='') && <Popper
                  open={true} // Always open
                  anchorEl={gridRefs[index].current} // Anchor to the Grid container
                  placement="bottom" // Position it at the bottom
                  disablePortal={true} // Stay within the DOM hierarchy
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [3, -130], // Adjust distance from the container
                      },
                    },
                  ]}
                >
                  <Paper elevation={1} sx={{ maxWidth: '100%',borderRadius: "5px",padding:'3px'}}>
                  <Legend_Small location={activeRegion} commodity={activeCrop} adaption={activeOpt} RiskName={CurrRisk}
                      scenario='ssp245' ImpactName={activeImpact} area_data3={area_dict3} area_data4={area_dict4}></Legend_Small>
                  </Paper>
                </Popper>}
                {(CurrRisk!=='' || activeOpt!=='') && <Popper
                  open={true} // Always open
                  anchorEl={gridRefs[index].current} // Anchor to the Grid container
                  placement="bottom" // Position it at the bottom
                  disablePortal={true} // Stay within the DOM hierarchy
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [(gridRefs[index].current.offsetWidth / 3)/2 + 15 - ( gridRefs[index].current.offsetWidth / 2), -(( gridRefs[index].current.offsetWidth / 3 ) + 130 + 50)], // Adjust distance from the container
                      },
                    },
                  ]}
                >
                  <Box display="flex" flexDirection="column" alignItems="center" sx={{border:'1px solid #eee'}}>
                  <Box sx={{width:'90%',bgcolor:'#E4E0E1',height:'18px',marginTop:'1px'}}>
                      <Typography align="center" sx={{fontSize:'12px',fontWeight:'bold'}}>Year: {currentImage.year}</Typography>
                  </Box> 
                  <Box display="flex" flexDirection="row" sx={{width:'100%'}}  alignItems="center" justifyContent="center" gap="8px">
                      <IconButton onClick={handlePlayPause} sx={{color: color_for_button,border:'1px solid #eee',borderRadius:'8px',padding:'2px'}}>
                          {isPlaying ? <PauseIcon sx={{fontSize:'15px'}} /> : <PlayArrowIcon sx={{fontSize:'15px'}} />}
                      </IconButton>
                      <Box sx={{ width: '60%', mt: 0, mb: 0 }}>
                          <PrettoSlider
                              value={currentYearIndex}
                              min={0}
                              max={images.length - 1}
                              step={1}
                              marks={images.map((img, idx) => ({
                                  value: idx,
                                  //label: img.year.toString(),
                              }))}
                              onChange={handleSliderChange}
                              aria-labelledby="timeline-slider"
                              valueLabelDisplay="auto"
                          />
                      </Box>
                  </Box>
                  <Box
                      component="img"
                      src={currentImage.url}
                      alt={`Year ${currentImage.year}`}
                      sx={{ width: '100%', maxWidth: ( gridRefs[index].current.offsetWidth / 3), height: 'auto', mb: 0 }}
                  />  
              </Box>
              </Popper>}
                </div>}
                {label==='2080s'&&
                <div>
                  <Map_Option activeCrop={activeCrop} activeScenario='ssp585' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}
                  sharedView={sharedView} handleviewchange={handleviewchange} activeOptLayer={activeOptLayer}></Map_Option>
                  {(CurrRisk!=='' || activeOpt!=='') && <Popper
                  open={true} // Always open
                  anchorEl={gridRefs[index].current} // Anchor to the Grid container
                  placement="bottom" // Position it at the bottom
                  disablePortal={true} // Stay within the DOM hierarchy
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [3, -130], // Adjust distance from the container
                      },
                    },
                  ]}
                >
                  <Paper elevation={1} sx={{ maxWidth: '100%',borderRadius: "5px",padding:'3px'}}>
                  <Legend_Small location={activeRegion} commodity={activeCrop} adaption={activeOpt} RiskName={CurrRisk}
                      scenario='ssp585' ImpactName={activeImpact} area_data3={area_dict3} area_data4={area_dict4}></Legend_Small>
                  </Paper>
                </Popper>}
                {(CurrRisk!=='' || activeOpt!=='') && <Popper
                  open={true} // Always open
                  anchorEl={gridRefs[index].current} // Anchor to the Grid container
                  placement="bottom" // Position it at the bottom
                  disablePortal={true} // Stay within the DOM hierarchy
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [(gridRefs[index].current.offsetWidth / 3)/2 + 15 - ( gridRefs[index].current.offsetWidth / 2), -(( gridRefs[index].current.offsetWidth / 3 ) + 130 + 50)], // Adjust distance from the container
                      },
                    },
                  ]}
                >
                  <Box display="flex" flexDirection="column" alignItems="center" sx={{border:'1px solid #eee'}}>
                  <Box sx={{width:'90%',bgcolor:'#E4E0E1',height:'18px',marginTop:'1px'}}>
                      <Typography align="center" sx={{fontSize:'12px',fontWeight:'bold'}}>Year: {currentImage.year}</Typography>
                  </Box> 
                  <Box display="flex" flexDirection="row" sx={{width:'100%'}}  alignItems="center" justifyContent="center" gap="8px">
                      <IconButton onClick={handlePlayPause} sx={{color: color_for_button,border:'1px solid #eee',borderRadius:'8px',padding:'2px'}}>
                          {isPlaying ? <PauseIcon sx={{fontSize:'15px'}} /> : <PlayArrowIcon sx={{fontSize:'15px'}} />}
                      </IconButton>
                      <Box sx={{ width: '60%', mt: 0, mb: 0 }}>
                          <PrettoSlider
                              value={currentYearIndex}
                              min={0}
                              max={images.length - 1}
                              step={1}
                              marks={images.map((img, idx) => ({
                                  value: idx,
                                  //label: img.year.toString(),
                              }))}
                              onChange={handleSliderChange}
                              aria-labelledby="timeline-slider"
                              valueLabelDisplay="auto"
                          />
                      </Box>
                  </Box>
                  <Box
                      component="img"
                      src={currentImage.url}
                      alt={`Year ${currentImage.year}`}
                      sx={{ width: '100%', maxWidth: ( gridRefs[index].current.offsetWidth / 3), height: 'auto', mb: 0 }}
                  />  
              </Box>
              </Popper>}
                </div>}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
};
