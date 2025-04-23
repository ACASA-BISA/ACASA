import React, { useState, useEffect } from "react";
import { Typography, Box, Slider, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { styled } from "@mui/material/styles";

// Array of image URLs, one for each year
const images = [
  { year: 2000, url: "Timeline/Rice_Delayed monsoon_baseline.png" },
  { year: 2001, url: "Timeline/Rice_Delayed monsoon_SSP245.png" },
  { year: 2002, url: "Timeline/Rice_Delayed monsoon_SSP585.png" },
  { year: 2003, url: "Timeline/Rice_Dry spell number_baseline.png" },
  { year: 2004, url: "Timeline/Rice_Dry spell number_SSP245.png" },
  { year: 2005, url: "Timeline/Rice_Dry spell number_SSP585.png" },
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

export default function PopperGif({ activeCrop, activeScenario, activeRegion, focus, activeOpt, CurrRisk, activeImpact, activeOptLayer, modelName, displayLayer, activeScale, exploreType }) {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useInterval(
    () => {
      setCurrentYearIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    },
    isPlaying ? 1000 : null
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (event, newValue) => {
    setCurrentYearIndex(newValue);
    setIsPlaying(false);
  };
  const color_for_button = "#4b9e44";
  const currentImage = images[currentYearIndex];
  //Color: #52af77
  const PrettoSlider = styled(Slider)({
    "color": color_for_button,
    "height": 5,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      "height": 8,
      "width": 10,
      "borderRadius": 2,
      "backgroundColor": "#fff",
      "border": "1px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&::before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      "lineHeight": 1.2,
      "fontSize": 12,
      "background": "unset",
      "padding": 0,
      "width": 32,
      "height": 32,
      "borderRadius": "50% 50% 50% 0",
      "backgroundColor": color_for_button,
      "transformOrigin": "bottom left",
      "transform": "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&::before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  return (
    <div>
      {CurrRisk !== "" && (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ border: "1px solid #eee" }}>
          <Box sx={{ width: "90%", bgcolor: "#E4E0E1", height: "15px", marginTop: "1px" }}>
            <Typography align="center" sx={{ fontSize: "10px", fontWeight: "normal" }}>
              Year: {currentImage.year}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" sx={{ width: "100%", marginBottom: "-5px", marginTop: "-8px" }} alignItems="center" justifyContent="center" gap="15px">
            <IconButton onClick={handlePlayPause} sx={{ color: color_for_button, border: "1px solid #eee", borderRadius: "6px", padding: "1px", height: "13px !important" }}>
              {isPlaying ? <PauseIcon sx={{ fontSize: "12px" }} /> : <PlayArrowIcon sx={{ fontSize: "12px" }} />}
            </IconButton>
            <Box sx={{ width: "60%", mt: 0, mb: 0 }}>
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
          <Box component="img" src={currentImage.url} alt={`Year ${currentImage.year}`} sx={{ width: "100%", maxWidth: "150px", height: "auto", mb: 0, mt: "-5px" }} />
        </Box>
      )}
    </div>
  );
}
