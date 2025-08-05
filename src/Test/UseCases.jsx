import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Grid,
    Container
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


function UseCases() {

    const [expanded, setExpanded] = useState("panel1");

    const handleChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '100px' }}>
                <Box className="AboutSectionCase">
                    <h1>
                        Use Cases of <span>ACASA </span>
                    </h1>
                    <p>
                        ACASA is a unique platform that provides an integrated assessment of commodity-specific granular climate risk profiles and information on adaptation
                        options for South Asian agriculture. This is done for region’s major agricultural and livestock commodities at a 5 km resolution. In addition,
                        it also identifies regions where adaptation benefits would emerge through gender-friendly technology adoption and would curtail maladaptation.
                    </p>
                    <p>Our adaptation options are rigorously formulated from the relevant literature and validated stakeholder consultations across South Asia.
                        Therefore, ACASA provides a unique opportunity for various stakeholders to meet their potential needs in broader areas of climate risk management
                        and adaptation in agriculture. The open-access nature of the Atlas promotes knowledge dissemination and unrestricted use for desired purposes.
                        ACASA data can be freely downloaded in a tabular, user-friendly format with geographic information system (GIS) datasets for specific applications.</p>
                    <p>We conducted a dedicated ‘Use Case Workshop’ on Oct 1-3, 2024, in Colombo, Sri Lanka, for potential stakeholders who will put the Atlas into use.
                        Upon the stakeholder consultation, the following use cases were identified.</p>
                </Box>
            </Container>

            <Container maxWidth="xl">
                <Box sx={{ bgcolor: "#fff", p: 2 }}>
                    {/* Accordion 1 */}
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        sx={{
                            mb: 1,
                            border: "1px solid rgba(0, 0, 0, 0.10)",
                            borderRadius: "12px",
                            bgcolor: "#fff",
                            boxShadow: "none",
                            "&.Mui-expanded": {
                                bgcolor: "#F2F4F3",
                                boxShadow: "none",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: expanded === "panel1" ? "#4C9E46" : "#f0f0f0",
                                color: expanded === "panel1" ? "#fff" : "#00000080",
                                borderRadius: "12px",
                               
                                "&.Mui-expanded": {
                                    borderRadius: "12px",
                                    border: "1px solid rgba(0, 0, 0, 0.10)",
                                    boxShadow: "none",
                                   
                                },
                            }}
                        >
                            <Typography style={{fontSize:'18px', fontFamily:'Poppins', fontWeight:'400'}}>Government</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ width: "100%", height: "100%", p: 0 }}>
                                            <Box
                                                component="img"
                                                src="/images/govt.png"
                                                alt="Government"
                                                sx={{
                                                    width: "100%",
                                                    height: "auto",
                                                    objectFit: "contain",
                                                    display: "block"
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <Box className="contentBox">
                                                <p>
                                                    ACASA can be useful for climate risk profiling and regional
                                                    adaptation prioritisation. Insights from ACASA would help
                                                    government agencies determine future investment requirements
                                                    for climate risk mitigation and regional scaling
                                                    opportunities.
                                                </p>
                                                <h5 style={{ marginBottom: 0, marginTop: 0 }}>
                                                    Evidence-based policymaking:
                                                </h5>
                                                <p>
                                                    The Atlas provides data and analysis to support policymaking
                                                    for climate-resilient agriculture and strategic resource
                                                    allocation. The Atlas identifies sustainable practices and
                                                    resilient farming methods to support rural climate-resilient
                                                    infrastructure and finance requirements.
                                                </p>
                                                <h5 style={{ marginBottom: 0, marginTop: 0 }}>
                                                    National Adaptation Plan:
                                                </h5>
                                                <p>
                                                    Atlas could provide relevant stakeholder-validated adaptation
                                                    options to be integrated into the National Adaptation Plans of
                                                    respective countries.
                                                </p>
                                                <h5 style={{ marginBottom: 0, marginTop: 0 }}>
                                                    Climate-Smart Villages:
                                                </h5>
                                                <p>
                                                    Atlas will support scaling climate-resilient agriculture and
                                                    villages by providing granular information on select
                                                    implementation sites.
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </AccordionDetails>
                    </Accordion>


                    {/* Accordion 2 */}
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                        sx={{
                            mb: 1,
                            border: "1px solid rgba(0, 0, 0, 0.10)",
                            borderRadius: "12px",
                            bgcolor: "#fff",
                            boxShadow: "none",
                            "&.Mui-expanded": {
                                bgcolor: "#F2F4F3", // light #4C9E46 background
                                boxShadow: "none",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: expanded === "panel2" ? "#4C9E46" : "#f0f0f0",
                                color: expanded === "panel2" ? "#fff" : "#00000080",
                                borderRadius: "12px",
                               
                                border: '0px light',
                                "&.Mui-expanded": {
                                    borderRadius: "12px",
                                    border: "1px solid rgba(0, 0, 0, 0.10)",
                                    boxShadow: "none",
                                   
                                },
                            }}
                        >
                            <Typography style={{fontSize:'18px', fontFamily:'Poppins', fontWeight:'400'}}>Research</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ width: "100%", height: "100%", p: 0 }}>
                                            <Box
                                                component="img"
                                                src="/images/research1.jpg"
                                                alt="Research"
                                                sx={{
                                                    width: "100%",       // fits the grid box
                                                    height: "auto",      // keeps aspect ratio
                                                    objectFit: "contain",// keeps image inside bounds
                                                    display: "block"     // removes extra space below image
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <Box className="contentBox">
                                                <p>Empowering researchers with high-resolution, multi-dimensional data for robust climate agriculture analysis in South Asia.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Agricultural research</h5>
                                                <p>Atlas provides a comprehensive platform for climate-related data products for agricultural research.
                                                    Commodity-specific hazard and adaptation identification methodology
                                                    and tools can be used for interdisciplinary research on various aspects of climate risk management.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Impact evaluation and assessment</h5>
                                                <p>Atlas can enable hotspot identification and gendered vulnerability assessments at granular levels, ideal
                                                    for targeted fieldwork or impact evaluation. ACASA’s repository of evidence on climate-smart agriculture
                                                    practices allows researchers to validate hypotheses and derive regionally relevant findings.</p>

                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </AccordionDetails>
                    </Accordion>


                    {/* Accordion 3 */}
                    <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                        sx={{
                            mb: 1,
                            border: "1px solid rgba(0, 0, 0, 0.10)",
                            borderRadius: "12px",
                            bgcolor: "#fff",
                            boxShadow: "none",
                            "&.Mui-expanded": {
                                bgcolor: "#e8f5e9", // light #4C9E46 background
                                boxShadow: "none",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: expanded === "panel3" ? "#4C9E46" : "#f0f0f0",
                                color: expanded === "panel3" ? "#fff" : "#00000080",
                                borderRadius: "12px",
                               
                                "&.Mui-expanded": {
                                    borderRadius: "12px",
                                    border: "1px solid rgba(0, 0, 0, 0.10)",
                                    boxShadow: "none",
                                   
                                },
                            }}
                        >
                            <Typography style={{fontSize:'18px', fontFamily:'Poppins', fontWeight:'400'}}>Civil Society </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ width: "100%", height: "100%", p: 0 }}>
                                            <Box
                                                component="img"
                                                src="/images/civil.jpg"
                                                alt="Civil"
                                                sx={{
                                                    width: "100%",       // fits the grid box
                                                    height: "auto",      // keeps aspect ratio
                                                    objectFit: "contain",// keeps image inside bounds
                                                    display: "block"     // removes extra space below image
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <Box className="contentBox">
                                                <p>ACASA provides open-access and freely downloadable products on climate risk management in agriculture.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Strengthen climate action</h5>
                                                <p> ACASA can help civil societies prioritize the interventions for climate action and promote climate-resilient
                                                    agricultural practices and technologies as an adaptation measure to climate change.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Climate-related proposal</h5>
                                                <p>ACASA can provide detailed insights and information in developing climate context for new project proposals.</p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion 4 */}
                    <Accordion
                        expanded={expanded === "panel4"}
                        onChange={handleChange("panel4")}
                        sx={{
                            mb: 1,
                            border: "1px solid rgba(0, 0, 0, 0.10)",
                            borderRadius: "12px",
                            bgcolor: "#fff",
                            boxShadow: "none",
                            "&.Mui-expanded": {
                                bgcolor: "#F2F4F3", // light #4C9E46 background
                                boxShadow: "none",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: expanded === "panel4" ? "#4C9E46" : "#f0f0f0",
                                color: expanded === "panel4" ? "#fff" : "#00000080",
                                borderRadius: "12px",
                               
                                "&.Mui-expanded": {
                                    borderRadius: "12px",
                                },
                            }}
                        >
                            <Typography style={{fontSize:'18px', fontFamily:'Poppins', fontWeight:'400'}}>Credit and Finance</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ width: "100%", height: "100%", p: 0 }}>
                                            <Box
                                                component="img"
                                                src="/images/credit.jpg"
                                                alt="Civil"
                                                sx={{
                                                    width: "100%",       // fits the grid box
                                                    height: "auto",      // keeps aspect ratio
                                                    objectFit: "contain",// keeps image inside bounds
                                                    display: "block"     // removes extra space below image
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <Box className="contentBox">
                                                <p>Enabling credit and financial institutions to leverage climate-agriculture data for
                                                    risk informed lending and climate-smart investment products.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Credit re-assessment</h5>
                                                <p>Atlas to enable policy advocacy for facilitating the use of climate risk database for agricultural credit risk assessment, risk pricing, and asset quality.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Development of Agri-financing products</h5>
                                                <p>Banks and MFIs can use ACASA to de-risk loans by aligning credit products with low-risk, high-solvency regions. Data on cost-benefit and scalability supports the design of
                                                    climate-smart loan products and blended finance schemes.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Gender-sensitive credit scheme</h5>
                                                <p>Gendered insights allow financial institutions to design women-focused credit solutions, encouraging inclusive lending.</p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion 5 */}
                    <Accordion
                        expanded={expanded === "panel5"}
                        onChange={handleChange("panel5")}
                        sx={{
                            mb: 1,
                            border: "1px solid rgba(0, 0, 0, 0.10)",
                            borderRadius: "12px",
                            bgcolor: "#fff",
                            boxShadow: "none",
                            "&.Mui-expanded": {
                                bgcolor: "#F2F4F3", // light #4C9E46 background
                                boxShadow: "none",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: expanded === "panel5" ? "#4C9E46" : "#f0f0f0",
                                color: expanded === "panel5" ? "#fff" : "#00000080",
                                borderRadius: "12px",
                               
                                "&.Mui-expanded": {
                                    borderRadius: "12px",
                                },
                            }}
                        >
                            <Typography style={{fontSize:'18px', fontFamily:'Poppins', fontWeight:'400'}}>Multi-lateral Agencies</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ width: "100%", height: "100%", p: 0 }}>
                                            <Box
                                                component="img"
                                                src="/images/multi.jpg"
                                                alt="Civil"
                                                sx={{
                                                    width: "100%",       // fits the grid box
                                                    height: "auto",      // keeps aspect ratio
                                                    objectFit: "contain",// keeps image inside bounds
                                                    display: "block"     // removes extra space below image
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <Box className="contentBox">
                                                <p>ACASA will provide multi-lateral agencies with strategic data insights and directions for adaptation
                                                    investments in South Asia and facilitate more effective project design and planning.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Climate finance</h5>
                                                <p>Agencies can systematically integrate ACASA adaptation recommendations in their climate finance planning process to align
                                                    with the Paris Agreement and sustainable development goals. Data will support agencies in focusing on targeted investments
                                                    such as climate-resilient food systems, landscapes, and livelihoods, especially in regions with high adaptation benefits.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Targeted high-impact investments</h5>
                                                <p>Donors can utilize ACASA to prioritize high-impact locations for climate-smart agriculture projects benefiting small-scale farmers and promote adaptation strategies.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Gender-intentional adaptations</h5>
                                                <p>The Atlas includes information on gender-intentional adaptations, guiding donors to promote equity in climate adaptation projects.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Monitoring and evaluation</h5>
                                                <p>ACASA is an innovative tool for agencies as they constantly seek information and expertise in improving the effectiveness
                                                    and impact of their initiative. Atlas provides accessible and actionable data through open-access, user-friendly tables and maps for informed resource allocation and structured interventions.</p>

                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion 6 */}
                    <Accordion
                        expanded={expanded === "panel6"}
                        onChange={handleChange("panel6")}
                        sx={{
                            mb: 1,
                            border: "1px solid rgba(0, 0, 0, 0.10)",
                            borderRadius: "12px",
                            bgcolor: "#fff",
                            boxShadow: "none",
                            "&.Mui-expanded": {
                                bgcolor: "#F2F4F3", // light #4C9E46 background
                                boxShadow: "none",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: expanded === "panel6" ? "#4C9E46" : "#f0f0f0",
                                color: expanded === "panel6" ? "#fff" : "#00000080",
                                borderRadius: "12px",
                               
                                "&.Mui-expanded": {
                                    borderRadius: "12px",
                                },
                            }}
                        >
                            <Typography style={{fontSize:'18px', fontFamily:'Poppins', fontWeight:'400'}}>Insurance Industry</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ width: "100%", height: "100%", p: 0 }}>
                                            <Box
                                                component="img"
                                                src="/images/insurance.png"
                                                alt="Civil"
                                                sx={{
                                                    width: "100%",       // fits the grid box
                                                    height: "auto",      // keeps aspect ratio
                                                    objectFit: "contain",// keeps image inside bounds
                                                    display: "block"     // removes extra space below image
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <Box className="contentBox">
                                                <p>Atlas can support Agri-insurance agencies in developing satisfactory crop insurance products for dynamic small-scale producers,
                                                    providing sufficient resolution at the village level.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Methodology Improvement</h5>
                                                <p>A granular risk assessment of Atlas can aid in improving the existing methodology for insurance product design and payout mechanism. Implementing a parametric mechanism for insurance claims could improve efficiency, triggered only by specific conditions rather than random samples.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Premium set-up</h5>
                                                <p>Enhancing risk quantification and identification to boost insurance penetration from current levels and premium set-up.</p>

                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion 7 */}
                    <Accordion 
                        expanded={expanded === "panel7"}
                        onChange={handleChange("panel7")}
                        sx={{
                            mb: 1,
                            border: "1px solid rgba(0, 0, 0, 0.10)",
                            borderRadius: "12px",
                            bgcolor: "#fff",
                            boxShadow: "none",
                            "&.Mui-expanded": {
                                bgcolor: "#F2F4F3", // light #4C9E46 background
                                boxShadow: "none",
                                borderRadius: "12px",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: expanded === "panel7" ? "#4C9E46" : "#f0f0f0",
                                color: expanded === "panel7" ? "#fff" : "#00000080",
                                borderRadius: "12px",
                               
                                "&.Mui-expanded": {
                                    borderRadius: "12px",
                                },
                            }}
                        >
                            <Typography style={{fontSize:'18px', fontFamily:'Poppins', fontWeight:'400'}}>Agri-food Industry</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ width: "100%", height: "100%", p: 0 }}>
                                            <Box
                                                component="img"
                                                src="/images/agri.jpg"
                                                alt="Civil"
                                                sx={{
                                                    width: "100%",       // fits the grid box
                                                    height: "auto",      // keeps aspect ratio
                                                    objectFit: "contain",// keeps image inside bounds
                                                    display: "block"     // removes extra space below image
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <Box className="contentBox">
                                                <p>ACASA is committed to ensuring a sustainable agri-food industry and inclusive supply chains.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Climate-friendly supply chains</h5>
                                                <p>Collaboration with farmers for sustainable and climate-resilient practices and equitable climate-friendly supply chains, ensuring an uninterrupted supply.</p>
                                                <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>Capacity development</h5>
                                                <p>Enhancing the capacity of the farming community for the adaptation to climatic hazards for livestock production.</p>

                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Container>
        </>
    )
}

export default UseCases