import React from 'react';
import { Box } from '@mui/material';

const legendColors = [
  'rgba(0, 0, 139, 1)', // Box 1
  'rgba(70, 130, 180, 1)', // Box 2
  'rgba(0, 191, 255, 1)', // Box 3
  'rgba(50, 205, 50, 1)', // Box 4
  'rgba(255, 255, 0, 1)', // Box 5
  'rgba(70, 130, 180, 1)', // Box 6
  'rgba(0, 191, 255, 1)', // Box 7
  'rgba(50, 205, 50, 1)', // Box 8
  'rgba(255, 255, 0, 1)', // Box 9
  'rgba(255, 165, 0, 1)', // Box 10
  'rgba(0, 191, 255, 1)', // Box 11
  'rgba(50, 205, 50, 1)', // Box 12
  'rgba(255, 255, 0, 1)', // Box 13
  'rgba(255, 165, 0, 1)', // Box 14
  'rgba(204, 51, 0, 1)', // Box 15
  'rgba(50, 205, 50, 1)', // Box 16
  'rgba(255, 255, 0, 1)', // Box 17
  'rgba(255, 165, 0, 1)', // Box 18
  'rgba(204, 51, 0, 1)', // Box 19
  'rgba(128, 0, 0, 1)', // Box 20
  'rgba(255, 255, 0, 1)', // Box 21
  'rgba(255, 165, 0, 1)', // Box 22
  'rgba(204, 51, 0, 1)', // Box 23
  'rgba(128, 0, 0, 1)', // Box 24
  'rgba(128, 0, 0, 1)', // Box 25
];

const BoxLegend = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 50px)', // 5 columns
        gap: '4px', // Spacing between boxes
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {legendColors.map((color, index) => (
        <Box
          key={index}
          sx={{
            width: '50px',
            height: '50px',
            backgroundColor: color,
            border: '1px solid black', // Optional for better visibility
          }}
        ></Box>
      ))}
    </Box>
  );
};

export default BoxLegend;
