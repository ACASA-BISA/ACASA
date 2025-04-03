export function fetchLocationData(location, commodity, scenario, hazard, data, analysis_level) {
  let filteredData = Object.values(data);

  if (scenario === "baseline") {
    scenario = "Baseline";
  } else if (scenario === "ssp245") {
    scenario = "SSP245";
  } else {
    scenario = "SSP585";
  }
  const hazardname = {
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
<<<<<<< Updated upstream
    "Value of Production": "vop_NT_wheat_USD",
=======
    "Productivity": "Productivity",
    "Resilience": "CV",
    "Value of Production": "VOP",
    "Seasonal Rainfall": "Seasonal Rainfall",
    "Maximum Temperature": "Maximum Temperature",
    "Minimum Temperature": "Minimum Temperature",
>>>>>>> Stashed changes
  };

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

  // Apply additional filters (Commodity, Scenario, Hazard)
  filteredData = filteredData.filter((row) => row.Commodity === commodity);
  filteredData = filteredData.filter((row) => row.Scenario === scenario);
  filteredData = filteredData.filter((row) => row.Hazard === hazardname[hazard]);
  if (analysis_level === "District Level") filteredData = filteredData.filter((row) => row["Analysis Level"] === "DISTRICT");
  if (analysis_level === "Pixel Level") filteredData = filteredData.filter((row) => row["Analysis Level"] === "PIXEL");

  //console.log(filteredData);
  return filteredData;
}
