import React, { useState, useEffect, useContext, useMemo } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import StickyFooter from "./StickyFooter";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Tooltip, tooltipClasses } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReactPlayer from "react-player";
import Slide from "@mui/material/Slide";
import { SelectMinimal } from "./Minimal_Select";
import { SelectMinimal2 } from "./Minimal_Select2";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import LoadingPage from "./LoadingPage"; // Import the LoadingPage component
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Popper } from "@mui/material";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import Summary_Statistics from "./Summary_Statistics";
import { ThemeContext } from "./ThemeContext";
//import LightTooltip from "./LightTooltip";

const logoStyle3 = {
  width: "77vw",
  minHeight: "90vh",
  margin: "auto",
  marginTop: 20,
};
const logoStyle4 = {
  height: "40px",
  marginLeft: 6,
  marginRight: 6,
  marginTop: 10,
  marginBottom: 10,
};
const thumbstyle = {
  width: "100vw",
};
const logoStyle6 = { height: "88%", margin: "auto" };
const logoStyle8 = { height: "55%", margin: "auto" };
const logoStyle7 = { width: "90%", margin: "auto" };

const paperHoverStyle = {
  "m": 1,
  "width": "220px",
  "height": 90,
  "alignContent": "center",
  "transition": "transform 0.2s ease, box-shadow 0.2s ease",
  ":hover": {
    boxShadow: 3,
    transform: "scale(1.03)",
    cursor: "pointer",
  },
};

const SleekTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} arrow enterDelay={100} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#ffffff",
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 8,
    boxShadow: theme.shadows[3],
    maxWidth: 240,
    lineHeight: 1.4,
    fontWeight: 400,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === "dark" ? "#2c2c2c" : "#ffffff",
  },
}));

var items = [
  {
    name: "Atlas of Climate Adaptation in South Asian Agriculture",
    description: "Interconnections between climate risks, practices, technologies, and policies",
    type: "Increase the quality, availability, and utility of data and evidence",
    video: "./vid31.mp4",
    videothumb: "./thumb31.jpg",
    id: 1,
  },
  {
    name: "Atlas of Climate Adaptation in South Asian Agriculture",
    description: "Interconnections between climate risks, practices, technologies, and policies",
    type: "Improve climate adaptive capacity of agricultural systems",
    video: "./vid5.mp4",
    videothumb: "./thumb5.jpg",
    id: 2,
  },
  {
    name: "Atlas of Climate Adaptation in South Asian Agriculture",
    description: "Interconnections between climate risks, practices, technologies, and policies",
    type: "Increase the resilience of small-scale producers to climate variability and change",
    video: "./vid41.mp4",
    videothumb: "./thumb41.jpg",
    id: 3,
  },
];

