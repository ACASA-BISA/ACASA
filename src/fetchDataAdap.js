export function fetchDataAdap(adaption, location, AdaptLayerName, commodity, scenario, area_data3) {
  let data = [];

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

  const createData = (color, Cat, Area, AreaPerc, Population) => ({
    color,
    Cat,
    Area,
    AreaPerc,
    Population,
  });

  if (adaption !== "") {
    let sec = location.indexOf(",");
    let y = "";
    let x = "";
    let rowstr = "";
    let opt_suffix = "";

    if (AdaptLayerName === "Adaptation Benefits") opt_suffix = "_ADAP";
    if (AdaptLayerName === "Economic Viability") opt_suffix = "_ECO";
    if (AdaptLayerName === "Scalability") opt_suffix = "_SCA";

    if (sec > 0) {
      y = location.substring(0, sec);
      x = location.substring(sec + 2);
      let statecode = "";

      if (["Bangladesh", "Nepal", "Bhutan", "Maldives", "Afghanistan", "India", "Sri Lanka", "Pakistan"].includes(x)) {
        statecode = x === "Bangladesh" ? y.substring(0, y.length - 9) + "DIV" : y + "DIV";
        rowstr = `${commodity}_${statecode}_${optcode[adaption]}${opt_suffix}_${scenario}`;
      }
    } else {
      rowstr = `Calculated_${commodity}_${location}_${optcode[adaption]}${opt_suffix}_${scenario}`;
    }

    let row_data = area_data3[rowstr.toLowerCase()] || {
      "Cropped Area/Number of animals under Nil suitability": NaN,
      "Cropped Area/Number of animals under Very Low suitability": NaN,
      "Cropped Area/Number of animals under Low suitability": NaN,
      "Cropped Area/Number of animals under Medium suitability": NaN,
      "Cropped Area/Number of animals under High suitability": NaN,
      "Cropped Area/Number of animals under Very High suitability": NaN,
    };

    let total = row_data
      ? [
          "Cropped Area/Number of animals under Nil suitability",
          "Cropped Area/Number of animals under Very Low suitability",
          "Cropped Area/Number of animals under Low suitability",
          "Cropped Area/Number of animals under Medium suitability",
          "Cropped Area/Number of animals under High suitability",
          "Cropped Area/Number of animals under Very High suitability",
        ].reduce((sum, key) => sum + (Number(row_data[key]) || 0), 0)
      : 1;

    const layerMappings = {
      "Biophysical Suitability": [
        ["#969696", "No significant change"],
        ["#E4003A", "Very low"],
        ["#FFA500", "Low"],
        ["#FFDE4D", "Medium"],
        ["#00FF00", "High"],
        ["#059212", "Very high"],
      ],
      "Scalability": [
        ["#969696", "No significant change"],
        ["#E4003A", "Very low"],
        ["#FFA500", "Low"],
        ["#FFDE4D", "Medium"],
        ["#00FF00", "High"],
        ["#059212", "Very high"],
      ],
      "default": [
        ["#969696", "No significant change"],
        ["rgba(184, 23, 23, 1)", "High dcrs"],
        ["rgba(245, 140, 170, 1)", "Decrease"],
        ["rgba(241, 233, 119, 1)", "No change"],
        ["rgba(109, 233, 109, 1)", "Increase"],
        ["rgba(4, 145, 4, 1)", "High incr"],
      ],
    };

    let selectedLayer = layerMappings[AdaptLayerName] || layerMappings["default"];
    data = selectedLayer.map(([color, label], index) =>
      createData(
        color,
        label,
        row_data[
          [
            "Cropped Area/Number of animals under Nil suitability",
            "Cropped Area/Number of animals under Very Low suitability",
            "Cropped Area/Number of animals under Low suitability",
            "Cropped Area/Number of animals under Medium suitability",
            "Cropped Area/Number of animals under High suitability",
            "Cropped Area/Number of animals under Very High suitability",
          ][index]
        ],
        (
          (row_data[
            [
              "Cropped Area/Number of animals under Nil suitability",
              "Cropped Area/Number of animals under Very Low suitability",
              "Cropped Area/Number of animals under Low suitability",
              "Cropped Area/Number of animals under Medium suitability",
              "Cropped Area/Number of animals under High suitability",
              "Cropped Area/Number of animals under Very High suitability",
            ][index]
          ] *
            100) /
          total
        ).toFixed(2),
        (row_data[
          [
            "Rural population under Nil suitability",
            "Rural population under Very Low suitability",
            "Rural population under Low suitability",
            "Rural population under Medium suitability",
            "Rural population under High suitability",
            "Rural population under Very High suitability",
          ][index]
        ] *
          0.16) /
          1000000
      )
    );
  }
  return data;
}
