export function fetchDataAdap(activeScale, adaption, location, AdaptLayerName, commodity, scenario, area_data3) {
  let data = [];
  let urlstr = "";

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

  const createData = (color, Cat, Area, AreaPerc, Population) => ({
    color,
    Cat,
    Area,
    AreaPerc,
    Population,
  });

  if (activeScale === "District Level") {
    urlstr = "DISTRICT_";
  }

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
    if (AdaptLayerName === "Female labourer suitability") opt_prefix = "Labour";
    if (AdaptLayerName === "Female cultivator suitability") opt_prefix = "Cultivator";
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
      "Land-climate suitability":
        checkcrop2() === false
          ? [
              ["#969696", "No significant change"],
              ["rgba(150,150,150,1)", "Inapt"], //"#E4003A"
              ["#FF4500", "Very Low"], //"#FFA500"
              ["#FFDE4D", "Low"],
              ["#00FF00", "Medium"],
              ["#059212", "High"],
            ]
          : [
              ["#969696", "No significant change"],
              ["#A52A2A", "Unsuitable"], //"#E4003A"
              ["#d4ee9e", "Suitable - No hazards"], //"#FFA500", "#AED581", "#A8E6A1", "#B2F2BB", "#C5E1A5", "#C0D9AF", "#BFD8A6", "#D0E6A5", "#ACE1AF"
              ["#a1d99b", "Low"],
              ["#31a354", "Medium"],
              ["#00441b", "High"],
            ],
      "Yield Benefits": [
        ["#969696", "No significant change"],
        //["#A52A2A", "Unsuitable"], //"#E4003A"
        ["rgb(248, 36, 36)", "Medium loss\n<-15%"],
        ["#FF8C00", "Low loss\n-15% to -5%"],
        ["#FFDE4D", "Nil\n-5% to 5%"],
        ["rgba(109, 233, 109, 1)", "Low gain\n5% to 15%"],
        ["rgba(4, 145, 4, 1)", "Medium gain\n>15%"],
      ],
      "Economic Viability": [
        ["#969696", "No significant change"],
        ["rgb(248, 36, 36)", "Very Low"], //"#E4003A"
        ["#FF8C00", "Low"], //"#FFA500"
        ["#FFDE4D", "Medium"],
        ["rgba(109, 233, 109, 1)", "High"],
        ["rgba(4, 145, 4, 1)", "Very High"],
      ],
      "Scalability": [
        /* ["#969696", "No significant change"],
        ["#E4003A", "Very low"],
        ["#FFA500", "Low"],
        ["#FFDE4D", "Medium"],
        ["#00FF00", "High"],
        ["#059212", "Very high"], */
        ["#969696", "No significant change"],
        ["rgb(248, 36, 36)", "Very Low"], //"#E4003A"
        ["#FF8C00", "Low"], //"#FFA500"
        ["#FFDE4D", "Medium"],
        ["rgba(109, 233, 109, 1)", "High"],
        ["rgba(4, 145, 4, 1)", "Very High"],
      ],
      /*"Gender Suitability": [
        ["#969696", "No significant change"],
        ["#FF8C00", "Highly unsuitable"], //"#E4003A" "#FF8C00", "#FFDE4D", "#B6F792", "#B6F792", "#00D95A", "#267F2E",
        ["#FFDE4D", "Unsuitable"], //"#FFA500"
        ["#B6F792", "Suitable"],
        ["#00D95A", "Highly suitable"],
        //["#267F2E", "Very High"],
      ],*/
      "Gender Suitability": [
        ["#969696", "No significant change"],
        ["#f82424ff", "Considerable decrease"], //"#E4003A" "#FF8C00", "#FFDE4D", "#B6F792", "#B6F792", "#00D95A", "#267F2E",
        ["#FF8C00", "Moderate decrease"], //"#FFA500"
        ["#FFDE4D", "No change"],
        ["#6de96dff", "Moderate increase"],
        ["#049104ff", "Considerable increase"],
      ],
      "Female labourer suitability": [
        ["#969696", "No significant change"],
        ["#f82424ff", "Considerable decrease"], //"#E4003A" "#FF8C00", "#FFDE4D", "#B6F792", "#B6F792", "#00D95A", "#267F2E",
        ["#FF8C00", "Moderate decrease"], //"#FFA500"
        ["#FFDE4D", "No change"],
        ["#6de96dff", "Moderate increase"],
        ["#049104ff", "Considerable increase"],
      ],
      "Female cultivator suitability": [
        ["#969696", "No significant change"],
        ["#f82424ff", "Considerable decrease"], //"#E4003A" "#FF8C00", "#FFDE4D", "#B6F792", "#B6F792", "#00D95A", "#267F2E",
        ["#FF8C00", "Moderate decrease"], //"#FFA500"
        ["#FFDE4D", "No change"],
        ["#6de96dff", "Moderate increase"],
        ["#049104ff", "Considerable increase"],
      ],
      "Adaptation Benefits":
        scenario === "baseline"
          ? [
              ["#969696", "No significant change"],
              ["#d73027", "Very Low"], //"#E4003A"
              ["#fc8d59", "Low"], //"#FFA500"
              ["#fee08b", "Medium"],
              ["#91bfdb", "High"],
              ["#4575b4", "Very High"],
            ]
          : [
              ["#969696", "No significant change"],
              ["rgba(4, 145, 4, 1)", "Adaptation"],
              ["#FFDE4D", "Revisit"],
              ["rgb(248, 36, 36)", "Maladaptation"],
              ["rgba(150,150,150,1)", "Ineffective"],
              //["#FFDE4D", "Nil"],
              //["rgba(109, 233, 109, 1)", "Low gain"],
            ],
      "default": [
        /* ["#969696", "No significant change"],
        ["rgba(184, 23, 23, 1)", "High dcrs"],
        ["#FF8C00", "Decrease"],
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
