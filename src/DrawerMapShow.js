import * as React from "react";
import DrawerV from "./DrawerViewer";
import MApp from "./Map_1";
import SMap from "./Map_3d";
import LocationCard from "./Floating_Card";
import Papa from "papaparse";
import AdaptationCard from "./Adaptation_Card";
import { useRef } from "react";
import TabsData from "./Data_Access";
import Floating_drawer from "./Floating_Drawer";
import ResTabsData from "./Resources";
import AboutUs from "./About_Us";
import { Accordion, Box } from "@mui/material";
import { Paper } from "@mui/material";
import Summ_Comm from "./Summ_Comm";
import Summ_Loc from "./Summ_Loc";
import Summ_Adapt from "./Summ_Adapt";
import Summ_Adapt2 from "./Summ_Adapt2";
import Summ_Adapt3 from "./Summ_Adapt3";
import Summ_Adapt4 from "./Summ_Adapt4";
import Summ_Adapt5 from "./Summ_Adapt5";
import Summ_Adapt6 from "./Summ_Adapt6";
import Map_Risk from "./Map_Risk1";
import Map_Option from "./Map_Option1";
//import Map_Extra from './Map_Extra';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import UseCase from './Usecase';
import Guidee from './Guide';
//import UnitCard from './UnitRisk';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Popper from '@mui/material/Popper';
import LegendCard from './Legend_Card';
import CompV from './Exp_Comp';
import ImageTimeline from './gif';
import CompGif from './Explore_with_gif.js';
import Summary_Statistics from './Summary_Statistics.js';
import Selection_bar from './Selection_bar.js';
import HazardGlance from "./HazardGlance.js";
import Adaptation_Analytics from "./Adaptation_Analytics.js";
import Adaptation_Analytics2 from "./Adaptation_Analytics2.js";
import Summ_Scenario from './Summ_Scenario';
import Summ_Model from './Summ_Model';
import Summ_Adaptation_Indicator from "./Summ_Adaptation_Indicators.js";
// import AdaptationGlance from './AdaptationGlance';
//import Summ1 from './Summary1';

// React and useRef for creating and managing components.
// Several custom components like DrawerViewer, Map_1, Map_3d, Floating_Card, etc.
// Papa for parsing CSV data.
// Material UI components for UI elements like Accordion, Box, Typography, and others.
// Utility functions from @turf/turf for geospatial calculations.
// useLocation from react-router-dom to access the current location object.

async function GetData(artist) {
  const data = Papa.parse(await fetchCsv());
  //console.log(data);
  return data;
}

async function fetchCsv() {
  const response = await fetch("./dt_data.csv");
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  //console.log('csv', csv);
  return csv;
}

async function fetchCsv2() {
  const response = await fetch("./Computed.json");
  return await response.json();
}

async function fetchCsv3() {
  const response = await fetch("./Computed_Hazard.json");
  return await response.json();
}

async function fetchCsv4() {
  const response = await fetch('./All_adaptation_crops_corrected.json');
  return await response.json();
}

async function fetchCsv5() {
  const response = await fetch('./All_hazards_crops_corrected.json');
  return await response.json();
}

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

