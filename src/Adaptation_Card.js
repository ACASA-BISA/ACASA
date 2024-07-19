import * as React from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Popper } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Props:
// The component receives props to customize its content:
// activeCrop: Likely the name of the selected crop
// activeRegion: Likely the name of the selected region
// adapOption: The adaptation option title to be displayed
// heightnext: The height of a previous element for positioning

export default function AdaptationCard({
  activeCrop,
  activeRegion,
  adapOption,
  heightnext,
}) {
  // Hook:
  // The useNavigate hook is used to handle navigation within the React application.

  const navigate = useNavigate();

  const toComponentAccess = () => {
    navigate("/access", { state: { activeTab: 3 } });
  };

  // Function:
  // This function is defined but not used in the current implementation. It appears to be intended for navigating to a component with the state set to {activeTab: 3}.

  return (
    <Popper open={true}>
      <div
        style={{
          position: "fixed",
          right: 10,
          top: heightnext + 100,
          boxShadow: "0px 0px 0px #aaa",
          backgroundColor: "white",
          border: "0px solid black",
          width: "280px",
          borderRadius: "15px",
        }}
      >
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              justifyItems: "center",
              alignContent: "center",
              marginBottom: "-5px",
            }}
          >
            {" "}
            <SettingsSuggestIcon fontSize="small" color="inherit" />
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#143200",
                marginLeft: "4px",
              }}
            >
              {adapOption}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ marginBottom: -1 }}>
            <Typography
              sx={{ fontSize: 14, marginTop: "-10px" }}
              color="black"
              gutterBottom
            >
              Details:{" "}
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                This map has been derived by consideration of
                {/* <a href='/access' style={{color:'inherit'}}>yield gap</a>,  */}
                &nbsp;
                <a href="/access" style={{ color: "inherit" }}>
                  hazards
                </a>{" "}
                and{" "}
                <a href="/access" style={{ color: "inherit" }}>
                  technical suitability
                </a>
                {/* ,
          &nbsp;<a href='/access' style={{color:'inherit'}}>adoption barriers</a> and <a href='/access' style={{color:'inherit'}}>scalability</a>.
          &nbsp;<a href='/access' onClick={()=>{toComponentAccess()}} style={{textDecoration:'none',color:'inherit'}}>(Access all data here)</a> */}
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Popper>
  );
}
// JSX Structure:
// The component returns JSX code for a Popper component, which creates a fixed popup element.

// Popup Content:
// The Popper content is a div with styles for positioning, shadow, background color, border, width, and rounded corners.
// An Accordion component is used to create an expandable section:
// The AccordionSummary displays the adaptation option title with an icon.
// The AccordionDetails holds the details about the adaptation option.

// Content Display:
// Typography components are used for styled text content with different font sizes, weights, and colors.
// Links to "/access" are included within the description but currently navigate to the same page without using useNavigate.
