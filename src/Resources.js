import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Card_Posts from "./Acasa_Post";
import News from "./Acasa_News";
import Info from "./Acasa_Info";
import Timeline2 from "./Acasa_timeline";
import StickyFooter from "./StickyFooter";

const TabItem = styled(Tab)(({ theme }) => ({
  minHeight: 53,
  minWidth: 80,
  textTransform: "none",
  fontSize: 15,
  fontWeight: 700,
  color: "#657786",
  opacity: 1,
  borderRadius: '5px',
  "&:hover": {
    backgroundColor: "rgba(232, 245, 213, 0.4)",
    color: "#4ba046",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    color: "#4ba046",
  },
}));

export default function ResTabsData() {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <div>
    <Tabs
      textColor="inherit"
      value={tabIndex}
      onChange={(e, index) => setTabIndex(index)}
      sx={{
        marginTop:'80px',
        marginRight:'70px',
        marginLeft:'70px',
        boxShadow: "inset 0 -1px 0 0 #E6ECF0",
        [`& .${tabsClasses.indicator}`]: {
          backgroundColor: "#4ba046",
        },
      }}
    >
      <TabItem disableRipple label={"ACASA Posts"} />
      <TabItem disableRipple label={"ACASA Newsletter-Strides"} />
      <TabItem disableRipple label={"ACASA Data Dive"} />
      <TabItem disableRipple label={"ACASA in News"} />
    </Tabs>
    {tabIndex===0 && <Card_Posts></Card_Posts>}
    {tabIndex===1 && <News></News>}
    {tabIndex===2 && <Info></Info>}
    {tabIndex===3 && <Timeline2></Timeline2>}
    <StickyFooter></StickyFooter>
    </div>
  );
}