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
import { ThemeContext } from "./ThemeContext";
import { Tooltip, tooltipClasses } from "@mui/material";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DrawerMapShow from "./DrawerMapShow";
import Home from "./Home";
import "./font.css";
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "./scrolltop";
import Feedback1 from "./Feedback";
import Translate from "./Translate";
import LightTooltip from "./LightTooltip";
import Test from "./Test/Test";
import TestHome from "./Test/TestHome";

const pages = ["Home", "Explore Data", "Data at a glance", "Data Access", "Use Cases", "Resources", "About Us"];
const pageid = ["home", "test", "adaptationataglance", "access", "usecase", "resources", "about"];
const AppBarHeight = "85px";

const ToggleContainer = styled("div")(({ theme, mode }) => ({
  width: 60,
  height: 30,
  backgroundColor: mode === "dark" ? "#25292e" : "#ddd",
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

function ResponsiveAppBar() {
  const [flag, setFlag] = React.useState(null);
  const [persistentCountry, setPersistentCountry] = React.useState(null);
  const { mode, toggleTheme } = React.useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { country } = useParams();

  React.useEffect(() => {
    // Extract the path after the hash
    const hashIndex = window.location.href.indexOf("#");
    const path = hashIndex !== -1 ? window.location.href.substring(hashIndex + 2) : location.pathname;
    const pathSegments = path.split("/");
    let activePage = pathSegments[0] || "";
    const urlCountry = pathSegments[1] || country;

    // Set persistent country if one is detected and not already set
    if (urlCountry && !persistentCountry) {
      setPersistentCountry(urlCountry);
    }

    if (activePage === "hazardataglance") {
      activePage = "adaptationataglance";
    }
    if (activePage === "future") {
      activePage = "exploredata";
    }

    if (flag !== activePage) {
      setFlag(activePage || null);
    }
  }, [location.pathname, country]);

  const GlanceButtonRef = React.useRef(null);

  const handleNavigation = (newValue) => {
    if (newValue && newValue !== flag) {
      setFlag(newValue);
      const targetPath = persistentCountry ? `/${newValue}/${persistentCountry}` : `/${newValue}`;
      navigate(targetPath, { replace: true });
    }
  };

  const handleHomeClick = () => {
    if (flag !== "home") {
      setFlag("home");
      navigate(persistentCountry ? `/home/${persistentCountry}` : "/home", { replace: true });
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(GlanceButtonRef.current);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const MyButton = styled(ToggleButton)(({ theme }) => ({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 15,
    fontWeight: "normal",
    color: theme.palette.text.primary,
    paddingRight: 2,
    paddingLeft: 2,
    borderRadius: 0,
    border: "0px solid",
    backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#25292e" : "#f5f3ed",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.mode === "dark" ? "#4C9E46" : "#4C9E46",
    },
    "&.Mui-disabled": {
      border: "0px solid",
      color: theme.palette.mode === "dark" ? "#eee" : "#888",
      backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#EFEFEF",
    },
  }));

  const ImgButton = styled(Button)(({ theme }) => ({
    boxShadow: "none",
    borderRadius: 0,
    border: "0px solid",
    backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
      boxShadow: "none",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.mode === "dark" ? "#3a3d42" : "#ffffff",
    },
  }));

  const getHref = (path) => {
    return persistentCountry ? `/#/${path}/${persistentCountry}` : `/#/${path}`;
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: AppBarHeight,
          boxShadow: (theme) => (theme.palette.mode === "dark" ? "0px 0px 4px #222" : "0px 0px 4px #aaa"),
        }}
      >
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
              <Button size="small" color="inherit" key="Acasa" onClick={handleHomeClick}>
                <Link to={persistentCountry ? `/home/${persistentCountry}` : "/home"} style={{ textDecoration: "none", color: "inherit" }}>
                  <Avatar variant="square" alt="Remy Sharp" src={mode === "dark" ? "Home_imgs/Acasa Logo white1.png" : "Home_imgs/Acasa1.png"} sx={{ width: "auto", height: "60px" }} />
                </Link>
              </Button>
            </Box>

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
              <ToggleButtonGroup value={flag} exclusive onChange={(e, newValue) => handleNavigation(newValue)}>
                {pages.map((page, index) => (
                  <div key={pageid[index]}>
                    {page !== "Data at a glance" && (
                      <LightTooltip title={page === "Guide" ? "To be updated soon" : ""}>
                        <span>
                          <MyButton
                            value={pageid[index]}
                            sx={{
                              paddingRight: 2,
                              paddingLeft: 2,
                              paddingTop: 1,
                              paddingBottom: 1,
                              "&.Mui-disabled": {
                                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#3a3f45" : "#e0e0e0"),
                                color: (theme) => (theme.palette.mode === "dark" ? "#7d848b" : "#9e9e9e"),
                                cursor: "not-allowed",
                              },
                            }}
                            key={pageid[index]}
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
                              {page}
                            </Typography>
                          </MyButton>
                        </span>
                      </LightTooltip>
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
                                  ? "#3a3d42"
                                  : "#f5f3ed"
                                : theme.palette.mode === "dark"
                                  ? "#3a3d42"
                                  : "#ffffff",
                          }}
                          key={pageid[index]}
                          onMouseEnter={handleOpenUserMenu}
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
                            {page}
                          </Typography>
                        </MyButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                          transformOrigin={{ vertical: "top", horizontal: "left" }}
                        >
                          <MenuItem onClick={() => handleNavigation("hazardataglance")}>
                            <Typography textAlign="center" fontSize={13} sx={{ fontFamily: "Karla", fontWeight: 350, color: (theme) => (theme.palette.mode === "dark" ? "#dddddd" : "#222222") }}>
                              Hazards at a glance
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={() => handleNavigation("adaptationataglance")}>
                            <Typography textAlign="center" fontSize={13} sx={{ fontFamily: "Karla", fontWeight: 350, color: (theme) => (theme.palette.mode === "dark" ? "#dddddd" : "#222222") }}>
                              Adaptation at a glance
                            </Typography>
                          </MenuItem>
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
                onClick={() => handleNavigation("feedback")}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Karla",
                    textTransform: "none",
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
            </Box>

            <Box sx={{ display: "flex", flexGrow: 0, display: { xs: "flex", md: "none" } }}></Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<TestHome />} />
        <Route path="/home/:country" element={<TestHome />} />
        <Route path="/about" element={<DrawerMapShow activeBar="about" />} />
        <Route path="/about/:country" element={<DrawerMapShow activeBar="about" />} />
        <Route path="/exploredata" element={<DrawerMapShow activeBar="future" />} />
        <Route path="/exploredata/:country" element={<DrawerMapShow activeBar="future" />} />
        <Route path="/adaptationataglance" element={<DrawerMapShow activeBar="analytics" />} />
        <Route path="/adaptationataglance/:country" element={<DrawerMapShow activeBar="analytics" />} />
        <Route path="/access" element={<DrawerMapShow activeBar="access" />} />
        <Route path="/access/:country" element={<DrawerMapShow activeBar="access" />} />
        <Route path="/resources" element={<DrawerMapShow activeBar="resources" />} />
        <Route path="/resources/:country" element={<DrawerMapShow activeBar="resources" />} />
        <Route path="/usecase" element={<DrawerMapShow activeBar="usecase" />} />
        <Route path="/usecase/:country" element={<DrawerMapShow activeBar="usecase" />} />
        <Route path="/guide" element={<DrawerMapShow activeBar="guide" />} />
        <Route path="/guide/:country" element={<DrawerMapShow activeBar="guide" />} />
        <Route path="/hazardataglance" element={<DrawerMapShow activeBar="hazards" />} />
        <Route path="/hazardataglance/:country" element={<DrawerMapShow activeBar="hazards" />} />
        <Route path="/future" element={<DrawerMapShow activeBar="future2" />} />
        <Route path="/future/:country" element={<DrawerMapShow activeBar="future2" />} />
        <Route path="/comparison" element={<DrawerMapShow activeBar="comparison" />} />
        <Route path="/comparison/:country" element={<DrawerMapShow activeBar="comparison" />} />
        <Route path="/summary" element={<DrawerMapShow activeBar="summary" />} />
        <Route path="/summary/:country" element={<DrawerMapShow activeBar="summary" />} />
        <Route path="/timeline" element={<DrawerMapShow activeBar="timeline" />} />
        <Route path="/timeline/:country" element={<DrawerMapShow activeBar="timeline" />} />
        <Route path="/adaptation" element={<DrawerMapShow activeBar="adaptation" />} />
        <Route path="/adaptation/:country" element={<DrawerMapShow activeBar="adaptation" />} />
        <Route path="/adaptation2" element={<DrawerMapShow activeBar="adaptation2" />} />
        <Route path="/adaptation2/:country" element={<DrawerMapShow activeBar="adaptation2" />} />
        <Route path="/feedback" element={<Feedback1 />} />
        <Route path="/feedback/:country" element={<Feedback1 />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/:country" element={<Test />} />
        <Route path="/:country/test" element={<Test />} />
      </Routes>

      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ResponsiveAppBar />
    </Router>
  );
}