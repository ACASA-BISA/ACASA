import React from 'react';
import { Grid, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Map_Option from './Comp_Map';  // Assuming this is your map component
import './font.css';
import './extra.css';
import './font2.css';
import Legend_Small from './Legend_Small';

const Comm = ['Rice','Wheat','Maize','Barley','Sorghum','Mustard','Groundnut',
  'Soybean','Chickpea','Pigeonpea','Cotton','Jute','Sugarcane','Tea','Potato',
  'Cattle','Buffalo','Goat','Sheep','Pig','Poultry'];

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
  area_dict4
}) {
    let scn = 'baseline';
    if(activeScenario['ssp245']){
        scn ='ssp245';
    }
    else if(activeScenario['ssp585']){
        scn ='ssp585';
    }
    const [commodity, setCommodity] = React.useState(activeCrop.toLowerCase());
    const [futureModel, setFutureModel] = React.useState('ssp245');
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

    const boxref1 = React.useRef(null);
    const boxref2 = React.useRef(null);
    const boxref3 = React.useRef(null);

    const [boxstart1, setboxstart1] = React.useState(0);
    const [boxstart2, setboxstart2] = React.useState(0);
    const [boxstart3, setboxstart3] = React.useState(0);

    const [boxwidth1, setboxwidth1] = React.useState(0);
    const [boxwidth2, setboxwidth2] = React.useState(0);
    const [boxwidth3, setboxwidth3] = React.useState(0);

    React.useEffect(() =>{
      if(boxref1.current){
        setboxstart1(boxref1.current.offsetLeft);
        setboxwidth1(boxref1.current.offsetWidth);
      };
      if(boxref2.current){
        setboxstart2(boxref2.current.offsetLeft);
        setboxwidth2(boxref2.current.offsetWidth);
      };
      if(boxref3.current){
        setboxstart3(boxref3.current.offsetLeft);
        setboxwidth3(boxref3.current.offsetWidth);
      };
    });
    
  return (
    <div className='viewer-container' style={{overflow:'hidden'}}>
    <Grid container spacing={2} sx={{marginTop:'80px',padding: '1rem', paddingTop:'0rem'}} columns={15}>
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
          {['Baseline', '2050s', '2080s'].map((label, index) => (
            <Grid item xs={4} key={index}>
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
                    <MenuItem value="ssp245" sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}>SSP2-4.5</MenuItem>
                    <MenuItem value="ssp585" sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}>SSP5-8.5</MenuItem>
                </Select>
                </FormControl>}
              </Box>
              
              <Paper elevation={1} sx={{ width: '100%', height: 'calc(100vh - 150px)' }}>
                {label==='Baseline'&&
                <div ref={boxref1}>
                  <Map_Option activeCrop={activeCrop} activeScenario='baseline' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}></Map_Option>
                  <Legend_Small location={activeRegion} commodity={activeCrop} adaption={activeOpt} RiskName={CurrRisk}
                      scenario='baseline' ImpactName={activeImpact} area_data3={area_dict3} area_data4={area_dict4}
                      open_yes={true} bottom_position={36} left_position={boxstart1+5} box_width={boxwidth1-10}></Legend_Small>
                </div>}
                {label==='2050s'&&
                <div ref={boxref2}>
                  <Map_Option activeCrop={activeCrop} activeScenario='ssp245' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}></Map_Option>
                  <Legend_Small location={activeRegion} commodity={activeCrop} adaption={activeOpt} RiskName={CurrRisk}
                      scenario='ssp245' ImpactName={activeImpact} area_data3={area_dict3} area_data4={area_dict4}
                      open_yes={true} bottom_position={36} left_position={boxstart2+5} box_width={boxwidth2-10}></Legend_Small>
                </div>}
                {label==='2080s'&&
                <div ref={boxref3}>
                  <Map_Option activeCrop={activeCrop} activeScenario='ssp585' focus={focus} activeRegion={activeRegion} activeOpt={activeOpt} CurrRisk={CurrRisk} activeImpact={activeImpact}></Map_Option>
                  <Legend_Small location={activeRegion} commodity={activeCrop} adaption={activeOpt} RiskName={CurrRisk}
                      scenario='ssp245' ImpactName={activeImpact} area_data3={area_dict3} area_data4={area_dict4}
                      open_yes={true} bottom_position={36} left_position={boxstart3+5} box_width={boxwidth3-10}></Legend_Small>
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
