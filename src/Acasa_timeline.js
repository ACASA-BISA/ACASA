// Imports:
// Imports necessary libraries and components from Material UI for styling and functionality:
// React for building the component
// Timeline and related components (TimelineItem, TimelineSeparator, etc.) for creating the timeline structure.
// Box component for managing layout with flexbox
// Typography component for text content
// Image component for logos

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

const logoStyle = {
  width: "18vw",
  height: "auto",
  margin: "10px",
  marginBottom: "8px",
  padding: "5px",
  border: "3px solid #4b9e44",
  borderRadius: "8px",
};
// Styles:
// Defines a logoStyle object using Javascript for styling the logos used in the timeline.
// Timeline2 Component:

// This is the main component that returns JSX code for the timeline.
// Layout and Structure:

// The component uses a div as the main container.
// Inner content is wrapped in a Box component with flexbox for responsive layout (different screen sizes).

export default function Timeline2() {
  return (
    <div>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent sx={{ mt: "15px" }} variant="body2" color="text.secondary">
            <Typography>13th December, 2023</Typography>
            <Typography>Nepal</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <img src={"tvtoday.png"} style={logoStyle} alt="Timeline1" loading="lazy"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Box
              sx={{
                padding: "20px",
                border: 1,
                borderColor: "#4b9e44",
                height: "auto",
                width: "25vw",
              }}
            >
              <Typography variant="h5" component="span" sx={{ color: "#4b9e44", fontWeight: "bold" }}>
                TV Today
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  lineHeight: "22px",
                  fontSize: "18px",
                  color: "#333333",
                  mt: "10px",
                }}
              >
                Partners Interview
              </Typography>
              <Typography sx={{ mt: "10px", fontSize: "15px" }}>
                In frame: Hon’ble Secretary (Livestock Development), MoALD, Nepal; Dhruba Raj Bhattarai, NARC, Nepal; Pramod Aggarwal, BISA-CIMMYT, India; Tess Russo, BMGF, Seattle; Roshan B Ojha,
                NARC; Amar Bahadur Pun, NARC talks ACASA.
              </Typography>
              <Typography sx={{ color: "#444444", marginTop: "10px" }}>
                <a
                  href="https://www.facebook.com/tvtodayhd/videos/368122882369588/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "bold",
                    color: "#333333",
                    textDecoration: "none",
                  }}
                >
                  Watch
                </a>
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ mt: "15px" }} variant="body2" color="text.secondary">
            <Typography>12th December, 2023</Typography>
            <Typography>Nepal</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <img src={"kantipurtv.png"} style={logoStyle} alt="Timeline2" loading="lazy"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }} align="left">
            <Box
              sx={{
                marginLeft: "80px",
                padding: "20px",
                border: 1,
                borderColor: "#4b9e44",
                height: "auto",
                width: "25vw",
                textAlign: "right",
              }}
            >
              <Typography variant="h5" component="span" sx={{ color: "#4b9e44", fontWeight: "bold" }}>
                Kantipur TV
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  lineHeight: "22px",
                  fontSize: "18px",
                  color: "#333333",
                  mt: "10px",
                }}
              >
                Regular News Time
              </Typography>
              <Typography sx={{ mt: "10px", fontSize: "15px" }}>Coverage for ACASA Annual Project Review and Planning Meet 2023 conducted at Kathmandu, Nepal</Typography>
              <Typography sx={{ color: "#444444", marginTop: "10px" }}>
                <a
                  href="https://kantipurtv.com/business/2023/12/12/1702374469.html"
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
              <Typography sx={{ color: "#444444", marginTop: "10px" }}>
                <a
                  href="https://www.youtube.com/watch?v=Dba9GhkGcz0&t=249s"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "bold",
                    color: "#333333",
                    textDecoration: "none",
                  }}
                >
                  Watch
                </a>
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ mt: "15px" }} variant="body2" color="text.secondary">
            <Typography>15th December, 2023</Typography>
            <Typography>Nepal</Typography>
            <Typography></Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <img src={"Ujyaalo.png"} style={logoStyle} alt="Timeline3" loading="lazy"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Box
              sx={{
                padding: "20px",
                border: 1,
                borderColor: "#4b9e44",
                height: "auto",
                width: "25vw",
              }}
            >
              <Typography variant="h5" component="span" sx={{ color: "#4b9e44", fontWeight: "bold" }}>
                Ujyaalo Online
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  lineHeight: "22px",
                  fontSize: "18px",
                  color: "#333333",
                  mt: "10px",
                }}
              >
                Partner Radio Interview
              </Typography>
              <Typography sx={{ mt: "10px", fontSize: "15px" }}>
                Roshan B Ojha, ACASA country lead, Nepal, discusses the collaboration of Nepal Agricultural Research Council (NARC) and ACASA for enabling the development of effective mitigation and
                adaptation options in the country.
              </Typography>
              <Typography sx={{ color: "#444444", marginTop: "10px" }}>
                <a
                  href="https://ujyaaloonline.com/show/23438"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "bold",
                    color: "#333333",
                    textDecoration: "none",
                  }}
                >
                  Listen
                </a>
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ mt: "15px" }} variant="body2" color="text.secondary">
            <Typography>21st August, 2023</Typography>
            <Typography>India</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <img src={"timeline-1.jpg"} style={logoStyle} alt="Timeline1" loading="lazy"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Box
              sx={{
                padding: "20px",
                border: 1,
                borderColor: "#4b9e44",
                height: "auto",
                width: "25vw",
              }}
            >
              <Typography variant="h5" component="span" sx={{ color: "#4b9e44", fontWeight: "bold" }}>
                ICAR
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  lineHeight: "22px",
                  fontSize: "18px",
                  color: "#333333",
                  mt: "10px",
                }}
              >
                National Workshop on Atlas of Climate Adaptation in South Asian Agriculture (ACASA) inaugurated
              </Typography>
              <Typography sx={{ mt: "10px", fontSize: "15px" }}>
                A two-day national workshop on Atlas of Climate Adaptation in South Asian Agriculture (ACASA), a collaborative project between ICAR and BISA-CIMMYT was inaugurated by Dr S.K.
                Chaudhari, Deputy Director General (NRM), ICAR at ICAR- Central Research Institute for Dryland Agriculture, Hyderabad.
              </Typography>
              <Typography sx={{ color: "#444444", marginTop: "10px" }}>
                <a
                  href="https://icar.org.in/national-workshop-atlas-climate-adaptation-south-asian-agriculture-acasa-inaugurated"
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
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ mt: "15px" }} variant="body2" color="text.secondary">
            <Typography>25th – 27th April, 2023</Typography>
            <Typography>India</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <img src={"timeline-2.jpg"} style={logoStyle} alt="Timeline2" loading="lazy"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Box
              sx={{
                marginLeft: "80px",
                padding: "20px",
                border: 1,
                borderColor: "#4b9e44",
                height: "auto",
                width: "25vw",
                textAlign: "left",
              }}
            >
              <Typography variant="h5" component="span" sx={{ color: "#4b9e44", fontWeight: "bold" }}>
                ICAR
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  lineHeight: "22px",
                  fontSize: "18px",
                  color: "#333333",
                  mt: "10px",
                }}
              >
                Project on Climate Adaptation Atlas for South Asia Launched
              </Typography>
              <Typography sx={{ mt: "10px", fontSize: "15px" }}>
                The ICAR in collaboration with the Borlaug Institute for South Asia (BISA-CIMMYT) and the national agricultural research systems of Bangladesh, Nepal and Sri Lanka launched the project
                Atlas of Climate Adaptation in South Asian Agriculture (ACASA) marking a significant step in south-south cooperation.
              </Typography>
              <Typography sx={{ color: "#444444", marginTop: "10px" }}>
                <a
                  href="https://icar.org.in/project-climate-adaptation-atlas-south-asia-launched"
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
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ mt: "15px" }} variant="body2" color="text.secondary">
            <Typography>26th April, 2023</Typography>
            <Typography></Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <img src={"timeline-3.png"} style={logoStyle} alt="Timeline3" loading="lazy"/>
            <TimelineConnector />
            <TimelineDot sx={{ ml: "calc(9vw + 12px)" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Box
              sx={{
                padding: "20px",
                border: 1,
                borderColor: "#4b9e44",
                height: "auto",
                width: "25vw",
              }}
            >
              <Typography variant="h5" component="span" sx={{ color: "#4b9e44", fontWeight: "bold" }}>
                AgroSpectrum Asia
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  lineHeight: "22px",
                  fontSize: "18px",
                  color: "#333333",
                  mt: "10px",
                }}
              >
                South Asia to get its first Climate Adaptation Atlas in Agriculture
              </Typography>
              <Typography sx={{ mt: "10px", fontSize: "15px" }}>BISA-CIMMYT in collaboration with NARS to develop its first Atlas of Climate Adaptation in South Asian Agriculture</Typography>
              <Typography sx={{ mt: "10px", fontSize: "15px" }}>
                South Asia has diverse climatic zones given its vast physical landscape. However, the region constantly displays the impact of climate change, where the melting of the glaciers, rising
                sea levels, soil erosion, water intrusion, and forest fires are worsening the overall situation.
              </Typography>
              <Typography sx={{ color: "#444444", marginTop: "10px" }}>
                <a
                  href="https://agrospectrumasia.com/2023/04/26/south-asia-to-get-its-first-climate-adaptation-atlas-in-agriculture.html"
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
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

// Timeline Component:

// A Timeline component from Material UI is used to create the visual timeline.
// The position="alternate" prop sets the timeline items to alternate between left and right sides.
// Timeline Items:

// Six TimelineItem components are used to represent each media coverage event.
// Each TimelineItem has three parts:
// TimelineOppositeContent: This displays the date and location details on the opposite side of the timeline.
// TimelineSeparator: This separates the timeline items and displays the media logo image.
// TimelineContent: This holds the detailed information about the media coverage, including media outlet name, headline, description, and a link (if available).
// Content Styling:

// Uses Material UI's Typography component for styled text content with different font sizes, weights, and colors.
// Uses Box components with borders and padding for content sections.
// Links:

// Links to news articles and videos open in a new tab using the target="_blank" attribute.
// Links include rel="noopener noreferrer" for security reasons.
