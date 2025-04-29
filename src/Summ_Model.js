import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Summ_Model({ handleModel, mdl }) {
  const handleChange = (event) => {
    handleModel(event.target.value);
  };

  return (
    <FormControl sx={{ width: "160px" }}>
      <Select
        disableUnderline
        id="Country-select-id"
        value={mdl}
        onChange={handleChange}
        MenuProps={{
          disableScrollLock: true,
        }}
        variant="standard"
        sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "rgba(60, 75, 60, 1)" : "rgba(235, 247, 233, 1)", fontSize: 13 })}
      >
        <MenuItem value="CHC" sx={{ fontSize: 13, paddingY: "2px" }}>
          CHC
        </MenuItem>
        <MenuItem value="GFDL-ESM4" sx={{ fontSize: 13, paddingY: "2px" }}>
          GFDL-ESM4
        </MenuItem>
        <MenuItem value="IPSL-CM6A-LR" sx={{ fontSize: 13, paddingY: "2px" }}>
          IPSL-CM6A-LR
        </MenuItem>
        <MenuItem value="MPI-ESM1-2-HR" sx={{ fontSize: 13, paddingY: "2px" }}>
          MPI-ESM1-2-HR
        </MenuItem>
        <MenuItem value="MPI-ESM2-0" sx={{ fontSize: 13, paddingY: "2px" }}>
          MPI-ESM2-0
        </MenuItem>
        <MenuItem value="UKESM1-0-LL" sx={{ fontSize: 13, paddingY: "2px" }}>
          UKESM1-0-LL
        </MenuItem>
        <MenuItem value="Ensemble" sx={{ fontSize: 13, paddingY: "2px" }}>
          Ensemble
        </MenuItem>
      </Select>
    </FormControl>
  );
}
