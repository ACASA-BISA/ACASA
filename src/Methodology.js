/*import React, { useContext } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PublicIcon from "@mui/icons-material/Public";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import InsightsIcon from "@mui/icons-material/Insights";
import LayersIcon from "@mui/icons-material/Layers";
import SearchIcon from "@mui/icons-material/Search";
import PublishIcon from "@mui/icons-material/Publish";
import { ThemeContext } from "./ThemeContext";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Data Collection",
    icon: <PublicIcon />,
    description:
      "We gather geospatial and statistical data from trusted sources like FAO, World Bank, and national agencies. Accuracy and recency are key.",
  },
  {
    title: "Preprocessing",
    icon: <CleaningServicesIcon />,
    description:
      "Data is cleaned, reprojected, and converted into standardized formats like GeoTIFF. Noise is removed and extents are clipped.",
  },
  {
    title: "Spatial Analysis",
    icon: <InsightsIcon />,
    description:
      "Raster and vector analysis helps uncover patterns of exposure, vulnerability, and suitability at scale.",
  },
  {
    title: "Classification",
    icon: <LayersIcon />,
    description:
      "Thresholds and logic trees convert raw indicators into intuitive categories. Catastrophic risk is handled with layered logic.",
  },
  {
    title: "Validation & QA",
    icon: <SearchIcon />,
    description:
      "Expert review and ground-truth data ensure the layers are not only accurate but also practical and usable.",
  },
  {
    title: "Publishing",
    icon: <PublishIcon />,
    description:
      "Outputs are visualized interactively, exported for download, and made accessible through a consistent interface.",
  },
];

const MethodologyPage = () => {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const backgroundColor = isDark ? "#1b1f23" : "#ffffff";
  const paperColor = isDark ? "#25292e" : "#f5f5f5";
  const textColor = isDark ? "#e0e0e0" : "#111111";
  const subtitleColor = isDark ? "#bdbdbd" : "#555";
  const accent = "#81c784";

  return (
    <Box
      sx={{
        backgroundColor,
        minHeight: "100vh",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          sx={{
            color: accent,
            fontWeight: 700,
            mb: 2,
            textAlign: "center",
            letterSpacing: 1.5,
          }}
        >
          Methodology
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: subtitleColor,
            maxWidth: 800,
            mx: "auto",
            mb: 6,
            textAlign: "center",
          }}
        >
          Discover how raw data becomes insight. Our process blends scientific rigor with intuitive design to create accessible, powerful, and trustworthy geospatial tools.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: paperColor,
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 8px 30px -5px ${accent}66`,
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  {React.cloneElement(step.icon, {
                    sx: { color: accent, fontSize: 32 },
                  })}
                  <Typography
                    variant="h6"
                    sx={{ color: textColor, fontWeight: 600 }}
                  >
                    {step.title}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: subtitleColor }}>
                  {step.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Divider
        sx={{
          my: 8,
          borderColor: isDark ? "#444" : "#ccc",
        }}
      />

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{ color: textColor, fontWeight: 600, mb: 1 }}
        >
          Tools & Technologies
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: subtitleColor, mb: 2, maxWidth: 600, mx: "auto" }}
        >
          Our pipeline is built with modern open-source tools for power,
          reproducibility, and flexibility.
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
        >
          {[
            "Python",
            "GDAL",
            "QGIS",
            "OpenLayers",
            "FastAPI",
            "PostGIS",
            "NumPy",
            "GeoTIFF",
          ].map((tool) => (
            <Chip
              key={tool}
              label={tool}
              sx={{
                m: 0.5,
                color: accent,
                borderColor: accent,
                backgroundColor: "transparent",
                border: "1px solid",
                fontWeight: 500,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MethodologyPage;
*/

import React, { useContext, useState } from "react";
import { Box, Typography, Stack, Chip, useMediaQuery, Paper, Divider, Collapse, IconButton } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import { motion } from "framer-motion";
import { Public, CleaningServices, Insights, Layers, Search, Publish, ExpandMore, ExpandLess } from "@mui/icons-material";

