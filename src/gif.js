import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Slider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// Array of image URLs, one for each year
const images = [
    { year: 2000, url: 'Timeline/Rice_Delayed monsoon_baseline.png' },
    { year: 2001, url: 'Timeline/Rice_Delayed monsoon_SSP245.png' },
    { year: 2002, url: 'Timeline/Rice_Delayed monsoon_SSP585.png' },
    { year: 2003, url: 'Timeline/Rice_Dry spell number_baseline.png' },
    { year: 2004, url: 'Timeline/Rice_Dry spell number_SSP245.png' },
    { year: 2005, url: 'Timeline/Rice_Dry spell number_SSP585.png' },
    // Add more images as needed
];

function useInterval(callback, delay) {
    const savedCallback = React.useRef();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const ImageTimeline = () => {
    const [currentYearIndex, setCurrentYearIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Auto-play interval, changes image every 1 second (1000ms)
    useInterval(
        () => {
            setCurrentYearIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        },
        isPlaying ? 1000 : null
    );

    // Toggle play/pause
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // Handle slider change (manual navigation through timeline)
    const handleSliderChange = (event, newValue) => {
        setCurrentYearIndex(newValue);
        setIsPlaying(false); // Stop autoplay when the slider is moved manually
    };
    const color_for_button = '#4b9e44';
    // Display the current image and year
    const currentImage = images[currentYearIndex];
    //Color: #52af77
    const PrettoSlider = styled(Slider)({
        color: color_for_button,
        height: 6,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 16,
          width: 16,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&::before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 12,
          background: 'unset',
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: '50% 50% 50% 0',
          backgroundColor: color_for_button,
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          '&::before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      });

    return (
        <div style={{overflow:'hidden'}}>
        <Box display="flex" flexDirection="row" sx={{marginTop:'95px',marginX:'5px'}} gap="15px">
            <Box display="flex" flexDirection="column" alignItems="center" sx={{border:'1px solid #eee'}}>
                <Box sx={{width:'80%',bgcolor:'#E4E0E1',height:'22px',marginTop:'5px'}}>
                    <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold'}}>Year: {currentImage.year}</Typography>
                </Box>
                {/* Play/Pause Button */}
                <Box display="flex" flexDirection="row" sx={{width:'100%'}}  alignItems="center" justifyContent="center" gap="15px">
                    <IconButton onClick={handlePlayPause} sx={{color: color_for_button,border:'1px solid #eee',borderRadius:'8px',padding:'6px'}}>
                        {isPlaying ? <PauseIcon sx={{fontSize:'28px'}} /> : <PlayArrowIcon sx={{fontSize:'28px'}} />}
                    </IconButton>
                    {/* Timeline Slider */}
                    <Box sx={{ width: '60%', mt: 1, mb: 1 }}>
                        <PrettoSlider
                            value={currentYearIndex}
                            min={0}
                            max={images.length - 1}
                            step={1}
                            marks={images.map((img, idx) => ({
                                value: idx,
                                //label: img.year.toString(),
                            }))}
                            onChange={handleSliderChange}
                            aria-labelledby="timeline-slider"
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </Box>
                {/* Display the image */}
                <Box
                    component="img"
                    src={currentImage.url}
                    alt={`Year ${currentImage.year}`}
                    sx={{ width: '80%', maxWidth: 420, height: 'auto', mb: 2 }}
                />  
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center"  sx={{border:'1px solid #eee'}}>
                <Box sx={{width:'80%',bgcolor:'#E4E0E1',height:'22px',marginTop:'5px'}}>
                    <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold'}}>Year: {currentImage.year}</Typography>
                </Box>
                {/* Play/Pause Button */}
                <Box display="flex" flexDirection="row" sx={{width:'100%'}}  alignItems="center" justifyContent="center" gap="15px">
                    <IconButton onClick={handlePlayPause} sx={{color: color_for_button,border:'1px solid #eee',borderRadius:'8px',padding:'6px'}}>
                        {isPlaying ? <PauseIcon sx={{fontSize:'28px'}} /> : <PlayArrowIcon sx={{fontSize:'28px'}} />}
                    </IconButton>
                    {/* Timeline Slider */}
                    <Box sx={{ width: '60%', mt: 1, mb: 1 }}>
                        <PrettoSlider
                            value={currentYearIndex}
                            min={0}
                            max={images.length - 1}
                            step={1}
                            marks={images.map((img, idx) => ({
                                value: idx,
                                //label: img.year.toString(),
                            }))}
                            onChange={handleSliderChange}
                            aria-labelledby="timeline-slider"
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </Box>
                {/* Display the image */}
                <Box
                    component="img"
                    src={currentImage.url}
                    alt={`Year ${currentImage.year}`}
                    sx={{ width: '80%', maxWidth: 420, height: 'auto', mb: 2 }}
                />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center"  sx={{border:'1px solid #eee'}}>
                <Box sx={{width:'80%',bgcolor:'#E4E0E1',height:'22px',marginTop:'5px'}}>
                    <Typography align="center" sx={{fontSize:'14px',fontWeight:'bold'}}>Year: {currentImage.year}</Typography>
                </Box>
                {/* Play/Pause Button */}
                <Box display="flex" flexDirection="row" sx={{width:'100%'}}  alignItems="center" justifyContent="center" gap="15px">
                    <IconButton onClick={handlePlayPause} sx={{color: color_for_button,border:'1px solid #eee',borderRadius:'8px',padding:'6px'}}>
                        {isPlaying ? <PauseIcon sx={{fontSize:'28px'}} /> : <PlayArrowIcon sx={{fontSize:'28px'}} />}
                    </IconButton>
                    {/* Timeline Slider */}
                    <Box sx={{ width: '60%', mt: 1, mb: 1 }}>
                        <PrettoSlider
                            value={currentYearIndex}
                            min={0}
                            max={images.length - 1}
                            step={1}
                            marks={images.map((img, idx) => ({
                                value: idx,
                                //label: img.year.toString(),
                            }))}
                            onChange={handleSliderChange}
                            aria-labelledby="timeline-slider"
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </Box>
                {/* Display the image */}
                <Box
                    component="img"
                    src={currentImage.url}
                    alt={`Year ${currentImage.year}`}
                    sx={{ width: '80%', maxWidth: 420, height: 'auto', mb: 2 }}
                />
            </Box>
        </Box>
        {/* <Box display="flex" flexDirection="column" alignItems="center">
            <Box
                component="img"
                src="Timeline/rice_suit_baseline.gif"  // Replace with the path to your GIF
                alt="Animated timeline"
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    mb: 2,
                    visibility: isPlaying ? 'visible' : 'hidden', // Toggle visibility
                }}
            />
            <Typography variant="h6" gutterBottom>
                Year Timeline
            </Typography>
            <Box sx={{ width: '80%', mt: 2, mb: 2 }}>
                <Slider
                    defaultValue={0}
                    min={0}
                    max={100} // Adjust to match the GIF's timeline length if known
                    step={1}
                    marks={[
                        { value: 0, label: 'Start' },
                        { value: 100, label: 'End' },
                    ]}
                    aria-labelledby="timeline-slider"
                    disabled // Since we’re only using this as a visual bar here
                />
            </Box>
            <Box
                sx={{
                    border: '2px solid #1976d2', // Blue border color
                    borderRadius: '8px',
                    padding: '8px',
                }}
            >
                <IconButton onClick={handlePlayPause} color="primary">
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
            </Box>
        </Box> */}
        </div>
    );
};

export default ImageTimeline;