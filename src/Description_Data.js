import * as React from "react";
import { Paper, Button, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, TextField, InputAdornment, Menu, ListSubheader } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

// Importing the DataCatalog function to create card components
import { DataCatalog } from "./Data_Catalog/Data_Catalog";
// Import JSZip as grouped downloads require zipping
import JSZip from "jszip";
import { create } from "ol/transform";
import { disable } from "ol/rotationconstraint";

// Mapping for different layer types
const layerMappings = {
  // Mapping of adaptation MenuItems to codes
  optcode: {
    "Stress tolerant variety": "ADVAR",
    "Early sowing/changing planting dates": "ADPTI",
    "Precision land levelling": "LASLV",
    "Zero tillage with residue retention": "ZTILL",
    "Broadbed and furrow": "BBFIB",
    "Dry - Direct seeded rice": "DSDRY",
    "Wet - Direct seeded rice": "DSWET",
    "System of rice intensification": "SRIUT",
    "Supplemental irrigation (water harvesting structures/farm ponds)": "WHSRC",
    "Microirrigation": "MICIR",
    "Precision water management": "PWMGT",
    "Precision fertilizer management": "PNMLT",
    "Precision fertilizer management - High tech": "PNMHT",
    "Deep Placement of Urea": "DR",
    "ICT linked input management": "WEAGA",
    "Crop insurance": "INSUR",
    "Land Management": "LMGT",
    "Feed Management": "FMGT",
    "Herd Management": "HMGT",
    "Animal Health": "ANHLT",
    "Animal Productivity": "ANPRO",
    "Mulching": "MULCH",
    "Alternate wetting and drying": "AWD",
    "Smart fertilizer management": "FRT",
    "Manure Management": "MNMGT",
    "Information Use": "INFO",
    "Heat Stress Management": "HSMGT",

    // Newly added entries
    /*"Micro climate modification-sheds": "Shelter1",
    "Modification of shelter": "Shelter2",
    "Planting of trees": "Shelter3",
    "Heating management": "Shelter4",
    "Mechanical cooling": "Shelter5",
    "Modify sheds, planting trees, bathing, and mechanical cooling, wallowing": "Shelter6",
    "Modify shelters": "Shelter7",
    "Shelter for natural hazards": "Shelter8",
    "Modify sheds, planting trees, ventilation, roof height": "Shelter9",
    "Modify sheds, planting trees, bathing, and mechanical cooling": "Shelter10",

    "Fat supplementation": "Feed1",
    "Protein and amino acid supplementation": "Feed2",
    "Ad lib water": "Feed3",
    "Feed additives, electrolyte, antioxidants, vitamins and probiotics": "Feed4",
    "Modification in feeding pattern, schedule and space": "Feed5",
    "Balanced concentrate with buffer, feed additives, antioxidants, vitamins and probiotics": "Feed6",
    "Mineral mixture supplementation": "Feed7",
    "Modification in feeding pattern, schedule": "Feed8",
    "Mineral mixture supplementation, bypass proteins and fats": "Feed9",
    "Modification in feeding pattern, schedule, grazing": "Feed10",
    "Grassland and Silvi-pasture management": "Feed11",
    "Fodder conservation": "Feed12",
    "Inclusion of green fodder": "Feed13",

    "Parasite control": "Health1",
    "Thinning of flock": "Health2",
    "Vaccination": "Health3",
    "Deworming": "Health4",
    "Control of ectoparasites and other vectors": "Health5",

    "Adoption of climate resilient breed/strain": "Resilient1",
    "Adoption of climate resilient breeds": "Resilient2",

    "Reproductive management: Use of ART tools": "Reproductivemngt1",
    "Reproductive management: Estrous confirmation and synchronisation": "Reproductivemngt2",

    "Climate information services and safety nets": "Safetynet",
    "Diversification": "Diversify",*/

    "Micro climate": "Micro climate",
    "For natural hazards": "For natural hazards",
    "Planting trees": "Planting trees",
    "Heating management": "Heating management",
    "Mechanical cooling": "Mechanical cooling",
    "Modify sheds and bathing": "Modify sheds and bathing",
    "For cold stress": "For cold stress",
    "Modify sheds": "Modify sheds",

    "Fat supplementation": "Fat supplementation",
    "Protein supplementation": "Protein supplementation",
    "Ad lib water": "Ad lib water",
    "Feed additives": "Feed additives",
    "Feeding pattern change": "Feeding pattern change",
    "Balanced concentrate": "Balanced concentrate",
    "Mineral mixture": "Mineral mixture",
    "Change feeding and grazing pattern": "Change feeding and grazing pattern",
    "Grassland and Silvi-pasture management": "Grassland and Silvi-pasture management",
    "Fodder conservation": "Fodder conservation",
    "Green fodder": "Green fodder",

    "Parasite control": "Parasite control",
    "Thinning of flock": "Thinning of flock",
    "Vaccination": "Vaccination",
    "Deworming": "Deworming",
    "Control of vectors": "Control of vectors",

    "Climate resilient breed": "Climate resilient breed",

    "ART tools": "ART tools",
    "Estrous confirmation and synchronisation": "Estrous confirmation and synchronisation",

    "Climate information": "Climate information",
    "Diversification": "Diversification",
  },

  // Mapping of hazard names to descriptions
  hazardname: {
    "District Level": "District Level",
    "Downscaled Risk": "Downscaled Risk",
    "Risk Index": "Risk index",
    "Hazard Index": "Hazard Index",
    "Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
    "Low temperature induced pollen sterility": "Low temperature induced pollen sterility",
    "High temperature induced pollen sterility": "High temperature induced pollen sterility",
    "Heat Stress": "Heat stress",
    "High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
    "Cold Stress": "Cold stress",
    "Low temperature induced tuberization failure": "Low temperature induced tuberization failure",
    "Untimely Rainfall": "Untimely rainfall",
    "Terminal Heat": "Terminal heat",
    "Days of Frost": "Days of frost",
    "Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
    "Delayed Monsoon": "Delayed monsoon",
    "Crop water deficit index": "Crop water deficit index",
    "Dry Spell": "Number of dry spells",
    "Flood": "Flood",
    "Soil Organic Carbon": "Soil organic carbon",
    "Lodging": "Rain and wind causing lodging",
    "Biotic": "High humidity and temperature for blight",
    "Irrigation": "Irrigation",
    "Volumetric Soil Water": "Water holding capacity",
    "Income": "Agricultural GDP",
    "Access to Credit": "Access to Credit",
    "Access to Market": "Access to Market",
    "Elevation": "Elevation",
    "Access to Knowledge": "Access to Knowledge",
    "Exposure Index": "Exposure Index",
    "Number of Farmers": "Number of Farmers",
    "Cropped Area": "Extent",
    "Excess Rainfall": "Excess rainfall",
    "Number of Animals per grid": "Number of animals per grid",
    "Cold stress in reproductive stage": "Cold stress in reproductive stage",
    "Heat stress in reproductive stage": "Heat stress in reproductive stage",
    "Heat stress during boll formation": "Heat stress during boll formation",
    "Cold stress during flowering": "Cold stress during flowering",
    "High tempearture during flowering": "High tempearture during flowering",
    "Biotic Stress": "Biotic stress",
    "Vulnerability Index": "Vulnerability Index",
    "Feed/Fodder": "Residue",
    "Rural infrastructure": "Rural Infra",
    "Cyclone": "Cyclone",
    "Rainfall Deficit": "Rainfall deficit",
    "Extreme Rainfall days": "Extreme Rainfall Days",
    "Cold days": "Cold Stress",
    "Hot days": "Heat stress or hot days",
    "Temperature-Humidity Index": "THI",
    "Socio-economic Development Indicator": "Human development index",
  },
};

