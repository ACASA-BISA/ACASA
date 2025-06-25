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
import { Box, Typography, Stack, Chip, useMediaQuery, Paper, Divider, Collapse, IconButton, List, ListItem } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import { motion } from "framer-motion";
import { Public, CleaningServices, Insights, Layers, Search, Publish, ExpandMore, ExpandLess, SubdirectoryArrowRight, WarningAmber, AutoAwesome, Tune } from "@mui/icons-material";

const renderFormattedText = (text) => {
  const lines = text.split("\n");

  const isBullet = (line) => /^\s*[\d]+\.\s+/.test(line) || /^\s*[-•*]\s+/.test(line);

  const listItems = [];
  const elements = [];

  lines.forEach((line, index) => {
    if (isBullet(line)) {
      listItems.push(
        <ListItem key={index} sx={{ py: 0.5, color: "#aaa", pl: 2, display: "list-item" }}>
          {linkify(line.replace(/^(\s*[\d]+\.|\s*[-•*])\s+/, ""))}
        </ListItem>
      );
    } else {
      if (listItems.length > 0) {
        elements.push(
          <List key={`list-${index}`} sx={{ pl: 3, pb: 1, listStyleType: "disc", color: "#aaa" }}>
            {listItems.splice(0)}
          </List>
        );
      }
      if (line.trim()) {
        elements.push(
          <Typography key={index} variant="body2" sx={{ mb: 1.2, color: "#aaa", textAlign: "left" }}>
            {linkify(line)}
          </Typography>
        );
      }
    }
  });

  // Push remaining list items
  if (listItems.length > 0) {
    elements.push(
      <List key={`list-final`} sx={{ pl: 3, pb: 1, listStyleType: "disc", color: "#aaa" }}>
        {listItems}
      </List>
    );
  }

  return elements;
};

const linkify = (text) =>
  text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    part.match(/^https?:\/\//) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "#81c784" }}>
        {part}
      </a>
    ) : (
      part
    )
  );

