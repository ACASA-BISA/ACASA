import React, { useEffect } from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Stack, Card, CardContent, Container, Grid, Tabs, Tab } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMedia from "@mui/material/CardMedia";
import StickyFooter from "../StickyFooter";
import { useParams } from "react-router-dom";

const slides = [
    {
        image: "/images/banner.png",
        title: "Atlas of Climate Adaptation in South Asian Agriculture",
        link: "/services",
        buttonText: "Explore the Atlas",
        secondaryLink: "/contact",
    },
    {
        image: "/images/banner.png",
        title: "Atlas of Climate Adaptation in South Asian Agriculture",
        link: "/monitoring",
        buttonText: "Explore the Atlas",
        secondaryLink: "/support",
    },
    {
        image: "/images/banner.png",
        title: "Atlas of Climate Adaptation in South Asian Agriculture",
        link: "/ai-solutions",
        buttonText: "Explore the Atlas",
        secondaryLink: "/learn",
    },
];

const rightCards = [
    {
        title: "Real-time Analytics",
        description: "Strengthen the quality, accessibility, and usability of data and evidence to support climate-informed decision-making in agriculture.",
        image: "/images/v1.png",
    },
    {
        title: "Smart Irrigation",
        description: "Enhance adaptive capacity of agricultural systems through granular climate risk assessment and targeted adaptation options.",
        image: "/images/v2.png",
    },
    {
        title: "Weather Forecast",
        description: "Build resilience of small-scale producers to climate variability and change through data-driven climate adaptation options.",
        image: "/images/v3.png",
    },
];

function TabPanel({ children, value, index }) {
    return (
        value === index && (
            <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
            </Box>
        )
    );
}

