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
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import UseCase from "./Usecase";
import Guidee from "./Guide";
import LegendCard from "./Legend_Card";
import CompV from "./Exp_Comp";
import ImageTimeline from "./gif";
import CompGif from "./Explore_with_gif.js";
import Summary_Statistics from "./Summary_Statistics.js";
import Selection_bar from "./Selection_bar.js";
import HazardGlance from "./HazardGlance.js";
import Adaptation_Analytics from "./Adaptation_Analytics.js";
import Adaptation_Analytics2 from "./Adaptation_Analytics2.js";
import AdaptationGlance from "./AdaptationGlance";
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
  const response = await fetch("./All_adaptation_crops_corrected.json");
  return await response.json();
}

async function fetchCsv5() {
  const response = await fetch("./All_hazards_crops_corrected.json");
  return await response.json();
}

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
    if (Homeregion !== "South Asia") {
      Homefocus = "Country";
    }
  }

  /*   React.useEffect(() => {
    if (activeBar === "future2") {
      Homecrop = "cattle";
    } else {
      Homecrop = "rice";
    }
  }, [activeBar]); */

  const fullList = [
    "rice",
    "wheat",
    "maize",
    "barley",
    "sorghum",
    "fmillet",
    "pmillet",
    "safflower",
    "sunflower",
    "rapeseed",
    "sesame",
    "groundnut",
    "soyabean",
    "chickpea",
    "ppea",
    "bgram",
    "ggram",
    "lentil",
    "cotton",
    "jute",
    "rubber",
    "sugarcane",
    "tea",
    "coconut",
    "cattle",
    "buffalo",
    "goat",
    "sheep",
    "pig",
    "poultry",
    "freshwater",
    "bracklish",
    "marine",
    "coldwater",
    "potato",
    "onion",
    "tomato",
    "chilli",
    "mango",
    "banana",
    "millets",
  ];

  const switchscenario = ["Baseline", "SSP 2-4.5", "SSP 5-8.5"];
  const switchscenarioid = ["baseline", "ssp245", "ssp585"];

  const Comm = [
    "Rice",
    "Wheat",
    "Maize",
    "Barley",
    "Sorghum",
    "Finger Millet",
    "Pearl Millet",
    "Safflower",
    "Sunflower",
    "Mustard",
    "Sesame",
    "Groundnut",
    "Soybean",
    "Chickpea",
    "Pigeonpea",
    "Black Gram",
    "Green Gram",
    "Lentil",
    "Cotton",
    "Jute",
    "Rubber",
    "Sugarcane",
    "Tea",
    "Coconut",
    "Cattle",
    "Buffalo",
    "Goat",
    "Sheep",
    "Pig",
    "Poultry",
    "Freshwater",
    "Brackish",
    "Marine",
    "Cold water",
    "Potato",
    "Onion",
    "Tomato",
    "Chillies",
    "Mango",
    "Banana",
    "Millets",
  ];

  const opt = [
    "Stress tolerant variety",
    "Early sowing/changing planting dates",
    "Precision land levelling",
    "Zero tillage with residue retention",
    "Broadbed and furrow",
    "Dry - Direct seeded rice",
    "Wet - Direct seeded rice",
    "System of rice intensification",
    "Supplemental irrigation (water harvesting structures/farm ponds)",
    "Microirrigation",
    "Precision water management",
    "Precision fertilizer management",
    "Precision fertilizer management - High tech",
    "Deep Placement of Urea",
    "ICT linked input management",
    "Crop insurance",
    "Land Management",
    "Feed Management",
    "Herd Management",
    "Animal Health",
    "Animal Productivity",
    "Mulching",
    "Alternate wetting and drying",
    "Smart fertilizer management",
    "Manure Management",
    "Information Use",
    "Heat Stress Management",
    "Stress tolerant varieties",
    "Diversification to legumes",
    "Zero tillage and residues",
    "Precision land leveling",
    "ICT-linked precision water management",
    "ICT-linked precision fertilizer management",
    "ICT-linked precision input management",
    "Nature-based agriculture",
    "Climate-smart agriculture",
    "Insurance",
    "Microclimate modification of the shelter",
    "Modification of shelter",
    "Planting of trees",
    "Bathing",
    "Mechanical cooling",
    "Balanced concentrate with buffer",
    "Mineral mixture supplementation",
    "Bypass protein and fats",
    "Feed additive, antioxidants, vitamins and probiotics",
    "Modification in feeding pattern, schedule, grazing",
    "Inclusion of ad libitum green fodder",
    "Fodder conservation",
    "Ad libitum water",
    "Deworming",
    "Control of ectoparasites and other vectors",
    "Vaccination",
    "Reproductive management: Estrous confirmation and synchronisation",
    "Adoption of climate resilient breeds",
    "Weather forecasts/THI-based advisory services",
    "Livestock insurance",
    "Diversification",
    "Balanced concentrate",
    "Grassland and Silvi-pasture management",
    "Wallowing",
    "Heating management",
    "Fat supplementation",
    "Protein and amino acid supplementation",
    "Feed additive, electrolyte, antioxidants, vitamins and probiotics",
    "Modification in feeding pattern, schedule and space",
    "Parasite control",
    "Thinning of flock",
    "Separation of multi-aged flock",
    "Adoption of climate resilient breed/strain",
    "Modification in feeding pattern, schedule",
    "Deworming against endoparasites",
    "Reproductive management: Use of assisted reproductive technologies",
  ];

  const impact = ["Productivity", "Resilience", "Value of Production"];

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
    "Volumetric Soil Water",
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
    "Fertilizer consumption",
    "Seasonal Rainfall",
    "Maximum Temperature",
    "Minimum Temperature",
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
    "FERTILIZER",
    "seasonalrain",
    "maxtemp",
    "mintemp",
  ];

  function createInitialCrops() {
    const initialTodos = {};
    fullList.forEach((sname) => {
      initialTodos[sname] = sname === Homecrop ? true : false;
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

  const [opt2, setopt2] = React.useState("Precision fertilizer management");
  const [opt3, setopt3] = React.useState("Early sowing/changing planting dates");
  const [opt4, setopt4] = React.useState("ICT linked input management");
  const [opt5, setopt5] = React.useState("Microirrigation");
  const [opt6, setopt6] = React.useState("Zero tillage with residue retention");
  const [opt7, setopt7] = React.useState("Smart fertilizer management");
  const [acc, setacc] = React.useState(false);

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
    haz["DRYSP"] = true;
    return haz;
  }

  function createInitialScenario() {
    const initialTodos = {};
    switchscenarioid.forEach((sname) => {
      initialTodos[sname] = false;
    });
    initialTodos["baseline"] = true;
    return initialTodos;
  }

  const [scenario, setscenario] = React.useState(createInitialScenario);

  const [NameScenario, setNameScenario] = React.useState("Baseline");

  const handleScenarioChange = (name) => (event) => {
    const oldscenario = { ...scenario };
    switchscenarioid.forEach((sname, index) => {
      oldscenario[sname] = sname === name;
      if (sname === name) {
        setNameScenario(switchscenario[index]);
      }
    });
    setscenario(oldscenario);
  };

  const [crop, setCrop] = React.useState(createInitialCrops);

  const [crop2, setCrop2] = React.useState("Rice");
  const [cropid, setCropid] = React.useState("rice");

  const [crop3, setCrop3] = React.useState(createInitialCrops);

  const [option, setOption] = React.useState(IntialOptions);

  const [optionlayer, setOptionLayer] = React.useState({
    "Biophysical Suitability": false,
    "Gender": false,
    "Yield": false,
    "Adaptation Benefits": false,
    "Economic": false,
    "Scalability": false,
  });

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
  const [ImpactName, setImpactName] = React.useState("");

  //without event for three map structure we use dropdowm menu

  const changeImpact_CMP = (name) => {
    const oldimpt = { ...CurrImpact };
    impact.map((sname) => {
      oldimpt[sname] = sname === name;
    });
    setImpact(oldimpt);
    setImpactName(name);
    setOption(IntialOptions);
    setCurrOpt("");
    setOptionLayer({
      ...optionlayer,
      "Biophysical Suitability": false,
      "Adaptation Benefits": false,
      "Economic": false,
      "Scalability": false,
      "Gender": false,
      "Yield": false,
    });
    setRisk(InitialHazard);
    setRiskName("");
  };

  //without event for three map structure we use dropdowm menu

  const handleChange_CMP = (name) => {
    const newState = { ...crop };
    fullList.map((sname, index) => {
      newState[sname] = sname === name;
      if (sname === name) {
        setCurrCrop(Comm[index]);
      }
    });
    setCrop(newState);
    setOption(IntialOptions);
    setCurrOpt("");
    setOptionLayer({
      ...optionlayer,
      "Biophysical Suitability": false,
      "Adaptation Benefits": false,
      "Economic": false,
      "Scalability": false,
      "Gender": false,
      "Yield": false,
    });
    setRisk(InitialHazard);
    setRiskName("");
    setImpact(InitialImpact);
    setImpactName("");
  };

  //without event for three map structure we use dropdowm menu

  const handleChangeOpt_CMP = (name) => {
    const newState = { ...option };
    opt.map((sname) => {
      newState[sname] = sname === name;
      if (sname === name) {
        setCurrOpt(name);
      }
    });
    if (name === "") {
      setCurrOpt("");
    }
    setOptionLayer({
      ...optionlayer,
      "Biophysical Suitability": false,
      "Adaptation Benefits": false,
      "Economic": false,
      "Scalability": false,
      "Gender": false,
      "Yield": false,
    });
    setOption(newState);
    setRisk(InitialHazard);
    setRiskName("");
    setImpact(InitialImpact);
    setImpactName("");
  };

  // with event for switch click event in linear structure

  const changeImpact = (name) => (event) => {
    const oldimpt = { ...CurrImpact };
    impact.map((sname) => {
      oldimpt[sname] = sname === name;
    });
    setImpact(oldimpt);
    setImpactName(name);
    setOption(IntialOptions);
    setCurrOpt("");
    setOptionLayer({
      ...optionlayer,
      "Biophysical Suitability": false,
      "Adaptation Benefits": false,
      "Economic": false,
      "Scalability": false,
      "Gender": false,
      "Yield": false,
    });
    setRisk(InitialHazard);
    setRiskName("");
  };

  const handleChange = (name) => (event) => {
    const newState = { ...crop };
    fullList.map((sname, index) => {
      newState[sname] = sname === name;
      if (sname === name) {
        setCurrCrop(Comm[index]);
      }
    });
    setCrop(newState);
    setOption(IntialOptions);
    setCurrOpt("");
    setOptionLayer({
      ...optionlayer,
      "Biophysical Suitability": false,
      "Adaptation Benefits": false,
      "Economic": false,
      "Scalability": false,
      "Gender": false,
      "Yield": false,
    });
    setRisk(InitialHazard);
    setRiskName("");
    setImpact(InitialImpact);
    setImpactName("");
  };

  const handleChangeSumm = (name) => {
    const newState = { ...crop };
    fullList.map((sname, index) => {
      newState[sname] = sname === name;
      if (sname === name) {
        setCrop2(Comm[index]);
      }
    });
    setCrop3(newState);
    setCropid(name);
  };

  const changeRisk = (name) => {
    const old = { ...CurrRisk };
    switchCombId.forEach((sname, index) => {
      old[sname] = sname === name;
      if (sname === name) {
        setRiskName(Risk[index % Risk.length]);
      }
    });
    if (name === "") {
      setRiskName("");
    }
    setRisk(old);
    setOption(IntialOptions);
    setCurrOpt("");
    setOptionLayer({
      ...optionlayer,
      "Biophysical Suitability": false,
      "Adaptation Benefits": false,
      "Economic": false,
      "Scalability": false,
      "Gender": false,
      "Yield": false,
    });
    setImpact(InitialImpact);
    setImpactName("");
  };

  const changeRiskSumm = (name) => {
    const old = { ...CurrRisk2 };
    switchCombId.forEach((sname) => {
      old[sname] = sname === name;
    });
    setRisk2(old);
  };

  const handleChangeOpt = (name) => (event) => {
    const newState = { ...option };
    opt.map((sname) => {
      newState[sname] = sname === name;
      if (sname === name) {
        setCurrOpt(name);
      }
    });
    if (name === "") {
      setCurrOpt("");
    }
    setOptionLayer({
      ...optionlayer,
      "Biophysical Suitability": false,
      "Adaptation Benefits": false,
      "Economic": false,
      "Scalability": false,
      "Gender": false,
      "Yield": false,
    });
    setOption(newState);
    setRisk(InitialHazard);
    setRiskName("");
    setImpact(InitialImpact);
    setImpactName("");
  };

  const changeOptLayer = (stateinc) => {
    setOptionLayer(stateinc);
  };

  const [optionlayer2, setOptionLayer2] = React.useState("Biophysical Suitability");

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

  const [displayLayer, setDisplayLayer] = React.useState("Absolute");

  const container = useRef(null);
  const [height1, setHeight1] = React.useState(null);

  //Extra
  //Extra
  //Extra

  const [exploreType, setExploreType] = React.useState("Commodity");

  const handleExploreTypeChange = (name) => (event) => {
    setExploreType(name);
  };

  const [vis_scale, setVisScale] = React.useState("Pixel Level");

  const handleVisScaleChange = (name) => (event) => {
    setVisScale(name);
  };

  const [Model, setModel] = React.useState("CHC");

  const handleModelchange = (name) => (event) => {
    setModel(name);
  };

  const [NameModel, setNameModel] = React.useState("CHC");

  //const paperWidth = window.innerWidth * 0.21;
  //const paperWidth2 = window.innerWidth * 0.23;

  React.useEffect(() => {
    if (activeBar === "future2") {
      handleChange("cattle")(null);
    } else {
      handleChange("rice")(null);
    }
    //console.log("Livecheck");
  }, [activeBar]);

  return (
    <div>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          bgcolor: (theme) => theme.palette.background.paper, // Background adapts to theme
        }}
      >
        {(activeBar === "future" || activeBar === "future2" || activeBar === "viewer") && (
          <Selection_bar
            location={activeRegion}
            commodity={Currcrop}
            adaption={CurrOpt}
            exploreType={exploreType}
            RiskName={RiskName}
            scenario={NameScenario}
            ImpactName={ImpactName}
            modelName={Model}
            activeScale={vis_scale}
            activeDrawer={activeBar}
          ></Selection_bar>
        )}

        {(activeBar === "future" || activeBar === "future2") && (
          <CompV
            activeCrop={Currcrop}
            changeCrop={handleChange_CMP}
            LocationData={countryStateMap}
            focus={focus}
            activeRegion={activeRegion}
            changeRegion={ActiveRegionChange}
            CurrRisk={RiskName}
            activeOpt={CurrOpt}
            changeOpt={handleChangeOpt_CMP}
            changeRisk={changeRisk}
            activeImpact={CurrImpact}
            changeImpact={changeImpact_CMP}
            activeScenario={scenario}
            changeScenario={handleScenarioChange}
            area_dict3={area_dict3}
            area_dict4={area_dict4}
            activeOptLayer={optionlayer}
            changeOptLayer={changeOptLayer}
            modelName={Model}
            displayLayer={displayLayer}
            setDisplayLayer={setDisplayLayer}
            activeScale={vis_scale}
            exploreType={exploreType}
          ></CompV>
        )}

        {(activeBar === "future" || activeBar === "future2") && (
          <DrawerV
            activeCrop={crop}
            changeCrop={handleChange}
            LocationData={countryStateMap}
            activeRegion={activeRegion}
            changeRegion={ActiveRegionChange}
            CurrRisk={RiskName}
            activeOpt={option}
            changeOpt={handleChangeOpt}
            changeRisk={changeRisk}
            activeImpact={CurrImpact}
            changeImpact={changeImpact}
            activeScenario={scenario}
            changeScenario={handleScenarioChange}
            activeOptLayer={optionlayer}
            changeOptLayer={changeOptLayer}
            exploreType={exploreType}
            handleExploreTypeChange={handleExploreTypeChange}
            activeModel={Model}
            changeModel={handleModelchange}
            activeScale={vis_scale}
            changeScale={handleVisScaleChange}
            activeDrawer={activeBar}
            CropName={Currcrop}
          ></DrawerV>
        )}

        {activeBar === "timeline" && <ImageTimeline></ImageTimeline>}
        {activeBar === "hazards" && (
          <HazardGlance
            handleChangeSumm={handleChangeSumm}
            cropid={cropid}
            focus2={focus2}
            activeRegion2={activeRegion2}
            ActiveRegionChange2={ActiveRegionChange2}
            crop2={crop2}
            CurrRisk2={CurrRisk2}
            area_data4={area_dict4}
          ></HazardGlance>
        )}

        {activeBar === "adaptation" && <Adaptation_Analytics cropid={cropid} focus2={focus2} activeRegion2={activeRegion2} activeOpt={CurrOpt}></Adaptation_Analytics>}
        {activeBar === "adaptation2" && (
          <Adaptation_Analytics2
            cropid={cropid}
            focus2={focus2}
            activeRegion2={activeRegion2}
            activeOpt={CurrOpt}
            ActiveRegionChange2={ActiveRegionChange2}
            handleChangeSumm={handleChangeSumm}
          ></Adaptation_Analytics2>
        )}

        {activeBar === "summary" && <Summary_Statistics></Summary_Statistics>}

        {activeBar === "comparison" && (
          <CompGif
            activeCrop={Currcrop}
            changeCrop={handleChange_CMP}
            LocationData={countryStateMap}
            focus={focus}
            activeRegion={activeRegion}
            changeRegion={ActiveRegionChange}
            CurrRisk={RiskName}
            activeOpt={CurrOpt}
            changeOpt={handleChangeOpt_CMP}
            changeRisk={changeRisk}
            activeImpact={CurrImpact}
            changeImpact={changeImpact_CMP}
            activeScenario={scenario}
            changeScenario={handleScenarioChange}
            activeOptLayer={optionlayer}
            changeOptLayer={changeOptLayer}
          ></CompGif>
        )}

        {activeBar === "access" && (
          <div
            style={{
              backgroundColor: "#f8f8f8",
              minHeight: "calc(100vh - 90px)",
            }}
          >
            <TabsData activeTab={activeTab}></TabsData>
            <Floating_drawer activeCrop={Currcrop} activeRegion={activeRegion}></Floating_drawer>
          </div>
        )}
        {activeBar === "resources" && (
          <div style={{ minHeight: "calc(100vh - 90px)" }}>
            <ResTabsData></ResTabsData>
          </div>
        )}
        {activeBar === "usecase" && (
          <div>
            <UseCase></UseCase>
          </div>
        )}
        {activeBar === "guide" && (
          <div style={{ minHeight: "calc(100vh - 90px)" }}>
            <Guidee></Guidee>
          </div>
        )}
        {activeBar === "about" && <AboutUs></AboutUs>}
        <div style={{ overflow: "hidden" }}>
          {activeBar === "viewer" && (
            <MApp activeCrop={Currcrop} activeScenario={scenario} focus={focus} activeRegion={activeRegion} activeOpt={CurrOpt} CurrRisk={RiskName} activeImpact={CurrImpact}></MApp>
          )}

          {activeBar === "viewer" && (
            <DrawerV
              activeCrop={crop}
              changeCrop={handleChange}
              LocationData={countryStateMap}
              activeRegion={activeRegion}
              changeRegion={ActiveRegionChange}
              CurrRisk={RiskName}
              activeOpt={option}
              changeOpt={handleChangeOpt}
              changeRisk={changeRisk}
              activeImpact={CurrImpact}
              changeImpact={changeImpact}
              activeScenario={scenario}
              changeScenario={handleScenarioChange}
              activeOptLayer={optionlayer}
              changeOptLayer={changeOptLayer}
            ></DrawerV>
          )}

          {(activeBar === "future" || activeBar === "future2") && NameScenario === "Baseline" && (
            <div ref={container}>
              <LocationCard
                location={activeRegion}
                commodity={Currcrop}
                adaption={CurrOpt}
                activeOptLayer={optionlayer}
                setHeight1={setHeight1}
                RiskName={RiskName}
                scenario="Baseline"
                ImpactName={ImpactName}
                area_data3={area_dict3}
                area_data4={area_dict4}
                exploreType={exploreType}
                displayLayer={displayLayer}
                activeScale={vis_scale}
              ></LocationCard>
            </div>
          )}

          {activeBar === "viewer" && (RiskName !== "" || CurrOpt !== "") && (
            <LegendCard
              location={activeRegion}
              commodity={Currcrop}
              adaption={CurrOpt}
              RiskName={RiskName}
              scenario={NameScenario}
              ImpactName={ImpactName}
              area_data={area_dict}
              area_data2={area_dict2}
            ></LegendCard>
          )}
        </div>
        {activeBar === "analytics" && (
          <AdaptationGlance
            handleChangeSumm={handleChangeSumm}
            handleChangeOptSumm={handleChangeOptSumm}
            handleChangeOptSumm2={handleChangeOptSumm2}
            handleChangeOptSumm3={handleChangeOptSumm3}
            handleChangeOptSumm4={handleChangeOptSumm4}
            handleChangeOptSumm5={handleChangeOptSumm5}
            handleChangeOptSumm6={handleChangeOptSumm6}
            cropid={cropid}
            crop2={crop2}
            crop3={crop3}
            area_data3={area_data3}
            area_data4={area_data4}
            area_dict={area_dict}
            CurrRisk2={CurrRisk2}
            focus2={focus2}
            activeRegion2={activeRegion2}
            ActiveRegionChange2={ActiveRegionChange2}
            opt2={opt2}
            opt3={opt3}
            opt4={opt4}
            opt5={opt5}
            opt6={opt6}
            opt7={opt7}
            changeOptLayer2={changeOptLayer2}
            optionlayer2={optionlayer2}
          ></AdaptationGlance>
        )}
      </Box>
      <Box
        sx={{
          marginTop: "80px",
          width: "100%",
          height: "calc(100vh - 80px)",
          alignItems: "center",
          justifyContent: "center",
          display: { xs: "flex", md: "none" },
        }}
      >
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
