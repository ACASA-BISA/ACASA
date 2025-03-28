import * as React from "react";
import { Paper, Button, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, TextField, InputAdornment, Menu, ListSubheader } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

// Importing the DataCatalog function to create card components
import { DataCatalog } from "./Data_Catalog/Data_Catalog";
// Import JSZip as grouped downloads require zipping
import JSZip from "jszip";
import { create } from "ol/transform";
import { disable } from "ol/rotationconstraint";

// Mapping for different layer types
const layerMappings = {
  // Mapping of adaptation MenuItems to codes
  optcode: {
    "Stress tolerant variety": "ADVAR",
    "Early sowing/changing planting dates": "ADPTI",
    "Precision land levelling": "LASLV",
    "Zero tillage with residue retention": "ZTILL",
    "Broadbed and furrow": "BBFIB",
    "Dry - Direct seeded rice": "DSDRY",
    "Wet - Direct seeded rice": "DSWET",
    "System of rice intensification": "SRIUT",
    "Supplemental irrigation (water harvesting structures/farm ponds)": "WHSRC",
    "Microirrigation": "MICIR",
    "Precision water management": "PWMGT",
    "Precision fertilizer management": "PNMLT",
    "Precision fertilizer management - High tech": "PNMHT",
    "Deep Placement of Urea": "DR",
    "ICT linked input management": "WEAGA",
    "Crop insurance": "INSUR",
    "Land Management": "LMGT",
    "Feed Management": "FMGT",
    "Herd Management": "HMGT",
    "Animal Health": "ANHLT",
    "Animal Productivity": "ANPRO",
    "Mulching": "MULCH",
    "Alternate wetting and drying": "AWD",
    "Smart fertilizer management": "FRT",
    "Manure Management": "MNMGT",
    "Information Use": "INFO",
    "Heat Stress Management": "HSMGT",
  },

  // Mapping of hazard names to descriptions
  hazardname: {
    "District Level": "District Level",
    "Downscaled Risk": "Downscaled Risk",
    "Risk Index": "Risk Index",
    "Hazard Index": "Hazard Index",
    "Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
    "Low temperature induced pollen sterility": "Low temperature induced pollen sterility",
    "High temperature induced pollen sterility": "High temperature induced pollen sterility",
    "Heat Stress": "Heat stress",
    "High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
    "Cold Stress": "Cold stress",
    "Low temperature induced tuberization failure": "Low temperature induced tuberization failure",
    "Untimely Rainfall": "Untimely rainfall",
    "Terminal Heat": "Terminal heat",
    "Days of Frost": "Days of Frost",
    "Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
    "Delayed Monsoon": "Delayed monsoon",
    "Crop water deficit index": "Crop water deficit index",
    "Dry Spell": "Number of dry spells",
    "Flood": "Flood",
    "Lodging": "Rain and wind causing lodging",
    "Biotic": "High humidity and temperature for blight",
    "Irrigation": "Irrigation",
    "Water Holding": "Water Holding",
    "Income": "Income",
    "Access to Credit": "Access to Credit",
    "Access to Market": "Access to Market",
    "Elevation": "Elevation",
    "Access to Knowledge": "Access to Knowledge",
    "Exposure Index": "Exposure Index",
    "Number of Farmers": "Number of Farmers",
    "Cropped Area": "Cropped Area",
    "Excess Rainfall": "Excess rainfall",
    "Cold stress in reproductive stage": "Cold stress in reproductive stage",
    "Heat stress in reproductive stage": "Heat stress in reproductive stage",
    "Heat stress during boll formation": "Heat stress during boll formation",
    "Cold stress during flowering": "Cold stress during flowering",
    "High tempearture during flowering": "High tempearture during flowering",
    "Biotic Stress": "Biotic stress",
  },
};

//Function to create a data row for the tables
function createData(Commodity, Scenario, LayerType, Title, Description, Source, Action) {
  return { Commodity, Scenario, LayerType, Title, Description, Source, Action };
}

