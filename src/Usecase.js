import { useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Gavel, School, Public, Security, Agriculture, VolunteerActivism, AccountBalance } from "@mui/icons-material";

const Data = [
  {
    key: "keyGov",
    header: "Government",
    description:
      "ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.",
    points: [
      "**Evidence-based policymaking:** The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.",
      "**National Adaptation Plan:** Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.",
      "**Climate-Smart Villages:** Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.",
    ],
    image: "farm1.png",
    alt: "Government",
    icon: <Gavel />,
  },
  {
    key: "keyRes",
    header: "Research",
    description: "Empowering researchers with high-resolution, multi-dimensional data for robust climate agriculture analysis in South Asia.",
    points: [
      "**Agricultural research:** Atlas provides a comprehensive platform for climate-related data products for agricultural research. Commodity-specific hazard and adaptation identification methodology and tools can be used for interdisciplinary research on various aspects of climate risk management.",
      "**Impact evaluation and assessment:** Atlas can enable hotspot identification and gendered vulnerability assessments at granular levels, ideal for targeted fieldwork or impact evaluation. ACASA’s repository of evidence on climate-smart agriculture practices allows researchers to validate hypotheses and derive regionally relevant findings.",
    ],
    image: "research1.jpg",
    alt: "Research",
    icon: <School />,
  },
  {
    key: "keyOrg",
    header: "Civil Society and Non-governmental Organizations",
    description: "ACASA provides open-access and freely downloadable products on climate risk management in agriculture.",
    points: [
      "**Strengthen climate action:** ACASA can help civil societies prioritize the interventions for climate action and promote climate-resilient agricultural practices and technologies as an adaptation measure to climate change.",
      "**Climate-related proposal:** ACASA can provide detailed insights and information in developing climate context for new project proposals.",
    ],
    image: "farm6.jpg",
    alt: "Civil Society",
    icon: <VolunteerActivism />,
  },
  {
    key: "keyCred",
    header: "Credit and Finance",
    description: "Enabling credit and financial institutions to leverage climate-agriculture data for risk informed lending and climate-smart investment products.",
    points: [
      "**Credit re-assessment:** Atlas to enable policy advocacy for facilitating the use of climate risk database for agricultural credit risk assessment, risk pricing, and asset quality.",
      "**Development of Agri-financing products:** Banks and MFIs can use ACASA to de-risk loans by aligning credit products with low-risk, high-solvency regions. Data on cost-benefit and scalability supports the design of climate-smart loan products and blended finance schemes.",
      "**Gender-sensitive credit scheme:** Gendered insights allow financial institutions to design women-focused credit solutions, encouraging inclusive lending.",
    ],
    image: "farm5.jpg",
    alt: "Civil Society",
    icon: <AccountBalance />,
  },
  {
    key: "keyMul",
    header: "Multi-lateral Agencies and other Donor Organisations",
    description:
      "ACASA will provide multi-lateral agencies with strategic data insights and directions for adaptation investments in South Asia and facilitate more effective project design and planning.",
    points: [
      "**Climate finance:** Agencies can systematically integrate ACASA adaptation recommendations in their climate finance planning process to align with the Paris Agreement and sustainable development goals. Data will support agencies in focusing on targeted investments such as climate-resilient food systems, landscapes, and livelihoods, especially in regions with high adaptation benefits.",
      "**Targeted high-impact investments:** Donors can utilize ACASA to prioritize high-impact locations for climate-smart agriculture projects benefiting small-scale farmers and promote adaptation strategies.",
      "**Gender-intentional adaptations:** The Atlas includes information on gender-intentional adaptations, guiding donors to promote equity in climate adaptation projects.",
      "**Monitoring and evaluation:** ACASA is an innovative tool for agencies as they constantly seek information and expertise in improving the effectiveness and impact of their initiative. Atlas provides accessible and actionable data through open-access, user-friendly tables and maps for informed resource allocation and structured interventions.",
    ],
    image: "farm3.jpg",
    alt: "Multilateral agencies",
    icon: <Public />,
  },
  {
    key: "keyIns",
    header: "Insurance Industry",
    description:
      "Atlas can support Agri-insurance agencies in developing satisfactory crop insurance products for dynamic small-scale producers, providing sufficient resolution at the village level.",
    points: [
      "**Methodology Improvement:** A granular risk assessment of Atlas can aid in improving the existing methodology for insurance product design and payout mechanism. Implementing a parametric mechanism for insurance claims could improve efficiency, triggered only by specific conditions rather than random samples.",
      "**Premium set-up:** Enhancing risk quantification and identification to boost insurance penetration from current levels and premium set-up.",
    ],
    image: "insurance_usecase.png",
    alt: "Insurance Industry",
    icon: <Security />,
  },
  {
    key: "keyAgr",
    header: "Agri-food Industry",
    description: "ACASA is committed to ensuring a sustainable agri-food industry and inclusive supply chains.",
    points: [
      "**Climate-friendly supply chains:** Collaboration with farmers for sustainable and climate-resilient practices and equitable climate-friendly supply chains, ensuring an uninterrupted supply.",
      "**Capacity development:** Enhancing the capacity of the farming community for the adaptation to climatic hazards for livestock production.",
    ],
    image: "farm4.jpg",
    alt: "Agrifood Industry",
    icon: <Agriculture />,
  },
];

const HoverBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#c4cbd3",
  padding: theme.spacing(3),
  minHeight: "300px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "background-image 0.3s ease-in-out",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: theme.palette.mode === "dark" ? "white" : "black",
  backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(170, 170, 170, 0.5)",
}));

const GridContainer = styled(Grid)({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
});

const LayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "20px",
  marginTop: "20px",
  maxWidth: "80vw",
  marginLeft: "auto",
  marginRight: "auto",
});

const IntroBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2c2f34" : "#f5f5f5", // Theme-aware background
  padding: theme.spacing(4),
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: theme.palette.mode === "dark" ? "0px 4px 10px rgba(0,0,0,0.4)" : "0px 4px 10px rgba(0,0,0,0.1)",
  marginBottom: theme.spacing(3),
}));

const lightColors = ["#64b5f6", "#4db6ac", "#e79aa9", "#a1887f", "#ffb74d", "#ff8a65", "#81c784"];
const darkColors = ["#4a7097", "#357a7e", "#a15c68", "#6d4c41", "#c99043", "#b25f4e", "#4e6b50"];

export default function Usecase() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    if (selectedItem?.key === item.key) {
      setSelectedItem(null); // Toggle off
    } else {
      setSelectedItem(item); // Select new item
    }
  };

  return (
    <Box sx={{ paddingTop: "100px", textAlign: "center", height: "100vh", overflow: "auto" }}>
      <IntroBox>
        <Typography variant="h4" gutterBottom sx={(theme) => ({ color: theme.palette.mode === "dark" ? "#61c258" : "#4ba046", textAlign: "left", fontFamily: "revert", fontWeight: "bold" })}>
          Use Cases of ACASA
        </Typography>
        <Typography paragraph sx={(theme) => ({ color: theme.palette.text.primary, textAlign: "left", fontFamily: "revert" })}>
          ACASA is a unique platform that provides an integrated assessment of commodity-specific granular climate risk profiles and information on adaptation options for South Asian agriculture. This
          is done for region’s major agricultural and livestock commodities at a 5 km resolution. In addition, it also identifies regions where adaptation benefits would emerge through gender-friendly
          technology adoption and would curtail maladaptation.
        </Typography>

        <Typography paragraph sx={(theme) => ({ color: theme.palette.text.primary, textAlign: "left", fontFamily: "revert" })}>
          Our adaptation options are rigorously formulated from the relevant literature and validated stakeholder consultations across South Asia. Therefore, ACASA provides a unique opportunity for
          various stakeholders to meet their potential needs in broader areas of climate risk management and adaptation in agriculture. The open-access nature of the Atlas promotes knowledge
          dissemination and unrestricted use for desired purposes. ACASA data can be freely downloaded in a tabular, user-friendly format with geographic information system (GIS) datasets for specific
          applications.
        </Typography>

        <Typography paragraph sx={(theme) => ({ color: theme.palette.text.primary, textAlign: "left", fontFamily: "revert" })}>
          We conducted a dedicated ‘Use Case Workshop’ on Oct 1-3, 2024, in Colombo, Sri Lanka, for potential stakeholders who will put the Atlas into use. Upon the stakeholder consultation, the
          following use cases were identified.
        </Typography>
      </IntroBox>

      <LayoutContainer>
        {/* Grey Box */}
        <HoverBox
          sx={(theme) => ({
            backgroundColor: selectedItem
              ? theme.palette.mode === "dark"
                ? darkColors[Data.findIndex((item) => item.key === selectedItem.key) % darkColors.length]
                : lightColors[Data.findIndex((item) => item.key === selectedItem.key) % lightColors.length]
              : theme.palette.mode === "dark"
              ? "#2c2f34"
              : "#f5f5f5",
          })}
        >
          {selectedItem ? (
            <>
              <Typography variant="h6" sx={{ textAlign: "left", fontFamily: "revert" }}>
                {selectedItem.header}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, textAlign: "left", fontFamily: "revert" }}>
                {selectedItem.description}
              </Typography>
              <ul style={{ textAlign: "left", paddingLeft: "20px", listStyleType: "disc" }}>
                {selectedItem.points.map((point, index) => (
                  <li key={index} style={{ marginBottom: "5px" }}>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ textAlign: "left", fontFamily: "revert" }}
                      dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Typography variant="body2" sx={{ fontFamily: "revert" }}>
              Click over a category to see details
            </Typography>
          )}
        </HoverBox>

        {/* Grid */}
        <GridContainer>
          {Data.map((item, index) => (
            <Card
              key={item.key}
              sx={(theme) => ({
                "cursor": "pointer",
                "p": 2,
                "transition": "0.3s",
                "aspectRatio": "1 / 1", // Ensures a square shape
                "display": "flex",
                "alignItems": "flex-end",
                "justifyContent": "flex-start",
                "position": "relative", // Allows absolute positioning for content
                "&:hover": { transform: "scale(1.05)" },
                "backgroundImage": `url(${item.image})`,
                "backgroundSize": "cover",
                "backgroundPosition": "center",
                "border":
                  selectedItem?.key === item.key
                    ? `3.5px solid ${
                        theme.palette.mode === "dark"
                          ? darkColors[Data.findIndex((i) => i.key === item.key) % darkColors.length]
                          : lightColors[Data.findIndex((i) => i.key === item.key) % lightColors.length]
                      }`
                    : "none",
              })}
              onClick={() => handleClick(item)}
            >
              <CardContent
                sx={(theme) => ({
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                })}
              >
                {item.icon && <Box sx={(theme) => ({ fontSize: 24, color: theme.palette.text.primary })}>{item.icon}</Box>}
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    fontSize: "1rem",
                    fontFamily: "revert",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  })}
                >
                  {item.header.includes(" ") ? item.header.split(" ")[0] + "..." : item.header}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Typography
            variant="body2"
            sx={(theme) => ({
              marginTop: 2,
              textAlign: "center",
              fontSize: "0.75rem",
              fontStyle: "italic",
              color: theme.palette.text.secondary,
            })}
          >
            Photo credits: CIMMYT; BISA
          </Typography>
        </GridContainer>
        {/* Image Credit */}
      </LayoutContainer>
    </Box>
  );
}

