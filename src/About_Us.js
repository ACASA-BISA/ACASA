// React library is imported for building the component.
// Several components from Material UI are imported for styling and functionality like Box, Typography, Link, Paper, and Zoom.
// It also imports custom components PartnersContributors and StickyFooter (which seems to be absent in the provided code).
import * as React from "react";
import StickyFooter from "./StickyFooter";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import PartnersContributors from "./Partners";

// The code defines several styles using Javascript objects for logo images with different sizes. These styles are used with the img tag later.

const logoStyle = {
  width: "auto",
  height: "8vh",
  paddingLeft: "16px",
  marginTop: "16px",
  marginBottom: "16px",
};

const logoStyle2 = {
  width: "70%",
  height: "auto",
  margin: "auto",
  marginTop: 30,
};

const logoStyle3 = {
  width: "auto",
  height: 80,
  margin: "auto",
  marginTop: 20,
};
const logoStyle4 = {
  width: "auto",
  height: 40,
  margin: "auto",
  marginTop: 40,
  marginBottom: 20,
};

// This is the main component that returns JSX code defining the layout and content of the about us section.
// It uses a Box component from MUI to manage the layout with flexbox for different screen sizes (xs - extra small, md - medium).
// The component displays text content about ACASA using Typography components with various styles for headings and paragraphs.
// Links to relevant websites like CIMMYT and ACASA brochure are included using Link components.
// Images representing Workstreams of ACASA are displayed using the img tag with styles applied.
// It uses Zoom component from MUI to add a zoom animation effect on hover for the workstream logos.
// Partner logos from Bill & Melinda Gates Foundation and research institutions from South Asia are displayed using Paper components with logos as images and text descriptions. Links to their websites are also included.
// Similar structure is used to display information about Advisory Panel and Country Team Leads of ACASA.
// The component likely uses the StickyFooter component at the bottom (not provided in the code) for a persistent footer.

