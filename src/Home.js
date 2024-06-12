import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import StickyFooter from './StickyFooter';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import Slide from '@mui/material/Slide';
import { SelectMinimal } from './Minimal_Select';
import { SelectMinimal2 } from './Minimal_Select2';
import { useNavigate } from 'react-router-dom';

const logoStyle3 = {
    width: '77vw',
    minHeight: '90vh',
    margin:'auto',
    marginTop:20,
  };

const logoStyle4 = {
    height: '40px',
    marginLeft:6,
    marginRight:6,
    marginTop:10,
    marginBottom:10
  };

const logoStyle5 = {
    height: '360px',
    margin:6,
    borderRadius:'15px',
  };

const logoStyle6 = {
    height: '88%',
    margin:'auto',
  };

const logoStyle8 = {
    height: '55%',
    margin:'auto',
  };

const logoStyle7 = {
    width: '90%',
    margin:'auto',
  };

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    color: theme.palette.common.white,
  }));

export default function Home(props)
{
    const [curr,Setcurr] = React.useState(1);
    const [reg,Setreg] = React.useState('South Asia');
    const [comm,Setcomm] = React.useState('rice');

    const handleChange =(name) => {
        Setcurr(name+1);
    };

    const handlecountrychange = (name) => {
        Setreg(name);
    };

    const handlecommoditychange = (name) => {
        Setcomm(name);
    };

    const navigate = useNavigate();

    const toComponentB=()=>{
        navigate('/viewer',{state:{Region:reg,Commodity:comm}});
    }
    var items = [
        {
            name: "Atlas of Climate Adaptation in South Asian Agriculture",
            description: "Interconnections between climate risks, practices, technologies, and policies",
            type:"Increase the quality, availability, and utility of data and evidence",
            video:"./vid31.mp4",
            id:1
        },
        {
            name: "Atlas of Climate Adaptation in South Asian Agriculture",
            description: "Interconnections between climate risks, practices, technologies, and policies",
            type:"Improve climate adaptive capacity of agricultural systems",
            video:"./vid5.mp4",
            id:2
        },
        {
            name: "Atlas of Climate Adaptation in South Asian Agriculture",
            description: "Interconnections between climate risks, practices, technologies, and policies",
            type:"Increase the resilience of small-scale producers to climate variability and change",
            video:"./vid41.mp4",
            id:3
        }
    ]

    return (
        <Box sx={{marginTop:'80px'}}>
        <Carousel sx={{margin:0,padding:0,zIndex: 100}} indicatorContainerProps={{style: {
            zIndex:1,
            marginTop: "-120px",
            marginBottom: "80px",
            position: "relative",
            }}}
            onChange={handleChange}
            >
            {
                items.map( (item, i) => <Item key={i} item={item} sts={curr} /> )
            }
        </Carousel>
        
        <Box sx={{position:'relative',display: 'flex',flexDirection: 'row',width:'95vw',margin:'auto',boxShadow:'0px 1px 5px #aaa', border: '9px solid #f8faf0',
            borderRadius:'10px',backgroundColor:'#f8faf0',height:'auto',marginTop:-5,zIndex: 200}}>
            <Box sx={{width:'100%'}}>
                <img src={'afghanistan.svg'}
                style={logoStyle4}
                alt="afghanistan"/>
                <img src={'bangladesh.png'}
                style={logoStyle4}
                alt="bangladesh"/>
                <img src={'bhutan.svg'}
                style={logoStyle4}
                alt="bhutan"/>
                <img src={'india.png'}
                style={logoStyle4}
                alt="india"/>
                <img src={'maldives.svg'}
                style={logoStyle4}
                alt="maldives"/>
                <img src={'nepal.svg'}
                style={logoStyle4}
                alt="nepal"/>
                <img src={'pakistan.svg'}
                style={logoStyle4}
                alt="pakistan"/>
                <img src={'srilanka.png'}
                style={logoStyle4}
                alt="srilanka"/>
                </Box>
                <Box sx={{marginRight:2,marginLeft:2}}>
                <Typography>Region of Interest:</Typography>
                <SelectMinimal2 changeReg={handlecountrychange}></SelectMinimal2>
                </Box>
                <Box sx={{marginRight:2,marginLeft:2}}>
                <Typography>Commodity:</Typography>
                <SelectMinimal changeComm={handlecommoditychange}></SelectMinimal>
                </Box>
                <Button variant="contained"
                sx={{ width:'140px',height:'32px',margin:2,fontSize:'16px',color:'#ffffff', textTransform: 'none',
                backgroundColor:'#4b9e44','&:hover':{backgroundColor:'#4b9e44'} }}>
                   <a  href='/#/viewer' onClick={()=>{toComponentB()}} style={{textDecoration:'none',color:'inherit'}}> <Typography>Explore</Typography> </a>
                </Button>
        </Box>
        <Box sx={{mt:'20px'}}>
            <img src={'acasa_approach.svg'}
                style={logoStyle3}
                alt="approach"/>
        </Box>
        <Box sx={{mt:'20px',backgroundImage:"linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('world-map.png')",backgroundSize:'cover',
            backgroundRepeat: "no-repeat",display: 'flex', flexDirection: 'row',padding:7}}>
            <Box  sx={{width:'30%', display: 'flex', flexDirection: 'column',marginLeft:7,marginRight:7,textAlign: { sm: 'center', md: 'left' },}}>
                <Typography sx={{color:'#4b9e44',fontWeight:'normal',fontSize:'40px', fontFamily:'revert'}}>How to use this Atlas?</Typography>
                <Typography sx={{color:'#444444',fontSize:'17px', fontFamily:'revert',marginTop:2}}>What is this Atlas?
                how it should be used? what is the purpose?
                what does it show?
                </Typography>
            </Box>
            <Box sx={{margin:'auto'}}>
            <img src={'aboutus-img.svg'}
            style={logoStyle5}
            alt='TeaFraming'/>
            </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column',width: { xs: '100%', sm: '100%' },paddingBottom:10,paddinTop:5,backgroundColor:'#f7f7f7'}}>
        <Box sx={{marginLeft:7,marginRight:7,marginTop:4}}>
        <Typography sx={{color:'#111111',fontWeight:'bold',fontSize:'30px', fontFamily:'revert',marginBottom:'4px'}}>Our Partners</Typography>
        <Box sx={{display:'flex',flexDirection:'row', justifyContent:'center' , width: { xs: '100%', sm: '100%' }}} gap='0.5vw'>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'barc.png'}
                style={logoStyle6}
                alt="barc"/>
        </Paper>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'icar.png'}
                style={logoStyle6}
                alt="icar"/>
        </Paper>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'narc.png'}
                style={logoStyle6}
                alt="narc"/>
        </Paper>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'nrmc.png'}
                style={logoStyle6}
                alt="nrmc"/>
        </Paper>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',width: { xs: '100%', sm: '100%'}, justifyContent:'center' }} gap='0.5vw'>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'bmgf-new.svg'}
                style={logoStyle7}
                alt="bmgf"/>
        </Paper>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'cimmyt-cgiar.png'}
                style={logoStyle7}
                alt="cimmyt"/>
        </Paper>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'south-asia-11.svg'}
                style={logoStyle7}
                alt="florida"/>
        </Paper>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'columbia-university.png'}
                style={logoStyle6}
                alt="columbia"/>
        </Paper>
        <Paper sx={{ m: 1, width: '220px', height:90, alignContent:'center' }} elevation={0}>
            <img src={'south-asia-12.svg'}
                style={logoStyle8}
                alt="washington"/>
        </Paper>  
        </Box>
        </Box>
        </Box>
        <StickyFooter></StickyFooter>
        </Box>
    )
}

