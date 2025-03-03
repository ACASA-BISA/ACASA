import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Button, TextField, Paper } from "@mui/material";

const glossaryData = {
  A: [
    {
      term: "ACASA",
      definition: "Atlas of Climatic Adaptation in South Asian Agriculture",
    },
    {
      term: "Alternate Wetting and Drying (AWD)- Rice",
      definition: "The AWD practices in rice involves intermittent flooding (alternate cycles of saturated and unsaturated conditions) of a rice field, typically to a water depth of around 5 cm, and allowing the field to dry until the water level drops to a certain threshold moisture level i.e., around 10 cm below the soil surface, and then reflooding the field. It saves se irrigation water use and reduces greenhouse gas (GHG) emissions while maintaining or improving grain yields"
    }
  ],
  B: [
    {
      term: "Baseline",
      definition: "Current scenario",
    },
    {
      term: "Barley",
      definition: "The analysis for barley is done for Rabi/winter season",
    },
    {
      term: "Broad bed & furrow (BBF)",
      definition: "BBF, a water-saving and soil conservation technique used in field crop cultivation. It involves creating broad raised beds separated by furrows, allowing for better water infiltration, reduced waterlogging, and improved root aeration"
    }
  ],
  C: [
    {
      term: "CHC",
      definition:
        "The Climate Hazards Center is an alliance of multidisciplinary scientists and food security analysts utilizing climate and crop models, satellite-based earth observations, and socioeconomic data sets to predict and monitor droughts and food shortages among the world's most vulnerable populations. Through partnerships with USAID, USGS, and FEWS NET, the CHC provides early warning to save lives and secure livelihoods",
    },
    {
      term: "CANESM5",
      definition:
        "The Canadian Earth System Model version 5 (CanESM5) is a global model developed to simulate historical climate change and variability, to make centennial-scale projections of future climate, and to produce initialized seasonal and decadal predictions. This paper describes the model components and their coupling, as well as various aspects of model development, including tuning, optimization, and a reproducibility strategy",
    },
    {
      term: "CNRM",
      definition:
        "The National Center for Meteorological Research (CNRM) is a Joint Research Unit (UMR 3589) formed by the CNRS and Météo-France. Until the end of 2015, the UMR was also called the Meteorological Atmosphere Study Group.The CNRM is responsible for a large part of the research activities of the Public Administrative Establishment Météo-France, the national meteorological and climatic service",
    },
    {
      term: "CERFACS",
      definition: "Centre Européen de Recherche et Formation Avancée en Calcul Scientifique (CERFACS) is a European Center in Research and Advanced Training on Scientific Computing",
    },
    {
      term: "CNRM-CM6-1",
      definition: "CNRM-CM6-1 is the climate model developped by the CNRM/CERFACS modelling group for CMIP6. It is the successor of the CNRM-CM5.1 climate model that participates to CMIP5",
    },
    {
      term: "CNRM-ESM-1",
      definition: "",
    },
    {
      term: "Crop Insurance",
      definition: "Crop insurance service refers to the provision of insurance coverage to farmers against losses incurred due to crop failure, damage, or yield reductions caused by weather-related events such as droughts, floods, storms, and pests"
    }
  ],
  D: [],
  E: [
    {
      term: "Ensemble",
      definition: "",
    },
    {
      term: "Early sowing/changing planting dates",
      definition: "A tactical farming practice to synchronize crop planting with the optimal climatic conditions essential for key growth stages of crop"
    }
  ],
  F: [
    {
      term: "Fertilizer rating and timing",
      definition: "Fertilizer to be adjusted to meet the nutrient demands of crop growth and avoid nutrient loss when crop biomass decreases due to water and temperature stress over time under climate change"
    }
  ],
  G: [],
  H: [],
  I: [
    {
      term: "ISIMIP",
      definition:
        "Inter-Sectoral Impact Modal Intercomparison Project (ISIMIP) offers a framework for consistently projecting the impacts of climate change across affected sectors and spatial scales. An international network of climate-impact modellers contribute to a comprehensive and consistent picture of the world under different climate-change scenarios",
    },
    {
      term: "ICT input linked management",
      definition: "ICT linked input management technology is a type of modern agricultural management that comprehensively integrates information technology comprised of current data and information requires from crop growth conditions, soil physical and chemical properties, weather factors; weather based forecast products  for agricultural production by quantitative  and timing of application of nutrients, water and other operation management systems in accordance with geographical locations"
    }
  ],
  J: [],
  K: [],
  L: [],
  M: [
    {
      term: "MIROC6",
      defintion: "",
    },
    {
      term: "Maize",
      definition: "Maize is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif') and 'Maha' in Sri Lanka",
    },
    {
      term: "Micro-irrigation",
      definition: "A low-pressure, low-flow-rate type of irrigation that can reduce the likelihood of overwatering a landscape. Drip irrigation or trickle irrigation is an irrigation method that allows water to drip slowly to the roots of plants, either onto the soil surface or directly onto the root zone, through a network of valves, pipes, tubing, and emitters"
    }
  ],
  N: [],
  O: [],
  P: [
    {
      term: "Productivity",
      definition: "",
    },
    {
      term: "Planting technology",
      definition: "",
    },
    {
      term: "Precision land leveling",
      definition: "Precision Land Levelling (PLL) is a farming technique that involves the mechanical process of grading and smoothing land to achieve a uniform and precise. It may employ advanced laser-guided equipment to precisely contour the land surface, creating a uniform smooth surface (± 2 cm from its average elevation) and eliminating undulations that ensures every inch of your field gets the water it needs"
    },
    {
      term: "Precision Water Management",
      definition: "Precision water management technology is a new type of irrigation management that comprehensively integrates information technology (sensor based) included of data and information requires from crop growth conditions, soil physical and chemical properties, weather factors and agricultural production by positioning, timing, and quantitative application of water and operation management systems in accordance with spatial variation of the field"
    },
    {
      term: "Precision Fertilizer Management",
      definition: "Precision fertilization management technology is a new type of agriculture that comprehensively integrates information technology and agricultural production by positioning, timing, and quantitative application of fertilizer management and operation systems in accordance with spatial variation of the field"
    }
  ],
  Q: [],
  R: [
    {
      term: "Rice",
      definition:
        "Rice is planted in multiple seasons in different countries. Here this analysis is only for monsoon season (also known as 'Kharif' in India, 'Aman' in Bangladesh,and 'Maha' in Sri Lanka)",
    },
  ],
  S: [
    {
      term: "SSP 2-4.5",
      definition: "Shared Socioeconomic Pathways",
    },
    {
      term: "SSP 5-8.5",
      definition: "Shared Socioeconomic Pathways",
    },
    {
      term: "Sorghum",
      definition: "Sorghum is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif')",
    },
    {
      term: "Stress-tolerant varieties",
      definition: "Cultivars specifically bred or selected to tolerate or adapt to the changing climatic conditions. These varieties possess traits that enable them to withstand heat stress, drought, floods, and other environmental stresses"
    },
    {
      term: "System of Rice Intensification (SRI)",
      definition: "SRI involves transplanting young rice seedlings at wider spacing, intermittent irrigation, and organic soil enrichment to promote sustainable and efficient farming practices"
    },
    {
      term: "Supplemental irrigation",
      definition: "Addition of limited amount of water to plants under insufficient water supply by rainfall to overcome the adverse effects of drought, when rainfall fails to provide sufficient moisture for normal plant growth"
    }
  ],
  T: [],
  U: [],
  V: [],
  W: [
    {
      term: "Wheat",
      definition: "The analysis for wheat (except for Afghanistan) is done for Rabi/winter season with planting time around mid-November. For Afghanistan, wheat season starts around April.",
    },
  ],
  X: [],
  Y: [],
  Z: [
    {
      term: "Zero tillage with residue",
      definition: "Zero-Till, also known as no-till or direct seed/drilling, farming method where crops are planted directly into untilled soil, without/minimal disturbing the soil structure, with or without residue retention. With irrigation facilities available, non-puddled transplanted rice can be cultivated in wet as well as dry season depending on the choice of crop rotation"
    }
  ],
};