const Home = (props) => {
  const randomStartIndex = useMemo(() => Math.floor(Math.random() * items.length), []);
  const [curr, setCurr] = useState(randomStartIndex);
  const [reg, Setreg] = useState("South Asia");
  const [comm, Setcomm] = useState("rice");
  const [loading, setLoading] = useState(true); // State to manage loading screen

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading screen after 10 seconds
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (index) => {
    setCurr(index);
  };

  const handlecountrychange = (name) => {
    Setreg(name);
  };

  const handlecommoditychange = (name) => {
    Setcomm(name);
  };

  const navigate = useNavigate();

  const toComponentB = () => {
    navigate("/exploredata", { state: { Region: reg, Commodity: comm } });
  };

  const { mode } = useContext(ThemeContext);

  if (loading) {
    return <LoadingPage />; // Show loading screen while loading is true
  }
  const PopperMessage = () => (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.7)"),
        color: mode === "dark" ? "#e0e0e0" : "#ffffff",
        padding: "10px",
        borderRadius: "5px",
        width: "250px",
        textAlign: "center",
        zIndex: 2000,
      }}
    >
      <Typography variant="body2" fontStyle={"italic"}>
        {" "}
        <GppMaybeIcon fontSize="11px" sx={{ marginX: "2px", marginY: 0 }} />
        Disclaimer: This is an internal test version of ACASA. Please do not cite or quote the data.
      </Typography>
    </Box>
  );

  return (
    <div style={{ backgroundColor: mode === "dark" ? "#25292e" : "#ffffff" }}>
      <Box sx={{ marginTop: "80px", display: { xs: "none", md: "block" } }}>
        <Carousel
          sx={{ margin: 0, padding: 0, zIndex: 100 }}
          indicatorContainerProps={{
            style: {
              zIndex: 1,
              marginTop: "-120px",
              marginBottom: "80px",
              position: "relative",
            },
          }}
          index={curr}
          onChange={handleChange}
          interval={2500}
          stopAutoPlayOnHover={false}
        >
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <Item key={i} item={item} sts={curr} />
              <PopperMessage />
            </React.Fragment>
          ))}
        </Carousel>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            width: "95vw",
            margin: "auto",
            boxShadow: mode === "dark" ? "0px 1px 5px rgba(0, 0, 0, 0.5)" : "0px 1px 5px #aaa",
            border: `9px solid ${mode === "dark" ? "#2d3238" : "#f8faf0"}`,
            borderRadius: "10px",
            backgroundColor: mode === "dark" ? "#2d3238" : "#f8faf0",
            height: "auto",
            marginTop: -5,
            zIndex: 200,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <img src={"afghanistan.svg"} style={logoStyle4} alt="afghanistan" />
            <img src={"bangladesh.png"} style={logoStyle4} alt="bangladesh" />
            <img src={"bhutan.svg"} style={logoStyle4} alt="bhutan" />
            <img src={"india.png"} style={logoStyle4} alt="india" />
            <img src={"maldives.svg"} style={logoStyle4} alt="maldives" />
            <img src={"nepal.svg"} style={logoStyle4} alt="nepal" />
            <img src={"pakistan.svg"} style={logoStyle4} alt="pakistan" />
            <img src={"srilanka.png"} style={logoStyle4} alt="srilanka" />
          </Box>

          <Box
            sx={{
              marginRight: 2,
              marginLeft: 2,
              color: mode === "dark" ? "#fff" : "000",
            }}
          >
            <Typography>Region of Interest:</Typography>
            <SelectMinimal2 changeReg={handlecountrychange}></SelectMinimal2>
          </Box>

          <Box
            sx={{
              marginRight: 2,
              marginLeft: 2,
              color: mode === "dark" ? "#fff" : "000",
            }}
          >
            <Typography>Commodity:</Typography>
            <SelectMinimal changeComm={handlecommoditychange}></SelectMinimal>
          </Box>

          <Button
            variant="contained"
            sx={{
              "width": "140px",
              "height": "32px",
              "margin": 2,
              "fontSize": "16px",
              "color": mode === "dark" ? "#000" : "#fff",
              "textTransform": "none",
              "backgroundColor": mode === "dark" ? "#388e3c" : "#4b9e44",
              "&:hover": {
                backgroundColor: mode === "dark" ? "#2e7d32" : "#4b9e44",
              },
            }}
          >
            <a
              href="/#/exploredata"
              onClick={() => {
                toComponentB();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              <Typography>Explore</Typography>{" "}
            </a>
          </Button>
        </Box>

        {/* <Summary_Statistics></Summary_Statistics> */}

        <Box sx={{ mt: "20px" }}>
          <img src={mode === "dark" ? "acasa_approach_dark2.svg" : "acasa_approach.svg"} style={logoStyle3} alt="approach" />
        </Box>
        {/*<Box
          sx={{
            mt: "20px",
            backgroundImage:
              mode === "dark"
                ? "linear-gradient(rgba(27, 31, 35, 0.1), rgba(27, 31, 35, 0.1)), url('world-map.png')"
                : "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('world-map.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "row",
            padding: 7,
            boxShadow: mode === "dark" ? "0px 0px 4px rgba(0,0,0,0.6)" : "0px 0px 2px #aaa",
          }}
        >
          <Box
            sx={{
              width: "37%",
              display: "flex",
              flexDirection: "column",
              marginLeft: 7,
              marginRight: 7,
              textAlign: { sm: "center", md: "left" },
            }}
          >
            <Typography
              sx={{
                color: "#4b9e44",
                fontWeight: "normal",
                fontSize: "40px",
                fontFamily: "revert",
              }}
            >
              How to use this Atlas?{" "}
              <a href="/#/guide" style={{ pointerEvents: "none", textDecoration: "none" }}>
                <OpenInNewIcon sx={{ fontSize: 30, color: "#4b9e44" }} />
              </a>
            </Typography>
            <Typography
              sx={{
                color: mode === "dark" ? "#e0e0e0" : "#444444",
                fontSize: "17px",
                fontFamily: "revert",
                marginTop: 2,
              }}
            >
              The functionalities of the Atlas can be best utilized in the following order: start by visualizing the data layers in detail in the Explore Data tab. The Data at a glance tab is then
              used to look at multiple data layers at once. The Data Access tab gives information about the data and their download links. The Use Cases tab discusses several possible uses of the
              ACASA Atlas. Additionally, visit the Resources and About Us tab to know more about us, ACASA team, data briefs, newsletter updates, expert opinions, and media coverage.
            </Typography>
          </Box>
          <Box sx={{ width: "63%", margin: "auto" }}>
            <VideoPlayer></VideoPlayer>
          </Box>
        </Box>*/}
        {/*  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: "100%" },
            paddingBottom: 10,
            paddinTop: 5,
            backgroundColor: mode === "dark" ? "#1b1f23" : "#f7f7f7",
          }}
        >
          <Box sx={{ marginLeft: 7, marginRight: 7, marginTop: 4 }}>
            <Typography
              sx={{
                color: mode === "dark" ? "#e0e0e0" : "#111111",
                fontWeight: "bold",
                fontSize: "30px",
                fontFamily: "revert",
                marginBottom: "4px",
              }}
            >
              Our Partners
            </Typography>
            {/*  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: { xs: "100%", sm: "100%" },
              }}
              gap="0.5vw"
            >
              <SleekTooltip title="Bangladesh Agriculture Research Council (BARC)" arrow placement="top">
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"barc.png"} style={logoStyle6} alt="barc" />
                </Paper>
              </SleekTooltip>
              <SleekTooltip title="Indian Council of Agricultural Research" arrow placement="top">
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"icar.png"} style={logoStyle6} alt="icar" />
                </Paper>
              </SleekTooltip>
              <SleekTooltip title="Nepal Agricultural Research Council" arrow placement="top">
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"narc.png"} style={logoStyle6} alt="narc" />
                </Paper>
              </SleekTooltip>
              <SleekTooltip title="Natural Resources Management Center (NRMC)" arrow placement="top">
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"nrmc.png"} style={logoStyle6} alt="nrmc" />
                </Paper>
              </SleekTooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: { xs: "100%", sm: "100%" },
                justifyContent: "center",
              }}
              gap="0.5vw"
            >
              {/*<SleekTooltip title="Bill & Melinda Gates Foundation" arrow>
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"bmgf-new.svg"} style={logoStyle7} alt="bmgf" />
                </Paper>
              </SleekTooltip>*/}
              <SleekTooltip title="International Maize and Wheat Improvement Center" arrow>
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"cimmyt-cgiar.png"} style={logoStyle7} alt="cimmyt" />
                </Paper>
              </SleekTooltip>
              <SleekTooltip title="University of Florida" arrow>
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"south-asia-11.svg"} style={logoStyle7} alt="florida" />
                </Paper>
              </SleekTooltip>
              <SleekTooltip title="University of Columbia" arrow>
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"columbia-university.png"} style={logoStyle6} alt="columbia" />
                </Paper>
              </SleekTooltip>
              <SleekTooltip title="University of Washington" arrow>
                <Paper sx={paperHoverStyle} elevation={0}>
                  <img src={"south-asia-12.svg"} style={logoStyle8} alt="washington" />
                </Paper>
              </SleekTooltip>
            </Box>
          </Box>
        </Box>
        <StickyFooter></StickyFooter>
      </Box>

      <Box
        sx={{
          marginTop: "80px",
          width: "100%",
          height: "calc(100vh - 80px)",
          alignItems: "center",
          justifyContent: "center",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Typography
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: mode === "dark" ? "#e0e0e0" : "#333333",
          }}
        >
          <PersonalVideoIcon style={{ fontSize: 40 }} /> This website is designed for desktop. Please view in a bigger screen.
        </Typography>
      </Box>
    </div>
  );
};

