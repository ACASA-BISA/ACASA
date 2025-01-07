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
/* import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; */

const size = {
  width: 170,
  height: 170,
};

const palette = ['rgba(180, 70, 109, 1)','#FF9A00','#06D001'];

const palette2 = ["#059212", '#00FF00', "#FFDE4D", "#FFA500",'#FF0000','#969696'];

function createData(color, Cat, Area, AreaPerc, Population) {
  return { color, Cat, Area, AreaPerc, Population };
}

//General Suitability

const color_comm = {"Rice":'#5ec962',"Wheat":"#f7e465","Maize":"#ffcc00","Sorghum":'#8b4513',"Soybean":"#8c7658",
  "Chickpea":"#b3a057","Pigeonpea":"#de815f","Mustard":"#FFDB58","Groundnut":"#d2691e","Potato":"#ab6042","Onion":"#8e507f",
  "Cotton":"#5102b0","Cattle":"#8B4513","Cow":"#ac8e59","Buffalo":"#5c2f08","Pig":"#FFC0CB","Poultry":"#FF8C00","Sheep":"#5fdbfa",
  "Goat":"#7ca67c","Barley":'#5ec962'
};

const unitrisk = {'Risk Index': 'The risk index is derived from hazard, exposure and vulnerability indices', 
  'Hazard Index': 'Integrated index which combines multiple hazards', 
  'Low temperature induced spikelet sterility': 'Number of days with low temperature during anthesis period leading to spikelet sterility', 
  'Untimely Rainfall': 'Number of untimely rainfall days during the crop season', 
  'Low temperature induced pollen sterility': 'Number of days with low temperature during pollination under leading to pollen sterility', 
  'High temperature induced pollen sterility': 'Number of days with high temperature during pollination under leading to pollen sterility', 
  'Heat Stress': 'Number of days with high temperature', 
  'High temperature induced spikelet sterility': 'Number of days with high temperature during anthesis period leading to spikelet sterility', 
  'Cold Stress': 'Number of days with low temperature', 
  'Low temperature induced tuberization failure': 'Number of days with low temperature leading to tuberization failure', 
  'Terminal Heat': 'Number of days with high temperature during grain-filling phase',
   'Days of Frost': 'Number of frost days', 'Excess Rainfall and Waterlogging': 'Number of excess rainfall days leading to waterlogging', 
   'Delayed Monsoon': 'Percentage of years with delayed monsoon', 'Drought': 'Number of years with moderate or severe drought', 
   'Dry Spell': 'Number of dry spells', 'Flood': 'Number of flood events', 'Lodging': 'Number of days under high wind and rainfall after booting phase', 
   'Biotic': 'Number of days with high temperature and humidity leading to blight',
   'Excess Rainfall': 'Number of excess rainfall days during the crop season', 
   'Temperature-Humidity Index': 'Number of days with high THI', 'Hot days': 'Number of days with high temperature', 
   'Cold days': 'Number of days with low temperature', 'Extreme Rainfall days': ' Number of excess rainfall days',
   'Rainfall Deficit': 'Percentage of years with rainfall deficit', 'Cyclone': 'Degree of cyclone proneness', 
   'Number of Animals per grid': 'Total number of animals per grid [~5 X 5 km]', 
   'Vulnerability Index': 'Integrated index which combines multiple vulnerability layers',
   'Irrigation': 'Area under irrigation per grid, %', 'Soil Water Holding Capacity': 'Available Water in mm/m', 
   'Soil Organic Carbon': 'Soil Organic Carbon in %', 'Income': 'Agricultural GDP as proxy for income. Agricultural Gross Domestic Product data in US $ per grid [~5 X 5 km]', 
   'Rural infrastructure': 'Road density used as proxy for rural infrastructure. Road density is length of rural roads per grid, km/grid', 
   'Socio-economic Development Indicator': 'HDI used as proxy. Global estimates of the United Nations Human Development Index',
   'Availability of crop residues': 'Production and Usage of cereal residues in tonnes per grid [~5 X 5 km]',
   'Cropped Area': 'Area under crop in hectares per grid [~5 X 5 km]'};