const steps = [
  {
    title: "Risks",
    icon: WarningAmber,
    subsections: [
      {
        title: "Climatology",
        desc: `To derive the climatology, we analyzed precipitation, maximum temperature (Tmax), and minimum temperature (Tmin) over the crop growth periods for each commodity, and annually in the case of livestock. For temperature, daily Tmax and Tmin values were averaged over each crop’s growing season across a 30-year baseline period, and similarly for future scenarios. For precipitation, we first calculated the total accumulated rainfall during the crop cycle (or annually, for livestock) for each year, and then computed the 30-year average to represent climatological precipitation.`,
      },
      {
        title: "Hazards",
        desc: `The first step entails listing various potential hazards—such as heat stress, cold stress, and extreme weather events—that could adversely affect specific commodities and determining the levels and stages at which these hazards become significantly detrimental. This step involves a literature review to identify appropriate thresholds, expert consultations across participating countries, and stakeholder validation. For example, heat stress in rice is defined when maximum temperature exceeds 43°C. For livestock, such as cattle, heat stress was characterized using the Temperature Humidity Index (THI), with values exceeding 81 classified as hazardous. Intensity classes were determined using expert-informed k-means clustering, and frequency was categorized using statistical return period analysis. Finally, a combined hazard score—calculated as the product of intensity and frequency classes—was reclassified into five standard hazard categories for consistent spatial analysis.`,
      },
      {
        title: "Exposure",
        desc: `For crops, exposure is defined as the cropped area per grid cell (0.05° resolution) for each commodity (e.g., rice, wheat, maize), derived by integrating district-level statistics with the MAPSPAM dataset. For livestock, exposure is quantified as the number of animals per grid cell, based on the FAO-GLW4 dataset refined using national census data.`,
      },
      {
        title: "Vulnerability",
        desc: `Vulnerability was assessed using a set of biophysical and socio-economic indicators relevant to both crops and livestock, processed at a 5 km spatial resolution. The selected datasets were sourced from globally recognized and widely accepted databases. For livestock, the layers included rural infrastructure, feed and fodder availability, agricultural GDP, and a composite socio-economic development index. For crops, vulnerability indicators included irrigation, soil water-holding capacity, rural infrastructure, income, and the socio-economic development index. All datasets were harmonized to a common 5 km grid using reallocation or interpolation methods to enable spatial analysis.`,
      },
      {
        title: "Risk index",
        desc: `The risk index by commodity was assessed by evaluating multiple factors contributing to climate hazards, vulnerability, and exposure across various crops and livestock species. This methodology involved computing commodity-specific hazard layers based on current and future climatic conditions, vulnerability layers based on socio-economic variables, and exposure layers based on crop area or animal population. By combining these elements, an integrated risk index score was developed and classified into five classes.`,
      },
      {
        title: "Hazard index",
        desc: `To develop a hazard index that captures the combined severity of multiple hazards, each gridded hazard layer was first normalized using z-score transformation to ensure comparability across different units and scales. Principal Component Analysis (PCA) was then applied to the normalized layers to derive objective weights for each hazard based on their contribution to the overall variance. These weights were reviewed and validated by domain experts. A composite hazard index was computed using a weighted additive approach, and the continuous index was subsequently reclassified into five discrete classes using z-scores.`,
      },
      {
        title: "Exposure index",
        desc: `The crop area or livestock density per grid cell was z-score normalized and classified into five exposure index classes.`,
      },
      {
        title: "Vulnerability index",
        desc: `To assess regional vulnerability, multiple vulnerability layers were first normalized using z-score transformation to standardize their scales. PCA was then used to compute weights reflecting the relative importance of each layer based on their contribution to overall variance. These weights were reviewed and adjusted through expert consultations. A composite vulnerability index was derived via weighted summation, and the final index was reclassified into five discrete classes using z-scores.`,
      },
    ],
  },
  {
    title: "Impact",
    icon: AutoAwesome,
    subsections: [
      {
        title: "Productivity",
        desc: `To assess the impact of climate change on different crops, a modelling approach was employed using three widely recognized process-based crop simulation models: InfoCrop, DSSAT (Decision Support System for Agrotechnology Transfer), and APSIM (Agricultural Production Systems sIMulator). These models simulate crop growth and yield under varying climatic, soil, and management conditions, making them suitable for evaluating crop responses across spatial and temporal scales. In ACASA, these point-based models were integrated into a MATLAB-coded utility to enable high-resolution spatial crop simulations. The models were spatially calibrated using regional varietal data on phenological durations and district-level yields, allowing adjustment of regional genetic coefficients.
        
        The high-resolution input dataset included sowing dates, nitrogen application rates (from fertilizer census data and recommended doses), soil profiles (sourced from ISRIC, ISRO, and field surveys), and an irrigation mask. This dataset was used to conduct spatially gridded crop simulations across the entire South Asian region. Developed specifically for South Asia at a 5x5 km spatial resolution, it integrates both local and global datasets (Shirsath et al., 2025 – unpublished).
        
        The calibrated crop models were used to simulate yields under both baseline (1984–2013) and future climate scenarios (2035–2064 and 2065–2094), for emission pathways SSP2-4.5 and SSP5-8.5. Changes in crop yield were assessed by comparing future projections with baseline yields, expressed as percentage changes.`,
      },
      {
        title: "Resilience",
        desc: "Resilience reflects the stability of yield production over a 30-year time window. To assess yield stability across years, the coefficient of variation (CV) was calculated at the pixel level, serving as a proxy for yield resilience—where a lower CV indicates higher resilience.",
      },
      {
        title: "Value of production",
        desc: "Value of production refers to the total production value of a crop under baseline and future scenarios, expressed in 2019 USD. It is calculated by multiplying gridded crop prices with corresponding yields. The price data, representing farm harvest prices at the district/province level, was sourced from government databases in each country. For Bangladesh, division-level farm harvest prices were obtained from the Bangladesh Integrated Household Survey (BIHS). All available district/division-level prices were adjusted to 2019–20 values. The gridded price data was generated through kriging and matched to ACASA resolution, enabling the calculation of value of production for each crop.",
      },
    ],
  },
  {
    title: "Adaptation",
    icon: Tune,
    subsections: [
      {
        title: "Biophysical suitability",
        desc: `Biophysical Suitability 	The development of adaptation options suitability maps in ACASA Version 1.0 followed a systematic, multi-stage methodology designed to ensure that the resulting maps are both scientifically robust and contextually relevant for South Asian agriculture. The process began with identifying and reviewing climatic hazards affecting major agricultural commodities, followed by mapping adaptation strategies to these hazards based on their demonstrated effectiveness and contextual relevance. The identification process was informed by expert insights, historical data, and documented case studies, ensuring that the adaptation options considered were both practical and evidence based.

        To build a comprehensive database of adaptation strategies, a heuristic approach was employed, starting with a systematic literature review. This was complemented by a desk review of grey literature, including reports from agricultural research institutions, NGOs, and government agencies, as well as workshop outputs and survey data. In the next phase, data collected from literature and desk reviews were synthesized and analyzed. Adaptation options were categorized based on climatic region, landforms, soil types, and irrigation or water availability contexts, allowing identification of strategies best suited to specific environmental settings. Both qualitative and quantitative assessments were conducted to evaluate feasibility, effectiveness, and socio-economic impact. This categorization laid a strong foundation for mapping adaptation suitability across the region.

        A key component of the methodology was expert and stakeholder engagement through a dedicated consultation workshop, where identified adaptation options were reviewed and validated. Following validation, suitability mapping was carried out by integrating spatial data on climate, soil, and landform with the identified adaptation strategies using a heuristic-based mapping approach. This assessed the match between adaptation options and regional conditions, considering factors such as risk reduction potential, implementation feasibility, and socio-economic benefits. The resulting maps visually indicate where each adaptation option would be most effective across South Asia.

        To ensure technical robustness and stakeholder engagement, adaptation options were further validated using an interactive web-based platform. The platform enabled a feedback loop, allowing stakeholders to provide real-time input and suggestions, which informed iterative refinement of the suitability maps. This approach ensured that the final maps were both scientifically rigorous and practically relevant, tailored to the diverse needs and conditions of South Asian agriculture.`,
      },
      {
        title: "Scalability",
        desc: `Scalability refers to the feasibility of implementing adaptation options across South Asia. A literature review and stakeholder consultations were conducted to identify key enablers and barriers influencing the adoption of each adaptation option. 
        
        Scalability was quantified using a composite index constructed from six key dimensions: credit availability, input access, social networks, education, labor availability, and access to information. Relevant proxies were selected for each dimension, and equal weights were applied to compute a relative composite indicator. The base data was sourced primarily from village-level infrastructure datasets collected under India’s Mission Antyodaya (https://missionantyodaya.nic.in/ma2019/home), and from corresponding government portals in other South Asian countries. The 2019 village-level data was aggregated to ACASA grids using zonal statistics methods.`,
      },
      {
        title: "Gender suitability",
        desc: `The gender suitability framework in ACASA refers to the degree of suitability of adaptation options in comparison to no-technology or conventional practices. Gender suitability is represented as suitable and unsuitable after switching to adaptation options from conventional practice.

        To estimate gender suitability, ACASA used a combination of qualitative and spatial mapping frameworks. First, through stakeholder workshops, we obtain feedback on the suitability scores of various technologies from workshop participants. The gender suitability is assessed in six dimensions, i) reduction in labor requirement; ii) timesaving; iii) drudgery reduction; iv) market dependency; v) ease of application and vi) influence on decision making.

        To construct a technology-specific composite index for gender suitability and spatial mapping, first, participant results on the six dimensions of gender suitability across adaptation options were summarized. Second, index weights were calculated for cultivators and agricultural laborers from workshop outputs. Third, gender suitability composite scores were computed for each adaptation option, separately for cultivator and agricultural laborer. Fourth, scores were then converted to spatial scores for mapping using the proportion of female cultivators and laborers in the total population across grids of South Asia.  Finally, maps were classified based on suitability and unsuitability into four classes.`,
      },
      {
        title: "Yield benefits",
        desc: `The crop models were simulated for several technological interventions by modifying either the input parameters or internal model mechanisms. Yield benefits from these interventions were evaluated for both baseline and future SSP scenarios, allowing for the quantification of yield gains or losses attributable to each specific technology.`,
      },
      {
        title: "Economic viability",
        desc: `Economic viability is assessed in terms of benefit-to-cost (BC) ratios. These ratios serve as a simple yet effective indicator of profitability, helping to identify profit-making versus loss-making areas. The base year for cost of cultivation is 2019–20. Similar to the price data, cost of cultivation figures were sourced from published government data at the district or division level. For India, plot-level cost data was utilized from government databases.

        The BC ratio was calculated by dividing the value of production by the total paid-out cost, which includes expenses for inputs, labor, and rental value of land. Baseline cost of cultivation data was downscaled to the ACASA resolution using a Bayesian kriging approach.
        
        Since direct estimates of the cost of implementing adaptation options are not available at large spatial scales, profitability was estimated using cost-change assumptions derived from published and unpublished literature, including meta-analyses. For future scenarios, value of production was projected using modeled yields, while costs were assumed to remain at baseline levels.`,
      },
      {
        title: "Adaptation benefits",
        desc: `The estimation of yield benefits under both baseline and future scenarios enabled classification of the adaptation benefit of each technology.

        1. If a technology delivers yield benefits under both baseline and future scenarios, it is classified as an “adaptation.”
        2. If benefits are observed only under the baseline but not in the future, the technology is considered “maladaptive.”
        3. If benefits are projected only in the future but not currently, the technology is said to have “adaptation potential” but is categorized as “wait & see” due to impracticality for immediate implementation.
        4. If a technology fails to deliver yield benefits in both time frames, it is classified as “ineffective.”`,
      },
    ],
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
  const [expandedSubsections, setExpandedSubsections] = useState({});

  const toggleStep = (index) => {
    setExpandedStep((prev) => (prev === index ? null : index));
  };

  const toggleSubsection = (stepIndex, subIndex) => {
    setExpandedSubsections((prev) => ({
      ...prev,
      [stepIndex]: {
        ...prev[stepIndex],
        [subIndex]: !prev[stepIndex]?.[subIndex],
      },
    }));
  };

  return (
    <Box sx={{ backgroundColor, minHeight: "100vh", px: 2, py: 3 }}>
      <Box sx={{ textAlign: "left", mb: 10 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: accent, letterSpacing: 1.2, mb: 2 }}>
            Methodology
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "left", mx: "auto", color: subtitleColor }}></Typography>
        </motion.div>
      </Box>

      <Box
        sx={{
          position: "relative",
          maxWidth: 1100,
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
                  {!isMobile && <Box sx={{ flex: 1 }} />}
                  <Box
                    sx={{
                      zIndex: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
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
                      "width": "100%",
                      "maxWidth": "750px",
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
                      <Typography variant="h6" sx={{ textAlign: "left", color: textColor, fontWeight: 600 }}>
                        {step.title}
                      </Typography>
                      <IconButton onClick={() => toggleStep(i)} size="small" sx={{ color: subtitleColor }}>
                        {expandedStep === i ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>

                    <Collapse in={expandedStep === i}>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ textAlign: "left", color: subtitleColor }}>
                          {step.desc}
                        </Typography>

                        {step.subsections?.map((sub, j) => {
                          const isOpen = expandedSubsections[i]?.[j];
                          return (
                            <Box key={j} sx={{ mt: 2, borderLeft: `3px solid ${accent}55`, pl: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <SubdirectoryArrowRight sx={{ color: accent, mr: 1 }} />
                                  <Typography variant="subtitle2" sx={{ color: textColor, fontWeight: 600 }}>
                                    {sub.title}
                                  </Typography>
                                </Box>
                                <IconButton onClick={() => toggleSubsection(i, j)} size="small" sx={{ color: subtitleColor }}>
                                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                              </Box>
                              <Collapse in={isOpen}>
                                <Box sx={{ mt: 1 }}>{renderFormattedText(sub.desc)}</Box>
                              </Collapse>
                            </Box>
                          );
                        })}
                      </Box>
                    </Collapse>
                  </Paper>
                </Box>
              </motion.div>
            );
          })}
        </Stack>
      </Box>

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
