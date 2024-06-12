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

export default function Risk_Data() {
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
        title="Downscaled risk"
        subheader="Commodity: Rice"
        sx = {{marginTop:-1}}
      />
      <Box sx={{ marginLeft: 1, marginRight: 1,marginTop: -1}}>
        <CardMedia
          component="img"
          height="auto"
          image="/Rice_downScaled_Risk.png"
          alt="Downscaled risk"
        />
      </Box>
      <CardContent  sx={{ marginBottom: -2 }}>
        <Typography variant="body2" color="text.secondary">
        Data source: Crop statistics and GPP</Typography>
        <Typography variant="body2" color="text.secondary">
        Time period: 2001 - 2019</Typography>
      </CardContent>
      <CardActions disableSpacing>
      <DataButton variant="contained" fullWidth>Details</DataButton>
      </CardActions>
    </Card>
</div>
</div>
  );
}