const steps = [
  {
    title: "Data Collection",
    icon: Public,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Preprocessing",
    icon: CleaningServices,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Spatial Analysis",
    icon: Insights,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Classification",
    icon: Layers,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Validation & QA",
    icon: Search,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Publishing",
    icon: Publish,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const MethodologyPage = () => {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";
  const isMobile = useMediaQuery("(max-width: 600px)");
  const accent = "#81c784";

  const backgroundColor = isDark ? "#121416" : "#f9f9f9";
  const cardColor = isDark ? "#1e2226cc" : "#ffffffcc";
  const textColor = isDark ? "#e0e0e0" : "#222";
  const subtitleColor = isDark ? "#9e9e9e" : "#555";

  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (index) => {
    setExpandedStep((prev) => (prev === index ? null : index));
  };

  return (
    <Box sx={{ backgroundColor, minHeight: "100vh", px: 2, py: 3 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "left", mb: 10 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: accent, letterSpacing: 1.2, mb: 2 }}>
            Methodology
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              mx: "auto",
              color: subtitleColor,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
          </Typography>
        </motion.div>
      </Box>

      {/* Timeline Section */}
      <Box
        sx={{
          position: "relative",
          maxWidth: 1000,
          mx: "auto",
          px: isMobile ? 1 : 4,
          pb: 10,
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "4px",
              background: `${accent}33`,
              transform: "translateX(-50%)",
              borderRadius: 2,
            }}
          />
        )}

        <Stack spacing={8}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.div key={step.title} initial={{ opacity: 0, x: isLeft ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : isLeft ? "row" : "row-reverse",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {!isMobile && <Box sx={{ flex: 1, height: "100%" }} />}

                  <Box
                    sx={{
                      zIndex: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: isMobile ? "auto" : 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        backgroundColor: accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 0 6px ${accent}33`,
                      }}
                    >
                      <Icon sx={{ color: "#fff", fontSize: 30 }} />
                    </Box>
                    {!isMobile && i < steps.length - 1 && (
                      <Box
                        sx={{
                          width: "4px",
                          height: 60,
                          background: `${accent}33`,
                          mt: 1,
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </Box>

                  <Paper
                    elevation={4}
                    sx={{
                      "background": cardColor,
                      "backdropFilter": "blur(8px)",
                      "p": 3,
                      "borderRadius": 4,
                      "flex": 1,
                      "mt": isMobile ? 2 : 0,
                      "transition": "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: `0 12px 40px -10px ${accent}55`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "left",
                          color: textColor,
                          fontWeight: 600,
                        }}
                      >
                        {step.title}
                      </Typography>
                      <IconButton onClick={() => toggleStep(i)} size="small" sx={{ color: subtitleColor }}>
                        {expandedStep === i ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>
                    <Collapse in={expandedStep === i}>
                      <Typography variant="body2" sx={{ mt: 1, textAlign: "left", color: subtitleColor }}>
                        {step.desc}
                      </Typography>
                    </Collapse>
                  </Paper>
                </Box>
              </motion.div>
            );
          })}
        </Stack>
      </Box>

      {/* Divider + Tech Stack */}
      <Divider
        sx={{
          my: 8,
          borderColor: isDark ? "#333" : "#ccc",
          maxWidth: 800,
          mx: "auto",
        }}
      />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: textColor, fontWeight: 600, mb: 1 }}>
          Technologies Used
        </Typography>
        {/*<Typography variant="body2" sx={{ color: subtitleColor, mb: 2, maxWidth: 600, mx: "auto" }}>
          Our methodology relies on a robust open-source stack to ensure power, transparency, and reproducibility.
        </Typography>*/}
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
          {["Python", "GDAL", "QGIS", "PostGIS", "GeoTIFF", "OpenLayers", "FastAPI", "NumPy"].map((tool) => (
            <Chip
              key={tool}
              label={tool}
              sx={{
                m: 0.5,
                px: 1.5,
                color: accent,
                border: `1px solid ${accent}`,
                backgroundColor: "transparent",
                fontWeight: 500,
                borderRadius: "20px",
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MethodologyPage;
