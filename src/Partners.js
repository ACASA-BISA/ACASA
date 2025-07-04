import React, { useState } from "react";
import { Box, Typography, Paper, Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const logoStyle3 = {
  width: "auto",
  height: 40,
  margin: "auto",
  marginTop: 48,
};

const partnersData = {
  bangladesh: {
    img: "bangladesh.png",
    name: "Bangladesh",
    menuItems: [
      "Bangladesh Agricultural Research Council (BARC) | Dhaka",
      "Bangladesh Agriculture Research Institute (BARI) | Gazipur",
      "Bangladesh Rice Research Institute (BRRI) | Gazipur",
      "Department of Agricultural Extension (DAE) | Dhaka",
      "Department of Livestock Services (DLS) | Dhaka",
      "Soil Resource Development Institute (SRDI) | Dhaka",
      "Krishi Gobeshona Foundation (KGF) | Dhaka",
      "Bangladesh Bank | Dhaka",
      "BRAC Climate Change Programme | Dhaka",
      "Bangladesh Agricultural University (BAU) | Mymensingh",
      "Bangabandhu Sheikh Mujibur Rahman Agricultural University (BSMRAU) | Gazipur",
    ],
  },
  india: {
    img: "india.png",
    name: "India",
    menuItems: [
      "Indian Council of Agricultural Research (ICAR) | New Delhi, Delhi",
      "ICAR- Central Research Institute for Dryland Agriculture (CRIDA) | Telangana, Hyderabad",
      "ICAR-Indian Agricultural Research Institute (IARI) | New Delhi, Delhi",
      "ICAR-National Dairy Research Institute (NDRI) | Karnal, Haryana",
      "ICAR-National Institute of Abiotic Stress Management (NIASM) | Baramati, Maharashtra",
      "ICAR- Central Institute of Brackishwater Aquaculture (CIBA) | Chennai, Tamil Nadu",
      "ICAR- Indian Institute of Farming Systems Research (IIFSR) | Meerut, Uttar Pradesh",
      "ICAR-Central Rice Research Institute (CRRI) | Cuttack, Odisha",
      "ICAR- National Institute of Agricultural Economics and Policy Research (NIAP) | New Delhi, Delhi",
      "Tamil Nadu Agricultural University (TNAU) | Coimbatore, Tamil Nadu",
    ],
  },
  nepal: {
    img: "nepal.svg",
    name: "Nepal",
    menuItems: [
        "Nepal Agricultural Research Council (NARC) | Kathmandu ", 
        "National Rice Research Program | Dhanusha, Madhesh Province",
        "National Maize Research Program | Bagmati Province",
        "National Wheat Research Program | Rupandehi, Lumbini Province",
        "National Potato Research Center | Lalitpur, Bagmati Province",
        "National Agronomy Research Center | Lalitpur, Bagmati Province",
        "National Agriculture Environment Research Center | Lalitpur, Bagmati Province",
        "Horticulture Research Station | Dailekh, Karnali Province",
        "Directorate of Agriculture Research | Doti, Sudur Paschim Province",
        "Directorate of Agriculture Research | Surkhet, Karnali Province",
        "National Vegetable Development Center | Lalitpur, Bagmati Province",
        "Food Security and Food Tech. Division, Ministry of Agriculture and Livestock Development | Kathmandu, Bagmati Province",
        "Climate Change Management Division, Ministry of Forest and Environment | Kathmandu, Bagmati Province",
        "National Trust for Nature Conservation | Lalitpur, Bagmati Province",
        "National Cattle Research Program | Chitwan, Bagmati Province",
        "National Agriculture Tech and Information Center | Lalitpur, Bagmati Province",
        "National Buffalo Research Center | Sunsari, Koshi Pradesh",
        "NARC - National Animal Nutrition Research Center | Bagamati Province",
        "NARC - National Swine Research Center | Koshi Province ", 
        "NARC - National Animal Breeding Research Center | Bagamati Province",
        "NARC - National Avian Research Center | Madhesh Pradesh ", 
        "NARC - National Pasture and Fodder Research Center | Bagamati Province",     
    ],
  },
  sriLanka: {
    img: "srilanka.png",
    name: "Sri Lanka",
    menuItems: [
        "Natural Resources Management Center (NRMC), Department of Agriculture (DOA) | Peradeniya",
        "Socio-Economic Planning Center |Department of Agriculture| Peradeniya",
        "Horticultural Crop Research and Development Institute | Gannoruwa",
        "Fruit Crop Research and Development Institute | Gannoruwa",
        "Agro Enterprise Development and Information service| Gannoruwa",
        "National Agriculture Information and Communication Centre| Gannoruwa",
        "Field Crop Research and Development Institute | Mahailluppallama",
        "Rice Research and Development Institute | Bathalagoda",
        "Agricultural and agrarian insurance board| Colombo",
        "Department of Animal Production and Health | Peradeniya",
        "Tea Research Institute of Sri Lanka (TRI) | Talawakelle",
        "Coconut Cultivation Board (CCB) | Matale| Kandy",
        "National Aquatic Resources Research and Development Agency (NARA) | Colombo",
        "University of Peradeniya | Peradeniya",
        "Veterinary Research Institute | Peradeniya",
    ],
  },
};

const PartnersContributors = ({ country }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const countryData = partnersData[country];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ m: 1, ml: 0, width: "21vw", height: 200 }} elevation={0}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: { sm: "center", md: "center" },
        }}
      >
        <img src={countryData.img} style={logoStyle3} alt={country} />

        <Button
          aria-controls={open ? `${country}-menu` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: "#333333",
            fontSize: "14px",
            fontFamily: "revert",
            margin: 2,
            marginRight: 3,
            marginLeft: 3,
            marginTop:5,
            backgroundColor: "#ddf0db",
            alignItems: "center",
          }}
        >
          <Typography sx={{textTransform:'none'}}>{countryData.name}</Typography>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id={`${country}-menu`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": `${country}-button`,
          }}
        >
          {countryData.menuItems.map((item, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {index === 0 ? <strong>{item}</strong> : item}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Paper>
  );
};

export default PartnersContributors;