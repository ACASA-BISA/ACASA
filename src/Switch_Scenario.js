import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "./LightTooltip";

export default function SwitchScenario({ activeScenario, changeScenario, activeModel, changeModel }) {
  const switchh = ["Baseline", "SSP 2-4.5", "SSP 5-8.5"];
  const switchid = ["baseline", "ssp245", "ssp585"];
  const disvar = { baseline: false, ssp245: false, ssp585: false };
  const scenarioinfo = ["To be updated later.", "To be updated later.", "To be updated later."];

  const parents = ["ISIMIP"];
  const switchh2 = ["CHC"];
  const switchid2 = ["CHC"];
  const parentinfo = ["To be updated later.", "To be updated later."];

  const switchh3 = ["CANESM5", "CNRM-CM6-1", "CNRM-ESM-1", "EC-Earth3", "MIROC6", "Ensemble"];
  const switchid3 = ["CANESM5", "CNRM-CM6-1", "CNRM-ESM-1", "EC-Earth3", "MIROC6", "Ensemble"];
  const disvar2 = {
    "CHC": false,
    "ISIMIP": false,
    "CANESM5": false,
    "CNRM-CM6-1": false,
    "CNRM-ESM-1": false,
    "EC-Earth3": false,
    "MIROC6": false,
    "Ensemble": false,
  };
  const datainfo = ["To be updated later.", "To be updated later.", "To be updated later.", "To be updated later.", "To be updated later.", "To be updated later."];
  const padd = 8;

  function createInitialPRT() {
    const initialTodos = {};
    parents.forEach((sname) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  }

  const [PRT, setPRT] = React.useState(createInitialPRT);

  const handleChangePRT = (name) => (event) => {
    setPRT({ ...PRT, [name]: event.target.checked });
  };

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
      color: theme.palette.mode === "dark" ? "#888" : "#ccc",
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 3 }}>
      <FormLabel sx={{ display: "flex", paddingBottom: 1 }}>
        <Typography
          sx={(theme) => ({
            color: theme.palette.mode === "dark" ? "white" : "black",
            fontWeight: "bold",
            fontSize: 14,
            paddingTop: 2,
          })}
        >
          Select climate change scenario
        </Typography>
        <br />
      </FormLabel>
      {switchh.map((sname, index) => (
        <FormGroup>
          <CustomFormControlLabel
            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={activeScenario[switchid[index]]} onChange={changeScenario(switchid[index])} name={switchid[index]} />}
            key={switchid[index]}
            disabled={disvar[switchid[index]]}
            label={
              <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                {sname}
                {disvar[switchid[index]] === false && (
                  <LightTooltip
                    title={
                      <>
                        <span>{scenarioinfo[index]}</span>
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
                      <InfoOutlinedIcon sx={{ fontSize: "12px", padding: 0, margin: 0 }} />
                    </IconButton>
                  </LightTooltip>
                )}
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
          Select data source
        </Typography>
        <br />
      </FormLabel>
      {switchh2.map((sname, index) => (
        <FormGroup>
          <CustomFormControlLabel
            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={switchid2[index] === activeModel} onChange={changeModel(switchid2[index])} name={switchid2[index]} />}
            key={switchid2[index]}
            disabled={disvar2[switchid2[index]]}
            label={
              <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                {sname}
              </Typography>
            }
          />
        </FormGroup>
      ))}
      {parents.map((sname, index) => (
        <FormGroup>
          <CustomFormControlLabel
            control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={PRT[sname]} onChange={handleChangePRT(sname)} name={parents[index]} />}
            key={parents[index]}
            disabled={disvar2[sname]}
            label={
              <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                {sname}
              </Typography>
            }
          />
          {PRT["ISIMIP"] === true && (
            <FormControl component="fieldset" variant="standard" sx={{ paddingBottom: 1, paddingLeft: 5 }}>
              {switchh3.map((sname, index) => (
                <FormGroup>
                  <CustomFormControlLabel
                    control={<AntSwitch inputProps={{ "aria-label": "ant design" }} checked={switchid3[index] === activeModel} onChange={changeModel(switchid3[index])} name={switchid3[index]} />}
                    key={switchid3[index]}
                    disabled={disvar2[switchid3[index]]}
                    label={
                      <Typography variant="body2" sx={{ paddingLeft: 1 }}>
                        {sname}
                        {disvar2[switchid3[index]] === false && (
                          <LightTooltip
                            title={
                              <>
                                <span>{datainfo[index]}</span>
                                <br />
                                <Link
                                  href={`#/resources?tab=2&term=${switchh3[index].toLowerCase()}`}
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
          )}
        </FormGroup>
      ))}
    </FormControl>
  );
}
