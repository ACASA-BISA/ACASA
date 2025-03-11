import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { ReactTyped } from "react-typed";
import zIndex from "@mui/material/styles/zIndex";

// Define a component for the heading with a typewriter effect
const headingA = () => {
  return (
    <Box sx={headingBoxStyle}>
      <Typography
        sx={{
          fontSize: "34px",
          fontWeight: "bold",
          fontFamily: "Playfair Display",
          color: (theme) => (theme.palette.mode === "dark" ? "#6dd769" : "#4ba046"),
        }}
      >
        {" "}
        <ReactTyped strings={["How to use the Atlas?", "Your Navigation Buddy"]} typeSpeed={100} loop backSpeed={20} cursorChar="|" showCursor={true} />
      </Typography>
    </Box>
  );
};

// Styles for the heading box
const headingBoxStyle = {
  position: "relative",
  width: "fit-content",
  
  left: "10px",
  zIndex: 1000,
  backgroundColor: (theme) => theme.palette.background.default,
  padding: "10px",
  borderRadius: "8px",
  boxShadow: (theme) =>
    theme.palette.mode === "dark"
      ? "0px 0px 10px rgba(255, 255, 255, 0.1)" // Lighter shadow in dark mode
      : "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

// Styles for the timeline event images
const logoStyle = {
  width: "29vw",
  height: "16vw",
  margin: "10px",
  marginBottom: "8px",
  padding: "5px",
  border: (theme) => `3px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  borderRadius: "8px",
};

// Base styles for the tooltip boxes
const tooltipBoxStyleBase = {
  "padding": "20px",
  "border": (theme) => `1px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  "height": "auto",
  "width": "25vw",
  "position": "relative",
  "borderRadius": "8px",
  "boxShadow": (theme) => (theme.palette.mode === "dark" ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)"),
  "transition": "0.3s cubic-bezier(.47,1.64,.41,.8)",
  "&:hover": {
    boxShadow: (theme) => (theme.palette.mode === "dark" ? "0 4px 20px rgba(255, 255, 255, 0.15)" : "0 4px 20px rgba(0,0,0,0.12)"),
    transform: "scale(1.05)",
  },
};

// Styles for left-pointing arrow
const arrowStyleLeft = {
  content: '""',
  position: "absolute",
  top: "50%",
  left: "-10px",
  transform: "translateY(-50%)",
  width: "0",
  height: "0",
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderRight: (theme) => `10px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  filter: (theme) => `drop-shadow(1px 0 1px ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"})`,
};

// Styles for right-pointing arrow
const arrowStyleRight = {
  content: '""',
  position: "absolute",
  top: "50%",
  right: "-10px",
  transform: "translateY(-50%)",
  width: "0",
  height: "0",
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderLeft: (theme) => `10px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  filter: (theme) => `drop-shadow(1px 0 1px ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"})`,
};

// Main Guide component to render the timeline with events
export default function Guidee() {
  const events = [
    {
      step: "Step 1",
      img: "/timelineA.png",
      title: "Landing Page",
      subtitle: "Navigating the ACASA website",
      description:
        "To explore the comprehensive data available on the ACASA website, visit www.acasa-bisa.org. Click on the yellow Explore button or select your desired region from the drop-down menu. Additionally, choose the specific commodity you wish to access data for from the adjacent drop-down menu, and then click the green Explore button to proceed.",
      link: "/#/",
    },
    {
      step: "Step 2",
      img: "/timelineB.png",
      title: "Explore Data",
      subtitle: "Navigating the advanced Data Viewer",
      description:
        "Upon clicking the Explore button or selecting the Explore Data tab in the navigation bar, you will be seamlessly redirected to the South Asian Atlas, preconfigured with rice as the default commodity and the baseline scenario. Rest assured, you have the flexibility to customize your exploration by selecting your desired commodity, country, and state. Additionally, you can change your visualisation criteria by adjusting various parameters such as risk, impact, scenario, and adaptation using the options available in the vertical navigation bar.",
      link: "/#/viewer",
    },
    {
      step: "Step 3",
      img: "/timelineC.png",
      title: "Adaptation at a glance",
      subtitle: "Accessing the comprehensive Adaptation options of the Atlas",
      description:
        "Select the Adaptation at a glance Tab from the navigation bar to obtain a summarized view of the Atlas for any commodity and specific region. This section provides an overview of the Atlas based on various adaptation options and hazard index.",
      link: "/#/analytics",
    },
    {
      step: "Step 4",
      img: "/timelineD.png",
      title: "Data Access",
      subtitle: "Accessing the Data Access section",
      description:
        "Click the fourth tab in the navigation bar to navigate to the Data Access section. To obtain specific data sources or datasets, click the [Data Description] Tab. Additionally, by hovering over and clicking the [Data Description] tab, you can download datasets or reports for any commodity’s hazard or layer, or review the methodology used to compute the results.",
      link: "/#/access",
    },
    {
      step: "Step 5",
      img: "/timelineE.png",
      title: "Use Cases",
      subtitle: "Navigating the Use Cases Tab",
      description:
        "Click the fifth tab in the navigation bar to access the Use Cases section. Select the desired use case from the array of sub-buttons. Or the slides automatically changes & takes you to the desired Use-Case slide. Put the cursor on the desired slide to read and view the literature and pause the drifting",
      link: "/#/usecase",
    },
    {
      step: "Step 6",
      img: "/timelineG.png",
      title: "Resources",
      subtitle: "Exploring the Resources",
      description:
        "Click the sixth tab in the navigation bar to access the Resources section. Here, you can explore various options from the sub-navigation bar, such as blogs in ACASA Posts authored under the ACASA canopy, to know the latest inside deets about ACASA read the newsletter updates in ACASA Strides.",
      link: "#/resources",
    },
    {
      step: "Step 7",
      img: "/timelineF.png",
      title: "About Us",
      subtitle: "Know more from About Us",
      description:
        "Click the seventh tab in the navigation panel & visit the About Us tab to know more about ACASA-our approach, workstreams, Our developement partners- Investors, Partners in South Asia, External Partners, Other South Asian Partners & contributors, ACASA Advisory Panel, Country Team Leads & Core team.",
      link: "#/about",
    },
    {
      step: "Step 8",
      img: "/timelineH.png",
      title: "Feedback",
      subtitle: "Your Valuable Feedback",
      description:
        "Click the eighth tab in the navigation panel to provide us with your valuable feedback. Click on the Green Feedback form Button which will redirect you to a google form link where you can tell us about your experience & expectation from the website,",
      link: "#/feedback",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          minHeight: "100vh",
          width: "100%",
          position: "absolute",
        }}
      >
        <Box sx={{ paddingTop: "100px"}}>
          {headingA()}
          <Timeline position="alternate">
            {events.map((event, index) => {
              const isLeftSide = index % 2 !== 0; // Determines if it's on the left

              const tooltipBoxStyle = {
                ...tooltipBoxStyleBase,
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? (isLeftSide ? "#2f6742" : "#25292e") : index % 2 === 0 ? "#fff" : "#e0ebeb"), // Keep light mode unchanged
                color: (theme) => (theme.palette.mode === "dark" && isLeftSide ? "#fff" : "inherit"),
              };
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ mt: "15px" }}
                    align={index % 2 === 0 ? "right" : "left"}
                    variant="body2"
                    color={(theme) => (theme.palette.mode === "dark" ? "#ddd" : "text.secondary")}
                  >
                    <Typography color={(theme) => (theme.palette.mode === "dark" ? "#fff" : "#111")} fontSize={24}>
                      <strong>{event.step}</strong>
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <img src={event.img} style={logoStyle} alt={`Timeline${index + 1}`} />
                    <TimelineConnector />
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#6dd769" : "#4b9e44"),
                        borderRadius: "50%",
                        marginTop: "8px",
                      }}
                    />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Box sx={tooltipBoxStyle}>
                      <Box sx={index % 2 === 0 ? arrowStyleLeft : arrowStyleRight}></Box>
                      <Typography
                        variant="h5"
                        component="span"
                        sx={{
                          color: (theme) => (theme.palette.mode === "dark" ? "#81c784" : "#4b9e44"),
                          fontWeight: "bold",
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          lineHeight: "22px",
                          fontSize: "18px",
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? isLeftSide
                                ? "#fff" // White text on green background
                                : "#e0e0e0" // Light gray text on dark background
                              : "#333333",
                          mt: "10px",
                        }}
                      >
                        {event.subtitle}
                      </Typography>
                      <Typography
                        sx={{
                          mt: "10px",
                          fontSize: "15px",
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? isLeftSide
                                ? "#fff" // White text on green background
                                : "#e0e0e0" // Light gray text on dark background
                              : "inherit",
                        }}
                      >
                        {event.description}
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? isLeftSide
                                ? "#fff" // White text on green background
                                : "#ddd" // Slightly lighter text on dark background
                              : "#444444",
                          marginTop: "10px",
                        }}
                      >
                        <Box
                          component="a"
                          href={event.link}
                          target="_self"
                          rel="noopener noreferrer"
                          sx={{
                            "fontWeight": "bold",
                            "color": (theme) => (theme.palette.mode === "dark" ? "#81c784" : "#333333"),
                            "textDecoration": "none",
                            "&:hover": {
                              textDecoration: "underline", // Optional hover effect
                            },
                          }}
                        >
                          Click Here
                        </Box>
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Box>
      </Box>
    </div>
  );
}
