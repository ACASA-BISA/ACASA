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

export default function SwitchOilseeds({ activeCrop, changeCrop }) {
  const switchh = [
    "Soybean",
    "Safflower",
    "Sunflower",
    "Rapeseed/Mustard",
    "Sesame",
    "Groundnut",
  ];
  const switchid = [
    "soyabean",
    "safflower",
    "sunflower",
    "rapeseed",
    "sesame",
    "groundnut",
  ];
  const disvar = {
    soyabean: false,
    safflower: true,
    sunflower: true,
    rapeseed: false,
    sesame: true,
    groundnut: false,
  };
  const padd = 8;
  const season = [
    "Soybean is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif') and Maha in Sri Lanka",
    "",
    "",
    "Analysis done for Rabi/winter season.",
    "",
    "Groundnut is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif' in India) and Maha in Sri Lanka.",
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
              backgroundColor:
                theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
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
            theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.10)",
          boxSizing: "border-box",
        },
        '&:hover': { 
    backgroundColor: theme.palette.mode === 'dark' ? '#554d38' : '#ffe89c', 
    opacity: 1,
    borderRadius: 12,
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.7)',
    },
},
      }));
      
      const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
        alignItems: "flex-start",
        "&.Mui-disabled .MuiTypography-body2": {
          color: theme.palette.mode === "dark" ? "#888" : "#ccc",
        },
      }));

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{ paddingBottom: 1, paddingLeft: 6 }}
    >
      <FormGroup>
        {switchid.map((sname, index) => (
          <CustomFormControlLabel
            control={
              <AntSwitch
                inputProps={{ "aria-label": "ant design" }}
                checked={activeCrop[sname]}
                onChange={changeCrop(sname)}
                name={sname}
              />
            }
            key={sname}
            disabled={disvar[sname]}
            label={
              <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                {switchh[index]}
                {disvar[sname] === false && (
                  <LightTooltip
                    title={
                      <>
                        <span>{season[index]}</span>
                        <br />
                        <Link
                          href={`#/resources?tab=2&term=${switchh[index].toLowerCase()}`}
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
