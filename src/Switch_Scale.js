import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchScale({ exploreType, handleExploreTypeChange, activeScale, changeScale }) {
  const switch_type = ["Commodity specific", "Regional (non-commodity specific)"];
  const switch_type_id = ["Commodity", "Regional"];

  const switch_type2 = ["Pixel level", "District level"];
  const switch_type_id2 = ["Pixel Level", "District Level"];

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 30 + padd,
    height: 12 + padd,
    padding: padd / 2,
    display: "flex",

    "& .MuiSwitch-switchBase": {
      padding: 2 + padd / 2,
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 10,
      height: 8,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.10)",
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

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    alignItems: "flex-start",
    "&.Mui-disabled .MuiTypography-body2": {
      color: theme.palette.mode === "dark" ? "#888" : "#CCC",
    },
  }));

  return (
    <div>
      <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 3, paddingTop: 1 }}>
        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 2,
            })}
          >
            Select analysis scope
          </Typography>
          <br />
        </FormLabel>
        {switch_type_id.map((sname, indexx) => (
          <FormGroup>
            <CustomFormControlLabel
              control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={sname === exploreType ? true : false} onChange={handleExploreTypeChange(sname)} name={sname} />}
              disabled={false}
              key={sname}
              label={
                <Typography
                  variant="body2"
                  align="left"
                  sx={{
                    paddingLeft: "3px",
                    maxWidth: "250px",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                  style={{ wordWrap: "break-word" }}
                >
                  {switch_type[indexx]}
                </Typography>
              }
            />
          </FormGroup>
        ))}

        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 2,
            })}
          >
            Select visualisation scale
          </Typography>
          <br />
        </FormLabel>
        {switch_type_id2.map((sname, indexx) => (
          <FormGroup>
            <CustomFormControlLabel
              control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={sname === activeScale ? true : false} onChange={changeScale(sname)} name={sname} />}
              disabled={false}
              key={sname}
              label={
                <Typography
                  variant="body2"
                  align="left"
                  sx={{
                    paddingLeft: "3px",
                    maxWidth: "250px",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                  style={{ wordWrap: "break-word" }}
                >
                  {switch_type2[indexx]}
                </Typography>
              }
            />
          </FormGroup>
        ))}
      </FormControl>
    </div>
  );
}

