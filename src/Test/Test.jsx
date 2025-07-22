import React, { useState } from "react";
import './Test.css';
import { Button } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Switch,
    Typography,
    FormGroup,
    List,
    Box,
    TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';

const drawerWidth = 254;

function LayoutIcon(props) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18266 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2712 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.5439 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z" />
        </svg>
    );
}
function Test() {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [age, setAge] = React.useState('');

  const handleChanges = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [isSidebarOpen1, setIsSidebarOpen1] = React.useState(false);
    const [isSidebarOpen2, setIsSidebarOpen2] = React.useState(false);
    const [isSidebarOpen3, setIsSidebarOpen3] = React.useState(false);
    const [isSidebarOpen4, setIsSidebarOpen4] = React.useState(false);
    const [isSidebarOpen5, setIsSidebarOpen5] = React.useState(false);
    const [isSidebarOpen6, setIsSidebarOpen6] = React.useState(false);
    const [isSidebarOpen7, setIsSidebarOpen7] = React.useState(false);

    const handleClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };



    const handleClick1 = () => {
        setIsSidebarOpen1(!isSidebarOpen1);
    };

    const handleClick2 = () => {
        setIsSidebarOpen2(!isSidebarOpen2);
    };

    const handleClick3 = () => {
        setIsSidebarOpen3(!isSidebarOpen3);
    };

    const handleClick4 = () => {
        setIsSidebarOpen4(!isSidebarOpen4);
    };

    const handleClick5 = () => {
        setIsSidebarOpen5(!isSidebarOpen5);
    };

    const handleClick6 = () => {
        setIsSidebarOpen6(!isSidebarOpen6);
    };

    const handleClick7 = () => {
        setIsSidebarOpen7(!isSidebarOpen7);
    };


    const handleChange = (event) => {
        setValue(event.target.value);
    };


    const [value, setValue] = useState("");

    return (
        <>
            <Box sx={{ display: 'flex', marginTop: '100px' }}>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: open ? drawerWidth : 60,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: open ? drawerWidth : 60,
                            transition: 'width 0.3s',
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                        },
                    }}
                >
                    <Toolbar />
                    <List style={{ marginTop: '14px' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{ px: 2 }}>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '170px' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField required
                                            id="outlined-required"
                                            placeholder="Search"
                                        />
                                    </div>
                                    <span className="searchIcon"><SearchIcon /></span>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 1 }}>
                                    {/* <MenuIcon /> */}
                                    <LayoutIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: '16px',
                                marginRight: '16px'
                            }}>
                                <Box>
                                    <h3 className="filterText">Filters</h3>
                                </Box>
                                <Box>
                                    <Button className="clearText">Clear All</Button>
                                    <Button className="saveFilters">Save Filters</Button>
                                </Box>
                            </Box>
                        </Box>

                        {/* {[...Array(5)].map((_, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                {open && <ListItemText primary={`Item ${index + 1}`} />}
                            </ListItem>
                        ))} */}

                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: '#f0f0f0' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">

                                </ListSubheader>
                            }
                        >


                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99996 18.3333C9.80551 18.3333 9.63885 18.2778 9.49996 18.1667C9.36107 18.0555 9.2569 17.9097 9.18746 17.7292C8.92357 16.9514 8.59024 16.2222 8.18746 15.5417C7.79857 14.8611 7.24996 14.0625 6.54163 13.1458C5.83329 12.2292 5.2569 11.3542 4.81246 10.5208C4.3819 9.68749 4.16663 8.68054 4.16663 7.49999C4.16663 5.87499 4.72913 4.49999 5.85413 3.37499C6.99301 2.2361 8.37496 1.66666 9.99996 1.66666C11.625 1.66666 13 2.2361 14.125 3.37499C15.2638 4.49999 15.8333 5.87499 15.8333 7.49999C15.8333 8.76388 15.5902 9.81943 15.1041 10.6667C14.6319 11.5 14.0833 12.3264 13.4583 13.1458C12.7083 14.1458 12.1388 14.9792 11.75 15.6458C11.375 16.2986 11.0625 16.993 10.8125 17.7292C10.743 17.9236 10.6319 18.0764 10.4791 18.1875C10.3402 18.2847 10.1805 18.3333 9.99996 18.3333ZM9.99996 9.58332C10.5833 9.58332 11.0763 9.38193 11.4791 8.97916C11.8819 8.57638 12.0833 8.08332 12.0833 7.49999C12.0833 6.91666 11.8819 6.4236 11.4791 6.02082C11.0763 5.61805 10.5833 5.41666 9.99996 5.41666C9.41663 5.41666 8.92357 5.61805 8.52079 6.02082C8.11801 6.4236 7.91663 6.91666 7.91663 7.49999C7.91663 8.08332 8.11801 8.57638 8.52079 8.97916C8.92357 9.38193 9.41663 9.58332 9.99996 9.58332Z" fill="#409BF6" />
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Region" />
                                {isSidebarOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className="card w-100 bg-transparent border-0 text-start">
                                        <div className="card-body">
                                            <FormControl>
                                                <Select
                                                    value={age}
                                                    onChange={handleChanges}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem value="">
                                                        South Asia
                                                    </MenuItem>
                                                    <MenuItem value={10}>South Asia</MenuItem>
                                                    <MenuItem value={20}>South Asia</MenuItem>
                                                </Select>

                                                <br />

                                                 <Select 
                                                    value={age}
                                                    onChange={handleChanges}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem value="">
                                                       State/Province
                                                    </MenuItem>
                                                    <MenuItem value={10}>South Asia</MenuItem>
                                                    <MenuItem value={20}>South Asia</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </List>
                            </Collapse>
                        </List>
                        <div className="card" style={{ height: '54vh', overflowY: 'scroll', border: '0px', overflowX: 'hidden' }}>
                            <div className="card-body p-0">
                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader1"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader1">

                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton onClick={handleClick1}>
                                        <ListItemIcon>
                                            <img src="/images/datatype.png" alt="" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <FormLabel>
                                                    Data Type
                                                </FormLabel>
                                            }
                                        />

                                        {isSidebarOpen1 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen1} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <Box className="card-body py-1">
                                                <FormControl component="fieldset">
                                                    <RadioGroup
                                                        row
                                                        name="filter-options"
                                                        value={value}
                                                        onChange={handleChange}
                                                    >
                                                        <FormControlLabel
                                                            value="option1"
                                                            control={<Radio />}
                                                            label={
                                                                <Box display="flex" alignItems="center" gap={1}>
                                                                    <img src="/images/filter-crop.png" alt="crop" height={20} />
                                                                    <FormLabel>Crops</FormLabel>
                                                                </Box>
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            value="option2"
                                                            control={<Radio />}
                                                            label={
                                                                <Box display="flex" alignItems="center" gap={1}>
                                                                    <img src="/images/filter-livestock.png" alt="livestock" height={20} />
                                                                    <FormLabel>Livestock</FormLabel>
                                                                </Box>
                                                            }
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader2"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader2"></ListSubheader>
                                    }
                                >
                                    <ListItemButton onClick={handleClick2}>
                                        <ListItemIcon>
                                            <img src="/images/analysis.png" alt="" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <FormLabel>
                                                    Analysis & Scale
                                                </FormLabel>
                                            }
                                        />

                                        {isSidebarOpen1 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>

                                    {/* Collapse Section */}
                                    <Collapse in={isSidebarOpen2} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            {/* Section 1 */}
                                            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                                                <FormLabel>Select analysis scope</FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Switch />}
                                                    label="Commodity specific"
                                                />
                                                <FormControlLabel
                                                    control={<Switch />}
                                                    label="Regional (non-commodity specific)"
                                                />
                                            </FormGroup>

                                            {/* Section 2 */}
                                            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                                                <FormLabel>Select visualisation scale</FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Switch />}
                                                    label="Pixel level"
                                                />
                                                <FormControlLabel
                                                    control={<Switch />}
                                                    label="District level"
                                                />
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader3"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader3">

                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton onClick={handleClick3}>
                                        <ListItemIcon>
                                            <img src="/images/commodity.png" alt="" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <FormLabel>
                                                    Commodity
                                                </FormLabel>
                                            }
                                        />

                                        {isSidebarOpen3 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen3} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div className="card w-100 bg-transparent border-0 text-start">
                                                <div className="card-body py-1">
                                                    <div className="form-group">
                                                        <FormLabel>
                                                            Comodity Filters Here
                                                        </FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader3"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader3">

                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton onClick={handleClick4}>
                                        <ListItemIcon>
                                            <img src="/images/scenario.png" alt="" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <FormLabel>
                                                    Scenario
                                                </FormLabel>
                                            }
                                        />
                                        {isSidebarOpen4 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen4} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div className="card w-100 bg-transparent border-0 text-start">
                                                <div className="card-body py-1">
                                                    <div className="form-group">
                                                        <FormLabel className="my-1">Scenario Filters Here</FormLabel>
                                                    </div>
                                                </div>
                                            </div>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader3"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader3">

                                        </ListSubheader>
                                    }
                                >

                                    <ListItemButton onClick={handleClick5}>
                                        <ListItemIcon>
                                            <img src="/images/risk.png" alt="" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <FormLabel>
                                                    Risk
                                                </FormLabel>
                                            }
                                        />
                                        {isSidebarOpen5 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>

                                    {/* <ListItemButton onClick={handleClick5}>
                                        <ListItemIcon>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.672 9.22377L11.3822 3.52559C11.2345 3.26991 11.0356 3.06962 10.8013 2.93397L10.802 2.93326C10.569 2.79903 10.297 2.72729 10.0001 2.72729C9.71107 2.72729 9.44472 2.79548 9.21603 2.92331L9.19898 2.93397C8.9646 3.06962 8.76504 3.26991 8.61802 3.52558L5.3282 9.22377L5.32749 9.22306L2.0384 14.9198C1.89138 15.174 1.81824 15.4461 1.81824 15.7188C1.81824 15.9844 1.88784 16.2507 2.02775 16.4993C2.0313 16.505 2.03485 16.5107 2.0384 16.5164C2.18613 16.7728 2.38498 16.973 2.61795 17.108C2.85089 17.2422 3.12362 17.3147 3.42051 17.3147H16.5789C16.8757 17.3147 17.1485 17.2429 17.3814 17.108C17.6144 16.9731 17.8133 16.7735 17.961 16.5164L17.9617 16.5171C18.108 16.2635 18.1811 15.9915 18.1811 15.7188C18.1811 15.4468 18.108 15.174 17.961 14.9198L14.6833 9.24216C14.6791 9.23577 14.6755 9.23008 14.6713 9.22298L14.672 9.22377ZM10.579 14.0007C10.7331 14.1548 10.819 14.3622 10.819 14.5795C10.819 14.7968 10.7331 15.0049 10.579 15.1584C10.4248 15.3125 10.2174 15.3984 10.0001 15.3984C9.78279 15.3984 9.5747 15.3125 9.42128 15.1584C9.26716 15.0042 9.18123 14.7968 9.18123 14.5795C9.18123 14.3622 9.26717 14.1541 9.42128 14.0007C9.5754 13.8466 9.78279 13.7606 10.0001 13.7606C10.2174 13.7606 10.4255 13.8466 10.579 14.0007ZM10.802 7.68668C10.7508 9.19164 10.699 10.7023 10.5903 12.2038C10.5747 12.419 10.4611 12.6093 10.2622 12.7009C10.1798 12.7393 10.0889 12.7592 9.99799 12.7592C9.90709 12.7592 9.81617 12.74 9.73308 12.7016C9.53421 12.61 9.42556 12.4176 9.40994 12.2045C9.30553 10.7641 9.2544 9.31739 9.20468 7.87502C9.19616 7.63781 9.18835 7.4013 9.17982 7.16408C9.16704 6.83737 9.32116 6.54404 9.62584 6.41053C9.74232 6.3594 9.87017 6.33383 9.9973 6.33383C10.1244 6.33383 10.2523 6.35869 10.3695 6.40982C10.6756 6.54334 10.8318 6.83597 10.8198 7.16408C10.8134 7.33879 10.8077 7.51351 10.802 7.68822L10.802 7.68668Z" fill="#409BF6" />
                                            </svg>
                                        </ListItemIcon>
                                        <ListItemText primary="Risk" />
                                        {isSidebarOpen5 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton> */}
                                    <Collapse in={isSidebarOpen5} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div className="card w-100 bg-transparent border-0 text-start">
                                                <div className="card-body py-1">
                                                    <FormLabel className="my-1">Risk Filters Here</FormLabel>
                                                </div>
                                            </div>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader3"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader3">

                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton onClick={handleClick6}>
                                        <ListItemIcon>
                                            <img src="/images/impact.png" alt="" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <FormLabel>
                                                    Impact
                                                </FormLabel>
                                            }
                                        />
                                        {isSidebarOpen6 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen6} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div className="card w-100 bg-transparent border-0 text-start">
                                                <div className="card-body py-1">
                                                    <FormLabel>Impact Filters Here</FormLabel>
                                                </div>
                                            </div>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader3"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader3">

                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton onClick={handleClick7}>
                                        <ListItemIcon>
                                            <img src="/images/options.png" alt="" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <FormLabel>
                                                    Options
                                                </FormLabel>
                                            }
                                        />
                                        {isSidebarOpen7 ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen7} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div className="card w-100 bg-transparent border-0 text-start">
                                                <div className="card-body py-1">
                                                    <div className="form-group">
                                                        <label className="my-1">Options Filters Here</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </List>
                                    </Collapse>
                                </List>


                            </div>
                        </div>
                    </List>
                </Drawer>

                {/* Main Content */}
                <Box component="main" className="main">
                    {/* <Toolbar /> */}
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <img className="w-100" src="/images/map-1.png" alt="" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <img className="w-100" src="/images/map-2.png" alt="" />
                        </div>
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default Test
