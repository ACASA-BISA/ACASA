import * as React from 'react';
//import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Popper } from '@mui/material';
//import Divider from '@mui/material/Divider';


export default function ScenarioCard({
    scenario
}) {
    
  return (
    <Popper
    open={true}
      >
        <div style={{position:'fixed',right:255,top:90, boxShadow:'0px 0px 1px #aaa',backgroundColor: 'rgba(14, 33, 1, 0.6)', border: '0px solid black', width:'200px', borderRadius:'5px',padding:'5px'}}>
    
        <Typography sx={{ fontSize: 15, marginLeft:1,marginY:0.5, fontWeight:'bold' }} color="white" gutterBottom>
          Scenario <Typography sx={{ fontSize: 14, }} color="white" gutterBottom>
                    {scenario}
                    </Typography>
        </Typography>

        </div>
      </Popper>
  );
}
