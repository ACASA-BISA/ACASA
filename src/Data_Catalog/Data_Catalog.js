// Imports
import React from "react";
import "./Data_Catalog.css";
import Typography from "@mui/material/Typography";
import { Tooltip, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

// Creating a function to return the card component
export const DataCatalog = ({
  commodity,
  scenario,
  layertype,
  imgSrc,
  imgAlt,
  title,
  description,
  source, // Used for the hazard data catalog as links are to be provided
  model, // Used for the adaptation data as we only need to supply the model type we are using and no links are to be included
  buttonText,
  onButtonClick,
}) => {
  /*return (
    <div className="card-container">
      <div
        className="card-background"
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
      >
        <div className="card-footer">
          <div className="footer-top">
            {commodity && scenario && layertype && (
              <Typography
                sx={{
                  fontSize: "small",
                  margin: "8px",
                  color: "#333333",
                }}
                className="card-tags"
              >
                {commodity}
                <div className="vertical-separator"></div>
                {scenario}
                <div className="vertical-separator"></div>
                {layertype}
              </Typography>
            )}
            {title && (
              <Typography
                sx={{
                  fontSize: "normal",
                  margin: "8px",
                  color: "#333333",
                }}
                className="card-title"
              >
                {title}
              </Typography>
            )}
          </div>

          {imgSrc && imgAlt && (
          <img src={imgSrc} alt={imgAlt} className="card-img" />
        )}

          <div className="card-expanded-footer">
            {description && (
              <Typography
                sx={{
                  fontSize: 14,
                  margin: "8px",
                  color: "#333333",
                }}
                className="card-description"
              >
                {description}
              </Typography>
            )}

            {source && (
              <a href={source}>
                {" "}
                <Typography
                  sx={{
                    fontSize: 14,
                    margin: "8px",
                    color: "#8e918f",
                  }}
                  className="card-source"
                >
                  {source}
                </Typography>{" "}
              </a>
            )}

            {model && (
              <Typography
                sx={{
                  fontSize: 14,
                  margin: "8px",
                  color: "#333333",
                }}
                className="card-model"
              >
                {model}
              </Typography>
            )}

            
              <div className="download-icon" onClick={onButtonClick}>
                <DownloadIcon fontSize="small" />
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
*/
  return (
    <div className="card-container">
      <div
        className="card-background"
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
      >
        {/* Tags and Title (always visible) */}
        <div className="card-footer">
          {commodity && scenario && layertype && (
            <Typography
              sx={{
                fontSize: "small",
                margin: "8px",
                color: "white",
                display: "flex",
              }}
              className="card-tags"
            >
              <span className="tag">{commodity}</span> &nbsp;
              <span className="tag">{scenario}</span> &nbsp;
              <span className="tag">{layertype}</span>
            </Typography>
          )}
          {title && (
            <Typography
              className="card-title"
              sx={{
                fontSize: "normal",
                margin: "8px",
                color: "#333333",
              }}
            >
              {title}
            </Typography>
          )}
        </div>

        {/* Hover Content */}
        <div className="card-hover-content">
          {description && (
            <Typography
              className="card-description"
              sx={{
                fontSize: 14,
                margin: "8px",
                marginRight: "45px",
                color: "#333333",
              }}
            >
              {description}
            </Typography>
          )}
          {source && (
            <Typography
              component="a"
              href={source}
              className="card-source"
              sx={{
                fontSize: 14,
                margin: "8px",
                color: "#8e918f",
              }}
            >
              {source}
            </Typography>
          )}
          {model && (
            <Typography
              sx={{
                fontSize: 14,
                margin: "8px",
                color: "#8e918f",
              }}
              className="card-model"
            >
              {model}
            </Typography>
          )}
          
          <div className="download-icon" onClick={onButtonClick}>
            <Tooltip title="Download" arrow>
            <IconButton>
              <DownloadIcon sx={{ fontSize: 18, color: "white", padding: 0}}/>
            </IconButton>
            </Tooltip>

          </div>
        </div>
      </div>
    </div>
  );
};
