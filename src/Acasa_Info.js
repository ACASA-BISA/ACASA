import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const logoStyle = {
    width: 'auto',
    height: '35vh',
    marginX:'20px',
    padding:'20px',
    border:'2px solid #ffffff'
  };

export default function Info(

){
    return(
        <div>
            <Box sx={{display:'flex',flexDirection:'column', marginX:'70px',marginY:'20px',gap:'20px'}}>
                <Box sx={{backgroundColor:'#f1f1f1',borderRadius:'8px',display:'flex',flexDirection:'row'}}>
                <Box sx={{marginLeft:'50px',marginY:'20px'}}>
                <img src={'ACASA1.png'}
                style={logoStyle}
                alt="ACASA-REPORT1"/>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', textAlign:'left', padding:'10px',marginX:'50px',marginY:'20px'}}> 
                <Typography variant='h6' sx={{fontWeight:'bold'}}>
                ACASA Use Cases
                </Typography>
                <Typography sx={{marginY:'20px'}}>
                The ACASA project places significant importance on the practical applications of the Atlas. Various stakeholders
                 could utilise Atlas to enhance investment in agricultural adaptation technologies and climate information 
                 services. Drawing from the diverse perspectives of the panellists during the inception meeting, a consolidated
                  report was prepared on how ACASA team and its 
                partners will be prioritising and developing use cases based on geographical and thematic considerations...
                
                </Typography>
                <Typography sx={{color:'#444444',marginTop:'10px'}}>
                <a href="#" target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}>Read More</a>
                </Typography>
                </Box>
                </Box>
                <Box sx={{backgroundColor:'#f1f1f1',borderRadius:'8px',display:'flex',flexDirection:'row'}}>
                <Box sx={{marginLeft:'50px',marginY:'20px'}}>
                <img src={'ACASA2.png'}
                style={logoStyle}
                alt="ACASA-REPORT2"/>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', textAlign:'left', padding:'10px',marginX:'50px',marginY:'20px'}}> 
                <Typography variant='h6' sx={{fontWeight:'bold'}}>
                Production Risk
                </Typography>
                <Typography sx={{marginY:'20px'}}>
                ACASA uses multiple methods at different scales to characterise risk in production. This note describes risk
                 characterisation based on historical production statistics and is illustrated for rice and wheat in India, 
                 cultivated in more than 70 M ha area in the country. It showcases ACASA risk matrix approach based on the
                  intensity 
                and frequency of yield loss derived from historical district-level yield statistics for the last 20 years...
                
                </Typography>
                <Typography sx={{color:'#444444',marginTop:'10px'}}>
                <a href="https://mcusercontent.com/f5e2b90aee260789647f778e4/files/e66b002b-7b5b-7ab7-3629-522dff9cab4e/Production_Risk.pdf" target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}>Read More</a>
                </Typography>
                </Box>
                </Box>
                <Box sx={{backgroundColor:'#f1f1f1',borderRadius:'8px',display:'flex',flexDirection:'row'}}>
                <Box sx={{marginLeft:'50px',marginY:'20px'}}>
                <img src={'ACASA3.png'}
                style={logoStyle}
                alt="ACASA-REPORT3"/>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', textAlign:'left', padding:'10px',marginX:'50px',marginY:'20px'}}> 
                <Typography variant='h6' sx={{fontWeight:'bold'}}>
                Risk by IPCC Framework
                </Typography>
                <Typography sx={{marginY:'20px'}}>
                The Fifth Assessment Report (AR5) of the Intergovernmental Panel on Climate Change (IPCC) has defined risk as a
                 product of the interplay between vulnerability, exposure, and hazard. ACASA is evaluating this 
                 approach as one of the methods to characterize commodity-specific risks by considering spatially explicit 
                 South Asia data on the nature and evolving patterns of climate hazards, the exposure of smallholder populations,
                  farms, and crop and livestock enterprises...
                
                </Typography>
                <Typography sx={{color:'#444444',marginTop:'10px'}}>
                <a href="https://mcusercontent.com/f5e2b90aee260789647f778e4/files/e96af2c0-1e35-f7f1-dd54-080b503a7319/Risk_Method_by_IPCC.pdf" target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}>Read More</a>
                </Typography>
                </Box>
                </Box>
            </Box>
        </div>
    );
}