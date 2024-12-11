import React from 'react';
import { Grid, Paper, Typography, Box, MenuItem, Select, FormControl, Popper } from '@mui/material';
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
    
    const [futureModel, setFutureModel] = React.useState('ssp245');
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
                    <MenuItem value="ssp245" sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}>SSP2-4.5</MenuItem>
                    <MenuItem value="ssp585" sx={{fontSize:'14px',height:'20px',fontFamily:'Karla'}}>SSP5-8.5</MenuItem>
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
