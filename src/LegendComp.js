import React from "react";
import { Paper, Box, Typography } from "@mui/material";

const LegendComp = ({ legendData }) => {
  return (
    <Paper elevation={1}>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${theme.palette.mode === "dark" ? "#555" : "#aaa"}`,
          justifyContent: "top",
          alignItems: "left",
          height: "100%",
          padding: "2px",
          paddingLeft: "2px",
          paddingRight: "3px",
          gap: "0px",
          backgroundColor: theme.palette.mode === "dark" ? "#30363d" : "#ddd",
        })}
      >
        {legendData.map((item, index) => (
          <div>
            {index > 0 && (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
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
                <Typography fontSize="0.62rem" align="left" fontWeight="bold" sx={{ paddingLeft: "2px" }}>
                  {item.Population.toFixed(1)} M
                </Typography>
              </Box>
            )}
          </div>
        ))}
      </Box>
    </Paper>
  );
};

export default LegendComp;
