import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Popper, Paper , Grid} from '@mui/material';

export default function Selection_bar({
    location,
    commodity,
    adaption,
    RiskName,
    scenario,
    ImpactName,
    modelName,
    exploreType
}) {
  

      function checkcrop() {
        const diffcrop = ['Cattle','Buffalo','Goat','Sheep','Pig','Poultry'];
        let ans = true;
        diffcrop.forEach((sname) => {
          if(commodity===sname){
            ans = false;
          }
        })
        return ans;
      };

    function RiskType(){
        let str = 'Hazard';
        if(RiskName==='Risk Index'){
        str = 'Risk';
        }
        if(RiskName==='Exposure Index'||RiskName==='Number of Animals per grid'||RiskName==='Cropped Area') {
        str = 'Exposure';
        }
        if(RiskName==='Vulnerability Index'||RiskName==='Irrigation'||RiskName==='Soil Water Holding Capacity'||RiskName==='Agriculture Income'||RiskName==='Soil Organic Carbon'
        ||RiskName==='Feed/Fodder'||RiskName==='Rural infrastructure'||RiskName==='Economic Development Indicator') {
        str = 'Vulnerability';
        }
        return str;
    }
    
  return (
    <div style={{overflow:'hidden'}}>
      <Grid container spacing={1} sx={{marginTop:'80px',paddingX: '1rem',marginLeft:'210px'}} columns={12}>
      <Grid item xs={12}>
        <Box sx={{display:'flex',flexDirection:'row'}}>
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>
                {location}
                </Typography>
            </Box>
            
            {exploreType === 'Commodity' && <Box sx={{display:'flex',flexDirection:'row'}}>
              <ChevronRightIcon/>
                <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                Commodity:&nbsp;
                </Typography>
                <Typography sx={{ fontSize: 14, }} color="text.secondary" >
                {commodity}
                </Typography>
            </Box>}
            <ChevronRightIcon/>
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                Scenario:&nbsp;
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                {scenario}
                </Typography>
            </Box>
            <ChevronRightIcon/>
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                Model:&nbsp;
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                {modelName}
                </Typography>
            </Box>
            {adaption !== '' &&
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <ChevronRightIcon/>
                <Typography sx={{ fontSize: 14 }} color="black">
                <strong>{adaption.charAt(0).toUpperCase()+adaption.slice(1,4)+adaption.toLowerCase().slice(4)}</strong>
                </Typography>
            </Box>}
            {RiskName !== '' && 
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <ChevronRightIcon/>
                <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                {RiskType()}:&nbsp;
                </Typography>
                <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                {RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}&nbsp;
                </Typography>
            </Box>
            }
            {ImpactName !== '' &&
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <ChevronRightIcon/>
                <Typography sx={{ fontSize: 14 }} color="black" >
                Impact:&nbsp;
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                {ImpactName.charAt(0).toUpperCase() + ImpactName.toLowerCase().slice(1)}
                </Typography>
            </Box>}
        </Box>
      </Grid>
    </Grid>
    </div>
  );
}
