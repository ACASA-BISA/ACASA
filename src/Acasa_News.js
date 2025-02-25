import * as React from "react"; // Import React library
import { Paper, Button } from "@mui/material"; // Import Paper and Button components from Material UI
import Box from "@mui/material/Box"; // Import Box component from Material UI
import { styled } from "@mui/material/styles"; // Import styled function from Material UI
import Typography from "@mui/material/Typography"; // Import Typography component from Material UI
import { TempleBuddhist } from "@mui/icons-material";

// Define a style object for the logo images
const logoStyle = {
  width: "auto",
  height: "25vh",
  margin: "20px",
};

// Define the News component
export default function News() {
  return (
    <div>
      {/* Outer container with margin and gap between items */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "70px",
          marginY: "20px",
          gap: "20px",
        }}
      >
        {/* Container for the first news item */}
        <Box
          sx={(theme) => ({
            "backgroundColor": theme.palette.mode === "dark" ? "#1b1f23" : "#f1f1f1",
            "borderRadius": "8px",
            "display": "flex",
            "flexDirection": "row",
            "padding": "16px",
            "alignItems": "center",
            "transition": "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "#2a2f36" : "#e8f5e9",
              boxShadow: `0px 0px 10px 2px rgba(129, 199, 132, 0.5)`,
            },
          })}
        >
          <Box sx={{ marginLeft: "20px" }}>
            {/* Logo for the first news item */}
            <a href={"https://mailchi.mp/cgiar.org/acasa-strides_issue02-bisa-4323746?e=ff48e11d75"} target="_blank" rel="noopener noreferrer">
              <img
                src={"issue03.png"}
                alt="news"
                style={{
                  width: "120px", // Adjust size as needed
                  height: "auto",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.15)";
                  e.target.style.opacity = "0.9";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.opacity = "1";
                }}
              />
            </a>
          </Box>
          {/* Text content for the first news item */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              padding: "10px",
              marginX: "50px",
              marginY: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.text.primary,
                fontWeight: "bold",
              })}
            >
              Issue 03
            </Typography>
            <Typography sx={(theme) => ({ color: theme.palette.text.primary })}>
              Dive into ACASA beta version, updated brochure, events, expert blogs, cattle data brief...
              {/* Link to read more about the first news item */}
              <Typography
                component="a"
                href="https://mailchi.mp/cgiar.org/acasa-strides_issue02-bisa-4323746?e=ff48e11d75"
                target="_blank"
                sx={{
                  "fontWeight": "bold",
                  "color": (theme) => (theme.palette.mode === "dark" ? "text.secondary" : "#333333"),
                  "textDecoration": "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {" "}
                Read More
              </Typography>
            </Typography>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "text.secondary" : "#444444",
                marginTop: "20px",
              })}
            >
              January 2025
            </Typography>
          </Box>
        </Box>

        {/* Container for the second news item */}
        <Box
          sx={(theme) => ({
            "backgroundColor": theme.palette.mode === "dark" ? "#1b1f23" : "#f1f1f1",
            "borderRadius": "8px",
            "display": "flex",
            "flexDirection": "row",
            "padding": "16px",
            "alignItems": "center",
            "transition": "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "#2a2f36" : "#e8f5e9",
              boxShadow: `0px 0px 10px 2px rgba(129, 199, 132, 0.5)`,
            },
          })}
        >
          <Box sx={{ marginLeft: "20px" }}>
            {/* Logo for the first news item */}
            <a href={"https://mailchi.mp/cgiar.org/acasa-strides_issue02-bisa?e=3233d543a1"} target="_blank" rel="noopener noreferrer">
              <img
                src={"issue02.png"}
                alt="news"
                style={{
                  width: "120px", // Adjust size as needed
                  height: "auto",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.15)";
                  e.target.style.opacity = "0.9";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.opacity = "1";
                }}
              />
            </a>
          </Box>
          {/* Text content for the second news item */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              padding: "10px",
              marginX: "50px",
              marginY: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.text.primary,
                fontWeight: "bold",
              })}
            >
              Issue 02
            </Typography>
            <Typography sx={(theme) => ({ color: theme.palette.text.primary })}>
              Test version of ACASA to be launched, new partnerships, events, expert blogs, rice data brief, media presence...
              {/* Link to read more about the second news item */}
              <Typography
                component="a"
                href="https://mailchi.mp/cgiar.org/acasa-strides_issue02-bisa?e=3233d543a1"
                target="_blank"
                sx={{
                  "fontWeight": "bold",
                  "color": (theme) => (theme.palette.mode === "dark" ? "text.secondary" : "#333333"),
                  "textDecoration": "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {" "}
                Read More
              </Typography>
            </Typography>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "text.secondary" : "#444444",
                marginTop: "20px",
              })}
            >
              June 2024
            </Typography>
          </Box>
        </Box>

        {/* Container for the third news item */}
        <Box
          sx={(theme) => ({
            "backgroundColor": theme.palette.mode === "dark" ? "#1b1f23" : "#f1f1f1",
            "borderRadius": "8px",
            "display": "flex",
            "flexDirection": "row",
            "padding": "16px",
            "alignItems": "center",
            "transition": "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "#2a2f36" : "#e8f5e9",
              boxShadow: `0px 0px 10px 2px rgba(129, 199, 132, 0.5)`,
            },
          })}
        >
          <Box sx={{ marginLeft: "20px" }}>
            {/* Logo for the second news item */}
            <a href={"https://mailchi.mp/cgiar/south-asias-first-climate-adaptation-atlas?e=7dab12cfe5"} target="_blank" rel="noopener noreferrer">
              <img
                src={"news.png"}
                alt="news"
                style={{
                  width: "120px", // Adjust size as needed
                  height: "auto",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.15)";
                  e.target.style.opacity = "0.9";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.opacity = "1";
                }}
              />
            </a>
          </Box>
          {/* Text content for the third news item */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              padding: "10px",
              marginX: "50px",
              marginY: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={(theme) => ({
                color: theme.palette.text.primary,
                fontWeight: "bold",
              })}
            >
              Issue 01
            </Typography>
            <Typography sx={(theme) => ({ color: theme.palette.text.primary })}>
              ACASA inaugural newsletter - our mission, vision, approach, events, partner expectations, advisory panel, data and methods, and media presence...
              {/* Link to read more about the third news item */}
              <Typography
                component="a"
                href="https://mailchi.mp/cgiar/south-asias-first-climate-adaptation-atlas?e=7dab12cfe5"
                target="_blank"
                sx={{
                  "fontWeight": "bold",
                  "color": (theme) => (theme.palette.mode === "dark" ? "text.secondary" : "#333333"),
                  "textDecoration": "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {" "}
                Read More
              </Typography>
            </Typography>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "text.secondary" : "#444444",
                marginTop: "20px",
              })}
            >
              November 2023
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
