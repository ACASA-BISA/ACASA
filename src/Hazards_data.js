import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DataButton = styled(Button)({
    boxShadow: 'none',
    borderRadius:5,
    color:'#000000',
    border: '0px solid',
    fontWeight:'bold',
    backgroundColor: '#fece2f',
    //borderColor: '#0063cc',
    '&:hover': {
      backgroundColor: '#ffda5e',
      //borderColor: '#0062cc',
      boxShadow: 'none',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: 'none',
      backgroundColor: '#fece2f',
      //borderColor: '#005cbf',
    },
  });

export default function Hazards_Data() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
    <div style={{ display: 'flex', gap: '15px', marginLeft: '150px', marginTop: '10px' }}>
    <Card sx={{ width: '30%'}}>
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1' }}
        title="Drought (SPI frequency)"
        subheader="Commodity: Rice"
        sx = {{marginTop:-1}}
      />
      <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
        <CardMedia
          component="img"
          height="auto"
          image="/HZ_Rice_SPI.png"
          alt="Rice SPI Frequency"
        />
      </Box>
      <CardContent  sx={{ marginBottom: -2 }}>
        <Typography variant="body2" color="text.secondary">
        Data source: CHIRPS</Typography>
        <Typography variant="body2" color="text.secondary">
        Method: Number of years with SPI  -1</Typography>
        <Typography variant="body2" color="text.secondary">
        Time period: 1991 – 2016 (DOY 182-273)
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <DataButton variant="contained" fullWidth>Details</DataButton>
      </CardActions>
    </Card>
    <Card sx={{ width: '30%'}}>
    <CardHeader
      titleTypographyProps={{ variant: 'subtitle1' }}
      title="Unseasonal Rain"
      subheader="Commodity: Rice"
      sx = {{marginTop:-1}}
    />
    <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
      <CardMedia
        component="img"
        height="auto"
        image="/HZ_Rice_unseasonalRainfall.png"
        alt="Rice Rainfall"
      />
    </Box>
    <CardContent  sx={{ marginBottom: -2 }}>
      <Typography variant="body2" color="text.secondary">
      Data source: CHIRPS</Typography>
      <Typography variant="body2" color="text.secondary">
      Method: Number of days with daily RF 20mm</Typography>
      <Typography variant="body2" color="text.secondary">
      Time period: 1991 – 2016 (DOY 244-289)
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
    <DataButton variant="contained" fullWidth>Details</DataButton>
    </CardActions>
  </Card>
  <Card sx={{ width: '30%'}}>
  <CardHeader
    titleTypographyProps={{ variant: 'subtitle1' }}
    title="Flood"
    subheader="Commodity: Rice"
    sx = {{marginTop:-1}}
  />
  <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
    <CardMedia
      component="img"
      height="auto"
      image="/HZ_Rice_Flood.png"
      alt="Rice Flood"
    />
  </Box>
  <CardContent  sx={{ marginBottom: -2 }}>
    <Typography variant="body2" color="text.secondary">
    Data source: DFO</Typography>
    <Typography variant="body2" color="text.secondary">
    Method: Acquired thorough GEE</Typography>
    <Typography variant="body2" color="text.secondary">
    Time period: 2000 – 2018
    </Typography>
  </CardContent>
  <CardActions disableSpacing>
  <DataButton variant="contained" fullWidth>Details</DataButton>
  </CardActions>
</Card>
</div>
<div style={{ display: 'flex', gap: '15px', marginLeft: '150px', marginTop: '30px' }}>
    <Card sx={{ width: '30%'}}>
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1' }}
        title="Late Heat Stress"
        subheader="Commodity: Wheat"
        sx = {{marginTop:-1}}
      />
      <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
        <CardMedia
          component="img"
          height="auto"
          image="/HZ_wheat_heat.png"
          alt="Rice SPI Frequency"
        />
      </Box>
      <CardContent  sx={{ marginBottom: -2 }}>
        <Typography variant="body2" color="text.secondary">
        Data source: CHIRTS</Typography>
        <Typography variant="body2" color="text.secondary">
        Method: Number of days with TMAX 31C</Typography>
        <Typography variant="body2" color="text.secondary">
        Time period: 1991 – 2016 (DOY 046-074)
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <DataButton variant="contained" fullWidth>Details</DataButton>
      </CardActions>
    </Card>
</div>
</div>
  );
}