export default function DrawerMapShow({ activeBar }) {
  let Homecrop = "rice";
  let Homefocus = "Region";
  let Homeregion = "South Asia";
  let activeTab = 0;

  const loc1 = useLocation();
  const data2 = loc1.state;

  if (data2) {
    if (data2.activeTab) {
      activeTab = data2.activeTab;
    }
    if (data2.Region) {
      Homeregion = data2.Region;
    }
    if (data2.Commodity) {
      Homecrop = data2.Commodity;
      }
      if(Homeregion!=='South Asia'){
        Homefocus = 'Country';
      }
    }
  
    const fullList = ['rice','wheat','maize','barley','sorghum','fmillet','pmillet',
    'safflower','sunflower','rapeseed','sesame','groundnut',
    'soyabean','chickpea','ppea','bgram','ggram','lentil',
    'cotton','jute','rubber','sugarcane','tea','coconut',
    'cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater',
    'potato','onion','tomato','chilli','mango','banana'];

    const switchscenario = ['Baseline','SSP 2-4.5','SSP 5-8.5'];
    const switchscenarioid = ['baseline','ssp245','ssp585'];

    const Comm = ['Rice','Wheat','Maize','Barley','Sorghum','Finger Millet','Pearl Millet',
    'Safflower','Sunflower','Mustard','Sesame','Groundnut',
    'Soybean','Chickpea','Pigeonpea','Black Gram','Green Gram','Lentil',
    'Cotton','Jute','Rubber','Sugarcane','Tea','Coconut',
    'Cattle','Buffalo','Goat','Sheep','Pig','Poultry',
    'Freshwater','Brackish','Marine','Cold water',
    'Potato','Onion','Tomato','Chillies','Mango','Banana'];

  const opt = [
    "Stress Tolerant Variety",
    "Early Sowing",
    "Precision Land Levelling",
    "Zero Tillage with residues",
    "Broad Bed and Furrow",
    "Direct Seeded Rice - Dry",
    "Direct Seeded Rice - Wet",
    "System of Rice Intensification",
    "Supplemental Irrigation",
    "Microirrigation",
    "Precision Water Management",
    "Precision Fertilizer Management",
    "Precision Fertilizer Management - High tech",
    "Deep Placement of Urea",
    "ICT linked Input Management",
    "Crop Insurance",
    "Land Management",
    "Feed Management",
    "Herd Management",
    "Animal Health",
    "Animal Productivity",
    "Mulching",
    "Alternate Wetting and Drying",
    "Fertilizer rating and timing",
    "Manure Management",
    "Information Use",
    "Heat Stress Management",
    "Stress tolerant varieties","Diversification to legumes","Zero tillage and residues","Precision land leveling",
    "ICT-linked Precision water management","ICT-linked Precision fertilizer management","ICT-linked Precision input management","Nature-based agriculture",
    "Climate-smart agriculture","Insurance"
  ];

  const impact = ["Productivity","Resilience","Value of Production"];

  const Risk = [
    "District Level",
    "Downscaled Risk",
    "Risk Index",
    "Hazard Index",
    "Low temperature induced spikelet sterility",
    "Untimely Rainfall",
    "Low temperature induced pollen sterility",
    "High temperature induced pollen sterility",
    "Heat Stress",
    "Heat Stress",
    "High temperature induced spikelet sterility",
    "Cold Stress",
    "Low temperature induced tuberization failure",
    "Terminal Heat",
    "Days of Frost",
    "Excess Rainfall and Waterlogging",
    "Delayed Monsoon",
    "Drought",
    "Dry Spell",
    "Flood",
    "Lodging",
    "Biotic",
    "Excess Rainfall",
    ,
    "Temperature-Humidity Index",
    "Hot days",
    "Cold days",
    "Extreme Rainfall days",
    "Rainfall Deficit",
    "Cyclone",
    "Cold stress in reproductive stage",
    "Heat stress in reproductive stage",
    "Heat stress during boll formation",
    "Cold stress during flowering",
    "High tempearture during flowering",
    "Number of Animals per grid",
    "Vulnerability Index",
    "Irrigation",
    "Soil Water Holding Capacity",
    "Soil Organic Carbon",
    "Income",
    "Rural infrastructure",
    "Economic Development Indicator",
    "Feed/Fodder",
    "Exposure Index",
    "Cropped Area",
    "Biotic Stress",
    "Marginal Farmers",
    "Holding size",
    "Fertilizer consumption"
  ];

  const switchCombId = [
    "dl",
    "dr",
    "riskindex",
    "HINDEX",
    "COLD STRESS2",
    "ERWL2",
    "LOW POLLEN",
    "HIGH POLLEN",
    "HEAT STRESS",
    "HEAT STRESS1",
    "HEAT STRESS2",
    "COLD STRESS",
    "PCOLD",
    "TERMINAL HEAT",
    "FROST",
    "ERWL",
    "DELMON",
    "SPI",
    "DSN",
    "FLOOD",
    "LODGE",
    "BIOTIC",
    "ER",
    ,
    "THI",
    "HD",
    "CD",
    "ERD",
    "RAINDEF",
    "CYCL",
    "CSTRESS REPRO",
    "HIGH REPRO",
    "HSTRESS BOLL",
    "COLD FLOWER",
    "HIGH FLOWER",
    "animals",
    "vulne",
    "irrigation",
    "waterholding",
    "soil",
    "GDP",
    "ROAD",
    "HDI",
    "CROPRES",
    "expoindex",
    "c-area",
    "BIOTIC2",
    "FARMERS",
    "HSIZE",
    "FERTILIZER"
  ];

  function createInitialCrops() {
      const initialTodos = {};
      fullList.forEach((sname) => {
        initialTodos[sname] = sname===Homecrop? true:false;
      });
      return initialTodos;
      };
  
  function IntialOptions() {
          const initialTodos = {};
          opt.forEach((sname) => {
            initialTodos[sname] = false;
          });
          return initialTodos;
      };

  const [opt2,setopt2] = React.useState("Precision Fertilizer Management");
  const [opt3,setopt3] = React.useState("Early Sowing");
  const [opt4,setopt4] = React.useState("ICT linked Input Management");
  const [opt5,setopt5] = React.useState("Microirrigation");
  const [opt6,setopt6] = React.useState("Zero Tillage with residues");
  const [opt7,setopt7] = React.useState("Fertilizer rating and timing");
  const [acc,setacc] = React.useState(false);

  function InitialHazard() {
      const haz = {};
      switchCombId.forEach((sname) => {
        haz[sname] = false;
      });
      return haz;
    };

  function InitialImpact() {
      const imp = {};
      impact.forEach((sname) => {
        imp[sname] = false;
      });
      return imp;
    };

  function InitialHazard2() {
      const haz = {};
      switchCombId.forEach((sname) => {
        haz[sname] = false;
      });
      haz['DRYSP'] = true;
      return haz;
    };
  
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
    'Rice'
  );
  const [cropid, setCropid] = React.useState(
    'rice'
  );

  const [crop3, setCrop3] = React.useState(createInitialCrops);

  const [option, setOption] = React.useState(
      IntialOptions
  );

  const [optionlayer, setOptionLayer] = React.useState(
    {'Biophysical Suitability':false,'Gender':false,'Technical Suitability':false,'Economic':false,'Scalibility':false}
  );

  function initialCrop() {
    let namee = "";
    fullList.map((sname, index) => {
      if (sname === Homecrop) {
        namee = Comm[index];
      }
    });
    return namee;
  }

  const [Currcrop, setCurrCrop] = React.useState(initialCrop);

  const [CurrOpt, setCurrOpt] = React.useState("");

  const [CurrRisk, setRisk] = React.useState(InitialHazard);

  const [CurrRisk2, setRisk2] = React.useState(InitialHazard2);

  const [RiskName, setRiskName] = React.useState("");

  const [CurrImpact, setImpact] = React.useState(InitialImpact);
  const [ImpactName, setImpactName] = React.useState('');

  //without event for three map structure we use dropdowm menu

  const changeImpact_CMP = (name) => {
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
  };

  //without event for three map structure we use dropdowm menu

  const handleChange_CMP = (name) => {
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

  //without event for three map structure we use dropdowm menu

  const handleChangeOpt_CMP = (name) => {
    const newState = { ...option};
    opt.map((sname) => {
      newState[sname] = sname === name;
      if(sname===name){
          setCurrOpt(name);
      }
    });
    if(name===''){
      setCurrOpt('');
    }
    setOption(newState);
    setRisk(InitialHazard);
    setRiskName('');
    setImpact(InitialImpact);
    setImpactName('');
  };

    // with event for switch click event in linear structure

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
  };

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
    const newState = { ...crop};
      fullList.map((sname,index) => {
        newState[sname] = sname === name;
        if(sname===name){
          setCrop2(Comm[index]);
        }
      });
      setCrop3(newState);
      setCropid(name);
    };
    
  const changeRisk = (name) => {
      const old = {...CurrRisk};
      switchCombId.forEach((sname,index) => {
        old[sname] = sname===name;
        if(sname===name){
          setRiskName(Risk[index%Risk.length]);
        }
      });
      if(name===''){
        setRiskName('');
      }
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
      const newState = { ...option};
      opt.map((sname) => {
        newState[sname] = sname === name;
        if(sname===name){
            setCurrOpt(name);
        }
      });
      if(name===''){
        setCurrOpt('');
      }
      setOptionLayer({
        ...optionlayer,
        'Biophysical Suitability':false,
        'Gender':false,
        'Technical Suitability':false,
        'Economic':false,
        'Scalibility':false
      });
      setOption(newState);
      setRisk(InitialHazard);
      setRiskName('');
      setImpact(InitialImpact);
      setImpactName('');
  };

  const changeOptLayer = (event) => {
    setOptionLayer({
      ...optionlayer,
      [event.target.name]: event.target.checked,
    });
  };

  const [optionlayer2, setOptionLayer2] = React.useState(
    'Biophysical Suitability'
  );

  const changeOptLayer2 = (sname) => {
    setOptionLayer2(sname);
  };

  const handleChangeOptSumm = (name) => {
    setopt2(name);
  };

  const handleChangeOptSumm2 = (name) => {
    setopt3(name);
  };

  const handleChangeOptSumm3 = (name) => {
    setopt4(name);
  };

  const handleChangeOptSumm4 = (name) => {
    setopt5(name);
  };

  const handleChangeOptSumm5 = (name) => {
    setopt6(name);
  };

  const handleChangeOptSumm6 = (name) => {
    setopt7(name);
  };

  // Event Handlers:
  // handleScenarioChange: Updates the selected scenario.
  // handleChange: Updates the selected crop and resets other states.
  // handleChangeSumm: Updates the crop for summaries.
  // changeImpact: Updates the selected impact and resets other states.

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
        const capitalizedStateName = stateName.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ); // Capitalize first letter of each word
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

  const [area_data, setarea_data] = React.useState([]);

  React.useEffect(() => {
    async function fetchData2() {
      const data = await fetchCsv2();
      setarea_data(data);
    }
    fetchData2();
  }, []);

  const area_dict = area_data;

  const [area_data2, setarea_data2] = React.useState([]);

  React.useEffect(() => {
    async function fetchData3() {
      const data = await fetchCsv3();
      setarea_data2(data);
    }
    fetchData3();
  }, []);

  const area_dict2 = area_data2;

  // State Initialization and Management
  // The initial states for crops, options, scenarios, hazards, and impacts are set up using predefined lists (fullList, opt, impact, switchscenarioid, etc.).
  // Event handlers are used to manage the state changes based on user interactions.

    const [area_data3, setarea_data3] = React.useState([]);

  React.useEffect(() => {
    async function fetchData4() {
      const data = await fetchCsv4();
      setarea_data3(data);
    }
    fetchData4();
  }, []);

  const area_dict3 = area_data3;

  const [area_data4, setarea_data4] = React.useState([]);

  React.useEffect(() => {
    async function fetchData5() {
      const data = await fetchCsv5();
      setarea_data4(data);
    }
    fetchData5();
  }, []);

  const area_dict4 = area_data4;
  
  const OnFocus = ["Region", "Country", "State"];

  const [focus, setfocus] = React.useState(Homefocus);

  const [activeRegion, setActiveRegion] = React.useState(Homeregion);

  const [focus2, setfocus2] = React.useState("Region");
  const [activeRegion2, setActiveRegion2] = React.useState("South Asia");

  const ActiveRegionChange = (fname, rname) => {
    setfocus(fname);
    setActiveRegion(rname);
  };

  const ActiveRegionChange2 = (fname, rname) => {
    setfocus2(fname);
    setActiveRegion2(rname);
  };

    const container = useRef(null);
    const [height1, setHeight1] = React.useState(null);

    //Extra
    //Extra
    //Extra

    const [exploreType, setExploreType] = React.useState('Commodity');

    const handleExploreTypeChange = (name) => (event) => {
      setExploreType(name);
    };

    const [vis_scale, setVisScale] = React.useState('Pixel Level');

    const handleVisScaleChange = (name) => (event) => {
      setVisScale(name);
    };
    
    const [Model,setModel] = React.useState('CHC');

    const handleModelchange = (name) => (event) => {
      setModel(name);
    };

    const handleScenario = (name) => {
        setNameScenario(name);
      };
    
    const [NameModel, setNameModel] = React.useState('CHC');
    
    const handleModel = (name) => {
        setNameModel(name);
      };

      const box1 = React.useRef(null);
              const box2 = React.useRef(null);
              const box3 = React.useRef(null);
              const box4 = React.useRef(null);
              const box5 = React.useRef(null);
              const box6 = React.useRef(null);

    return (
        <div>
        <Box sx={{display:{xs:'none',md:'block'}}}>

        {(activeBar==='future'||activeBar==='viewer') && <Selection_bar location={activeRegion} commodity={Currcrop} adaption={CurrOpt} exploreType={exploreType} 
        RiskName={RiskName} scenario={NameScenario} ImpactName={ImpactName} modelName={Model}></Selection_bar>}

        {activeBar==='future' && <CompV activeCrop={Currcrop} changeCrop={handleChange_CMP} LocationData={countryStateMap} focus={focus} activeRegion={activeRegion} changeRegion={ActiveRegionChange} CurrRisk={RiskName}
        activeOpt={CurrOpt} changeOpt={handleChangeOpt_CMP} changeRisk={changeRisk} activeImpact={CurrImpact} changeImpact={changeImpact_CMP} activeScenario={scenario} changeScenario={handleScenarioChange}
        area_dict3={area_dict3} area_dict4={area_dict4} activeOptLayer={optionlayer} changeOptLayer={changeOptLayer} modelName={Model}></CompV>}

        {activeBar==='future' && <DrawerV activeCrop={crop} changeCrop={handleChange} LocationData={countryStateMap} activeRegion={activeRegion} changeRegion={ActiveRegionChange} CurrRisk={RiskName}
        activeOpt={option} changeOpt={handleChangeOpt} changeRisk={changeRisk} activeImpact={CurrImpact} changeImpact={changeImpact} activeScenario={scenario} changeScenario={handleScenarioChange}
        activeOptLayer={optionlayer} changeOptLayer={changeOptLayer} exploreType={exploreType} handleExploreTypeChange={handleExploreTypeChange} activeModel={Model}
        changeModel={handleModelchange} activeScale={vis_scale} changeScale={handleVisScaleChange}></DrawerV>}
        
        {activeBar==='timeline' && <ImageTimeline></ImageTimeline>}
        {activeBar==='hazards' && <HazardGlance handleChangeSumm={handleChangeSumm} cropid={cropid} focus2={focus2} activeRegion2={activeRegion2} ActiveRegionChange2={ActiveRegionChange2}
        crop2={crop2} CurrRisk2={CurrRisk2}></HazardGlance>}

        {activeBar==='adaptation' && <Adaptation_Analytics cropid={cropid} focus2={focus2} activeRegion2={activeRegion2} activeOpt={CurrOpt}></Adaptation_Analytics>}
        {activeBar==='adaptation2' && <Adaptation_Analytics2 cropid={cropid} focus2={focus2} activeRegion2={activeRegion2} activeOpt={CurrOpt}
        ActiveRegionChange2={ActiveRegionChange2} handleChangeSumm={handleChangeSumm}></Adaptation_Analytics2>}

        {activeBar==='summary' && <Summary_Statistics></Summary_Statistics>}

        {activeBar==='comparison' && <CompGif activeCrop={Currcrop} changeCrop={handleChange_CMP} LocationData={countryStateMap} focus={focus} activeRegion={activeRegion} changeRegion={ActiveRegionChange} CurrRisk={RiskName}
        activeOpt={CurrOpt} changeOpt={handleChangeOpt_CMP} changeRisk={changeRisk} activeImpact={CurrImpact} changeImpact={changeImpact_CMP} activeScenario={scenario} changeScenario={handleScenarioChange}
        activeOptLayer={optionlayer} changeOptLayer={changeOptLayer}></CompGif>}
        
        {activeBar==='access' && <div style={{backgroundColor:'#f8f8f8', minHeight:'calc(100vh - 90px)'  }}>
        <TabsData activeTab={activeTab}></TabsData>
        <Floating_drawer activeCrop={Currcrop} activeRegion={activeRegion}></Floating_drawer>
        </div> }
        {activeBar==='resources' && <div style={{ minHeight:'calc(100vh - 90px)'  }}>
          <ResTabsData></ResTabsData>
        </div>}
        {activeBar==='usecase' && <div style={{ minHeight:'calc(100vh - 90px)'  }}>
          <UseCase></UseCase>
        </div>}
        {activeBar==='guide' && <div style={{ minHeight:'calc(100vh - 90px)'  }}>
          <Guidee></Guidee>
        </div>}
        {activeBar==='about' && <AboutUs></AboutUs>}
        <div style={{overflow:'hidden'}}>
        {(activeBar==='viewer') && <MApp activeCrop={Currcrop} activeScenario={scenario} focus={focus} activeRegion={activeRegion} activeOpt={CurrOpt} CurrRisk={RiskName} activeImpact={CurrImpact}></MApp>}
        
        {activeBar==='viewer' && <DrawerV activeCrop={crop} changeCrop={handleChange} LocationData={countryStateMap} activeRegion={activeRegion} changeRegion={ActiveRegionChange} CurrRisk={RiskName}
        activeOpt={option} changeOpt={handleChangeOpt} changeRisk={changeRisk} activeImpact={CurrImpact} changeImpact={changeImpact} activeScenario={scenario} changeScenario={handleScenarioChange}
        activeOptLayer={optionlayer} changeOptLayer={changeOptLayer}></DrawerV>}
        
        {(activeBar==='future' && NameScenario==='Baseline') && <div ref={container}><LocationCard location={activeRegion} commodity={Currcrop} adaption={CurrOpt} setHeight1={setHeight1}
        RiskName={RiskName} scenario={NameScenario} ImpactName={ImpactName} area_data={area_dict} area_data2={area_dict2}></LocationCard></div>}
        
        {(activeBar==='viewer') && (RiskName!==""||CurrOpt!=="") && <LegendCard location={activeRegion} commodity={Currcrop} adaption={CurrOpt}
        RiskName={RiskName} scenario={NameScenario} ImpactName={ImpactName} area_data={area_dict} area_data2={area_dict2}></LegendCard>}
        </div>
        {(activeBar==='analytics') && 
         <div style={{overflow:'hidden'}}>
          <Box>
        <Box sx={{width:'auto', display:'flex',maxHeight:'calc(100vh - 85px)',flexDirection:'row',justifyContent:'center',marginX:'auto',marginTop:'85px',backgroundColor:'#fff'}} gap='2vw'>
        <Popper
        sx={{zIndex:2}}
        open={true}
        >
        <div style={{position:'absolute',left:'3vw',top:100,width:'calc(23vw + 16px)', boxShadow:'0px 0px 0px #aaa', borderRadius:'15px'}}>
        <Accordion expanded={acc} onMouseOver={()=>setacc(true)} onMouseLeave={()=>setacc(false)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{justifyItems:'center',alignContent:'center',marginY:'-5px',backgroundColor:'#F7F7F7'}}
        > <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>Adaptation at a glance</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{marginY:'-5px'}}>This overview page allows you to select a specific crop and region of your choice, and explore the associated adaptation options
           comprehensively on one page.
        </AccordionDetails>
        </Accordion>
        </div>
        </Popper>
        
        <Box sx={{display:'flex',flexDirection:'column',gap:'12px',marginTop:'4px',alignItems:'center'}}>
        <Box sx={{height:'40px'}}></Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'2px'}}>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',width:'23vw',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
          <Typography sx={{fontSize:14,fontWeight:'bold'}}>Location: </Typography>
          <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
          <Typography sx={{marginLeft:'5px',fontSize:14,fontWeight:'bold'}}>Commodity: </Typography>
          <Summ_Comm changeComm={handleChangeSumm} comm={cropid}></Summ_Comm>
        </Box>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',width:'23vw',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
            <Typography sx={{fontSize:13,fontWeight:'bold'}}>Scenario: </Typography>
            <Summ_Scenario handleScenario={handleScenario}></Summ_Scenario>
            <Typography sx={{marginLeft:'5px',fontSize:13,fontWeight:'bold'}}>Model: </Typography>
            <Summ_Model handleModel={handleModel}></Summ_Model>
        </Box>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',width:'23vw',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
          <Typography sx={{fontSize:13,fontWeight:'bold'}}>Adaptation Indicator: </Typography>
          <Summ_Adaptation_Indicator handleIndicator={changeOptLayer2}></Summ_Adaptation_Indicator>
        </Box>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',gap:'2vh'}}> 
          <Box sx={{display:'flex',flexDirection:'column'}}>
      {/*  <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: "#FF0000",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Extreme
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFA500',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Very High
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFFF00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#00FF00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#059212',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
          </Box> */}
        <Paper elevation={1}>
        <Map_Risk activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={CurrRisk2}></Map_Risk>
        </Paper>
        </Box>
        </Box>
        </Box>
        
        <Box sx={{display:'flex',flexDirection:'column',gap:'1vh',marginTop:'3px'}}>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12, fontWeight:'bold'}}>Adaptation: </Typography>
        <Summ_Adapt activv={opt2} changeOption={handleChangeOptSumm} activeCrop={crop3}></Summ_Adapt>
        </Box>
        {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box> */}
        <Paper elevation={1} sx={{width:'21vw'}} ref={box1}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt2} area_dict={area_dict} activeScenario={NameScenario}></Map_Option>
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
                                    offset: [90,-85], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
        </div>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12, fontWeight:'bold'}}>Adaptation: </Typography>
        <Summ_Adapt2 activv={opt3} changeOption={handleChangeOptSumm2} activeCrop={crop3}></Summ_Adapt2>
        </Box>
        {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box> */}
        <Paper elevation={1} sx={{width:'21vw'}} ref={box2}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt3} area_dict={area_dict}  activeScenario={NameScenario}></Map_Option>
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
                                    offset: [90,-85], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
        </div>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'1vh',marginTop:'3px'}}>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12, fontWeight:'bold'}}>Adaptation: </Typography>
        <Summ_Adapt3 activv={opt4} changeOption={handleChangeOptSumm3} activeCrop={crop3}></Summ_Adapt3>
        </Box>
        {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box> */}
        <Paper elevation={1} sx={{width:'21vw'}} ref={box3}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt4} area_dict={area_dict}  activeScenario={NameScenario}></Map_Option>
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
                                    offset: [90,-85], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
        </div>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12, fontWeight:'bold'}}>Adaptation: </Typography>
        <Summ_Adapt4 activv={opt5} changeOption={handleChangeOptSumm4} activeCrop={crop3}></Summ_Adapt4>
        </Box>
        {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box> */}
        <Paper elevation={1} sx={{width:'21vw'}} ref={box4}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt5} area_dict={area_dict}  activeScenario={NameScenario}></Map_Option>
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
                                    offset: [90,-85], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
        </div>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'1vh',marginTop:'3px'}}>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12, fontWeight:'bold'}}>Adaptation: </Typography>
        <Summ_Adapt5 activv={opt6} changeOption={handleChangeOptSumm5} activeCrop={crop3}></Summ_Adapt5>
        </Box>
        {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box> */}
        <Paper elevation={1} sx={{width:'21vw'}} ref={box5}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt6} area_dict={area_dict}  activeScenario={NameScenario}></Map_Option>
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
                                    offset: [90,-85], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
        </div>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12, fontWeight:'bold'}}>Adaptation: </Typography>
        <Summ_Adapt6 activv={opt7} changeOption={handleChangeOptSumm6} activeCrop={crop3}></Summ_Adapt6>
        </Box>
        {/* <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box> */}
        <Paper elevation={1} sx={{width:'21vw'}} ref={box6}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt7} area_dict={area_dict}  activeScenario={NameScenario}></Map_Option>
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
                                    offset: [90,-85], // Adjust distance from the container
                                },
                                },
                            ]}
                            >
                            {legendComp}
                            </Popper>
        </div>
        </Box>
        </Box>
        </Box>
        </div> 
        }
        </Box>
        <Box sx={{marginTop:'80px',width:'100%',height:'calc(100vh - 80px)',alignItems:'center',justifyContent:'center',display: { xs: 'flex', md: 'none' }}}>
          <Typography>This website is designed for desktop/laptop. Please view in a bigger screen.</Typography>
        </Box>
        </div>
    );
}

// User Selection:
// Commodity: Selected through Summ_Comm component (likely a dropdown or input for crop selection).
// Location: Selected through Summ_Loc component (likely a dropdown or map interaction for region selection).

// Risk Data:
// A map component (Map_Risk) presumably displays risk levels (Extreme, Very High, High, Medium, Low) based on the selected crop and region.

// Adaptation Options:
// Up to six adaptation options are displayed.

// Each option has:
// A name displayed by Summ_AdaptX component (X being the option number).
// Suitability level (Unsuitable, Suitable) based on the selected crop and region, displayed through color legend and text.
// Adaptation benefits presumably visualized on a map component (Map_Option).

// Responsive Design:
// The entire content is hidden on screens smaller than medium size (phones).
// A message suggests viewing on a larger screen.