function TestHome() {
    const { country } = useParams(); // Extract country from URL params

    useEffect(() => {
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflowX = "hidden";
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 1400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        arrows: false,
    };

    // Define partner logos, filtering for Nepal if country is "nepal"
    const partnerLogos = country === "nepal" ? [2] : [2, 4, 5, 6, 8, 9]; // Only NARC (partner-2.png) for Nepal

    return (
        <>
            <Box className="carouselImg" sx={{ position: "relative", width: "100vw", height: "100vh" }}>
                {/* Banner Slider */}
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: "100vw",
                                height: "100vh",
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "relative",
                            }}
                        >
                            {/* Slide Text & Buttons */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: { xs: 40, md: 80 },
                                    left: { xs: 20, md: 80 },
                                    color: "#fff",
                                    background: "rgba(0, 0, 0, 0.5)",
                                    p: 3,
                                    borderRadius: 2,
                                    zIndex: 2,
                                }}
                            >
                                <Typography variant="h4" className="sliderTitle" sx={{ mb: 2 }}>
                                    {slide.title}
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button className="btnExplore">{slide.buttonText}</Button>
                                </Stack>
                            </Box>
                        </Box>
                    ))}
                </Slider>

                {/* Overlay Right Cards */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: 20,
                        transform: "translateY(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        zIndex: 3,
                        width: { xs: "80%", sm: "300px" },
                    }}
                >
                    {rightCards.map((card, idx) => (
                        <Card key={idx} className="cardImg" sx={{ backgroundColor: "rgba(255, 255, 255, 0.10)", borderRadius: "20px", backdropFilter: "blur(25px)" }}>
                            {card.image && (
                                <CardMedia component="img" height="50px" width="50px" image={card.image} alt={card.title} />
                            )}
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Container maxWidth="sm">
                <Box className="AboutSection">
                    <h1>
                        Explore <span>Climate Risk</span> Like Never Before
                    </h1>
                    <h4>Village-Level Maps to Inform Real-World Action</h4>
                    <p>
                        Our interactive maps are designed to help policymakers, researchers, NGOs, and farmers visualize climate-related risks and opportunities at an unprecedented resolution — down to the village level. Built using climate, crop, and socioeconomic data, the maps empower users to plan smarter and adapt faster.
                    </p>
                </Box>
            </Container>

            <Container maxWidth="md">
                <Box className="" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className="card1">
                                <CardContent className="cardBody">
                                    <p>🔍</p>
                                    <p> Zoom in to view risks at sub-district and village scales</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className="card1">
                                <CardContent className="cardBody">
                                    <p>🌾</p>
                                    <p>Visualize climate hazards including droughts, floods, and heat stress</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className="card1">
                                <CardContent className="cardBody">
                                    <p>🧑‍🌾</p>
                                    <p> Identify vulnerable regions for key crops and livestock</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className="card1">
                                <CardContent className="cardBody">
                                    <p>🛠 </p>
                                    <p>Discover locally relevant adaptation options</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className="card1">
                                <CardContent className="cardBody">
                                    <p>📊 </p>
                                    <p>Filter by country, crop, and hazard type</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className="card1">
                                <CardContent className="cardBody">
                                    <p>🧭 </p>
                                    <p> Support decision-making for insurance, planning, and investments</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Container maxWidth="xl" className="" sx={{ bgcolor: "#F2F4F3" }}>
                <Box className="aboutSectionApproach" sx={{ mt: 4, mb: 4, p: 5 }}>
                    <h1>ACASA Approach</h1>
                    <Container maxWidth="lg">
                        <img src="/images/approach.svg" className="w-100" alt="" />
                        <Button className="btn btnAbout">More About Us</Button>
                    </Container>
                </Box>
            </Container>

            <Container maxWidth="xl" className="">
                <Box className="aboutSectionApproach" sx={{ mt: 0, mb: 4 }}>
                    <h1>Use Cases</h1>
                    <Tabs className="btnTabs" value={value} onChange={handleChange} centered>
                        <Tab className="tabBtn" label="Government" />
                        <Tab className="tabBtn" label="Research" />
                        <Tab className="tabBtn" label="Civil Society" />
                        <Tab className="tabBtn" label="Credit and Finance" />
                        <Tab className="tabBtn" label="Multi-lateral Agencies" />
                        <Tab className="tabBtn" label="Insurance Industry" />
                        <Tab className="tabBtn" label="Agri-food Industry" />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Container maxWidth="xl" className="">
                            <Card className="roundedCard" sx={{ maxWidth: "100%", m: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item sx={{ flexBasis: "40%" }}>
                                            <Box className="tabBox"></Box>
                                        </Grid>
                                        <Grid item sx={{ flexBasis: "60%" }}>
                                            <Box className="contentBox">
                                                <h1>Government</h1>
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.
                                                </p>
                                                <h5>Evidence-based policymaking:</h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.
                                                </p>
                                                <h5>National Adaptation Plan:</h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.
                                                </p>
                                                <h5>Climate-Smart Villages:</h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.
                                                </p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Container maxWidth="xl" className="">
                            <Card className="roundedCard" sx={{ maxWidth: "100%", m: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item sx={{ flexBasis: "40%" }}>
                                            <Box className="tabBox"></Box>
                                        </Grid>
                                        <Grid item sx={{ flexBasis: "60%" }}>
                                            <Box className="contentBox">
                                                <h1>Research</h1>
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.
                                                </p>
                                                <h5>Evidence-based policymaking:</h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.
                                                </p>
                                                <h5>National Adaptation Plan:</h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.
                                                </p>
                                                <h5>Climate-Smart Villages:</h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.
                                                </p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <Container maxWidth="xl" className="">
                            <Card className="roundedCard" sx={{ maxWidth: "100%", m: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item sx={{ flexBasis: "40%" }}>
                                            <Box className="tabBox"></Box>
                                        </Grid>
                                        <Grid item sx={{ flexBasis: "60%" }}>
                                            <Box className="contentBox">
                                                <h1>Civil Society</h1>
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.
                                                </p>
                                                <h5>Evidence-based policymaking:</h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.
                                                </p>
                                                <h5>National Adaptation Plan:</h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.
                                                </p>
                                                <h5>Climate-Smart Villages:</h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.
                                                </p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </TabPanel>

                    <TabPanel value={value} index={3}>
                        <Container maxWidth="xl" className="">
                            <Card className="roundedCard" sx={{ maxWidth: "100%", m: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item sx={{ flexBasis: "40%" }}>
                                            <Box className="tabBox"></Box>
                                        </Grid>
                                        <Grid item sx={{ flexBasis: "60%" }}>
                                            <Box className="contentBox">
                                                <h1>Credit and Finance</h1>
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.
                                                </p>
                                                <h5>Evidence-based policymaking:</h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.
                                                </p>
                                                <h5>National Adaptation Plan:</h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.
                                                </p>
                                                <h5>Climate-Smart Villages:</h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.
                                                </p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </TabPanel>

                    <TabPanel value={value} index={4}>
                        <Container maxWidth="xl" className="">
                            <Card className="roundedCard" sx={{ maxWidth: "100%", m: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item sx={{ flexBasis: "40%" }}>
                                            <Box className="tabBox"></Box>
                                        </Grid>
                                        <Grid item sx={{ flexBasis: "60%" }}>
                                            <Box className="contentBox">
                                                <h1>Multi-lateral Agencies</h1>
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.
                                                </p>
                                                <h5>Evidence-based policymaking:</h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.
                                                </p>
                                                <h5>National Adaptation Plan:</h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.
                                                </p>
                                                <h5>Climate-Smart Villages:</h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.
                                                </p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </TabPanel>

                    <TabPanel value={value} index={5}>
                        <Container maxWidth="xl" className="">
                            <Card className="roundedCard" sx={{ maxWidth: "100%", m: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item sx={{ flexBasis: "40%" }}>
                                            <Box className="tabBox"></Box>
                                        </Grid>
                                        <Grid item sx={{ flexBasis: "60%" }}>
                                            <Box className="contentBox">
                                                <h1>Insurance Industry</h1>
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.
                                                </p>
                                                <h5>Evidence-based policymaking:</h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.
                                                </p>
                                                <h5>National Adaptation Plan:</h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.
                                                </p>
                                                <h5>Climate-Smart Villages:</h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.
                                                </p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </TabPanel>

                    <TabPanel value={value} index={6}>
                        <Container maxWidth="xl" className="">
                            <Card className="roundedCard" sx={{ maxWidth: "100%", m: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item sx={{ flexBasis: "40%" }}>
                                            <Box className="tabBox"></Box>
                                        </Grid>
                                        <Grid item sx={{ flexBasis: "60%" }}>
                                            <Box className="contentBox">
                                                <h1>Agri-food Industry</h1>
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional adaptation prioritisation. Insights from ACASA would help government agencies determine future investment requirements for climate risk mitigation and regional scaling opportunities.
                                                </p>
                                                <h5>Evidence-based policymaking:</h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking for climate-resilient agriculture and strategic resource allocation. The Atlas identifies sustainable practices and resilient farming methods to support rural climate-resilient infrastructure and finance requirements.
                                                </p>
                                                <h5>National Adaptation Plan:</h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation options to be integrated into the National Adaptation Plans of respective countries.
                                                </p>
                                                <h5>Climate-Smart Villages:</h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and villages by providing granular information on select implementation sites.
                                                </p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    </TabPanel>

                    <Button className="btn btnAbout">Explore the Atlas</Button>
                </Box>
            </Container>

            <Container maxWidth="xl" className="" sx={{ bgcolor: "#fff" }}>
                <Box className="aboutSectionApproach" sx={{ p: 5 }}>
                    <h1>Resources</h1>
                    <Container maxWidth="xl">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className="resourceCard">
                                    <CardContent>
                                        <Box className="whiteBox"></Box>
                                        <Box className="ContentBox">
                                            <h4>Maize, Agribusiness</h4>
                                            <p>Building Capabilities of Medium and Large-Scale Sri Lankan Maize Growers in Agricultural Risk Management</p>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className="resourceCard">
                                    <CardContent>
                                        <Box className="whiteBox"></Box>
                                        <Box className="ContentBox">
                                            <h4>Capacity building, women</h4>
                                            <p>ACASA for empowering women-led social entrepreneurs in Nepal: Building climate-resilient forage for a sustainable livestock ecosystem</p>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className="resourceCard">
                                    <CardContent>
                                        <Box className="whiteBox"></Box>
                                        <Box className="ContentBox">
                                            <h4>Adaptation, local-level planning</h4>
                                            <p>Strengthening the model of “Adaptation Clinic” through data-driven local level adaptation planning in Bangladesh</p>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Button className="btn btnAbout1">Explore More</Button>
                    </Container>
                </Box>
            </Container>

            <Container maxWidth="xl" className="" sx={{ bgcolor: "#fff" }}>
                <Box className="aboutSectionApproach" sx={{ p: 5 }}>
                    <h1>Our Partners</h1>
                    <p className="paraOne">
                        ACASA is a collaborative initiative powered by global and regional leaders in agricultural innovation and climate science. Our partners provide critical expertise, data, tools, and regional insights to drive climate-resilient agriculture across South Asia.
                    </p>
                    <Container maxWidth="xl">
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            {partnerLogos.map((num) => (
                                <Grid item xs={6} sm={4} md={2} key={num} display="flex" justifyContent="center">
                                    <Card className="resourceCardPartner">
                                        <CardContent sx={{ p: 0, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src={`/images/partner-${num}.png`} alt={`partner-${num}`} className="partner-img" />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Container>
            <StickyFooter />
        </>
    );
}

export default TestHome;