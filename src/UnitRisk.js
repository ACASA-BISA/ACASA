import * as React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Popper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UnitCard({
    activeCrop,
    activeRisk,
    heightnext
}) {

  const unitrisk = {'Risk Index': 'The risk index is derived from hazard, exposure and vulnerability indices', 
    'Hazard Index': 'Integrated index which combines multiple hazards', 
    'Low temperature induced spikelet sterility': 'Number of days with low temperature during anthesis period leading to spikelet sterility', 
    'Untimely Rainfall': 'Number of untimely rainfall days during the crop season ', 
    'Low temperature induced pollen sterility': 'Number of days with low temperature during pollination under leading to pollen sterility ', 
    'High temperature induced pollen sterility': 'Number of days with high temperature during pollination under leading to pollen sterility ', 
    'Heat Stress': 'Number of days with high temperature ', 
    'High temperature induced spikelet sterility': 'Number of days with high temperature during anthesis period leading to spikelet sterility ', 
    'Cold Stress': 'Number of days with low temperature ', 
    'Low temperature induced tuberization failure': 'Number of days with low temperature leading to tuberization failure ', 
    'Terminal Heat': 'Number of days with high temperature during grain-filling phase',
     'Days of Frost': 'Number of frost days ', 'Excess Rainfall and Waterlogging': 'Number of excess rainfall days leading to waterlogging ', 
     'Delayed Monsoon': 'Percentage of years with delayed monsoon', 'Drought': 'Number of years with moderate or severe drought', 
     'Dry Spell': 'Number of dry spells ', 'Flood': 'Number of flood events', 'Lodging': 'Number of days under high wind and rainfall after booting phase', 
     'Biotic': 'Number of days with high temperature and humidity leading to blight',
     'Excess Rainfall': 'Number of excess rainfall days during the crop season', 
     'Temperature-Humidity Index': 'Number of days with high THI', 'Hot days': 'Number of days with high temperature ', 
     'Cold days': 'Number of days with low temperature ', 'Extreme Rainfall days': ' Number of excess rainfall days ',
     'Rainfall Deficit': 'Percentage of years with rainfall deficit', 'Cyclone': 'Degree of cyclone proneness', 
     'Number of Animals per grid': 'Total number of animals per grid [~5 X 5 km]', 
     'Vulnerability Index': 'Integrated index which combines multiple vulnerability layers',
     'Irrigation': 'Area under irrigation per grid, %', 'Soil Water Holding Capacity': 'Available Water in mm/m ', 
     'Soil Organic Carbon': 'Soil Organic Carbon in % ', 'Income': 'Agricultural GDP as proxy for income. Agricultural Gross Domestic Product data in US $ per grid [~5 X 5 km]', 
     'Rural infrastructure': 'Road density used as proxy for rural infrastructure. Road density is length of rural roads per grid, km/grid', 
     'Socio-economic Development Indicator': 'HDI used as proxy. Global estimates of the United Nations Human Development Index',
     'Availability of crop residues': 'Production and Usage of cereal residues in tonnes per grid [~5 X 5 km]',
     'Cropped Area': 'Area under crop in hectares per grid [~5 X 5 km]'};

  return (
    <Popper
    open={true} >
        <div style={{position:'fixed',right:10,top:heightnext+100, boxShadow:'0px 0px 0px #aaa',backgroundColor: 'white', border: '0px solid black', width:'280px', borderRadius:'15px' }}>
        <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{justifyItems:'center',alignContent:'center'}}
        > <SettingsSuggestIcon fontSize='small' color='inherit' />
        <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>
         Unit
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography sx={{ fontSize: 14 ,marginTop:'-10px'}} color="black" gutterBottom>
          {unitrisk[activeRisk]}
        </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
      </Popper>
  );
}
