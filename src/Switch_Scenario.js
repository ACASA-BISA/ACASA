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
  const scenarioinfo = [
    "A 30-year period (1984–2013) used as reference.",
    "A middle-of-the-road scenario, reaching 4.5 W/m² radiative forcing by 2100 (Medium challenges to mitigation and adaptation).",
    "A high-emission scenario, reaching 8.5 W/m² radiative forcing by 2100 (High challenges to mitigation, low challenges to adaptation).",
  ];

  const parents = ["ISIMIP"];
  const parentinfo = ["A global modeling initiative that assesses climate change impacts across sectors and regions using consistent scenarios and methods."];

  const switchh2 = ["CHC"];
  const switchid2 = ["CHC"];
  const switchh2popup = ["A team of scientists using climate models, satellite data, and socioeconomic info to monitor droughts and food insecurity in vulnerable regions."]

  const switchh3 = ["GFDL-ESM4", "IPSL-CM6A-LR", "MPI-ESM1-2-HR", "MPI-ESM2-0", "UKESM1-0-LL", "Ensemble"];
  const switchid3 = ["GFDL-ESM4", "IPSL-CM6A-LR", "MPI-ESM1-2-HR", "MPI-ESM2-0", "UKESM1-0-LL", "Ensemble"];
  const disvar2 = {
    "CHC": false,
    "ISIMIP": false,
    "GFDL-ESM4": false,
    "IPSL-CM6A-LR": false,
    "MPI-ESM1-2-HR": false,
    "MPI-ESM2-0": false,
    "UKESM1-0-LL": false,
    "Ensemble": false,
  };
  const datainfo = [
    "A model by the Geophysical Fluid Dynamics Laboratory (USA) that integrates atmospheric, ocean, sea-ice, and land surface models with dynamic vegetation and coupled carbon-nitrogen cycles.",
    "A model by the Institut Pierre-Simon Laplace (France) that couples atmospheric, ocean, sea-ice, and land surface models, with interactive carbon cycles and biogeochemical dynamics.",
    "A model by the Max Planck Institute (Germany) that integrates atmospheric, ocean, marine biogeochemistry, and land surface models, focusing on climate-carbon feedbacks.",
    "A model by the Meteorological Research Institute (Japan) that combines atmospheric, ocean, sea-ice, and land surface models, simulating hydrology, snow processes, and carbon-nitrogen cycles.",
    "A model by the UK Met Office Hadley Centre, integrating atmospheric, ocean, sea-ice, land surface, and biogeochemical models with dynamic ice sheets and coupling managed by the OASIS coupler.",
    "Combining results from GFDL-ESM4, IPSL-CM6A-LR, MPI-ESM1-2-HR, UKESM1-0-LL, and MRI-ESM2-0 to capture diverse climate outcomes and reduce uncertainty in projections.",
  ];
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
                <LightTooltip
                  title={
                    <>
                      <span>{switchh2popup}</span>
                      <br />
                      <Link
                        href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
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
                <LightTooltip
                  title={
                    <>
                      <span>{parentinfo}</span>
                      <br />
                      <Link
                        href={`#/resources?tab=2&term=${sname.toLowerCase()}`}
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
          )}
        </FormGroup>
      ))}
    </FormControl>
  );
}
