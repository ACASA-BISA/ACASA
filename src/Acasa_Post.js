import React from "react";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from '@mui/material/CardHeader';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function Card_Posts() {
  return (
    <div style={{ marginLeft: '70px', marginTop: '15px' ,marginBottom:'15px'}}>
    <Box sx={{width:'100%', display:'flex', flexDirection:'row',gap: '15px', }}>
    <Card
      sx={{
        maxWidth: '30%',
        boxShadow: "0 0 2px 0 rgba(0,0,0,0.12)",
        borderRadius: 0,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        },
      }}
    >
      <CardMedia
        image="/Blog-5.jpg"
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        }}
      />
      <CardHeader
        titleTypographyProps={{ variant: 'h5' ,sx: { fontWeight: 'bold' }, }}
        subheaderTypographyProps={{color:'#52911f',marginTop:1}}
        title="A new Climate Adaptation Atlas to safeguard South Asian agriculture"
        subheader="By Bram Govaerts and Arun Kumar Joshi"
        sx = {{marginTop:-1,marginBottom:1}}
      />
      <CardContent sx={{marginBottom:-4}}>
        <Typography sx={{textAlign:'justify'}}>
        Climate change is no longer a distant threat but a reality that profoundly affects our lives. Among the most vulnerable regions to climate change, South Asia stands out because it is...
        </Typography>
      </CardContent>
      <CardContent>
        <a href="https://www.cimmyt.org/blogs/a-new-climate-adaptation-atlas-to-safeguard-south-asian-agriculture/" target="_blank" rel="noopener noreferrer">
        <Button
          color={"success"}
          fullWidth
          sx={{ mt: 3, textTransform: "initial" }}
        >
          Find Out More <ChevronRightRounded />
        </Button>
        </a>
      </CardContent>
    </Card>
    <Card
      sx={{
        maxWidth: '30%',
        boxShadow: "0 0 2px 0 rgba(0,0,0,0.12)",
        borderRadius: 0,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        },
      }}
    >
      <CardMedia
        image="/Blog-1.jpg"
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        }}
      />
      <CardHeader
        titleTypographyProps={{ variant: 'h5' ,sx: { fontWeight: 'bold' } }}
        subheaderTypographyProps={{color:'#52911f',marginTop:1}}
        title="Adaptation Atlas is a Positive Step Towards Climate Resilient Agriculture"
        subheader="By Himanshu Pathak, Secretary (DARE) and Director General - ICAR, India"
        sx = {{marginTop:-1,marginBottom:1}}
      />
      <CardContent sx={{marginBottom:-4}}>
        <Typography sx={{textAlign:'justify'}}>
        India holds an impressive record in agricultural production. We are among the largest producers of milk, pulses, tea, spices, cashew, jute, and bananas.        </Typography>
      </CardContent>
      <CardContent>
        <a href="https://www.cimmyt.org/blogs/adaptation-atlas-is-a-positive-step-towards-climate-resilient-agriculture/" target="_blank" rel="noopener noreferrer">
        <Button
          color={"success"}
          fullWidth
          sx={{ mt: 3, textTransform: "initial" }}
        >
          Find Out More <ChevronRightRounded />
        </Button>
        </a>
      </CardContent>
    </Card>
    <Card
      sx={{
        maxWidth: '30%',
        boxShadow: "0 0 2px 0 rgba(0,0,0,0.12)",
        borderRadius: 0,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        },
      }}
    >
      <CardMedia
        image="/Blog-2.jpg"
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        }}
      />
      <CardHeader
        titleTypographyProps={{ variant: 'h5' ,sx: { fontWeight: 'bold' } }}
        subheaderTypographyProps={{color:'#52911f',marginTop:1}}
        title="Bangladesh to improve risk characterization at a granular level with Atlas"
        subheader="By Shaikh Mohammad Bokhtiar, Executive Chairman, BARC, Bangladesh"
        sx = {{marginTop:-1,marginBottom:1}}
      />
      <CardContent sx={{marginBottom:-4}}>
        <Typography sx={{textAlign:'justify'}}>
        Bangladesh is one of the most climate-vulnerable countries in the world. The climate risks are impacting the country’s agricultural sector, which constitutes nearly 12% of the country’s GDP.        </Typography>
      </CardContent>
      <CardContent>
        <a href="https://www.cimmyt.org/blogs/bangladesh-to-improve-risk-characterization-at-a-granular-level-with-atlas/" target="_blank" rel="noopener noreferrer">
        <Button
          color={"success"}
          fullWidth
          sx={{ mt: 3, textTransform: "initial" }}
        >
          Find Out More <ChevronRightRounded />
        </Button>
        </a>
      </CardContent>
    </Card>
    </Box>
    <Box sx={{width:'100%', display:'flex', flexDirection:'row',gap: '15px', marginTop:'20px'}}>
    <Card
      sx={{
        maxWidth: '30%',
        boxShadow: "0 0 2px 0 rgba(0,0,0,0.12)",
        borderRadius: 0,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        },
      }}
    >
      <CardMedia
        image="/Blog-3.jpg"
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        }}
      />
      <CardHeader
        titleTypographyProps={{ variant: 'h5' ,sx: { fontWeight: 'bold' } }}
        subheaderTypographyProps={{color:'#52911f',marginTop:1}}
        title="Atlas crucial to strengthen Nepal’s capacity to cope with climate change"
        subheader="By Dhruba Raj Bhattarai, Executive Director, NARC, Nepal"
        sx = {{marginTop:-1,marginBottom:1}}
      />
      <CardContent sx={{marginBottom:-4}}>
        <Typography sx={{textAlign:'justify'}}>
        Nepal, like other South Asian nations, faces significant environmental challenges, including climate change and air pollution. The impacts of climate change in Nepal are profound...      </Typography>
      </CardContent>
      <CardContent>
        <a href="https://www.cimmyt.org/blogs/atlas-crucial-to-strengthen-nepals-capacity-to-cope-with-climate-change/" target="_blank" rel="noopener noreferrer">
        <Button
          color={"success"}
          fullWidth
          sx={{ mt: 3, textTransform: "initial" }}
        >
          Find Out More <ChevronRightRounded />
        </Button>
        </a>
      </CardContent>
    </Card>
    <Card
      sx={{
        maxWidth: '30%',
        boxShadow: "0 0 2px 0 rgba(0,0,0,0.12)",
        borderRadius: 0,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transform: "scale(1.04)",
        },
      }}
    >
      <CardMedia
        image="/Blog-4.jpg"
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        }}
      />
      <CardHeader
        titleTypographyProps={{ variant: 'h5' ,sx: { fontWeight: 'bold' } }}
        subheaderTypographyProps={{color:'#52911f',marginTop:1}}
        title="Climate Adaptation Atlas will support evidence-based solutions in Sri Lanka"
        subheader="By P. Malathy, DG-Agriculture, Sri Lanka"
        sx = {{marginTop:-1,marginBottom:1}}
      />
      <CardContent sx={{marginBottom:-4}}>
        <Typography sx={{textAlign:'justify'}}>
        We are all aware the immense challenges countries face due to climate change, particularly its impacts on vital sectors like agriculture, forestry and livestock.      </Typography>
      </CardContent>
      <CardContent>
        <a href="https://www.cimmyt.org/news/climate-adaptation-atlas-will-support-evidence-based-solutions-in-sri-lanka/" target="_blank" rel="noopener noreferrer">
        <Button
          color={"success"}
          fullWidth
          sx={{ mt: 3, textTransform: "initial" }}
        >
          Find Out More <ChevronRightRounded />
        </Button>
        </a>
      </CardContent>
    </Card>
    </Box>
    </div>
  );
}