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

    // Newly added entries
    "Micro climate modification-sheds": "Shelter1",
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
    "Diversification": "Diversify",
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
    let opt_prefix = "";

    if (AdaptLayerName === "Yield Benefits") opt_prefix = "Yield";
    if (AdaptLayerName === "Economic Viability") opt_prefix = "Economic";
    if (AdaptLayerName === "Scalability") opt_prefix = "Scalability";
    if (AdaptLayerName === "Gender Suitability") opt_prefix = "Gender";
    if (AdaptLayerName === "Adaptation Benefits") opt_prefix = "Adaptation";

    if (AdaptLayerName === "Adaptation Benefits" && scenario === "baseline") opt_prefix = "Yield";

    if (sec > 0) {
      y = location.substring(0, sec);
      x = location.substring(sec + 2);
      let statecode = "";

      if (["Bangladesh", "Nepal", "Bhutan", "Maldives", "Afghanistan", "India", "Sri Lanka", "Pakistan"].includes(x)) {
        statecode = x === "Bangladesh" ? y.substring(0, y.length - 9) + "DIV" : y + "DIV";
        rowstr = `${commodity}_${statecode}_${opt_prefix}${optcode[adaption]}_${scenario}`;
      }
    } else {
      rowstr = `Calculated_${commodity}_${location}_${opt_prefix}${optcode[adaption]}_${scenario}`;
    }

    function checkcrop2() {
      const livestock = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
      let ans = true;
      livestock.forEach((sname) => {
        if (commodity === sname) {
          ans = false;
        }
      });
      return ans;
    }

    //console.log(rowstr);
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
      "Biophysical Suitability":
        checkcrop2() === false
          ? [
              ["#969696", "No significant change"],
              ["rgba(150,150,150,1)", "No Hazard"], //"#E4003A"
              ["#FF4500", "Very Low"], //"#FFA500"
              ["#FFDE4D", "Low"],
              ["#00FF00", "Medium"],
              ["#059212", "High"],
            ]
          : [
              ["#969696", "No significant change"],
              ["#A52A2A", "Unsuitable"], //"#E4003A"
              ["#FF4500", "Very Low"], //"#FFA500"
              ["#FFDE4D", "Low"],
              ["#00FF00", "Medium"],
              ["#059212", "High"],
            ],
      "Yield Benefits": [
        ["#969696", "No significant change"],
        ["#A52A2A", "Unsuitable"], //"#E4003A"
        ["rgb(248, 36, 36)", "High loss"],
        ["rgba(245, 140, 170, 1)", "Low loss"],
        ["rgba(109, 233, 109, 1)", "Low gain"],
        ["rgba(4, 145, 4, 1)", "High gain"],
      ],
      "Economic Viability": [
        ["#969696", "No significant change"],
        ["#A52A2A", "Unsuitable"], //"#E4003A"
        ["#FF4500", "Very Low"], //"#FFA500"
        ["#FFDE4D", "Low"],
        ["#00FF00", "Medium"],
        ["#059212", "High"],
      ],
      "Scalability": [
        /* ["#969696", "No significant change"],
        ["#E4003A", "Very low"],
        ["#FFA500", "Low"],
        ["#FFDE4D", "Medium"],
        ["#00FF00", "High"],
        ["#059212", "Very high"], */
        ["#969696", "No significant change"],
        ["#A52A2A", "Unsuitable"], //"#E4003A"
        ["#FF4500", "Very Low"], //"#FFA500"
        ["#FFDE4D", "Low"],
        ["#00FF00", "Medium"],
        ["#059212", "High"],
      ],
      "Gender Suitability": [
        ["#969696", "No significant change"],
        ["#A52A2A", "Unsuitable"], //"#E4003A"
        ["#FF4500", "Very Low"], //"#FFA500"
        ["#FFDE4D", "Low"],
        ["#00FF00", "Medium"],
        ["#059212", "High"],
      ],
      "Adaptation Benefits": [
        ["#969696", "No significant change"],
        ["#A52A2A", "Unsuitable"], //"#E4003A"
        ["rgb(248, 36, 36)", "High loss"],
        ["rgba(245, 140, 170, 1)", "Low loss"],
        ["rgba(109, 233, 109, 1)", "Low gain"],
        ["rgba(4, 145, 4, 1)", "High gain"],
      ],
      "default": [
        /* ["#969696", "No significant change"],
        ["rgba(184, 23, 23, 1)", "High dcrs"],
        ["rgba(245, 140, 170, 1)", "Decrease"],
        ["rgba(241, 233, 119, 1)", "No change"],
        ["rgba(109, 233, 109, 1)", "Increase"],
        ["rgba(4, 145, 4, 1)", "High incr"], */
        ["#969696", "No significant change"],
        ["#A52A2A", "Unsuitable"], //"#E4003A"
        ["#FF4500", "Very Low"], //"#FFA500"
        ["#FFDE4D", "Low"],
        ["#00FF00", "Medium"],
        ["#059212", "High"],
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
