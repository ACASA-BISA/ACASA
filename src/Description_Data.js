import * as React from 'react';
import { Paper, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(Crop, Hazard, Method, Source, Action) {
    return { Crop, Hazard, Method, Source, Action };
  }
  
  const rows = [
    createData('Rice/Maize','Drought (SPI -frequency)','Standard precipitation index (SPI) where SPI is less than - 1.','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Rice/Maize','Unseasonal rain','Number of days with daily rainfall > 20mm in the month of Sept to mid-Oct (DOY 244 – 289)','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Rice/Maize','Flood','Spatial and temporal distribution from 2000-2018, pulled through GEE','https://global-flood-database.cloudtostreet.info/','Download'),
    createData('Rice/Maize','Extreme rainfall','Number of days with daily rainfall > 64.5mm in the months of Sept to mid-Oct (DOY 244 – 289)','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Rice/Maize','Heat stress','Number of days with TMAX > 38C in the months of Sept to mid-Oct (DOY 244 – 289)','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Wheat','Late heat-stress','Number of days with TMAX > 31C in the months of mid-Feb to mid-Mar (DOY 046-074)','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Wheat','Early heat-stress','Number of days with TMAX > 31C in the months of end Nov to mid-Dec (DOY 320-349)','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
    createData('Wheat','Unseasonal rainfall','Number of days with daily rainfall > 20mm in the months of Mid-Mar to Apr (DOY 244 – 289)','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Wheat','Extreme rainfall','Number of days with daily rainfall > 64.5mm in the months of Mid-Mar to Apr (DOY 244 – 289)','https://www.chc.ucsb.edu/data/chirps','Download'),
    createData('Wheat','Cold stress/Frost','Number of days with daily TMIN<2C on the months of Jan to Feb (DOY 001-058)','http://data.chc.ucsb.edu/products/CHIRTSdaily/','Download'),
  ];

  const rows1 = [
    createData('Rice','Downscaled risk','Analyzed','Crop statistics, crop mask and primary productivity','Download'),
    createData('Rice','Insurance','Analyzed','Decision tree','Download'),
  ];

  const rows2 = [
    createData('Rice','Direct seeded rice','Analyzed','Decision tree','Download'),
    createData('Rice','Precision water management','Analyzed','Decision tree','Download'),
    createData('Wheat','Stress tolerant cultivar','Analyzed','Decision tree','Download'),
    createData('Wheat','Water management','Analyzed','Decision tree','Download'),
  ];

  const rows3 = [
    createData('Rice','Direct seeded rice','Analyzed','Decision tree','Download'),
    createData('Rice','Precision water management','Analyzed','Decision tree','Download'),
    createData('Wheat','Stress tolerant cultivar','Analyzed','Decision tree','Download'),
    createData('Wheat','Water management','Analyzed','Decision tree','Download'),
  ];

export default function Description(

){
    return(
        <div>
            <Box sx={{textAlign:'left',marginLeft:'150px',marginRight:'40px'}}>
            <Typography sx={{fontWeight:'bold',marginTop:'5px',color:'#333333',fontFamily:'revert'}}>Data Catalogue</Typography>
            <Typography sx={{fontWeight:'normal',marginTop:'5px',color:'#333333',fontFamily:'revert'}}>The datasets are prepared primarily from open source databases. 
            To extract each variable standard methodologies applied. 
            All the datasets are geo-tiff format and in 0.05 degree resolution (EPSG:4326 - WGS 84, Geographic latitude and longitude).</Typography>
            <Typography sx={{fontWeight:'normal',marginTop:'8px',color:'#333333',fontFamily:'revert'}}>The details of the data source and method is described below.</Typography>

            <TableContainer component={Paper} sx={{marginTop:'7px', 'td,th':{border:'1px solid rgba(224, 224, 224, 1)'}}}>
            <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead sx={{backgroundColor:'#eeeeee'}}>
                <TableRow>
                    <TableCell colSpan={5} sx={{fontWeight:'bold',backgroundColor:'#4b9e44',color:'#ffffff'}}>Hazard</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Crop</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Hazard</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Method</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Data&nbsp;Source</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    >
                    <TableCell component="th" scope="row" align="left">
                        {row.Crop}
                    </TableCell>
                    <TableCell align="left">{row.Hazard}</TableCell>
                    <TableCell align="left">{row.Method}</TableCell>
                    <TableCell align="left"><a href={row.Source} style={{ textDecoration: 'none',color:'inherit'}}>{row.Source}</a></TableCell>
                    <TableCell align="left"><a href='javascript:void(0);' style={{ textDecoration: 'none'}}>{row.Action}</a></TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableHead sx={{backgroundColor:'#eeeeee'}}>
                <TableRow>
                    <TableCell colSpan={5} sx={{fontWeight:'bold',backgroundColor:'#4b9e44',color:'#ffffff'}}>Risk</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Crop</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Layer</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Method</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Source</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows1.map((row) => (
                    <TableRow
                    key={row.name}
                    >
                    <TableCell component="th" scope="row" align="left">
                        {row.Crop}
                    </TableCell>
                    <TableCell align="left">{row.Hazard}</TableCell>
                    <TableCell align="left">{row.Method}</TableCell>
                    <TableCell align="left"><a href='javascript:void(0);' style={{ textDecoration: 'none',color:'inherit'}}>{row.Source}</a></TableCell>
                    <TableCell align="left"><a href='javascript:void(0);' style={{ color:'inherit'}}>{row.Action}</a></TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableHead sx={{backgroundColor:'#eeeeee'}}>
                <TableRow>
                    <TableCell colSpan={5} sx={{fontWeight:'bold',backgroundColor:'#4b9e44',color:'#ffffff'}}>Adaptation</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Crop</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Layer</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Method</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Source</TableCell>
                    <TableCell align="left" sx={{fontWeight:'bold'}}>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows2.map((row) => (
                    <TableRow
                    key={row.name}
                    >
                    <TableCell component="th" scope="row" align="left">
                        {row.Crop}
                    </TableCell>
                    <TableCell align="left">{row.Hazard}</TableCell>
                    <TableCell align="left">{row.Method}</TableCell>
                    <TableCell align="left"><a href='javascript:void(0);' style={{ textDecoration: 'none',color:'inherit'}}>{row.Source}</a></TableCell>
                    <TableCell align="left"><a href='javascript:void(0);' style={{ color:'inherit'}}>{row.Action}</a></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Box>
        </div>
    )
};