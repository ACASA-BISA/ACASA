import * as React from "react"; // Importing React library
import Box from "@mui/material/Box"; // Importing Box component from MUI
import Typography from "@mui/material/Typography"; // Importing Typography component from MUI

// Defining the style for the logo images
const logoStyle = {
  width: "auto",
  height: "35vh",
  marginX: "20px",
  padding: "20px",
  border: "2px solid #ffffff",
};

// Functional component Info
export default function Info() {
  return (
    <div>
      {/* Main container Box with flex direction column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "70px",
          marginY: "20px",
          gap: "20px",
        }}
      >
        {/* First Report Container */}
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Image Container */}
          <Box sx={{ marginLeft: "50px", marginY: "20px" }}>
            <img src={"ACASA4.png"} style={logoStyle} alt="ACASA-REPORT1" />
          </Box>

          {/* Text Container */}
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
              Risk characterisation and adaptation technology - rice
            </Typography>
            <Typography sx={{ marginY: "20px" }}>
              This report shows the climate hazard index for rice and the
              suitability of direct seeded rice (DSR) dry as one of the proposed
              adaptation options. Its visualization in the test version of ACASA
              is also depicted. This methodology will subsequently be applied to
              other key commodities across South Asia.
            </Typography>
            <Typography sx={{ color: "#444444", marginTop: "10px" }}>
              <a
                href="https://repository.cimmyt.org/entities/publication/69093195-f49a-4328-866a-d897e1b56093"
                
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: "bold",
                  color: "#333333",
                  textDecoration: "none",
                }}
              >
                Read More
              </a>
            </Typography>
          </Box>
        </Box>

        {/* Second Report Container */}
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Image Container */}
          <Box sx={{ marginLeft: "50px", marginY: "20px" }}>
            <img src={"ACASA2.png"} style={logoStyle} alt="ACASA-REPORT2" />
          </Box>

          {/* Text Container */}
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
              Production risk
            </Typography>
            <Typography sx={{ marginY: "20px" }}>
              ACASA uses multiple methods at different scales to characterise
              risk in production. This note describes risk characterisation
              based on historical production statistics and is illustrated for
              rice and wheat in India, cultivated in more than 70 M ha area in
              the country. It showcases ACASA risk matrix approach based on the
              intensity and frequency of yield loss derived from historical
              district-level yield statistics for the last 20 years...
            </Typography>
            <Typography sx={{ color: "#444444", marginTop: "10px" }}>
              <a
                href="https://mcusercontent.com/f5e2b90aee260789647f778e4/files/e66b002b-7b5b-7ab7-3629-522dff9cab4e/Production_Risk.pdf"
                
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: "bold",
                  color: "#333333",
                  textDecoration: "none",
                }}
              >
                Read More
              </a>
            </Typography>
          </Box>
        </Box>

        {/* Third Report Container */}
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Image Container */}
          <Box sx={{ marginLeft: "50px", marginY: "20px" }}>
            <img src={"ACASA3.png"} style={logoStyle} alt="ACASA-REPORT3" />
          </Box>

          {/* Text Container */}
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
              Risk by IPCC framework
            </Typography>
            <Typography sx={{ marginY: "20px" }}>
              The Fifth Assessment Report (AR5) of the Intergovernmental Panel
              on Climate Change (IPCC) has defined risk as a product of the
              interplay between vulnerability, exposure, and hazard. ACASA is
              evaluating this approach as one of the methods to characterize
              commodity-specific risks by considering spatially explicit South
              Asia data on the nature and evolving patterns of climate hazards,
              the exposure of smallholder populations, farms, and crop and
              livestock enterprises...
            </Typography>
            <Typography sx={{ color: "#444444", marginTop: "10px" }}>
              <a
                href="https://mcusercontent.com/f5e2b90aee260789647f778e4/files/e96af2c0-1e35-f7f1-dd54-080b503a7319/Risk_Method_by_IPCC.pdf"
                
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: "bold",
                  color: "#333333",
                  textDecoration: "none",
                }}
              >
                Read More
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
