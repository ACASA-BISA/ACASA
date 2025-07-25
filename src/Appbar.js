import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import { ThemeContext } from "./ThemeContext";
import { IconButton, Tooltip, tooltipClasses } from "@mui/material";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DrawerMapShow from "./DrawerMapShow";
//import MenuIcon from '@mui/icons-material/Menu';
//import { IconButton } from '@mui/material';
import Home from "./Home";
import "./font.css";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ScrollToTop from "./scrolltop";
import Feedback1 from "./Feedback";
import Translate from "./Translate"; // Import Translate component
import LightTooltip from "./LightTooltip";
import Test from "./Test/Test";
import TestHome from "./Test/TestHome";

const pages = ["Guide", "Explore Data", "Data at a glance", "Data Access", "Use Cases", "Resources", "About Us"];
const pageid = ["guide", "exploredata", "adaptationataglance", "access", "usecase", "resources", "about"];
const AppBarHeight = "85px";

const ToggleContainer = styled("div")(({ theme, mode }) => ({
  width: 60,
  height: 30,
  backgroundColor: mode === "dark" ? "#25292e" : "#ddd", //#333 was the initial background color for the dark mode
  borderRadius: 30,
  display: "flex",
  alignItems: "center",
  padding: "2px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  position: "relative",
  marginLeft: "20px",
}));

const ToggleThumb = styled("div")(({ mode }) => ({
  width: 26,
  height: 26,
  backgroundColor: mode === "dark" ? "#f5c518" : "#333",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: mode === "dark" ? "32px" : "2px",
  transition: "left 0.3s ease, background-color 0.3s ease",
}));

const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
    color: theme.palette.mode === "dark" ? "#000" : "#fff",
    fontSize: "0.875rem",
    fontWeight: 600,
    borderRadius: "6px",
    padding: "6px 10px",
    boxShadow: theme.palette.mode === "dark" ? "0px 4px 12px rgba(97, 194, 88, 0.6)" : "0px 4px 12px rgba(75, 160, 70, 0.6)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
  },
}));

