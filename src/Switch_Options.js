import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function SwitchOpt({
    activeCrop,
    activeOpt,
    changeOpt,
    activeOptLayer,
    changeOptLayer
}) {
  const switchh = ['Planting Technology','Water Management','Fertilizer Management'];
  const directswitch = ['Stress Tolerant Variety'];
  const directswitchdown = ['ICT linked Input Management','Crop Insurance'];

  const planting_rice = ['Early Sowing','Precision Land Levelling','Zero Tillage with residues',
  'Direct Seeded Rice - Dry','Direct Seeded Rice - Wet','System of Rice Intensification'];

  const water = ['Supplemental Irrigation','Microirrigation','Precision Water Management'];

  const water_rice = ['Supplemental Irrigation','Microirrigation','Precision Water Management','Alternate Wetting and Drying'];

  const fertilizer_rice = ['Fertilizer rating and timing','Precision Fertilizer Management'];

  const planting = ['Early Sowing','Precision Land Levelling','Zero Tillage with residues','Broad Bed and Furrow'];

  const fertilizer = ['Fertilizer rating and timing','Precision Fertilizer Management'];
  
  const livestock = ['Shelter Management','Feed Management','Healthcare Management'];

  const marine = ['To be Updated'];

  const livestock_shelter_master = ["Micro-climate modification shelter","Modification of shelter",
    "Planting of trees","Bathing","Mechanical cooling","Wallowing","Heating management"];

  const livestock_feed_master = ["Balanced concentrate with buffer","Mineral mixture supplementation",
    "By pass protein and fats","Feed additivies, antioxidants, vitamins and probiotics",
    "Modification in feeding pattern, schedule, grazing and space","Inclusion of green fodder",
    "Fodder conservation","Ad lib water","Grassland and Silvi-pasture management",
    "Protien and amino acid supplementation","Feed additivies, electrolyte, antioxidants, vitamins and probiotics"];

  const livestock_health_master = ["Parasite control","Thinning of flock","Separation of multi-aged flock",
    "Control of ectoparasites and other vectors"];

  const livestock_standalone = ["Reproductive management: Estrous confirmation and synchronisation",
    "Adoption of climate resillient breeds",
    "Weather forecasts/THI advisory services","Livestock insurance","Diversification"];

/*   const opt2 = ['Weather Services','Laser Land Levelling','Zero Tillage','BBR/FIRB','Early Sowing',
    'DSR (Dry Seed)','DSR (Wet Seed)','SRI','Insurance',
    'Adaptive Varities','Urea Placement','Arid & Semi-Arid','N Fertiliser (RDF)','PNM (Low Tech)',
    'PNM (High Tech)','Microirrigation','Precision WM','Supplimentary Irrigation',
    'Frost Gun','Slow Release Fertilizer','Micro-Environment','Fog/Mist Gun','Mechanical Support',
    'Fertilizer Timing','Shading Canopy','Cooling Canopy']; */

/*   const fullList = ['rice','wheat','maize','sorghum','fmillet','pmillet',
    'safflower','sunflower','rapeseed','sesame','groundnut',
    'soyabean','chickpea','ppea','bgram','ggram','lentil',
    'cotton','jute','rubber','sugarcane','tea','coconut',
    'cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater',
    'potato','onion','tomato','chilli','mango','banana'];

  function PopulateOptions() {
    const DisableList = {};
    fullList.forEach((sname) => {
        if(activeCrop[sname] && sname === 'rice'){
          opt.map((option,index) => { 
          DisableList[option] = true;
          const list = [10,2,3,5,6,7,8,11,13,14,15,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'wheat'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'maize'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,12,13,14,15,16,17,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
        if(activeCrop[sname] && sname === 'sorghum'){
          opt.map((option,index) => {
          DisableList[option] = true;
          const list = [10,2,3,4,5,12,13,14,16,18,1,9];
          if(list.includes(index+1)){
            DisableList[option] = false;
          }
        });
        }
    });
    return DisableList;
  }

  const [DisableList, setDisableList] = React.useState(
    PopulateOptions
  ); */

  function createInitialTodos() {
  const initialTodos = {};
  switchh.forEach((sname) => {
    initialTodos[sname] = false;
  });
  return initialTodos;
  };

  function checkcrop() {
    const diffcrop = ['cattle','buffalo','goat','sheep','pig','poultry',
    'freshwater','bracklish','marine','coldwater','rice'];
    let ans = true;
    diffcrop.forEach((sname) => {
      if(activeCrop[sname]===true){
        ans = false;
      }
    })
    return ans;
  };

  function checknotFish(){
    const fishes = ['freshwater','bracklish','marine','coldwater'];
    let ans = true;
    fishes.forEach((sname) => {
      if(activeCrop[sname]===true){
        ans = false;
      }
    })
    return ans;
  };

  function createInitialLivestockSwitches() {
    const initialTodos = {};
    livestock.forEach((sname) => {
      initialTodos[sname] = false;
    });
    return initialTodos;
  };

  const [state, setState] = React.useState(
    createInitialTodos
  );

  const [livestockstate, setLivestockState] = React.useState(
    createInitialLivestockSwitches
  );

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked});
  };

  const handleLivestockChange = (name) => (event) => {
    setLivestockState({...livestockstate, [name]: event.target.checked});
  };

  const padd = 8;

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 30+padd,
    height: 12+padd,
    padding: padd/2,
    display: 'flex',
    
    '& .MuiSwitch-switchBase': {
      padding: 2+padd/2,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          // 4ba046 and 4aba03 and dea426 and b9f04d
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#4ba046',
        },
      },
      
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 10,
      height: 8,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 14 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.10)',
      boxSizing: 'border-box',
    },
    '&:hover': { 
        backgroundColor: '#ffe89c',
        opacity:1,
        borderRadius: 12,
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.7)',
          },
     },
  }));

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    alignItems: 'flex-start', // Align items to the start 
    '&.Mui-disabled .MuiTypography-body2': {
      color: '#ccc', // Color for the label text when disabled
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard"  sx={{paddingTop:1, paddingLeft:3}}>
      <FormLabel sx={{display:'flex',paddingBottom:1}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:1,}}>Select Layer(s)</Typography>
        </FormLabel>
        <FormGroup>
        <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Technical Suitability']} name="Technical Suitability" 
            onChange={changeOptLayer}
            color="success" sx={{padding:0,marginLeft:1}}/>} 
            label={<Typography variant="body2" align='left'  sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
            whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Adaptation Benefits</Typography>}/>
        <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Socio-Economic']}  name="Socio-Economic" 
            onChange={changeOptLayer}
            color="success" sx={{padding:0,marginLeft:1}}/>} 
            label={<Typography variant="body2" align='left'  sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
            whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Socio-Economic Benefits</Typography>}/>
        <CustomFormControlLabel control={<Checkbox size="small" checked={activeOptLayer['Scalibility']} name="Scalibility" 
            onChange={changeOptLayer}
            color="success" sx={{padding:0,marginLeft:1}}/>} 
            label={<Typography variant="body2" align='left'  sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
            whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>Scalability</Typography>}/>
        </FormGroup>
      <FormLabel sx={{display:'flex',paddingBottom:1}}>
        <Typography sx={{color:'black',fontWeight:'bold',fontSize:14,paddingTop:1,}}>Select Adaptation Option</Typography>
        </FormLabel>
      {(checkcrop()===true || activeCrop['rice']===true) && directswitch.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left'  sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
      {checkcrop()===true && switchh.map((sname1) => (
        <FormGroup>
        <FormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={state[sname1]} 
          onChange={handleChange(sname1)} name={sname1} />
        } 
        key={sname1}
        label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
          whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname1.charAt(0).toUpperCase()+sname1.slice(1,4)+sname1.toLowerCase().slice(4)}</Typography>}
        />
        {state[sname1] && sname1 === 'Planting Technology' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {planting.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left'  sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Fertilizer Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {fertilizer.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              }
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left'  sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Water Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {water.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        </FormGroup>
      ))}
      {activeCrop['rice']===true && switchh.map((sname1) => (
        <FormGroup>
        <FormControlLabel
        control={
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={state[sname1]} 
          onChange={handleChange(sname1)} name={sname1} />
        } 
        key={sname1}
        label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
          whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname1.charAt(0).toUpperCase()+sname1.slice(1,4)+sname1.toLowerCase().slice(4)}</Typography>}
        />
        {state[sname1] && sname1 === 'Planting Technology' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {planting_rice.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Fertilizer Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {fertilizer_rice.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              }
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        {state[sname1] && sname1 === 'Water Management' && (
            <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
            {water_rice.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
          </FormControl>)}
        </FormGroup>
      ))}
      {(checkcrop()===true || activeCrop['rice']===true) && directswitchdown.map((sname) => (
              <FormGroup>
              <CustomFormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname]} 
                onChange={changeOpt(sname)} name={sname} 
                />
              } 
              disabled={false}
              key={sname}
              label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname.charAt(0).toUpperCase()+sname.slice(1,4)+sname.toLowerCase().slice(4)}</Typography>}
              />
           </FormGroup>
            ))}
            {//Livestock switches
            }
            {(checkcrop()===false && activeCrop['rice']===false && checknotFish()===true) && livestock.map((snamelive) => (
              <FormGroup>
              <FormControlLabel
              control={
                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={livestockstate[snamelive]} 
                onChange={handleLivestockChange(snamelive)} name={snamelive} />
              }
              key={snamelive}
              label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{snamelive.charAt(0).toUpperCase()+snamelive.slice(1,4)+snamelive.toLowerCase().slice(4)}</Typography>}
              />
                {livestockstate[snamelive] && snamelive === 'Shelter Management' && (
                <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
                {livestock_shelter_master.map((sname_shelter) => (
                  <FormGroup>
                  <CustomFormControlLabel
                  control={
                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname_shelter]} 
                    onChange={changeOpt(sname_shelter)} name={sname_shelter} 
                    />
                  }
                  key={sname_shelter}
                  label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                    whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname_shelter.charAt(0).toUpperCase()+sname_shelter.slice(1,4)+sname_shelter.toLowerCase().slice(4)}</Typography>}
                  />
                  </FormGroup>
                ))}
              </FormControl>)}
              {livestockstate[snamelive] && snamelive === 'Feed Management' && (
                <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
                {livestock_feed_master.map((sname_feed) => (
                  <FormGroup>
                  <CustomFormControlLabel
                  control={
                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname_feed]} 
                    onChange={changeOpt(sname_feed)} name={sname_feed} 
                    />
                  }
                  key={sname_feed}
                  label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                    whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname_feed.charAt(0).toUpperCase()+sname_feed.slice(1,4)+sname_feed.toLowerCase().slice(4)}</Typography>}
                  />
                  </FormGroup>
                ))}
              </FormControl>)}
              {livestockstate[snamelive] && snamelive === 'Healthcare Management' && (
                <FormControl component="fieldset" variant="standard"  sx={{paddingBottom:1, paddingLeft:6}}>
                {livestock_health_master.map((sname_health) => (
                  <FormGroup>
                  <CustomFormControlLabel
                  control={
                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={activeOpt[sname_health]} 
                    onChange={changeOpt(sname_health)} name={sname_health} 
                    />
                  }
                  key={sname_health}
                  label={<Typography variant="body2" align='left' sx={{peddingLeft:'3px',maxWidth:'250px',wordBreak:'break-word', 
                    whiteSpace:'normal'}} style={{ wordWrap: "break-word"}}>{sname_health.charAt(0).toUpperCase()+sname_health.slice(1,4)+sname_health.toLowerCase().slice(4)}</Typography>}
                  />
                  </FormGroup>
                ))}
              </FormControl>)}
           </FormGroup>
            ))}
            {(checkcrop()===false && activeCrop['rice']===false && checknotFish()===false) && marine.map((sname) => (
              <div><Box sx={{display:'flex',flexDirection:'column',textAlign:'left'}}>To be updated</Box></div>
            ))}
    </FormControl>
  );
}