/*import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { marked } from "marked";
import "./usecasestyle.css";
import { ThemeContext } from "./ThemeContext";

const StyledButton = styled(Button)(({ theme }) => ({
  "padding": "0px 20px",
  "margin": "0px 2px",
  "border": "0px solid rgba(117, 117, 117, 0.986)",
  "borderRadius": "5px",
  "backgroundColor": theme.palette.mode === "dark" ? "#61c258" : "#4ba046",
  "color": theme.palette.mode === "dark" ? "#111" : "#fff",
  "minHeight": "40px",
  "cursor": "pointer",
  "fontWeight": "bold",
  "transition": "0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#b0e3ae" : "#c4ecc2",
    color: theme.palette.mode === "dark" ? "#2d6b2b" : "#111",
  },
  "&.active": {
    backgroundColor: theme.palette.mode === "dark" ? "#b0e3ae" : "#c4ecc2",
    color: theme.palette.mode === "dark" ? "#2d6b2b" : "#4ba046",
  },
}));

const StyledSlide = styled("div")(({ theme }) => ({
  position: "absolute",
  maxWidth: "80%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: theme.palette.mode === "dark" ? "#25292e" : "#f9f9f9",
  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "20px",
  transition: "transform 0.5s ease, opacity 0.5s ease",
}));

const carouselData = [
  {
    key: "keyGov",
    header: "Government",
    description: "ACASA is a vital tool for the government to enhance climate resilience, boost agricultural productivity, and ensure sustainable rural development.",
    points: [
      "The Atlas provides data and analysis to support **evidence-based policymaking** for climate-resilient agriculture and strategic resource allocation.",
      "Integrated climate forecasts and historical data can **enhance early warning systems**, aiding in **disaster preparedness** and mitigation to protect agriculture and rural communities.",
      "Localized climate and agricultural data in Atlas can **improve farmer advisory services**, enabling **adaptive farming** techniques to enhance resilience and productivity.",
      "The Atlas identifies sustainable practices and **resilient farming methods**, supporting rural livelihoods, climate-resilient infrastructure, and economic growth in rural areas.",
    ],
    image: "farm1.png",
    alt: "Government",
  },
  {
    key: "keyIns",
    header: "Insurance & Reinsurance Industry",
    description: "The Atlas will support agri-insurance agencies to develop well-rounded crop insurance for small-scale producers that is dynamic and has sufficient resolution at the village level.",
    points: [
      "The Atlas could propose a **uniform insurance unit framework** to mitigate fundamental risks within each unit.",
      "Enhancing **risk quantification** and identification to boost **insurance penetration** from current levels (28-30%) to 40-50%, potentially lowering premiums by 25% with increased penetration.",
      "Implementing a **parametric mechanism** for insurance claims could improve efficiency, triggered only by specific conditions rather than random samples.",
      "Utilizing crop growth simulation models alongside **reinsurance crop models** can improve pricing accuracy and **dynamic forecasting.**",
    ],
    image: "farm2.jpg",
    alt: "Insurance Industry",
  },
  {
    key: "keyAgi",
    header: "Agri-Food Industry",
    description: "ACASA is committed to ensuring sustainable agri-food industry and inclusive supply chains by promoting:",
    points: [
      "Collaboration with farmers for sustainable practices and **equitable supply chains,** ensuring **quality** through stringent controls.",
      "**Enhancement of productivity** by addressing challenges of small land holdings and low yields with high-yield crop varieties and advanced farming technologies.",
      "Promote **climate-resilient agriculture** through drought-resistant crops, water-saving irrigation, and soil conservation techniques to adapt to climate change.",
      "Encourage **decarbonisation** through adoption of renewable energy sources like solar, biogas, and biomass to reduce the carbon footprint.",
    ],
    image: "farm4.jpg",
    alt: "AgriFood Industry",
  },
  {
    key: "keyMul",
    header: "Multilateral Agencies",
    description:
      "ACASA will provide multi-lateral agencies with strategic data insights and directions for adaptation investments in South Asia and facilitate more effective project design and planning.",
    points: [
      "Agencies can systematically **integrate** ACASA adaptation **recommendations** in their **planning process** to align with Paris agreement goals.",
      "Data will support agencies to focus on **targeted investments** such as climate-resilient food systems, landscapes, and livelihoods especially in regions that show high levels of adaptation benefits.",
      "Multi-lateral agencies can tap **downstream investment opportunities** that can benefit from the information generated by ACASA across countries and sectors.",
      "ACASA serves as an innovative tool for agencies as they constantly seek information and expertise on **improving the effectiveness and impact** of their initiatives.",
    ],
    image: "farm3.jpg",
    alt: "Multilateral Agencies",
  },
  {
    key: "keyDon",
    header: "Donor Agencies",
    description:
      "Donors can utilise ACASA to prioritise climate-smart agriculture projects benefitting small-scale farmers, pastoralists, and promote adaptation strategies that are sound in gender considerations, thus maximising the impact of intervention.",
    points: [
      "Donors can utilise the Atlas to ensure targeted climate adaptation for **underserved areas** and **vulnerable populations.**",
      "Through **quantitative** and **semi-quantitative risk assessment** data, donors can prioritise impactful projects to mitigate climate risks and build adaptation capacity.",
      "The Atlas includes gender-disaggregated data and specific recommendations for **gender-intentional adaptation,** guiding donors to promote equity in climate adaptation.",
      "The Atlas provides **accessible and actionable data** through user-friendly tables and maps, for informed resource allocation and structured interventions.",
    ],
    image: "farm5.jpg",
    alt: "Donor Agencies",
  },
];

// 3D Carousel Styles
const getStyles = (index, activeSlide) => {
  const distance = 350,
    depth = 500,
    rotation = 25;

  switch (index - activeSlide) {
    case 0:
      return { opacity: 1, transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)", zIndex: 10 };
    case -1:
      return { opacity: 0.8, transform: `translateX(-${distance}px) translateZ(-${depth}px) rotateY(${rotation}deg) scale(0.9)`, zIndex: 9 };
    case 1:
      return { opacity: 0.8, transform: `translateX(${distance}px) translateZ(-${depth}px) rotateY(-${rotation}deg) scale(0.9)`, zIndex: 9 };
    case -2:
      return { opacity: 0.6, transform: `translateX(-${distance * 1.8}px) translateZ(-${depth * 1.5}px) rotateY(${rotation}deg) scale(0.85)`, zIndex: 8 };
    case 2:
      return { opacity: 0.6, transform: `translateX(${distance * 1.8}px) translateZ(-${depth * 1.5}px) rotateY(-${rotation}deg) scale(0.85)`, zIndex: 8 };
    default:
      return { opacity: 0.4, transform: "translateX(0px) translateZ(-800px) rotateY(0deg) scale(0.75)", zIndex: 7 };
  }
};

const Usecase = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const next = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % carouselData.length);
  }, []);

  const prev = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  }, []);

  const { mode } = React.useContext(ThemeContext);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", height: "100vh" }}>
      <div className="carousel-container" style={{ overflow: "visible", position: "relative" }}>
        // Category Buttons 
        <Box sx={{ marginTop: "10px", textAlign: "left", display: { xs: "none", md: "block" } }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {carouselData.map((item, index) => (
              <StyledButton key={item.key} className={activeSlide === index ? "active" : ""} onClick={() => setActiveSlide(index)}>
                <strong>{item.header}</strong>
              </StyledButton>
            ))}
          </Box>
        </Box>

        // 3D Carousel 
        <div className="slideC" style={{ position: "relative", height: "55vh", paddingBottom: "50px", display: "flex", justifyContent: "center", alignItems: "stretch" }}>
          {carouselData.map((item, i) => (
            <StyledSlide key={item.key} style={{ ...getStyles(i, activeSlide), height: "100%" }}>
              <div className="text-area">
                <h2>{item.header}</h2>
                <p style={{textAlign: "left"}}>{item.description}</p>
                <ul>
                  {item.points.map((point, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: marked(point) }} style={{textAlign: "left"}}/>
                  ))}
                </ul>
              </div>
              <div className="image-area" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <img src={item.image} alt={item.alt} style={{ maxWidth: "auto", maxHeight: "auto", objectFit: "contain", borderRadius: "10px" }} />
              </div>
            </StyledSlide>
          ))}
        </div>
        // Navigation Buttons 
        <Box
          className="btns"
          sx={{
            position: "absolute",
            bottom: { xs: "-4vh",}, // More flexible bottom positioning
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            display: "flex",
            gap: "10px",
            pointerEvents: "auto",
          }}
        >
          <FontAwesomeIcon
            className="btn"
            onClick={prev}
            icon={faChevronLeft}
            size="2x"
            aria-label="Previous Slide"
            role="button"
            tabIndex="0"
            style={{ cursor: "pointer", margin: "0 15px", color: mode === "dark" ? "#fff" : "#25292e" }}
          />
          <FontAwesomeIcon
            className="btn"
            onClick={next}
            icon={faChevronRight}
            size="2x"
            aria-label="Next Slide"
            role="button"
            tabIndex="0"
            style={{ cursor: "pointer", margin: "0 15px", color: mode === "dark" ? "#fff" : "#25292e" }}
          />
        </Box>
      </div>
    </div>
  );
};

export default Usecase;
*/
