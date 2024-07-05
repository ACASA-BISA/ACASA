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

const TabItem = styled(Tab)(({ theme }) => ({
  maxHeight: 25,
  minWidth: 80,
  textTransform: "none",
  fontSize: 14,
  fontWeight: 700,
  color: "#fff",
  opacity: 1,
  backgroundColor: "#4ba046",
  margin:'0px 5px',
  marginTop:'5px',
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
    marginBottom:'6px',
  },
}));

export default function TabsData({
  activeTab=0
}) {
  const [tabIndex, setTabIndex] = React.useState(activeTab);
  return (
    <div>
            <Box sx={{
        display: { xs: 'none', md: 'block' }}}>
    <Tabs
      textColor="inherit"
      value={tabIndex}
      onChange={(e, index) => setTabIndex(index)}
      sx={{
        marginTop:'90px',
        marginRight:'70px',
        marginLeft:'70px',
        width:'calc(100vw - 140px)',
        boxShadow: "inset 0 0 0 0 #E6ECF0",
        [`& .${tabsClasses.indicator}`]: {
          backgroundColor: "#4ba046",
        },
      }}
      centered
    >{/* 
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
    {tabIndex===0 && <Description></Description>}
    </Box>
    </div>
  );
}