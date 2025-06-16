export function fetchLocationDataAdap(location, commodity, scenario, adaptation, data, activeOptLayer, analysis_level) {
  let filteredData = Object.values(data);

  if (scenario === "baseline") {
    scenario = "Baseline";
  } else if (scenario === "ssp245") {
    scenario = "SSP245";
  } else {
    scenario = "SSP585";
  }
  const optcode = {
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
  };

  let AdaptLayerName = "";
  if (activeOptLayer["Biophysical Suitability"]) {
    AdaptLayerName = "Biophysical Suitability";
  }
  if (activeOptLayer["Yield"]) {
    AdaptLayerName = "Yield Benefits";
  }
  if (activeOptLayer["Economic"]) {
    AdaptLayerName = "Economic Viability";
  }
  if (activeOptLayer["Scalability"]) {
    AdaptLayerName = "Scalability";
  }
  if (activeOptLayer["Gender"]) {
    AdaptLayerName = "Gender Suitability";
  }
  if (activeOptLayer["Female labourer suitability"]) {
    AdaptLayerName = "Female labourer suitability";
  }
  if (activeOptLayer["Female cultivator suitability"]) {
    AdaptLayerName = "Female cultivator suitability";
  }
  if (activeOptLayer["Adaptation Benefits"]) {
    AdaptLayerName = "Adaptation Benefits";
  }
  if (
    activeOptLayer["Biophysical Suitability"] === false &&
    activeOptLayer["Yield"] === false &&
    activeOptLayer["Economic"] === false &&
    activeOptLayer["Scalability"] === false &&
    activeOptLayer["Gender"] === false &&
    activeOptLayer["Female labourer suitability"] === false &&
    activeOptLayer["Female cultivator suitability"] === false &&
    activeOptLayer["Adaptation Benefits"] === false 
    
  ) {
    AdaptLayerName = "Biophysical Suitability";
  }

  let opt_prefix = "";
  if (AdaptLayerName === "Yield Benefits") opt_prefix = "Yield";
  if (AdaptLayerName === "Economic Viability") opt_prefix = "Economic";
  if (AdaptLayerName === "Scalability") opt_prefix = "Scalability";
  if (AdaptLayerName === "Gender Suitability") opt_prefix = "Gender";
  if (AdaptLayerName === "Female labourer suitability") opt_prefix = "Labour";
  if (AdaptLayerName === "Female cultivator suitability") opt_prefix = "Cultivator";
  if (AdaptLayerName === "Adaptation Benefits") opt_prefix = "Adaptation";

  // Location-based filtering
  if (!location.includes(",")) {
    // Case 1: South Asia selected
    if (location === "South Asia") {
      filteredData = filteredData.filter((row) => row.State === "Total Country");
    } else {
      // Case 2: Country selected
      filteredData = filteredData.filter((row) => row.Country === location);
    }
  } else {
    // Case 3: State selected
    const [selectedCountry, selectedState] = location.split(",").map((item) => item.trim());

    let statecode = "";

    if (selectedCountry === "Bangladesh") {
      statecode = selectedState.substring(0, selectedState.length - 9) + "DIV";
    } else if (selectedCountry === "Nepal") {
      statecode = selectedState + "DIV";
    } else {
      statecode = selectedState;
    }
    filteredData = filteredData.filter((row) => row.Country === selectedCountry && row.State === statecode);
  }

  // Apply additional filters (Commodity, Scenario, adaptation)
  filteredData = filteredData.filter((row) => row.Commodity === commodity);
  filteredData = filteredData.filter((row) => row.Scenario === scenario);
  filteredData = filteredData.filter((row) => row.Adaptation === `${opt_prefix}${optcode[adaptation]}`);

  if (analysis_level === "District Level") filteredData = filteredData.filter((row) => row["Analysis Level"] === "DISTRICT");
  if (analysis_level === "Pixel Level") filteredData = filteredData.filter((row) => row["Analysis Level"] === "PIXEL");

  //console.log(filteredData);
  //console.log(adaptation);
  //console.log(opt_suffix);
  return filteredData;
}
