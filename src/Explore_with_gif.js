import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel, Slider, IconButton} from '@mui/material';
import Map_Option from './Comp_Map';  // Assuming this is your map component
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './font.css';
import './extra.css';

const Comm = ['Rice','Wheat','Maize','Barley','Sorghum','Mustard','Groundnut',
  'Soybean','Chickpea','Pigeonpea','Cotton','Jute','Sugarcane','Tea','Potato',
  'Cattle','Buffalo','Goat','Sheep','Pig','Poultry'];

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
}

export default function CompGif({
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
}) {
    let scn = 'baseline';
    if(activeScenario['ssp245']){
        scn ='ssp245';
    }
    else if(activeScenario['ssp585']){
        scn ='ssp585';
    }
    const [commodity, setCommodity] = React.useState(activeCrop.toLowerCase());
    const [futureModel, setFutureModel] = React.useState(scn);
    const [layer, setLayer] = React.useState('');
    const [subChoice, setSubChoice] = React.useState('');
    const [adpopt, setAdpopt] = React.useState('');
    const [hzd, setHzd] = React.useState('');
    const [climprj, setClimprj] = React.useState('');
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
  
    const handleStateChange = (event) => {
      setState(event.target.value);
      changeRegion('State',event.target.value+", "+countryMap[reg]);
    };
    const handleChange = (event) => {
      setReg(event.target.value);
      setState("");
      if(event.target.value==='SA'){
        changeRegion('Region',countryMap[event.target.value]);
      }
      else{
        changeRegion('Country',countryMap[event.target.value]);
      }
    };
    const handlecropchange = (event) => {
        changeCrop(event.target.value);
        setCommodity(event.target.value);
        setClimprj('');
        setLayer('');
        setHzd('');
        changeRisk('');
        setSubChoice('');
        setAdpopt('');
    }

    const handleScenariochange = (event) => {
        changeScenario(event.target.value);
        setFutureModel(event.target.value);
    }

    const handleRiskchange = (event) => {
        changeRisk(event.target.value);
        setHzd(event.target.value);
    }

    const handleProjChange = (event) => {
      if(climprj!==''){
        setLayer('');
        setHzd('');
        changeRisk('');
        setSubChoice('');
        setAdpopt('');
      }
      setClimprj(event.target.value);
    }
    
    const handleLayerChange = (e) => {
      if(layer!==''){
        setHzd('');
        changeRisk('');
        setSubChoice('');
        setAdpopt('');
      }
      setLayer(e.target.value);
    }

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
        height: 6,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 16,
          width: 16,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
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
    <Grid container spacing={2} sx={{marginTop:'90px',padding: '1rem', paddingTop:'0rem'}} columns={15}>
      {/* Left-side Options Panel */}
      <Grid item xs={3}>
      <Box sx={{width:'100%',height:'22px'}}><Typography align="center" sx={{fontSize:'14px',fontWeight:'bold'}}>Selection Tab</Typography></Box>
        <Paper elevation={2} sx={{padding: '1rem'}}>
          {/* Dropdown Options */}
          <FormControl fullWidth sx={{ marginBottom: '1.2rem', marginTop: '0.5rem'}} size='small'>
            <InputLabel id="Region" sx={{fontSize:'14px'}}>Region</InputLabel>
            <Select
                labelId="Region"
                id="region-select-id"
                label="Region"
                value={reg}
                onChange={handleChange}
                sx={{fontSize:'14px'}}
            >
                        <MenuItem value='SA' sx={{fontSize:'14px',height:'25px'}}>South Asia</MenuItem>
                        <MenuItem value='AF' sx={{fontSize:'14px',height:'25px'}}>Afghanistan</MenuItem>
                        <MenuItem value='BD' sx={{fontSize:'14px',height:'25px'}}>Bangladesh</MenuItem>
                        <MenuItem value='BT' sx={{fontSize:'14px',height:'25px'}}>Bhutan</MenuItem>
                        <MenuItem value='IN' sx={{fontSize:'14px',height:'25px'}}>India</MenuItem>
                        <MenuItem value='NP' sx={{fontSize:'14px',height:'25px'}}>Nepal</MenuItem>
                        <MenuItem value='PK' sx={{fontSize:'14px',height:'25px'}}>Pakistan</MenuItem>
                        <MenuItem value='LK' sx={{fontSize:'14px',height:'25px'}}>Sri Lanka</MenuItem>
                        <MenuItem value='MV' sx={{fontSize:'14px',height:'25px'}}>Maldives</MenuItem>
            </Select>
            </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1.2rem' }} size='small'>
        <InputLabel id="state-label" sx={{fontSize:'14px'}}>State/Province</InputLabel>
        { reg==='SA' && <Select
          labelId="state-label"
          id="state-select-id"
          value={state}
          label="State/Province"
          onChange={handleStateChange}
          sx={{fontSize:'14px'}}
          MenuProps={{
            disableScrollLock: true,
          }}>
         </Select> }
         { reg!=='SA' && <Select
          labelId="state-label"
          id="state-select-id"
          value={state}
          label="State/Province"
          onChange={handleStateChange}
          sx={{fontSize:'14px'}}
          MenuProps={{
            disableScrollLock: true,
          }}>
         {LocationData[reg].map((Item,index)=>(
          <MenuItem value={Item} sx={{fontSize:'14px',height:'25px'}}>{Item}</MenuItem>
         ))}
          </Select> }
       
      </FormControl>

          <FormControl fullWidth sx={{ marginBottom: '1.2rem'}} size='small'>
            <InputLabel id="Commodity" sx={{fontSize:'14px'}}>Commodity</InputLabel>
            <Select labelId="Commodity" id="Commodity-select-id" label="Commodity"
            sx={{fontSize:'14px'}}
            value={commodity} onChange={handlecropchange}>
              <MenuItem value="rice" sx={{fontSize:'14px',height:'25px'}}>Rice</MenuItem>
              <MenuItem value="wheat" sx={{fontSize:'14px',height:'25px'}}>Wheat</MenuItem>
              <MenuItem value="maize" sx={{fontSize:'14px',height:'25px'}}>Maize</MenuItem>
              <MenuItem value="sorghum" sx={{fontSize:'14px',height:'25px'}}>Sorghum</MenuItem>
              <MenuItem value="cattle" sx={{fontSize:'14px',height:'25px'}}>Cattle</MenuItem>
              <MenuItem value="buffalo" sx={{fontSize:'14px',height:'25px'}}>Buffalo</MenuItem>
              <MenuItem value="goat" sx={{fontSize:'14px',height:'25px'}}>Goat</MenuItem>
              <MenuItem value="sheep" sx={{fontSize:'14px',height:'25px'}}>Sheep</MenuItem>
              <MenuItem value="pig" sx={{fontSize:'14px',height:'25px'}}>Pig</MenuItem>
              <MenuItem value="poultry" sx={{fontSize:'14px',height:'25px'}}>Poultry</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: '1.2rem'}} size='small'>
            <InputLabel id="Future Scenario" sx={{fontSize:'14px'}}>Climate Projection Data</InputLabel>
            <Select labelId="Future Scenario" id="Scenario-select-id" label="Climate Projection Data" 
            value={climprj} 
            sx={{fontSize:'14px'}}
            onChange={handleProjChange}>
              <MenuItem value="CHC" sx={{fontSize:'14px',height:'25px'}}>CHC</MenuItem>
              <MenuItem value="ISIMIP" sx={{fontSize:'14px',height:'25px'}}>ISIMIP</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: '1.2rem'}} size='small'>
            <InputLabel id="Scenario" sx={{fontSize:'14px'}}>Scenario</InputLabel>
            <Select labelId="Scenario" id="future-model-select-id" label="Scenario"
             sx={{fontSize:'14px'}}
             value={futureModel} onChange={handleScenariochange}>
                <MenuItem value="ssp245" sx={{fontSize:'14px',height:'25px'}}>SSP2.45</MenuItem>
                <MenuItem value="ssp585" sx={{fontSize:'14px',height:'25px'}}>SSP5.85</MenuItem>
            </Select>
            </FormControl>


            <FormControl fullWidth sx={{ marginBottom: '1.2rem' }} size='small'>
                <InputLabel id="Layer" sx={{fontSize:'14px'}}>Layer</InputLabel>
                <Select
                    labelId="Layer"
                    id="layer-select-id"
                    label="Layer"
                    value={layer}
                    sx={{fontSize:'14px'}}
                    onChange={handleLayerChange}
                >
                    <MenuItem value="Hazard" sx={{fontSize:'14px',height:'25px'}}>Climatic Hazard</MenuItem>
                    <MenuItem value="Technical Suitability" sx={{fontSize:'14px',height:'25px'}}>Technical Suitability</MenuItem>
                </Select>
                </FormControl>

            {layer==='Hazard'&&
                <FormControl fullWidth sx={{ marginBottom: '1.2rem' }} size='small'>
                <InputLabel id="Hazard" sx={{fontSize:'14px'}}>Climatic Hazard</InputLabel>
                <Select
                    labelId="Hazard"
                    id="sub-choice-select-id"
                    label="Climatic Hazard"
                    value={hzd}
                    sx={{fontSize:'14px'}}
                    onChange={handleRiskchange}
                >
                    <MenuItem value="THI" sx={{fontSize:'14px',height:'25px'}}>Temperature-humidity Index</MenuItem>
                    <MenuItem value="CD" sx={{fontSize:'14px',height:'25px'}}>Cold days</MenuItem>
                    <MenuItem value="ERD" sx={{fontSize:'14px',height:'25px'}}>Extreme rainfall days</MenuItem>
                    <MenuItem value="RAINDEF" sx={{fontSize:'14px',height:'25px'}}>Rainfall deficit</MenuItem>
                    <MenuItem value="FLOOD" sx={{fontSize:'14px',height:'25px'}}>Flood</MenuItem>
                    <MenuItem value="CYCL" sx={{fontSize:'14px',height:'25px'}}>Cyclone</MenuItem>
                </Select>
                </FormControl>}
            {layer==='Technical Suitability' &&
                <FormControl fullWidth sx={{ marginBottom: '1.2rem' }} size='small'>
                <InputLabel id="Adaptation Category" sx={{fontSize:'14px'}}>Adaptation Category</InputLabel>
                {(activeCrop==='Sheep'||activeCrop==='Goat'||activeCrop==='Poultry') && <Select
                    labelId="Adaptation Category"
                    id="sub-choice-adapt-id"
                    label="Adaptation Category"
                    value={subChoice}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setSubChoice(e.target.value)}
                >
                 {["Shelter Management", "Feeding Management", "Healthcare Management", "Climate resilient breeds"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    } 
                {(activeCrop==='Cattle'||activeCrop==='Buffalo'||activeCrop==='Pig') &&
                <Select
                labelId="Adaptation Category"
                id="sub-choice-adapt-id2"
                label="Adaptation Category"
                value={subChoice}
                sx={{fontSize:'14px'}}
                onChange={(e) => setSubChoice(e.target.value)}
                > 
                {["Shelter Management", "Feeding Management", "Healthcare Management", "Reproductive Management", "Climate resilient breeds"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                </Select>
                }
                </FormControl>}
                
                {subChoice==='Shelter Management' &&
                <FormControl fullWidth sx={{ marginBottom: '0.5rem' }} size='small'>
                <InputLabel id="Adaptation Option1" sx={{fontSize:'14px'}}>Adaptation Option</InputLabel>
                {/* For different category there is a different list of Adaptation Option*/}
                {activeCrop==='Cattle' && <Select
                    labelId="Adaptation Option1"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Micro climate modification-Shelter","Modification of shelter","Planting of trees","Bathing","Mechanical cooling"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    } 
                {(activeCrop==='Pig'||activeCrop==='Buffalo') && <Select
                    labelId="Adaptation Option1"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Micro climate modification-Shelter","Modification of shelter","Planting of trees","Wallowing","Mechanical cooling"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    }
                {(activeCrop==='Poultry') && <Select
                    labelId="Adaptation Option1"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Micro climate modification-Shelter","Modification of shelter","Planting of trees","Heating management","Mechanical cooling"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    }
                {(activeCrop==='Sheep'||activeCrop=='Goat') &&
                    <Select
                    labelId="Adaptation Option1"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                    > 
                    {["Micro climate modification-Shelter","Modification of shelter","Planting of trees"].map((label) => (
                            <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                        ))} 
                    </Select>
                }
                </FormControl>}
                {subChoice==='Feeding Management' &&
                <FormControl fullWidth sx={{ marginBottom: '0.5rem' }} size='small'>
                <InputLabel id="Adaptation Option2" sx={{fontSize:'14px'}}>Adaptation Option</InputLabel>
                {/* For different category there is a different list of Adaptation Option*/}
                {activeCrop==='Pig' && <Select
                    labelId="Adaptation Option2"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Balanced concentrate with buffer","Mineral mixture supplementation","Feed additives, antioxidants, vitamins and probiotics",
                  "Modification in feeding pattern, schedule","Ad lib water"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    } 
                {(activeCrop==='Cattle'||activeCrop==='Buffalo') && <Select
                    labelId="Adaptation Option2"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Balanced concentrate with buffer","Mineral mixture supplementation","By pass protein and fats","Feed additives, antioxidants, vitamins and probiotics",
                  "Modification in feeding pattern, schedule, grazing","Inclusion of green fodder","Fodder conservation","Ad lib water"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    }
                {(activeCrop==='Poultry') && <Select
                    labelId="Adaptation Option2"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Fat supplementation",'Protein and amino acid supplementation',"Ad lib water","Feed additives, electrolyte, antioxidants, vitamins and probiotics",
                  "Modification in feeding pattern, schedule and space"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    }
                {(activeCrop==='Sheep'||activeCrop==='Goat') &&
                    <Select
                    labelId="Adaptation Option2"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                    > 
                    {["Balanced concentrate","Mineral mixture supplementation","Feed additives, antioxidants, vitamins and probiotics","Modification in feeding pattern, schedule, grazing",
                      "Grassland and Silvi-pasture management","Fodder conservation","Ad lib water"].map((label) => (
                            <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                        ))} 
                    </Select>
                }
                </FormControl>}
                {subChoice==='Healthcare Management' &&
                <FormControl fullWidth sx={{ marginBottom: '0.5rem' }} size='small'>
                <InputLabel id="Adaptation Option3" sx={{fontSize:'14px'}}>Adaptation Option</InputLabel>
                {/* For different category there is a different list of Adaptation Option*/}
                {activeCrop==='Poultry' && <Select
                    labelId="Adaptation Option3"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Parasite control","Thinning of flock","Separation of multi-aged flock","Vaccination"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    } 
                {(activeCrop==='Cattle'||activeCrop==='Buffalo'||activeCrop==='Sheep'||activeCrop==='Goat'||activeCrop==='Pig') && <Select
                    labelId="Adaptation Option3"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Deworming against endoparaites","Control of ectoparasites","Vaccination"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    }
                </FormControl>}

                {subChoice==='Reproductive Management' &&
                <FormControl fullWidth sx={{ marginBottom: '0.5rem' }} size='small'>
                <InputLabel id="Adaptation Option4" sx={{fontSize:'14px'}}>Adaptation Option</InputLabel>
                {/* For different category there is a different list of Adaptation Option*/}
                {(activeCrop==='Pig') && <Select
                    labelId="Adaptation Option4"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Use of ART tools"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    } 
                {(activeCrop==='Buffalo'||activeCrop==='Cattle') && <Select
                    labelId="Adaptation Option4"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Estrous confirmation and synchronisation"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    }
                </FormControl>}

                {subChoice==='Climate resilient breeds' &&
                <FormControl fullWidth sx={{ marginBottom: '0.5rem' }} size='small'>
                <InputLabel id="Adaptation Option5" sx={{fontSize:'14px'}}>Adaptation Option</InputLabel>
                {/* For different category there is a different list of Adaptation Option*/}
                {(activeCrop==='Poultry'||activeCrop==='Cattle') && <Select
                    labelId="Adaptation Option5"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Weather forecasts/THI advisory services","Livestock insurance","Diversification"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    } 
                {(activeCrop==='Buffalo'||activeCrop==='Sheep'||activeCrop==='Goat'||activeCrop==='Pig') && <Select
                    labelId="Adaptation Option5"
                    id="sub-choice-adapt-opt-id"
                    label="Adaptation Option"
                    value={adpopt}
                    sx={{fontSize:'14px'}}
                    onChange={(e) => setAdpopt(e.target.value)}
                >
                 {["Weather forecasts/THI advisory services","Livestock insurance"].map((label) => (
                        <MenuItem value={label} sx={{fontSize:'14px',height:'25px'}}>{label}</MenuItem>
                    ))} 
                    </Select>
                    }
                </FormControl>}
        </Paper>
      </Grid>

      {/* Maps Section */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {['Baseline', 'SSP2-4.5'].map((label, index) => (
            <Grid item xs={4} key={index}>
              <Box sx={{width:'100%',bgcolor:'#C1E1C1',height:'22px'}}><Typography align="center" sx={{fontSize:'14px',fontWeight:'bold'}}>{label}</Typography></Box>
              <Paper elevation={1} sx={{ width: '100%', height: 'calc(100vh - 150px)' }}>
                {label==='Baseline'&&
                <Map_Option activeCrop={activeCrop} activeScenario='baseline' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}></Map_Option>}
                {label==='SSP2-4.5'&&
                <Map_Option activeCrop={activeCrop} activeScenario='ssp245' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}></Map_Option>}
              </Paper>
            </Grid>
          ))}

        <Grid item xs={4} key='3'>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{border:'1px solid #eee'}}>
                <Box sx={{width:'80%',bgcolor:'#E4E0E1',height:'22px',marginTop:'5px'}}>
                    <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold'}}>Year: {currentImage.year}</Typography>
                </Box> 
                <Box display="flex" flexDirection="row" sx={{width:'100%'}}  alignItems="center" justifyContent="center" gap="15px">
                    <IconButton onClick={handlePlayPause} sx={{color: color_for_button,border:'1px solid #eee',borderRadius:'8px',padding:'6px'}}>
                        {isPlaying ? <PauseIcon sx={{fontSize:'28px'}} /> : <PlayArrowIcon sx={{fontSize:'28px'}} />}
                    </IconButton>
                    <Box sx={{ width: '60%', mt: 1, mb: 1 }}>
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
                    sx={{ width: '80%', maxWidth: 420, height: 'auto', mb: 2 }}
                />  
            </Box>
        </Grid>
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
};