function ResponsiveAppBar({}) {
  const [flag, setflag] = React.useState(null);
  const { mode, toggleTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    // Function to handle URL changes and set the active page
    const handleUrlChange = () => {
      const sec = window.location.href.indexOf("#");
      const strr = window.location.href.substring(sec + 2);
      if (strr !== "") {
        setflag(strr);
      }
      if (strr === "hazardataglance") {
        setflag("adaptationataglance");
      }
      if (strr === "future") {
        setflag("exploredata");
      }
    };
    handleUrlChange();

    // Add event listener for popstate to handle back/forward browser navigation
    window.addEventListener("popstate", handleUrlChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  // Handle the ToggleButtonGroup change event
  // Ref for the "Data at a glance" button
  const GlanceButtonRef = React.useRef(null);
  const ExploreButtonRef = React.useRef(null);

  const handleClick = (event, newvalue) => {
    if (newvalue !== null) {
      setflag(newvalue);
    }
  };

  // Handle the click event for the home button
  const handleHomeClick = () => {
    setflag(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(GlanceButtonRef.current);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser2, setAnchorElUser2] = React.useState(null);

  const handleOpenUserMenu2 = (event) => {
    setAnchorElUser2(ExploreButtonRef.current);
  };

  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };

  // Styled ToggleButton with custom styles
  const MyButton = styled(ToggleButton)(({ theme }) => ({
    "boxShadow": "none",
    "textTransform": "none",
    "fontSize": 15,
    "fontWeight": "normal",
    "color": theme.palette.text.primary,
    "paddingRight": 2,
    "paddingLeft": 2,
    "borderRadius": 0,
    "border": "0px solid",
    "backgroundColor": theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
    //borderColor: '#0063cc',
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#25292e" : "#f5f3ed",
      //borderColor: '#0062cc',
      boxShadow: "none",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
      //fontWeight: 'bold',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.mode === "dark" ? "#B88F1A" : "#fece2f",
    },
    "&.Mui-disabled": {
      border: "0px solid",
      color: theme.palette.mode === "dark" ? "#eee" : "#888",
      backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#EFEFEF",
    },
  }));

  // Styled Button with custom styles for images
  const ImgButton = styled(Button)(({ theme }) => ({
    "boxShadow": "none",
    "borderRadius": 0,
    "border": "0px solid",
    "backgroundColor": theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
      boxShadow: "none",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
    },
  }));

  return (
    <div>
      <Router>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: (theme) => theme.palette.background.paper,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: AppBarHeight,
            boxShadow: (theme) => (theme.palette.mode === "dark" ? "0px 0px 4px #222" : "0px 0px 4px #aaa"),
          }}
        >
          {/* <Divider sx={{bgcolor:'#4b9e44', borderBottomWidth: 8, margin:0}}/> */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexGrow: -1,
                alignItems: "right",
                justifyItems: "right",
                justifyContent: "right",
                width: "100%",
                height: "18px",
                boxShadow: (theme) => (theme.palette.mode === "dark" ? "-2px #222" : "-2px #ccc"),
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#61c258" : "#4b9e44"),
              }}
            >
              <Translate />
            </Box>

            <Toolbar disableGutters>
              <Box sx={{ display: "flex", flexGrow: 0, flexDirection: "column" }}>
                <Button size="small" href="" color="inherit" key="Acasa" onClick={handleHomeClick}>
                  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Avatar variant="square" alt="Remy Sharp" src={mode === "dark" ? "Home_imgs/Acasa Logo white1.png" : "Home_imgs/Acasa1.png"} sx={{ width: "auto", height: "60px" }} />
                  </Link>
                </Button>
              </Box>

              {/*<Divider orientation="vertical" variant="middle" flexItem />*/}

              <Box
                sx={{
                  display: "flex",
                  flexGrow: 0,
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                }}
              >
                <ImgButton size="small" href="https://bisa.org/" color="inherit" key="Bisa">
                  <Avatar variant="square" alt="Remy Sharp" src={mode === "dark" ? "./BISA Logo in white color.png" : "./BISA Logo in color.png"} sx={{ width: "auto", height: "50px" }} />
                </ImgButton>
              </Box>

              <Box display="flex" justifyContent="right" sx={{ flexGrow: 0.97, display: { xs: "none", md: "flex" } }}>
                <ToggleButtonGroup value={flag} exclusive onChange={handleClick}>
                  {pages.map((page, index) => (
                    <div key={pageid[index]}>
                      {page !== "Data at a glance" && page !== "Explore Data" && (
                        <LightTooltip title={page === "Guide" ? "To be updated soon" : ""}>
                          <span>
                            {" "}
                            {/* Wrapping the disabled button in a span for interaction */}
                            <MyButton
                              value={pageid[index]}
                              sx={{
                                "paddingRight": 2,
                                "paddingLeft": 2,
                                "paddingTop": 1,
                                "paddingBottom": 1,
                                "&.Mui-disabled": {
                                  backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#3a3f45" : "#e0e0e0"),
                                  color: (theme) => (theme.palette.mode === "dark" ? "#7d848b" : "#9e9e9e"),
                                  cursor: "not-allowed",
                                },
                              }}
                              key={pageid[index]}
                              href={"/#/".concat(pageid[index])}
                              disabled={page === "Guide"}
                            >
                              <Typography
                                textAlign="center"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 700,
                                  fontFamily: "Karla",
                                }}
                              >
                                <div>{page}</div>
                              </Typography>
                            </MyButton>
                          </span>
                        </LightTooltip>
                      )}

                      {page === "Explore Data" && (
                        <div ref={ExploreButtonRef}>
                          <MyButton
                            value={pageid[index]}
                            sx={{
                              paddingRight: 2,
                              paddingLeft: 2,
                              paddingTop: 1,
                              paddingBottom: 1,
                              backgroundColor: (theme) =>
                                Boolean(anchorElUser)
                                  ? theme.palette.mode === "dark"
                                    ? "#3a3d42" // Dark theme open menu color
                                    : "#f5f3ed" // Light theme open menu color
                                  : theme.palette.mode === "dark"
                                  ? "#3a3d42"
                                  : "#ffffff", // Darkens when menu is open
                            }}
                            key={pageid[index]}
                            onMouseEnter={handleOpenUserMenu2}
                            //onClick={handleOpenUserMenu}
                            onMouseLeave={handleCloseUserMenu2}
                            aria-owns={Boolean(anchorElUser2) ? "menu-appbar-explore" : undefined}
                            aria-haspopup="true"
                          >
                            <Typography textAlign="center" sx={{ fontSize: "14px", fontWeight: 700, color: (theme) => (theme.palette.mode === "dark" ? "#fff" : "#000"), fontFamily: "Karla" }}>
                              <div>{page}</div>
                            </Typography>
                          </MyButton>
                          <Menu
                            //sx={{ mt: '45px' }}
                            //sx={{pointerEvents:'none'}}
                            id="menu-appbar-explore"
                            anchorEl={anchorElUser2}
                            open={Boolean(anchorElUser2)}
                            onClose={handleCloseUserMenu2}
                            onClick={handleCloseUserMenu2}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            //MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
                          >
                            <a href="/#/exploredata" style={{ textDecoration: "none" }}>
                              <MenuItem onClick={handleClick}>
                                <Typography textAlign="center" fontSize={13} sx={{ fontFamily: "Karla", fontWeight: 350, color: (theme) => (theme.palette.mode === "dark" ? "#dddddd" : "#222222") }}>
                                  Explore Crops
                                </Typography>
                              </MenuItem>
                            </a>
                            <a href="/#/future" style={{ textDecoration: "none" }}>
                              <MenuItem onClick={handleClick}>
                                <Typography textAlign="center" fontSize={13} sx={{ fontFamily: "Karla", fontWeight: 350, color: (theme) => (theme.palette.mode === "dark" ? "#dddddd" : "#222222") }}>
                                  Explore Livestock
                                </Typography>
                              </MenuItem>
                            </a>
                          </Menu>
                        </div>
                      )}

                      {page === "Data at a glance" && (
                        <div ref={GlanceButtonRef}>
                          <MyButton
                            value={pageid[index]}
                            sx={{
                              paddingRight: 2,
                              paddingLeft: 2,
                              paddingTop: 1,
                              paddingBottom: 1,
                              backgroundColor: (theme) =>
                                Boolean(anchorElUser)
                                  ? theme.palette.mode === "dark"
                                    ? "#3a3d42" // Dark theme open menu color
                                    : "#f5f3ed" // Light theme open menu color
                                  : theme.palette.mode === "dark"
                                  ? "#3a3d42"
                                  : "#ffffff", // Darkens when menu is open
                            }}
                            key={pageid[index]}
                            onMouseEnter={handleOpenUserMenu}
                            //onClick={handleOpenUserMenu}
                            onMouseLeave={handleCloseUserMenu}
                            aria-owns={Boolean(anchorElUser) ? "menu-appbar" : undefined}
                            aria-haspopup="true"
                          >
                            <Typography
                              textAlign="center"
                              sx={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: (theme) => (theme.palette.mode === "dark" ? "#fff" : "#000"),
                                fontFamily: "Karla",
                              }}
                            >
                              <div>{page}</div>
                            </Typography>
                          </MyButton>
                          <Menu
                            //sx={{ mt: '45px' }}
                            //sx={{pointerEvents:'none'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            onClick={handleCloseUserMenu}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            //MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
                          >
                            {/* {opts.map((setting) => (<div></div>))} */}
                            <a href="/#/hazardataglance" style={{ textDecoration: "none" }}>
                              <MenuItem onClick={handleClick}>
                                <Typography textAlign="center" fontSize={13} sx={{ fontFamily: "Karla", fontWeight: 350, color: (theme) => (theme.palette.mode === "dark" ? "#dddddd" : "#222222") }}>
                                  Hazards at a glance
                                </Typography>
                              </MenuItem>
                            </a>
                            <a href="/#/adaptationataglance" style={{ textDecoration: "none" }}>
                              <MenuItem onClick={handleClick}>
                                <Typography textAlign="center" fontSize={13} sx={{ fontFamily: "Karla", fontWeight: 350, color: (theme) => (theme.palette.mode === "dark" ? "#dddddd" : "#222222") }}>
                                  Adaptation at a glance
                                </Typography>
                              </MenuItem>
                            </a>
                            {/* <a href="/#/summary" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Summary Statistics</Typography>
                      </MenuItem>
                      </a> */}
                            {/* <a href="/#/comparison" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Comparison</Typography>
                      </MenuItem>
                      </a> */}
                            {/* <a href="/#/timeline" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Timeline</Typography>
                      </MenuItem>
                      </a> */}
                            {/* <a href="/#/adaptation" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Adaptation Analytics</Typography>
                      </MenuItem>
                      </a> */}
                            {/* <a href="/#/adaptation2" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Adaptation Analytics</Typography>
                      </MenuItem>
                      </a> */}
                          </Menu>
                        </div>
                      )}
                    </div>
                  ))}
                </ToggleButtonGroup>

                <Button
                  sx={{
                    paddingRight: 2,
                    paddingLeft: 2,
                    margin: 0,
                    border: "1px solid #aaa",
                    marginLeft: 2,
                  }}
                  href={"/#/feedback"}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontSize: "14px",
                      fontFamily: "revert",
                      textTransform: "none",
                      fontFamily: "Karla",
                    }}
                  >
                    Feedback
                  </Typography>
                </Button>

                <StyledTooltip title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow enterDelay={100}>
                  <ToggleContainer mode={mode} onClick={toggleTheme}>
                    <ToggleThumb mode={mode}>
                      {mode === "dark" ? <WbSunnyOutlinedIcon fontSize="small" style={{ color: "#000" }} /> : <NightlightOutlinedIcon fontSize="small" style={{ color: "#fff" }} />}
                    </ToggleThumb>
                  </ToggleContainer>
                </StyledTooltip>

                {/* <Tooltip
                  title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  arrow
                  enterDelay={100}
                >
                  <IconButton
                    onClick={toggleTheme}
                    sx={{
                      ml: 2,
                      color: mode === "dark" ? "#f5c518" : "#333", // Yellowish for dark mode, dark gray for light mode
                      "&:hover": {
                        color: mode === "dark" ? "#ffd700" : "#000", // Brighter yellow in dark mode, black in light mode
                      },
                      transition: "color 0.3s ease",
                    }}
                  >
                    {mode === "dark" ? (
                      <WbSunnyOutlinedIcon fontSize="medium" />
                    ) : (
                      <NightlightOutlinedIcon fontSize="medium" />
                    )}
                  </IconButton>
                </Tooltip> */}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexGrow: 0,
                  display: { xs: "flex", md: "none" },
                }}
              ></Box>
            </Toolbar>
          </Box>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<DrawerMapShow activeBar="about" />}></Route>
          <Route path="/exploredata" element={<DrawerMapShow activeBar="future" />}></Route>
          <Route path="/adaptationataglance" element={<DrawerMapShow activeBar="analytics" />}></Route>
          <Route path="/access" element={<DrawerMapShow activeBar="access" />}></Route>
          <Route path="/resources" element={<DrawerMapShow activeBar="resources" />}></Route>
          <Route path="/usecase" element={<DrawerMapShow activeBar="usecase" />}></Route>
          <Route path="/guide" element={<DrawerMapShow activeBar="guide" />}></Route>
          <Route path="/hazardataglance" element={<DrawerMapShow activeBar="hazards" />}></Route>
          <Route path="/future" element={<DrawerMapShow activeBar="future2" />}></Route>
          <Route path="/comparison" element={<DrawerMapShow activeBar="comparison" />}></Route>
          <Route path="/summary" element={<DrawerMapShow activeBar="summary" />}></Route>
          <Route path="/timeline" element={<DrawerMapShow activeBar="timeline" />}></Route>
          <Route path="/adaptation" element={<DrawerMapShow activeBar="adaptation" />}></Route>
          <Route path="/adaptation2" element={<DrawerMapShow activeBar="adaptation2" />}></Route>
          <Route path="/feedback" element={<Feedback1 />}></Route>
          <Route path="/test" element={<Test />}></Route>
           <Route path="/home" element={<TestHome />}></Route>
        </Routes>

        <ScrollToTop />
      </Router>
    </div>
  );
}

export default ResponsiveAppBar;
