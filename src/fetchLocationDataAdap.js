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
  if (activeOptLayer["Adaptation Benefits"]) {
    AdaptLayerName = "Adaptation Benefits";
  }
  if (
    activeOptLayer["Biophysical Suitability"] === false &&
    activeOptLayer["Adaptation Benefits"] === false &&
    activeOptLayer["Economic"] === false &&
    activeOptLayer["Scalability"] === false &&
    activeOptLayer["Gender"] === false &&
    activeOptLayer["Yield"] === false
  ) {
    AdaptLayerName = "Biophysical Suitability";
  }

  let opt_prefix = "";
  if (AdaptLayerName === "Yield Benefits") opt_prefix = "Yield";
  if (AdaptLayerName === "Economic Viability") opt_prefix = "Economic";
  if (AdaptLayerName === "Scalability") opt_prefix = "Scalability";
  if (AdaptLayerName === "Gender Suitability") opt_prefix = "Gender";
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
