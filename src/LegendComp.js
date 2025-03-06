import React from "react";
import { Paper, Box, Typography } from "@mui/material";

const LegendComp = ({ legendData }) => {
  return (
    <Paper elevation={1} sx={{ paddingX: "2px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-3px", marginBottom: "-3px" }}>
        <Typography sx={{ fontSize: 10 }} color="black">
          <span style={{ color: "#111", fontWeight: "normal", fontStyle: "italic" }}>Cropped area, million hectare</span>
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "row",
          //border: `1px solid ${theme.palette.mode === "dark" ? "#555" : "#ddd"}`,
          borderRadius: "4px",
          justifyContent: "top",
          alignItems: "left",
          height: "100%",
          padding: "2px",
          paddingLeft: "2px",
          paddingRight: "3px",
          gap: "0px",
          backgroundColor: theme.palette.mode === "dark" ? "#30363d" : "#fff",
        })}
      >
        {legendData.map((item, index) => (
          <div>
            {index > 0 && (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                  alignItems: "left",
                  gap: "2px",
                }}
              >
                <Typography fontSize="0.6rem" align="left" fontWeight="normal" sx={{ paddingLeft: "2px", marginBottom: "-2px" }}>
                  {(item.Area / 1000000).toFixed(1)} Mha
                </Typography>
                <Box sx={{ width: 55, height: 15, borderRadius: 0, bgcolor: item.color }}>
                  <Typography
                    fontSize="0.62rem"
                    align="left"
                    fontWeight="bold"
                    sx={(theme) => ({
                      paddingLeft: "3px",
                      color: item.color === "rgba(241, 233, 119, 1)" ? "black" : "white",
                    })}
                  >
                    {item.Cat}
                  </Typography>
                </Box>
                <Typography fontSize="0.6rem" align="left" fontWeight="normal" sx={{ paddingLeft: "2px", marginTop: "-2px" }}>
                  {item.Population.toFixed(1)} M
                </Typography>
              </Box>
            )}
          </div>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-4px" }}>
        <Typography sx={{ fontSize: 10 }} color="black">
          <span style={{ color: "#111", fontWeight: "normal", fontStyle: "italic" }}>Number of farm households, million</span>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LegendComp;
