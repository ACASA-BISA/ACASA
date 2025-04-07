import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

export default function Summ_Adapt2({ changeOption, activeCrop, activv, CropName }) {
  const [val2, setVal2] = React.useState(activv);

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

  function checkFish() {
    const fishes = ["freshwater", "bracklish", "marine", "coldwater"];
    let ans = true;
    fishes.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = false;
      }
    });
    return ans;
  }

  const directswitch = ["Stress tolerant variety"];
  const directswitchdown = ["ICT linked input management", "Crop insurance"];

  function checkpulses() {
    const cropwithoutfertilizer = ["soyabean", "chickpea", "ppea", "millets"];
    let ans = false;
    cropwithoutfertilizer.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = true;
      }
    });
    return ans;
  }

  function thirdComb() {
    const cropwithoutfertilizer = ["groundnut"];
    let ans = false;
    cropwithoutfertilizer.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = true;
      }
    });
    return ans;
  }

  function forthComb() {
    const cropwithoutfertilizer = ["cotton", "jute"];
    let ans = false;
    cropwithoutfertilizer.forEach((sname) => {
      if (activeCrop[sname] === true) {
        ans = true;
      }
    });
    return ans;
  }

  const cropTechnologies = {
    planting: {
      Rice: ["Early sowing/changing planting dates", "Dry - Direct seeded rice", "Wet - Direct seeded rice", "System of rice intensification"],
      Wheat: ["Precision land levelling", "Zero tillage with residue retention", "Broadbed and furrow", "Early sowing/changing planting dates"],
      Barley: ["Zero tillage with residue retention", "Broadbed and furrow", "Early sowing/changing planting dates"],
      Maize: ["Zero tillage with residue retention", "Broadbed and furrow", "Early sowing/changing planting dates", "Mulching"],
      Sorghum: ["Mulching"],
      Millets: ["Mulching"],
      Chickpea: ["Mulching"],
      Pigeonpea: ["Mulching"],
      Soybean: ["Broadbed and furrow", "Mulching"],
      Mustard: ["Broadbed and furrow"],
      Cotton: [],
      Potato: ["Precision land levelling", "Broadbed and furrow"],
      Groundnut: [],
      Lentil: ["Broadbed and furrow"],
      Jute: [],
    },
    water: {
      Rice: ["Microirrigation", "Alternate wetting and drying", "Precision water management"],
      Wheat: ["Microirrigation", "Precision water management"],
      Barley: ["Microirrigation", "Precision water management"],
      Maize: ["Microirrigation", "Precision water management", "Supplemental irrigation (water harvesting structures/farm ponds)"],
      Sorghum: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Millets: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Chickpea: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Pigeonpea: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Soybean: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Mustard: ["Microirrigation", "Precision water management"],
      Cotton: ["Microirrigation", "Precision water management", "Supplemental irrigation (water harvesting structures/farm ponds)"],
      Potato: ["Microirrigation", "Precision water management"],
      Groundnut: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
      Lentil: ["Microirrigation", "Precision water management"],
      Jute: ["Supplemental irrigation (water harvesting structures/farm ponds)"],
    },
    getPlantingTechniques(cropName) {
      return this.planting[cropName] || [];
    },

    getWaterTechniques(cropName) {
      return this.water[cropName] || [];
    },
  };

  const fertilizer = ["Smart fertilizer management", "Precision fertilizer management"];

  const livestock = ["Shelter Management", "Feed Management", "Healthcare Management"];

  const marine = ["To be Updated"];

  const handleChange2 = (event) => {
    setVal2(event.target.value);
    //console.log(event.target.value);
    changeOption(event.target.value);
  };

  return (
    <FormControl sx={{ width: "160px" }}>
      <Select
        disableUnderline
        id="Country-select-id"
        value={val2}
        onChange={handleChange2}
        MenuProps={{
          disableScrollLock: true,
        }}
        variant="standard"
        sx={(theme) => ({
          backgroundColor: theme.palette.mode === "dark" ? "rgba(50, 55, 50, 1)" : "rgba(240, 242, 233, 1)",
          fontSize: 12,
        })}
      >
        {(checkcrop() === true || activeCrop["rice"] === true) &&
          directswitch.map((naam, idx) => (
            <MenuItem value={naam} sx={{ fontSize: 12 }}>
              {directswitch[idx]}
            </MenuItem>
          ))}
        {(checkcrop() === true || activeCrop["rice"] === true) &&
          directswitchdown.map((naam, idx) => (
            <MenuItem value={naam} sx={{ fontSize: 12 }}>
              {directswitchdown[idx]}
            </MenuItem>
          ))}
        {(checkcrop() === true || activeCrop["rice"] === true) && forthComb() === false && thirdComb() === false && (
          <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontWeight: "bold", fontSize: 12 }}>
            Planting Technology
          </Typography>
        )}
        {(checkcrop() === true || activeCrop["rice"] === true) &&
          forthComb() === false &&
          thirdComb() === false &&
          cropTechnologies.getPlantingTechniques(CropName).map((naam) => (
            <MenuItem value={naam} sx={{ fontSize: 12 }}>
              {naam}
            </MenuItem>
          ))}
        {(checkcrop() === true || activeCrop["rice"] === true) && (
          <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontWeight: "bold", fontSize: 12 }}>
            Water Management
          </Typography>
        )}
        {(checkcrop() === true || activeCrop["rice"] === true) &&
          cropTechnologies.getWaterTechniques(CropName).map((naam) => (
            <MenuItem value={naam} sx={{ fontSize: 12 }}>
              {naam}
            </MenuItem>
          ))}
        {(checkcrop() === true || activeCrop["rice"] === true) && checkpulses() === false && thirdComb() === false && (
          <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontWeight: "bold", fontSize: 12 }}>
            Fertilizer Management
          </Typography>
        )}
        {(checkcrop() === true || activeCrop["rice"] === true) &&
          checkpulses() === false &&
          thirdComb() === false &&
          fertilizer.map((naam, idx) => (
            <MenuItem value={naam} sx={{ fontSize: 12 }}>
              {fertilizer[idx]}
            </MenuItem>
          ))}

        {
          //Livestock From Here.....
        }
        {checkcrop() === false &&
          activeCrop["rice"] === false &&
          checkFish() === true &&
          livestock.map((naam, idx) => (
            <MenuItem value={naam} sx={{ fontSize: 12 }}>
              {livestock[idx]}
            </MenuItem>
          ))}
        {checkcrop() === false &&
          activeCrop["rice"] === false &&
          checkFish() === false &&
          marine.map((naam, idx) => (
            <MenuItem value={naam} sx={{ fontSize: 12 }}>
              {marine[idx]}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
