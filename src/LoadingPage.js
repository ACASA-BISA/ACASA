import React from "react";
import Box from "@mui/material/Box";

const LoadingPage = () => {
  return (
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
      <img
        src="Acasa.png"
        alt="Loading"
        style={{ width: "10%", animation: "blink 1s infinite" }}
      />
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingPage;
