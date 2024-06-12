import * as React from 'react';
import StickyFooter from './StickyFooter';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';

const logoStyle = {
  width: 'auto',
  height: '8vh',
  paddingLeft:'16px',
  marginTop:'16px'
};

const logoStyle2 = {
  width: 'auto',
  height: '50%',
  margin:'auto',
  marginTop:30,
};

const logoStyle3 = {
  width: 'auto',
  height: 80,
  margin:'auto',
  marginTop:20,
};
const logoStyle4 = {
  width: 'auto',
  height: 40,
  margin:'auto',
  marginTop:40,
  marginBottom:20,
};

export default function AboutUs(){
    return(
        <div>
          <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop:'80px',
          minHeight: '50vh',
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
      <Box sx={{paddingBottom:5}}>
        <Box  sx={{marginLeft:7,marginTop:4,marginRight:7}}>
        <Typography sx={{color:'#333333',fontWeight:'bold',fontSize:'40px', fontFamily:'revert'}}>About ACASA</Typography>
        </Box>
        <Box  sx={{display: 'flex', flexDirection: 'row',marginLeft:7,marginRight:7,marginTop:0}}>
        <Box  sx={{display: 'flex', flexDirection: 'column',width: { xs: '100%', sm: '60%' }}}>
         <Typography sx={{color:'#333333',fontSize:'17px', fontFamily:'revert',marginTop:2}}>Increasing climatic risks make it imperative to identify spatial and temporal risks 
         that are likely to impact agriculture. Adaptation options are thus needed to mitigate the negative impacts. Considering this, with support
          from the Bill & Melinda Gates Foundation (BMGF), the Borlaug Institute for South Asia (BISA) is working with national agriculture research
           systems in South Asia to develop the Atlas of Climate Adaptation in South Asian Agriculture (ACASA).</Typography>
          <Typography sx={{color:'#333333',fontSize:'17px', fontFamily:'revert',marginTop:2}}>This comprehensive Atlas aims to provide granular-scale information for South Asian
           countries at the village scale by integrating various spatially explicit data sets together. It covers climate hazards, the exposure 
           of smallholder populations, farms, and crop and livestock enterprises to hazards. It will also look into the vulnerability of these
            populations to climatic risks, impacts on critical commodities in the region, and evidence of the effectiveness of different climate 
            adaptation interventions. The ACASA offers a unique set of tools that can facilitate improved investment targeting and priority setting,
             and support stakeholders' decision-making and investments in agricultural technologies, climate information services, and policies. The 
             intended beneficiaries of this Atlas include governments, insurance and agri-food industries, international and national donors, and 
             adaptation-focused entities.</Typography>
             <Typography sx={{color:'#333333',fontSize:'17px', fontFamily:'revert',marginTop:2, fontWeight:'bold'}}>
             Read more about us:
             </Typography>
             <Typography sx={{color:'#333333', fontFamily:'revert',fontSize:'17px'}}>
             <Link href="https://www.cimmyt.org/projects/atlas-of-climate-adaptation-in-south-asian-agriculture-acasa/" underline="none" color='#4b9e44' target="_blank">
             Atlas of Climate Adaptation in South Asian Agriculture (ACASA) – CIMMYT
             </Link>
             </Typography>
             <Typography sx={{color:'#333333', fontFamily:'revert',fontSize:'17px'}}>
             <Link href="#" underline="none" color='#4b9e44' target="_blank">
             ACASA Brochure
             </Link>
             </Typography>
        </Box>
        <Box  sx={{display: 'flex', flexDirection: 'column',width: { xs: '100%', sm: '30%' },marginTop:2,marginLeft:'6%'}}>
        <Typography variant='h5' sx={{color:'#333333',fontWeight:'bold', fontFamily:'revert'}}>Workstreams</Typography>
        <Zoom in={true}><Paper sx={{ m: 1,ml:0, width: '99%', height:'auto' }} elevation={2}>
        <Box  sx={{display: 'flex', flexDirection: 'row'}}>
        <img src={'work-stream1.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'15px', fontFamily:'revert',margin:2,marginRight:3}}>
                Gridded risk analysis using historical crop yield data and
         satellite signatures; indicators of current and future hazards, exposure, and vulnerabilities</Typography>
         </Box>
        </Paper></Zoom>
        <Zoom in={true} style={{ transitionDelay: '300ms' }}><Paper sx={{ m: 1,ml:0, width: '99%', height:'auto' }} elevation={2}>
        <Box  sx={{display: 'flex', flexDirection: 'row'}}>
        <img src={'work-stream2.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'15px', fontFamily:'revert',margin:2,marginRight:3}}>
        Climate impact on commodities under current and future climate</Typography>
         </Box>
        </Paper></Zoom>
        <Zoom in={true} style={{ transitionDelay: '600ms' }}><Paper sx={{ m: 1,ml:0, width: '99%', height:'auto' }} elevation={2}>
        <Box  sx={{display: 'flex', flexDirection: 'row'}}>
        <img src={'work-stream3.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'15px', fontFamily:'revert',margin:2,marginRight:3}}>
        Decision trees, crop/livestock models, statistical and econometric models, and expert consultations</Typography>
         </Box>
        </Paper></Zoom>
        <Zoom in={true} style={{ transitionDelay: '900ms' }}><Paper sx={{ m: 1,ml:0, width: '99%', height:'auto' }} elevation={2}>
        <Box  sx={{display: 'flex', flexDirection: 'row'}}>
        <img src={'work-stream4.svg'}
                style={logoStyle}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'15px', fontFamily:'revert',margin:2,marginRight:3}}>
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
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
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
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-1.png'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
          Bangladesh Agriculture Research Council (BARC)</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://icar.org.in/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-6.svg'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Indian Council of Agricultural Research (ICAR)</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://narc.gov.np/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-7.svg'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Nepal Agricultural Research Council (NARC)</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://doa.gov.lk/NRMC/" underline="none" target="_blank"> 
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
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
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-10.svg'}
                style={logoStyle3}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        University of Columbia, USA</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://www.ufl.edu/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-11.svg'}
                style={logoStyle4}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        University of Florida, USA</Typography>
         </Box></Paper>
         </Link>
         <Link href="https://www.washington.edu/" underline="none" target="_blank">
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200 }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
        <img src={'south-asia-12.svg'}
                style={logoStyle4}
                alt="risk"/>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        University of Washington, USA</Typography>
         </Box></Paper>
         </Link>
      </Box>
      </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column',width: { xs: '100%', sm: '100%' },paddingBottom:5,paddinTop:5,backgroundColor:'#ffffff'}}>
      <Box sx={{marginLeft:7,marginRight:7,marginTop:4}}>
      <Typography sx={{color:'#111111',fontWeight:'bold',fontSize:'30px', fontFamily:'revert'}}>ACASA Advisory Panel</Typography>
      <Typography sx={{color:'#111111',fontSize:'17px', fontFamily:'revert',marginTop:2,marginBottom:2}}>The advisory panel established under ACASA will have the scientific 
      advisory committee that will identify potential users, use cases in different countries, and guide and review Atlas’ progress.</Typography>
      <Box sx={{display:'flex',flexDirection:'row',width: { xs: '100%', sm: '100%' }}} gap='1vw'>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'18px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Pramod K Joshi</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Ex-Director- International Food Policy Research Institute (IFPRI), India</Typography>
         </Box></Paper>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff'}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Leigh Anderson</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Evans School of Public Policy and Governance, University of Washington, Seattle</Typography>
         </Box></Paper>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Miranda Meuwissen</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Professor of Risk Management and Resilience, Wageningen University, Netherlands</Typography>
         </Box></Paper>
         <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
         <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Michiko Katagami</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Principal Natural Resources and Agriculture Specialist, Asia Development Bank (ADB), Manila</Typography>
         </Box></Paper>
      </Box>
      <Box sx={{display:'flex',flexDirection:'row',width: { xs: '100%', sm: '100%' }}} gap='1vw'>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'18px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      V. Geethalakshmi</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Vice Chancellor, Tamil Nādu Agriculture University, India</Typography>
         </Box></Paper>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff'}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Alex Ruane</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Co-Director, Climate Impacts Group, NASA Goddard Institute for Space Studies (GISS)</Typography>
         </Box></Paper>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Tess Russo</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Senior Program Officer, Bill & Melinda Gates Foundation (BMGF), Seattle</Typography>
         </Box></Paper>
         <Paper sx={{ m: 1,ml:0, width: '21vw', height:200, backgroundColor:'#f7f7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
         <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Pramod Aggarwal</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Project Leader, ACASA; Regional Program Leader, BISA-CIMMYT, Delhi</Typography>
         </Box></Paper>
      </Box>
      <Typography sx={{color:'#111111',fontWeight:'bold',fontSize:'30px', fontFamily:'revert'}}>ACASA Country Team Leads</Typography>
      <Box sx={{display:'flex',flexDirection:'row',width: { xs: '100%', sm: '100%' }}} gap='1vw'>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:220, backgroundColor:'#fff7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'18px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Hasan Md. Hamidur Rahman</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Director, Computer and GIS Unit, Bangladesh Agricultural Research Council (BARC), Bangladesh</Typography>
         </Box></Paper>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:220, backgroundColor:'#fff7ff'}} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      CA Rama Rao</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Principal Scientist, Central Research Institute for Dryland Agriculture, India Council of Agricultural Research (CRIDA-ICAR), Hyderabad, India</Typography>
         </Box></Paper>
      <Paper sx={{ m: 1,ml:0, width: '21vw', height:220, backgroundColor:'#fff7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
      <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
      Roshan B Ojha</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Soil Scientist, National Agricultural Environment Research Centre, Nepal Agricultural Research Council (NARC), Nepal</Typography>
         </Box></Paper>
         <Paper sx={{ m: 1,ml:0, width: '21vw', height:220, backgroundColor:'#fff7ff' }} elevation={0}><Box sx={{display: 'flex', flexDirection: 'column',textAlign: { sm: 'center', md: 'center' }}}>
         <Typography sx={{color:'#333333',fontSize:'17px',fontWeight:'bold',fontFamily:'revert',margin:2}}>
         W.M.U.K Rathnayake</Typography>
        <Typography sx={{color:'#333333',fontSize:'16px',fontFamily:'revert',margin:2,marginRight:3,marginLeft:3}}>
        Director, Natural Resources Management Center (NRMC), Department of Agriculture, Sri Lanka</Typography>
         </Box></Paper>
      </Box>
      </Box>
      </Box>
      </Box>
      <StickyFooter></StickyFooter>
      </div>
    );
};