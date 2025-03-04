import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Summ_Scenario({ handleScenario, scn }) {
  const handleChange = (event) => {
    handleScenario(event.target.value);
  };

  return (
    <FormControl sx={{ width: "160px" }}>
      <Select
        disableUnderline
        id="Country-select-id"
        value={scn}
        onChange={handleChange}
        MenuProps={{
          disableScrollLock: true,
        }}
        variant="standard"
        sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)", fontSize: 13 })}
      >
        <MenuItem value="baseline" sx={{ fontSize: 13, paddingY: "2px" }}>
          Baseline
        </MenuItem>
        <MenuItem value="ssp245" sx={{ fontSize: 13, paddingY: "2px" }}>
          SSP 2-4.5
        </MenuItem>
        <MenuItem value="ssp585" sx={{ fontSize: 13, paddingY: "2px" }}>
          SSP 5-8.5
        </MenuItem>
      </Select>
    </FormControl>
  );
}
