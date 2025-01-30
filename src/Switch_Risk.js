import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default function SwitchRisk({
    changeRisk,
    activeCrop,
    activeScenario
}){
  const switchPro = ['District Level','Downscaled Risk'];
  const switchProID = ['dl','dr'];
  const switchProID2 = ['dl2','dr2'];

  const switchChild = ['Measured Risk','Risk Index'];
  const switchChildID = ['pr','ipcc'];

  const switchIPCC = ['Risk','Hazard','Exposure','Vulnerability',];
  const switchIPCCID = ['risk','hazard','exposure','vulner'];

  const switchRisk = ['Risk Index'];
  const switchRiskID = ['riskindex'];

  const fullList = ['rice','wheat','maize','sorghum','fmillet','pmillet',
  'safflower','sunflower','rapeseed','sesame','groundnut',
  'soyabean','chickpea','ppea','bgram','ggram','lentil',
  'cotton','jute','rubber','sugarcane','tea','coconut',
  'cattle','buffalo','goat','sheep','pig','poultry',
  'freshwater','bracklish','marine','coldwater',
  'potato','onion','tomato','chilli','mango','banana'];

  /* const switchHazards = ['Hazard Index','Flood','Unseasonal Rainfall','Extreme Rainfall','Drought (SPI frequency)','Heat Stress','Cold Stress','Delayed Onset','Early Cessation',
    'Long Dry Spells','Salinity Intrusion','High Humidity','High Windspeed'];
  const switchHazardsID = ['hindex','flood','rain','ext-rain','drought','heat','cold','onset','cessation','dryspell','salinity','humidity','wind'];
 */
  const switchHazards = ['Hazard Index','Delayed Monsoon','Temp Lower Limits','Temp Upper Limits','Cold Lower Limit',
  'Rainfall Excess','High RH','Dry Spell','Drought Moderate','Drought Severe',
    'Lodging','Frost','Spikelet Sterility - Cold','Spikelet Sterility - Heat','Spikelet Sterility - Rainfall'];
  const switchHazardsID = ['hindex','DEMON','TEMLO','TEMUP','COLLO','RAINF','HIRHI','DRYSP','DROMO','DROSE',
  'LODGE','FROST','SPICO','SPIHE','SPIRA'];


  const switchVulner = ['Hazard Index','Groundwater Level','Irrigation','Wealth Index','Fertilizer','Agriculture Income','Literacy','Gender Inclusiveness','Road Density','Slope',
  'Water Holding Capacity','Soil Organic Carbon'];
  const switchVulnerID = ['hindex2','groundwater','irrigation','wealth','fertilizer','Agriculture Income','literacy','gender','road','slope','waterhold','carbon'];

  const switchExposure = ['Exposure Index','Number of Farmers','Cropped Area'];
  const switchExposureID = ['expoindex','rural','c-area'];

  const switchCombId = ['dl','dr','riskindex','hindex','DEMON','TEMLO','TEMUP','COLLO','RAINF','HIRHI','DRYSP','DROMO','DROSE',
  'LODGE','FROST','SPICO','SPIHE','SPIRA','hindex2','groundwater','irrigation','wealth','fertilizer','Agriculture Income','literacy','gender',
  'road','slope','waterhold','carbon','expoindex','rural','c-area',
  'dl2','dr2','riskindex2','hindex2','DEMON2','TEMLO2','TEMUP2','COLLO2','RAINF2','HIRHI2','DRYSP2','DROMO2','DROSE2',
  'LODGE2','FROST2','SPICO2','SPIHE2','SPIRA2',
  'hindex22','groundwater2','irrigation2','wealth2','fertilizer2','income2','literacy2','gender2','road2','slope2','waterhold2',
  'carbon2','expoindex2','rural2','c-area2'];

  function PopulateOptions() {
    const DisableList = {};
    fullList.forEach((sname) => {
        if(activeCrop[sname] && sname === 'rice'){
          switchCombId.map((option,index) => {
          DisableList[option] = false;
          const list = [8,13,14,15,18];
          if(list.includes(index+1)){
            DisableList[option] = true;
          }
        });
        }
    });
    return DisableList;
  }

  const [DisableList, setDisable] = React.useState(
    PopulateOptions
  );

  function createInitialP2() {
    const initialTodos = {};
    switchChildID.forEach((sname) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
    };
  
    const [P2a, setP2a] = React.useState(
      createInitialP2
    );
  
    const handleChange2a = (name) => (event) => {
      setP2a({ ...P2a, [name]: event.target.checked });
    };

    const [P2b, setP2b] = React.useState(
        createInitialP2
        );
      
    const handleChange2b = (name) => (event) => {
        setP2b({ ...P2b, [name]: event.target.checked });
        };

    function createInitialP3() {
        const initialTodos = {};
        switchCombId.forEach((sname) => {
            initialTodos[sname] = false;
        });
        return initialTodos;
    };

    const [P3, setP3] = React.useState(
        createInitialP3
    );

    const handleChangeP3 = (name) => (event) => {
        const newst = {...P3};
        let idxx = -1;
        switchCombId.map((sname,i) => {
            newst[sname] = sname===name;
            if(sname===name){
                idxx = i;
            }
        });
        setP3(newst);
        changeRisk(name,idxx);
      };


    function createInitialP3ipcc() {
        const initialTodos = {};
        switchIPCCID.forEach((sname) => {
            initialTodos[sname] = false;
        });
        return initialTodos;
    };

    const [P3aipcc, setP3aipcc] = React.useState(
        createInitialP3ipcc
    );

    const handleChangeP3aipcc = (name) => (event) => {
        setP3aipcc({ ...P3aipcc, [name]: event.target.checked });
      };

    const [P3bipcc, setP3bipcc] = React.useState(
        createInitialP3ipcc
    );

    const handleChangeP3bipcc = (name) => (event) => {
        setP3bipcc({ ...P3bipcc, [name]: event.target.checked });
      };

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 32+padd,
    height: 14+padd,
    padding: padd/2,
    display: 'flex',
    
    '& .MuiSwitch-switchBase': {
      padding: 2+padd/2,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          // 4ba046 and 4aba03 and dea426 and b9f04d
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#4ba046',
        },
      },
      
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 10,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.10)',
      boxSizing: 'border-box',
    },
    '&:hover': { 
        backgroundColor: '#ffe89c',
        opacity:1,
        borderRadius: 12,
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.7)',
          },
     },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#E8E8E8', // Color for the label text when disabled
    },
  }));

  return (
   <div>
    <Box sx={{display:'flex',flexDirection:'column'}}>
        <FormLabel sx={{paddingBottom:1,textAlign:'left'}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:1,paddingLeft:2}}>Select Climatic Risk</Typography>
        </FormLabel>
        {activeScenario['baseline'] && (
        <FormControl component="" variant="standard" sx={{paddingBottom:1, paddingLeft:3}}>
            {switchChild.map((sname1,index1) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={P2a[switchChildID[index1]]} 
                onChange={handleChange2a(switchChildID[index1])} name={switchChildID[index1]} 
                />
              }
              disabled={false}
              key={switchChildID[index1]}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname1}</Typography>}
              />
              {P2a[switchChildID[index1]] && switchChildID[index1] === 'pr' && (
                <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                    {switchPro.map((sn1,idx) => (
                        <FormGroup>
                            <CustomFormControlLabel
                            control = {
                                <AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[switchProID[idx]]}
                                onChange={handleChangeP3(switchProID[idx])} name={switchProID[idx]}
                                />
                                }
                                disabled={false}
                                key={switchProID[idx]}
                                label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1}</Typography>}
                                />
                        </FormGroup>
                    ))}
                </FormControl>)}
                {P2a[switchChildID[index1]] && switchChildID[index1] === 'ipcc' && (
                <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                    {switchIPCC.map((sn1,idx) => (
                        <FormGroup>
                            <CustomFormControlLabel
                            control = {
                                <AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3aipcc[switchIPCCID[idx]]}
                                onChange={handleChangeP3aipcc(switchIPCCID[idx])} name={switchIPCCID[idx]}
                                />
                                }
                                disabled={false}
                                key={switchIPCCID[idx]}
                                label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1}</Typography>}
                                />
                                {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='risk' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchRisk.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchRiskID[idxr])]}
                                                    onChange={handleChangeP3((switchRiskID[idxr]))} name={(switchRiskID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchRiskID[idxr])}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                                    {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='hazard' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchHazards.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchHazardsID[idxr])]}
                                                    onChange={handleChangeP3((switchHazardsID[idxr]))} name={(switchHazardsID[idxr])}
                                                    />}
                                                    disabled={DisableList[switchHazardsID[idxr]]}
                                                    key={(switchHazardsID[idxr])}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                                    {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='vulner' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchVulner.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchVulnerID[idxr])]}
                                                    onChange={handleChangeP3((switchVulnerID[idxr]))} name={(switchVulnerID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchVulnerID[idxr])}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                                    {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='exposure' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchExposure.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchExposureID[idxr])]}
                                                    onChange={handleChangeP3((switchExposureID[idxr]))} name={(switchExposureID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchExposureID[idxr])}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                        </FormGroup>
                    ))}
                </FormControl>)}
           </FormGroup>
            ))}
          </FormControl>)}
        
          {activeScenario['ssp245'] && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:3}}>
            {switchChild.map((sname1,index1) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={P2b[switchChildID[index1]]} 
                onChange={handleChange2b(switchChildID[index1])} name={switchChildID[index1]} 
                />
              }
              disabled={false}
              key={switchChildID[index1]}
              label={<Typography variant="body2" sx={{paddingLeft:1}}>{sname1}</Typography>}
              />
              {P2b[switchChildID[index1]] && switchChildID[index1] === 'pr' && (
                <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                    {switchPro.map((sn1,idx) => (
                        <FormGroup>
                            <CustomFormControlLabel
                            control = {
                                <AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[switchProID2[idx]]}
                                onChange={handleChangeP3(switchProID2[idx])} name={switchProID2[idx]}
                                />
                                }
                                disabled={false}
                                key={switchProID2[idx]}
                                label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1}</Typography>}
                                />
                        </FormGroup>
                    ))}
                </FormControl>)}
                {P2b[switchChildID[index1]] && switchChildID[index1] === 'ipcc' && (
                <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                    {switchIPCC.map((sn1,idx) => (
                        <FormGroup>
                            <CustomFormControlLabel
                            control = {
                                <AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3bipcc[switchIPCCID[idx]]}
                                onChange={handleChangeP3bipcc(switchIPCCID[idx])} name={switchIPCCID[idx]}
                                />
                                }
                                disabled={false}
                                key={switchIPCCID[idx]}
                                label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1}</Typography>}
                                />
                                {P3bipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='risk' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchRisk.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchRiskID[idxr].concat('2'))]}
                                                    onChange={handleChangeP3((switchRiskID[idxr].concat('2')))} name={(switchRiskID[idxr].concat('2'))}
                                                    />}
                                                    disabled={false}
                                                    key={(switchRiskID[idxr].concat('2'))}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                                    {P3bipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='hazard' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchHazards.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchHazardsID[idxr].concat('2'))]}
                                                    onChange={handleChangeP3((switchHazardsID[idxr].concat('2')))} name={(switchHazardsID[idxr].concat('2'))}
                                                    />}
                                                    disabled={false}
                                                    key={(switchHazardsID[idxr].concat('2'))}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                                    {P3bipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='vulner' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchVulner.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchVulnerID[idxr].concat('2'))]}
                                                    onChange={handleChangeP3((switchVulnerID[idxr].concat('2')))} name={(switchVulnerID[idxr].concat('2'))}
                                                    />}
                                                    disabled={false}
                                                    key={(switchVulnerID[idxr].concat('2'))}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                                    {P3bipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='exposure' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                switchExposure.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchExposureID[idxr].concat('2'))]}
                                                    onChange={handleChangeP3((switchExposureID[idxr].concat('2')))} name={(switchExposureID[idxr].concat('2'))}
                                                    />}
                                                    disabled={false}
                                                    key={(switchExposureID[idxr].concat('2'))}
                                                    label={<Typography variant='body2'  sx={{paddingLeft:1}}>{sn1r}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                        </FormGroup>
                    ))}
                </FormControl>)}
           </FormGroup>
            ))}
          </FormControl>)}
          </Box>
          </div>
  );
};