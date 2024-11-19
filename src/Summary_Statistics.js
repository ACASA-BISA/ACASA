import * as React from 'react';
import { Popper, Paper, Typography, Box, Select, MenuItem, InputLabel, Button, FormControl, Card, CardContent, Backdrop} from '@mui/material';
import './font2.css';

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
                    width: '300px',
                    margin: '10px',
                    cursor: 'pointer',
                    boxShadow: 3,
                    '&:hover': {
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
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer - 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
            />

            {/* Popper */}
            {open && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90vw',
                        height: '60vh',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: 24,
                        padding: '20px',
                        zIndex: (theme) => theme.zIndex.modal,
                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1">{content}</Typography>
                    <Typography variant="body2" sx={{ marginTop: '20px' }}>
                        Close by clicking outside this box.
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default function Summary_Statistics({

}){
    const [reg, setReg] = React.useState('SA');
    const handleChange = (event) => {
        setReg(event.target.value);
    }

    const data = [
        {
            title: 'Card 1',
            content: 'This is the content for Card 1.',
        },
        {
            title: 'Card 2',
            content: 'This is the content for Card 2.',
        },
        {
            title: 'Card 3',
            content: 'This is the content for Card 3.',
        },
    ];

    return(
        <div style={{marginTop:'95px'}}>
            <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
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
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        padding: '20px',
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
        </div>
    )
};