export function fetchLocationDataAdap(location, commodity, scenario, adaptation, data, AdaptLayerName) {
  let filteredData = Object.values(data);

  if (scenario === "baseline") {
    scenario = "Baseline";
  } else if (scenario === "ssp245") {
    scenario = "SSP245";
  } else {
    scenario = "SSP585";
  }
  const optcode = {
    "Stress Tolerant Variety": "ADVAR",
    "Early Sowing": "ADPTI",
    "Precision Land Levelling": "LASLV",
    "Zero Tillage with residues": "ZTILL",
    "Broad Bed and Furrow": "BBFIB",
    "Direct Seeded Rice - Dry": "DSDRY",
    "Direct Seeded Rice - Wet": "DSWET",
    "System of Rice Intensification": "SRIUT",
    "Supplemental Irrigation": "WHSRC",
    "Microirrigation": "MICIR",
    "Precision Water Management": "PWMGT",
    "Precision Fertilizer Management": "PNMLT",
    "Precision Fertilizer Management - High tech": "PNMHT",
    "Deep Placement of Urea": "DR",
    "ICT linked Input Management": "WEAGA",
    "Crop Insurance": "INSUR",
    "Land Management": "LMGT",
    "Feed Management": "FMGT",
    "Herd Management": "HMGT",
    "Animal Health": "ANHLT",
    "Animal Productivity": "ANPRO",
    "Mulching": "MULCH",
    "Alternate Wetting and Drying": "AWD",
    "Smart fertilizer management": "FRT",
    "Manure Management": "MNMGT",
    "Information Use": "INFO",
    "Heat Stress Management": "HSMGT",
  };

  let opt_suffix = "";
  if (AdaptLayerName["Adaptation Benefits"]) opt_suffix = "_ADAP";
  if (AdaptLayerName["Economic"]) opt_suffix = "_ECO";
  if (AdaptLayerName["Scalability"]) opt_suffix = "_SCA";

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
  filteredData = filteredData.filter((row) => row.Crop === commodity);
  filteredData = filteredData.filter((row) => row.Scenario === scenario);
  filteredData = filteredData.filter((row) => row.Adaptation === `${optcode[adaptation]}${opt_suffix}`);

  //console.log(filteredData);
  //console.log(adaptation);
  //console.log(opt_suffix);
  return filteredData;
}
