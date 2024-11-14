import * as React from 'react';
import { Popper, Paper, Typography, Box, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import './font2.css';

export default function Summary_Statistics({

}){
    const [reg, setReg] = React.useState('SA');
    const handleChange = (event) => {
        setReg(event.target.value);
    }
    return(
        <div style={{marginTop:'95px'}}>
            <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <Typography sx={{fontFamily:'Karla'}} fontSize={40}>
                Summary Statistics for&nbsp;
            </Typography>
            <FormControl>
            <Select
                labelId="Region"
                id="region-select-id"
                value={reg}
                onChange={handleChange}
                sx={{
                    fontSize: '40px',
                    fontFamily: 'Karla',
                    height:'70px',
                    border: 'none',               // Removes all borders
                    '& fieldset': {
                        border: 'none',           // Removes the default Material-UI border from outlined variants
                    },
                    borderBottom: '7px solid #aaa', // Applies only a custom bottom border
                    
                }}
            >
                <MenuItem value='SA' sx={{fontSize:'20px',fontFamily:'Karla'}}>South Asia</MenuItem>
                <MenuItem value='AF' sx={{fontSize:'20px',fontFamily:'Karla'}}>Afghanistan</MenuItem>
                <MenuItem value='BD' sx={{fontSize:'20px',fontFamily:'Karla'}}>Bangladesh</MenuItem>
                <MenuItem value='BT' sx={{fontSize:'20px',fontFamily:'Karla'}}>Bhutan</MenuItem>
                <MenuItem value='IN' sx={{fontSize:'20px',fontFamily:'Karla'}}>India</MenuItem>
                <MenuItem value='NP' sx={{fontSize:'20px',fontFamily:'Karla'}}>Nepal</MenuItem>
                <MenuItem value='PK' sx={{fontSize:'20px',fontFamily:'Karla'}}>Pakistan</MenuItem>
                <MenuItem value='LK' sx={{fontSize:'20px',fontFamily:'Karla'}}>Sri Lanka</MenuItem>
                <MenuItem value='MV' sx={{fontSize:'20px',fontFamily:'Karla'}}>Maldives</MenuItem>
            </Select>
            </FormControl>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                
            </Box>
        </div>
    )
};