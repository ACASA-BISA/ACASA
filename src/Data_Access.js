import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Hazards_Data from "./Hazards_data";
import Risk_Data from "./Risk_Data";
import Analytics_Data from "./Analytics_Data";
import Adaptation_Data from "./Adaption_Data";
import Description from "./Description_Data";
import { Box } from "@mui/material";

// Imports:
// React: The core React library.
// styled from @mui/material/styles: For creating styled components with Material UI styles.
// Tab, tabClasses from @mui/material/Tab: Components and classes for tabs.
// Tabs, tabsClasses from @mui/material/Tabs: Components and classes for tab groups.
// Data component imports: Hazards_Data, Risk_Data, etc., likely custom components containing data for each section.
// Box from @mui/material: A utility component for layout and styling.

const TabItem = styled(Tab)(({ theme }) => ({
  maxHeight: 25,
  minWidth: 80,
  textTransform: "none",
  fontSize: 14,
  fontWeight: 700,
  color: "#fff",
  opacity: 1,
  backgroundColor: "#4ba046",
  margin: "0px 5px",
  marginTop: "5px",
  borderRadius: "7px",
  "&:hover": {
    backgroundColor: "rgba(232, 245, 213, 0.4)",
    color: "#4ba046",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    color: "#4ba046",
    backgroundColor: "rgba(232, 245, 213, 1)",
    borderRadius: "10px",
    marginBottom: "6px",
  },
}));

// Styled TabItem:
// This creates a custom component based on Tab with specific styles using styled.
// It defines styles for various tab properties like:
// Size (maxHeight, minWidth)
// Text formatting (textTransform, fontSize, fontWeight)
// Color (color, backgroundColor)
// Spacing (margin, marginTop)
// Border (borderRadius)
// Hover effects (&:hover)
// Responsive styles for medium screens and up ([theme.breakpoints.up("md")])
// Selected state styles (&.${tabClasses.selected})

export default function TabsData({ activeTab = 0 }) {
  const [tabIndex, setTabIndex] = React.useState(activeTab);
  return (
    <div>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Tabs
          textColor="inherit"
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
          sx={{
            marginTop: "85px",
            marginRight: "70px",
            marginLeft: "70px",
            width: "calc(100vw - 140px)",
            boxShadow: "inset 0 0 0 0 #E6ECF0",
            [`& .${tabsClasses.indicator}`]: {
              backgroundColor: "#4ba046",
            },
          }}
          centered
        >
          {/* 
      <TabItem disableRipple label={"Hazards"} />
      <TabItem disableRipple label={"Risk"} />
      <TabItem disableRipple label={"Adaptation"} /> */}
          {/* <TabItem disableRipple disabled={true} label={"Analytics"} /> */}
          <TabItem disableRipple label={"Data Description"} />
        </Tabs>
        {/* {tabIndex===0 && <Hazards_Data></Hazards_Data>}
    {tabIndex===1 && <Risk_Data></Risk_Data>}
    {tabIndex===2 && <Adaptation_Data></Adaptation_Data>} */}
        {/* {tabIndex===0 && <Analytics_Data></Analytics_Data>} */}
        {tabIndex === 0 && <Description></Description>}
      </Box>
    </div>
  );
}

// Inside the Box:
// A Tabs component is rendered with:
// textColor="inherit" to inherit color from the theme.
// value={tabIndex} to set the active tab based on state.
// onChange handler to update tabIndex when the tab changes.
// Styles using sx prop for:
// Margins (marginTop, marginRight, marginLeft)
// Width (width)
// Box shadow (boxShadow)
// Indicator color (& .${tabsClasses.indicator})
// centered prop to center the tabs.
// Only the "Data Description" tab is included for now (commented out tabs for other data sections).
// Conditionally rendered data components:
// Based on the tabIndex, the corresponding data component is rendered (e.g., tabIndex === 0 renders Description).
