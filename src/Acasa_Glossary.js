import React from "react";
import { Typography, Box, Button, TextField, Paper } from "@mui/material";

const glossaryData = {
  A: [{ term: "ACASA", definition: "Atlas of Climatic Adaptation in South Asian Agriculture" }],
  B: [],
  C: [],
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
      <Box>
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#999",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
                borderWidth: 1,
              },
            },
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}
        >
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "contained" : "outlined"}
              onClick={() =>
                setSelectedLetter(selectedLetter === letter ? "" : letter)
              } // Toggle selected state
              sx={{
                color: selectedLetter === letter ? "white" : "#999",
                borderColor: selectedLetter === letter ? "white" : "#999",
                backgroundColor:
                  selectedLetter === letter ? "#4ba046" : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedLetter === letter ? "#4ba046" : "#e0e0e0",
                  outline: "none",
                  borderColor: selectedLetter === letter ? "white" : "#999",
                },
                "&:focus": {
                  outline: "none",
                  borderColor: "#4ba046cc",
                },
                "&:focus-visible": {
                  outline: "none",
                  borderColor: "#4ba046cc",
                },
                "&:active": {
                  outline: "none",
                  backgroundColor: "#4ba046",
                  borderColor: "white",
                },
              }}
            >
              {letter}
            </Button>
          ))}
        </Box>
        <Paper sx={{ padding: 2, maxHeight: "60vh", overflowY: "auto" }}>
          <Typography variant="h5">{selectedLetter}</Typography>
          {filteredTerms?.length ? (
            filteredTerms.map((item, index) => (
              <Typography key={index} sx={{ marginTop: 1, cursor: "pointer" }}>
                {item.term}
              </Typography>
            ))
          ) : (
            <Typography>No results found.</Typography>
          )}
        </Paper>
      </Box>

      {/* Right Side - Glossary Descriptions */}
      <Box>
        {filteredTerms?.map((item, index) => (
          <Box key={index} sx={{ marginBottom: 3 }}>
            <Typography variant="h4">{item.term}</Typography>
            <Typography variant="body1">{item.definition}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
