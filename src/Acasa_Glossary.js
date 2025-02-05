import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Button, TextField, Paper } from "@mui/material";
import { defined } from "cesium";

const glossaryData = {
  A: [
    {
      term: "ACASA",
      definition: "Atlas of Climatic Adaptation in South Asian Agriculture",
    },
  ],
  B: [
    {
      term: "Baseline",
      definition: "Current scenario",
    },
    {
      term: "Barley",
      definition: "",
    },
  ],
  C: [
    {
      term: "CHC",
      definition:
        "The Climate Hazards Center is an alliance of multidisciplinary scientists and food security analysts utilizing climate and crop models, satellite-based earth observations, and socioeconomic data sets to predict and monitor droughts and food shortages among the world's most vulnerable populations. Through partnerships with USAID, USGS, and FEWS NET, the CHC provides early warning to save lives and secure livelihoods.",
    },
    {
      term: "CANESM5",
      definition:
        "The Canadian Earth System Model version 5 (CanESM5) is a global model developed to simulate historical climate change and variability, to make centennial-scale projections of future climate, and to produce initialized seasonal and decadal predictions. This paper describes the model components and their coupling, as well as various aspects of model development, including tuning, optimization, and a reproducibility strategy.",
    },
    {
      term: "CNRM",
      definition:
        "The National Center for Meteorological Research (CNRM) is a Joint Research Unit (UMR 3589) formed by the CNRS and Météo-France. Until the end of 2015, the UMR was also called the Meteorological Atmosphere Study Group.The CNRM is responsible for a large part of the research activities of the Public Administrative Establishment Météo-France, the national meteorological and climatic service.",
    },
    {
      term: "CERFACS",
      definition:
        "Centre Européen de Recherche et Formation Avancée en Calcul Scientifique (CERFACS) is a European Center in Research and Advanced Training on Scientific Computing.",
    },
    {
      term: "CNRM-CM6-1",
      definition: "",
    },
    {
      term: "CNRM-ESM-1",
      definition: "",
    },
  ],
  D: [],
  E: [
    {
      term: "Ensemble",
      definition: "",
    },
  ],
  F: [],
  G: [],
  H: [],
  I: [
    {
      term: "ISIMIP",
      definition:
        "Inter-Sectoral Impact Modal Intercomparison Project (ISIMIP) offers a framework for consistently projecting the impacts of climate change across affected sectors and spatial scales. An international network of climate-impact modellers contribute to a comprehensive and consistent picture of the world under different climate-change scenarios.",
    },
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
      definition: "",
    },
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
  ],
  Q: [],
  R: [
    {
      term: "Rice",
      definition: "",
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
      definition: "",
    },
  ],
  T: [],
  U: [],
  V: [],
  W: [
    {
      term: "Wheat",
      definition: "",
    },
  ],
  X: [],
  Y: [],
  Z: [],
};

export default function Glossary() {
  const [selectedLetter, setSelectedLetter] = React.useState(""); // Default to show all terms
  const [searchTerm, setSearchTerm] = React.useState("");

  const Ref = React.useRef(null);

  const filteredTerms =
    glossaryData[selectedLetter]?.filter((item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    Object.values(glossaryData)
      .flat()
      .filter((item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Sort filtered terms alphabetically
  const sortedFilteredTerms = filteredTerms.sort((a, b) =>
    a.term.localeCompare(b.term)
  );

  React.useEffect(() => {
    const term = new URLSearchParams(
      window.location.hash.replace("#", "?")
    ).get("term");

    if (term) {
      // Find the term in the glossary and scroll into view
      const termElement = Ref.current.querySelector(`[data-term="${term}"]`);
      if (termElement) {
        const yOffset = -110; 
        const y =
          termElement.getBoundingClientRect().top + window.scrollY + yOffset;
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
        sx={{
          position: "sticky",
          left: 0,
          top: 175,
          width: "27%",
          height: "100vh",
          padding: 3,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,

          boxShadow: "2px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              borderRadius: 1,
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#4ba046",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4ba046",
                borderWidth: 2,
              },
            },
          }}
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
              onClick={() =>
                setSelectedLetter(selectedLetter === letter ? "" : letter)
              }
              sx={{
                width: 40, // Set fixed width
                height: 40, // Set fixed height (makes it a square)
                minWidth: 40, // Ensure it stays square even if text is smaller
                color: selectedLetter === letter ? "white" : "#666",
                borderColor: selectedLetter === letter ? "white" : "#999",
                backgroundColor:
                  selectedLetter === letter ? "#4ba046" : "transparent",
                transition: "0.2s",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: selectedLetter === letter ? "white" : "#666",
                borderColor: selectedLetter === letter ? "white" : "#999",
                backgroundColor:
                  selectedLetter === letter ? "#4ba046" : "transparent",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor:
                    selectedLetter === letter ? "#4ba046" : "#e0e0e0",
                  borderColor: selectedLetter === letter ? "white" : "#999",
                },
              }}
            >
              {letter}
            </Button>
          ))}
        </Box>

        {/* Glossary List */}
        <Paper
          sx={{
            padding: 3,
            marginTop: 3,
            maxHeight: "65vh",
            overflowY: "auto",
            backgroundColor: "#fafafa",
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { width: "10px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#8BC34A",
              borderRadius: "10px",
              transition: "background-color 0.3s ease",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#7CB342",
            },
            "&::-webkit-scrollbar-track": {
              background: "#e0e0e0",
              borderRadius: "10px",
            },
            scrollPaddingBottom: "60px",
          }}
        >
          {Object.entries(glossaryData).map(([letter, terms]) => {
            // Sort terms alphabetically within each letter group
            const sortedTerms = terms.sort((a, b) =>
              a.term.localeCompare(b.term)
            );

            const filteredTerms = sortedTerms.filter((item) =>
              item.term.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (
              (selectedLetter && letter !== selectedLetter) ||
              filteredTerms.length === 0
            ) {
              return null;
            }

            return (
              <Box key={letter} sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#4ba046",
                    marginBottom: 1,
                    fontSize: "1rem", // Set to a smaller font size for a cleaner look
                  }}
                >
                  {letter}
                </Typography>
                {filteredTerms.map((item, index) => (
                  <Typography
                    key={index}
                    id={item.term.toLowerCase()}
                    sx={{
                      marginLeft: 2,
                      color: "#333",
                      fontSize: "0.95rem",
                    }}
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
            .filter((item) =>
              item.term.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 && (
            <Typography sx={{ textAlign: "center", color: "#777" }}>
              No results found.
            </Typography>
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
              sx={{
                padding: 2,
                borderLeft: "4px solid #4ba046",
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                marginBottom: 3,
              }}
              data-term={item.term.toLowerCase()}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {item.term}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginTop: 1 }}>
                {item.definition}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "#777" }}>
            No definitions found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