// Hazard data
const data = [
  // Hazard data
  /*createData(
    "Rice",
    "Baseline",
    "Hazard",
    "High temperature induced spikelet sterility",
    "High temperature stress leads to spikelet sterility (55 to 65 days after transplanting/upland direct seeded need to be corrected by adding 30 days) where Tday > 37",
    "http://data.chc.ucsb.edu/products/CHIRTSdaily/",
    "Download"
  ),
  createData("Rice", "Baseline", "Hazard", "Heat Stress", "High temperature stress during entire life cycle where Tmax > 43", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  createData(
    "Rice",
    "Baseline",
    "Hazard",
    "Low temperature induced spikelet sterility",
    "Low temperature stress leads to spikelet sterility (55 to 65 days after transplanting/upland direct seeded need to be corrected by adding 30 days) where Tmin < 15",
    "https://global-flood-database.cloudtostreet.info/",
    "Download"
  ),*/
  createData("Rice", "Baseline", "Hazard", "Delayed Monsoon", "Number of events of delayed monsoon where delay is more than 15 days", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  createData("Rice", "Baseline", "Hazard", "Crop water deficit index", "SPI below -1 (moderate and severe drought)", "http://data.chc.ucsb.edu/products/CHIRTSdaily/", "Download"),
  createData("Rice", "Baseline", "Hazard", "Dry Spell", "Number of dry spells with length of 15 days or more in a season", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  /*createData("Rice", "Baseline", "Hazard", "Flood", "Flood layer", "https://www.chc.ucsb.edu/data/chirps", "Download"),*/
  createData(
    "Wheat",
    "Baseline",
    "Hazard",
    "High temperature induced pollen sterility",
    "High temperature during pollination: Tday > 28 for two days",
    "http://data.chc.ucsb.edu/products/CHIRTSdaily/",
    "Download"
  ),
  createData(
    "Wheat",
    "Baseline",
    "Hazard",
    "Terminal Heat",
    "GDD concept (degrees above normal GDD) [tbase=8 degrees] during grain filling",
    "http://data.chc.ucsb.edu/products/CHIRTSdaily/",
    "Download"
  ),
  createData("Wheat", "Baseline", "Hazard", "Days of Frost", "Minimum temperature less than zero degree for more than three days", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  createData("Wheat", "Baseline", "Hazard", "Untimely Rainfall", "Whole season consecutive two-day rainfall > 100 mm ", "https://www.chc.ucsb.edu/data/chirps", "Download"),
  createData("Wheat", "Baseline", "Hazard", "Crop water deficit index", "Sept/Oct/Nov and season drought", "http://data.chc.ucsb.edu/products/CHIRTSdaily/", "Download"),
  createData("Wheat", "Baseline", "Hazard", "Lodging", "Windspeed and rainfall criteria after booting (85 to 115 days)", "http://data.chc.ucsb.edu/products/CHIRTSdaily/", "Download"),
  /*createData("Pig", "Baseline", "Hazard", "Temperature-Humidity Index (THI)", "The average number of days when THI exceeds a threshold (79)", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Heat wave", "Sudden change in temperature by 4°C (during APR to June/July)", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Cold stress", "Lower critical temperature (LCT)  limit for the thermoneutral zone goes below (15) degrees C", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Extreme rainfall days", "The average number of days when daily rainfall exceeds 115 mm", "", "Download"),
  createData("Pig", "Baseline", "Hazard", "Rainfall deficit", "Meteorological drought in any area occurs when the rainfall deficiency is more than 26% of its long-term average", "", "Download"),
  createData(
    "Pig",
    "Baseline",
    "Hazard",
    "Cyclone proneness",
    "This layer represents the cyclone hazard in terms of classes, with one denoting low hazard and 5 denoting very high hazard. These classes were developed using the cyclone-prone district information for India sourced from the NDMA report and Abdul Awal 2015 for Bangladesh",
    "",
    "Download"
  ),
  createData(
    "Pig",
    "Baseline",
    "Hazard",
    "Flood events",
    "We used flood event data from the Global Flood Database, documented by the Dartmouth Flood Observatory (DFO) from 2000 to 2018. We computed the average annual count of flood events per pixel to represent the flood hazard",
    "",
    "Download"
  ),*/

  // Risk data
  createData("Rice", "Baseline", "Risk", "Downscaled risk", "Analyzed", "Crop statistics, crop mask and primary productivity", "Download"),
  createData("Rice", "Baseline", "Risk", "Insurance", "Analyzed", "Heurisitic Model", "Download"),

  // Adaptation data
  createData("Rice", "Baseline", "Adaptation", "DSR (Dry Seed)", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "DSR (Wet Seed)", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "System of rice intensification", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Alternate wetting and drying", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Early sowing/changing planting dates", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Zero Tillage with residue", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Precision land levelling", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Precision water management", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Microirrigation", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Supplemental irrigation (water harvesting structures/farm ponds)", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Stress tolerant variety", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Smart fertilizer management", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Low Tech Precision Technology", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "High Tech Precision Technology", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "ICT Agro Advisory", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Adaptation", "Crop insurance", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Stress tolerant variety", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Early sowing/changing planting dates", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Zero tillage with residue retention", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Adaptation", "Smart fertilizer management", "Analyzed", "Heurisitic Model", "Download"),

  // Direct Adaptation data
  /*createData("Rice", "Baseline", "Direct Adaptation", "Direct seeded rice", "Analyzed", "Heurisitic Model", "Download"),
  createData("Rice", "Baseline", "Direct Adaptation", "Precision water management", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Direct Adaptation", "Stress tolerant variety", "Analyzed", "Heurisitic Model", "Download"),
  createData("Wheat", "Baseline", "Direct Adaptation", "Early sowing/changing planting dates", "Analyzed", "Heurisitic Model", "Download"),*/
];

// Main component function
export default function Description() {
  {
    /* The download logic initially was available as two separate functions 

  // Function to handle button clicks for hazard data download
  function onButtonClick(haz, crp) {
    const urlstr = "./Downloadables/" + crp + "/" + haz + ".tif";
    // Fetching the TIFF file from the server
    fetch(urlstr).then((response) => {
      response.blob().then((blob) => {
        // Creating a URL for the blob
        const fileURL = window.URL.createObjectURL(blob);
        // Creating a link element and simulating a click to download the file
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = crp + "_" + haz + ".tif";
        alink.click();
      });
    });
  }

  // Function to handle button clicks for adaptation data download
  function onButtonClickOpt(opt, crp) {
    const urlstr =
      "./Downloadables/" + crp + "/Suitability_" + crp + "_" + opt + ".tif";
    // Fetching the TIFF file from the server
    fetch(urlstr).then((response) => {
      response.blob().then((blob) => {
        // Creating a URL for the blob
        const fileURL = window.URL.createObjectURL(blob);
        // Creating a link element and simulating a click to download the file
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = crp + "_" + opt + ".tif";
        alink.click();
      });
    });
  }
    */
  }

  // Filter logic
  const [selectedCommodity, setSelectedCommodity] = React.useState("");
  const [selectedScenario, setSelectedScenario] = React.useState("");
  const [selectedLayerType, setSelectedLayerType] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = (data || []).filter((item) => {
    const matchesCommodity = selectedCommodity ? item.Commodity === selectedCommodity : true;
    const matchesScenario = selectedScenario ? item.Scenario === selectedScenario : true;
    const matchesLayerType = selectedLayerType ? item.LayerType === selectedLayerType : true;
    const matchesSearchTerm = searchTerm ? item.Title?.toLowerCase().includes(searchTerm.toLowerCase()) || item.Description?.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCommodity && matchesScenario && matchesLayerType && matchesSearchTerm;
  });

  const [totalFileSize, setTotalFileSize] = React.useState(0);

  // Function to calculate total file size before downloading
  function calculateTotalSize(filePaths) {
    let totalSize = 0;
    let failed = false;

    const fetchPromises = filePaths.map((filePath) =>
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${filePath}`);
          }
          return response.blob();
        })
        .then((blob) => {
          totalSize += blob.size;
        })
        .catch((err) => {
          console.error("Error fetching file:", err);
          failed = true;
        })
    );

    Promise.all(fetchPromises).then(() => {
      if (failed) {
        console.error("One or more files failed to fetch.");
        return;
      }
      setTotalFileSize(totalSize);
    });
  }

  // Function to download files dynamically and zip them (only for grouped downloads)
  function downloadZippedFiles(filePaths, fileNames, zipFileName) {
    const zip = new JSZip();

    // Create an array of promises for fetching files
    const fetchPromises = filePaths.map((filePath, index) =>
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${filePath}`);
          }
          return response.blob();
        })
        .then((blob) => {
          zip.file(fileNames[index], blob); // Add the fetched file to the zip
        })
        .catch((err) => {
          console.error("Error fetching file:", err);
        })
    );

    // Wait for all fetch requests to complete
    Promise.all(fetchPromises)
      .then(() => {
        // Generate the zip file and trigger the download
        return zip.generateAsync({ type: "blob" });
      })
      .then((content) => {
        const fileURL = window.URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = zipFileName;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating zip file:", err);
      });
  }

  // Get unique values from the data array
  const getUniqueValues = (key) => [...new Set(data.map((item) => item[key]))];

  // Generate file paths dynamically (with dynamic file names)
  function getFilePathsAndNames(filters) {
    const filePaths = [];
    const fileNames = [];

    // Generate file paths and names dynamically based on filtered data
    filteredData.forEach((item) => {
      // Resolve file name based on layer type mapping
      let resolvedTitle;
      if (item.LayerType === "Adaptation" && layerMappings.optcode[item.Title]) {
        resolvedTitle = layerMappings.optcode[item.Title]; // Adaptation code
      } else if (item.LayerType === "Hazard" && layerMappings.hazardname[item.Title]) {
        resolvedTitle = layerMappings.hazardname[item.Title]; // Hazard description
      } else {
        resolvedTitle = item.Title; // Default to Title if no mapping exists
      }

      // Construct file path and name
      const filePath = `./Downloadables/${item.Commodity}/${item.Scenario}/${item.LayerType}/${resolvedTitle}.tif`;
      const fileName = `${item.Commodity}_${item.Scenario}_${item.LayerType}_${resolvedTitle}.tif`;

      filePaths.push(filePath);
      fileNames.push(fileName);
    });

    return { filePaths, fileNames };
  }

  // Handle grouped download (with mapping logic)
  function handleGroupedDownload() {
    const { filePaths, fileNames } = getFilePathsAndNames();

    if (filePaths.length === 0) {
      console.warn("No files found for the selected filters.");
      return;
    }

    const zipFileName = `${selectedCommodity}_${selectedScenario}_${selectedLayerType}.zip`;

    downloadZippedFiles(filePaths, fileNames, zipFileName);
  }

  // Handle individual download (with mapping logic)
  function handleIndividualDownload(item) {
    // Resolve file name using mapping
    let resolvedTitle;
    if (item.LayerType === "Adaptation" && layerMappings.optcode[item.Title]) {
      resolvedTitle = layerMappings.optcode[item.Title];
    } else if (item.LayerType === "Hazard" && layerMappings.hazardname[item.Title]) {
      resolvedTitle = layerMappings.hazardname[item.Title];
    } else {
      resolvedTitle = item.Title;
    }

    const filePath = `./Downloadables/${item.Commodity}/${item.Scenario}/${item.LayerType}/${resolvedTitle}.tif`;
    const fileName = `${item.Commodity}_${item.Scenario}_${item.LayerType}_${resolvedTitle}.tif`;

    // Direct file download
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${filePath}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = fileName;
        link.click();
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
      });
  }

  // Utility function to format file size
  function formatFileSize(size) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  //The page structure
  return (
    <div>
      <Paper sx={{ backgroundColor: (theme) => theme.palette.background.paper, paddingTop: "5px" }}>
        <Box sx={{ textAlign: "left", marginLeft: "150px", marginRight: "40px" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "5px",
              color: (theme) => (theme.palette.mode === "light" ? "#333333" : "#ffffff"),
              /*fontFamily: "revert",*/
            }}
          >
            Data Catalogue
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              marginTop: "5px",
              color: (theme) => (theme.palette.mode === "light" ? "#333333" : "#ffffff"),
              /*fontFamily: "revert",*/
            }}
          >
            The datasets are prepared primarily from open source databases. To extract each variable standard methodologies applied. All the datasets are geo-tiff format and in 0.05 degree resolution
            (EPSG:4326 - WGS 84, Geographic latitude and longitude).
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              marginTop: "8px",
              color: (theme) => (theme.palette.mode === "light" ? "#333333" : "#ffffff"),
              /*fontFamily: "revert",*/
            }}
          >
            The details of the data source and method is described below.
          </Typography>

          <div className="filter-container">
            <div className="card-filters">
              <FormControl
                sx={(theme) => ({
                  "minWidth": 130,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#ccc" : "#666",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#fff" : "#666",
                  },
                })}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Commodity</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedCommodity}
                  onChange={(e) => {
                    setSelectedCommodity(e.target.value);
                    setSelectedScenario(""); // Resets the scenario
                    setSelectedLayerType(""); // Resets the layer type
                  }}
                  label="Commodity"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  <ListSubheader>Cereals</ListSubheader>
                  <MenuItem value="Rice">Rice</MenuItem>
                  <MenuItem value="Wheat">Wheat</MenuItem>
                  <MenuItem value="Maize">Maize</MenuItem>
                  <MenuItem value="Barley">Barley</MenuItem>
                  <MenuItem value="Finger Millet">Finger Millet</MenuItem>
                  <MenuItem value="Pearl Millet">Pearl Millet</MenuItem>

                  <ListSubheader>Legumes</ListSubheader>
                  <MenuItem value="Chickpea">Chickpea</MenuItem>
                  <MenuItem value="Pigeonpea">Pigeonpea</MenuItem>
                  <MenuItem value="Black Gram">Black Gram</MenuItem>
                  <MenuItem value="Green Gram">Green Gram</MenuItem>
                  <MenuItem value="Lentil">lentil</MenuItem>

                  <ListSubheader>Oilseeds</ListSubheader>
                  <MenuItem value="Soybean">Soybean</MenuItem>
                  <MenuItem value="Safflower">Safflower</MenuItem>
                  <MenuItem value="Sunflower">Sunflower</MenuItem>
                  <MenuItem value="Mustard">Mustard</MenuItem>
                  <MenuItem value="Sesame">Sesame</MenuItem>
                  <MenuItem value="Groundnut">Groundnut</MenuItem>

                  <ListSubheader>Fruits & Vegetables</ListSubheader>
                  <MenuItem value="Potato">Potato</MenuItem>
                  <MenuItem value="Onion">Onion</MenuItem>
                  <MenuItem value="Tomato">Tomato</MenuItem>
                  <MenuItem value="Chillies">Chillies</MenuItem>
                  <MenuItem value="Mango">Mango</MenuItem>
                  <MenuItem value="Banana">Banana</MenuItem>

                  <ListSubheader>Industrial</ListSubheader>
                  <MenuItem value="Cotton">Cotton</MenuItem>
                  <MenuItem value="Jute">Jute</MenuItem>
                  <MenuItem value="Rubber">Rubber</MenuItem>
                  <MenuItem value="Sugarcane">Sugarcane</MenuItem>
                  <MenuItem value="Tea">Tea</MenuItem>
                  <MenuItem value="Coconut">Coconut</MenuItem>

                  <ListSubheader>Livestock</ListSubheader>
                  <MenuItem value="Cattle">Cattle</MenuItem>
                  <MenuItem value="Buffalo">Buffalo</MenuItem>
                  <MenuItem value="Goat">Goat</MenuItem>
                  <MenuItem value="Sheep">Sheep</MenuItem>
                  <MenuItem value="Pig">Pig</MenuItem>
                  <MenuItem value="Chicken">Chicken</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={(theme) => ({
                  "minWidth": 120,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#ccc" : "#666",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#fff" : "#666",
                  },
                })}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Scenario</InputLabel>
                <Select labelId="demo-select-small-label" id="demo-select-small" value={selectedScenario} onChange={(e) => setSelectedScenario(e.target.value)} label="Scenario">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Baseline">Baseline</MenuItem>
                  <MenuItem value="SSP 2-4.5">SSP 2-4.5</MenuItem>
                  <MenuItem value="SSP 5-8.5">SSP 5-8.5</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={(theme) => ({
                  "minWidth": 120,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#ccc" : "#666",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#fff" : "#666",
                  },
                })}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Layer Type</InputLabel>
                <Select labelId="demo-select-small-label" id="demo-select-small" value={selectedLayerType} onChange={(e) => setSelectedLayerType(e.target.value)} label="Layer Type">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Hazard">Hazard</MenuItem>
                  <MenuItem value="Risk">Risk</MenuItem>
                  <MenuItem value="Adaptation">Adaptation</MenuItem>
                  <MenuItem value="Direct Adaptation">Direct Adaptation</MenuItem>
                  <MenuItem value="Exposure">Exposure</MenuItem>
                  <MenuItem value="Vulnerability">Vulnerability</MenuItem>
                </Select>
              </FormControl>

              <IconButton
                onMouseEnter={() => {
                  const { filePaths } = getFilePathsAndNames();
                  if (filePaths.length > 0) {
                    calculateTotalSize(filePaths);
                  }
                }}
                onClick={handleGroupedDownload}
                className="download-icon-button"
              >
                <DownloadIcon />
                <span className="button-text">
                  <Typography>{totalFileSize === 0 ? "Download Group - Calculating..." : `Download Group - ${formatFileSize(totalFileSize)}`}</Typography>
                </span>
              </IconButton>

              <TextField
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc", // Light border color by default
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc", // Same border on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ccc", // Prevent blue focus outline
                      borderWidth: 1, // Maintain same width on focus
                    },
                  },
                }}
                style={{ width: "100%" }}
                inputProps={{
                  "aria-label": "search", // Accessibility
                }}
              />

              {/* Simple search bar
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />*/}
            </div>
          </div>

          <div className="scrollable-container" style={{ overflowY: "scroll", height: "80vh" }}>
            {filteredData.length > 0 ? (
              <div className="card-grid">
                {filteredData.map((item, index) => (
                  <DataCatalog
                    commodity={item.Commodity}
                    scenario={item.Scenario}
                    layertype={item.LayerType}
                    imgSrc="dataaccess2.png"
                    imgAlt={`${item.Commodity}-${item.Title}`}
                    title={item.Title}
                    description={item.Description}
                    source={item.Source}
                    buttonText={item.Action}
                    onButtonClick={() => handleIndividualDownload(item)}
                  />
                ))}
              </div>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#555",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "#777" }}>
                  No data available for the selected filters
                </Typography>
                <Typography variant="body1" sx={{ color: "#999", marginTop: "8px" }}>
                  Try adjusting your filters or clearing the search term
                </Typography>
              </Box>
            )}
          </div>
        </Box>
      </Paper>
    </div>
  );
}
