import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  AgricultureOutlined,
  HomeOutlined,
  LocationOnOutlined,
  PollOutlined,
} from "@mui/icons-material";
import SwitchCom from "./Switch_Commodity";
import SwitchLoc from "./Switch_Location";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Fade from "@mui/material/Fade";
import { Popper } from "@mui/material";
import SwitchAnalytics from "./Switch_Analytics";

// Imports:
// React and Material-UI components for building the UI.
// Icons and components for the sidebar items.
// Components for switching content (Switch_Commodity, Switch_Location, Switch_Analytics).

const Items = ["Home", "Location", "Commodity", "Analytics"];

export default function DrawerA({
  activeCrop,
  changeCrop,
  LocationData,
  activeRegion,
  changeRegion,
}) {
  function createInitialTodos() {
    const initialTodos = {};
    Items.forEach((sname, index) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  }

  const [open, setOpen] = React.useState(createInitialTodos);

  const [DrOpen, setDrOpen] = React.useState(false);

  const top_margin = 90;
  const toggleList = (name) => (event) => {
    const newState = { ...open };
    Items.forEach((sname) => {
      newState[sname] = sname === name;
    });
    setOpen(newState);
    if (newState["Home"] === true) {
      setDrOpen(false);
    } else {
      setDrOpen(true);
    }
  };
  const handleClickAway = () => {
    const newState = { ...open };
    Items.forEach((sname) => {
      newState[sname] = false;
    });
    setOpen(newState);
    setDrOpen(false);
  };
  // State Management:
  // open: An object to track which menu item is currently active.
  // DrOpen: A boolean to control the visibility of the drawer.

  // Functions:
  // createInitialTodos: Initializes the open state to ensure all menu items are initially closed.
  // toggleList: Updates the open state when a menu item is clicked, setting the selected item as active and controlling the drawer visibility.
  // handleClickAway: Closes the drawer and resets the open state when clicking outside the drawer area.

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <div>
        <List>
          {Items.map((Item, index) => (
            <Popper open={true}>
              <div
                style={{
                  position: "absolute",
                  left: 10,
                  top: top_margin + index * 90,
                  margin: 0,
                  padding: 5,
                  boxShadow: "0px 0px 0px #aaa",
                  backgroundColor: "#143200",
                  border: "0px solid black",
                  width: 110,
                  borderRadius: "5px",
                }}
              >
                <ListItem
                  key={Item}
                  onClick={toggleList(Item)}
                  disablePadding
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "#fece2f" },
                  }}
                >
                  <ListItemButton>
                    <Box
                      sx={{
                        width: "100%",
                        flexDirection: "column",
                        display: "flex",
                        textAlign: { sm: "left", md: "left" },
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit", fontSize: "20px" }}>
                        {index === 0 && (
                          <HomeOutlined color="inherit" fontSize="inherit" />
                        )}
                        {index === 1 && (
                          <LocationOnOutlined
                            color="inherit"
                            fontSize="inherit"
                          />
                        )}
                        {index === 2 && (
                          <AgricultureOutlined
                            color="inherit"
                            fontSize="inherit"
                          />
                        )}
                        {index === 3 && (
                          <PollOutlined color="inherit" fontSize="inherit" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={Item}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              </div>
            </Popper>
          ))}
        </List>
        {/* Conditional Rendering:
The drawer displays content from SwitchCom, SwitchLoc, or SwitchAnalytics based on the active menu item.
Clicking 'Home' navigates the user to the home page (window.location.href = "/"). */}
        <Fade in={DrOpen}>
          <Drawer
            variant="persistent"
            anchor="left"
            open={DrOpen}
            onClose={handleClickAway}
            sx={{
              flexShrink: 0,
              overflow: "auto",
              whiteSpace: "nowrap",
              "& .MuiDrawer-paper": {
                width: 100 * 3,
                height: "83vh",
                boxSizing: "border-box",
                marginLeft: "145px",
                marginTop: "90px",
                borderLeft: 5,
                borderLeftColor: "#fece2f",
                background: "#ffffff",
                borderRadius: "10px",
              },
            }}
          >
            {/* Styling:
The drawer and list items are styled using Material-UI's sx prop and inline styles to achieve the desired appearance and behavior. */}
            {open.Commodity === true && (
              <SwitchCom
                activeCrop={activeCrop}
                changeCrop={changeCrop}
              ></SwitchCom>
            )}
            {open.Location === true && (
              <SwitchLoc
                activeRegion={activeRegion}
                changeRegion={changeRegion}
                countryStateMap={LocationData}
              ></SwitchLoc>
            )}
            {open.Analytics === true && (
              <SwitchAnalytics activeCrop={activeCrop}></SwitchAnalytics>
            )}
            {open.Home === true && (window.location.href = "/")}
          </Drawer>
        </Fade>
      </div>
    </ClickAwayListener>
  );
}
// Rendering:
// List of Items: Renders a list of navigation items using a Popper component for each item, styled to appear as floating boxes with icons and text.
// Drawer: A Drawer component that slides in from the left when any menu item (except 'Home') is clicked. It displays different content based on which item is active, using the respective switch components.
