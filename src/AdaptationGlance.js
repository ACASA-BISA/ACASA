import * as React from 'react';
import { Accordion, Box } from '@mui/material';
import {Paper} from '@mui/material';
import Summ_Comm from './Summ_Comm';
import Summ_Loc from './Summ_Loc';
import Summ_Adapt from './Summ_Adapt';
import Summ_Adapt2 from './Summ_Adapt2';
import Summ_Adapt3 from './Summ_Adapt3';
import Summ_Adapt4 from './Summ_Adapt4';
import Summ_Adapt5 from './Summ_Adapt5';
import Summ_Adapt6 from './Summ_Adapt6';
import Map_Risk from './Map_Risk1';
import Map_Option from './Map_Option1';
//import Map_Extra from './Map_Extra';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Popper from '@mui/material/Popper';

{/* <AdaptationGlance
        acc={acc}
        setacc={setacc}
        handleChangeSumm={handleChangeSumm}
        handleChangeOptSumm={handleChangeOptSumm}
        handleChangeOptSumm2={handleChangeOptSumm2}
        handleChangeOptSumm3={handleChangeOptSumm3}
        handleChangeOptSumm4={handleChangeOptSumm4}
        handleChangeOptSumm5={handleChangeOptSumm5}
        handleChangeOptSumm6={handleChangeOptSumm6}
        cropid={cropid}
        crop2={crop2}
        crop3={crop3}
        area_dict={area_dict}
        CurrRisk2={CurrRisk2}
        focus2={focus2}
        activeRegion2={activeRegion2}
        ActiveRegionChange2={ActiveRegionChange2}
        opt2={opt2}
        opt3={opt3}
        opt4={opt4}
        opt5={opt5}
        opt6={opt6}
        opt7={opt7}
        ></AdaptationGlance> */}

export default function AdaptationGlance({
    acc,
    setacc,
    handleChangeSumm,
    handleChangeOptSumm,
    handleChangeOptSumm2,
    handleChangeOptSumm3,
    handleChangeOptSumm4,
    handleChangeOptSumm5,
    handleChangeOptSumm6,
    cropid,
    crop2,
    crop3,
    area_dict,
    CurrRisk2,
    focus2,
    activeRegion2,
    ActiveRegionChange2,
    opt2,
    opt3,
    opt4,
    opt5,
    opt6,
    opt7
}){

    return(
        <div style={{overflow:'hidden'}}>
          <Box>
        <Box sx={{width:'auto', display:'flex',maxHeight:'calc(100vh - 90px)',flexDirection:'row',justifyContent:'center',marginX:'auto',marginTop:'90px',backgroundColor:'#fff'}} gap='2vw'>
        <Popper
        sx={{zIndex:2}}
        open={true}
        >
        <div style={{position:'absolute',left:'3vw',top:100,width:'calc(23vw + 16px)', boxShadow:'0px 0px 0px #aaa', borderRadius:'15px'}}>
        <Accordion expanded={acc} onMouseOver={()=>setacc(true)} onMouseLeave={()=>setacc(false)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{justifyItems:'center',alignContent:'center',marginY:'-5px',backgroundColor:'#F7F7F7'}}
        > <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>Data layers at a glance</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{marginY:'-5px'}}>This overview page allows you to select a specific crop and region of your choice, and explore the associated adaptation options
           comprehensively on one page.
        </AccordionDetails>
        </Accordion>
        </div>
        </Popper>
        <Box sx={{display:'flex',flexDirection:'column',gap:'12px',marginTop:'4px',alignItems:'center'}}>
        <Box sx={{height:'40px'}}></Box>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center',width:'23vw',backgroundColor:'#F7F7F7',border:'0px solid black'}}>
        <Typography sx={{fontSize:14,fontWeight:'bold'}}>Commodity: </Typography>
        <Summ_Comm changeComm={handleChangeSumm} comm={cropid}></Summ_Comm>
        <Typography sx={{marginLeft:'5px',fontSize:14,fontWeight:'bold'}}>Location: </Typography>
        <Summ_Loc focus={focus2} activeRegion={activeRegion2} changeReg={ActiveRegionChange2}></Summ_Loc>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',gap:'2vh'}}> 
          <Box sx={{display:'flex',flexDirection:'column'}}>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: "#FF0000",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Extreme
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFA500',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Very High
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FFFF00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#00FF00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#059212',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 10, margin:'2px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>

          </Box>
        <Paper elevation={1}>
        <Map_Risk activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} CurrRisk={CurrRisk2}></Map_Risk>
        </Paper>
        </Box>
        {/* <Paper elevation={1}>
        <SMap activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={option} CurrRisk={CurrRisk2}></SMap>
        </Paper> */}
        </Box>
        
        </Box>
        
        <Box sx={{display:'flex',flexDirection:'column',gap:'1vh',marginTop:'3px'}}>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12}}>Adaptation: </Typography>
        <Summ_Adapt activv={opt2} changeOption={handleChangeOptSumm} activeCrop={crop3}></Summ_Adapt>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt2} area_dict={area_dict}></Map_Option>
        </Paper>
        </div>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12}}>Adaptation: </Typography>
        <Summ_Adapt2 activv={opt3} changeOption={handleChangeOptSumm2} activeCrop={crop3}></Summ_Adapt2>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt3} area_dict={area_dict}></Map_Option>
        </Paper>
        </div>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'1vh',marginTop:'3px'}}>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12}}>Adaptation: </Typography>
        <Summ_Adapt3 activv={opt4} changeOption={handleChangeOptSumm3} activeCrop={crop3}></Summ_Adapt3>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt4} area_dict={area_dict}></Map_Option>
        </Paper>
        </div>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12}}>Adaptation: </Typography>
        <Summ_Adapt4 activv={opt5} changeOption={handleChangeOptSumm4} activeCrop={crop3}></Summ_Adapt4>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt5} area_dict={area_dict}></Map_Option>
        </Paper>
        </div>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'1vh',marginTop:'3px'}}>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12}}>Adaptation: </Typography>
        <Summ_Adapt5 activv={opt6} changeOption={handleChangeOptSumm5} activeCrop={crop3}></Summ_Adapt5>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt6} area_dict={area_dict}></Map_Option>
        </Paper>
        </div>
        <div>
        <Box sx={{paddingX:'8px',paddingY:'4px',display:'flex',flexDirection:'row',justifyContent:'center',gap:'4px',alignItems:'center'}}><Typography sx={{fontSize:12}}>Adaptation: </Typography>
        <Summ_Adapt6 activv={opt7} changeOption={handleChangeOptSumm6} activeCrop={crop3}></Summ_Adapt6>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row', width:'100%',justifyContent:'center', gap:'4px'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 10,height: 10,borderRadius: 1,bgcolor: '#FF9A00',margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                    <Box sx={{width: 11,height: 11,borderRadius: 1,bgcolor: "#06D001",margin:'2px'}}/>
                    <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom> 
                    Adaptation benefits
                    </Typography>
                    </Box>
         </Box>
        <Paper elevation={1} sx={{width:'21vw'}}>
        <Map_Option activeCrop={crop2} focus={focus2} activeRegion={activeRegion2} activeOpt={opt7} area_dict={area_dict}></Map_Option>
        </Paper>
        </div>
        </Box>
        </Box>
        </Box>
        </div>
    );
};