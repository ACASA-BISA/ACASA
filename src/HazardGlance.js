import React from 'react';
import { Grid, Paper, Typography, Box, MenuItem, Select, FormControl, Popper } from '@mui/material';
import './font.css';
import './extra.css';
import './font2.css';

export default function HazardGlance(){
    return(
        <div style={{overflow:'hidden'}}>
            <Grid container sx={{marginTop:'90px',marginBottom:'2px',paddingX: '1rem'}} columns={12}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={3} key='1'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                        <Grid item xs={3} key='2'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                        <Grid item xs={3} key='3'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                        <Grid item xs={3} key='4'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                        <Grid item xs={3} key='5'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                        <Grid item xs={3} key='6'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                        <Grid item xs={3} key='7'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                        <Grid item xs={3} key='8'>
                            <Paper elevation={1}>Test</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};