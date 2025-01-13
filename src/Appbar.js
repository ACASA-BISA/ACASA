import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DrawerMapShow from './DrawerMapShow';
//import MenuIcon from '@mui/icons-material/Menu';
//import { IconButton } from '@mui/material';
import Home from './Home';
import './font.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import ScrollToTop from "./scrolltop";
import Feedback1 from './Feedback';
import Translate from "./Translate"; // Import Translate component

const pages = ['Guide','Explore Data', 'Data at a glance','Data Access','Use Cases','Resources','About Us'];
const pageid = ['guide','viewer', 'analytics','access','usecase','resources','about'];
const AppBarHeight = '85px';

function ResponsiveAppBar({}) {
  const [flag, setflag] = React.useState(null);

  React.useEffect(() => {
    // Function to handle URL changes and set the active page
    const handleUrlChange = () => {
      const sec = window.location.href.indexOf("#");
      const strr = window.location.href.substring(sec + 2);
      if (strr !== "") {
        setflag(strr);
      }
      if (strr === 'hazards'){
        setflag('analytics');
      }
      if (strr === "future"){
        setflag('viewer');
      }
    };
    handleUrlChange();

    // Add event listener for popstate to handle back/forward browser navigation
    window.addEventListener("popstate", handleUrlChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  // Handle the ToggleButtonGroup change event
  // Ref for the "Data at a glance" button
  const GlanceButtonRef = React.useRef(null);
  const ExploreButtonRef = React.useRef(null);

  const handleClick = (event, newvalue) => {
    if (newvalue !== null) {
      setflag(newvalue);
    }
  };

  // Handle the click event for the home button
  const handleHomeClick = () => {
    setflag(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(GlanceButtonRef.current);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser2, setAnchorElUser2] = React.useState(null);

  const handleOpenUserMenu2 = (event) => {
    setAnchorElUser2(ExploreButtonRef.current);
  };

  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };

  // Styled ToggleButton with custom styles
  const MyButton = styled(ToggleButton)({
    boxShadow: "none",
    textTransform: "none",
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
      boxShadow: "none",
      backgroundColor: "#fece2f",
    },
  });

  // Styled Button with custom styles for images
  const ImgButton = styled(Button)({
    boxShadow: "none",
    borderRadius: 0,
    border: "0px solid",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: "none",
      backgroundColor: "#ffffff",
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
                  height:'18px',
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
              <div>
               {(page!=='Data at a glance' && page!=='Explore Data') && 
               <MyButton 
                value={pageid[index]}
                sx={{ paddingRight:2, paddingLeft:2,paddingTop:1,paddingBottom:1}}
                key={pageid[index]}
                href={"/#/".concat(pageid[index])}
              >
                <Typography textAlign="center" sx={{fontSize:'14px',fontWeight:700,color:'#000', fontFamily:"Karla"}}>
                  <div >
                    {page}
                  </div>
                </Typography>
               </MyButton>}
               
               {page==='Explore Data' &&
               <div ref={ExploreButtonRef}>
                <MyButton 
                  value={pageid[index]}
                  sx={{ paddingRight:2, paddingLeft:2,paddingTop:1,paddingBottom:1,
                    backgroundColor: Boolean(anchorElUser2) ? '#f5f3ed' : '#ffffff',  // Darkens when menu is open
                  }}
                  key={pageid[index]}
                  onMouseEnter={handleOpenUserMenu2} 
                  //onClick={handleOpenUserMenu}  
                  onMouseLeave={handleCloseUserMenu2}
                  aria-owns={Boolean(anchorElUser2) ? "menu-appbar-explore" : undefined}
                  aria-haspopup="true"
                >
                
                  <Typography textAlign="center" sx={{fontSize:'14px',fontWeight:700,color:'#000', fontFamily:"Karla"}}>
                    <div >
                      {page}
                    </div>
                  </Typography> 
                </MyButton>
                <Menu
                    //sx={{ mt: '45px' }}
                    //sx={{pointerEvents:'none'}}
                    id="menu-appbar-explore"
                    anchorEl={anchorElUser2}
                    open={Boolean(anchorElUser2)}
                    onClose={handleCloseUserMenu2}
                    onClick={handleCloseUserMenu2}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    //MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
                  >
                    {/* {opts.map((setting) => (<div></div>))} */}
                      <a href="/#/viewer" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Linear Exploration</Typography>
                      </MenuItem>
                      </a>
                      <a href="/#/future" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                          <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Comparative Exploration</Typography>  
                      </MenuItem>
                      </a>
                  </Menu>
                </div>}

               {page==='Data at a glance' &&
               <div ref={GlanceButtonRef}>
                <MyButton 
                  value={pageid[index]}
                  sx={{ paddingRight:2, paddingLeft:2,paddingTop:1,paddingBottom:1,
                    backgroundColor: Boolean(anchorElUser) ? '#f5f3ed' : '#ffffff',  // Darkens when menu is open
                  }}
                  key={pageid[index]}
                  onMouseEnter={handleOpenUserMenu} 
                  //onClick={handleOpenUserMenu}  
                  onMouseLeave={handleCloseUserMenu}
                  aria-owns={Boolean(anchorElUser) ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                >
                
                  <Typography textAlign="center" sx={{fontSize:'14px',fontWeight:700,color:'#000', fontFamily:"Karla"}}>
                    <div >
                      {page}
                    </div>
                  </Typography> 
                </MyButton>
                <Menu
                    //sx={{ mt: '45px' }}
                    //sx={{pointerEvents:'none'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    onClick={handleCloseUserMenu}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    //MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
                  >
                    {/* {opts.map((setting) => (<div></div>))} */}
                      <a href="/#/hazards" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Hazards at a glance</Typography>
                      </MenuItem>
                      </a>
                      <a href="/#/analytics" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                          <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Adaptation at a glance</Typography>  
                      </MenuItem>
                      </a>
                      <a href="/#/summary" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Summary Statistics</Typography>
                      </MenuItem>
                      </a>
                      <a href="/#/comparison" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Comparison</Typography>
                      </MenuItem>
                      </a>
                      <a href="/#/timeline" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Timeline</Typography>
                      </MenuItem>
                      </a>
                      <a href="/#/adaptation" style={{textDecoration: 'none'}}>
                      <MenuItem onClick={handleClick}>
                        <Typography textAlign="center" fontSize={13} color='#222222' sx={{fontFamily:"Karla",fontWeight:350}}>Adaptation Analytics</Typography>
                      </MenuItem>
                      </a>
                  </Menu>
                </div>}
              </div>
              
            ))}
            </ToggleButtonGroup>
            
            <Button sx={{paddingRight:2, paddingLeft:2,margin:0,border:'1px solid #aaa',marginLeft:2}}
              href={"/#/feedback"}>
              <Typography textAlign="center" sx={{fontSize:'14px',fontFamily:'revert',textTransform:'none', fontFamily:"Karla"}}>Feedback</Typography>
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
                            path="/hazards"
                            element={<DrawerMapShow activeBar='hazards'/>}
                        ></Route>
                        <Route
                            path="/future"
                            element={<DrawerMapShow activeBar='future'/>}
                        ></Route>
                        <Route
                            path="/comparison"
                            element={<DrawerMapShow activeBar='comparison'/>}
                        ></Route>
                        <Route
                            path="/summary"
                            element={<DrawerMapShow activeBar='summary'/>}
                        ></Route>
                        <Route
                            path="/timeline"
                            element={<DrawerMapShow activeBar='timeline'/>}
                        ></Route>
                        <Route
                            path="/adaptation"
                            element={<DrawerMapShow activeBar='adaptation'/>}
                        ></Route>
                        <Route
                            path="/feedback"
                            element={<Feedback1 />}
                        ></Route>
    </Routes>
    
    <ScrollToTop />
    </Router>
    </div>
  );
}

export default ResponsiveAppBar;
