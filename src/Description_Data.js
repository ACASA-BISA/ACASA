import * as React from "react";
import { Paper, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Mapping of adaptation options to codes
const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residues':'ZTILL','Broad Bed and Furrow':'BBFIB',
  'Direct Seeded Rice - Dry':'DSDRY','Direct Seeded Rice - Wet':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
  'Precision Fertilizer Management':'PNMLT','Precision Fertilizer Management - High tech':'PNMHT','Deep Placement of Urea':'DR',
  'ICT linked Input Management':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
  'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate Wetting and Drying':'AWD','Fertilizer rating and timing':'FRT',
  'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};

// Mapping of hazard names to descriptions
const hazardname = {
  "District Level": "District Level",
  "Downscaled Risk": "Downscaled Risk",
  "Risk Index": "Risk Index",
  "Hazard Index": "Hazard Index",
  "Low temperature induced spikelet sterility":
    "Low temperature induced spikelet sterility",
  "Low temperature induced pollen sterility":
    "Low temperature induced pollen sterility",
  "High temperature induced pollen sterility":
    "High temperature induced pollen sterility",
  "Heat Stress": "Heat stress",
  "High temperature induced spikelet sterility":
    "High temperature induced spikelet sterility",
  "Cold Stress": "Cold stress",
  "Low temperature induced tuberization failure":
    "Low temperature induced tuberization failure",
  "Untimely Rainfall": "Untimely rainfall",
  "Terminal Heat": "Terminal heat",
  "Days of Frost": "Days of Frost",
  "Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
  "Delayed Monsoon": "Delayed monsoon",
  "Drought": "Drought",
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
};

// Function to create a data row for the tables
function createData(Crop, Hazard, Method, Source, Action) {
  return { Crop, Hazard, Method, Source, Action };
}

  const rows = [
    createData('Rice','High temperature induced spikelet sterility','High temperature stress leads to spikelet sterility (55 to 65 days after transplanting/upland direct seeded need to be corrected by adding 30 days) where Tday > 37','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Rice','Heat Stress','High temperature stress during entire life cycle where Tmax > 43','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Rice','Low temperature induced spikelet sterility','Low temperature stress leads to spikelet sterility (55 to 65 days after transplanting/upland direct seeded need to be corrected by adding 30 days) where Tmin < 15','https://global-flood-database.cloudtostreet.info/','Download'),
    createData('Rice','Delayed Monsoon','Number of events of delayed monsoon where delay is more than 15 days','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Rice','Drought','SPI below -1 (moderate and severe drought)','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Rice','Dry Spell','Number of dry spells with length of 15 days or more in a season','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Rice','Flood','Flood layer','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Wheat','High temperature induced pollen sterility','High temperature during pollination: Tday > 28 for two days','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Wheat','Terminal Heat','GDD concept (degrees above normal GDD) [tbase=8 degrees] during grain filling','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Wheat','Days of Frost','Minimum temperature less than zero degree for more than three days','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Wheat','Untimely Rainfall','Whole season consecutive two-day rainfall > 100 mm ','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Wheat','Drought','Sept/Oct/Nov and season drought','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Wheat','Lodging','Windspeed and rainfall criteria after booting (85 to 115 days)','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
  ];

// Data for risk table
const rows1 = [
  createData(
    "Rice",
    "Downscaled risk",
    "Analyzed",
    "Crop statistics, crop mask and primary productivity",
    "Download"
  ),
  createData("Rice", "Insurance", "Analyzed", "Heurisitic Model", "Download"),
];

// Data for adaptation table
const rows2 = [
  createData(
    "Rice",
    "DSR (Dry Seed)",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "DSR (Wet Seed)",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "System of Rice Intensification",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Alternate wetting and drying",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Early Sowing",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Zero Tillage with residue",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Precision Land Levelling",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Precision Water Management",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Microirrigation",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Supplemental Irrigation",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Stress Tolerant Variety",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Fertilizer rating and timing",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Low Tech Precision Technology",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "High Tech Precision Technology",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "ICT Agro Advisory",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Crop Insurance",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Wheat",
    "Stress Tolerant Variety",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Wheat",
    "Early Sowing",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Wheat",
    "Zero Tillage with residues",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Wheat",
    "Fertilizer rating and timing",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
];

// Data for direct adaptation table
const rows3 = [
  createData(
    "Rice",
    "Direct seeded rice",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Rice",
    "Precision water management",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Wheat",
    "Stress tolerant variety",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
  createData(
    "Wheat",
    "Early Sowing",
    "Analyzed",
    "Heurisitic Model",
    "Download"
  ),
];

// Main component function
export default function Description() {
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

  return (
    <div>
      <Box sx={{ textAlign: "left", marginLeft: "150px", marginRight: "40px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: "5px",
            color: "#333333",
            fontFamily: "revert",
          }}
        >
          Data Catalogue
        </Typography>
        <Typography
          sx={{
            fontWeight: "normal",
            marginTop: "5px",
            color: "#333333",
            fontFamily: "revert",
          }}
        >
          The datasets are prepared primarily from open source databases. To
          extract each variable standard methodologies applied. All the datasets
          are geo-tiff format and in 0.05 degree resolution (EPSG:4326 - WGS 84,
          Geographic latitude and longitude).
        </Typography>
        <Typography
          sx={{
            fontWeight: "normal",
            marginTop: "8px",
            color: "#333333",
            fontFamily: "revert",
          }}
        >
          The details of the data source and method is described below.
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            marginTop: "7px",
            "td,th": { border: "1px solid rgba(224, 224, 224, 1)" },
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#4b9e44",
                    color: "#ffffff",
                  }}
                >
                  Hazard
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Crop
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Hazard
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Method
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Primary&nbsp;Data&nbsp;Source
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" align="left">
                    {row.Crop}
                  </TableCell>
                  <TableCell align="left">{row.Hazard}</TableCell>
                  <TableCell align="left">{row.Method}</TableCell>
                  <TableCell align="left">
                    <a
                      target="_blank"
                      href={row.Source}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {row.Source}
                    </a>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      disabled={true}
                      onClick={() =>
                        onButtonClick(hazardname[row.Hazard], row.Crop)
                      }
                      style={{ textDecoration: "none", textTransform: "none" }}
                    >
                      {row.Action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* Uncomment this section if you want to include the risk data table */}
            {/* <TableHead sx={{backgroundColor: '#eeeeee'}}>
                            <TableRow>
                                <TableCell colSpan={5} sx={{fontWeight: 'bold', backgroundColor: '#4b9e44', color: '#ffffff'}}>
                                    Risk
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left" sx={{fontWeight: 'bold'}}>Crop</TableCell>
                                <TableCell align="left" sx={{fontWeight: 'bold'}}>Layer</TableCell>
                                <TableCell align="left" sx={{fontWeight: 'bold'}}>Method</TableCell>
                                <TableCell align="left" sx={{fontWeight: 'bold'}}>Primary&nbsp;Source</TableCell>
                                <TableCell align="left" sx={{fontWeight: 'bold'}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows1.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" align="left">
                                        {row.Crop}
                                    </TableCell>
                                    <TableCell align="left">{row.Hazard}</TableCell>
                                    <TableCell align="left">{row.Method}</TableCell>
                                    <TableCell align="left">
                                        <a target='_blank' href='javascript:void(0);' style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {row.Source}
                                        </a>
                                    </TableCell>
                                    <TableCell align="left">
                                        <a href='javascript:void(0);' style={{ textDecoration: 'none' }}>
                                            {row.Action}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody> */}

            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#4b9e44",
                    color: "#ffffff",
                  }}
                >
                  Adaptation
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Crop
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Layer
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Method
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Primary&nbsp;Source
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" align="left">
                    {row.Crop}
                  </TableCell>
                  <TableCell align="left">{row.Hazard}</TableCell>
                  <TableCell align="left">{row.Method}</TableCell>
                  <TableCell align="left">
                    <a
                      target="_blank"
                      href="javascript:void(0);"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {row.Source}
                    </a>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      disabled={true}
                      onClick={() =>
                        onButtonClickOpt(optcode[row.Hazard], row.Crop)
                      }
                      style={{ textDecoration: "none", textTransform: "none" }}
                    >
                      {row.Action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}