import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Button, TextField, Paper, Link } from "@mui/material";
import { defined } from "cesium";

const glossaryData = {
  A: [
    {
      term: "ACASA",
      definition: "Atlas of Climate Adaptation in South Asian Agriculture",
      image: "acasa.png",
    },
    {
      term: "Alternate wetting and drying (AWD)- Rice",
      definition:
        "The AWD practices in rice involves intermittent flooding (alternate cycles of saturated and unsaturated conditions) of a rice field, typically to a water depth of around 5 cm, and allowing the field to dry until the water level drops to a certain threshold moisture level i.e., around 10 cm below the soil surface, and then reflooding the field. It saves se irrigation water use and reduces greenhouse gas (GHG) emissions while maintaining or improving grain yields",
    },
    {
      term: "Adaptation benefits",
      definition: "Yield benefits because of the adoption of technology options over conventional/farmers' practice.",
    },
    {
      term: "Ad libitum water",
      definition: "Provision of water to cattle without restriction"
    },
    {
      term: "Adoption of climate resilient breeds",
      definition: "Selective breeding and upgrading to climate-resilient breeds"
    }
    
  ],
  B: [
    {
      term: "Baseline",
      definition: "Current scenario",
    },
    /*{
      term: "Barley",
      definition: "The analysis for barley is done for Rabi/winter season",
    },*/
    {
      term: "Broad bed and furrow",
      definition:
        "Broad bed and furrow (BBF), a water-saving and soil conservation technique used in field crop cultivation. It involves creating broad raised beds separated by furrows, allowing for better water infiltration, reduced waterlogging, and improved root aeration",
    },
    {
      term: "Biophysical suitability",
      definition: "Suitability of adaptation options in a particular pixel based on the heuristic model of several indicators. For detailed methodology refer to the document",
    },
    {
      term: "Bathing",
      definition: "",
    },
    {
      term: "Balanced concentrate with buffer",
      definition: "Combining concentrate feed and a buffering agent that helps maintain the pH balance in the cow’s rumen",
    },
    {
      term: "Biotic",
      definition: "",
    },
    {
      term: "Biotic stress",
      definition: "",
    },
    {
      term: "Bypass protein and fats",
      definition: "Blend of essential minerals to correct mineral deficiencies and improve productivity"
    }
    /*{
      term: "Buffalo",
      definition: "The analysis is done for milk production"
    }*/
  ],
  C: [
    {
      term: "CHC",
      definition:
        "The Climate Hazards Center is an alliance of multidisciplinary scientists and food security analysts utilizing climate and crop models, satellite-based earth observations, and socioeconomic data sets to predict and monitor droughts and food shortages among the world's most vulnerable populations. Through partnerships with USAID, USGS, and FEWS NET, the CHC provides early warning to save lives and secure livelihoods",
    },
    {
      term: "CANESM5",
      definition:
        "The Canadian Earth System Model version 5 (CanESM5) is a global model developed to simulate historical climate change and variability, to make centennial-scale projections of future climate, and to produce initialized seasonal and decadal predictions. This paper describes the model components and their coupling, as well as various aspects of model development, including tuning, optimization, and a reproducibility strategy",
    },
    {
      term: "CNRM",
      definition:
        "The National Center for Meteorological Research (CNRM) is a Joint Research Unit (UMR 3589) formed by the CNRS and Météo-France. Until the end of 2015, the UMR was also called the Meteorological Atmosphere Study Group.The CNRM is responsible for a large part of the research activities of the Public Administrative Establishment Météo-France, the national meteorological and climatic service",
    },
    {
      term: "CERFACS",
      definition: "Centre Européen de Recherche et Formation Avancée en Calcul Scientifique (CERFACS) is a European Center in Research and Advanced Training on Scientific Computing",
    },
    {
      term: "CNRM-CM6-1",
      definition: "CNRM-CM6-1 is the climate model developped by the CNRM/CERFACS modelling group for CMIP6. It is the successor of the CNRM-CM5.1 climate model that participates to CMIP5",
    },
    {
      term: "CNRM-ESM-1",
      definition: "",
    },
    {
      term: "Crop insurance",
      definition:
        "Crop insurance service refers to the provision of insurance coverage to farmers against losses incurred due to crop failure, damage, or yield reductions caused by weather-related events such as droughts, floods, storms, and pests",
    },
    {
      term: "Commodity specific analysis",
      definition: "",
    },
    {
      term: "Cold stress",
      definition: "",
    },
    {
      term: "Cold stress during flowering",
      definition: "",
    },
    {
      term: "Cold stress in reproductive stage",
      definition: "",
    },
    {
      term: "Cyclone",
      definition: "",
    },
    {
      term: "Cropped area",
      definition: "",
    },
    {
      term: "Control of ectoparasites and other vectors",
      definition: "Physical and chemical controls of ectoparasites and other vectors"
    }
    /*{
      term: "Chickpea",
      definition: "Here the analysis is done only for winter season"
    },
    {
      term: "Cotton",
      definition: "Cotton is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif' in India)."
    },
    {
      term: "Cattle",
      definition: "The analysis is done for milk production"
    }*/
  ],
  D: [
    {
      term: "District level",
      definition: "Visualisation is at district scale",
    },
    {
      term: "Direct seeded rice - dry",
      definition: "",
    },
    {
      term: "Direct seeded rice - wet",
      definition: "",
    },
    {
      term: "Days of frost",
      definition: "",
    },
    {
      term: "Delayed monsoon",
      definition: "",
    },
    {
      term: "Dry spell",
      definition: "",
    },
    {
      term: "Deworming",
      definition: "Control of endoparasites"
    }
  ],
  E: [
    {
      term: "Ensemble",
      definition: "",
    },
    {
      term: "Early sowing/changing planting dates",
      definition: "A tactical farming practice to synchronize crop planting with the optimal climatic conditions essential for key growth stages of crop",
    },
    {
      term: "Economic development indicator",
      definition: "Socio-economic development indicator represented by the Human Development Index from https://www.mosaiks.org/hdi",
    },
    {
      term: "Economic viability",
      definition: "Economic viability is determined through profitability using benefit-cost ratios",
    },
    {
      term: "Excess rainfall",
      definition: "",
    },
    {
      term: "Excess rainfall and waterlogging",
      definition: "",
    },
    {
      term: "Exposure index",
      definition: "",
    },
    {
      term: "Estrous confirmation and synchronisation",
      definition: "A process that uses hormones to bring female mammals into heat at a predetermined time"
    }
  ],
  F: [
    {
      term: "Flood",
      definition: "",
    },
    {
      term: "Feed/fodder",
      definition: "",
    },
    {
      term: "Feed additive, antioxidants, vitamins and probiotics",
      definition: "For cattle’s health and nutritional needs during climatic stress period"
    },
    {
      term: "Fodder conservation",
      definition: "Preserving fodder to meet the demand during climatic stress period"
    }
    /*{
      term: "Finger millet",
      definition: "Finger Millet is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif')"
    }*/
  ],
  G: [
    {
      term: "Gender suitability",
      definition: "It refers to the degree of suitability of each adaptation option to women farmers",
    },
    /*{
      term: "Groundnut",
      definition: "Groundnut is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif' in India) and Maha in Sri Lanka."
    },
    {
      term: "Goat",
      definition: "The analysis is done for meat production"
    }*/
  ],
  H: [
    {
      term: "Hazard index",
      definition: "",
    },
    {
      term: "Heating management",
      definition: "",
    },
    {
      term: "Heat stress",
      definition: "",
    },
    {
      term: "Heat stress during boll formation",
      definition: "",
    },
    {
      term: "Heat stress in reproductive stage",
      definition: "",
    },
    {
      term: "High tempearture during flowering",
      definition: "",
    },
    {
      term: "High temperature induced pollen sterility",
      definition: "",
    },
    {
      term: "High temperature induced spikelet sterility",
      definition: "",
    },
  ],
  I: [
    {
      term: "ISIMIP",
      definition:
        "Inter-Sectoral Impact Modal Intercomparison Project (ISIMIP) offers a framework for consistently projecting the impacts of climate change across affected sectors and spatial scales. An international network of climate-impact modellers contribute to a comprehensive and consistent picture of the world under different climate-change scenarios",
    },
    {
      term: "ICT input linked management",
      definition:
        "ICT linked input management technology is a type of modern agricultural management that comprehensively integrates information technology comprised of current data and information requires from crop growth conditions, soil physical and chemical properties, weather factors; weather based forecast products  for agricultural production by quantitative  and timing of application of nutrients, water and other operation management systems in accordance with geographical locations",
    },
    {
      term: "Income",
      definition: "Agricultural gross domestic product data from https://datacatalog.worldbank.org/search/dataset/0061507/Global-Gridded-Agricultural-Gross-Domestic-Product--AgGDP-",
    },
    {
      term: "Irrigation",
      definition: "",
    },
    {
      term: "Inclusion of ad libitum green fodder",
      definition: "Perennial grass, pasture legume, fodder trees, cultivated grasses"
    }
  ],
  J: [
    /*{
      term: "Jute",
      definition: "Jute is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif' in India)."
    }*/
  ],
  K: [],
  L: [
    {
      term: "Lodging",
      definition: "",
    },
    {
      term: "Low temperature induced pollen sterility",
      definition: "",
    },
    {
      term: "Low temperature induced spikelet sterility",
      definition: "",
    },
    {
      term: "Low temperature induced tuberization failure",
      definition: "",
    },
  ],
  M: [
    {
      term: "MIROC6",
      defintion: "",
    },
    /*{
      term: "Maize",
      definition: "Maize is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif') and 'Maha' in Sri Lanka",
    },*/
    {
      term: "Micro-irrigation",
      definition:
        "A low-pressure, low-flow-rate type of irrigation that can reduce the likelihood of overwatering a landscape. Drip irrigation or trickle irrigation is an irrigation method that allows water to drip slowly to the roots of plants, either onto the soil surface or directly onto the root zone, through a network of valves, pipes, tubing, and emitters",
    },
    {
      term: "Microclimate modification shelter",
      definition: "Modify shelter, ventilation, adjusting roof heights",
    },
    {
      term: "Modification of shelter",
      definition: "Appropriate shelter to protect animals from natural hazards",
    },
    {
      term: "Mechanical cooling",
      definition: "Cooling using misting, fogging, sprinklers, fans, exhaust",
    },
    {
      term: "Mineral mixture supplementation",
      definition: "Blend of essential minerals to correct mineral deficiencies and improve productivity",
    },
    {
      term: "Modification in feeding pattern, schedule, grazing",
      definition: "Adjust feeding times and grazing patterns to minimize heat stress"
    }
  ],
  N: [
    {
      term: "Number of animals per grid",
      definition: "Number of animals per grid from https://data.amerigeoss.org/dataset/9d1e149b-d63f-4213-978b-317a8eb42d02",
    },
  ],
  O: [
    /*{
      term: "Onion",
      definition: "Onion is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif' in India) and Maha in Sri Lanka."
    }*/
  ],
  P: [
    {
      term: "Productivity",
      definition: "",
    },
    {
      term: "Planting technology",
      definition: "",
    },
    {
      term: "Precision land leveling",
      definition:
        "Precision Land Levelling (PLL) is a farming technique that involves the mechanical process of grading and smoothing land to achieve a uniform and precise. It may employ advanced laser-guided equipment to precisely contour the land surface, creating a uniform smooth surface (± 2 cm from its average elevation) and eliminating undulations that ensures every inch of your field gets the water it needs",
    },
    {
      term: "Precision water management",
      definition:
        "Precision water management technology is a new type of irrigation management that comprehensively integrates information technology (sensor based) included of data and information requires from crop growth conditions, soil physical and chemical properties, weather factors and agricultural production by positioning, timing, and quantitative application of water and operation management systems in accordance with spatial variation of the field",
    },
    {
      term: "Precision fertilizer management",
      definition:
        "Precision fertilization management technology is a new type of agriculture that comprehensively integrates information technology and agricultural production by positioning, timing, and quantitative application of fertilizer management and operation systems in accordance with spatial variation of the field",
    },
    {
      term: "Pixel level",
      definition: "Visualisation is at 0.05 degree x 0.05 degree",
    },
    {
      term: "Planting of trees",
      definition: "Provide a way for shade, food, and a way to increase the production",
    },
    /*{
      term: "Pearl millet",
      definition: "Pearl Millet is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif')"
    },
    {
      term: "Pigeonpea",
      definition: "The analysis for pigeonpea is conducted exclusively for the monsoon season, as this period plays a vital role in its growth cycle. Pigeonpea, being a rainfed crop, heavily relies on the monsoon rains for optimal development"
    },
    {
      term: "Potato",
      definition: "Analysis done for Rabi/winter season or Maha season."
    },
    {
      term: "Pig",
      definition: "The analysis is done for meat production"
    },
    {
      term: "Chicken",
      definition: "Chicken refers to chicken and analysis is done for meat production"
    }*/
  ],
  Q: [],
  R: [
    {
      term: "Regional analysis",
      definition: "",
    },
    {
      term: "Rural infrastructure",
      definition: "Rural infrastucture is proxied by nighlight luminosity data from source",
    },
    {
      term: "Rainfall deficit",
      definition: "",
    },
    {
      term: "Rainfall deficit index",
      definition: "",
    },
    {
      term: "Risk index",
      definition: "",
    },
    /*{
      term: "Rice",
      definition:
        "Rice is planted in multiple seasons in different countries. Here this analysis is only for monsoon season (also known as 'Kharif' in India, 'Aman' in Bangladesh,and 'Maha' in Sri Lanka)",
    }, 
    {
      term: "Rapeseed/Mustard",
      definition: "Here this analysis is done only for winter season"
    }*/
  ],
  S: [
    {
      term: "SSP 2-4.5",
      definition: "Shared Socioeconomic Pathways",
    },
    {
      term: "SSP 5-8.5",
      definition: "Shared Socioeconomic Pathways",
    },
    {
      term: "Stress-tolerant varieties",
      definition:
        "Cultivars specifically bred or selected to tolerate or adapt to the changing climatic conditions. These varieties possess traits that enable them to withstand heat stress, drought, floods, and other environmental stresses",
    },
    {
      term: "System of Rice Intensification (SRI)",
      definition: "SRI involves transplanting young rice seedlings at wider spacing, intermittent irrigation, and organic soil enrichment to promote sustainable and efficient farming practices",
    },
    {
      term: "Supplemental irrigation",
      definition:
        "Addition of limited amount of water to plants under insufficient water supply by rainfall to overcome the adverse effects of drought, when rainfall fails to provide sufficient moisture for normal plant growth",
    },
    {
      term: "Scalability",
      definition: "Scalability is indicated by using a composite indicator of credit availability, input access, social network, education, and information access",
    },
    {
      term: "Smart fertilizer management",
      definition:
        "Fertilizer to be adjusted to meet the nutrient demands of crop growth and avoid nutrient loss when crop biomass decreases due to water and temperature stress over time under climate change",
    },
    /*{
      term: "Sorghum",
      definition: "Sorghum is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif')",
    },
    {
      term: "Soybean",
      definition: "Soybean is planted in multiple seasons in different countries. Here this analysis is for monsoon season (also known as 'Kharif') and Maha in Sri Lanka."
    },
    {
      term: "Sheep",
      definition: "The analysis is done for meat production"
    }*/
  ],
  T: [
    {
      term: "Temperature-humidity index",
      definition: "",
    },
    {
      term: "Terminal heat",
      definition: "",
    },
  ],
  U: [
    {
      term: "Untimely rainfall",
      definition: "",
    },
  ],
  V: [
    {
      term: "Vulnerability index",
      definition: "",
    },
    {
      term: "Vaccination",
      definition: "Vaccination against contagious diseases as a prophylactic measure"
    }
  ],
  W: [
    {
      term: "Wallowing",
      definition: "",
    },
    /*{
      term: "Wheat",
      definition: "The analysis for wheat (except for Afghanistan) is done for Rabi/winter season with planting time around mid-November. For Afghanistan, wheat season starts around April.",
    },*/
  ],
  X: [],
  Y: [],
  Z: [
    {
      term: "Zero tillage with residue",
      definition:
        "Zero-Till, also known as no-till or direct seed/drilling, farming method where crops are planted directly into untilled soil, without/minimal disturbing the soil structure, with or without residue retention. With irrigation facilities available, non-puddled transplanted rice can be cultivated in wet as well as dry season depending on the choice of crop rotation",
    },
  ],
};

