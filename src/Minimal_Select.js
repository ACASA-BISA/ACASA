import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

export function SelectMinimal({ changeComm }) {
  const [val2, setVal2] = React.useState("rice");

  const switchco = ["Rice", "Wheat", "Maize", "Barley", "Sorghum", "Millets"];
  const switchcoid = ["rice", "wheat", "maize", "barley", "sorghum", "millets"];

  //const switchffp = ["Potato", "Onion", "Tomato", "Chillies", "Mango", "Banana"];
  //const switchffpid = ["potato", "onion", "tomato", "chilli", "mango", "banana"];

  //const switchfish = ["Freshwater", "Bracklish", "Marine", "Cold water"];
  //const switchfishid = ["freshwater", "bracklish", "marine", "coldwater"];

  const switchls = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
  const switchlsid = ["cattle", "buffalo", "goat", "sheep", "pig", "poultry"];

  //const switchind = ["Cotton", "Jute", "Rubber", "Sugarcane", "Tea", "Coconut"];
  //const switchindid = ["cotton", "jute", "rubber", "sugarcane", "tea", "coconut"];

  const switchind = ["Cotton", "Jute", "Potato"];
  const switchindid = ["cotton", "jute", "potato"];

  //const switchhc = ["Chickpea", "Pigeonpea", "Black Gram", "Green Gram", "Lentil"];
  //const switchhcid = ["chickpea", "ppea", "bgram", "ggram", "lentil"];

  const switchhc = ["Chickpea", "Pigeonpea", "Lentil"];
  const switchhcid = ["chickpea", "ppea", "lentil"];

  //const switchoil = ["Soybean", "Safflower", "Sunflower", "Mustard", "Sesame", "Groundnut"];
  //const switchoilid = ["soyabean", "safflower", "sunflower", "rapeseed", "sesame", "groundnut"];

  const switchoil = ["Soybean", "Mustard", "Groundnut"];
  const switchoilid = ["soyabean", "rapeseed", "groundnut"];

  const handleChange = (event) => {
    setVal2(event.target.value);
    changeComm(event.target.value);
  };
  return (
    <FormControl sx={{ width: "200px" }}>
      <Select
        disableUnderline
        id="Country-select-id"
        value={val2}
        onChange={handleChange}
        MenuProps={{
          disableScrollLock: true,
        }}
        variant="standard"
        sx={{ backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(35, 40, 32, 1)" : "rgba(240, 242, 233,1)") }}
      >
        <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Cereals
        </Typography>
        {switchcoid.map((naam, idx) => (
          <MenuItem value={naam} sx={{ fontSize: 13, paddingY: "2px" }}>
            {switchco[idx]}
          </MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Pulses
        </Typography>
        {switchhcid.map((naam, idx) => (
          <MenuItem value={naam} sx={{ fontSize: 13, paddingY: "2px" }}>
            {switchhc[idx]}
          </MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Oilseeds
        </Typography>
        {switchoilid.map((naam, idx) => (
          <MenuItem value={naam} sx={{ fontSize: 13, paddingY: "2px" }}>
            {switchoil[idx]}
          </MenuItem>
        ))}
        {/* <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Fruits & Vegetables
        </Typography>
        {switchffpid.map((naam, idx) => (
          <MenuItem value={naam} sx={{ fontSize: 13, paddingY: "2px" }}>
            {switchffp[idx]}
          </MenuItem>
        ))} */}
        <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Others
        </Typography>
        {switchindid.map((naam, idx) => (
          <MenuItem value={naam} sx={{ fontSize: 13, paddingY: "2px" }}>
            {switchind[idx]}
          </MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Livestock
        </Typography>
        {switchlsid.map((naam, idx) => (
          <MenuItem value={naam} sx={{ fontSize: 13, paddingY: "2px" }}>
            {switchls[idx]}
          </MenuItem>
        ))}
        {/* <Typography variant="subtitle1" sx={{paddingLeft:1,fontSize:13,fontWeight:'bold'}}>Fisheries</Typography>
        {switchfishid.map((naam,idx) => (
            <MenuItem value={naam} sx={{fontSize:13,paddingY:'2px'}}>{switchfish[idx]}</MenuItem>
        ))} */}
      </Select>
    </FormControl>
  );
}
