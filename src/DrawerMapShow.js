import * as React from 'react';
import DrawerV from './DrawerViewer';
import MApp from './Map_1';
import SMap from './Map_3d';
import LocationCard from './Floating_Card';
import Papa from 'papaparse';
import AdaptationCard from './Adaptation_Card';
import { useRef } from "react";
import TabsData from './Data_Access';
import Floating_drawer from './Floating_Drawer';
import ResTabsData from './Resources';
import AboutUs from './About_Us';
import { Box } from '@mui/material';
import {Paper} from '@mui/material';
import Summ_Comm from './Summ_Comm';
import Summ_Risk from './Summ_Risk';
import Summ_Adapt from './Summ_Adapt';
import Map_Risk from './Map_Risk1';
import Map_Option from './Map_Option1';
import Map_Extra from './Map_Extra';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

async function GetData(artist) {
  const data = Papa.parse(await fetchCsv());
  //console.log(data);
  return data;
}

async function fetchCsv() {
  const response = await fetch('./dt_data.csv');
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = decoder.decode(result.value);
  //console.log('csv', csv);
  return csv;
}

export default function DrawerMapShow({
    activeBar
}) {
    let Homecrop='rice';
    let Homefocus='Region';
    let Homeregion='South Asia';
    let activeTab = 0;

    const loc1 = useLocation();
    const data2 = loc1.state;

    if(data2){
      if(data2.activeTab){
        activeTab = data2.activeTab;
      }
      if(data2.Region){
        Homeregion = data2.Region;
      }
      if(data2.Commodity){
      Homecrop = data2.Commodity;
      }
      if(Homeregion!=='South Asia'){
        Homefocus = 'Country';
      }
    }
  
    const fullList = ['rice','wheat','maize','sorghum','fmillet','pmillet',
    'safflower','sunflower','rapeseed','sesame','groundnut',
    'soyabean','chickpea','ppea','bgram','ggram','lentil',
    'cotton','jute','rubber','sugarcane','tea','coconut',
    'cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater',
    'potato','onion','tomato','chilli','mango','banana'];

    const switchscenario = ['Baseline','SSP 2-4.5 2050s','SSP 5-8.5 2050s'];
    const switchscenarioid = ['baseline','ssp245','ssp585'];

    const Comm = ['Rice','Wheat','Maize','Sorghum','Finger Millet','Pearl Millet',
    'Safflower','Sunflower','Rapeseed/Mustard','Sesame','Groundnut',
    'Soybean','Chickpea','Pigeonpea','Black Gram','Green Gram','Lentil',
    'Cotton','Jute','Rubber','Sugarcane','Tea','Coconut',
    'Cattle','Buffalo','Goat','Sheep','Pig','Poultry',
    'Freshwater','Brackish','Marine','Cold water',
    'Potato','Onion','Tomato','Chillies','Mango','Banana'];

    const opt = ['Stress Tolerant Variety','Early Sowing','Levelling','Zero Tillage','Broad Bed and Furrow',
    'DSR (Dry Seed)','DSR (Wet Seed)','System of Rice Intensification','Farm Pond','Microirrigation','Precision Water Management',
    'Low Tech Precision Technology','High Tech Precision Technology','Deep Placement of Urea',
    'ICT Agro Advisory','Crop Insurance','Land Management','Feed Management','Herd Management',
    'Animal Health','Animal Productivity','Mulching','Alternate wetting and drying','Fertilizer rating and timing',
    'Manure Management','Information Use','Heat Stress Management'];

    const impact = ['Impact on Productivity','Value of Production'];

    const Risk = ['District Level','Downscaled Risk','Risk Index','Hazard Index','Heat Stress','Heat Stress','High temperature induced spikelet sterility',
      'Cold Stress','Terminal Heat','Days of Frost','Excess Rainfall/Waterlogging','Delayed Monsoon','Drought SPI','Dry Spell',
    'Flood','Lodging','Biotic','Irrigation','Water Holding','Income','Access to Credit','Access to Market','Elevation',
    'Access to Knowledge','Exposure Index','Number of Farmers','Cropped Area'];

    const switchCombId = ['dl','dr','riskindex','HINDEX','HEAT STRESS','HEAT STRESS1','HEAT STRESS2','COLD STRESS','TERMINAL HEAT','FROST','ERWL','DELMON','SPI','DSN','FLOOD','LODGE','BIOTIC',
    'irrigation','waterholding','income','credit','market','elevation','knowledge','expoindex','rural','c-area'];

    function createInitialCrops() {
        const initialTodos = {};
        fullList.forEach((sname) => {
          initialTodos[sname] = sname===Homecrop? true:false;
        });
        return initialTodos;
        }
    
    function IntialOptions() {
            const initialTodos = {};
            opt.forEach((sname) => {
              initialTodos[sname] = false;
            });
            return initialTodos;
        }

    function IntialOptions2() {
          const initialTodos = {};
          opt.forEach((sname) => {
            initialTodos[sname] = false;
          });
          initialTodos['Stress Tolarent Variety'] = true;
          return initialTodos;
      }

    function InitialHazard() {
        const haz = {};
        switchCombId.forEach((sname) => {
          haz[sname] = false;
        });
        return haz;
      }

    function InitialImpact() {
        const imp = {};
        impact.forEach((sname) => {
          imp[sname] = false;
        });
        return imp;
      }

    function InitialHazard2() {
        const haz = {};
        switchCombId.forEach((sname) => {
          haz[sname] = false;
        });
        haz['DRYSP'] = true;
        return haz;
      }
    
    function createInitialScenario() {
        const initialTodos = {};
        switchscenarioid.forEach((sname) => {
          initialTodos[sname] = false;
        });
        initialTodos['baseline'] = true;
        return initialTodos;
    }
      
    const [scenario, setscenario] = React.useState(
          createInitialScenario
    );
    
    const [NameScenario, setNameScenario] = React.useState('Baseline');
      
    const handleScenarioChange = (name) => (event) => {
        const oldscenario = {...scenario};
        switchscenarioid.forEach((sname,index) => {
            oldscenario[sname] = sname === name;
            if(sname===name){
              setNameScenario(switchscenario[index]);
            }
        })
        setscenario(oldscenario);
    };

    const [crop, setCrop] = React.useState(
        createInitialCrops
    );
    
    const [crop2, setCrop2] = React.useState(
      createInitialCrops
    );

    const [option, setOption] = React.useState(
        IntialOptions
    );

    const [option2, setOption2] = React.useState(
      IntialOptions2
    );

    function initialCrop() {
      let namee = '';
      fullList.map((sname,index) => {
        if(sname===Homecrop){
            namee = Comm[index];
        }
        });
      return namee;
    };

    const [Currcrop, setCurrCrop] = React.useState(
        initialCrop
    );
    
    const [CurrOpt, setCurrOpt] = React.useState('');

    const [CurrRisk, setRisk] = React.useState(
      InitialHazard
    );

    const [CurrRisk2, setRisk2] = React.useState(
      InitialHazard2
    );

    const [RiskName, setRiskName] = React.useState('');

    const [CurrImpact, setImpact] = React.useState(InitialImpact);
    const [ImpactName, setImpactName] = React.useState('');

    const changeImpact = (name) => (event) => {
      const oldimpt = {...CurrImpact};
      impact.map((sname) => {
        oldimpt[sname] = sname === name;
      })
      setImpact(oldimpt);
      setImpactName(name);
      setOption(IntialOptions);
      setCurrOpt('');
      setRisk(InitialHazard);
      setRiskName(''); 
  }

    const handleChange = (name) => (event) => {
        const newState = { ...crop};
        fullList.map((sname,index) => {
        newState[sname] = sname === name;
        if(sname===name){
            setCurrCrop(Comm[index]);
        }
        });
        setCrop(newState);
        setOption(IntialOptions);
        setCurrOpt('');
        setRisk(InitialHazard);
        setRiskName('');
        setImpact(InitialImpact);
        setImpactName('');
      };

    const handleChangeSumm = (name) => {
        const newState = { ...crop2};
        fullList.map((sname) => {
        newState[sname] = sname === name;
        });
        setCrop2(newState);
      };
    
    const changeRisk = (name) => {
        const old = {...CurrRisk};
        switchCombId.forEach((sname,index) => {
          old[sname] = sname===name;
          if(sname===name){
            setRiskName(Risk[index%Risk.length]);
        }
        });
        setRisk(old);
        setOption(IntialOptions);
        setCurrOpt('');
        setImpact(InitialImpact);
        setImpactName('');
    }

    const changeRiskSumm = (name) => {
      const old = {...CurrRisk2};
      switchCombId.forEach((sname) => {
        old[sname] = sname===name;
      });
      setRisk2(old);
  }

  const handleChangeOpt = (name) => (event) => {
        const newState = { ...option };
        opt.map((sname) => {
        newState[sname] = sname === name;
        if(sname===name){
            setCurrOpt(name);
        }
        });
        setOption(newState);
        setRisk(InitialHazard);
        setRiskName('');
        setImpact(InitialImpact);
        setImpactName('');
    };

    const handleChangeOptSumm = (name) => (event) => {
      const newState = { ...option2 };
      opt.map((sname) => {
      newState[sname] = sname === name;
      });
      setOption(newState);
    };

  const [data1, setData1] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await GetData();
      setData1(data);
    }
    fetchData();
  }, []);

  // Create mapping of country code to lists of state names
  const countryStateMap = {};
  // Check if data1 is not empty before accessing it
  if (data1 && data1.data && data1.data.length > 0) {
    for (let i = 1; i < data1.data.length; i++) {
      const row = data1.data[i];
      const countryCode = row[1];
      let stateName = row[3];
      if (stateName) {
        stateName = stateName.toLowerCase(); // Convert state name to lowercase
        const capitalizedStateName = stateName.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
        if (!countryStateMap[countryCode]) {
          countryStateMap[countryCode] = [];
        }
        if (!countryStateMap[countryCode].includes(capitalizedStateName)) {
          countryStateMap[countryCode].push(capitalizedStateName);
          countryStateMap[countryCode].sort(); // Sort the state names
        }
      }
    }
  }

    const OnFocus = ['Region','Country','State'];

    const [focus, setfocus] = React.useState(
        Homefocus
    );
    
    const [activeRegion,setActiveRegion] = React.useState(Homeregion);

    const ActiveRegionChange = (fname,rname) => {
        setfocus(fname);
        setActiveRegion(rname);
      };


    const container = useRef(null);
    const [height1, setHeight1] = React.useState(null);
    return (
        <div>
        {activeBar==='access' && <div style={{backgroundColor:'#f8f8f8', minHeight:'calc(100vh - 80px)'  }}>
        <TabsData activeTab={activeTab}></TabsData>
        <Floating_drawer activeCrop={Currcrop} activeRegion={activeRegion}></Floating_drawer>
        </div> }
        {activeBar==='resources' && <div style={{ minHeight:'calc(100vh - 80px)'  }}>
          <ResTabsData></ResTabsData>
        </div>}
        {activeBar==='about' && <AboutUs></AboutUs>}
        {(activeBar==='viewer') &&<MApp activeCrop={crop} focus={focus} activeRegion={activeRegion} activeOpt={option} CurrRisk={CurrRisk} activeImpact={CurrImpact}></MApp>}
        {activeBar==='viewer' && <DrawerV activeCrop={crop} changeCrop={handleChange} LocationData={countryStateMap} activeRegion={activeRegion} changeRegion={ActiveRegionChange}
        activeOpt={option} changeOpt={handleChangeOpt} changeRisk={changeRisk} activeImpact={CurrImpact} changeImpact={changeImpact} activeScenario={scenario} changeScenario={handleScenarioChange}></DrawerV>}
        {/*activeBar==='analytics' && <DrawerA activeCrop={crop} changeCrop={handleChange} LocationData={countryStateMap} activeRegion={activeRegion} changeRegion={ActiveRegionChange}></DrawerA>*/}
        {(/* activeBar==='analytics' ||  */activeBar==='viewer') && <div ref={container}><LocationCard location={activeRegion} commodity={Currcrop} adaption={CurrOpt} setHeight1={setHeight1}
        RiskName={RiskName} scenario={NameScenario} ImpactName={ImpactName}></LocationCard></div>}
        {(activeBar==='viewer') && CurrOpt!=='' && <AdaptationCard activeCrop={Currcrop} activeRegion={activeRegion} adapOption={CurrOpt} heightnext={height1}></AdaptationCard>}

        {(activeBar==='analytics') && 
        <div><Box sx={{width:'auto', display:'flex',height:'calc(100vh - 80px)',flexDirection:'row',justifyContent:'center',marginX:'auto',marginTop:'80px',backgroundColor:'#fff'}} gap='2vw'>
        <Box sx={{display:'flex',flexDirection:'column',gap:'2vh',marginTop:'4px',alignItems:'center'}}>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',width:'47vw',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
        <Typography sx={{fontSize:14,fontWeight:'bold'}}>Commodity: </Typography>
        <Summ_Comm changeComm={handleChangeSumm}></Summ_Comm>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',gap:'2vh'}}> 
        <Paper elevation={1}>
        <Map_Risk activeCrop={crop2} focus={focus} activeRegion={activeRegion} CurrRisk={CurrRisk2}></Map_Risk>
        </Paper>
        <Paper elevation={1}>
        <SMap activeCrop={crop2} focus={focus} activeRegion={activeRegion} activeOpt={option} CurrRisk={CurrRisk}></SMap>
        </Paper>
        </Box>
        
        </Box>
        
        <Box sx={{display:'flex',flexDirection:'column',gap:'2vh',marginTop:'4px'}}>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt changeOption={handleChangeOptSumm}></Summ_Adapt></Box>
        <Paper elevation={1}>
        <Map_Option activeCrop={crop2} focus={focus} activeRegion={activeRegion} activeOpt={option2}></Map_Option>
        </Paper>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt changeOption={handleChangeOptSumm}></Summ_Adapt></Box>
        <Paper elevation={1}>
        <Map_Option activeCrop={crop2} focus={focus} activeRegion={activeRegion} activeOpt={option2}></Map_Option>
        </Paper>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'2vh',marginTop:'4px'}}>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt changeOption={handleChangeOptSumm}></Summ_Adapt></Box>
        <Paper elevation={1}>
        <Map_Option activeCrop={crop2} focus={focus} activeRegion={activeRegion} activeOpt={option2}></Map_Option>
        </Paper>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:14}}>Adaptation: </Typography>
        <Summ_Adapt changeOption={handleChangeOptSumm}></Summ_Adapt></Box>
        <Paper elevation={1}>
        <Map_Option activeCrop={crop2} focus={focus} activeRegion={activeRegion} activeOpt={option2}></Map_Option>
        </Paper>
        </Box>
        </Box></div>}
        </div>
    );
}