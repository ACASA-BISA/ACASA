import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AgricultureOutlined, HomeOutlined, LocationOnOutlined, PollOutlined } from '@mui/icons-material';
import SwitchCom from './Switch_Commodity';
import SwitchLoc from './Switch_Location';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import { Popper } from '@mui/material';
import SwitchAnalytics from './Switch_Analytics';

const Items = ['Home', 'Location', 'Commodity', 'Analytics'];

export default function DrawerA({
  activeCrop,
  changeCrop,
  LocationData,
  activeRegion,
  changeRegion
}) {
    
    function createInitialTodos() {
    const initialTodos = {};
    Items.forEach((sname,index) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
    }
  
    const [open, setOpen] = React.useState(
      createInitialTodos
    );

    const [DrOpen, setDrOpen] = React.useState(false);
    
    const top_margin = 90;
    const toggleList = (name) => (event) => {
      const newState = { ...open };
      Items.forEach((sname) => {
      newState[sname] = sname === name;
      });
      setOpen(newState);
      if(newState['Home']===true){
        setDrOpen(false);
      }
      else{
      setDrOpen(true);
      }
    };
    const handleClickAway = () => {
      const newState = { ...open };
      Items.forEach((sname) => {
      newState[sname] = false;
      });
      setOpen(newState);
      setDrOpen(false);
    };

  return (
        <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
        >
        <div>
        <List >
        {Items.map((Item,index)=>(
          <Popper open={true}>
          <div style={{position:'absolute',left:10,top:top_margin+index*90,margin:0,padding:5, boxShadow:'0px 0px 0px #aaa',backgroundColor: '#143200', border: '0px solid black', width:110, borderRadius:'5px',}}>
          <ListItem key={Item} onClick={toggleList(Item)} disablePadding sx={{color: 'white', '&:hover': { backgroundColor: '#fece2f' },}}>
           <ListItemButton>
           <Box  sx={{width:'100%', flexDirection: 'column', display:"flex", textAlign: { sm: 'left', md: 'left' } }}>
            <ListItemIcon sx={{color: 'inherit', fontSize: '20px'}}>
              { index===0 && <HomeOutlined color='inherit' fontSize='inherit'/>}
              { index===1 && <LocationOnOutlined color='inherit' fontSize='inherit'/>}
              { index===2 && <AgricultureOutlined color='inherit' fontSize='inherit'/>}
              { index===3 && <PollOutlined color='inherit' fontSize='inherit'/>} 
            </ListItemIcon>
           <ListItemText primary={Item} primaryTypographyProps={{ fontSize: '14px',fontWeight:'normal',}}/>
           </Box>
          </ListItemButton>
        </ListItem>
        </div>
        </Popper>
        ))}
      </List> 
        <Fade in={DrOpen}>
        <Drawer variant='persistent' anchor='left' open={DrOpen} onClose={handleClickAway} 
        sx={{
            flexShrink: 0,
            overflow:'auto',
            whiteSpace: 'nowrap',
            '& .MuiDrawer-paper': {
            width: 100*3,
            height: "83vh",
            boxSizing: 'border-box',
            marginLeft: '145px',
            marginTop: '90px',
            borderLeft: 5,
            borderLeftColor: '#fece2f',
            background:'#ffffff',
            borderRadius:'10px'
            },
        }}
        >
        {open.Commodity === true && <SwitchCom activeCrop={activeCrop} changeCrop={changeCrop}></SwitchCom>}
        {open.Location === true && <SwitchLoc activeRegion={activeRegion} changeRegion={changeRegion} countryStateMap={LocationData}></SwitchLoc>}
        {open.Analytics === true && <SwitchAnalytics activeCrop={activeCrop} ></SwitchAnalytics>}
        {open.Home === true && (window.location.href = "/")}
        </Drawer>
        </Fade>
        </div>
        </ClickAwayListener>
  );
}
