/*import React, { useState } from "react";
import { Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = document.getElementById("video");
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        boxShadow: 1,
        width:'100%',
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        "& video":{
          display:'block',
        }
      }}
    >
      <video id="video" controls width='100%' height='100%'>
        <source src={`${process.env.PUBLIC_URL}/vid11.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div
          onClick={handlePlayPause}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            color: "#000",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)")
          }
        >
          <PlayArrowIcon sx={{fontSize:'50px'}}/>
        </div>
      )}
    </Box>
  );
};

export default VideoPlayer;
*/

import React from "react";
import { Box } from "@mui/material";

const VideoPlayer = () => {
  return (
    <Box
      sx={{
        margin: "auto",
        boxShadow: 1,
        width: '100%',
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        "& video": {
          display: 'block',
          filter: "grayscale(100%) brightness(50%)", // Greyed out effect
          pointerEvents: "none", // Disable interaction
        }
      }}
    >
      {/* Video Element (Disabled) */}
      <video width="100%" height="100%">
        <source src={`${process.env.PUBLIC_URL}/vid11.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Greyed-out Overlay */}
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.mode === "dark" ?  "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          fontSize: "18px",
          fontWeight: "bold",
          fontStyle: "revert"
        })}
      >
        To be updated
      </Box>
    </Box>
  );
};

export default VideoPlayer;