export default function Glossary() {
  const [selectedLetter, setSelectedLetter] = React.useState(""); // Default to show all terms
  const [searchTerm, setSearchTerm] = React.useState("");

  const Ref = React.useRef(null);

  const filteredTerms =
    glossaryData[selectedLetter]?.filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase())) ||
    Object.values(glossaryData)
      .flat()
      .filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase()));

  // Sort filtered terms alphabetically
  const sortedFilteredTerms = filteredTerms.sort((a, b) => a.term.localeCompare(b.term));

  React.useEffect(() => {
    const term = new URLSearchParams(window.location.hash.replace("#", "?")).get("term");

    if (term) {
      // Find the term in the glossary and scroll into view
      const termElement = Ref.current.querySelector(`[data-term="${term}"]`);
      if (termElement) {
        const yOffset = -110;
        const y = termElement.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [filteredTerms]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        padding: 3,
      }}
    >
      {/* Left Side - Alphabet & Glossary List */}
      <Box
        sx={(theme) => ({
          position: "sticky",
          left: 0,
          top: 175,
          width: "27%",
          height: "100vh",
          padding: 3,
          backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "#f9f9f9",
          borderRadius: 2,
          boxShadow: theme.palette.mode === "dark" ? "2px 0px 10px rgba(0,0,0,0.3)" : "2px 0px 10px rgba(0,0,0,0.1)",
        })}
      >
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          sx={(theme) => ({
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "white",
              borderRadius: 1,
              "& fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#666" : "#ccc",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#81c784" : "#4ba046",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#81c784" : "#4ba046",
                borderWidth: 2,
              },
            },
          })}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Alphabet Buttons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            marginBottom: 2,
            justifyContent: "center",
          }}
        >
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "contained" : "outlined"}
              onClick={() => setSelectedLetter(selectedLetter === letter ? "" : letter)}
              sx={(theme) => ({
                width: 40, // Set fixed width
                height: 40, // Set fixed height (makes it a square)
                minWidth: 40, // Ensure it stays square even if text is smaller
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.2s",

                color: selectedLetter === letter ? (theme.palette.mode === "dark" ? theme.palette.text.primary : "white") : theme.palette.mode === "dark" ? "#aaa" : "#666",

                borderColor: selectedLetter === letter ? (theme.palette.mode === "dark" ? theme.palette.text.primary : "white") : theme.palette.mode === "dark" ? "#555" : "#999",

                backgroundColor: selectedLetter === letter ? (theme.palette.mode === "dark" ? "#3b8c3b" : "#4ba046") : "transparent",

                "&:hover": {
                  backgroundColor: selectedLetter === letter ? (theme.palette.mode === "dark" ? "#3b8c3b" : "#4ba046") : theme.palette.mode === "dark" ? "#333" : "#e0e0e0",

                  borderColor: selectedLetter === letter ? (theme.palette.mode === "dark" ? theme.palette.text.primary : "white") : theme.palette.mode === "dark" ? "#666" : "#999",
                },
              })}
            >
              {letter}
            </Button>
          ))}
        </Box>

        {/* Glossary List */}
        <Paper
          sx={(theme) => ({
            padding: 3,
            marginTop: 3,
            maxHeight: "65vh",
            overflowY: "auto",
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            scrollPaddingBottom: "60px",

            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.paper // Dark mode background
                : "#fafafa", // Light mode background

            scrollbarWidth: "thin",
            msOverflowStyle: "none",

            "&::-webkit-scrollbar": {
              width: "10px",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.mode === "dark" ? "#4ba046" : "#8BC34A",
              borderRadius: "10px",
              transition: "background-color 0.3s ease",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "#3d8b3d" : "#7CB342",
            },

            "&::-webkit-scrollbar-track": {
              background: theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
              borderRadius: "10px",
            },
          })}
        >
          {Object.entries(glossaryData).map(([letter, terms]) => {
            // Sort terms alphabetically within each letter group
            const sortedTerms = terms.sort((a, b) => a.term.localeCompare(b.term));

            const filteredTerms = sortedTerms.filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase()));

            if ((selectedLetter && letter !== selectedLetter) || filteredTerms.length === 0) {
              return null;
            }

            return (
              <Box key={letter} sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    fontWeight: "bold",
                    color: theme.palette.mode === "dark" ? theme.palette.primary.main : "#4ba046",
                    marginBottom: 1,
                    fontSize: "1rem", // Set to a smaller font size for a cleaner look
                  })}
                >
                  {letter}
                </Typography>
                {filteredTerms.map((item, index) => (
                  <Typography
                    key={index}
                    id={item.term.toLowerCase()}
                    sx={(theme) => ({
                      marginLeft: 2,
                      color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#333",
                      fontSize: "0.95rem",
                    })}
                  >
                    {item.term}
                  </Typography>
                ))}
              </Box>
            );
          })}

          {/* No results found message */}
          {Object.values(glossaryData)
            .flat()
            .filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
            <Typography sx={(theme) => ({ textAlign: "center", color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#777" })}>No results found.</Typography>
          )}
        </Paper>
      </Box>

      {/* Right Side - Glossary Descriptions */}
      <Box
        ref={Ref}
        sx={{
          marginLeft: "1%", // Offset the fixed left section
          width: "67%", // Take remaining width
          paddingBottom: "100px", // Ensure space for footer
        }}
      >
        {sortedFilteredTerms.length > 0 ? (
          sortedFilteredTerms.map((item, index) => (
            <Box
              key={index}
              sx={(theme) => ({
                padding: 2,
                borderLeft: `4px solid ${theme.palette.mode === "dark" ? theme.palette.primary.main : "#4ba046"}`,
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "white",
                borderRadius: 1,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)",
                marginBottom: 3,
              })}
              data-term={item.term.toLowerCase()}
            >
              <Typography variant="h6" sx={(theme) => ({ fontWeight: "bold", color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#333" })}>
                {item.term}
              </Typography>
              <Typography variant="body1" sx={(theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#555", marginTop: 1 })}>
                {item.definition}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" sx={(theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.text.disabled : "#777" })}>
            No definitions found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
