import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { GrassOutlined, HomeOutlined, LocationOnOutlined, AccessTimeOutlined } from '@mui/icons-material';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import SwitchCom from './Switch_Commodity';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TuneIcon from '@mui/icons-material/Tune';
import SwitchLoc from './Switch_Location';
import SwitchOpt from './Switch_Options';
import {Popper, Typography} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SwitchRisk2 from './Switch_Risk2';
import SwitchImpact from './Switch_Impact';
import SwitchScenario from './Switch_Scenario';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import './font.css';
import './font2.css';

const top_margin = 95;
let extra = 0;
const Items = ['Go to Home', 'Select Region','Select Commodity','Select Scenario','Climatic Risks','Suitability','Impact','Adaptation Options'];
const Items2 = ['Home', 'Region','Commodity','Scenario','Risks','Suitability','Impact','Adaptation'];

export default function DrawerV({
  activeCrop,
  activeScenario,
  changeScenario,
  changeCrop,
  LocationData,
  activeRegion,
  changeRegion,
  activeOpt,
  changeOpt,
  CurrRisk,
  changeRisk,
  activeImpact,
  changeImpact,
  activeOptLayer,
  changeOptLayer
}) {
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

    // Calculate custom height dynamically
    const calculateTabHeight = () => {
      const totalHeight = window.innerHeight; // Get the viewport height
      let calculatedHeight = (totalHeight - 190) / 8; // Subtract 95px and divide by 3
      //return `${calculatedHeight}px`; // Return as a string with 'px'
      calculatedHeight = calculatedHeight > 60 ? 60 : calculatedHeight;
      return calculatedHeight;
    };
    
    const [DrOpen, setDrOpen] = React.useState(false);
    const [widthh, setWidth] = React.useState('190px');
    const [vextra, setvextra] = React.useState(0);
    const [heightdrawer, setheightdrawer] = React.useState(calculateTabHeight());

    const toggleList = (name) => (event) => {
      const newState = { ...open };
      Items.forEach((sname) => {
      newState[sname] = sname === name;
      });
      setOpen(newState);
      if(name==='Climatic Risks'){
        extra = 0;
      }
      else{
        extra = 0;
      }
      if(newState['Go to Home']===true){
        setDrOpen(false);
      }
      else{
      setDrOpen(true);
      }
    };
    function colorofbutton(Item){
      let normally = 'rgba(14, 33, 1, 0.0)';
      if(open[Item]){
        normally = 'rgba(10, 30, 1, 0.9)';
      }
      return normally;
    };
    const handleClickAway = () => {
      const newState = { ...open };
      Items.forEach((sname) => {
      newState[sname] = false;
      });
      setOpen(newState);
      setDrOpen(false);
      extra = 0;
    };

    // Recalculate height when the window resizes
    React.useEffect(() => {
      const handleResize = () => {
        setheightdrawer(calculateTabHeight());
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize); // Cleanup on unmount
      };
    }, []);

    React.useEffect(() => {
      if(DrOpen===true){
        setWidth('53px');
        setvextra(2);
        setheightdrawer(calculateTabHeight()-12);
      }
      else{
        setWidth('190px');
        setvextra(0);
        setheightdrawer(calculateTabHeight());
      }
    },[DrOpen]);

    function topmarg(cidx){
      let marg = top_margin-3;
      /* if(cidx===1){
        marg = marg + 48;
      }
      else if (cidx>0){
        marg = marg + (cidx-1)*67 + 48;
      } */
      marg = marg + cidx*(calculateTabHeight() + 10 + vextra);
      return marg;
    }

    const LightTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,
      },
    }));

  return (
    <div style={{overflow:'hidden',height:'auto'}}>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
        > 
      <div style={{overflow:'hidden'}}>
        <List>
        {Items.map((Item,index)=>(
          <Popper open={true}>
          <div style={{position:'relative',zIndex:(theme) => theme.zIndex.map + 1,left:10,top:topmarg(index),margin:4,padding:2,
          boxShadow:'0px 0px 0px #aaa',backgroundColor: 'rgba(14, 33, 1, 0.7)', border: '0px solid black', width:widthh, height:heightdrawer, borderRadius:'3px' }}>
          <ListItem key={Item} onClick={toggleList(Item)} disablePadding sx={{color:'#ffffff', '&:hover': { backgroundColor: '#fece2f' },backgroundColor:colorofbutton(Item),height:'100%'}}>
           <ListItemButton>
           <Box  sx={{ display:'flex', flexDirection: 'row'}}>
              { //index===0 && <LightTooltip open={(isShown1&&DrOpen)} title="Home" placement="top" arrow><HomeOutlined onMouseEnter={() => setIsShown1(true)} onMouseLeave={() => setIsShown1(false)}
              // sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>
              }
{/*           { index===0 && <LightTooltip title="Home" placement="top" arrow><HomeOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>}
              { index===1 && <LightTooltip title="Region" placement="top" arrow><LocationOnOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>}
              { index===2 && <LightTooltip title="Commodity" placement="top" arrow><GrassOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>}
              { index===4 && <LightTooltip title="Climatic Risks" placement="top" arrow><WarningAmberIcon sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>} 
              { index===3 && <LightTooltip title="Scenario" placement="top" arrow><AccessTimeOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>} 
              { index===5 && <LightTooltip title="Impact" placement="top" arrow><AutoAwesomeIcon sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>} 
              { index===6 && <LightTooltip title="Adaptation Options" placement="top" arrow><TuneIcon sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/></LightTooltip>} */} 
              { index===0 && <HomeOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>}
              { index===1 && <LocationOnOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>}
              { index===2 && <GrassOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>}
              { index===4 && <WarningAmberIcon sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>} 
              { index===3 && <AccessTimeOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>} 
              { index===5 && <YardOutlinedIcon  sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}></YardOutlinedIcon>}
              { index===6 && <AutoAwesomeIcon sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>} 
              { index===7 && <TuneIcon sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>} 
              {/* index===7 && <PollOutlined sx={{marginY:'auto',padding:0,fontSize:'20px',color:'#ffffff'}}/>*/}  
              { DrOpen===false && <Typography sx={{fontSize: '13px',fontWeight:'bold',marginLeft:1.5,padding:0,fontFamily:'Karla'}}>{Item}</Typography>}
           </Box>
          </ListItemButton>
        </ListItem>
        </div>
        </Popper>
        ))}
      </List> 

      { DrOpen===true &&  <List>
        {Items2.map((Item,index)=>(
          <Popper open={DrOpen} transition='fade'>
          <div style={{position:'relative',zIndex:(theme) => theme.zIndex.map + 1,left:1,top:topmarg(index)+heightdrawer,margin:4,padding:3, 
          boxShadow:'0px 1px 0px #aaa',backgroundColor: 'rgba(220, 220, 220, 1)', border: '0px solid #fece2f', width:'72px', height:'15px', borderRadius:'3px' }}>
          <ListItem key={Item}  disablePadding sx={{color:'#000000', height:'100%'}}>
           <Box  sx={{ display:'flex', flexDirection: 'row',width:'100%'}}>
              <Typography sx={{fontSize: '12px',fontWeight:'bold',marginX:'auto',padding:0,fontFamily:'Karla'}}>{Item}</Typography>
           </Box>
        </ListItem>
        </div>
        </Popper>
        ))}
      </List> }
     
        <Fade in={DrOpen}>
        <Drawer variant='persistent' anchor='left' open={DrOpen} onClose={handleClickAway} 
        sx={{
            flexShrink: 0,
            overflow:'auto',
            whiteSpace: 'nowrap',
            '& .MuiDrawer-paper': {
            width: 280+extra,
            height: 'calc(100vh - 100px)',
            boxSizing: 'border-box',
            marginLeft: '85px',
            marginTop: '95px',
            marginBottom: '0px',
            borderLeft: 5,
            borderLeftColor: '#fece2f',
            background:'rgba(255,255,255,0.8)',
            borderRadius:'10px'
            },
        }}
        >
        {open['Select Commodity'] === true && <SwitchCom activeCrop={activeCrop} changeCrop={changeCrop}></SwitchCom>}
        {open['Select Region'] === true && <SwitchLoc activeRegion={activeRegion} changeRegion={changeRegion} countryStateMap={LocationData}></SwitchLoc>}
        {open['Adaptation Options'] === true && <SwitchOpt activeCrop={activeCrop} activeOpt={activeOpt} changeOpt={changeOpt} activeOptLayer={activeOptLayer}
        changeOptLayer={changeOptLayer}></SwitchOpt>}
        {open['Climatic Risks'] === true && <SwitchRisk2 activeCrop={activeCrop} changeRisk={changeRisk} activeScenario={activeScenario} CurrRisk={CurrRisk}></SwitchRisk2>}
        {open['Impact'] === true && <SwitchImpact activeImpact={activeImpact} changeImpact={changeImpact}></SwitchImpact>}
        {open['Go to Home'] === true && (window.location.href = "/")}
        {open['Select Scenario'] === true && <SwitchScenario activeScenario={activeScenario} changeScenario={changeScenario}></SwitchScenario>}
        </Drawer>
        </Fade>
        </div>
      </ClickAwayListener>
      </div>
    
  );
}
