import React, { useState, useCallback } from "react";
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
        {/* Category Buttons */}
        <Box sx={{ marginTop: "10px", textAlign: "left", display: { xs: "none", md: "block" } }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {carouselData.map((item, index) => (
              <StyledButton key={item.key} className={activeSlide === index ? "active" : ""} onClick={() => setActiveSlide(index)}>
                <strong>{item.header}</strong>
              </StyledButton>
            ))}
          </Box>
        </Box>

        {/* 3D Carousel */}
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
        {/* Navigation Buttons */}
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
