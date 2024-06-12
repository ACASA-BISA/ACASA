import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LocationOn } from '@mui/icons-material';
import { Popper } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useRef, useState } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { value: 5, label: 'Very High' },
  { value: 10, label: 'High' },
  { value: 15, label: 'Medium' },
  { value: 20, label: 'Low' },
];

const size = {
  width: 150,
  height: 150,
};

const palette = ['#440154','#3b528b','#21918c','#5ec962'];

export default function LocationCard({
    location,
    commodity,
    adaption,
    setHeight1,
    RiskName,
    scenario,
    ImpactName,
}) {
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);
  useEffect(() =>{
    if(cardRef.current){
    setCardHeight(cardRef.current.offsetHeight);
    setHeight1(cardHeight);
    }
  }
  );

  function RiskMethod(){
    let str = 'Estimated Risk';
    if(RiskName==='District Level'||RiskName==='Downscaled Risk') {
      str = 'Measured Risk';
    }
    return str;
  }

  function RiskType(){
    let str = 'Hazard';
    if(RiskName==='Risk Index'||RiskName==='District Level'||RiskName==='Downscaled Risk'){
      str = 'Risk';
    }
    if(RiskName==='Exposure Index'||RiskName==='Number of Farmers'||RiskName==='Cropped Area') {
      str = 'Exposure';
    }
    if(RiskName==='Irrigation'||RiskName==='Water Holding'||RiskName==='Income'||RiskName==='Access to Credit'
    ||RiskName==='Access to Market'||RiskName==='Elevation'||RiskName==='Access to Knowledge') {
      str = 'Vulnerability';
    }
    return str;
  }
    
  return (
    <Popper
    open={true}
      >
        <div ref={cardRef} style={{position:'fixed',right:10,top:90, boxShadow:'0px 0px 0px #aaa',backgroundColor: 'white', border: '0px solid black', width:'250px', borderRadius:'15px' }}>
        <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{justifyItems:'center',alignContent:'center'}}
        > <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>Your Selections</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{marginTop:-1}}>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <LocationOn fontSize='small' color='inherit' />
        <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>
         {location}
        </Typography>
        </Box>
        <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.3, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Commodity:&nbsp;
        </Typography>
        <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>
                    {commodity}
                    </Typography>
        </Box>
        <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Scenario:&nbsp;
        </Typography>
        <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>
                    {scenario}
                    </Typography>
        </Box>
        {adaption !== '' && <div><Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Adaptation Option:&nbsp;</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {adaption}
                    </Typography></Box>
        </div>}
        {RiskName !== '' && <div><Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Risk Method:&nbsp;</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{RiskMethod()}</Typography>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          {RiskType()}:&nbsp;</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{RiskName} (% Area)</Typography>
        </Box>
        </div>}
        {ImpactName !== '' && <div><Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Impact:&nbsp;</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {ImpactName}
                    </Typography></Box>
        </div>}
        <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
            
                    { adaption === '' && RiskName === '' && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#5ec962',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Area under {commodity}
                    </Typography>
                    </Box>
                    </Box>}
                    {adaption !== '' && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#5ec962',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Suitability
                    </Typography>
                    </Box>
                    </Box>}
                    {RiskName !== "" && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Box sx={{width:'100%', display:'flex',alignContent:'center'}}>
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right:10 }}
                      colors={palette}
                      series={[
                        {
                          arcLabel: (item) => `${item.value}`,
                          arcLabelMinAngle: 5,
                          data,
                        },
                      ]}
                      slotProps={{
                        legend: { hidden:true} 
                      }}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      {...size}
                    />
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#440154',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Very high
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#3b528b',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    </Box>
                    </Box>
                    
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#21918c',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#5ec962',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
                    </Box>
                    </Box>
                    </Box>}
        </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
      </Popper>
  );
}
