import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export default function SwitchRisk2({
    changeRisk,
    activeCrop,
    activeScenario,
    CurrRisk
}){
  const switchPro = ['District Level','Downscaled Risk'];
  const switchProID = ['dl','dr'];
  const switchProID2 = ['dl2','dr2'];

  const switchChild = ['Measured Risk','Estimated Risk'];
  const switchChildID = ['pr','ipcc'];

  const switchIPCC = ['Base climate','Hazard','Exposure','Vulnerability',"Risk indices"];
  const switchIPCCID = ['basic','hazard','exposure','vulner','risk'];

  const switchRisk = ['Risk Index','Hazard Index','Vulnerability Index','Exposure Index'];
  const switchRiskID = ['riskindex','HINDEX','vulne','expoindex'];
  
  const switchBasic = ['Seasonal Rainfall','Maximum Temperature','Minimum Temperature'];
  const switchBasicID = ['seasonalrain','maxtemp','mintemp'];

  const MasterHazard = ['Hazard Index','Low temperature induced spikelet sterility',"Untimely Rainfall",'Low temperature induced pollen sterility',
    'High temperature induced pollen sterility','Heat Stress','Heat Stress','High temperature induced spikelet sterility','Cold Stress',
    'Low temperature induced tuberization failure','Terminal Heat','Days of Frost','Excess Rainfall and Waterlogging','Delayed Monsoon','Rainfall Deficit Index','Dry Spell',
    'Flood','Lodging','Biotic',"Excess Rainfall","Temperature-Humidity Index","Hot days","Cold days","Extreme Rainfall days",
    "Rainfall Deficit","Cyclone",'Cold stress in reproductive stage','Heat stress in reproductive stage',
    'Heat stress during boll formation','Cold stress during flowering','High tempearture during flowering','Biotic Stress'];

  const MasterHazardID = ['HINDEX','COLD STRESS2',"ERWL2",'LOW POLLEN','HIGH POLLEN','HEAT STRESS','HEAT STRESS1','HEAT STRESS2',
    'COLD STRESS','PCOLD','TERMINAL HEAT','FROST','ERWL','DELMON','SPI','DSN','FLOOD','LODGE','BIOTIC',"ER","THI",'HD','CD','ERD',
    'RAINDEF','CYCL','CSTRESS REPRO','HIGH REPRO','HSTRESS BOLL','COLD FLOWER','HIGH FLOWER','BIOTIC2'];

  const fullList = ['rice','wheat','maize','barley','sorghum','fmillet','pmillet',
  'safflower','sunflower','rapeseed','sesame','groundnut',
  'soyabean','chickpea','ppea','bgram','ggram','lentil',
  'cotton','jute','rubber','sugarcane','tea','coconut',
  'cattle','buffalo','goat','sheep','pig','poultry',
  'freshwater','bracklish','marine','coldwater',
  'potato','onion','tomato','chilli','mango','banana'];

  const Common = ['Rice','Wheat','Maize','Barley','Sorghum','Finger Millet','Pearl Millet',
  'Safflower','Sunflower','Rapeseed/Mustard','Sesame','Groundnut',
  'Soybean','Chickpea','Pigeonpea','Black Gram','Green Gram','Lentil',
  'Cotton','Jute','Rubber','Sugarcane','Tea','Coconut',
  'Cattle','Buffalo','Goat','Sheep','Pig','Poultry',
  'Freshwater','Bracklish','Marine','Cold water',
  'Potato','Onion','Tomato','Chillies','Mango','Banana'];

  let cropname = "Rice";
  function CropRisk() {
    let HazardList = [];
    let sname = 'rice';
    fullList.forEach((comm,id) => {
        if(activeCrop[comm]===true){
            sname = comm;
            cropname = Common[id].toLowerCase();
            switchIPCC[1] += " of " + cropname;
            switchIPCC[2] += " of " + cropname;
            switchIPCC[3] += " of " + cropname;
        }
    })
        if(sname==='rice'){
            HazardList = ['HEAT STRESS1','HEAT STRESS2','COLD STRESS2','DELMON','SPI','DSN','FLOOD'];
        }
        else if(sname==='wheat'){
            HazardList = ['HIGH POLLEN','TERMINAL HEAT','FROST','ERWL2','SPI','LODGE'];
        }
        else if(sname==='barley'){
            HazardList = ['HEAT STRESS','TERMINAL HEAT','FROST','ERWL2','SPI','LODGE'];
        }
        else if(sname==='maize'){
            HazardList = ['HEAT STRESS1','HIGH POLLEN','COLD STRESS','ERWL','DELMON','SPI','DSN','FLOOD'];
        }
        else if(sname==='potato'){
            HazardList = ['COLD STRESS','PCOLD','ERWL2','SPI','FROST','BIOTIC'];
        }
        else if(sname==='sorghum'||sname==='pmillet'||sname==='fmillet'){
            HazardList = ['HEAT STRESS','ERWL','DELMON','SPI','DSN','FLOOD'];
        }
        else if(sname==='soyabean'){
            HazardList = ['HEAT STRESS','COLD STRESS','ER','DELMON','SPI','DSN','FLOOD'];
        }
        else if(sname==='cotton'){
            HazardList = ['CSTRESS REPRO','HIGH REPRO','HSTRESS BOLL','ER','DELMON','SPI','DSN','FLOOD'];
        }
        else if(sname==='rapeseed'){
            HazardList = ['HEAT STRESS','ERWL2','SPI'];
        }
        else if(sname==='chickpea'){
            HazardList = ['COLD FLOWER','HIGH FLOWER','FROST','ER','SPI'];
        }
        else if(sname==='groundnut'){
            HazardList = ['HEAT STRESS','LOW POLLEN','HIGH POLLEN','ERWL','DELMON','SPI','DSN','FLOOD'];
        }
        else if(sname==='ppea'){
            HazardList = ['ER','DELMON','SPI','DSN','FLOOD'];
        }
        else if(sname==='jute'){
            HazardList = ['HEAT STRESS','COLD STRESS','ERWL','SPI','DSN','FLOOD'];
        }
        else if(sname==='lentil'){
            HazardList = ['HEAT STRESS','COLD STRESS','FROST','ERWL','SPI'];
        }
        else if(sname==='sugarcane'){
            HazardList = ['HEAT STRESS','COLD STRESS','SPI','DSN','FLOOD'];
        }
        else if(sname==='buffalo'||sname==='cattle'||sname==='pig'||sname==='sheep'||sname==='poultry'||sname==='goat'){
            HazardList = ['THI','CD','ERD','RAINDEF','FLOOD','CYCL'];
        }
        //Kharif Onion
        else if(sname==='onion'){
            HazardList = ['HEAT STRESS','ERWL','SPI','FLOOD','DSN','BIOTIC2'];
        }
        else{
            HazardList = [''];
        }

    return HazardList;
  }
  
  const CurrHazard = CropRisk();
  
  function HazardName() {
    let HazardNames = [];
    CurrHazard.forEach((hazardid) => {
        MasterHazardID.forEach((sname,index) => {
            if(hazardid===sname){
                HazardNames.push(MasterHazard[index]);
            }
        })
    })
    return HazardNames;
  }

  const CurrHazardName = HazardName();
  
  const switchVulner = ['Irrigation',"Income","Rural infrastructure","Economic Development Indicator"];
  const switchVulnerID = ['irrigation','GDP','ROAD','HDI'];

/*   const switchvul_Livestock = ['Vulnerability Index',"Feed/Fodder","Income","Rural infrastructure","Economic Development Indicator"];
  const switchvul_LivestockID = ['vulne',"CROPRES","GDP","ROAD",'HDI']; */

  const switchvul_Livestock = ["Feed/Fodder","Income","Economic Development Indicator","Rural infrastructure"];
  const switchvul_LivestockID = ["CROPRES","GDP",'HDI','ROAD'];

  const switchvul_Fisheries = [];
  const switchvul_FisheriesID = [];

  const switchExposure = ['Cropped Area'];
  const switchExposureID = ['c-area'];

  const switchExposureLivestock = ['Number of Animals per grid'];
  const switchExposureLivestockID = ['animals'];

  const switchExposureFish = ['Exposure Index'];
  const switchExposureFishID = ['expoindex'];

  const switchCombId = ['dl','dr','riskindex','HINDEX','COLD STRESS2',"ERWL2",'LOW POLLEN','HIGH POLLEN','HEAT STRESS','HEAT STRESS1','HEAT STRESS2',
    'COLD STRESS','PCOLD','TERMINAL HEAT','FROST','ERWL','DELMON','SPI','DSN','FLOOD','LODGE','BIOTIC',"ER",,"THI",'HD','CD','ERD',
    'RAINDEF','CYCL','CSTRESS REPRO','HIGH REPRO','HSTRESS BOLL','COLD FLOWER','HIGH FLOWER','animals','vulne','irrigation','waterholding','soil','GDP',
    'ROAD','HDI',"CROPRES",'expoindex','c-area','BIOTIC2'];

  const Risk = ['District Level','Downscaled Risk','Risk Index','Hazard Index','Low temperature induced spikelet sterility',"Untimely Rainfall",
        'Low temperature induced pollen sterility','High temperature induced pollen sterility','Heat Stress','Heat Stress','High temperature induced spikelet sterility',
        'Cold Stress','Low temperature induced tuberization failure','Terminal Heat','Days of Frost','Excess Rainfall and Waterlogging','Delayed Monsoon','Rainfall Deficit Index','Dry Spell',
      'Flood','Lodging','Biotic',"Excess Rainfall",,"Temperature-Humidity Index","Hot days","Cold days","Extreme Rainfall days",
      "Rainfall Deficit","Cyclone",'Cold stress in reproductive stage','Heat stress in reproductive stage',
      'Heat stress during boll formation','Cold stress during flowering','High tempearture during flowering','Number of Animals per grid',
      'Vulnerability Index','Irrigation','Soil Water Holding Capacity','Soil Organic Carbon','Agriculture Income','Rural infrastructure','Economic Development Indicator',
      "Feed/Fodder",'Exposure Index','Cropped Area','Biotic Stress'];

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
        switchCombId.forEach((sname,idx) => {
            initialTodos[sname] = false;
            if(Risk[idx]===CurrRisk){
                initialTodos[sname] = true;
            }
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
        changeRisk(name);
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
    width: 30+padd,
    height: 12+padd,
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
      width: 10,
      height: 8,
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
    alignItems: 'flex-start', // Align items to the start 
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#CCC', // Color for the label text when disabled
    },
  }));

  function checklivestock() {
    const diffcrop = ['cattle','buffalo','goat','sheep','pig','poultry'];
    let ans = false;
    diffcrop.forEach((sname) => {
      if(activeCrop[sname]===true){
        ans = true;
      }
    })
    return ans;
  }

  function checkFish(){
    const fishes = ['freshwater','bracklish','marine','coldwater'];
    let ans = false;
    fishes.forEach((sname) => {
      if(activeCrop[sname]===true){
        ans = true;
      }
    })
    return ans;
  }


  return (
   <div>
    <Box sx={{display:'flex',flexDirection:'column'}}>
        <FormLabel sx={{paddingBottom:1,textAlign:'left'}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:1,paddingLeft:2}}>Base climate and climatic risks of {cropname.toLowerCase()}</Typography>
        </FormLabel>
        { true && (
        <FormControl component="" variant="standard" sx={{paddingBottom:1, paddingLeft:3}}>
            
              
                {true && (
                    <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:0}}>
                {/* {
                    switchRisk.map((sn1r,idxr)=>(
                    <FormGroup>
                        <CustomFormControlLabel
                        control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchRiskID[idxr])]}
                        onChange={handleChangeP3((switchRiskID[idxr]))} name={(switchRiskID[idxr])}
                        />}
                        disabled={false}
                        key={(switchRiskID[idxr])}
                        label={<Typography fontSize='13px' sx={{paddingLeft:'3px'}}>{sn1r}</Typography>}
                        />
                    </FormGroup>
                    ))
                } */}
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
                                label={<Typography fontSize='13px' sx={{paddingLeft:'3px'}}>{sn1}</Typography>}
                                />
                                    {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='hazard' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                                CurrHazardName.map((sn1r,idxr)=>(
                                                <FormGroup sx={{maxWidth:'250px'}}>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(CurrHazard[idxr])]}
                                                    onChange={handleChangeP3((CurrHazard[idxr]))} name={(CurrHazard[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(CurrHazard[idxr])}
                                                    label={<Typography fontSize='13px' align='left' sx={{paddingLeft:'3px',maxWidth:'200px',wordBreak:'break-word', 
                                                        whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                                    {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='vulner' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            { (checkFish()===false && checklivestock()===false) &&
                                                switchVulner.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchVulnerID[idxr])]}
                                                    onChange={handleChangeP3((switchVulnerID[idxr]))} name={(switchVulnerID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchVulnerID[idxr])}
                                                    label={<Typography fontSize='13px' align='left' sx={{paddingLeft:'3px',maxWidth:'200px',wordBreak:'break-word', whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                            { checkFish()===true &&
                                                switchvul_Fisheries.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchvul_FisheriesID[idxr])]}
                                                    onChange={handleChangeP3((switchvul_FisheriesID[idxr]))} name={(switchvul_FisheriesID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchvul_FisheriesID[idxr])}
                                                    label={<Typography fontSize='13px' align='left' sx={{paddingLeft:'3px',maxWidth:'200px',wordBreak:'break-word', whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                            { checklivestock()===true &&
                                                switchvul_Livestock.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchvul_LivestockID[idxr])]}
                                                    onChange={handleChangeP3((switchvul_LivestockID[idxr]))} name={(switchvul_LivestockID[idxr])}
                                                    />}
                                                    disabled={(activeCrop['pig']&&sn1r==="Feed/Fodder")?true:false}
                                                    key={(switchvul_LivestockID[idxr])}
                                                    label={<Typography fontSize='13px' align='left' sx={{paddingLeft:'3px',maxWidth:'200px',wordBreak:'break-word', whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
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
                                                label={<Typography fontSize='13px' sx={{paddingLeft:'3px'}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                />
                                            </FormGroup>
                                            ))
                                        } 
                                        </FormControl>
                                    )}
                                    {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='basic' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            {
                                            switchBasic.map((sn1r,idxr)=>(
                                            <FormGroup>
                                                <CustomFormControlLabel
                                                control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchBasicID[idxr])]}
                                                onChange={handleChangeP3((switchBasicID[idxr]))} name={(switchBasicID[idxr])}
                                                />}
                                                disabled={false}
                                                key={(switchBasicID[idxr])}
                                                label={<Typography fontSize='13px' sx={{paddingLeft:'3px'}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                />
                                            </FormGroup>
                                            ))
                                        } 
                                        </FormControl>
                                    )}
                                    {P3aipcc[switchIPCCID[idx]] && switchIPCCID[idx]==='exposure' && (
                                        <FormControl component="fieldset" variant="standard" sx={{paddingBottom:1,paddingLeft:5}}>
                                            { (checkFish()===false && checklivestock()===false) &&
                                                switchExposure.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchExposureID[idxr])]}
                                                    onChange={handleChangeP3((switchExposureID[idxr]))} name={(switchExposureID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchExposureID[idxr])}
                                                    label={<Typography fontSize='13px' align='left' sx={{paddingLeft:'3px',maxWidth:'200px',wordBreak:'break-word', whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                            { checkFish()===true &&
                                                switchExposureFish.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchExposureFishID[idxr])]}
                                                    onChange={handleChangeP3((switchExposureFishID[idxr]))} name={(switchExposureFishID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchExposureFishID[idxr])}
                                                    label={<Typography fontSize='13px' align='left' sx={{paddingLeft:'3px',maxWidth:'200px',wordBreak:'break-word', whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                            { checklivestock()===true &&
                                                switchExposureLivestock.map((sn1r,idxr)=>(
                                                <FormGroup>
                                                    <CustomFormControlLabel
                                                    control = {<AntSwitch inputProps={{'aria-label':'ant design'}} checked={P3[(switchExposureLivestockID[idxr])]}
                                                    onChange={handleChangeP3((switchExposureLivestockID[idxr]))} name={(switchExposureLivestockID[idxr])}
                                                    />}
                                                    disabled={false}
                                                    key={(switchExposureLivestockID[idxr])}
                                                    label={<Typography fontSize='13px' align='left' sx={{paddingLeft:'3px',maxWidth:'200px',wordBreak:'break-word', whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sn1r.charAt(0).toUpperCase()+sn1r.toLowerCase().slice(1)}</Typography>}
                                                    />
                                                </FormGroup>
                                                ))
                                            }
                                        </FormControl>
                                    )}
                        </FormGroup>
                    ))}
                </FormControl>)}
                
          </FormControl>)}
          </Box>
          </div>
  );
};