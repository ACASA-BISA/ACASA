import React from "react";
import { Typography, Box, Button, TextField, Paper } from "@mui/material";

const glossaryData = {
  A: [
    {
      term: "ACASA",
      definition: "Atlas of Climatic Adaptation in South Asian Agriculture",
    },
  ],
  B: [],
  C: [
    {
      term: "CHC",
      definition:
        "The Climate Hazards Center is an alliance of multidisciplinary scientists and food security analysts utilizing climate and crop models, satellite-based earth observations, and socioeconomic data sets to predict and monitor droughts and food shortages among the world's most vulnerable populations. Through partnerships with USAID, USGS, and FEWS NET, the CHC provides early warning to save lives and secure livelihoods.",
    },
  ],
  D: [],
  E: [],
  F: [],
  G: [],
  H: [],
  I: [],
  J: [],
  K: [],
  L: [],
  M: [],
  N: [],
  O: [],
  P: [],
  Q: [],
  R: [],
  S: [],
  T: [],
  U: [],
  V: [],
  W: [],
  X: [],
  Y: [],
  Z: [],
};

export default function Glossary() {
  const [selectedLetter, setSelectedLetter] = React.useState(""); // Default to show all terms
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTerms =
    glossaryData[selectedLetter]?.filter((item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    Object.values(glossaryData)
      .flat()
      .filter((item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "35% 65%",
        height: "100vh",
        gap: 2,
        padding: 3,
      }}
    >
      {/* Left Side - Alphabet & Glossary List */}
      <Box
        sx={{
          padding: 3,
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
        }}
      >
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search terms..."
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
          sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}
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
            padding: 2,
            maxHeight: "65vh",
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          {Object.entries(glossaryData).map(([letter, terms]) => {
            const filteredTerms = terms.filter((item) =>
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
        sx={{
          padding: 3,
          maxHeight: "80vh",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
        }}
      >
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, index) => (
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
