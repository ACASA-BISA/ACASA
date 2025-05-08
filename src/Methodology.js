import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Divider, Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const Methodology = () => {
  const mode = useContext(ThemeContext);
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const bgColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;
  const sectionBg = theme.palette.mode === "dark" ? "#2a2f35" : "#f5f5f5";
  const titleColor = theme.palette.primary.main;

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ px: { xs: 3, md: 6 }, py: 5, backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}>
      <Typography variant="h3" sx={{ color: titleColor, mb: 1 }}>
        Methodology
      </Typography>
      <Divider sx={{ mb: 4, maxWidth: 200, backgroundColor: theme.palette.divider }} />

      <Box sx={{ mb: 4, p: 3, backgroundColor: sectionBg, borderRadius: 2, maxWidth: 800 }}>
        <Typography variant="h5" sx={{ color: titleColor, mb: 1 }}>
          Data Collection
        </Typography>
        <Typography variant="body1">
          We sourced geospatial datasets from trusted organizations and remote sensing platforms. This included satellite-based climate data, land use records, and national agricultural statistics.
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 3, backgroundColor: sectionBg, borderRadius: 2, maxWidth: 800 }}>
        <Typography variant="h5" sx={{ color: titleColor, mb: 1 }}>
          Processing & Classification
        </Typography>
        <Typography variant="body1">
          Raster layers were processed using Python and classified into suitability levels using literature-backed thresholds. When applicable, hazard overlays were integrated to adjust
          classifications.
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 3, backgroundColor: sectionBg, borderRadius: 2, maxWidth: 800 }}>
        <Typography variant="h5" sx={{ color: titleColor, mb: 1 }}>
          Validation
        </Typography>
        <Typography variant="body1">All results were validated against field data and government reports to ensure regional relevance and scientific accuracy.</Typography>
      </Box>

      {/* Coming Soon Popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ backgroundColor: bgColor, color: titleColor }}>Coming Soon</DialogTitle>
        <DialogContent sx={{ backgroundColor: bgColor }}>
          <Typography variant="body1" sx={{ mb: 2, color: textColor }}>
            This page is under development and will be available soon. Stay tuned!
          </Typography>
          <Box sx={{ textAlign: "right" }}>
            <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: titleColor, color: "#000" }}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Methodology;
