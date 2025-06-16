export function fetchthedataHzd(activeScale, RiskName, ImpactName, displayLayer, location, scenario, commodity, area_data4) {
  let data = [];
  let urlstr = "";

  const createData = (color, Cat, Area, AreaPerc, Population) => ({
    color,
    Cat,
    Area,
    AreaPerc,
    Population,
  });

  function typrstr() {
    if (RiskType() === "Hazard") {
      return "hazard";
    }
    if (RiskType() === "Risk") {
      return "index";
    }
    if (RiskType() === "Exposure") {
      return "exposure";
    }
    if (RiskType() === "Vulnerability") {
      return "vuln.";
    }
  }

  function checkcrop() {
    const diffcrop = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
    let ans = true;
    diffcrop.forEach((sname) => {
      if (commodity === sname) {
        ans = false;
      }
    });
    return ans;
  }

  function RiskType() {
    let str = "Hazard";
    if (
      RiskName === "Risk Index" ||
      RiskName === "Exposure Index" ||
      RiskName === "Vulnerability Index" ||
      RiskName === "District Level" ||
      RiskName === "Downscaled Risk" ||
      RiskName === "Hazard Index"
    ) {
      str = "Indices";
    }
    if (RiskName === "Number of Animals per grid" || RiskName === "Cropped Area") {
      str = "Exposure";
    }
    if (
      RiskName === "Irrigation" ||
      RiskName === "Volumetric Soil Water" ||
      RiskName === "Agriculture Income" ||
      RiskName === "Soil Organic Carbon" ||
      RiskName === "Feed/Fodder" ||
      RiskName === "Rural infrastructure" ||
      RiskName === "Socio-economic Development Indicator" ||
      RiskName === "Income"
    ) {
      str = "Vulnerability";
    }
    return str;
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
    "Productivity": "Productivity",
    "Resilience": "CV",
    "Value of Production": "VOP",
    "Seasonal Rainfall": "Seasonal Rainfall",
    "Maximum Temperature": "Maximum Temperature",
    "Minimum Temperature": "Minimum Temperature",
  };

  if (activeScale === "District Level") {
    urlstr = "DISTRICT_";
  }

  /*if (RiskName !== "" || ImpactName !== "") {
    if (displayLayer === "Absolute") {
      let sec = location.indexOf(",");
      let y = "";
      let x = "";
      let rowstr = "";

      let RiskName2 = RiskName !== "" ? RiskName : ImpactName;

      if (sec > 0) {
        y = location.substring(0, sec);
        x = location.substring(sec + 2);
        let statecode = "";

        if (x === "Bangladesh") {
          statecode = y.substring(0, y.length - 9) + "DIV";
        } else if (x === "Nepal") {
          statecode = y + "DIV";
        } else {
          statecode = y;
        }

        rowstr = `${commodity}_${statecode}_${urlstr}${hazardname[RiskName2]}_${scenario}`;
      } else {
        rowstr = `Calculated_${commodity}_${location}_${urlstr}${hazardname[RiskName2]}_${scenario}`;
      }*/

  if (RiskName !== "" || ImpactName !== "") {
    if (displayLayer === "Absolute") {
      let sec = location.indexOf(",");
      let y = "";
      let x = "";
      let rowstr = "";

      const isImpact = RiskName === "" && ImpactName !== "";
      const RiskName2 = isImpact ? ImpactName : RiskName;

      if (sec > 0) {
        y = location.substring(0, sec);
        x = location.substring(sec + 2);
        let statecode = "";

        if (x === "Bangladesh") {
          statecode = y.substring(0, y.length - 9) + "DIV";
        } else if (x === "Nepal") {
          statecode = y + "DIV";
        } else {
          statecode = y;
        }

        // Adjust hazardname logic for Impact
        const hazardStr = isImpact ? `${hazardname[RiskName2]}${scenario.toLowerCase()}` : hazardname[RiskName2];

        rowstr = `${commodity}_${statecode}_${urlstr}${hazardStr}_${scenario}`;
      } else {
        const hazardStr = isImpact ? `${hazardname[RiskName2]}${scenario.toLowerCase()}` : hazardname[RiskName2];

        rowstr = `Calculated_${commodity}_${location}_${urlstr}${hazardStr}_${scenario}`;
      }

      let row_data = area_data4[rowstr.toLowerCase()] || {
        "Cropped Area/Number of animals under Nil category": NaN,
        "Cropped Area/Number of animals under Very Low category": NaN,
        "Cropped Area/Number of animals under Low category": NaN,
        "Cropped Area/Number of animals under Medium category": NaN,
        "Cropped Area/Number of animals under High category": NaN,
        "Cropped Area/Number of animals under Very High category": NaN,
      };

      let total =
        (row_data["Cropped Area/Number of animals under Very Low category"] || 0) +
          (row_data["Cropped Area/Number of animals under Low category"] || 0) +
          (row_data["Cropped Area/Number of animals under Medium category"] || 0) +
          (row_data["Cropped Area/Number of animals under High category"] || 0) +
          (row_data["Cropped Area/Number of animals under Very High category"] || 0) +
          (row_data["Cropped Area/Number of animals under Nil category"] || 0) || 1;

      if (RiskName2 === "Seasonal Rainfall") {
        if (commodity === "Wheat" || commodity === "Sorghum" || commodity === "Chickpea" || commodity === "Lentil" || commodity === "Mustard") {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#d0e6f7",
              "<25 mm",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#8cbfe3",
              "25-50 mm",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#4fa0d5",
              "50-75 mm",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#2b75b3",
              "75-100 mm",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#08306b",
              ">100 mm",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        } else if (checkcrop() === false) {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#d0e6f7",
              "<500 mm",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#8cbfe3",
              "500-1000",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#4fa0d5",
              "1000-1500",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#2b75b3",
              "1500-2000",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#08306b",
              ">2000 mm",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        } else {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#d0e6f7",
              "<250 mm",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#8cbfe3",
              "250-500",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#4fa0d5",
              "500-750",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#2b75b3",
              "750-1000",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#08306b",
              ">1000 mm",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        }
      } else if (RiskName2 === "Maximum Temperature") {
        if (commodity === "Wheat" || commodity === "Sorghum" || commodity === "Chickpea" || commodity === "Lentil" || commodity === "Mustard") {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#059212",
              "<16 °C",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#00FF00",
              "16-20 °C",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#FFDE4D",
              "20-24 °C",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#FFA500",
              "24-28 °C",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#E4003A",
              ">28 °C",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        } else if (checkcrop() === false) {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#059212",
              "<25 °C",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#00FF00",
              "25-27.5 °C",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#FFDE4D",
              "27.5-30 °C",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#FFA500",
              "30-32.5 °C",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#E4003A",
              ">32.5 °C",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        } else {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#059212",
              "<27.5 °C",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#00FF00",
              "27.5-30 °C",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#FFDE4D",
              "30-32.5 °C",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#FFA500",
              "32.5-35 °C",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#E4003A",
              ">35 °C",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        }
      } else if (RiskName2 === "Minimum Temperature") {
        if (commodity === "Wheat" || commodity === "Sorghum" || commodity === "Chickpea" || commodity === "Lentil" || commodity === "Mustard") {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#059212",
              "<10 °C",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#00FF00",
              "10-12 °C",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#FFDE4D",
              "12-14 °C",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#FFA500",
              "14-16 °C",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#E4003A",
              ">16 °C",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        } else if (checkcrop() === false) {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#059212",
              "<12.5 °C",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#00FF00",
              "12.5-15 °C",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#FFDE4D",
              "15-17.5 °C",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#FFA500",
              "17.5-20 °C",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#E4003A",
              ">20 °C",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        } else {
          data = [
            createData(
              "#969696",
              "No significant " + typrstr(),
              row_data["Cropped Area/Number of animals under Nil category"],
              ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Nil category"] * 0.16) / 1000000
            ),
            createData(
              "#059212",
              "<19 °C",
              row_data["Cropped Area/Number of animals under Very Low category"],
              ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very Low category"] * 0.16) / 1000000
            ),
            createData(
              "#00FF00",
              "19-21 °C",
              row_data["Cropped Area/Number of animals under Low category"],
              ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Low category"] * 0.16) / 1000000
            ),
            createData(
              "#FFDE4D",
              "21-23 °C",
              row_data["Cropped Area/Number of animals under Medium category"],
              ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Medium category"] * 0.16) / 1000000
            ),
            createData(
              "#FFA500",
              "23-25 °C",
              row_data["Cropped Area/Number of animals under High category"],
              ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under High category"] * 0.16) / 1000000
            ),
            createData(
              "#E4003A",
              ">25 °C",
              row_data["Cropped Area/Number of animals under Very High category"],
              ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
              (row_data["Rural population under Very High category"] * 0.16) / 1000000
            ),
          ];
        }
      } else if (RiskType() === "Vulnerability" || RiskName2 === "Value of Production" || (RiskName2 === "Productivity" && scenario === "baseline")) {
        data = [
          createData(
            "#969696",
            "No significant " + typrstr(),
            row_data["Cropped Area/Number of animals under Nil category"],
            ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Nil category"] * 0.16) / 1000000
          ),
          createData(
            "#E4003A",
            "Very low",
            row_data["Cropped Area/Number of animals under Very Low category"],
            ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very Low category"] * 0.16) / 1000000
          ),
          createData(
            "#FFA500",
            "Low",
            row_data["Cropped Area/Number of animals under Low category"],
            ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Low category"] * 0.16) / 1000000
          ),
          createData(
            "#FFDE4D",
            "Medium",
            row_data["Cropped Area/Number of animals under Medium category"],
            ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Medium category"] * 0.16) / 1000000
          ),
          createData(
            "#00FF00",
            "High",
            row_data["Cropped Area/Number of animals under High category"],
            ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under High category"] * 0.16) / 1000000
          ),
          createData(
            "#059212",
            "Very high",
            row_data["Cropped Area/Number of animals under Very High category"],
            ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very High category"] * 0.16) / 1000000
          ),
        ];
      } else if (RiskName2 === "Resilience") {
        data = [
          createData(
            "#969696",
            "No significant " + typrstr(),
            row_data["Cropped Area/Number of animals under Nil category"],
            ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Nil category"] * 0.16) / 1000000
          ),
          createData(
            "#E4003A",
            "Very low\n0 - 5",
            row_data["Cropped Area/Number of animals under Very Low category"],
            ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very Low category"] * 0.16) / 1000000
          ),
          createData(
            "#FFA500",
            "Low\n5 - 10",
            row_data["Cropped Area/Number of animals under Low category"],
            ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Low category"] * 0.16) / 1000000
          ),
          createData(
            "#FFDE4D",
            "Medium\n10 - 20",
            row_data["Cropped Area/Number of animals under Medium category"],
            ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Medium category"] * 0.16) / 1000000
          ),
          createData(
            "#00FF00",
            "High\n 20 - 30",
            row_data["Cropped Area/Number of animals under High category"],
            ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under High category"] * 0.16) / 1000000
          ),
          createData(
            "#059212",
            "Very high\n> 30",
            row_data["Cropped Area/Number of animals under Very High category"],
            ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very High category"] * 0.16) / 1000000
          ),
        ];
      } else if (RiskName2 === "Productivity" && scenario !== "baseline") {
        data = [
          createData(
            "#969696",
            "No significant " + typrstr(),
            row_data["Cropped Area/Number of animals under Nil category"],
            ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Nil category"] * 0.16) / 1000000
          ),
          createData(
            "#E4003A",
            "Medium loss\n<-15%",
            row_data["Cropped Area/Number of animals under Very Low category"],
            ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very Low category"] * 0.16) / 1000000
          ),
          createData(
            "#FFA500",
            "Low loss\n-15% to -5%",
            row_data["Cropped Area/Number of animals under Low category"],
            ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Low category"] * 0.16) / 1000000
          ),
          createData(
            "#FFDE4D",
            "Nil\n-5% to 5%",
            row_data["Cropped Area/Number of animals under Medium category"],
            ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Medium category"] * 0.16) / 1000000
          ),
          createData(
            "#00FF00",
            "Low gain\n5% to 15%",
            row_data["Cropped Area/Number of animals under High category"],
            ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under High category"] * 0.16) / 1000000
          ),
          createData(
            "#059212",
            "Medium gain\n>15%",
            row_data["Cropped Area/Number of animals under Very High category"],
            ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very High category"] * 0.16) / 1000000
          ),
        ];
      } else {
        data = [
          createData(
            "#969696",
            "No significant " + typrstr(),
            row_data["Cropped Area/Number of animals under Nil category"],
            ((row_data["Cropped Area/Number of animals under Nil category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Nil category"] * 0.16) / 1000000
          ),
          createData(
            "#059212",
            "Very low",
            row_data["Cropped Area/Number of animals under Very Low category"],
            ((row_data["Cropped Area/Number of animals under Very Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very Low category"] * 0.16) / 1000000
          ),
          createData(
            "#00FF00",
            "Low",
            row_data["Cropped Area/Number of animals under Low category"],
            ((row_data["Cropped Area/Number of animals under Low category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Low category"] * 0.16) / 1000000
          ),
          createData(
            "#FFDE4D",
            "Medium",
            row_data["Cropped Area/Number of animals under Medium category"],
            ((row_data["Cropped Area/Number of animals under Medium category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Medium category"] * 0.16) / 1000000
          ),
          createData(
            "#FFA500",
            "High",
            row_data["Cropped Area/Number of animals under High category"],
            ((row_data["Cropped Area/Number of animals under High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under High category"] * 0.16) / 1000000
          ),
          createData(
            "#E4003A",
            "Very high",
            row_data["Cropped Area/Number of animals under Very High category"],
            ((row_data["Cropped Area/Number of animals under Very High category"] * 100) / total).toFixed(2),
            (row_data["Rural population under Very High category"] * 0.16) / 1000000
          ),
        ];
      }
    }
  }

  return data;
}

////Original function

/* function fetchthedataHzd2() {
  let data = [];
  let urlstr = "";
  if (activeScale === "District Level") {
    urlstr = "DISTRICT_";
  }
  if (RiskName !== "" || adaption !== "" || ImpactName !== "") {
    if (displayLayer === "Absolute") {
      let sec = location.indexOf(",");
      let y = "";
      let x = "";
      let rowstr = "";
      if (ImpactName === "Value of Production") {
        urlstr += scenario.toLowerCase() + "_";
      }
      let RiskName2 = "";
      if (RiskName !== "") {
        RiskName2 = RiskName;
      } else {
        RiskName2 = ImpactName;
      }
      if (sec > 0) {
        y = location.substring(0, sec);
        x = location.substring(sec + 2);
        let statecode = "";
        if (x === "Bangladesh") {
          statecode = y.substring(0, y.length - 9) + "DIV";
          rowstr = commodity + "_" + statecode + "_" + urlstr + hazardname[RiskName2] + "_" + scenario;
        } else if (x === "Nepal") {
          statecode = y + "DIV";
          rowstr = commodity + "_" + statecode + "_" + urlstr + hazardname[RiskName2] + "_" + scenario;
        } else if (x === "Bhutan" || x === "India" || x === "Sri Lanka" || x === "Pakistan" || x === "Maldives" || x === "Afghanistan") {
          statecode = y;
          rowstr = commodity + "_" + statecode + "_" + urlstr + hazardname[RiskName2] + "_" + scenario;
        }
      } else {
        rowstr = "Calculated_" + commodity + "_" + location + "_" + urlstr + hazardname[RiskName2] + "_" + scenario;
      }
      let row_data = area_data4[rowstr.toLowerCase()];
      let total = 1;
      if (row_data) {
        total = Number(row_data["Very Low"]) + Number(row_data["Low"]) + Number(row_data["Medium"]) + Number(row_data["High"]) + Number(row_data["Very High"]) + Number(row_data["Nil"]);
      } else {
        row_data = { "Nil": NaN, "Very Low": NaN, "Low": NaN, "Medium": NaN, "High": NaN, "Very High": NaN };
      }
      //console.log(total);
      if (RiskType() === "Vulnerability") {
        data = [
          createData("#969696", "No significant " + typrstr(), row_data["Nil"], ((row_data["Nil"] * 100) / total).toFixed(2), (row_data["Nil Population"] * 0.16) / 1000000),
          createData("#E4003A", "Very low", row_data["Very Low"], ((row_data["Very Low"] * 100) / total).toFixed(2), (row_data["Very Low Population"] * 0.16) / 1000000),
          createData("#FFA500", "Low", row_data["Low"], ((row_data["Low"] * 100) / total).toFixed(2), (row_data["Low Population"] * 0.16) / 1000000),
          createData("#FFDE4D", "Medium", row_data["Medium"], ((row_data["Medium"] * 100) / total).toFixed(2), (row_data["Medium Population"] * 0.16) / 1000000),
          createData("#00FF00", "High", row_data["High"], ((row_data["High"] * 100) / total).toFixed(2), (row_data["High Population"] * 0.16) / 1000000),
          createData("#059212", "Very high", row_data["Very High"], ((row_data["Very High"] * 100) / total).toFixed(2), (row_data["Very High Population"] * 0.16) / 1000000),
        ];
      } else {
        data = [
          createData("#969696", "No significant " + typrstr(), row_data["Nil"], ((row_data["Nil"] * 100) / total).toFixed(2), (row_data["Nil Population"] * 0.16) / 1000000),
          createData("#059212", "Very low", row_data["Very Low"], ((row_data["Very Low"] * 100) / total).toFixed(2), (row_data["Very Low Population"] * 0.16) / 1000000),
          createData("#00FF00", "Low", row_data["Low"], ((row_data["Low"] * 100) / total).toFixed(2), (row_data["Low Population"] * 0.16) / 1000000),
          createData("#FFDE4D", "Medium", row_data["Medium"], ((row_data["Medium"] * 100) / total).toFixed(2), (row_data["Medium Population"] * 0.16) / 1000000),
          createData("#FFA500", "High", row_data["High"], ((row_data["High"] * 100) / total).toFixed(2), (row_data["High Population"] * 0.16) / 1000000),
          createData("#E4003A", "Very high", row_data["Very High"], ((row_data["Very High"] * 100) / total).toFixed(2), (row_data["Very High Population"] * 0.16) / 1000000),
        ];
      }
    } else if (displayLayer === "Absolute Change") {
      
      let sec = location.indexOf(",");
      let y = "";
      let x = "";
      let rowstr = "";
      if (sec > 0) {
        y = location.substring(0, sec);
        x = location.substring(sec + 2);
        let statecode = "";
        if (x === "Bangladesh") {
          statecode = y.substring(0, y.length - 9) + "DIV";
          rowstr = commodity + "_" + statecode + "_Abs_" + hazardname[RiskName] + "_" + scenario;
        } else if (x === "Nepal") {
          statecode = y + "DIV";
          rowstr = commodity + "_" + statecode + "_Abs_" + hazardname[RiskName] + "_" + scenario;
        } else if (x === "Bhutan" || x === "India" || x === "Sri Lanka" || x === "Pakistan" || x === "Maldives" || x === "Afghanistan") {
          statecode = y;
          rowstr = commodity + "_" + statecode + "_Abs_" + hazardname[RiskName] + "_" + scenario;
        }
      } else {
        rowstr = "Calculated_" + commodity + "_" + location + "_Abs_" + hazardname[RiskName] + "_" + scenario;
      }

      let row_data = area_data4[rowstr.toLowerCase()];
      let total = 1;
      if (row_data) {
        total = Number(row_data["Very Low"]) + Number(row_data["Low"]) + Number(row_data["Medium"]) + Number(row_data["High"]) + Number(row_data["Very High"]) + Number(row_data["Nil"]);
      } else {
        row_data = {
          "Nil": NaN,
          "Very Low": NaN,
          "Low": NaN,
          "Medium": NaN,
          "High": NaN,
          "Very High": NaN,
        };
      }
      data = [
        createData("#969696", "No significant " + typrstr(), row_data["Nil"], ((row_data["Nil"] * 100) / total).toFixed(2), (row_data["Nil Population"] * 0.16) / 1000000),
        createData("rgba(0,0,128,1)", "High dcr", row_data["Very Low"], ((row_data["Very Low"] * 100) / total).toFixed(2), (row_data["Very Low Population"] * 0.16) / 1000000),
        createData("rgba(135,206,250,1)", "Decrease", row_data["Low"], ((row_data["Low"] * 100) / total).toFixed(2), (row_data["Low Population"] * 0.16) / 1000000),
        createData("rgba(241, 233, 119, 1)", "No change", row_data["Medium"], ((row_data["Medium"] * 100) / total).toFixed(2), (row_data["Medium Population"] * 0.16) / 1000000),
        createData("#FF8C00", "Increase", row_data["High"], ((row_data["High"] * 100) / total).toFixed(2), (row_data["High Population"] * 0.16) / 1000000),
        createData("rgba(184, 23, 23, 1)", "High incr", row_data["Very High"], ((row_data["Very High"] * 100) / total).toFixed(2), (row_data["Very High Population"] * 0.16) / 1000000),
      ];
    } else {
      let sec = location.indexOf(",");
      let y = "";
      let x = "";
      let rowstr = "";
      if (sec > 0) {
        y = location.substring(0, sec);
        x = location.substring(sec + 2);
        let statecode = "";
        if (x === "Bangladesh") {
          statecode = y.substring(0, y.length - 9) + "DIV";
          rowstr = commodity + "_" + statecode + "_Cat_" + hazardname[RiskName] + "_" + scenario;
        } else if (x === "Nepal") {
          statecode = y + "DIV";
          rowstr = commodity + "_" + statecode + "_Cat_" + hazardname[RiskName] + "_" + scenario;
        } else if (x === "Bhutan" || x === "India" || x === "Sri Lanka" || x === "Pakistan" || x === "Maldives" || x === "Afghanistan") {
          statecode = y;
          rowstr = commodity + "_" + statecode + "_Cat_" + hazardname[RiskName] + "_" + scenario;
        }
      } else {
        rowstr = "Calculated_" + commodity + "_" + location + "_Cat_" + hazardname[RiskName] + "_" + scenario;
      }

      let row_data = area_data4[rowstr.toLowerCase()];
      let total = 1;
      if (row_data) {
        total = Number(row_data["Very Low"]) + Number(row_data["Low"]) + Number(row_data["Medium"]) + Number(row_data["High"]) + Number(row_data["Very High"]) + Number(row_data["Nil"]);
      } else {
        row_data = {
          "Nil": NaN,
          "Very Low": NaN,
          "Low": NaN,
          "Medium": NaN,
          "High": NaN,
          "Very High": NaN,
        };
      }
      data = [
        createData("#969696", "No significant " + typrstr(), row_data["Nil"], ((row_data["Nil"] * 100) / total).toFixed(2), (row_data["Nil Population"] * 0.16) / 1000000),
        createData("rgba(4, 145, 4, 1)", "High dcr", row_data["Very Low"], ((row_data["Very Low"] * 100) / total).toFixed(2), (row_data["Very Low Population"] * 0.16) / 1000000),
        createData("rgba(109, 233, 109, 1)", "Decrease", row_data["Low"], ((row_data["Low"] * 100) / total).toFixed(2), (row_data["Low Population"] * 0.16) / 1000000),
        createData("rgba(241, 233, 119, 1)", "No change", row_data["Medium"], ((row_data["Medium"] * 100) / total).toFixed(2), (row_data["Medium Population"] * 0.16) / 1000000),
        createData("#FF8C00", "Increase", row_data["High"], ((row_data["High"] * 100) / total).toFixed(2), (row_data["High Population"] * 0.16) / 1000000),
        createData("rgba(184, 23, 23, 1)", "High incr", row_data["Very High"], ((row_data["Very High"] * 100) / total).toFixed(2), (row_data["Very High Population"] * 0.16) / 1000000),
      ];
    }
    //console.log(data);
  }
  return data;
} */

////For Absolute Change
/* let rowstr2 = "";
          let scenario2 = 'Baseline';
          if (sec>0){
            y = location.substring(0,sec);
            x = location.substring(sec+2);
            let statecode = '';
            if(x==='Bangladesh'){
              statecode = y.substring(0,y.length-9) + 'DIV';
              rowstr2 = commodity+"_"+statecode+"_Abs_"+hazardname[RiskName]+"_"+scenario2;
            }
            else if(x==='Nepal'){
              statecode = y + 'DIV';
              rowstr2 = commodity+"_"+statecode+"_Abs_"+hazardname[RiskName]+"_"+scenario2;
            }
            else if(x==='Bhutan'||x==='India'||x==='Sri Lanka'||x==='Pakistan'||x==='Maldives'||x==='Afghanistan'){
              statecode = y;
              rowstr2 = commodity+"_"+statecode+"_Abs_"+hazardname[RiskName]+"_"+scenario2;
            }
          }
          else{
            rowstr2 = "Calculated_"+commodity+"_"+location+"_Abs_"+hazardname[RiskName]+"_"+scenario2;
          }
          let row_data2 = area_data4[rowstr2.toLowerCase()];
          let total = 1;
          if(row_data2){
            total = Number(row_data2['Very Low']) + Number(row_data2['Low']) + Number(row_data2['Medium']) + Number(row_data2['High']) + Number(row_data2['Very High']) + Number(row_data2['Nil']);
          }
          else{
            row_data2 = {'Nil':NaN,'Very Low':NaN,'Low':NaN,'Medium':NaN,'High':NaN,'Very High':NaN};
          } */
/* data = 
          [
            createData('#969696',
              "No significant "+typrstr(), row_data['Nil'], (row_data['Nil']*100/total).toFixed(2), (row_data['Nil Population']*0.16/1000000)),
            createData('#059212',
              'Very low', row_data['Very Low']-row_data2['Very Low'], (row_data['Very Low']*100/total).toFixed(2), (row_data['Very Low Population']*0.16/1000000)-
              (row_data2['Very Low Population']*0.16/1000000)),
            createData('#00FF00',
              'Low', row_data['Low']-row_data2['Low'], (row_data['Low']*100/total).toFixed(2), (row_data['Low Population']*0.16/1000000)-
              (row_data2['Low Population']*0.16/1000000)),
            createData('#FFDE4D',
              'Medium', row_data['Medium']-row_data2['Medium'], (row_data['Medium']*100/total).toFixed(2), (row_data['Medium Population']*0.16/1000000)-
              (row_data2['Medium Population']*0.16/1000000)),
            createData('#FFA500',
              'High', row_data['High']-row_data2['High'], (row_data['High']*100/total).toFixed(2), (row_data['High Population']*0.16/1000000)-
              (row_data2['High Population']*0.16/1000000)),
            createData('#E4003A',
              'Very high', row_data['Very High']-row_data2['Very High'], (row_data['Very High']*100/total).toFixed(2), (row_data['Very High Population']*0.16/1000000)-
              (row_data2['Very High Population']*0.16/1000000)),
          ] */