export default function LocationCard({
    location,
    commodity,
    adaption,
    setHeight1,
    RiskName,
    scenario,
    ImpactName,
    area_data,
    area_data2
}) {
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);
  useEffect(() =>{
    if(cardRef.current){
    setCardHeight(cardRef.current.offsetHeight);
    setHeight1(cardHeight);
    }
  });

  const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residues':'ZTILL','Broad Bed and Furrow':'BBFIB',
    'Direct Seeded Rice - Dry':'DSDRY','Direct Seeded Rice - Wet':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
    'Precision Fertilizer Management - Low tech (PFM)':'PNMLT','Precision Fertilizer Management - High tech':'PNMHT','Deep Placement of Urea':'DR',
    'Precision Agro Input Management':'WEAGA','Agri. Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
    'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate wetting and drying (AWD)':'AWD','Fertilizer rating and timing':'FRT',
    'Manure Management':'MNMGT','Information Use':'INFO','Heat Stress Management':'HSMGT'};
    
    const hazardname = {"District Level": "District Level","Downscaled Risk": "Downscaled Risk","Risk Index": "Risk index","Hazard Index": "Hazard Index",
      "Low temperature induced spikelet sterility": "Low temperature induced spikelet sterility",
      "Low temperature induced pollen sterility": "Low temperature induced pollen sterility","High temperature induced pollen sterility": "High temperature induced pollen sterility",
      "Heat Stress": "Heat stress","High temperature induced spikelet sterility": "High temperature induced spikelet sterility",
      "Cold Stress": "Cold stress","Low temperature induced tuberization failure": "Low temperature induced tuberization failure",'Untimely Rainfall':"Untimely rainfall",
      "Terminal Heat": "Terminal heat","Days of Frost": "Days of frost","Excess Rainfall and Waterlogging": "Excess rain and waterlogging",
      "Delayed Monsoon": "Delayed monsoon","Drought": "Drought","Dry Spell": "Number of dry spells","Flood": "Flood","Soil Organic Carbon":"Soil organic carbon",
      "Lodging": "Rain and wind causing lodging","Biotic": "High humidity and temperature for blight","Irrigation": "Irrigation","Soil Water Holding Capacity": "Water holding capacity","Income": "Agricultural GDP",
      "Access to Credit": "Access to Credit","Access to Market": "Access to Market","Elevation": "Elevation","Access to Knowledge": "Access to Knowledge","Exposure Index": "Exposure Index",
      "Number of Farmers": "Number of Farmers","Cropped Area": "Extent","Excess Rainfall":"Excess rainfall","Number of Animals per grid":"Number of animals per grid",
      'Cold stress in reproductive stage':'Cold stress in reproductive stage','Heat stress in reproductive stage':"Heat stress in reproductive stage",
      'Heat stress during boll formation':'Heat stress during boll formation','Cold stress during flowering':'Cold stress during flowering',
      'High tempearture during flowering':'High tempearture during flowering','Biotic Stress':'Biotic stress',"Vulnerability Index":'Vulnerability Index',
      "Availability of crop residues":'Residue',"Rural infrastructure":'Road network density',"Cyclone":'Cyclone',"Rainfall Deficit":"Rainfall deficit",
      "Extreme Rainfall days":"Extreme Rainfall Days","Cold days":"Cold Stress","Hot days":"Heat stress or hot days","Temperature-Humidity Index":'THI',
      "Socio-economic Development Indicator":"Human development index"};


      function checkcrop() {
        const diffcrop = ['Cattle','Buffalo','Goat','Sheep','Pig','Poultry'];
        let ans = true;
        diffcrop.forEach((sname) => {
          if(commodity===sname){
            ans = false;
          }
        })
        return ans;
      };

    function fetchthedataPie() {
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
        const row_data = area_data[rowstr.toLowerCase()];
        //console.log(area_data);
        //console.log("Float");
        //console.log(rowstr);
        //console.log(rowstr.toLowerCase());
        const total = Number(row_data['Unsuitable']) + Number(row_data['Suitable']) + Number(row_data['Adaptation Benefits']);
        data = [
          { value: (row_data['Unsuitable']*100/total).toFixed(1), label: 'Unsuitable' },
          { value: (row_data['Suitable']*100/total).toFixed(1), label: 'Suitable' },
          { value: (row_data['Adaptation Benefits']*100/total).toFixed(1), label: 'Suitable with adaptation benefits' },
        ];
        //console.log(data);
      }
      return data;
    }
    
    const data2 = fetchthedataPie(); 

    function fetchthedataPieHzd() {
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
        //console.log(rowstr);
        const total = Number(row_data['Very Low']) + Number(row_data['Low']) + Number(row_data['Medium']) + Number(row_data['High']) + Number(row_data['Very High']) + Number(row_data['Nil']);
        //console.log(total);
        data = [
          { value: (row_data['Very Low']*100/total).toFixed(1), label: 'Very Low' },
          { value: (row_data['Low']*100/total).toFixed(1), label: 'Low' },
          { value: (row_data['Medium']*100/total).toFixed(1), label: 'Medium' },
          { value: (row_data['High']*100/total).toFixed(1), label: 'High' },
          { value: (row_data['Very High']*100/total).toFixed(1), label: 'Very High' },
          { value: (row_data['Nil']*100/total).toFixed(1), label: 'Nil' },
        ];
        //console.log(data);
      }
      return data;
    }
    
    let data3 = [];
    if((RiskName !== "" && RiskName !== "Hazard Index" && RiskType()==="Hazard") || ((RiskName !== "" && RiskName !== "District Level" && RiskName !== "Downscaled Risk" && (checkcrop()===false||(commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard'))))||((RiskName === "District Level"||RiskName==='Downscaled Risk') && commodity==='Rice')){
      data3 = fetchthedataPieHzd();
    }

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
        const row_data = area_data[rowstr.toLowerCase()];
        //console.log("Float");
        //console.log(rowstr);
        const total = Number(row_data['Unsuitable']) + Number(row_data['Suitable']) + Number(row_data['Adaptation Benefits']);
        //console.log(total);
        data = 
        [
          createData(<Box sx={{width: 60,height: 13,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',marginY:'2px'}}/>,'Unsuitable', row_data['Unsuitable']/10, (row_data['Unsuitable']*100/total).toFixed(1), row_data['Unsuitable_Area']/1000000),
          createData(<Box sx={{width: 60,height: 13,borderRadius: 1,bgcolor: '#FF9A00',marginY:'2px'}}/>,'Suitable', row_data['Suitable']/10, (row_data['Suitable']*100/total).toFixed(1), row_data['Suitable_Area']/1000000),
          createData(<Box sx={{width: 60,height: 13,borderRadius: 1,bgcolor: '#06D001',marginY:'2px'}}/>,'Suitable with adaptation benefits', row_data['Adaptation Benefits']/10, (row_data['Adaptation Benefits']*100/total).toFixed(1), row_data['Adaptation Benefits_Area']/1000000),
        ];
        //console.log(data);
      }
      return data;
    }

    function typrstr(){
      if(RiskType()==='Hazard'){
        return 'hazard';
      }
      if(RiskType()==='Risk'){
        return 'index';
      }
      if(RiskType()==='Exposure'){
        return 'exposure';
      }
      if(RiskType()==='Vulnerability'){
        return 'vuln.'
      }
    }

    function UnitFind(RiskName){
      let x = unitrisk[RiskName];
      if(x){
        x = "(" + x + ")";
        return x;
      }
      return "";
    }

    const rows = fetchthedataTable()

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
    if(RiskName==='Vulnerability Index'||RiskName==='Irrigation'||RiskName==='Soil Water Holding Capacity'||RiskName==='Income'||RiskName==='Soil Organic Carbon'
    ||RiskName==='Availability of crop residues'||RiskName==='Rural infrastructure'||RiskName==='Socio-economic Development Indicator') {
      str = 'Vulnerability';
    }
    return str;
  }
    
  return (
    <Popper
    open={true}
      >
        <div ref={cardRef} style={{position:'fixed',right:10,top:95, boxShadow:'0px 0px 0px #aaa',backgroundColor: 'white', border: '0px solid black', width:'280px', borderRadius:'15px' }}>
        <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{justifyItems:'center',alignContent:'center',marginBottom:'-5px'}}
        > <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>Your Selections</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{marginTop:-1,marginBottom:0}}>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <LocationOn fontSize='small' color='inherit' />
        <Typography sx={{ fontSize: 15, fontWeight:'bold', color:'#143200',marginLeft:'4px'}}>
         {location}
        </Typography>
        </Box>
        <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.3, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Commodity:&nbsp;
        </Typography>
        <Typography sx={{ fontSize: 14, }} color="text.secondary" >
                    {commodity}
                    </Typography>
        </Box>
        <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Scenario:&nbsp;
        </Typography>
        <Typography sx={{ fontSize: 14, }} color="text.secondary" >
                    {scenario}
                    </Typography>
        </Box>
        {adaption !== '' && <div><Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex'}}>
        <Typography sx={{ fontSize: 14 }} color="black" flexWrap>
          Technical suitability of&nbsp;<strong>{adaption.charAt(0).toUpperCase()+adaption.slice(1,4)+adaption.toLowerCase().slice(4)}</strong> by area %:</Typography>
          </Box>
        </div>}
        {RiskName !== '' && <div><Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" >
          Risk Method:&nbsp;</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{RiskMethod()}</Typography>
        </Box>
        <Typography sx={{ fontSize: 14, whiteSpace: 'pre-wrap' }} color="black">
          {RiskType()}:&nbsp;
          <Typography component="span" sx={{ fontSize: 14, fontWeight:'bold' }} color='text.secondary'>
            {RiskName.charAt(0).toUpperCase() + RiskName.toLowerCase().slice(1)}&nbsp;
            <Typography component="span" sx={{ fontSize: 12 }}>
              {UnitFind(RiskName)}
            </Typography>
          </Typography>
        </Typography>
        </div>}
        {ImpactName !== '' && <div><Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{ fontSize: 14 }} color="black" >
          Impact:&nbsp;</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                    {ImpactName.charAt(0).toUpperCase() + ImpactName.toLowerCase().slice(1)}
                    </Typography></Box>
        </div>}
        
        <Typography sx={{ fontSize: 14 }} color="black" >
            
                    { adaption === '' && RiskName === '' && ImpactName==='' && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Divider sx={{bgcolor:'#e8ffea', borderBottomWidth: 2, marginTop: 0.1, marginBottom: 0.3}}/>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    {(checkcrop() && (commodity!=='Rice'&&commodity!=='Wheat'&&commodity!=='Barley'&&commodity!=='Soybean'&&commodity!=='Cotton'&&commodity!=='Chickpea'&&commodity!=='Maize'&&commodity!=='Mustard')) && <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: color_comm[commodity],margin:'4px'}}/>}
                    {(checkcrop() && (commodity!=='Rice'&&commodity!=='Wheat'&&commodity!=='Barley'&&commodity!=='Soybean'&&commodity!=='Cotton'&&commodity!=='Chickpea'&&commodity!=='Maize'&&commodity!=='Mustard')) && <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" > 
                     Area under {commodity.toLowerCase()}
                    </Typography>}
                    {(checkcrop()===false || (commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard')) && 
                    <div>
                    {checkcrop()===false && <Typography sx={{ fontSize: 14, margin:'4px',fontWeight:'bold' }} color="text.secondary" > 
                     Region having {commodity.toLowerCase()} population
                    </Typography>}
                    {(commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard') && <Typography sx={{ fontSize: 14, margin:'4px',fontWeight:'bold'}} color="text.secondary" > 
                    Area under {commodity.toLowerCase()}
                    </Typography>}
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
                    <Box sx={{width: 20,height: 110,borderRadius: 1,background: 'linear-gradient(to top, rgba(255, 249, 196, 1), rgba(255, 230, 128, 1), rgba(255, 215, 0, 1), rgba(218, 165, 32, 1), rgba(160, 82, 45, 1), rgba(107, 61, 27, 1))',margin:'4px',marginLeft:'10px'}}/>
                    <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography sx={{ fontSize: 14, marginX:'4px',marginY:'1px' }} color="text.secondary" gutterBottom> 
                    Very high
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginX:'4px',marginY:'1px'  }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                    Very Low
                    </Typography>
                    </Box>
                    
                    </Box> 
                    </div>}
                    </Box>
                    </Box>}
                    
                    {adaption !== '' && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: "#bbb",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    {commodity} mask
                    </Typography>
                    </Box> */}
                    
                    <Box sx={{width:'100%', display:'flex',alignItems:'center',flexDirection:'column'}}>
                    
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right:10 }}
                      colors={palette}
                      series={[
                        {
                          arcLabel: (item) => `${item.value}%`,
                          arcLabelMinAngle: 5,
                          data: data2,
                          innerRadius: 25,
                          paddingAngle: 0,
                        },
                      ]}
                      slotProps={{
                        legend: { hidden:true} 
                      }}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      {...size}
                    /> 
                    {/* <TableContainer component={Paper} sx={{marginTop:'7px', 'td,th':{border:'1px solid rgba(224, 224, 224, 1)',paddingX:'4px',paddingY:'2px'}}}>
            <Table size="small" aria-label="a dense table">
                <TableHead sx={{backgroundColor:'#eeeeee'}}>
                <TableRow>
                    <TableCell colSpan={3} sx={{fontWeight:'bold',backgroundColor:'#4b9e44',color:'#ffffff'}}>Legend & Statistics</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Category</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Area in 1000 ha</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Farmer population in millions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row,index) => (
                    <TableRow
                    key={index}
                    >
                    <TableCell component="th" scope="row" align="left">
                       {row.color}{row.Cat}
                    </TableCell>
                    <TableCell align="center">{row.Area}<Typography sx={{ fontSize: 13, margin:'2px',fontWeight:'normal' }} color="text.secondary" >({row.AreaPerc}%)</Typography></TableCell>
                    <TableCell align="center">{row.Population}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
                </TableContainer> */}
                    </Box>
                    {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: 'rgba(180, 70, 109, 1)',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Unsuitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: '#FF9A00',margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Suitable
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: "#06D001",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Suitable with adaptation benefits
                    </Typography>
                    </Box> */}
                    </Box>
                    }
                    {(RiskName === "Hazard Index" && checkcrop() && (commodity!=='Rice'||commodity!=='Wheat'||commodity!=='Barley'||commodity!=='Soybean'||commodity!=='Cotton'||commodity!=='Chickpea'||commodity!=='Maize'||commodity!=='Mustard'))||((ImpactName==='Impact on Productivity') && commodity==='Rice') && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'1px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#FF0000",marginY:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Very High
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: '#FFA500',margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#FFDE4D",margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    </Box>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'1px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#00FF00",marginY:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: '#059212',margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Very Low
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#bbb",margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Nil
                    </Typography>
                    </Box>
                    </Box>
                    </Box>}
                    {/* {RiskName !== "" && RiskName !== "Hazard Index" && checkcrop()===false &&
                      <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
                      <Box sx={{width: 20,height: 85,borderRadius: 1,background: 'linear-gradient(to bottom, rgba(255,0,0,1),rgba(255, 165, 0,1),rgba(255, 255, 0,1),rgba(0, 255, 0,1),rgba(5, 146, 18,1) )',margin:'4px',marginLeft:'10px'}}/>
                      <Box sx={{display:'flex',flexDirection:'column'}}>
                      <Typography sx={{ fontSize: 14, marginX:'4px',marginY:'1px' }} color="text.secondary" gutterBottom> 
                      Very high
                      </Typography>
                      <Typography sx={{ fontSize: 14, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                      High
                      </Typography>
                      <Typography sx={{ fontSize: 14, marginX:'4px',marginY:'1px'  }} color="text.secondary" gutterBottom> 
                      Medium
                      </Typography>
                      <Typography sx={{ fontSize: 14, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                      Low
                      </Typography>
                      </Box>
                      
                      </Box> 
                    } */}
                    {((RiskName !== "" && RiskName !== "Hazard Index" && RiskType()==="Hazard") || ((RiskName !== "" && RiskName !== "District Level" && RiskName !== "Downscaled Risk" && (checkcrop()===false||(commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard'))))||(((RiskName === "District Level"||RiskName==='Downscaled Risk') && commodity==='Rice'))) && <Box sx={{marginTop:'2px',marginBottom:'-5px'}}>
                    {/* <Box sx={{width:'100%', display:'flex',alignContent:'center'}}>
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right:10 }}
                      colors={palette}
                      series={[
                        {
                          arcLabel: (item) => `${item.value}`,
                          arcLabelMinAngle: 5,
                          data,
                        },
                      ]}
                      slotProps={{
                        legend: { hidden:true} 
                      }}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      {...size}
                    />
                    </Box> */}
                    {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 20,height: 20,borderRadius: 1,bgcolor: "#bbb",margin:'4px'}}/>
                    <Typography sx={{ fontSize: 14, margin:'4px' }} color="text.secondary" gutterBottom> 
                    {commodity} mask
                    </Typography>
                    </Box> */}
                    {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
                    <Box sx={{width: 20,height: 85,borderRadius: 1,background: 'linear-gradient(to bottom, rgba(255,0,0,1),rgba(255, 165, 0,1),rgba(255, 255, 0,1),rgba(0, 255, 0,1),rgba(5, 146, 18,1) )',margin:'4px',marginLeft:'10px'}}/>
                    <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography sx={{ fontSize: 14, marginX:'4px',marginY:'1px' }} color="text.secondary" gutterBottom> 
                    Very high
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginX:'4px',marginY:'1px'  }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginX:'4px' ,marginY:'1px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
                    </Box>
                    
                    </Box> */}
                    <Box sx={{width:'100%', display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <PieChart
                      margin={{ top: 10, bottom: 10, left: 10, right:10 }}
                      colors={palette2}
                      series={[
                        {
                          arcLabel: (item) => `${item.value}%`,
                          arcLabelMinAngle: 5,
                          data: data3,
                          innerRadius: 22,
                          paddingAngle: 0,
                        },
                      ]}
                      slotProps={{
                        legend: { hidden:true} 
                      }}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      {...size}
                    /> 
                    {(checkcrop() && RiskType()==='Hazard') && <Typography sx={{ fontSize: 12, margin:'4px', fontWeight:'bold' }} color="text.secondary">Area affected</Typography>}
                    {(checkcrop() && RiskType()!=='Hazard') && <Typography sx={{ fontSize: 12, margin:'4px', fontWeight:'bold' }} color="text.secondary">Area categories</Typography>}

                    {checkcrop()===false && <Typography sx={{ fontSize: 12, margin:'4px', fontWeight:'bold' }} color="text.secondary">Number of {commodity.toLowerCase()} by category</Typography>}
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'1px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#FF0000",marginY:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Very High
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: '#FFA500',margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    High
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#FFDE4D",margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Medium
                    </Typography>
                    </Box>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'1px'}}>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#00FF00",marginY:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Low
                    </Typography>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: '#059212',margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px' }} color="text.secondary" gutterBottom> 
                    Very Low
                    </Typography>
                    </Box>
                    {RiskType()==='Hazard' &&
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <Box sx={{width: 16,height: 16,borderRadius: 1,bgcolor: "#bbb",margin:'4px',marginX:'2px'}}/>
                    <Typography sx={{ fontSize: 12, margin:'4px',marginX:'2px' }} color="text.secondary" gutterBottom> 
                    No {typrstr()}
                    </Typography>
                    </Box>}
                    {RiskType()!=='Hazard' &&
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
                    
                    </Box>}
                    </Box>
                    </Box>}
        </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
      </Popper>
  );
}
