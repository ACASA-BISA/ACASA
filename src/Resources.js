import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Card_Posts from "./Acasa_Post";
import News from "./Acasa_News";
import Info from "./Acasa_Info";
import Timeline2 from "./Acasa_timeline";
import StickyFooter from "./StickyFooter";
import { Box, Typography } from "@mui/material";

const TabItem = styled(Tab)(({ theme }) => ({
  maxHeight: 15,
  minWidth: 80,
  textTransform: "none",
  fontSize: '14px',
  fontWeight: 700,
  color: "#fff",
  opacity: 1,
  backgroundColor: "#4ba046",
  margin:'0px 5px',
  borderRadius: '7px',
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
    borderRadius:'10px',
    marginBottom:'5px',
  },
}));

export default function ResTabsData() {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <div>
      <Box sx={{
        display: { xs: 'none', md: 'block' }}}>
    <Tabs
      textColor="inherit"
      value={tabIndex}
      onChange={(e, index) => setTabIndex(index)}
      sx={{
        marginTop:'100px',
        marginRight:'70px',
        marginLeft:'70px',
        width:'calc(100vw - 140px)',
        backgroundColor:'#ffffff',
        boxShadow: "inset 0 0 0 0 #E6ECF0",
        [`& .${tabsClasses.indicator}`]: {
          backgroundColor: "#4ba046",
        },
      }}
      centered
    >
      <TabItem disableRipple label={"ACASA Posts"} />
      <TabItem disableRipple label={"ACASA Newsletter-Strides"} />
      <TabItem disableRipple disabled={true} label={"ACASA Data Dive"} />
      <TabItem disableRipple disabled={true} label={"ACASA in News"} />
    </Tabs>
    {tabIndex===0 && <Card_Posts></Card_Posts>}
    {tabIndex===1 && <News></News>}
    {tabIndex===2 && <Info></Info>}
    {tabIndex===3 && <Timeline2></Timeline2>}
    <StickyFooter></StickyFooter>
    </Box>
    <Box sx={{marginTop:'90px',width:'100%',height:'calc(100vh - 80px)',alignItems:'center',justifyContent:'center',display: { xs: 'flex', md: 'none' }}}>
            <Typography>This website is designed for desktop/laptop. Please view in a bigger screen.</Typography>
        </Box>
    </div>
  );
}