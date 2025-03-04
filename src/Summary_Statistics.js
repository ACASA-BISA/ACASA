import * as React from "react";
import {
  Popper,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  Card,
  CardContent,
  Backdrop,
} from "@mui/material";
import "./font2.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data1 = [
  // Outer layer (Layer 3)
  { name: "Class A", value: 30 },
  { name: "Class B", value: 25 },
  { name: "Class C", value: 20 },
  { name: "Class D", value: 15 },
  { name: "Class E", value: 10 },
];

const data2 = [
  // Middle layer (Layer 2)
  { name: "Sub A1", value: 15 },
  { name: "Sub B1", value: 12 },
  { name: "Sub C1", value: 10 },
  { name: "Sub D1", value: 7 },
  { name: "Sub E1", value: 5 },
];

const data3 = [
  // Inner layer (Layer 1)
  { name: "Inner A", value: 10 },
  { name: "Inner B", value: 10 },
  { name: "Inner C", value: 10 },
  { name: "Inner D", value: 10 },
  { name: "Inner E", value: 10 },
];

const COLORS = [
  "rgba(4, 114, 14, 1)",
  "rgba(0, 204, 0, 1)",
  "rgba(204, 204, 0, 1)",
  "rgba(204, 132, 0, 1)",
  "rgba(204, 0, 0, 1)",
];
const COLORS2 = ["#059212", "#00FF00", "#FFFF00", "#FFA500", "#FF0000"];
const COLORS3 = [
  "rgba(37, 184, 50, 1)",
  "rgba(102, 255, 102, 1)",
  "rgba(255, 255, 153, 1)",
  "rgba(255, 199, 102, 1)",
  "rgba(255, 102, 102, 1)",
];

const CardWithPopper = ({ title, content }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Card */}
      <Card
        sx={{
          width: "300px",
          margin: "10px",
          cursor: "pointer",
          boxShadow: 3,
          "&:hover": {
            boxShadow: 6,
          },
        }}
        onClick={handleOpen}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click to view details
          </Typography>
        </CardContent>
      </Card>

      {/* Backdrop */}
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Popper */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "60vh",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "20px",
            zIndex: (theme) => theme.zIndex.modal,
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1">{content}</Typography>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Close by clicking outside this box.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default function Summary_Statistics({}) {
  const [reg, setReg] = React.useState("SA");
  const handleChange = (event) => {
    setReg(event.target.value);
  };

  const data = [
    {
      title: "People impacted",
      content: "This is the content for Card 1.",
    },
    {
      title: "Increase in vulnerability",
      content: "This is the content for Card 2.",
    },
    {
      title: "Adaptation Practices",
      content: "This is the content for Card 3.",
    },
  ];

  return (
    <div style={{ marginTop: "95px" }}>
      {/* <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <Typography sx={{fontFamily:'Karla'}} fontSize={40}>
                Summary Statistics for&nbsp;
            </Typography>
            <FormControl>
            <Select
                labelId="Region"
                id="region-select-id"
                value={reg}
                onChange={handleChange}
                sx={{
                    fontSize: '40px',
                    fontFamily: 'Karla',
                    height:'70px',
                    border: 'none',               // Removes all borders
                    '& fieldset': {
                        border: 'none',           // Removes the default Material-UI border from outlined variants
                    },
                    borderBottom: '7px solid #aaa', // Applies only a custom bottom border
                    
                }}
            >
                <MenuItem value='SA' sx={{fontSize:'20px',fontFamily:'Karla'}}>South Asia</MenuItem>
                <MenuItem value='AF' sx={{fontSize:'20px',fontFamily:'Karla'}}>Afghanistan</MenuItem>
                <MenuItem value='BD' sx={{fontSize:'20px',fontFamily:'Karla'}}>Bangladesh</MenuItem>
                <MenuItem value='BT' sx={{fontSize:'20px',fontFamily:'Karla'}}>Bhutan</MenuItem>
                <MenuItem value='IN' sx={{fontSize:'20px',fontFamily:'Karla'}}>India</MenuItem>
                <MenuItem value='NP' sx={{fontSize:'20px',fontFamily:'Karla'}}>Nepal</MenuItem>
                <MenuItem value='PK' sx={{fontSize:'20px',fontFamily:'Karla'}}>Pakistan</MenuItem>
                <MenuItem value='LK' sx={{fontSize:'20px',fontFamily:'Karla'}}>Sri Lanka</MenuItem>
                <MenuItem value='MV' sx={{fontSize:'20px',fontFamily:'Karla'}}>Maldives</MenuItem>
            </Select>
            </FormControl>
            </Box> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "20px",
          }}
        >
          {data.map((item, index) => (
            <CardWithPopper
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" sx={(theme) => ({ mb: 2, color: theme.palette.text.primary })}>
          Multi-Level Pie Chart
        </Typography>
        <PieChart width={400} height={400}>
          {/* Outer layer (Largest) */}
          <Pie
            data={data1}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data1.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Middle layer */}
          <Pie
            data={data2}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            fill="#82ca9d"
          >
            {data2.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS2[index % COLORS2.length]}
              />
            ))}
          </Pie>

          {/* Inner layer (Smallest) */}
          <Pie
            data={data3}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={50}
            fill="#FFBB28"
          >
            {data3.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS3[index % COLORS3.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </Box>
    </div>
  );
}
