import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Hazards_Data from "./Hazards_data";
import Risk_Data from "./Risk_Data";
import Analytics_Data from "./Analytics_Data";
import Adaptation_Data from "./Adaption_Data";
import Description from "./Description_Data";

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

export default function TabsData({
  activeTab=0
}) {
  const [tabIndex, setTabIndex] = React.useState(activeTab);
  return (
    <div>
    <Tabs
      textColor="inherit"
      value={tabIndex}
      onChange={(e, index) => setTabIndex(index)}
      sx={{
        marginTop:'80px',
        marginRight:'40px',
        marginLeft:'150px',
        boxShadow: "inset 0 -1px 0 0 #E6ECF0",
        [`& .${tabsClasses.indicator}`]: {
          backgroundColor: "#4ba046",
        },
      }}
    >
      <TabItem disableRipple label={"Hazards"} />
      <TabItem disableRipple label={"Risk"} />
      <TabItem disableRipple label={"Adaptation"} />
      <TabItem disableRipple label={"Analytics"} />
      <TabItem disableRipple label={"Data Description"} />
    </Tabs>
    {tabIndex===0 && <Hazards_Data></Hazards_Data>}
    {tabIndex===1 && <Risk_Data></Risk_Data>}
    {tabIndex===2 && <Adaptation_Data></Adaptation_Data>}
    {tabIndex===3 && <Analytics_Data></Analytics_Data>}
    {tabIndex===4 && <Description></Description>}
    </div>
  );
}