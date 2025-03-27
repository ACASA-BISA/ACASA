import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography, Link } from "@mui/material";
//import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "./LightTooltip";

export default function SwitchOpt({ activeCrop, activeOpt, changeOpt, activeOptLayer, changeOptLayer, exploreType }) {
  const switchh = ["Planting Technology", "Water Management", "Fertilizer Management"];
  const switchh_pulses = ["Planting Technology", "Water Management"];
  const directswitch = ["Stress tolerant variety"];
  const directswitchdown = ["ICT linked input management", "Crop insurance"];

  const planting_rice = [
    "Early sowing/changing planting dates",
    "Precision land levelling",
    "Zero tillage with residue retention",
    "Dry - Direct seeded rice",
    "Wet - Direct seeded rice",
    "System of rice intensification",
  ];
  const planting_rice_popup = [
    "Early sowing/changing planting dates",
    "Precision land levelling",
    "Zero tillage with residue retention",
    "Dry - Direct seeded rice",
    "Wet - Direct seeded rice",
    "System of rice intensification",
  ];

  const water = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Precision water management"];
  const water_popup = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Precision water management"];

  const water_rice = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Alternate wetting and drying", "Precision water management"];
  const water_rice_popup = ["Supplemental irrigation (water harvesting structures/farm ponds)", "Microirrigation", "Alternate wetting and drying", "Precision water management"];

  const fertilizer_rice = ["Smart fertilizer management", "Precision fertilizer management"];
  const fertilizer_rice_popup = ["Smart fertilizer management", "Precision fertilizer management"];

  const planting = ["Early sowing/changing planting dates", "Precision land levelling", "Zero tillage with residue retention", "Broadbed and furrow"];
  const planting_popup = ["Early sowing/changing planting dates", "Precision land levelling", "Zero tillage with residue retention", "Broadbed and furrow"];

  const fertilizer = ["Smart fertilizer management", "Precision fertilizer management"];
  const fertilizer_popup = ["Smart fertilizer management", "Precision fertilizer management"];

  const livestock_names = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
  const livestock = ["Shelter Management", "Feed Management", "Healthcare Management"];

  const marine = ["To be Updated"];

  const livestock_shelter_master = ["Microclimate modification of the shelter", "Modification of shelter", "Planting of trees", "Bathing", "Wallowing", "Heating management", "Mechanical cooling"];
  const livestock_shelter_master_ID = ["MICROMOD", "MOD", "PLANT", "BATH", "WALLOW", "HEATMNGT", "MECHCOOL"];
  const livestock_shelter_master_popup = [
    "Microclimate modification of the shelter",
    "Modification of shelter",
    "Planting of trees",
    "Bathing",
    "Wallowing",
    "Heating management",
    "Mechanical cooling",
  ];

  const livestock_feed_master = [
    "Balanced concentrate with buffer",
    "Balanced concentrate",
    "Mineral mixture supplementation",
    "Bypass protein and fats",
    "Feed additive, antioxidants, vitamins and probiotics",
    "Modification in feeding pattern, schedule, grazing",
    "Inclusion of ad libitum green fodder",
    "Fodder conservation",
    "Ad libitum water",
    "Grassland and Silvi-pasture management",
    "Fat supplementation",
    "Protein and amino acid supplementation",
    "Feed additives, electrolyte, antioxidants, vitamins and probiotics",
    "Modification in feeding pattern, schedule and space",
    "Modification in feeding pattern, schedule",
  ];
  const livestock_feed_master_ID = [
    "BCONCWBUFF",
    "BCONC",
    "MINMIXSUPP",
    "BYPROTEIN&FAT",
    "FEEDADD",
    "MODFEED",
    "ADLIBGREENFODDER",
    "FODDER",
    "ADLIBWATER",
    "GRASS",
    "FATSUPP",
    "PROTEINSUPP",
    "FEEDADDELECTROLYTE",
    "MODFEEDSPACE",
    "MODFEED",
  ];
  const livestock_feed_master_popup = [
    "Balanced concentrate with buffer",
    "Balanced concentrate",
    "Mineral mixture supplementation",
    "Bypass protein and fats",
    "Feed additive, antioxidants, vitamins and probiotics",
    "Modification in feeding pattern, schedule, grazing",
    "Inclusion of ad libitum green fodder",
    "Fodder conservation",
    "Ad libitum water",
    "Grassland and Silvi-pasture management",
    "Fat supplementation",
    "Protein and amino acid supplementation",
    "Feed additives, electrolyte, antioxidants, vitamins and probiotics",
    "Modification in feeding pattern, schedule and space",
    "Modification in feeding pattern, schedule",
  ];

  const livestock_health_master = [
    "Deworming",
    "Deworming against endoparasites",
    "Control of ectoparasites and other vectors",
    "Vaccination",
    "Parasite control",
    "Thinning of flock",
    "Separation of multi-aged flock",
  ];
  const livestock_health_master_ID = ["DEWORM", "DEWORMENDOPARASITE", "CONTROL", "VACC", "PARASITE", "FLOCKTHIN", "FLOCKSEPARATE"];
  const livestock_health_master_popup = [
    "Deworming",
    "Deworming against endoparasites",
    "Control of ectoparasites and other vectors",
    "Vaccination",
    "Parasite control",
    "Thinning of flock",
    "Separation of multi-aged flock",
  ];

  const livestock_standalone = [
    "Reproductive management: Estrous confirmation and synchronisation",
    "Adoption of climate resillient breeds",
    "Adopting climate-resilient breed/strain",
    "Weather forecasts / THI advisory services",
    "Livestock insurance",
    "Diversification",
  ];
  const livestock_standalone_ID = ["REPRODUCTIVE", "ADOPTION", "ADOPTIONSTRAIN", "WEATHER", "INSURANCE", "DIVERSIFY"];

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
  ];

  const Common = [
    "Rice",
    "Wheat",
    "Maize",
    "Barley",
    "Sorghum",
    "Finger Millet",
    "Pearl Millet",
    "Safflower",
    "Sunflower",
    "Rapeseed/Mustard",
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
    "Chicken",
    "Freshwater",
    "Bracklish",
    "Marine",
    "Cold water",
    "Potato",
    "Onion",
    "Tomato",
    "Chillies",
    "Mango",
    "Banana",
  ];

  const RegionalAdaptation = [
    "Stress tolerant varieties",
    "Diversification to legumes",
    "Zero tillage and residues",
    "Precision land leveling",
    "Microirrigation",
    "ICT-linked precision water management",
    "ICT-linked precision fertilizer management",
    "ICT-linked precision input management",
    "Nature-based agriculture",
    "Climate-smart agriculture",
    "Insurance",
  ];

  let cropname = "Rice";
  fullList.forEach((sname, indx) => {
    if (activeCrop[sname] === true) {
      cropname = Common[indx];
    }
  });

  let livestockName = "Cattle";

  function LivestockShelter() {
    let ShelterList = [];
    let lname = "cattle";

    fullList.forEach((comm, id) => {
      if (activeCrop[comm] === true) {
        lname = comm;
        livestockName = Common[id];
      }
    });

    const shelterMapping = {
      cattle: ["MICROMOD", "MOD", "PLANT", "BATH", "MECHCOOL"],
      buffalo: ["MICROMOD", "MOD", "PLANT", "WALLOW", "MECHCOOL"],
      goat: ["MICROMOD", "MOD", "PLANT"],
      sheep: ["MICROMOD", "MOD", "PLANT"],
      pig: ["MICROMOD", "MOD", "PLANT", "WALLOW", "MECHCOOL"],
      poultry: ["MICROMOD", "MOD", "PLANT", "HEATMNGT", "MECHCOOL"],
    };

    ShelterList = shelterMapping[lname] || [];

    return ShelterList;
  }

  const CurrShelter = LivestockShelter();

  function ShelterData() {
    let ShelterNames = [];
    let ShelterDesc = [];

    CurrShelter.forEach((shelterID) => {
      livestock_shelter_master_ID.forEach((sname, index) => {
        if (shelterID === sname) {
          ShelterNames.push(livestock_shelter_master[index]); // Store shelter name
          ShelterDesc.push(livestock_shelter_master_popup[index] || "No description available"); // Store description
        }
      });
    });

    return { ShelterNames, ShelterDesc };
  }

  const { ShelterNames, ShelterDesc } = ShelterData();

  function LivestockFeed() {
    let FeedList = [];
    let lname = "cattle";

    fullList.forEach((comm, id) => {
      if (activeCrop[comm] === true) {
        lname = comm;
        livestockName = Common[id];
      }
    });

    const feedMapping = {
      cattle: ["BCONCWBUFF", "MINMIXSUPP", "BYPROTEIN&FAT", "FEEDADD", "MODFEED", "ADLIBGREENFODDER", "FODDER", "ADLIBWATER"],
      buffalo: ["BCONCWBUFF", "MINMIXSUPP", "BYPROTEIN&FAT", "FEEDADD", "MODFEED", "ADLIBGREENFODDER", "FODDER", "ADLIBWATER"],
      goat: ["BCONC", "MINMIXSUPP", "FEEDADD", "MODFEED", "GRASS", "FODDER", "ADLIBWATER"],
      sheep: ["BCONC", "MINMIXSUPP", "FEEDADD", "MODFEED", "GRASS", "FODDER", "ADLIBWATER"],
      pig: ["BCONCWBUFF", "ADLIBWATER", "MINMIXSUPP", "FEEDADD", "MODFEED"],
      poultry: ["FATSUPP", "PROTEINSUPP", "ADLIBWATER", "FEEDADDELECTROLYTE", "MODFEEDSPACE"],
    };

    FeedList = feedMapping[lname] || [];

    return FeedList;
  }

  const CurrFeed = LivestockFeed();

  function FeedData() {
    let FeedNames = [];
    let FeedDesc = [];

    CurrFeed.forEach((feedID) => {
      livestock_feed_master_ID.forEach((sname, index) => {
        if (feedID === sname) {
          FeedNames.push(livestock_feed_master[index]); // Store feed name
          FeedDesc.push(livestock_feed_master_popup[index] || "No description available"); // Store feed description
        }
      });
    });

    return { FeedNames, FeedDesc };
  }

  const { FeedNames, FeedDesc } = FeedData();

  function LivestockHealth() {
    let HealthList = [];
    let lname = "cattle";

    fullList.forEach((comm, id) => {
      if (activeCrop[comm] === true) {
        lname = comm;
        livestockName = Common[id];
      }
    });

    const healthMapping = {
      cattle: ["DEWORM", "CONTROL", "VACC"],
      buffalo: ["DEWORM", "CONTROL", "VACC"],
      goat: ["DEWORM", "CONTROL", "VACC"],
      sheep: ["DEWORM", "CONTROL", "VACC"],
      pig: ["DEWORMENDOPARASITE", "CONTROL", "VACC"],
      poultry: ["PARASITE", "FLOCKTHIN", "FLOCKSEPARATE", "VACC"],
    };

    HealthList = healthMapping[lname] || [];

    return HealthList;
  }

  const CurrHealth = LivestockHealth();

  function HealthData() {
    let HealthNames = [];
    let HealthDesc = [];

    CurrHealth.forEach((healthID) => {
      livestock_health_master_ID.forEach((sname, index) => {
        if (healthID === sname) {
          HealthNames.push(livestock_health_master[index]); // Store shelter name
          HealthDesc.push(livestock_health_master_popup[index] || "No description available"); // Store description
        }
      });
    });

    return { HealthNames, HealthDesc };
  }

  const { HealthNames, HealthDesc } = HealthData();

  function LivestockStandalone() {
    let StandaloneList = [];
    let lname = "cattle";

    fullList.forEach((comm, id) => {
      if (activeCrop[comm] === true) {
        lname = comm;
        livestockName = Common[id];
      }
    });

    const standaloneMapping = {
      cattle: ["REPRODUCTIVE", "ADOPTION", "WEATHER", "INSURANCE", "DIVERSIFY"],
      buffalo: ["REPRODUCTIVE", "ADOPTION", "WEATHER", "INSURANCE"],
      goat: ["ADOPTION", "WEATHER", "INSURANCE"],
      sheep: ["ADOPTION", "WEATHER", "INSURANCE"],
      pig: ["REPRODUCTIVE", "ADOPTION", "WEATHER", "INSURANCE"],
      poultry: ["ADOPTIONSTRAIN", "WEATHER", "INSURANCE", "DIVERSIFY"],
    };

    StandaloneList = standaloneMapping[lname] || [];

    return StandaloneList;
  }

  const CurrStandalone = LivestockStandalone();

  function StandaloneData() {
    let StandaloneNames = [];

    CurrHealth.forEach((standaloneID) => {
      livestock_standalone_ID.forEach((sname, index) => {
        if (standaloneID === sname) {
          StandaloneNames.push(livestock_standalone[index]); // Store shelter name
        }
      });
    });

    return { StandaloneNames };
  }

  const { StandaloneNames } = StandaloneData();

  /*   const opt2 = ['Weather Services','Laser Land Levelling','Zero Tillage','BBR/FIRB','Early Sowing',
    'DSR (Dry Seed)','DSR (Wet Seed)','SRI','Insurance',
    'Adaptive Varities','Urea Placement','Arid & Semi-Arid','N Fertiliser (RDF)','PNM (Low Tech)',
    'PNM (High Tech)','Microirrigation','Precision WM','Supplimentary Irrigation',
    'Frost Gun','Slow Release Fertilizer','Micro-Environment','Fog/Mist Gun','Mechanical Support',
    'Fertilizer Timing','Shading Canopy','Cooling Canopy']; */

  /*   const fullList = ['rice','wheat','maize','sorghum','fmillet','pmillet',
    'safflower','sunflower','rapeseed','sesame','groundnut',
    'soyabean','chickpea','ppea','bgram','ggram','lentil',
    'cotton','jute','rubber','sugarcane','tea','coconut',
    'cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater',
    'potato','onion','tomato','chilli','mango','banana'];

  function PopulateOptions() {
    const DisableList = {};
    fullList.forEach((sname) => {
        if(activeCrop[sname] && sname === 'rice'){
          opt.map((option,index) => { 
          DisableList[option] = true;
          const list = [10,2,3,5,6,7,8,11,13,14,15,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'wheat'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'maize'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'sorghum'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,16,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
    });
    return DisableList;
  }

  const [DisableList, setDisableList] = React.useState(
    PopulateOptions
  ); */

  function createInitialTodos() {
    const initialTodos = {};
    switchh.forEach((sname) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  }

  function checkcrop() {
    const diffcrop = ["cattle", "buffalo", "goat", "sheep", "pig", "poultry", "freshwater", "bracklish", "marine", "coldwater", "rice"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = false;
      }
    });
    return ans;
  }

  function checknotFish() {
    const fishes = ["freshwater", "bracklish", "marine", "coldwater"];
    let ans = true;
    fishes.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = false;
      }
    });
    return ans;
  }

  function checkpulses() {
    const cropwithoutfertilizer = ["soyabean", "chickpea", "ppea", "groundnut"];
    let ans = false;
    cropwithoutfertilizer.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = true;
      }
    });
    return ans;
  }

  function createInitialLivestockSwitches() {
    const initialTodos = {};
    livestock.forEach((sname) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  }

  const [state, setState] = React.useState(createInitialTodos);

  const [livestockstate, setLivestockState] = React.useState(createInitialLivestockSwitches);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleLivestockChange = (name) => (event) => {
    setLivestockState({ ...livestockstate, [name]: event.target.checked });
  };

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    "width": 32 + padd,
    "height": 14 + padd,
    "padding": padd / 2,
    "display": "flex",

    "& .MuiSwitch-switchBase": {
      "padding": 2 + padd / 2,
      "&.Mui-checked": {
        "transform": "translateX(16px)",
        "color": "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 10,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.10)",
      boxSizing: "border-box",
    },
    "&:hover": {
      "backgroundColor": theme.palette.mode === "dark" ? "#554d38" : "#ffe89c",
      "opacity": 1,
      "borderRadius": 12,
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.7)",
      },
    },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "alignItems": "flex-start",
    "&.Mui-disabled .MuiTypography-body2": {
      color: theme.palette.mode === "dark" ? "#888" : "#E8E8E8",
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard" sx={{ paddingTop: 1, paddingLeft: 3 }}>
      {/*
      {exploreType === "Commodity" && (
        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 1,
            })}
          >
            Select adaptation indicator for {cropname.toLowerCase()}
          </Typography>
        </FormLabel>
      )}
      {exploreType === "Regional" && (
        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 1,
            })}
          >
            Select adaptation indicator
          </Typography>
        </FormLabel>
      )}
      <FormGroup>
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Biophysical Suitability"]}
              name="Biophysical Suitability"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
          label={
            <Typography
              variant="body2"
              align="left"
              sx={{
                peddingLeft: "3px",
                maxWidth: "250px",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
              style={{ wordWrap: "break-word" }}
            >
              Biophysical suitability
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Technical Suitability"]}
              name="Technical Suitability"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
          label={
            <Typography
              variant="body2"
              align="left"
              sx={{
                peddingLeft: "3px",
                maxWidth: "250px",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
              style={{ wordWrap: "break-word" }}
            >
              Adaptation benefits
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Economic"]}
              name="Economic"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
          label={
            <Typography
              variant="body2"
              align="left"
              sx={{
                peddingLeft: "3px",
                maxWidth: "250px",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
              style={{ wordWrap: "break-word" }}
            >
              Economic benefits
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Scalibility"]}
              name="Scalibility"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
          label={
            <Typography
              variant="body2"
              align="left"
              sx={{
                peddingLeft: "3px",
                maxWidth: "250px",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
              style={{ wordWrap: "break-word" }}
            >
              Scalability
            </Typography>
          }
        />
        <CustomFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={activeOptLayer["Gender"]}
              name="Gender"
              onChange={changeOptLayer}
              color="success"
              sx={{ padding: 0, marginLeft: 1, marginRight: "2px" }}
            />
          }
          label={
            <Typography
              variant="body2"
              align="left"
              sx={{
                peddingLeft: "3px",
                maxWidth: "250px",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
              style={{ wordWrap: "break-word" }}
            >
              Gender suitability
            </Typography>
          }
        />
      </FormGroup>
      */}
      {exploreType === "Regional" && (
        <div>
          {" "}
          <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "white" : "black",
                fontWeight: "bold",
                fontSize: 14,
                paddingTop: 1,
              })}
            >
              Select adaptation option
            </Typography>
          </FormLabel>
          <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 1 }}>
            {RegionalAdaptation.map((sname) => (
              <FormGroup>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                  disabled={false}
                  key={sname}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
              </FormGroup>
            ))}
          </FormControl>
        </div>
      )}
      {exploreType === "Commodity" && (
        <div>
          {" "}
          <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "white" : "black",
                fontWeight: "bold",
                fontSize: 14,
                paddingTop: 1,
              })}
            >
              Select adaptation option for {cropname.toLowerCase()}
            </Typography>
          </FormLabel>
          {(checkcrop() === true || activeCrop["rice"] === true) &&
            directswitch.map((sname) => (
              <FormGroup>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                  disabled={false}
                  key={sname}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
              </FormGroup>
            ))}
          {checkcrop() === true &&
            checkpulses() === false &&
            switchh.map((sname1) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={state[sname1]} onChange={handleChange(sname1)} name={sname1} />}
                  key={sname1}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname1.charAt(0).toUpperCase() + sname1.slice(1, 4) + sname1.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {state[sname1] && sname1 === "Planting Technology" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {planting.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{planting_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Fertilizer Management" && checkpulses() === false && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {fertilizer.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{fertilizer_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {water.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {checkcrop() === true &&
            checkpulses() === true &&
            switchh_pulses.map((sname1) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={state[sname1]} onChange={handleChange(sname1)} name={sname1} />}
                  key={sname1}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname1.charAt(0).toUpperCase() + sname1.slice(1, 4) + sname1.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {state[sname1] && sname1 === "Planting Technology" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {planting.map((sname) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {water.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {activeCrop["rice"] === true &&
            switchh.map((sname1) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={state[sname1]} onChange={handleChange(sname1)} name={sname1} />}
                  key={sname1}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname1.charAt(0).toUpperCase() + sname1.slice(1, 4) + sname1.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {state[sname1] && sname1 === "Planting Technology" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {planting_rice.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                paddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{planting_rice_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Fertilizer Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {fertilizer_rice.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{fertilizer_rice_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
                {state[sname1] && sname1 === "Water Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {water_rice.map((sname, idx) => (
                      <FormGroup>
                        <CustomFormControlLabel
                          control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                          disabled={false}
                          key={sname}
                          label={
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{
                                peddingLeft: "3px",
                                maxWidth: "250px",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                              <LightTooltip
                                title={
                                  <>
                                    <span>{water_rice_popup[idx]}</span>
                                    <br />
                                    <Link
                                      href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
                                      target="_blank"
                                      sx={(theme) => ({
                                        color: theme.palette.mode === "dark" ? "black" : "white",
                                        fontWeight: "bold",
                                      })}
                                    >
                                      Read More
                                    </Link>
                                  </>
                                }
                                placement="right"
                                arrow
                              >
                                <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                  <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                </IconButton>
                              </LightTooltip>
                            </Typography>
                          }
                        />
                      </FormGroup>
                    ))}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {(checkcrop() === true || activeCrop["rice"] === true) &&
            directswitchdown.map((sname) => (
              <FormGroup>
                <CustomFormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                  disabled={false}
                  key={sname}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        peddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {sname.charAt(0).toUpperCase() + sname.slice(1, 4) + sname.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
              </FormGroup>
            ))}
          {
            //////////////////////////////
            //////////////////////////////     Livestock switches
            //////////////////////////////
          }
          {checkcrop() === false &&
            activeCrop["rice"] === false &&
            checknotFish() === true &&
            livestock.map((snamelive) => (
              <FormGroup>
                <FormControlLabel
                  control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={livestockstate[snamelive]} onChange={handleLivestockChange(snamelive)} name={snamelive} />}
                  key={snamelive}
                  label={
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        paddingLeft: "3px",
                        maxWidth: "250px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      style={{ wordWrap: "break-word" }}
                    >
                      {snamelive.charAt(0).toUpperCase() + snamelive.slice(1, 4) + snamelive.toLowerCase().slice(4)}
                    </Typography>
                  }
                />
                {livestockstate[snamelive] && snamelive === "Shelter Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {CurrShelter.map((shelterID) => {
                      const index = livestock_shelter_master_ID.indexOf(shelterID); // Get correct index
                      return index !== -1 ? (
                        <FormGroup key={shelterID}>
                          <CustomFormControlLabel
                            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[shelterID]} onChange={changeOpt(shelterID)} name={shelterID} />}
                            label={
                              <Typography
                                variant="body2"
                                align="left"
                                sx={{
                                  paddingLeft: "3px",
                                  maxWidth: "250px",
                                  wordBreak: "break-word",
                                  whiteSpace: "normal",
                                }}
                                style={{ wordWrap: "break-word" }}
                              >
                                {livestock_shelter_master[index]} {/* Corrected Name */}
                                <LightTooltip
                                  title={
                                    <>
                                      <span>{livestock_shelter_master_popup[index]}</span> {/* Corrected Description */}
                                      <br />
                                      <Link
                                        href={`#/resources?tab=2&term=${encodeURIComponent(livestock_shelter_master[index].toLowerCase())}`}
                                        target="_blank"
                                        sx={(theme) => ({
                                          color: theme.palette.mode === "dark" ? "black" : "white",
                                          fontWeight: "bold",
                                        })}
                                      >
                                        Read More
                                      </Link>
                                    </>
                                  }
                                  placement="right"
                                  arrow
                                >
                                  <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                    <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                  </IconButton>
                                </LightTooltip>
                              </Typography>
                            }
                          />
                        </FormGroup>
                      ) : null; // Return null if index is not found (prevents errors)
                    })}
                  </FormControl>
                )}
                {livestockstate[snamelive] && snamelive === "Feed Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {CurrFeed.map((feedID) => {
                      const index = livestock_feed_master_ID.indexOf(feedID); // Get correct index
                      return index !== -1 ? (
                        <FormGroup key={feedID}>
                          <CustomFormControlLabel
                            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[feedID]} onChange={changeOpt(feedID)} name={feedID} />}
                            label={
                              <Typography
                                variant="body2"
                                align="left"
                                sx={{
                                  paddingLeft: "3px",
                                  maxWidth: "250px",
                                  wordBreak: "break-word",
                                  whiteSpace: "normal",
                                }}
                                style={{ wordWrap: "break-word" }}
                              >
                                {livestock_feed_master[index]} {/* Corrected Name */}
                                <LightTooltip
                                  title={
                                    <>
                                      <span>{livestock_feed_master_popup[index]}</span> {/* Corrected Description */}
                                      <br />
                                      <Link
                                        href={`#/resources?tab=2&term=${encodeURIComponent(livestock_feed_master[index].toLowerCase())}`}
                                        target="_blank"
                                        sx={(theme) => ({
                                          color: theme.palette.mode === "dark" ? "black" : "white",
                                          fontWeight: "bold",
                                        })}
                                      >
                                        Read More
                                      </Link>
                                    </>
                                  }
                                  placement="right"
                                  arrow
                                >
                                  <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                    <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                  </IconButton>
                                </LightTooltip>
                              </Typography>
                            }
                          />
                        </FormGroup>
                      ) : null; // Return null if index is not found (prevents errors)
                    })}
                  </FormControl>
                )}
                {livestockstate[snamelive] && snamelive === "Healthcare Management" && (
                  <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
                    {CurrHealth.map((healthID) => {
                      const index = livestock_health_master_ID.indexOf(healthID); // Get correct index
                      return index !== -1 ? (
                        <FormGroup key={healthID}>
                          <CustomFormControlLabel
                            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[healthID]} onChange={changeOpt(healthID)} name={healthID} />}
                            label={
                              <Typography
                                variant="body2"
                                align="left"
                                sx={{
                                  paddingLeft: "3px",
                                  maxWidth: "250px",
                                  wordBreak: "break-word",
                                  whiteSpace: "normal",
                                }}
                                style={{ wordWrap: "break-word" }}
                              >
                                {livestock_health_master[index]} {/* Corrected Name */}
                                <LightTooltip
                                  title={
                                    <>
                                      <span>{livestock_health_master_popup[index]}</span> {/* Corrected Description */}
                                      <br />
                                      <Link
                                        href={`#/resources?tab=2&term=${encodeURIComponent(livestock_health_master[index].toLowerCase())}`}
                                        target="_blank"
                                        sx={(theme) => ({
                                          color: theme.palette.mode === "dark" ? "black" : "white",
                                          fontWeight: "bold",
                                        })}
                                      >
                                        Read More
                                      </Link>
                                    </>
                                  }
                                  placement="right"
                                  arrow
                                >
                                  <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                                    <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                                  </IconButton>
                                </LightTooltip>
                              </Typography>
                            }
                          />
                        </FormGroup>
                      ) : null; // Return null if index is not found (prevents errors)
                    })}
                  </FormControl>
                )}
              </FormGroup>
            ))}
          {checkcrop() === false &&
            activeCrop["rice"] === false &&
            checknotFish() === true &&
            CurrStandalone.map((sname) => {
              const index = livestock_standalone_ID.indexOf(sname); // Find index of the code
              const fullName = index !== -1 ? livestock_standalone[index] : sname; // Get full name or fallback

              return (
                <FormGroup key={sname}>
                  <CustomFormControlLabel
                    control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeOpt[sname]} onChange={changeOpt(sname)} name={sname} />}
                    disabled={false}
                    label={
                      <Typography
                        variant="body2"
                        align="left"
                        sx={{
                          paddingLeft: "3px",
                          maxWidth: "250px",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                        style={{ wordWrap: "break-word" }}
                      >
                        {fullName}
                      </Typography>
                    }
                  />
                </FormGroup>
              );
            })}
          {checkcrop() === false &&
            activeCrop["rice"] === false &&
            checknotFish() === false &&
            marine.map((sname) => (
              <div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  To be updated
                </Box>
              </div>
            ))}
        </div>
      )}
    </FormControl>
  );
}
