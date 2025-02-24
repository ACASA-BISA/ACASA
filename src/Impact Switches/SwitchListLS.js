import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function SwitchesGroup({ activeCrop, changeCrop }) {
  const switchh = ["Cattle", "Buffalo", "Goat", "Sheet", "Pig", "Poultry"];
  const switchid = ["cattle", "buffalo", "goat", "sheet", "pig", "poultry"];

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 32 + padd,
    height: 14 + padd,
    padding: padd / 2,
    display: "flex",

    "& .MuiSwitch-switchBase": {
      padding: 2 + padd / 2,
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          // 4ba046 and 4aba03 and dea426 and b9f04d
          backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#4ba046",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 10,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.10)",
      boxSizing: "border-box",
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#554d38" : "#ffe89c",
      opacity: 1,
      borderRadius: 12,
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.7)",
      },
    },
  }));
  return (
    <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 6 }}>
      <FormGroup>
        {switchid.map((sname, index) => (
          <FormControlLabel
            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeCrop[sname]} onChange={changeCrop(sname)} name={sname} />}
            key={sname}
            label={
              <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                {switchh[index]}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
