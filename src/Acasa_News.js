import * as React from "react"; // Import React library
import { Paper, Button } from "@mui/material"; // Import Paper and Button components from Material UI
import Box from "@mui/material/Box"; // Import Box component from Material UI
import { styled } from "@mui/material/styles"; // Import styled function from Material UI
import Typography from "@mui/material/Typography"; // Import Typography component from Material UI

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
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ marginLeft: "20px" }}>
            {/* Logo for the first news item */}
            <img src={"issue02.png"} style={logoStyle} alt="news" />
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Issue 02
            </Typography>
            <Typography>
              ACASA second newsletter - our progress and development, events,
              posts, data and methods, and media presence...
              {/* Link to read more about the first news item */}
              <a
                href="https://mailchi.mp/cgiar.org/acasa-strides_issue02-bisa?e=3233d543a1"
                target="_blank"
                style={{
                  fontWeight: "bold",
                  color: "#333333",
                  textDecoration: "none",
                }}
              >
                {" "}
                Read More
              </a>
            </Typography>
            <Typography sx={{ color: "#444444", marginTop: "20px" }}>
              June 2024
            </Typography>
          </Box>
        </Box>

        {/* Container for the second news item */}
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ marginLeft: "20px" }}>
            {/* Logo for the second news item */}
            <img src={"news.png"} style={logoStyle} alt="news" />
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Issue 01
            </Typography>
            <Typography>
              ACASA inaugural newsletter - our mission, vision, approach,
              events, partner expectations, advisory panel, data and methods,
              and media presence...
              {/* Link to read more about the second news item */}
              <a
                href="https://mailchi.mp/cgiar/south-asias-first-climate-adaptation-atlas?e=7dab12cfe5"
                target="_blank"
                style={{
                  fontWeight: "bold",
                  color: "#333333",
                  textDecoration: "none",
                }}
              >
                {" "}
                Read More
              </a>
            </Typography>
            <Typography sx={{ color: "#444444", marginTop: "20px" }}>
              November 2023
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
