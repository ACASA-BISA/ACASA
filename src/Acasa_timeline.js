import * as React from 'react';
import { Paper, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';

const logoStyle = {
    width: '18vw',
    height: 'auto',
    margin:'10px',
    marginBottom:'8px',
    padding:'5px',
    border:'3px solid #4b9e44',
    borderRadius:'8px',
  };

export default function Timeline2(

){
    return(
        <div>
        <Timeline position="alternate">
        <TimelineItem>
            <TimelineOppositeContent
            sx={{ mt: '15px' }}
            align="right"
            variant="body2"
            color="text.secondary"
            >
            <Typography>21st August, 2023</Typography>
            <Typography>India</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <img src={'timeline-1.jpg'}
                style={logoStyle}
                alt="Timeline1"/>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Box sx={{padding:'20px',border:1,borderColor:'#4b9e44',height:'auto',width:'25vw'}}>
            <Typography variant="h5" component="span" sx={{color:'#4b9e44',fontWeight:'bold'}}>
            ICAR
            </Typography>
            <Typography sx={{fontWeight:'bold',lineHeight:'22px',fontSize:'18px',color:'#333333',mt:'10px'}}>
            National Workshop on Atlas of Climate Adaptation in South Asian Agriculture (ACASA) inaugurated
            </Typography>
            <Typography sx={{mt:'10px', fontSize:'15px'}}>A two-day national workshop on Atlas of Climate Adaptation in South Asian Agriculture (ACASA), a collaborative project between ICAR and BISA-CIMMYT was inaugurated by Dr S.K. Chaudhari, Deputy Director General (NRM), ICAR at ICAR- Central Research Institute for Dryland Agriculture, Hyderabad.</Typography>
            <Typography sx={{color:'#444444',marginTop:'10px'}}>
            <a href="https://icar.org.in/national-workshop-atlas-climate-adaptation-south-asian-agriculture-acasa-inaugurated" target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}>Read More</a>
            </Typography>
            </Box>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent
            sx={{ mt:'15px' }}
            variant="body2"
            color="text.secondary"
            >
            <Typography>25th – 27th April, 2023</Typography>
            <Typography>India</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <img src={'timeline-2.jpg'}
                style={logoStyle}
                alt="Timeline2"/>
            <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Box sx={{marginLeft:'80px',padding:'20px',border:1,borderColor:'#4b9e44',height:'auto',width:'25vw', textAlign:'left' }}>
            <Typography variant="h5" component="span" sx={{color:'#4b9e44',fontWeight:'bold'}}>
            ICAR
            </Typography>
            <Typography sx={{fontWeight:'bold',lineHeight:'22px',fontSize:'18px',color:'#333333',mt:'10px'}}>
            Project on Climate Adaptation Atlas for South Asia Launched
            </Typography>
            <Typography sx={{mt:'10px',fontSize:'15px'}}>The ICAR in collaboration with the Borlaug Institute for South Asia (BISA-CIMMYT) and the national agricultural research systems of Bangladesh, Nepal and Sri Lanka launched the project Atlas of Climate Adaptation in South Asian Agriculture (ACASA) marking a significant step in south-south cooperation.</Typography>
            <Typography sx={{color:'#444444',marginTop:'10px'}}>
            <a href="https://icar.org.in/project-climate-adaptation-atlas-south-asia-launched" target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}>Read More</a>
            </Typography>
            </Box>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent
            sx={{ mt: '15px' }}
            align="right"
            variant="body2"
            color="text.secondary"
            >
            <Typography>26th April, 2023</Typography>
            <Typography></Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <img src={'timeline-3.png'}
                style={logoStyle}
                alt="Timeline3"/>
            <TimelineConnector />
            <TimelineDot sx={{ml:'calc(9vw + 12px)'}}/>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Box sx={{padding:'20px',border:1,borderColor:'#4b9e44',height:'auto',width:'25vw'}}>
            <Typography variant="h5" component="span" sx={{color:'#4b9e44',fontWeight:'bold'}}>
            AgroSpectrum Asia
            </Typography>
            <Typography sx={{fontWeight:'bold',lineHeight:'22px',fontSize:'18px',color:'#333333',mt:'10px'}}>
            South Asia to get its first Climate Adaptation Atlas in Agriculture
            </Typography>
            <Typography sx={{mt:'10px', fontSize:'15px'}}>BISA-CIMMYT in collaboration with NARS to develop its first Atlas of Climate Adaptation in South Asian Agriculture
            </Typography><Typography sx={{mt:'10px', fontSize:'15px'}}>
            South Asia has diverse climatic zones given its vast physical landscape. However, the region constantly displays the impact of climate change, where the melting of the glaciers, rising sea levels, soil erosion, water intrusion, and forest fires are worsening the overall situation.</Typography>
            <Typography sx={{color:'#444444',marginTop:'10px'}}>
            <a href="https://agrospectrumasia.com/2023/04/26/south-asia-to-get-its-first-climate-adaptation-atlas-in-agriculture.html" target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}>Read More</a>
            </Typography>
            </Box>
            </TimelineContent>
        </TimelineItem>
        </Timeline>
        </div>
    );
}