export default function Glossary() {
  const [selectedLetter, setSelectedLetter] = React.useState(""); // Default to show all terms
  const [searchTerm, setSearchTerm] = React.useState("");

  const Ref = React.useRef(null);

  const filteredTerms =
    glossaryData[selectedLetter]?.filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase())) ||
    Object.values(glossaryData)
      .flat()
      .filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase()));

  // Sort filtered terms alphabetically
  const sortedFilteredTerms = filteredTerms.sort((a, b) => a.term.localeCompare(b.term));

  React.useEffect(() => {
    const term = new URLSearchParams(window.location.hash.replace("#", "?")).get("term");

    if (term) {
      // Find the term in the glossary and scroll into view
      const termElement = Ref.current.querySelector(`[data-term="${term}"]`);
      if (termElement) {
        const yOffset = -110;
        const y = termElement.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [filteredTerms]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        padding: 3,
      }}
    >
      {/* Left Side - Alphabet & Glossary List */}
      <Box
        sx={(theme) => ({
          position: "sticky",
          left: 0,
          top: 175,
          width: "27%",
          height: "100vh",
          padding: 3,
          backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "#f9f9f9",
          borderRadius: 2,
          boxShadow: theme.palette.mode === "dark" ? "2px 0px 10px rgba(0,0,0,0.3)" : "2px 0px 10px rgba(0,0,0,0.1)",
        })}
      >
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          sx={(theme) => ({
            "marginBottom": 2,
            "& .MuiOutlinedInput-root": {
              "backgroundColor": theme.palette.mode === "dark" ? theme.palette.background.paper : "white",
              "borderRadius": 1,
              "& fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#666" : "#ccc",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#81c784" : "#4ba046",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#81c784" : "#4ba046",
                borderWidth: 2,
              },
            },
          })}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Alphabet Buttons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            marginBottom: 2,
            justifyContent: "center",
          }}
        >
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "contained" : "outlined"}
              onClick={() => setSelectedLetter(selectedLetter === letter ? "" : letter)}
              sx={(theme) => ({
                "width": "min(8vw, 40px)",
                "height": "min(8vw, 40px)",
                "minWidth": "min(8vw, 40px)",
                "fontSize": "1rem",
                "fontWeight": "bold",
                "textTransform": "none",
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "transition": "0.2s",

                "color": selectedLetter === letter ? (theme.palette.mode === "dark" ? theme.palette.text.primary : "white") : theme.palette.mode === "dark" ? "#aaa" : "#666",

                "borderColor": selectedLetter === letter ? (theme.palette.mode === "dark" ? theme.palette.text.primary : "white") : theme.palette.mode === "dark" ? "#555" : "#999",

                "backgroundColor": selectedLetter === letter ? (theme.palette.mode === "dark" ? "#3b8c3b" : "#4ba046") : "transparent",

                "&:hover": {
                  backgroundColor: selectedLetter === letter ? (theme.palette.mode === "dark" ? "#3b8c3b" : "#4ba046") : theme.palette.mode === "dark" ? "#333" : "#e0e0e0",

                  borderColor: selectedLetter === letter ? (theme.palette.mode === "dark" ? theme.palette.text.primary : "white") : theme.palette.mode === "dark" ? "#666" : "#999",
                },
              })}
            >
              {letter}
            </Button>
          ))}
        </Box>

        {/* Glossary List */}
        <Paper
          sx={(theme) => ({
            "padding": 3,
            "marginTop": 3,
            "maxHeight": "65vh",
            "overflowY": "auto",
            "borderRadius": 2,
            "boxShadow": "0 4px 10px rgba(0, 0, 0, 0.1)",
            "scrollPaddingBottom": "60px",

            "backgroundColor":
              theme.palette.mode === "dark"
                ? theme.palette.background.paper // Dark mode background
                : "#fafafa", // Light mode background

            "scrollbarWidth": "thin",
            "msOverflowStyle": "none",

            "&::-webkit-scrollbar": {
              width: "10px",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.mode === "dark" ? "#4ba046" : "#8BC34A",
              borderRadius: "10px",
              transition: "background-color 0.3s ease",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "#3d8b3d" : "#7CB342",
            },

            "&::-webkit-scrollbar-track": {
              background: theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
              borderRadius: "10px",
            },
          })}
        >
          {Object.entries(glossaryData).map(([letter, terms]) => {
            // Sort terms alphabetically within each letter group
            const sortedTerms = terms.sort((a, b) => a.term.localeCompare(b.term));

            const filteredTerms = sortedTerms.filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase()));

            if ((selectedLetter && letter !== selectedLetter) || filteredTerms.length === 0) {
              return null;
            }

            return (
              <Box key={letter} sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h6"
                  align="left"
                  sx={(theme) => ({
                    fontWeight: "bold",
                    color: theme.palette.mode === "dark" ? theme.palette.primary.main : "#4ba046",
                    marginBottom: 1,
                    fontSize: "1rem", // Set to a smaller font size for a cleaner look
                  })}
                >
                  {letter}
                </Typography>
                {filteredTerms.map((item, index) => (
                  <Typography
                    key={index}
                    id={item.term.toLowerCase()}
                    align="left"
                    sx={(theme) => ({
                      marginLeft: 2,
                      color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#333",
                      fontSize: "0.95rem",
                    })}
                  >
                    {item.term}
                  </Typography>
                ))}
              </Box>
            );
          })}

          {/* No results found message */}
          {Object.values(glossaryData)
            .flat()
            .filter((item) => item.term.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
            <Typography sx={(theme) => ({ textAlign: "center", color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#777" })}>No results found.</Typography>
          )}
        </Paper>
      </Box>

      {/* Right Side - Glossary Descriptions */}
      <Box
        ref={Ref}
        sx={{
          marginLeft: "1%", // Offset the fixed left section
          width: "67%", // Take remaining width
          paddingBottom: "100px", // Ensure space for footer
        }}
      >
        {console.log("Number of terms displayed:", sortedFilteredTerms.length)}
        {sortedFilteredTerms.length > 0 ? (
          sortedFilteredTerms.map((item, index) => (
            <Box
              key={index}
              sx={(theme) => ({
                padding: 2,
                borderLeft: `4px solid ${theme.palette.mode === "dark" ? theme.palette.primary.main : "#4ba046"}`,
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "white",
                borderRadius: 1,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)",
                marginBottom: 3,
              })}
              data-term={item.term.toLowerCase()}
            >
              <Typography variant="h6" align="left" sx={(theme) => ({ fontWeight: "bold", color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#333" })}>
                {item.term}
              </Typography>
              <Typography
                variant="body1"
                align="left"
                sx={(theme) => ({
                  color: theme.palette.mode === "dark" ? theme.palette.text.secondary : "#555",
                  marginTop: 1,
                })}
              >
                {(item.definition || "").split(" ").map((word, i) =>
                  word.startsWith("http") ? (
                    <Link key={i} href={word} target="_blank" rel="noopener noreferrer" sx={(theme) => ({ color: theme.palette.text.secondary, textDecoration: "underline" })}>
                      {word}
                    </Link>
                  ) : (
                    word + " "
                  )
                )}
              </Typography>

              {item.image ? <img src={`/${item.image}`} alt={item.term} style={{ width: "5rem", height: "auto" }} /> : null}
            </Box>
          ))
        ) : (
          <Typography variant="body1" sx={(theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.text.disabled : "#777" })}>
            No definitions found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
