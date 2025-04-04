import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "./LightTooltip";

export default function SwitchImpact({ activeImpact, changeImpact, activeCrop, exploreType }) {
  const switchh = ["Productivity", "Resilience", "Value of Production"];

  const disvar = {
    "Productivity": true,
    "Resilience": true,
    "Value of Production": true,
  };

  const season = ["Crop yield (T/Ha) from remote sensing and crop statistics", "Yield stability over years, measured by variance", "USD/Ha at 2019 prices for a commodity"];

  const padd = 8;

  const fullList = [
    "rice",
    "wheat",
    "maize",
    "barley",
    "sorghum",
    "fmillet",
    "pmillet",
    "safflower",
    "sunflower",
    "rapeseed",
    "sesame",
    "groundnut",
    "soyabean",
    "chickpea",
    "ppea",
    "bgram",
    "ggram",
    "lentil",
    "cotton",
    "jute",
    "rubber",
    "sugarcane",
    "tea",
    "coconut",
    "cattle",
    "buffalo",
    "goat",
    "sheep",
    "pig",
    "poultry",
    "freshwater",
    "bracklish",
    "marine",
    "coldwater",
    "potato",
    "onion",
    "tomato",
    "chilli",
    "mango",
    "banana",
  ];

  const Common = [
    "Rice",
    "Wheat",
    "Maize",
    "Barley",
    "Sorghum",
    "Finger Millet",
    "Pearl Millet",
    "Safflower",
    "Sunflower",
    "Rapeseed/Mustard",
    "Sesame",
    "Groundnut",
    "Soybean",
    "Chickpea",
    "Pigeonpea",
    "Black Gram",
    "Green Gram",
    "Lentil",
    "Cotton",
    "Jute",
    "Rubber",
    "Sugarcane",
    "Tea",
    "Coconut",
    "Cattle",
    "Buffalo",
    "Goat",
    "Sheep",
    "Pig",
    "Chicken",
    "Freshwater",
    "Bracklish",
    "Marine",
    "Cold water",
    "Potato",
    "Onion",
    "Tomato",
    "Chillies",
    "Mango",
    "Banana",
  ];

  let cropname = "Rice";
  fullList.forEach((sname, indx) => {
    if (activeCrop[sname] === true) {
      cropname = Common[indx];
    }
  });

  const AntSwitch = styled(Switch)(({ theme }) => ({
    "width": 32 + padd,
    "height": 14 + padd,
    "padding": padd / 2,
    "display": "flex",

    "& .MuiSwitch-switchBase": {
      "padding": 2 + padd / 2,
      "&.Mui-checked": {
        "transform": "translateX(16px)",
        "color": "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
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
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.10)",
      boxSizing: "border-box",
    },
    "&:hover": {
      "backgroundColor": theme.palette.mode === "dark" ? "#554d38" : "#ffe89c",
      "opacity": 1,
      "borderRadius": 12,
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.7)",
      },
    },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "alignItems": "flex-start",
    "&.Mui-disabled .MuiTypography-body2": {
      color: theme.palette.mode === "dark" ? "#888" : "#E8E8E8",
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 3 }}>
      {exploreType === "Commodity" && (
        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 2,
            })}
          >
            Select impact on {cropname.toLowerCase()}
          </Typography>
          <br />
        </FormLabel>
      )}
      {exploreType === "Regional" && (
        <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 2,
            })}
          >
            Select Impact
          </Typography>
          <br />
        </FormLabel>
      )}
      {switchh.map((sname, index) => (
        <FormGroup>
          <CustomFormControlLabel
            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeImpact[sname]} onChange={changeImpact(sname)} name={sname} />}
            key={sname}
            disabled={false}
            label={
              <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                {sname.charAt(0).toUpperCase() + sname.toLowerCase().slice(1)}
                {disvar[sname] && (
                  <LightTooltip
                    title={
                      <>
                        <span>{season[index]}</span>
                        <br />
                        <Link
                          href={`#/resources?tab=2&term=${switchh[index].toLowerCase()}`}
                          target="_blank"
                          sx={(theme) => ({
                            color: theme.palette.mode === "dark" ? "black" : "white",
                            fontWeight: "bold",
                          })}
                        >
                          Read More
                        </Link>
                      </>
                    }
                    placement="right"
                    arrow
                  >
                    <IconButton sx={{ padding: 0, margin: 0, paddingX: "4px" }}>
                      <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                    </IconButton>
                  </LightTooltip>
                )}
              </Typography>
            }
          />
        </FormGroup>
      ))}
    </FormControl>
  );
}