function Item(props) {
  const [loading, setLoading] = React.useState(true);
  const handleReady = () => {
    setLoading(false);
  };

  return (
    <Paper>
      {loading && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <img src={props.item.videothumb} alt="Loading" style={thumbstyle} />
        </Box>
      )}
      <ReactPlayer url={props.item.video} muted width="100vw" height="auto" playing={true} loop={true} onReady={handleReady} style={{ display: loading ? "none" : "block" }} />
      <Image sx={{ backgroundColor: "#111111", opacity: 0.3 }}></Image>
      <Image>
        <Box
          component="span"
          sx={{
            display: "flex",
            m: 1,
            ml: 7,
            mt: 5,
            padding: 2,
            width: "35vw",
            flexDirection: "column",
            textAlign: { sm: "left", md: "left" },
          }}
        >
          <Typography
            variant="h4"
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              fontWeight: "bold",
              textShadow:
                theme.palette.mode === "dark"
                  ? "2px 2px 5px rgba(0, 0, 0, 0.6)" // Stronger shadow in dark mode for depth
                  : "2px 2px 5px rgba(0, 0, 0, 0.25), -2px -2px 5px rgba(0, 0, 0, 0.25)",
            })}
          >
            {props.item.name}
          </Typography>
          <Typography variant="subtitle1" sx={(theme) => ({ fontWeight: "bold", mt: 2, color: theme.palette.mode === "dark" ? "#000000" : "#ffffff" })}>
            {props.item.description}
          </Typography>
          <Box
            sx={(theme) => ({
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(to right, rgba(99, 99, 99, 0.7), rgba(240, 240, 240, 0.7))" // Light gradient for dark mode
                  : "linear-gradient(to right, rgba(255, 254, 227,0.4), rgba(0, 0, 0, 0.3))",
              mt: "90px",
              ml: -9,
              mr: -3,
            })}
          >
            <Slide direction="right" in={props.sts === props.item.id} timeout={500} mountOnEnter unmountOnExit>
              <Typography variant="h6" sx={(theme) => ({ ml: 9, mr: 3, color: theme.palette.mode === "dark" ? "#000000" : "#ffffff" })}>
                {props.item.type}
              </Typography>
            </Slide>
          </Box>
          <Button
            variant="contained"
            href="/#/exploredata"
            sx={(theme) => ({
              "width": "160px",
              "mt": 6,
              "mb": 2,
              "fontSize": "18px",
              "flexShrink": 0,
              "color": theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              "fontWeight": "bold",
              "backgroundColor": theme.palette.mode === "dark" ? "#B88F1A" : "#fece2f",
              "&:hover": { backgroundColor: theme.palette.mode === "dark" ? "#B88F1A" : "#fece2f" },
            })}
          >
            Explore
          </Button>
        </Box>
      </Image>
    </Paper>
  );
}

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
  color: theme.palette.common.white,
}));

export default Home;