export default function AboutUs() {
  return (
    <div>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          marginTop: "70px",
          minHeight: "50vh",
          textAlign: { sm: "center", md: "left" },
        }}
      >
      <Box sx={{paddingBottom:5}}>
        <Box  sx={{marginLeft:7,marginTop:4,marginRight:7}}>
        <Typography sx={{color:'#333333',fontWeight:'bold',fontSize:'34px', fontFamily:'revert'}}>About ACASA</Typography>
        </Box>
        <Box  sx={{display: 'flex', flexDirection: 'row',marginLeft:7,marginRight:7,marginTop:0}}>
        <Box  sx={{display: 'flex', flexDirection: 'column',width: { xs: '100%', sm: '60%' }}}>
         <Typography sx={{color:'#333333',fontSize:'16px', fontFamily:'revert',marginTop:2}}>Increasing climatic risks make it imperative to identify spatial and temporal risks 
         that are likely to impact agriculture. Adaptation options are thus needed to mitigate the negative impacts. Considering this, with support
          from the Bill & Melinda Gates Foundation (BMGF), the Borlaug Institute for South Asia (BISA) is working with national agriculture research
           systems in South Asia to develop the Atlas of Climate Adaptation in South Asian Agriculture (ACASA).</Typography>
          <Typography sx={{color:'#333333',fontSize:'16px', fontFamily:'revert',marginTop:2}}>This comprehensive Atlas aims to provide granular-scale information for South Asian
           countries at the village scale by integrating various spatially explicit data sets together. It covers climate hazards, the exposure 
           of smallholder populations, farms, and crop and livestock enterprises to hazards. It will also look into the vulnerability of these
            populations to climatic risks, impacts on critical commodities in the region, and evidence of the effectiveness of different climate 
            adaptation interventions. The ACASA offers a unique set of tools that can facilitate improved investment targeting and priority setting,
             and support stakeholders' decision-making and investments in agricultural technologies, climate information services, and policies. The 
             intended beneficiaries of this Atlas include governments, insurance and agri-food industries, international and national donors, and 
             adaptation-focused entities.</Typography>
             <Typography sx={{color:'#333333',fontSize:'16px', fontFamily:'revert',marginTop:2, fontWeight:'bold'}}>
             Read more about us:
             </Typography>
             <Typography sx={{color:'#333333', fontFamily:'revert',fontSize:'16px'}}>
             <Link href="https://www.cimmyt.org/projects/atlas-of-climate-adaptation-in-south-asian-agriculture-acasa/" underline="none" color='#4b9e44' target="_blank">
             Atlas of Climate Adaptation in South Asian Agriculture (ACASA) – CIMMYT
             </Link>
             </Typography>
             <Typography sx={{color:'#333333', fontFamily:'revert',fontSize:'16px'}}>
             <Link href="ACASA Brochure.pdf" underline="none" color='#4b9e44' target="_blank">
             ACASA Brochure
             </Link>
             </Typography>
        </Box>
        <Box  sx={{display: 'flex', flexDirection: 'column',width: { xs: '100%', sm: '30%' },marginTop:2,marginLeft:'6%'}}>
        <Typography variant='h5' sx={{color:'#333333',fontWeight:'bold', fontFamily:'revert'}}>Workstreams</Typography>
        <Zoom in={true} style={{ transitionDelay: '100ms' }}><Paper sx={{mt:0, width:'99%', height:'auto' }} elevation={0}>
        <Box  sx={{display: 'flex', flexDirection: 'row',alignItems:'center'}}>
        <img src={'work-stream1.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'14px', fontFamily:'revert',margin:2,marginRight:3}}>
                Gridded risk analysis using historical crop yield data and
         satellite signatures; indicators of current and future hazards, exposure, and vulnerabilities</Typography>
         </Box>
        </Paper></Zoom>
        <Zoom in={true} style={{ transitionDelay: '500ms' }}><Paper sx={{ mt:0, width: '99%', height:'auto' }} elevation={0}>
        <Box  sx={{display: 'flex', flexDirection: 'row',alignItems:'center'}}>
        <img src={'work-stream2.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'14px', fontFamily:'revert',margin:2,marginRight:3}}>
        Climate impact on commodities under current and future climate</Typography>
         </Box>
        </Paper></Zoom>
        <Zoom in={true} style={{ transitionDelay: '900ms' }}><Paper sx={{mt:0, width: '99%', height:'auto' }} elevation={0}>
        <Box  sx={{display: 'flex', flexDirection: 'row',alignItems:'center'}}>
        <img src={'work-stream3.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'14px', fontFamily:'revert',margin:2,marginRight:3}}>
        Heuristic models, crop/livestock models, statistical and econometric models, and expert consultations</Typography>
         </Box>
        </Paper></Zoom>
        <Zoom in={true} style={{ transitionDelay: '1300ms' }}><Paper sx={{ mt:0, width: '99%', height:'auto' }} elevation={0}>
        <Box  sx={{display: 'flex', flexDirection: 'row',alignItems:'center'}}>
        <img src={'work-stream4.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'14px', fontFamily:'revert',margin:2,marginRight:3}}>
        An open-source, web-enabled, interactive, and dynamic Atlas development</Typography>
         </Box>
        </Paper></Zoom>
        </Box>
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column',width: { xs: '100%', sm: '100%' },paddingBottom:5,paddinTop:5,backgroundColor:'#f7f7f7'}}>
        <Box sx={{marginLeft:7,marginRight:7,marginTop:4}}>
      <Typography sx={{color:'#111111',fontWeight:'bold',fontSize:'30px', fontFamily:'revert'}}>ACASA Development Partners</Typography>
      <Typography variant='h5' sx={{color:'#111111',fontWeight:'bold', fontFamily:'revert',marginTop:2,marginBottom:2}}>Supported By</Typography>
      <Link href="https://www.gatesfoundation.org/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'bmgf-new.svg'}
                style={logoStyle2}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3}}>
          Bill & Melinda Gates Foundation</Typography>
         </Box></Paper>
         </Link>
      <Typography variant='h5' sx={{color:'#111111',fontWeight:'bold', fontFamily:'revert',marginTop:2,marginBottom:2}}>Partners in South Asia</Typography>
      <Box sx={{display:'flex',flexDirection:'row',width: { xs: '100%', sm: '100%' }}} gap='1vw'>
      <Link href="https://barc.gov.bd/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-1.png'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
          Bangladesh Agriculture Research Council (BARC)</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://icar.org.in/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-6.svg'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Indian Council of Agricultural Research (ICAR)</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://narc.gov.np/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-7.svg'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Nepal Agricultural Research Council (NARC)</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://doa.gov.lk/NRMC/" underline="none" target="_blank"> 
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-4.svg'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Natural Resources Management Center (NRMC), Sri Lanka</Typography>
         </Box></Paper>
         </Link>
      </Box>
      <Typography variant='h5' sx={{color:'#111111',fontWeight:'bold', fontFamily:'revert',marginTop:2,marginBottom:2}}>External Partners</Typography>
      <Box sx={{display:'flex',flexDirection:'row',width: { xs: '100%', sm: '100%' }}} gap='1vw'>
      <Link href="https://www.columbia.edu/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-10.svg'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        University of Columbia, USA</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://www.ufl.edu/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-11.svg'}
                style={logoStyle4}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        University of Florida, USA</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://www.washington.edu/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200,transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        }}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-12.svg'}
                style={logoStyle4}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        University of Washington, USA</Typography>
         </Box></Paper>
         </Link>
      </Box>
      <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "#111111",
                  fontWeight: "bold",
                  fontFamily: "revert",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                Other Partners & Contributors
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: { xs: "100%", sm: "100%" },
                }}
                gap="1vw"
              >
                <PartnersContributors country="bangladesh" />
                <PartnersContributors country="india" />
                <PartnersContributors country="nepal" />
                <PartnersContributors country="sriLanka" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: "100%" },
            paddingBottom: 5,
            paddinTop: 5,
            backgroundColor: "#ffffff",
          }}
        >
          <Box sx={{ marginLeft: 7, marginRight: 7, marginTop: 4 }}>
            <Typography
              sx={{
                color: "#111111",
                fontWeight: "bold",
                fontSize: "25px",
                fontFamily: "revert",
              }}
            >
              ACASA advisory panel
            </Typography>
            <Typography
              sx={{
                color: "#111111",
                fontSize: "15px",
                fontFamily: "revert",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              The advisory panel established under ACASA will have the
              scientific advisory committee that will identify potential users,
              use cases in different countries, and guide and review Atlas’
              progress.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: { xs: "100%", sm: "100%" },
              }}
              gap="1vw"
            >
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Pramod K Joshi
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Ex-Director- International Food Policy Research Institute
                    (IFPRI), India
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Leigh Anderson
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Evans School of Public Policy and Governance, University of
                    Washington, Seattle
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Miranda Meuwissen
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Professor of Risk Management and Resilience, Wageningen
                    University, Netherlands
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Michiko Katagami
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Principal Natural Resources and Agriculture Specialist, Asia
                    Development Bank (ADB), Manila
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: { xs: "100%", sm: "100%" },
              }}
              gap="1vw"
            >
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    V. Geethalakshmi
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Vice Chancellor, Tamil Nādu Agriculture University, India
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Alex Ruane
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Co-Director, Climate Impacts Group, NASA Goddard Institute
                    for Space Studies (GISS)
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Tess Russo
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Senior Program Officer, Bill & Melinda Gates Foundation
                    (BMGF), Seattle
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#f7f7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Pramod Aggarwal
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Project Leader, ACASA; Regional Program Leader, BISA-CIMMYT,
                    Delhi
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <Typography
              sx={{
                color: "#111111",
                fontWeight: "bold",
                fontSize: "25px",
                fontFamily: "revert",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              ACASA country team leads
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: { xs: "100%", sm: "100%" },
              }}
              gap="1vw"
            >
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#fff7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Hasan Md. Hamidur Rahman
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Director, Computer and GIS Unit, BARC, Bangladesh
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#fff7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    CA Rama Rao
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Principal Scientist, ICAR-Central Research Institute for
                    Dryland Agriculture (CRIDA), India
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#fff7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    Roshan B Ojha
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Soil Scientist, National Agricultural Environment Research
                    Centre, NARC, Nepal
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  m: 1,
                  ml: 0,
                  width: "21vw",
                  height: "auto",
                  backgroundColor: "#fff7ff",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { sm: "center", md: "center" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      fontFamily: "revert",
                      margin: 2,
                      mb: 1,
                    }}
                  >
                    W.M.U.K Rathnayake
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "revert",
                      margin: 0,
                      marginRight: 3,
                      marginLeft: 3,
                      mb: 2,
                    }}
                  >
                    Director, NRMC, Department of Agriculture, Sri Lanka
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <Typography
              sx={{
                color: "#111111",
                fontWeight: "bold",
                fontSize: "25px",
                fontFamily: "revert",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              ACASA core team @ BISA
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: "100%" },
              }}
              gap="0vw"
            >
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                  fontWeight: "bold",
                }}
              >
                1. Pramod Aggarwal, Project Leader, ACASA; Regional Program
                Leader
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                2. Paresh Shirsath, Scientist, Climate Adaptation
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                3. Prasun Gangopadhyay, Research Lead, Digital Agriculture
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                4. Sanjoy Bandopadhyay, Sr. Agronomist & Climate Adaptation
                Expert
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                5. Anasuya Barik, Data Analyst
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                6. Aniket Deo, Bioeconomic Modeler
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                7. Kaushik Bora, Agricultural Economist
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                8. Riya Gupta, Communication Officer
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                9. Saumya Singh, Data Analyst & Software Developer
              </Typography>
              <Typography
                sx={{
                  color: "#111111",
                  fontWeight: "normal",
                  fontSize: "14px",
                  fontFamily: "revert",
                }}
              >
                10. Uttam Puri Goswami, Data Analyst
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <StickyFooter></StickyFooter>
      <Box
        sx={{
          marginTop: "80px",
          width: "100%",
          height: "calc(100vh - 80px)",
          alignItems: "center",
          justifyContent: "center",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Typography>
          This website is designed for desktop. Please view in a bigger screen.
        </Typography>
      </Box>
    </div>
  );
}
