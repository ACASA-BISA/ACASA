import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "../LightTooltip";

export default function SwitchLivestock({ activeCrop, changeCrop }) {
  const switchh = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Poultry"];
  const switchid = ["cattle", "buffalo", "goat", "sheep", "pig", "poultry"];
  const disvar = {
    cattle: false,
    buffalo: false,
    goat: false,
    sheep: false,
    pig: false,
    poultry: false,
  };

  const padd = 8;
  const season = [
    "Season information to be updated",
    "Season information to be updated",
    "Season information to be updated",
    "Season information to be updated",
    "Season information to be updated",
    "Season information to be updated",
  ];

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
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#4ba046",
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
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.10)",
      boxSizing: "border-box",
    },
    "&:hover": {
      backgroundColor: "#ffe89c ",
      opacity: 1,
      borderRadius: 12,
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,.35)"
            : "rgba(255,255,255,.7)",
      },
    },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "&.Mui-disabled .MuiTypography-body2": {
      color: "#ccc", // Color for the label text when disabled
    },
  }));

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{ paddingBottom: 1, paddingLeft: 6 }}
    >
      <FormGroup>
        {switchh.map((sname, index) => (
          <CustomFormControlLabel
            control={
              <AntSwitch
                inputProps={{ "aria-label": "ant design" }}
                checked={activeCrop[switchid[index]]}
                onChange={changeCrop(switchid[index])}
                name={switchid[index]}
              />
            }
            key={switchid[index]}
            disabled={disvar[switchid[index]]}
            label={
              <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                {sname}
                {disvar[switchid[index]] === false && (
                  <LightTooltip
                    title={
                      <>
                        <span>{season[index]}</span>
                        <br />
                        <Link
                          href="#/resources/?tab=4"
                          target="_blank"
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Read More
                        </Link>
                      </>
                    }
                    placement="top"
                    arrow
                  >
                    <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                      <InfoOutlinedIcon
                        sx={{ fontSize: "12px", padding: 0, margin: 0 }}
                      />
                    </IconButton>
                  </LightTooltip>
                )}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
