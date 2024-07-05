import * as React from "react";
import TryIcon from "@mui/icons-material/Try";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { styled } from "@mui/system";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#4c9c44", // Green color
  color: "#fff", // White text color
  height:'40px',
  justifyContent:'center',
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: "#fff", // White text color
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  fontWeight: "bold",
  textAlign: "left",
  marginBottom: theme.spacing(2),
}));

const BodyText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  textAlign: "left",
  marginBottom: theme.spacing(2),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: "#4c9c44", // Green color to match AppBar
  color: "#fff",
  textTransform: "none",
  height:'40px',
  marginTop: theme.spacing(2),
  fontSize: "16px",
  padding: theme.spacing(1.5),
  '&:hover': {
      backgroundColor: '#f5f3ed',
      boxShadow: 'none',
      color: '#000',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: 'none',
      backgroundColor: '#fece2f',
    },
}));

const CenteredContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between", // Align items to the left and make space for other content
  alignItems: "center",
  flexDirection: "row",
  padding: 0, // Remove padding to avoid extra space
  height: "calc(100vh - 190px)", // Set height to 100% of viewport height
  width: "100vw", // Set width to 100% of viewport width
  position: "relative",
  top: 0,
  left: 0,
  // backgroundColor: "blue",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center", // Align items to the start of the flex container
  maxWidth: "500px",
  height: "100%", // Take full height of the container
  padding: theme.spacing(2), // Add some padding inside the red box
  marginRight: theme.spacing(2), // Add margin to the right to separate it from the image list
}));

const itemData = [
  {
    img: "buff1.jpg",
    title: "buffalo",
  },
  {
    img: "buff2.jpg",
    title: "Tea",
  },
  {
    img: "buff3.jpg",
    title: "Sink",
  },
  {
    img: "buff4.jpg",
    title: "Kitchen",
  },
  {
    img: "buff5.jpg",
    title: "Blinds",
  },
  {
    img: "buff6.jpg",
    title: "Chairs",
  },
  {
    img: "buff7.JPG",
    title: "Laptop",
  },
  {
    img: "buff8.JPG",
    title: "Doors",
  },
  {
    img: "buff9.jpg",
    title: "Coffee",
  },
];

function MasonryImageList() {
  return (
    <Box
      sx={{
        width: "calc(100vw - 820px)",
        height: "auto",
        overflowY: "hidden",
        marginTop: "70px"
      }}
    >
      <ImageList variant="woven" cols={3} gap={7}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

function Feedback1() {
  return (
    <Box sx={{ flexGrow: 1, marginTop:'80px'}}>
      <AppBarStyled position="static">
          <Typography fontSize={16} sx={{fontStyle:'italic'}}>
              Hey 👋 Your feedback means the world to us. Share your opinion.
          </Typography>
      </AppBarStyled>
      <CenteredContainer>
        <ContentBox>
          <Box sx={{ marginTop: 15, position: "relative" }}>
            <Heading>
              Feedback <TryIcon fontSize="11px" />{" "}
            </Heading>
            <BodyText>
              Thank you for visiting the test version of the Atlas of Climate
              Adaptation in South Asian Agriculture (ACASA). We value your
              feedback on this test version, which will help us improve our data
              analytics and content before the official release of first
              version. Please take a moment to complete this quick feedback and
              share your thoughts with us.
            </BodyText>
            <ButtonStyled
              variant="contained"
              component="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7C-wqIeJ2myFs-7bBfzf5RvrZTFec17nLVQsawNRj4vftdw/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback Form
            </ButtonStyled>
          </Box>
        </ContentBox>
        <MasonryImageList />
      </CenteredContainer>
    </Box>
  );
}

export default Feedback1;
