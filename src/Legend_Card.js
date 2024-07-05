import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LocationOn } from '@mui/icons-material';
import { Popper, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useRef, useState } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const size = {
  width: 150,
  height: 150,
};

const palette = ['rgba(180, 70, 109, 1)','#FF9A00','#06D001'];

function createData(color, Cat, Area, AreaPerc, Population) {
  return { color, Cat, Area, AreaPerc, Population };
}

export default function LegendCard({
    location,
    commodity,
    adaption,
    RiskName,
    scenario,
    ImpactName,
    area_data,
    area_data2
}) {
  const cardRef = useRef(null);

  const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residue':'ZTILL','Broad Bed and Furrow':'BBFIB',
    'DSR (Dry Seed)':'DSDRY','DSR (Wet Seed)':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
    'Low-tech Precision Technology':'PNMLT','High-tech Precision Technology':'PNMHT','Deep Placement of Urea':'DR',
    'ICT-based Agro Advisory':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
    'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate wetting and drying':'AWD','Fertilizer rating and timing':'FRT',
    'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};

    const hazardname = {"District Level": "District Level","Downscaled Risk": "Downscaled Risk","Risk Index": "Risk index","Hazard Index": "Hazard Index",
        "Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
        "Low temperature induced pollen sterility": "Low temperature induced pollen sterility","High temperature induced pollen sterility": "High temperature induced pollen sterility",
        "Heat Stress": "Heat stress","Heat Stress": "Heat stress","High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
        "Cold Stress": "Cold stress","Low temperature induced tuberization failure": "Low temperature induced tuberization failure",'Untimely Rainfall':"Untimely rainfall",
        "Terminal Heat": "Terminal heat","Days of Frost": "Days of Frost","Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
        "Delayed Monsoon": "Delayed monsoon","Drought": "Drought","Dry Spell": "Number of dry spells","Flood": "Flood",
        "Lodging": "Rain and wind causing lodging","Biotic": "High humidity and temperature for blight","Irrigation": "Irrigation","Water Holding": "Water Holding","Income": "Agricultural GDP",
        "Access to Credit": "Access to Credit","Access to Market": "Access to Market","Elevation": "Elevation","Access to Knowledge": "Access to Knowledge","Exposure Index": "Exposure Index",
        "Number of Farmers": "Number of Farmers","Cropped Area": "Cropped Area","Excess Rainfall":"Excess rainfall","Number of Animals per grid":"Number of animals per grid",
        'Cold stress in reproductive stage':'Cold stress in reproductive stage','Heat stress in reproductive stage':"Heat stress in reproductive stage",
        'Heat stress during boll formation':'Heat stress during boll formation','Cold stress during flowering':'Cold stress during flowering',
        'High tempearture during flowering':'High tempearture during flowering','Biotic Stress':'Biotic stress',"Vulnerability Index":'Vulnerability Index',
        "Availability of crop residues":'Residue',"Rural infrastructure":'Road network density',"Cyclone":'Cyclone',"Rainfall Deficit":"Rainfall deficit",
        "Extreme Rainfall days":"Extreme Rainfall Days","Cold days":"Cold stress or cold days","Hot days":"Heat stress or hot days","Temperature-Humidity Index":'Temperature-humidity Index',
        "Socio-economic Development Indicator":"Human development index"};

    function fetchthedataTable() {
      let data = [];
      if(adaption!==''){
        let sec = location.indexOf(',');
        let y ='';
        let x = '';
        let rowstr = "";
        if (sec>0){
          y = location.substring(0,sec);
          x = location.substring(sec+2);
          let statecode = '';
          if(x==='Bangladesh'){
            statecode = y.substring(0,y.length-9) + 'DIV';
            rowstr = commodity+"_"+statecode+"_Suitability_"+commodity+"_"+optcode[adaption];
          }
          else if(x==='Nepal'){
            statecode = y + 'DIV';
            rowstr = commodity+"_"+statecode+"_Suitability_"+commodity+"_"+optcode[adaption];
          }
          else if(x==='India'||x==='Sri Lanka'||x==='Pakistan'){
            statecode = 'STATE_'+ y.toUpperCase();
            rowstr = commodity+"_"+statecode+"_Suitability_"+commodity+"_"+optcode[adaption];
          }
          else if(x==='Maldives'||x==='Afghanistan'){
            statecode = y.toUpperCase();
            rowstr = commodity+"_"+statecode+"_Suitability_"+commodity+"_"+optcode[adaption];
          }
          else if(x==='Bhutan'){
            statecode = y;
            rowstr = commodity+"_"+statecode+"_Suitability_"+commodity+"_"+optcode[adaption];
          }
        }
        else{
          rowstr = commodity+"_"+location+"_Suitability_"+commodity+"_"+optcode[adaption];
        }
        const row_data = area_data[rowstr];
        console.log(area_data2);
        const total = Number(row_data['Unsuitable']) + Number(row_data['Suitable']) + Number(row_data['Adaptation Benefits']);
        //console.log(total);
        data = 
        [
          createData(<Box sx={{width: 160,height: 13,borderRadius: 0,bgcolor: 'rgba(180, 70, 109, 1)'}}/>,'Unsuitable', row_data['Unsuitable']/10, (row_data['Unsuitable']*100/total).toFixed(2), Math.round(row_data['Unsuitable_Area']/1000000)),
          createData(<Box sx={{width: 160,height: 13,borderRadius: 0,bgcolor: '#FF9A00'}}/>,'Suitable', row_data['Suitable']/10, (row_data['Suitable']*100/total).toFixed(2), Math.round(row_data['Suitable_Area']/1000000)),
          createData(<Box sx={{width: 160,height: 13,borderRadius: 0,bgcolor: '#06D001'}}/>,'Suitable with adaptation benefits', row_data['Adaptation Benefits']/10, (row_data['Adaptation Benefits']*100/total).toFixed(2), Math.round(row_data['Adaptation Benefits_Area']/1000000)),
        ];
        //console.log(data);
      }
      return data;
    };


    function fetchthedataHzd() {
        let data = [];
        if(RiskName!==''){
          let sec = location.indexOf(',');
          let y ='';
          let x = '';
          let rowstr = "";
          if (sec>0){
            y = location.substring(0,sec);
            x = location.substring(sec+2);
            let statecode = '';
            if(x==='Bangladesh'){
              statecode = y.substring(0,y.length-9) + 'DIV';
              rowstr = commodity+"_"+statecode+"_ZZ_"+hazardname[RiskName];
            }
            else if(x==='Nepal'){
              statecode = y + 'DIV';
              rowstr = commodity+"_"+statecode+"_ZZ_"+hazardname[RiskName];
            }
            else if(x==='India'||x==='Sri Lanka'||x==='Pakistan'){
              statecode = 'STATE_'+ y.toUpperCase();
              rowstr = commodity+"_"+statecode+"_ZZ_"+hazardname[RiskName];
            }
            else if(x==='Maldives'||x==='Afghanistan'){
              statecode = y.toUpperCase();
              rowstr = commodity+"_"+statecode+"_ZZ_"+hazardname[RiskName];
            }
            else if(x==='Bhutan'){
              statecode = y;
              rowstr = commodity+"_"+statecode+"_ZZ_"+hazardname[RiskName];
            }
          }
          else{
            rowstr = commodity+"_"+location+"_ZZ_"+hazardname[RiskName];
          }
          const row_data = area_data2[rowstr];
          const total = Number(row_data['Very Low']) + Number(row_data['Low']) + Number(row_data['Medium']) + Number(row_data['High']) + Number(row_data['Very High']);
          //console.log(total);
          data = 
          [
            createData(<Box sx={{width: 90,height: 13,borderRadius: 0,bgcolor: '#059212'}}/>,'Very Low', row_data['Very Low']/10, (row_data['Very Low']*100/total).toFixed(2), Math.round(row_data['Very Low_Area']/1000000)),
            createData(<Box sx={{width: 90,height: 13,borderRadius: 0,bgcolor: '#00FF00'}}/>,'Low', row_data['Low']/10, (row_data['Low']*100/total).toFixed(2), Math.round(row_data['Low_Area']/1000000)),
            createData(<Box sx={{width: 90,height: 13,borderRadius: 0,bgcolor: '#FFFF00'}}/>,'Medium', row_data['Medium']/10, (row_data['Medium']*100/total).toFixed(2), Math.round(row_data['Medium_Area']/1000000)),
            createData(<Box sx={{width: 90,height: 13,borderRadius: 0,bgcolor: '#FFA500'}}/>,'High', row_data['High']/10, (row_data['High']*100/total).toFixed(2), Math.round(row_data['High_Area']/1000000)),
            createData(<Box sx={{width: 90,height: 13,borderRadius: 0,bgcolor: '#FF0000'}}/>,'Very High', row_data['Very High']/10, (row_data['Very High']*100/total).toFixed(2), Math.round(row_data['Very High_Area']/1000000)),
          ];
          //console.log(data);
        }
        return data;
      };

    function calcpop(popu){
        if(popu===0){
            return 'none';
        }
        return popu+'M people';
    }
    const rows = fetchthedataTable();
    const rowshzd = fetchthedataHzd();

  function RiskMethod(){
    let str = 'Estimated risk';
    if(RiskName==='District Level'||RiskName==='Downscaled Risk') {
      str = 'Measured risk';
    }
    return str;
  }

  function RiskType(){
    let str = 'Hazard';
    if(RiskName==='Risk Index'||RiskName==='District Level'||RiskName==='Downscaled Risk'){
      str = 'Risk';
    }
    if(RiskName==='Exposure Index'||RiskName==='Number of Animals per grid'||RiskName==='Cropped Area') {
      str = 'Exposure';
    }
    if(RiskName==='Irrigation'||RiskName==='Soil Water Holding Capacity'||RiskName==='Income'||RiskName==='Soil Organic Carbon'
    ||RiskName==='Availability of crop residues'||RiskName==='Rural infratructure'||RiskName==='Socio-economic Development Indicator') {
      str = 'Vulnerability';
    }
    return str;
  }
    
  return (
    <Popper
    open={true}
      >
        <div ref={cardRef} style={{position:'fixed',right:'calc(50vw - 260px)',bottom:10, boxShadow:'0px 0px 0px #aaa',backgroundColor: 'white', border: '0px solid black', width:'520px', borderRadius:'15px' }}>
        <Accordion defaultExpanded>
        <AccordionDetails sx={{marginTop:-1,marginBottom:0}}>

        {adaption !== '' && <div>
        <Box sx={{display:'flex'}}>
        <Typography sx={{ fontSize: 14, marginBottom:'2px'}} color="black">
          Technical suitability of&nbsp;{adaption.toLowerCase()} for rural population:</Typography>
          </Box>
        </div>}
        {RiskName !== '' && <div><Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" >
          Risk Method:&nbsp;</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{RiskMethod()}</Typography>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" >
          {RiskType()}:&nbsp;</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}</Typography>
        </Box>
        </div>}
        
        <Typography sx={{ fontSize: 14 }} color="black" >
            
                    {/* { adaption === '' && RiskName === '' && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#5ec962',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" > 
                    Area under {commodity.toLowerCase()}
                    </Typography>
                    </Box>
                    </Box>} */}
                    
                    {adaption !== '' &&
                    <Box sx={{width:'100%', display:'flex',flexDirection:'row',gap:'4px',padding:0,justifyItems:'center'}}>
                    {rows.map((row,index) => (
                        
                        <Box sx={{display:'flex',alignItems:'left',flexDirection:'column'}}>
                        {row.color}
                        <Box>
                        <Typography sx={{ fontSize: 14, fontWeight:'bold'}} color="black" > {row.Cat}&nbsp;for {calcpop(row.Population)}</Typography>
                        </Box>
                        </Box>
                        
                    ))}
                    </Box>
                    }
                    {RiskName !== "" && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: "#FF0000",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Extreme
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#FFA500',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Very High
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#FFFF00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    </Box>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#00FF00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#059212',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
                    </Box>
                    </Box>
                    </Box>}

        </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
      </Popper>
  );
}
