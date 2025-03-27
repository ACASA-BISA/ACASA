import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

export default function Summ_Comm({ changeComm, comm }) {
  const [val2, setVal2] = React.useState(comm);

  const switchco = ["Rice", "Wheat", "Maize", "Barley", "Sorghum", "Finger Millet", "Pearl Millet"];
  const switchcoid = ["rice", "wheat", "maize", "barley", "sorghum", "fmillet", "pmillet"];

  const switchffp = ["Potato", "Onion", "Tomato", "Chillies", "Mango", "Banana"];
  const switchffpid = ["potato", "onion", "tomato", "chilli", "mango", "banana"];

  const switchfish = ["Freshwater", "Bracklish", "Marine", "Cold water"];
  const switchfishid = ["freshwater", "bracklish", "marine", "coldwater"];

  const switchls = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Chicken"];
  const switchlsid = ["cattle", "buffalo", "goat", "sheep", "pig", "poultry"];

  const switchind = ["Cotton", "Jute", "Rubber", "Sugarcane", "Tea", "Coconut"];
  const switchindid = ["cotton", "jute", "rubber", "sugarcane", "tea", "coconut"];

  const switchhc = ["Chickpea", "Pigeonpea", "Black Gram", "Green Gram", "Lentil"];
  const switchhcid = ["chickpea", "ppea", "bgram", "ggram", "lentil"];

  const switchoil = ["Soybean", "Safflower", "Sunflower", "Mustard", "Sesame", "Groundnut"];
  const switchoilid = ["soyabean", "safflower", "sunflower", "rapeseed", "sesame", "groundnut"];

  const handleChange2 = (event) => {
    setVal2(event.target.value);
    changeComm(event.target.value);
  };
  return (
    <FormControl sx={{ width: "140px" }}>
      <Select
        disableUnderline
        id="Country-select-id"
        value={val2}
        onChange={handleChange2}
        MenuProps={{
          disableScrollLock: true,
        }}
        variant="standard"
        sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)", fontSize: 13 })}
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
        <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Fruits & Vegetables
        </Typography>
        {switchffpid.map((naam, idx) => (
          <MenuItem value={naam} sx={{ fontSize: 13, paddingY: "2px" }}>
            {switchffp[idx]}
          </MenuItem>
        ))}
        <Typography variant="subtitle1" sx={{ paddingLeft: 1, fontSize: 13, fontWeight: "bold" }}>
          Industrial
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
