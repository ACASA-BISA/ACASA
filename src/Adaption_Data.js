import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

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

export default function Adaptation_Data() {
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
        title="Direct Seeded"
        subheader="Commodity: Rice"
        sx = {{marginTop:-1}}
      />
      <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
        <CardMedia
          component="img"
          height="auto"
          image="/Adapt_Rice_DSR.png"
          alt="Direct Seeded"
        />
      </Box>
      <CardContent  sx={{ marginBottom: -2 }}>
      </CardContent>
      <CardActions disableSpacing>
      <DataButton variant="contained" fullWidth>Details</DataButton>
      </CardActions>
    </Card>
    <Card sx={{ width: '30%'}}>
    <CardHeader
      titleTypographyProps={{ variant: 'subtitle1' }}
      title="Insurance"
      subheader="Commodity: Rice"
      sx = {{marginTop:-1}}
    />
    <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
      <CardMedia
        component="img"
        height="auto"
        image="/Adapt_Rice_Insu.png"
        alt="Insurance"
      />
    </Box>
    <CardContent  sx={{ marginBottom: -2 }}>
    </CardContent>
    <CardActions disableSpacing>
    <DataButton variant="contained" fullWidth>Details</DataButton>
    </CardActions>
  </Card>
  <Card sx={{ width: '30%'}}>
  <CardHeader
    titleTypographyProps={{ variant: 'subtitle1' }}
    title="Precision Water Management"
    subheader="Commodity: Rice"
    sx = {{marginTop:-1}}
  />
  <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
    <CardMedia
      component="img"
      height="auto"
      image="/Adapt_Rice_AWD.png"
      alt="Precision Water Management"
    />
  </Box>
  <CardContent  sx={{ marginBottom: -2 }}>
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
        title="Stress Tolerant"
        subheader="Commodity: Wheat"
        sx = {{marginTop:-1}}
      />
      <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
        <CardMedia
          component="img"
          height="auto"
          image="/Adapt_wheat_StressTolerantCultivar.png"
          alt="Stress Tolerant"
        />
      </Box>
      <CardContent  sx={{ marginBottom: -2 }}>
      </CardContent>
      <CardActions disableSpacing>
      <DataButton variant="contained" fullWidth>Details</DataButton>
      </CardActions>
    </Card>
    <Card sx={{ width: '30%'}}>
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1' }}
        title="Water Management"
        subheader="Commodity: Wheat"
        sx = {{marginTop:-1}}
      />
      <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
        <CardMedia
          component="img"
          height="auto"
          image="/Adapt_wheat_watermanagement.png"
          alt="Water Management"
        />
      </Box>
      <CardContent  sx={{ marginBottom: -2 }}>
      </CardContent>
      <CardActions disableSpacing>
      <DataButton variant="contained" fullWidth>Details</DataButton>
      </CardActions>
    </Card>
</div>
</div>
  );
}