//Function to create a data row for the tables
function createData(Commodity, Scenario, LayerType, Title, Description, Source, Action) {
  return { Commodity, Scenario, LayerType, Title, Description, Source, Action };
}

// Hazard data
const data = [
  // Hazard data
  /*createData(
    "Rice",
    "Baseline",
    "Hazard",
    "High temperature induced spikelet sterility",
    "High temperature stress leads to spikelet sterility (55 to 65 days after transplanting/upland direct seeded need to be corrected by adding 30 days) where Tday > 37",
    "http://data.chc.ucsb.edu/products/CHIRTSdaily/",
    "Download"
  ),
  createData("Rice", "Baseline", "Hazard", "Heat Stress", "High temperature stress during entire life cycle where Tmax > 43", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  createData(
    "Rice",
    "Baseline",
    "Hazard",
    "Low temperature induced spikelet sterility",
    "Low temperature stress leads to spikelet sterility (55 to 65 days after transplanting/upland direct seeded need to be corrected by adding 30 days) where Tmin < 15",
    "https://global-flood-database.cloudtostreet.info/",
    "Download"
  ),*/

  // BASELINE HAZARD

  createData("Rice", "Baseline", "Hazard", "Heat Stress", "", "", "Download"),
  createData("Rice", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Rice", "Baseline", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Rice", "Baseline", "Hazard", "Delayed monsoon", "Number of events of delayed monsoon where delay is more than 15 days", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  createData("Rice", "Baseline", "Hazard", "Crop water deficit index", "SPI below -1 (moderate and severe drought)", "http://data.chc.ucsb.edu/products/CHIRTSdaily/", "Download"),
  createData("Rice", "Baseline", "Hazard", "Dry spell", "Number of dry spells with length of 15 days or more in a season", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  /*createData("Rice", "Baseline", "Hazard", "Flood", "Flood layer", "https://www.chc.ucsb.edu/data/chirps", "Download"),*/
  createData(
    "Wheat",
    "Baseline",
    "Hazard",
    "High temperature induced pollen sterility",
    "High temperature during pollination: Tday > 28 for two days",
    "http://data.chc.ucsb.edu/products/CHIRTSdaily/",
    "Download"
  ),
  createData(
    "Wheat",
    "Baseline",
    "Hazard",
    "Terminal heat",
    "GDD concept (degrees above normal GDD) [tbase=8 degrees] during grain filling",
    "http://data.chc.ucsb.edu/products/CHIRTSdaily/",
    "Download"
  ),
  createData("Wheat", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Wheat", "Baseline", "Hazard", "Untimely rainfall", "Whole season consecutive two-day rainfall > 100 mm ", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  createData("Wheat", "Baseline", "Hazard", "Crop water deficit index", "Sept/Oct/Nov and season drought", "http://data.chc.ucsb.edu/products/CHIRTSdaily/", "Download"),
  createData("Wheat", "Baseline", "Hazard", "Days of frost", "Minimum temperature less than zero degree for more than three days", "https://www.chc.ucsb.edu/data/chirps", "Download"),

  createData("Maize", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Maize", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Maize", "Baseline", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Maize", "Baseline", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Maize", "Baseline", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Maize", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Maize", "Baseline", "Hazard", "Dry spell", "", "", "Download"),
  createData("Maize", "Baseline", "Hazard", "Flood", "", "", "Download"),

  createData("Barley", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Barley", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Barley", "Baseline", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Barley", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Barley", "Baseline", "Hazard", "Days of frost", "", "", "Download"),

  createData("Millets", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Millets", "Baseline", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Millets", "Baseline", "Hazard", "Dry spell", "", "", "Download"),
  createData("Millets", "Baseline", "Hazard", "Flood", "", "", "Download"),
  createData("Millets", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Millets", "Baseline", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Millets", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),

  createData("Lentil", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Lentil", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Lentil", "Baseline", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Lentil", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Lentil", "Baseline", "Hazard", "Days of frost", "", "", "Download"),

  createData("Mustard", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Mustard", "Baseline", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Mustard", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Mustard", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Mustard", "Baseline", "Hazard", "Days of frost", "", "", "Download"),

  createData("Potato", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Potato", "Baseline", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Potato", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Potato", "Baseline", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Potato", "Baseline", "Hazard", "Days of frost", "", "", "Download"),

  createData("Cotton", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Cotton", "Baseline", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Cotton", "Baseline", "Hazard", "Dry spell", "", "", "Download"),
  /*createData("Cotton", "Baseline", "Hazard", "Flood", "", "", "Download"),*/
  createData("Cotton", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Cotton", "Baseline", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Cotton", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),

  createData("Jute", "Baseline", "Hazard", "Heat stress", "", "", "Download"),
  createData("Jute", "Baseline", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Jute", "Baseline", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Jute", "Baseline", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Jute", "Baseline", "Hazard", "Dry spell", "", "", "Download"),
  createData("Jute", "Baseline", "Hazard", "Delayed monsoon", "", "", "Download"),

  createData("Cattle", "Baseline", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Cattle", "Baseline", "Hazard", "Cold stress", "", "", "Download"),
  createData("Cattle", "Baseline", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Cattle", "Baseline", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Cattle", "Baseline", "Hazard", "Flood", "", "", "Download"),
  createData("Cattle", "Baseline", "Hazard", "Cyclone", "", "", "Download"),

  createData("Buffalo", "Baseline", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Buffalo", "Baseline", "Hazard", "Cold stress", "", "", "Download"),
  createData("Buffalo", "Baseline", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Buffalo", "Baseline", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Buffalo", "Baseline", "Hazard", "Flood", "", "", "Download"),
  createData("Buffalo", "Baseline", "Hazard", "Cyclone", "", "", "Download"),

  createData("Goat", "Baseline", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Goat", "Baseline", "Hazard", "Cold stress", "", "", "Download"),
  createData("Goat", "Baseline", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Goat", "Baseline", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Goat", "Baseline", "Hazard", "Flood", "", "", "Download"),
  createData("Goat", "Baseline", "Hazard", "Cyclone", "", "", "Download"),

  createData("Sheep", "Baseline", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Sheep", "Baseline", "Hazard", "Cold stress", "", "", "Download"),
  createData("Sheep", "Baseline", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Sheep", "Baseline", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Sheep", "Baseline", "Hazard", "Flood", "", "", "Download"),
  createData("Sheep", "Baseline", "Hazard", "Cyclone", "", "", "Download"),

  createData("Pig", "Baseline", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Cold stress", "", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Flood", "", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Cyclone", "", "", "Download"),

  createData("Chicken", "Baseline", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Chicken", "Baseline", "Hazard", "Cold stress", "", "", "Download"),
  createData("Chicken", "Baseline", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Chicken", "Baseline", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Chicken", "Baseline", "Hazard", "Flood", "", "", "Download"),
  createData("Chicken", "Baseline", "Hazard", "Cyclone", "", "", "Download"),

  // SSP245 HAZARD

  createData("Rice", "SSP245", "Hazard", "Heat Stress", "", "", "Download"),
  createData("Rice", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Rice", "SSP245", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Rice", "SSP245", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Rice", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Rice", "SSP245", "Hazard", "Dry spell", "", "", "Download"),

  createData("Wheat", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Wheat", "SSP245", "Hazard", "Terminal heat", "", "", "Download"),
  createData("Wheat", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Wheat", "SSP245", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Wheat", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Wheat", "SSP245", "Hazard", "Days of frost", "", "", "Download"),

  createData("Maize", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Maize", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Maize", "SSP245", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Maize", "SSP245", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Maize", "SSP245", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Maize", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Maize", "SSP245", "Hazard", "Dry spell", "", "", "Download"),
  createData("Maize", "SSP245", "Hazard", "Flood", "", "", "Download"),

  createData("Barley", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Barley", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Barley", "SSP245", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Barley", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Barley", "SSP245", "Hazard", "Days of frost", "", "", "Download"),

  createData("Millets", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Millets", "SSP245", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Millets", "SSP245", "Hazard", "Dry spell", "", "", "Download"),
  createData("Millets", "SSP245", "Hazard", "Flood", "", "", "Download"),
  createData("Millets", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Millets", "SSP245", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Millets", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),

  createData("Lentil", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Lentil", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Lentil", "SSP245", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Lentil", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Lentil", "SSP245", "Hazard", "Days of frost", "", "", "Download"),

  createData("Mustard", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Mustard", "SSP245", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Mustard", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Mustard", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Mustard", "SSP245", "Hazard", "Days of frost", "", "", "Download"),

  createData("Potato", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Potato", "SSP245", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Potato", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Potato", "SSP245", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Potato", "SSP245", "Hazard", "Days of frost", "", "", "Download"),

  createData("Cotton", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Cotton", "SSP245", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Cotton", "SSP245", "Hazard", "Dry spell", "", "", "Download"),
  createData("Cotton", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Cotton", "SSP245", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Cotton", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),

  createData("Jute", "SSP245", "Hazard", "Heat stress", "", "", "Download"),
  createData("Jute", "SSP245", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Jute", "SSP245", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Jute", "SSP245", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Jute", "SSP245", "Hazard", "Dry spell", "", "", "Download"),
  createData("Jute", "SSP245", "Hazard", "Delayed monsoon", "", "", "Download"),

  createData("Cattle", "SSP245", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Cattle", "SSP245", "Hazard", "Cold stress", "", "", "Download"),
  createData("Cattle", "SSP245", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Cattle", "SSP245", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Cattle", "SSP245", "Hazard", "Flood", "", "", "Download"),
  createData("Cattle", "SSP245", "Hazard", "Cyclone", "", "", "Download"),

  createData("Buffalo", "SSP245", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Buffalo", "SSP245", "Hazard", "Cold stress", "", "", "Download"),
  createData("Buffalo", "SSP245", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Buffalo", "SSP245", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Buffalo", "SSP245", "Hazard", "Flood", "", "", "Download"),
  createData("Buffalo", "SSP245", "Hazard", "Cyclone", "", "", "Download"),

  createData("Goat", "SSP245", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Goat", "SSP245", "Hazard", "Cold stress", "", "", "Download"),
  createData("Goat", "SSP245", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Goat", "SSP245", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Goat", "SSP245", "Hazard", "Flood", "", "", "Download"),
  createData("Goat", "SSP245", "Hazard", "Cyclone", "", "", "Download"),

  createData("Sheep", "SSP245", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Sheep", "SSP245", "Hazard", "Cold stress", "", "", "Download"),
  createData("Sheep", "SSP245", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Sheep", "SSP245", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Sheep", "SSP245", "Hazard", "Flood", "", "", "Download"),
  createData("Sheep", "SSP245", "Hazard", "Cyclone", "", "", "Download"),

  createData("Pig", "SSP245", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Pig", "SSP245", "Hazard", "Cold stress", "", "", "Download"),
  createData("Pig", "SSP245", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Pig", "SSP245", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Pig", "SSP245", "Hazard", "Flood", "", "", "Download"),
  createData("Pig", "SSP245", "Hazard", "Cyclone", "", "", "Download"),

  createData("Chicken", "SSP245", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Chicken", "SSP245", "Hazard", "Cold stress", "", "", "Download"),
  createData("Chicken", "SSP245", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Chicken", "SSP245", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Chicken", "SSP245", "Hazard", "Flood", "", "", "Download"),
  createData("Chicken", "SSP245", "Hazard", "Cyclone", "", "", "Download"),

  // SSP585 HAZARD

  createData("Rice", "SSP585", "Hazard", "Heat Stress", "", "", "Download"),
  createData("Rice", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Rice", "SSP585", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Rice", "SSP585", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Rice", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Rice", "SSP585", "Hazard", "Dry spell", "", "", "Download"),
  
  createData("Wheat", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Wheat", "SSP585", "Hazard", "Terminal heat", "", "", "Download"),
  createData("Wheat", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Wheat", "SSP585", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Wheat", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Wheat", "SSP585", "Hazard", "Days of frost", "", "", "Download"),

  createData("Maize", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Maize", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Maize", "SSP585", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Maize", "SSP585", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Maize", "SSP585", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Maize", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Maize", "SSP585", "Hazard", "Dry spell", "", "", "Download"),
  createData("Maize", "SSP585", "Hazard", "Flood", "", "", "Download"),

  createData("Barley", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Barley", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Barley", "SSP585", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Barley", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Barley", "SSP585", "Hazard", "Days of frost", "", "", "Download"),

  createData("Millets", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Millets", "SSP585", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Millets", "SSP585", "Hazard", "Dry spell", "", "", "Download"),
  createData("Millets", "SSP585", "Hazard", "Flood", "", "", "Download"),
  createData("Millets", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Millets", "SSP585", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Millets", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),

  createData("Lentil", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Lentil", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Lentil", "SSP585", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Lentil", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Lentil", "SSP585", "Hazard", "Days of frost", "", "", "Download"),

  createData("Mustard", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Mustard", "SSP585", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Mustard", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Mustard", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Mustard", "SSP585", "Hazard", "Days of frost", "", "", "Download"),

  createData("Potato", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Potato", "SSP585", "Hazard", "Untimely rainfall", "", "", "Download"),
  createData("Potato", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Potato", "SSP585", "Hazard", "Low temperature induced pollen sterility", "", "", "Download"),
  createData("Potato", "SSP585", "Hazard", "Days of frost", "", "", "Download"),

  createData("Cotton", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Cotton", "SSP585", "Hazard", "Delayed monsoon", "", "", "Download"),
  createData("Cotton", "SSP585", "Hazard", "Dry spell", "", "", "Download"),
  createData("Cotton", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Cotton", "SSP585", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Cotton", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),

  createData("Jute", "SSP585", "Hazard", "Heat stress", "", "", "Download"),
  createData("Jute", "SSP585", "Hazard", "High temperature induced pollen sterility", "", "", "Download"),
  createData("Jute", "SSP585", "Hazard", "Excess rainfall and waterlogging", "", "", "Download"),
  createData("Jute", "SSP585", "Hazard", "Crop water deficit index", "", "", "Download"),
  createData("Jute", "SSP585", "Hazard", "Dry spell", "", "", "Download"),
  createData("Jute", "SSP585", "Hazard", "Delayed monsoon", "", "", "Download"),

  createData("Cattle", "SSP585", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Cattle", "SSP585", "Hazard", "Cold stress", "", "", "Download"),
  createData("Cattle", "SSP585", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Cattle", "SSP585", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Cattle", "SSP585", "Hazard", "Flood", "", "", "Download"),
  createData("Cattle", "SSP585", "Hazard", "Cyclone", "", "", "Download"),

  createData("Buffalo", "SSP585", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Buffalo", "SSP585", "Hazard", "Cold stress", "", "", "Download"),
  createData("Buffalo", "SSP585", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Buffalo", "SSP585", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Buffalo", "SSP585", "Hazard", "Flood", "", "", "Download"),
  createData("Buffalo", "SSP585", "Hazard", "Cyclone", "", "", "Download"),

  createData("Goat", "SSP585", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Goat", "SSP585", "Hazard", "Cold stress", "", "", "Download"),
  createData("Goat", "SSP585", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Goat", "SSP585", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Goat", "SSP585", "Hazard", "Flood", "", "", "Download"),
  createData("Goat", "SSP585", "Hazard", "Cyclone", "", "", "Download"),

  createData("Sheep", "SSP585", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Sheep", "SSP585", "Hazard", "Cold stress", "", "", "Download"),
  createData("Sheep", "SSP585", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Sheep", "SSP585", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Sheep", "SSP585", "Hazard", "Flood", "", "", "Download"),
  createData("Sheep", "SSP585", "Hazard", "Cyclone", "", "", "Download"),

  createData("Pig", "SSP585", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Pig", "SSP585", "Hazard", "Cold stress", "", "", "Download"),
  createData("Pig", "SSP585", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Pig", "SSP585", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Pig", "SSP585", "Hazard", "Flood", "", "", "Download"),
  createData("Pig", "SSP585", "Hazard", "Cyclone", "", "", "Download"),

  createData("Chicken", "SSP585", "Hazard", "Temperature-humidity index", "", "", "Download"),
  createData("Chicken", "SSP585", "Hazard", "Cold stress", "", "", "Download"),
  createData("Chicken", "SSP585", "Hazard", "Excess rainfall", "", "", "Download"),
  createData("Chicken", "SSP585", "Hazard", "Rainfall deficit", "", "", "Download"),
  createData("Chicken", "SSP585", "Hazard", "Flood", "", "", "Download"),
  createData("Chicken", "SSP585", "Hazard", "Cyclone", "", "", "Download"),

  /*createData("Wheat", "Baseline", "Hazard", "Lodging", "Windspeed and rainfall criteria after booting (85 to 115 days)", "http://data.chc.ucsb.edu/products/CHIRTSdaily/", "Download"),
  createData("Pig", "Baseline", "Hazard", "Temperature-Humidity Index (THI)", "The average number of days when THI exceeds a threshold (79)", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Heat wave", "Sudden change in temperature by 4°C (during APR to June/July)", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Cold stress", "Lower critical temperature (LCT)  limit for the thermoneutral zone goes below (15) degrees C", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Extreme rainfall days", "The average number of days when daily rainfall exceeds 115 mm", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Rainfall deficit", "Meteorological drought in any area occurs when the rainfall deficiency is more than 26% of its long-term average", "", "Download"),
  createData(
    "Pig",
    "Baseline",
    "Hazard",
    "Cyclone proneness",
    "This layer represents the cyclone hazard in terms of classes, with one denoting low hazard and 5 denoting very high hazard. These classes were developed using the cyclone-prone district information for India sourced from the NDMA report and Abdul Awal 2015 for Bangladesh",
    "",
    "Download"
  ),
  createData(
    "Pig",
    "Baseline",
    "Hazard",
    "Flood events",
    "We used flood event data from the Global Flood Database, documented by the Dartmouth Flood Observatory (DFO) from 2000 to 2018. We computed the average annual count of flood events per pixel to represent the flood hazard",
    "",
    "Download"
  ),*/

  // Risk data
  /*createData("Rice", "Baseline", "Risk", "Downscaled risk", "Analyzed", "Crop statistics, crop mask and primary productivity", "Download"),
  createData("Rice", "Baseline", "Risk", "Insurance", "Analyzed", "Heurisitic Model", "Download"),*/

  // Exposure data
  createData("Rice", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Wheat", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Maize", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Barley", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Millets", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Chickpea", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Pigeonpea", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Lentil", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Soybean", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Mustard", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Groundnut", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Cotton", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Jute", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Potato", "Baseline", "Exposure", "Cropped area", "", "", "Download"),
  createData("Buffalo", "Baseline", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Goat", "Baseline", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Sheep", "Baseline", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Pig", "Baseline", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Chicken", "Baseline", "Exposure", "Number of animals per grid", "", "", "Download"),

  createData("Rice", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Wheat", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Maize", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Barley", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Millets", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Chickpea", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Pigeonpea", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Lentil", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Soybean", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Mustard", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Groundnut", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Cotton", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Jute", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Potato", "SSP245", "Exposure", "Cropped area", "", "", "Download"),
  createData("Buffalo", "SSP245", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Goat", "SSP245", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Sheep", "SSP245", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Pig", "SSP245", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Chicken", "SSP245", "Exposure", "Number of animals per grid", "", "", "Download"),

  createData("Rice", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Wheat", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Maize", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Barley", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Millets", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Chickpea", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Pigeonpea", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Lentil", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Soybean", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Mustard", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Groundnut", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Cotton", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Jute", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Potato", "SSP585", "Exposure", "Cropped area", "", "", "Download"),
  createData("Buffalo", "SSP585", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Goat", "SSP585", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Sheep", "SSP585", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Pig", "SSP585", "Exposure", "Number of animals per grid", "", "", "Download"),
  createData("Chicken", "SSP585", "Exposure", "Number of animals per grid", "", "", "Download"),

  /* -------------------------------- Vulnerability data -------------------------------- */
  // Baseline

  createData("Rice", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Rice", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Rice", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Rice", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Rice", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Wheat", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Wheat", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Wheat", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Wheat", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Wheat", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Maize", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Maize", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Maize", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Maize", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Maize", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Barley", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Barley", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Barley", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Barley", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Barley", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Millets", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Millets", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Millets", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Millets", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Millets", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Chickpea", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Chickpea", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Chickpea", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Chickpea", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Chickpea", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Pigeopea", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Pigeonpea", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Pigeonpea", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Pigeonpea", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Pigeonpea", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Lentil", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Lentil", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Lentil", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Lentil", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Lentil", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Soybean", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Soybean", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Soybean", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("soybean", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Soybean", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Mustard", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Mustard", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Mustard", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Mustard", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Mustard", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Groundnut", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Groundnut", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Groundnut", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Grountnut", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Groundnut", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  
  createData("Cotton", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Cotton", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Cotton", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Cotton", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Cotton", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Jute", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Jute", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Jute", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Jute", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Jute", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Potato", "Baseline", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Potato", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Potato", "Baseline", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Potato", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Potato", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Cattle", "Baseline", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Cattle", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Cattle", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Cattle", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Buffalo", "Baseline", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Buffalo", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Buffalo", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Buffalo", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Goat", "Baseline", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Goat", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Goat", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Goat", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Sheep", "Baseline", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Sheep", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Sheep", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Sheep", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Pig", "Baseline", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Pig", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Pig", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Pig", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Chicken", "Baseline", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Chicken", "Baseline", "Vulnerability", "Income", "", "", "Download"),
  createData("Chicken", "Baseline", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Chicken", "Baseline", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  // SSP245

  createData("Rice", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Rice", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Rice", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Rice", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Rice", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Wheat", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Wheat", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Wheat", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Wheat", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Wheat", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Maize", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Maize", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Maize", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Maize", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Maize", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Barley", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Barley", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Barley", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Barley", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Barley", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Millets", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Millets", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Millets", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Millets", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Millets", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Chickpea", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Chickpea", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Chickpea", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Chickpea", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Chickpea", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Pigeopea", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Pigeonpea", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Pigeonpea", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Pigeonpea", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Pigeonpea", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Lentil", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Lentil", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Lentil", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Lentil", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Lentil", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Soybean", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Soybean", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Soybean", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("soybean", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Soybean", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Mustard", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Mustard", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Mustard", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Mustard", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Mustard", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Groundnut", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Groundnut", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Groundnut", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Grountnut", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Groundnut", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  
  createData("Cotton", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Cotton", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Cotton", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Cotton", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Cotton", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Jute", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Jute", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Jute", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Jute", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Jute", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Potato", "SSP245", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Potato", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Potato", "SSP245", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Potato", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Potato", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Cattle", "SSP245", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Cattle", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Cattle", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Cattle", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Buffalo", "SSP245", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Buffalo", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Buffalo", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Buffalo", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Goat", "SSP245", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Goat", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Goat", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Goat", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Sheep", "SSP245", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Sheep", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Sheep", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Sheep", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Pig", "SSP245", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Pig", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Pig", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Pig", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Chicken", "SSP245", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Chicken", "SSP245", "Vulnerability", "Income", "", "", "Download"),
  createData("Chicken", "SSP245", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Chicken", "SSP245", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  // SSP585

  createData("Rice", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Rice", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Rice", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Rice", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Rice", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Wheat", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Wheat", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Wheat", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Wheat", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Wheat", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Maize", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Maize", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Maize", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Maize", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Maize", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Barley", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Barley", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Barley", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Barley", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Barley", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Millets", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Millets", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Millets", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Millets", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Millets", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Chickpea", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Chickpea", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Chickpea", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Chickpea", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Chickpea", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Pigeopea", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Pigeonpea", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Pigeonpea", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Pigeonpea", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Pigeonpea", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Lentil", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Lentil", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Lentil", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Lentil", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Lentil", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Soybean", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Soybean", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Soybean", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("soybean", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Soybean", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Mustard", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Mustard", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Mustard", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Mustard", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Mustard", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Groundnut", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Groundnut", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Groundnut", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Grountnut", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Groundnut", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  
  createData("Cotton", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Cotton", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Cotton", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Cotton", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Cotton", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Jute", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Jute", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Jute", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Jute", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Jute", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Potato", "SSP585", "Vulnerability", "Irrigation", "", "", "Download"),
  createData("Potato", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Potato", "SSP585", "Vulnerability", "Volumetric soil water", "", "", "Download"),
  createData("Potato", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),
  createData("Potato", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),

  createData("Cattle", "SSP585", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Cattle", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Cattle", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Cattle", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Buffalo", "SSP585", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Buffalo", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Buffalo", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Buffalo", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Goat", "SSP585", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Goat", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Goat", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Goat", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Sheep", "SSP585", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Sheep", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Sheep", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Sheep", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Pig", "SSP585", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Pig", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Pig", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Pig", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  createData("Chicken", "SSP585", "Vulnerability", "Feed-Fodder", "", "", "Download"),
  createData("Chicken", "SSP585", "Vulnerability", "Income", "", "", "Download"),
  createData("Chicken", "SSP585", "Vulnerability", "Socio-economic development indicator", "", "", "Download"),
  createData("Chicken", "SSP585", "Vulnerability", "Rural infrastructure", "", "", "Download"),

  // Adaptation data
  /*createData("Rice", "Baseline", "Adaptation", "DSR (Dry Seed)", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "DSR (Wet Seed)", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "System of rice intensification", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Alternate wetting and drying", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Early sowing/changing planting dates", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Zero Tillage with residue", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Precision land levelling", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Precision water management", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Microirrigation", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Supplemental irrigation (water harvesting structures/farm ponds)", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Stress tolerant variety", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Smart fertilizer management", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Low Tech Precision Technology", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "High Tech Precision Technology", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "ICT Agro Advisory", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Crop insurance", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Stress tolerant variety", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Early sowing/changing planting dates", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Zero tillage with residue retention", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Smart fertilizer management", "Analyzed", "Heurisitic Model", "Download"),*/
];

// Main component function
export default function Description() {
  {
    /* The download logic initially was available as two separate functions 

  // Function to handle button clicks for hazard data download
  function onButtonClick(haz, crp) {
    const urlstr = "./Downloadables/" + crp + "/" + haz + ".tif";
    // Fetching the TIFF file from the server
    fetch(urlstr).then((response) => {
      response.blob().then((blob) => {
        // Creating a URL for the blob
        const fileURL = window.URL.createObjectURL(blob);
        // Creating a link element and simulating a click to download the file
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = crp + "_" + haz + ".tif";
        alink.click();
      });
    });
  }

  // Function to handle button clicks for adaptation data download
  function onButtonClickOpt(opt, crp) {
    const urlstr =
      "./Downloadables/" + crp + "/Suitability_" + crp + "_" + opt + ".tif";
    // Fetching the TIFF file from the server
    fetch(urlstr).then((response) => {
      response.blob().then((blob) => {
        // Creating a URL for the blob
        const fileURL = window.URL.createObjectURL(blob);
        // Creating a link element and simulating a click to download the file
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = crp + "_" + opt + ".tif";
        alink.click();
      });
    });
  }
    */
  }

  // Filter logic
  const [selectedCommodity, setSelectedCommodity] = React.useState("");
  const [selectedScenario, setSelectedScenario] = React.useState("");
  const [selectedLayerType, setSelectedLayerType] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = (data || []).filter((item) => {
    const matchesCommodity = selectedCommodity ? item.Commodity === selectedCommodity : true;
    const matchesScenario = selectedScenario ? item.Scenario === selectedScenario : true;
    const matchesLayerType = selectedLayerType ? item.LayerType === selectedLayerType : true;
    const matchesSearchTerm = searchTerm ? item.Title?.toLowerCase().includes(searchTerm.toLowerCase()) || item.Description?.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCommodity && matchesScenario && matchesLayerType && matchesSearchTerm;
  });

  const [totalFileSize, setTotalFileSize] = React.useState(0);

  // Function to calculate total file size before downloading
  function calculateTotalSize(filePaths) {
    let totalSize = 0;
    let failed = false;

    const fetchPromises = filePaths.map((filePath) =>
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${filePath}`);
          }
          return response.blob();
        })
        .then((blob) => {
          totalSize += blob.size;
        })
        .catch((err) => {
          console.error("Error fetching file:", err);
          failed = true;
        })
    );

    Promise.all(fetchPromises).then(() => {
      if (failed) {
        console.error("One or more files failed to fetch.");
        return;
      }
      setTotalFileSize(totalSize);
    });
  }

  // Function to download files dynamically and zip them (only for grouped downloads)
  function downloadZippedFiles(filePaths, fileNames, zipFileName) {
    const zip = new JSZip();

    // Create an array of promises for fetching files
    const fetchPromises = filePaths.map((filePath, index) =>
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${filePath}`);
          }
          return response.blob();
        })
        .then((blob) => {
          zip.file(fileNames[index], blob); // Add the fetched file to the zip
        })
        .catch((err) => {
          console.error("Error fetching file:", err);
        })
    );

    // Wait for all fetch requests to complete
    Promise.all(fetchPromises)
      .then(() => {
        // Generate the zip file and trigger the download
        return zip.generateAsync({ type: "blob" });
      })
      .then((content) => {
        const fileURL = window.URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = zipFileName;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating zip file:", err);
      });
  }

  // Get unique values from the data array
  const getUniqueValues = (key) => [...new Set(data.map((item) => item[key]))];

  // Generate file paths dynamically (with dynamic file names)
  function getFilePathsAndNames(filters) {
    const filePaths = [];
    const fileNames = [];

    // Generate file paths and names dynamically based on filtered data
    filteredData.forEach((item) => {
      // Resolve file name based on layer type mapping
      let resolvedTitle;
      if (item.LayerType === "Adaptation" && layerMappings.optcode[item.Title]) {
        resolvedTitle = layerMappings.optcode[item.Title]; // Adaptation code
      } else if (item.LayerType === "Hazard" && layerMappings.hazardname[item.Title]) {
        resolvedTitle = layerMappings.hazardname[item.Title]; // Hazard description
      } else {
        resolvedTitle = item.Title; // Default to Title if no mapping exists
      }

      // Construct file path and name
      const filePath = `./Downloadables/${item.Commodity}/${item.Scenario}/${item.LayerType}/${resolvedTitle}.tif`;
      const fileName = `${item.Commodity}_${item.Scenario}_${item.LayerType}_${resolvedTitle}.tif`;

      filePaths.push(filePath);
      fileNames.push(fileName);
    });

    return { filePaths, fileNames };
  }

  // Handle grouped download (with mapping logic)
  function handleGroupedDownload() {
    const { filePaths, fileNames } = getFilePathsAndNames();

    if (filePaths.length === 0) {
      console.warn("No files found for the selected filters.");
      return;
    }

    const zipFileName = `${selectedCommodity}_${selectedScenario}_${selectedLayerType}.zip`;

    downloadZippedFiles(filePaths, fileNames, zipFileName);
  }

  // Handle individual download (with mapping logic)
  function handleIndividualDownload(item) {
    // Resolve file name using mapping
    let resolvedTitle;
    if (item.LayerType === "Adaptation" && layerMappings.optcode[item.Title]) {
      resolvedTitle = layerMappings.optcode[item.Title];
    } else if (item.LayerType === "Hazard" && layerMappings.hazardname[item.Title]) {
      resolvedTitle = layerMappings.hazardname[item.Title];
    } else {
      resolvedTitle = item.Title;
    }

    const filePath = `./Downloadables/${item.Commodity}/${item.Scenario}/${item.LayerType}/${resolvedTitle}.tif`;
    const fileName = `${item.Commodity}_${item.Scenario}_${item.LayerType}_${resolvedTitle}.tif`;

    // Direct file download
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${filePath}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = fileName;
        link.click();
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
      });
  }

  // Utility function to format file size
  function formatFileSize(size) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  //The page structure
  return (
    <div>
      <Paper sx={{ backgroundColor: (theme) => theme.palette.background.paper, paddingTop: "5px" }}>
        <Box sx={{ textAlign: "left", marginLeft: "150px", marginRight: "40px" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "5px",
              color: (theme) => (theme.palette.mode === "light" ? "#333333" : "#ffffff"),
              /*fontFamily: "revert",*/
            }}
          >
            Data Catalogue
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              marginTop: "5px",
              color: (theme) => (theme.palette.mode === "light" ? "#333333" : "#ffffff"),
              /*fontFamily: "revert",*/
            }}
          >
            The datasets are prepared primarily from open source databases. To extract each variable standard methodologies applied. All the datasets are geo-tiff format and in 0.05 degree resolution
            (EPSG:4326 - WGS 84, Geographic latitude and longitude).
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              marginTop: "8px",
              color: (theme) => (theme.palette.mode === "light" ? "#333333" : "#ffffff"),
              /*fontFamily: "revert",*/
            }}
          >
            The details of the data source and method is described below.
          </Typography>

          <div className="filter-container">
            <div className="card-filters">
              <FormControl
                sx={(theme) => ({
                  "minWidth": 130,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#ccc" : "#666",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#fff" : "#666",
                  },
                })}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Commodity</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedCommodity}
                  onChange={(e) => {
                    setSelectedCommodity(e.target.value);
                    setSelectedScenario(""); // Resets the scenario
                    setSelectedLayerType(""); // Resets the layer type
                  }}
                  label="Commodity"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  <ListSubheader>Cereals</ListSubheader>
                  <MenuItem value="Rice">Rice</MenuItem>
                  <MenuItem value="Wheat">Wheat</MenuItem>
                  <MenuItem value="Maize">Maize</MenuItem>
                  <MenuItem value="Barley">Barley</MenuItem>
                  <MenuItem value="Millets">Millets</MenuItem>

                  <ListSubheader>Pulses</ListSubheader>
                  <MenuItem value="Chickpea">Chickpea</MenuItem>
                  <MenuItem value="Pigeonpea">Pigeonpea</MenuItem>
                  {/*<MenuItem value="Black Gram">Black Gram</MenuItem>
                  <MenuItem value="Green Gram">Green Gram</MenuItem>*/}
                  <MenuItem value="Lentil">Lentil</MenuItem>

                  <ListSubheader>Oilseeds</ListSubheader>
                  <MenuItem value="Soybean">Soybean</MenuItem>
                  {/*<MenuItem value="Safflower">Safflower</MenuItem>
                  <MenuItem value="Sunflower">Sunflower</MenuItem>*/}
                  <MenuItem value="Mustard">Mustard</MenuItem>
                  {/*<MenuItem value="Sesame">Sesame</MenuItem>*/}
                  <MenuItem value="Groundnut">Groundnut</MenuItem>

                  <ListSubheader>Others</ListSubheader>
                  <MenuItem value="Cotton">Cotton</MenuItem>
                  <MenuItem value="Jute">Jute</MenuItem>
                  <MenuItem value="Potato">Potato</MenuItem>

                  {/*<ListSubheader>Fruits & Vegetables</ListSubheader>
                  <MenuItem value="Potato">Potato</MenuItem>
                  <MenuItem value="Onion">Onion</MenuItem>
                  <MenuItem value="Tomato">Tomato</MenuItem>
                  <MenuItem value="Chillies">Chillies</MenuItem>
                  <MenuItem value="Mango">Mango</MenuItem>
                  <MenuItem value="Banana">Banana</MenuItem>

                  <ListSubheader>Industrial</ListSubheader>
                  <MenuItem value="Cotton">Cotton</MenuItem>
                  <MenuItem value="Jute">Jute</MenuItem>
                  <MenuItem value="Rubber">Rubber</MenuItem>
                  <MenuItem value="Sugarcane">Sugarcane</MenuItem>
                  <MenuItem value="Tea">Tea</MenuItem>
                  <MenuItem value="Coconut">Coconut</MenuItem>*/}

                  <ListSubheader>Livestock</ListSubheader>
                  <MenuItem value="Cattle">Cattle</MenuItem>
                  <MenuItem value="Buffalo">Buffalo</MenuItem>
                  <MenuItem value="Goat">Goat</MenuItem>
                  <MenuItem value="Sheep">Sheep</MenuItem>
                  <MenuItem value="Pig">Pig</MenuItem>
                  <MenuItem value="Chicken">Chicken</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={(theme) => ({
                  "minWidth": 120,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#ccc" : "#666",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#fff" : "#666",
                  },
                })}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Scenario</InputLabel>
                <Select labelId="demo-select-small-label" id="demo-select-small" value={selectedScenario} onChange={(e) => setSelectedScenario(e.target.value)} label="Scenario">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Baseline">Baseline</MenuItem>
                  <MenuItem value="SSP245">SSP 2-4.5</MenuItem>
                  <MenuItem value="SSP585">SSP 5-8.5</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={(theme) => ({
                  "minWidth": 120,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#ccc" : "#666",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#fff" : "#666",
                  },
                })}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Layer Type</InputLabel>
                <Select labelId="demo-select-small-label" id="demo-select-small" value={selectedLayerType} onChange={(e) => setSelectedLayerType(e.target.value)} label="Layer Type">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Hazard">Hazard</MenuItem>
                  <MenuItem value="Exposure">Exposure</MenuItem>
                  <MenuItem value="Vulnerability">Vulnerability</MenuItem>
                  <MenuItem value="Risk">Risk</MenuItem>
                  <MenuItem value="Adaptation">Adaptation</MenuItem>
                </Select>
              </FormControl>

              <IconButton
                onMouseEnter={() => {
                  const { filePaths } = getFilePathsAndNames();
                  if (filePaths.length > 0) {
                    calculateTotalSize(filePaths);
                  }
                }}
                onClick={handleGroupedDownload}
                className="download-icon-button"
              >
                <DownloadIcon />
                <span className="button-text">
                  <Typography>{totalFileSize === 0 ? "Download Group - Calculating..." : `Download Group - ${formatFileSize(totalFileSize)}`}</Typography>
                </span>
              </IconButton>

              <TextField
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc", // Light border color by default
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc", // Same border on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc", // Prevent blue focus outline
                      borderWidth: 1, // Maintain same width on focus
                    },
                  },
                }}
                style={{ width: "100%" }}
                inputProps={{
                  "aria-label": "search", // Accessibility
                }}
              />

              {/* Simple search bar
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />*/}
            </div>
          </div>

          <div className="scrollable-container" style={{ overflowY: "scroll", height: "80vh" }}>
            {filteredData.length > 0 ? (
              <div className="card-grid">
                {filteredData.map((item, index) => (
                  <DataCatalog
                    commodity={item.Commodity}
                    scenario={item.Scenario}
                    layertype={item.LayerType}
                    imgAlt={`${item.Commodity}-${item.Title}`}
                    title={item.Title}
                    description={item.Description}
                    source={item.Source}
                    imgSrc={`Data_access_compressed/${item.LayerType}/${item.Commodity}/CHC/${item.Scenario}/${item.Scenario}_CHC_${item.Commodity}_${item.Title.replaceAll(" ", "%20")}.PNG`}
                    buttonText={item.Action}
                    onButtonClick={() => handleIndividualDownload(item)}
                  />
                ))}
              </div>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#555",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "#777" }}>
                  No data available for the selected filters
                </Typography>
                <Typography variant="body1" sx={{ color: "#999", marginTop: "8px" }}>
                  Try adjusting your filters or clearing the search term
                </Typography>
              </Box>
            )}
          </div>
        </Box>
      </Paper>
    </div>
  );
}
