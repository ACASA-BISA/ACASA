import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Popper, Paper,Grid } from '@mui/material';
import { useRef } from "react";

function createData(color, Cat, Area, AreaPerc, Population) {
  return { color, Cat, Area, AreaPerc, Population };
}

export default function Legend_Small({
    location,
    commodity,
    adaption,
    RiskName,
    scenario,
    ImpactName,
    area_data3,
    area_data4
}) {

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


    const optcode = {'Stress Tolerant Variety':'ADVAR','Early Sowing':'ADPTI','Precision Land Levelling':'LASLV','Zero Tillage with residues':'ZTILL','Broad Bed and Furrow':'BBFIB',
    'Direct Seeded Rice - Dry':'DSDRY','Direct Seeded Rice - Wet':'DSWET','System of Rice Intensification':'SRIUT','Supplemental Irrigation':'WHSRC','Microirrigation':'MICIR','Precision Water Management':'PWMGT',
    'Precision Fertilizer Management':'PNMLT','Precision Fertilizer Management - High tech':'PNMHT','Deep Placement of Urea':'DR',
    'ICT linked Input Management':'WEAGA','Crop Insurance':'INSUR','Land Management':'LMGT','Feed Management':'FMGT','Herd Management':'HMGT',
    'Animal Health':'ANHLT','Animal Productivity':'ANPRO','Mulching':'MULCH','Alternate Wetting and Drying':'AWD','Fertilizer rating and timing':'FRT',
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
      "Feed/Fodder":'Residue',"Rural infrastructure":'Road network density',"Cyclone":'Cyclone',"Rainfall Deficit":"Rainfall deficit",
      "Extreme Rainfall days":"Extreme Rainfall Days","Cold days":"Cold Stress","Hot days":"Heat stress or hot days","Temperature-Humidity Index":'THI',
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
            rowstr = commodity+"_"+statecode+"_"+optcode[adaption]+"_"+scenario;
          }
          else if(x==='Nepal'){
            statecode = y + 'DIV';
            rowstr = commodity+"_"+statecode+"_"+optcode[adaption]+"_"+scenario;
          }
          else if(x==='Bhutan'||x==='Maldives'||x==='Afghanistan'||x==='India'||x==='Sri Lanka'||x==='Pakistan'){
            statecode = y;
            rowstr = commodity+"_"+statecode+"_"+optcode[adaption]+"_"+scenario;
          }
        }
        else{
          rowstr = "Calculated_"+commodity+"_"+location+"_"+optcode[adaption]+"_"+scenario;
        }
        const row_data = area_data3[rowstr.toLowerCase()];
        //console.log(rowstr);
        const total = Number(row_data['Unsuitable']) + Number(row_data['Suitable']) + Number(row_data['Suitable with adaptation benefits']);
        //console.log(total);
        data = 
        [
          createData(<Box sx={{width: '100%',height: 13,borderRadius: 0,bgcolor: 'rgba(180, 70, 109, 1)'}}/>,'Unsuitable', row_data['Unsuitable']/10, (row_data['Unsuitable']*100/total).toFixed(2), (row_data['Unsuitable Population']*0.16/1000000)),
          createData(<Box sx={{width: '100%',height: 13,borderRadius: 0,bgcolor: '#FF9A00'}}/>,'Suitable', row_data['Suitable']/10, (row_data['Suitable']*100/total).toFixed(2), (row_data['Suitable Population']*0.16/1000000)),
          createData(<Box sx={{width: '100%',height: 13,borderRadius: 0,bgcolor: '#06D001'}}/>,'Suitable with adaptation benefits', row_data['Suitable with adaptation benefits']/10, (row_data['Suitable with adaptation benefits Population']*100/total).toFixed(2), (row_data['Suitable with adaptation benefits Population']*0.16/1000000)),
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
              rowstr = commodity+"_"+statecode+"_"+hazardname[RiskName]+"_"+scenario;
            }
            else if(x==='Nepal'){
              statecode = y + 'DIV';
              rowstr = commodity+"_"+statecode+"_"+hazardname[RiskName]+"_"+scenario;
            }
            else if(x==='Bhutan'||x==='India'||x==='Sri Lanka'||x==='Pakistan'||x==='Maldives'||x==='Afghanistan'){
              statecode = y;
              rowstr = commodity+"_"+statecode+"_"+hazardname[RiskName]+"_"+scenario;
            }
          }
          else{
            rowstr = "Calculated_"+commodity+"_"+location+"_"+hazardname[RiskName]+"_"+scenario;
          }
          
          const row_data = area_data4[rowstr.toLowerCase()];
          const total = Number(row_data['Very Low']) + Number(row_data['Low']) + Number(row_data['Medium']) + Number(row_data['High']) + Number(row_data['Very High']) + Number(row_data['Nil']);
          //console.log(total);
          data = 
          [
            createData('#969696',
              "No significant "+typrstr(), row_data['Nil'], (row_data['Nil']*100/total).toFixed(2), (row_data['Nil Population']*0.16/1000000)),
            createData('#059212',
              'Very low', row_data['Very Low'], (row_data['Very Low']*100/total).toFixed(2), (row_data['Very Low Population']*0.16/1000000)),
            createData('#00FF00',
              'Low', row_data['Low'], (row_data['Low']*100/total).toFixed(2), (row_data['Low Population']*0.16/1000000)),
            createData('#FFDE4D',
              'Medium', row_data['Medium'], (row_data['Medium']*100/total).toFixed(2), (row_data['Medium Population']*0.16/1000000)),
            createData('#FFA500',
              'High', row_data['High'], (row_data['High']*100/total).toFixed(2), (row_data['High Population']*0.16/1000000)),
            createData('#E4003A',
              'Very high', row_data['Very High'], (row_data['Very High']*100/total).toFixed(2), (row_data['Very High Population']*0.16/1000000)),
          ];
          //console.log(data);
        }
        return data;
      };

    function calcpop(popu){
        if(popu===0){
          return 'None';
        }
        if(popu<0.1){
          if(checkcrop()){
          return '<0.1 million';
          }
          else{
            return '<0.1 million';
          }
        }
        if(popu<1 && popu>=0.1){
          if(checkcrop()){
          return popu.toFixed(1) + ' million';
          }
          else{
            return popu.toFixed(1) + ' million';
          }
        }
        if(checkcrop()){
          return Math.round(popu)+' million';
        }
        return Math.round(popu)+' million';
    }

    function calcarea(popu){
        if(popu===0){
          return 'None';
        }
        popu = popu/1000000;
        if(popu<0.1){
          if(checkcrop()){
          return '<0.1 Mha';
          }
          else{
            return '<0.1 million';
          }
        }
        if(popu<1 && popu>=0.1){
          if(checkcrop()){
          return popu.toFixed(1) + ' Mha';
          }
          else{
            return popu.toFixed(1) + ' million';
          }
        }
        if(checkcrop()){
          return Math.round(popu)+' Mha';
        }
        return Math.round(popu)+' million';
    }

    function vulcat(str){
      if(str==='Very low')
        return 'Very high';
      if(str==='Low')
        return 'High';
      if(str==='High')
        return 'Low';
      if(str==='Very high')
      return 'Very Low';
      return 'Medium';
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
        return 'vuln.';
      }
    }
    const rows = fetchthedataTable();
    let rowshzd = [];
    if((RiskName !== "" && RiskName !== "Hazard Index" && RiskType()==="Hazard") || (RiskName !== "" && RiskName !== "District Level" && RiskName !== "Downscaled Risk" && (checkcrop()===false||(commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard'))) || ((RiskName === "District Level"||RiskName==='Downscaled Risk') && commodity==='Rice')){
        rowshzd = fetchthedataHzd();
    }

    function RiskType(){
        let str = 'Hazard';
        if(RiskName==='Risk Index'||RiskName==='Exposure Index'||RiskName==='Vulnerability Index'||RiskName==='District Level'||RiskName==='Downscaled Risk'){
          str = 'Risk';
        }
        if(RiskName==='Number of Animals per grid'||RiskName==='Cropped Area') {
          str = 'Exposure';
        }
        if(RiskName==='Irrigation'||RiskName==='Soil Water Holding Capacity'||RiskName==='Income'||RiskName==='Soil Organic Carbon'
        ||RiskName==='Feed/Fodder'||RiskName==='Rural infrastructure'||RiskName==='Socio-economic Development Indicator') {
          str = 'Vulnerability';
        }
        return str;
      };

  return (
    <div style={{maxWidth:'320px'}}>
    <Paper elevation={1} sx={{padding:'10px',borderRadius:'5px',boxShadow:'0px 0px 0px #aaa',textAlign:'left'}}>
        {adaption !== '' && <div>
        <Box sx={{display:'flex'}}>
        <Typography sx={{ fontSize: 11, marginBottom:'2px'}} color="black">
          Technical suitability of&nbsp;{adaption.charAt(0).toUpperCase()+adaption.slice(1,4)+adaption.toLowerCase().slice(4)} for number of farm households:
          </Typography>
          </Box>
        </div>}
        {((RiskName !== "" && RiskType()==="Hazard" && checkcrop())) && <div>
            <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: 11, marginBottom: '2px' }} color="black">
                Affected&nbsp;
                <span style={{ color: '#AA5486', fontWeight: 'bold' }}>farm households</span>
                &nbsp;and&nbsp;
                <span style={{ color: '#859F3D', fontWeight: 'bold' }}>cropped area</span>
                :
            </Typography>
            </Box>
        </div>}
        {((RiskName !== "" && checkcrop()===false)) && <div>
            <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontSize: 11, marginBottom: '2px' }} color="black">
                Affected&nbsp;
                <span style={{ color: '#859F3D', fontWeight: 'bold' }}>number of animals</span>
                :
            </Typography>
            </Box>
        </div>}
        {((RiskName !== "" && RiskType()==="Vulnerability" && ((commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard')))) && <div>
        <Box sx={{display:'flex'}}>
        <Typography  sx={{ fontSize: 11, marginBottom:'2px'}} color="black">
        Farm households under different categories of {RiskName.toLowerCase()}
            </Typography>
        </Box>
        </div>
        }
        {((RiskName !== "" && RiskType()==="Exposure" && ((commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard')))) && <div>
        {/* <Box sx={{display:'flex'}}>
        <Typography  sx={{ fontSize: 13, marginBottom:'2px'}} color="black">
        Number of farm households affected by this {typrstr().toLowerCase()} in {commodity.toLowerCase()}
            </Typography>
        </Box> */}
        </div>
        }
        <Typography sx={{ fontSize: 12 }} color="black" >
            
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
                    <Box sx={{width:'100%', display:'flex',flexDirection:'row',padding:0,justifyItems:'center',marginTop:'1px'}}>   
                    {rows.map((row,index) => ( 
                        <Box sx={{width:'33%',display:'flex',alignItems:'left',flexDirection:'column'}}>
                          {row.color}
                          <Box>
                          <Typography sx={{ fontSize: 10.5, fontWeight:'bold', margin:'2px'}} color="black" > {row.Cat} for {calcpop(row.Population)}</Typography>
                          {row.Cat==='Suitable' && <Typography sx={{ fontSize: 10, fontWeight:'normal'}} color="black" > (No significant hazards)</Typography>}
                          </Box>
                        </Box>
                        
                    ))}
                    </Box>
                    }
                    {((RiskName !== "" && RiskName !== "Hazard Index" && RiskType()==="Hazard") || ((RiskName !== "" && RiskType()==="Hazard" && (checkcrop()===false||(commodity==='Rice'||commodity==='Wheat'||commodity==='Barley'||commodity==='Soybean'||commodity==='Cotton'||commodity==='Chickpea'||commodity==='Maize'||commodity==='Mustard'))))) &&
                      <div> 
                      <Box sx={{width:'100%', display:'flex',flexDirection:'row',padding:0,justifyItems:'center',marginTop:'1px'}}>
                      {rowshzd.map((row,index) => (
                          <div>
                              {index!==0 && 
                              <div>
                                  <Box sx={{display:'flex',alignItems:'left',flexDirection:'column',width:'100%',gap:'2px'}}>
                                  {checkcrop()===true && <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                      <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'> {calcpop(row.Population)}</Typography>
                                      </Box>}
                                      <Box sx={{width: 58, height: 18, borderRadius: 0, bgcolor:row.color, alignContent:'center'}}>
                                      <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                      <strong>{row.Cat}</strong>
                                      </Typography>
                                      </Box>
                                      <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                      <Typography sx={{ fontSize: 10, margin:'2px'}} color="#859F3D" fontWeight='bold'> {calcarea(row.Area)}</Typography>
                                      </Box>
                                  </Box>
                              </div>
                              }
                          </div>
                      ))}
                      </Box>
                      {/* {rowshzd.map((row,index) => (
                          <div>
                          {index===0 &&
                              <div>
                                  <Box sx={{display:'flex',alignItems:'left',flexDirection:'row',width:'100%'}}>
                                      <Box sx={{width: 110,height: 18,borderRadius: 0,bgcolor:row.color, margin:0, alignContent:'center'}}>
                                      <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                          <strong>{row.Cat}</strong>
                                      </Typography>
                                      </Box>
                                      {checkcrop()===true && <Box>
                                      <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'>{calcpop(row.Population)}</Typography>
                                      </Box>}
                                      <Box>
                                      <Typography sx={{ fontSize: 10, margin:'2px'}} color="#859F3D" fontWeight='bold'>{calcarea(row.Area)}</Typography>
                                      </Box>
                                  </Box>
                              </div>
                          }
                          </div>
                      ))} */}
                      </div> 
                    }
                    {(((RiskName !== "" && RiskType()==="Vulnerability"))) &&
                    <div>
                      <Box sx={{width:'100%', display:'flex',flexDirection:'row',padding:0,justifyItems:'center',marginTop:'1px'}}>   
                      {rowshzd.map((row,index) => (
                          <div>
                          {index!==0 && 
                                <div>
                                    <Box sx={{display:'flex',alignItems:'left',flexDirection:'column',width:'100%',gap:'2px'}}>
                                    {checkcrop()===true && <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'> {calcpop(row.Population)}</Typography>
                                        </Box>}
                                        <Box sx={{width: 58, height: 18, borderRadius: 0, bgcolor:row.color, alignContent:'center'}}>
                                        <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                        <strong>{row.Cat}</strong>
                                        </Typography>
                                        </Box>
                                        <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#859F3D" fontWeight='bold'> {calcarea(row.Area)}</Typography>
                                        </Box>
                                    </Box>
                                </div>
                                }
                          </div>
                      ))}
                      </Box>
                    </div>
                    }
                    {(((RiskName !== "" && (RiskType()==="Exposure"||RiskType()==='Risk')))) &&
                    <div>
                    <Box sx={{width:'100%', display:'flex',flexDirection:'row',padding:0,justifyItems:'center',marginTop:'1px'}}>   
                      {rowshzd.map((row,index) => (
                          <div>
                          {index!==0 && 
                                <div>
                                    <Box sx={{display:'flex',alignItems:'left',flexDirection:'column',width:'100%',gap:'2px'}}>
                                    {checkcrop()===true && <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#AA5486" fontWeight='bold'> {calcpop(row.Population)}</Typography>
                                        </Box>}
                                        <Box sx={{width: 58, height: 18, borderRadius: 0, bgcolor:row.color, alignContent:'center'}}>
                                        <Typography sx={{ fontSize: 10, marginY:'auto',marginLeft:'3px'}} color="white" > 
                                        <strong>{row.Cat}</strong>
                                        </Typography>
                                        </Box>
                                        <Box sx={{width: 58, height: 18, borderRadius: 0}}>
                                        <Typography sx={{ fontSize: 10, margin:'2px'}} color="#859F3D" fontWeight='bold'> {calcarea(row.Area)}</Typography>
                                        </Box>
                                    </Box>
                                </div>
                                }
                          </div>
                      ))}
                      </Box>
                    </div>
                    }
        </Typography>
        </Paper>
      </div>
  );
}