function Item(props)
{
    return (
        <Paper>
            <ReactPlayer
            url={props.item.video}
            muted
            width='100vw'
            height='auto'
            playing={true}
            loop={true}
          />
          <Image sx={{backgroundColor:'#111111',opacity:0.3}}></Image>
          <Image>
                <Box component='span'  sx={{display: 'flex',  m: 1,ml:7,mt:5,padding:2, width: '35vw',flexDirection: 'column',textAlign: { sm: 'left', md: 'left'}}}>
                    <Typography variant='h4' sx={{color:'#ffffff',fontWeight:'bold',textShadow:'2px 2px 5px rgba(0, 0, 0, 0.25), -2px -2px 5px rgba(0, 0, 0, 0.25)'}}>
                        {props.item.name}</Typography>
                    <Typography variant='subtitle1' sx={{fontWeight:'bold',mt:2}}>{props.item.description}</Typography>
                    <Box sx={{background: 'linear-gradient(to right, rgba(255, 254, 227,0.4), rgba(0, 0, 0, 0.3))',mt:'90px',ml:-9,mr:-3}}>
                    <Slide direction="right" in={props.sts===props.item.id} timeout={1000} mountOnEnter unmountOnExit>
                        <Typography variant='h6' sx={{ml:9,mr:3}}>{props.item.type}</Typography>
                        </Slide>
                    </Box>
                    <Button variant="contained" href='/#/viewer'
                    sx={{ width:'160px',mt:6,mb:2,fontSize:'18px',flexShrink: 0,color:'#000000',fontWeight:'bold', backgroundColor:'#fece2f','&:hover':{backgroundColor:'#fece2f'} }}>
                        Explore
                    </Button>
                </Box>
            </Image>
        </Paper>
    )
}