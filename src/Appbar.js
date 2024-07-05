import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
//import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DrawerMapShow from './DrawerMapShow';
//import MenuIcon from '@mui/icons-material/Menu';
//import { IconButton } from '@mui/material';
import Home from './Home';
import './font.css';
import Divider from '@mui/material/Divider';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { transform } from 'ol/proj';
import Feedback1 from './Feedback';
import Translate from "./Translate"; // Import Translate component

const pages = ['Guide','Explore Data', 'Adaptation at a glance','Data Access','Use Cases','Resources','About Us'];
const pageid = ['guide','viewer', 'analytics','access','usecase','resources','about'];
const AppBarHeight = '90px';

function ResponsiveAppBar({

}) {
  
  
  const [flag, setflag] = React.useState(null);
  
  React.useEffect(() => {
    const handleUrlChange = () => {
      const sec = window.location.href.indexOf('#');
      const strr = window.location.href.substring(sec + 2);
      if (strr !== '') {
        setflag(strr);
      }
    };
    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);
  //const [home, sethome] = React.useState(true);
/*   function setflagfunc(){
    let strr = window.location.href.substring(1);
    if(strr!==''){
      setflag(strr);
    }
    console.log(window.location.href);
  }

  setflagfunc(); */

  const handleClick = (event, newvalue) => {
    if (newvalue !== null) {
        setflag(newvalue);
      }
  };

  const handleHomeClick = () => {
    setflag(null);
  }

  const MyButton = styled(ToggleButton)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 15,
    fontWeight:'normal',
    color:'#333',
    paddingRight:2, 
    paddingLeft:2,
    borderRadius:0,
    border: '0px solid',
    backgroundColor: '#ffffff',
    //borderColor: '#0063cc',
    '&:hover': {
      backgroundColor: '#f5f3ed',
      //borderColor: '#0062cc',
      boxShadow: 'none',
      color: '#000',
      
      //fontWeight: 'bold',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: 'none',
      backgroundColor: '#fece2f',
      //borderColor: '#005cbf',
    },
  });

  const ImgButton = styled(Button )({
    boxShadow: 'none',
    borderRadius:0,
    border: '0px solid',
    backgroundColor: '#ffffff',
    //borderColor: '#0063cc',
    '&:hover': {
      backgroundColor: '#ffffff',
      //borderColor: '#0062cc',
      boxShadow: 'none',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: 'none',
      backgroundColor: '#ffffff',
      //borderColor: '#005cbf',
    },
  });

  return (
    <div>
    <Router>
    <AppBar position="fixed" sx={{bgcolor:'white',zIndex: (theme) => theme.zIndex.drawer + 1, height:AppBarHeight,boxShadow: '0px 0px 4px #aaa'}}>
      {/* <Divider sx={{bgcolor:'#4b9e44', borderBottomWidth: 8, margin:0}}/> */}
      <Box sx={{display:'flex',flexDirection:'column'}}>
      <Box
                sx={{
                  display: "flex",
                  flexGrow: -1,
                  alignItems: "right",
                  justifyItems: "right",
                  justifyContent:'right',
                  width:'100%',
                  height:'20px',
                  boxShadow:'-2px #ccc',
                  backgroundColor:'#4b9e44',
                }}
              >
                <Translate />
         </Box>
      
        <Toolbar disableGutters>
        <Box sx={{  display: 'flex' , flexGrow: 0, flexDirection:'column'}}>
        <Button
              size="small"
              href=''
              color="inherit"
              key='Acasa'
              onClick={handleHomeClick}
              >
             <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Avatar variant="square" alt="Remy Sharp" src="./Acasa_Logo_colored 2.svg" sx={{width:'auto',height:'60px'}}/>
              </Link>
            </Button>
            
        </Box>
        
        <Box display="flex"
            justifyContent="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <ToggleButtonGroup
            value={flag}
            exclusive
            onChange={handleClick}
            >
            {pages.map((page,index) => (
              <MyButton 
                value={pageid[index]}
                sx={{ paddingRight:2, paddingLeft:2,paddingTop:1,paddingBottom:1}}
                key={pageid[index]}
                href={"/#/".concat(pageid[index])}
              >
                <Typography textAlign="center" sx={{fontSize:'14px',fontWeight:'bold',color:'#000'}} className='fira-sans-condensed-medium'>
                  <div >
                  {page}
                  </div>
               </Typography>
              </MyButton>
            ))}
            </ToggleButtonGroup>
            <Button sx={{paddingRight:2, paddingLeft:2,margin:0,border:'1px solid #aaa',marginLeft:2}}
              href={"/#/feedback"}>
              <Typography textAlign="center" sx={{fontSize:'14px',fontFamily:'revert',textTransform:'none'}}>Feedback</Typography>
            </Button>
          </Box>
          <Box sx={{display: 'flex' , flexGrow: 0,display: { xs: 'none', md: 'flex' },flexDirection:'column'}}>
          
          <ImgButton
              size="small"
              href='https://bisa.org/'
              color="inherit"
              key='Bisa'
              >
             <Avatar variant="square" alt="Remy Sharp" src="./BISA.png" sx={{width:'auto',height:'50px'}}/>
            </ImgButton>
          </Box>
          <Box sx={{  display: 'flex' , flexGrow: 0,display: { xs: 'flex', md: 'none' }}}>
          </Box>
        </Toolbar>
        </Box>
    </AppBar>
    <Routes>
                        <Route
                            path="/"
                            element={<Home></Home>}
                        ></Route>
                        <Route
                            path="/about"
                            element={<DrawerMapShow activeBar='about'/>}
                        ></Route>
                        <Route
                            path="/viewer"
                            element={<DrawerMapShow activeBar='viewer'/>}
                        ></Route>
                        <Route
                            path="/analytics"
                            element={<DrawerMapShow activeBar='analytics'/>}
                        ></Route>
                        <Route
                            path="/access"
                            element={<DrawerMapShow activeBar='access'/>}
                        ></Route>
                        <Route
                            path="/resources"
                            element={<DrawerMapShow activeBar='resources'/>}
                        ></Route>
                        <Route
                            path="/usecase"
                            element={<DrawerMapShow activeBar='usecase'/>}
                        ></Route>
                        <Route
                            path="/guide"
                            element={<DrawerMapShow activeBar='guide'/>}
                        ></Route>
                        <Route
                            path="/feedback"
                            element={<Feedback1 />}
                        ></Route>
    </Routes>
    </Router>
    </div>
  );
}
export default ResponsiveAppBar;