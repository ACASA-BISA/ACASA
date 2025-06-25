import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { Snackbar } from "@mui/material";
import Card_Posts from "./Acasa_Post";
import News from "./Acasa_News";
import Info from "./Acasa_Info";
import Timeline2 from "./Acasa_timeline";
import Glossary from "./Acasa_Glossary";
import Methodology from "./Methodology";
import StickyFooter from "./StickyFooter";
import { Box, Typography } from "@mui/material";

const TabItem = styled(Tab)(({ theme }) => ({
  "maxHeight": 15,
  "minWidth": 80,
  "textTransform": "none",
  "fontSize": "14px",
  "fontWeight": 700,
  "color": theme.palette.mode === "dark" ? "#000" : "#fff", // Black text in dark mode, white in light mode
  "opacity": 1,
  "backgroundColor": theme.palette.mode === "dark" ? "#61c258" : "#4ba046", // Green background for inactive buttons
  "margin": "0px 5px",
  "borderRadius": "7px",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "rgba(97, 194, 88, 0.5)" : "rgba(232, 245, 213, 0.4)",
    color: theme.palette.mode === "dark" ? "#1b1f23" : "#4ba046",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    color: theme.palette.mode === "dark" ? "#387530" : "#4ba046", // Darker green text for active button in dark mode
    backgroundColor: theme.palette.mode === "dark" ? "rgba(210, 235, 200, 1)" : "rgba(232, 245, 213, 1)", // Lighter green background for active button in dark mode
    borderRadius: "10px",
    marginBottom: "5px",
  },
}));

export default function ResTabsData() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tabFromURL = parseInt(params.get("tab"), 10);

  const [tabIndex, setTabIndex] = React.useState(tabFromURL || 0);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (tabFromURL === 4 || tabFromURL === 5) {
      navigate(`?tab=0`); // Redirect to tab 0 if the user tries to access tab 4 or 5
    } else {
      setTabIndex(tabFromURL || 0);
    }
  }, [tabFromURL, navigate]);

  const handleTabChange = (e, index) => {
    /*if (index === 3) {
      setOpenSnackbar(true);
      return;
    }*/

    if (index === 4 || index === 5) {
      return; // Prevent navigation to tabs 4 and 5
    }
    setTabIndex(index);
    navigate(`?tab=${index}`); // Update URL when user clicks a tab
  };

  return (
    <div>
      <Box
        sx={(theme) => ({
          display: { xs: "none", md: "block" },
          backgroundColor: theme.palette.mode === "dark" ? "#25292e" : "#ffffff",
          paddingTop: "100px",
        })}
      >
        <Tabs
          textColor="inherit"
          value={tabIndex}
          onChange={handleTabChange}
          sx={(theme) => ({
            marginRight: "70px",
            marginLeft: "70px",
            width: "calc(100vw - 140px)",
            backgroundColor: "inherit",
            boxShadow: theme.palette.mode === "dark" ? "inset 0 0 0 0 #1b1f23" : "inset 0 0 0 0 #E6ECF0", // Adjusted shadow for dark mode
            [`& .${tabsClasses.indicator}`]: {
              backgroundColor: theme.palette.mode === "dark" ? "#387530" : "#4ba046",
            },
          })}
          centered
        >
          <TabItem disableRipple label={"ACASA Posts"} />
          <TabItem disableRipple label={"Newsletter-Strides"} />
          <TabItem disableRipple label={"Glossary"} />
          <TabItem disableRipple label={"Methodology"} />
          {/*<TabItem disableRipple disabled={true} label={"ACASA Data Dive"} />
          <TabItem disableRipple disabled={true} label={"ACASA in News"} />*/}
        </Tabs>
        {tabIndex === 0 && <Card_Posts></Card_Posts>}
        {tabIndex === 1 && <News></News>}
        {tabIndex === 2 && <Glossary></Glossary>}
        {tabIndex === 3 && <Methodology></Methodology>}
        {tabIndex === 4 && <Info></Info>}
        {tabIndex === 5 && <Timeline2></Timeline2>}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          message={
            <Typography
              sx={(theme) => ({
                fontWeight: 600,
                color: theme.palette.mode === "dark" ? "#000" : "#fff",
                fontSize: "16px",
                fontFamily: "revert",
              })}
            >
              To be updated soon.
            </Typography>
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          ContentProps={{
            sx: {
              backgroundColor: "grey", // Customize background if needed
            },
          }}
        />

        <StickyFooter></StickyFooter>
      </Box>
      <Box
        sx={{
          marginTop: "90px",
          width: "100%",
          height: "calc(100vh - 80px)",
          alignItems: "center",
          justifyContent: "center",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Typography>This website is designed for desktop/laptop. Please view in a bigger screen.</Typography>
      </Box>
    </div>
  );
}
