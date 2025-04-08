import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Summ_Adaptation_Indicator({ handleIndicator, indc }) {
  //const switchh2 = ["Biophysical Suitability", "Gender", "Adaptation Benefits", "Economic", "Scalability"];

  const handleChange = (event) => {
    handleIndicator(event.target.value);
  };

  return (
    <FormControl sx={{ width: "160px" }}>
      <Select
        disableUnderline
        id="Country-select-id"
        value={indc}
        onChange={handleChange}
        MenuProps={{
          disableScrollLock: true,
        }}
        variant="standard"
        sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)", fontSize: 13 })}
      >
        <MenuItem value="Biophysical Suitability" sx={{ fontSize: 13, paddingY: "2px" }}>
          Biophysical Suitability
        </MenuItem>
        <MenuItem value="Scalability" sx={{ fontSize: 13, paddingY: "2px" }}>
          Scalibility
        </MenuItem>
        <MenuItem value="Gender Suitability" sx={{ fontSize: 13, paddingY: "2px" }}>
          Gender Suitability
        </MenuItem>
        <MenuItem value="Yield Benefits" sx={{ fontSize: 13, paddingY: "2px" }}>
          Yield Benefits
        </MenuItem>
        <MenuItem value="Economic Viability" sx={{ fontSize: 13, paddingY: "2px" }}>
          Economic Viability
        </MenuItem>
        <MenuItem value="Adaptation Benefits" sx={{ fontSize: 13, paddingY: "2px" }}>
          Adaptation Benefits
        </MenuItem>
      </Select>
    </FormControl>
  );
}
