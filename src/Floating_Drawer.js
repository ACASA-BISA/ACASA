import * as React from 'react';
import { Popper } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListOutlined, HomeOutlined, LocationOnOutlined, SearchOutlined, PollOutlined } from '@mui/icons-material';

const Items = ['Home'];

export default function Floating_drawer({
    activeCrop,
    activeRegion
}){

    function createInitialTodos() {
        const initialTodos = {};
        Items.forEach((sname) => {
          initialTodos[sname] = false;
        });
        return initialTodos;
        };
    
    const [open, setOpen] = React.useState(
        createInitialTodos
        );

    const toggleList = (name) => (event) => {
      const newState = { ...open };
      Items.forEach((sname) => {
      newState[sname] = sname === name;
      });
      setOpen(newState);
    };

    const top_margin = 90;


    return(    
        <List >
            {Items.map((Item,index)=>(
            <div>
            <Popper open={true}>
            <div style={{position:'fixed',left:10,top:top_margin+index*90,margin:5,padding:5, boxShadow:'0px 0px 0px #aaa',backgroundColor: '#143200', border: '0px solid black', width:100, borderRadius:'5px' }}>
                    <ListItem key={Item} onClick={toggleList(Item)} disablePadding sx={{color: 'white', '&:hover': { backgroundColor: '#fece2f' },}}>
                    <ListItemButton>
                        <Box  sx={{ flexDirection: 'column', display:"flex",flexDirection:'column',fontSize:'20px' }}>
                            { index===0 && <HomeOutlined color='inherit' fontSize='inherit'/>}
                            { index===1 && <LocationOnOutlined color='inherit' fontSize='inherit'/>}
                            { index===2 && <ListOutlined color='inherit' fontSize='inherit'/>}
                            { index===3 && <SearchOutlined color='inherit' fontSize='inherit'/>}
                            { index===4 && <PollOutlined color='inherit' fontSize='inherit'/>}
                        <ListItemText primary={Item} primaryTypographyProps={{ fontSize: '14px',fontWeight:'normal'}}/>
                        </Box>
                    </ListItemButton>
                </ListItem>
            </div>
            {open['Home'] === true && (window.location.href = "/")}
            </Popper>
            </div>
            ))}  
        </List> 
    );
}