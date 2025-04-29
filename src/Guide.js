import React, { useContext, useState } from "react";
import { Box, Grid, Paper, Typography, Divider, Link, Button, Modal, Backdrop, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "./ThemeContext";

const lastModified = new Date();
const formattedDate = lastModified.toLocaleString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -100; // scroll up by 100px to offset fixed headers
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Guidee = () => {
  const { mode } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (src) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={(theme) => ({ p: 4, backgroundColor: theme.palette.background.paper, paddingTop: "100px" })}>
      <Grid container spacing={4}>
        {/* Left Pane - TOC */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={4}
            sx={(theme) => ({
              p: 2,
              height: "100vh",
              backgroundColor: theme.palette.background.default,
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#444" : "#ddd"}`,
              position: "sticky",
              top: 0, // Add this to define how far from the top the sticky element should be
              zIndex: 10, // Increase z-index if necessary
              boxShadow: theme.palette.mode === "dark" ? "0px 4px 15px rgba(0, 0, 0, 0.5)" : "0px 4px 15px rgba(0, 0, 0, 0.1)",
            })}
          >
            <Typography variant="h6" align="left" gutterBottom sx={{ color: "text.primary", fontFamily: "revert" }}>
              Table of Contents
            </Typography>
            <Box component="nav" align="left">
              <Button onClick={() => scrollTo("home")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                1. Home
              </Button>
              <Button onClick={() => scrollTo("appbar")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                2. Navigation bar
              </Button>
              <Button onClick={() => scrollTo("explore-data")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                3. Explore Data
              </Button>
              <Button onClick={() => scrollTo("drawers")} sx={{ pl: 3, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                3.1. Drawers
              </Button>
              <Button onClick={() => scrollTo("map-viewer")} sx={{ pl: 3, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                3.2. Map viewer
              </Button>
              <Button onClick={() => scrollTo("select-risk")} sx={{ pl: 3, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                3.3. Selecting risks
              </Button>
              <Button onClick={() => scrollTo("select-adaptation")} sx={{ pl: 3, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                3.4. Selecting adaptation options
              </Button>
              <Button onClick={() => scrollTo("data-glance")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                4. Data at a glance
              </Button>
              <Button onClick={() => scrollTo("hazard-glance")} sx={{ pl: 3, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                4.1 Hazards at a glance
              </Button>
              <Button onClick={() => scrollTo("adaptation-glance")} sx={{ pl: 3, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                4.2 Adaptation at a glance
              </Button>
              <Button onClick={() => scrollTo("data-access")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                5. Data Access
              </Button>
              <Button onClick={() => scrollTo("use-cases")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                6. Use Cases
              </Button>
              <Button onClick={() => scrollTo("resources")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                7. Resources
              </Button>
              <Button onClick={() => scrollTo("aboutus")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                8. About Us
              </Button>
              <Button onClick={() => scrollTo("feedback")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                9. Feedback
              </Button>
              <Button onClick={() => scrollTo("theme")} sx={{ pl: 1, color: "text.secondary", fontFamily: "revert", textTransform: "none", justifyContent: "flex-start" }} fullWidth>
                10. Theme toggle
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Content Pane */}
        <Grid item xs={12} md={9}>
          <Typography variant="h4" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert", fontWeight: "bold" }}>
            ACASA User Guide
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            align="left"
            sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "#444" : "#e0e0e0", px: 1, py: 0.5, borderRadius: 1, color: "text.secondary", fontFamily: "revert" })}
          >
            Last modified on {formattedDate}
          </Typography>

          <Box mt={4}>
            <Typography id="home" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              1. Home
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="appbar" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              2. Navigation bar
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum.
            </Typography>
            <Box
              component="img"
              src={mode === "dark" ? "Guide/appbar-dark.png" : "Guide/appbar.png"}
              alt="Explore data"
              sx={(theme) => ({
                width: "80%",
                maxHeight: 400,
                objectFit: "cover",
                my: 2,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 1. </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet
              elementum in, iaculis sed urna. Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Fusce leo lorem, pulvinar id ex a, fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 2, my: 4 }}>
            {/* Left column: Image 1 stacked above Image 2 */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                component="img"
                src={mode === "dark" ? "Guide/appbar-hover1-dark.png" : "Guide/appbar-hover1.png"}
                alt="Image 1"
                sx={(theme) => ({
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 1,
                  boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
                })}
              />
              <Box
                component="img"
                src={mode === "dark" ? "Guide/appbar-hover2-dark.png" : "Guide/appbar-hover2.png"}
                alt="Image 2"
                sx={(theme) => ({
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 1,
                  boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
                })}
              />
            </Box>

            {/* Right column: Image 3 stretching full height */}
            <Box
              component="img"
              src="Guide/translate.png"
              alt="Image 3"
              sx={(theme) => ({
                width: 150,
                height: 215, // height of Image 1 + Image 2 + gap
                objectFit: "cover",
                borderRadius: 1,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
          </Box>

          <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
            <strong>Figure 2. </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum
            in, iaculis sed urna. Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo
            lorem, pulvinar id ex a, fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum.
          </Typography>

          <Box mt={4}>
            <Typography id="explore-data" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              3. Explore data
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <br />
            <Box
              component="img"
              src={mode === "dark" ? "Guide/explore-dark.png" : "Guide/explore.png"}
              alt="Explore data"
              onClick={() => setOpen(true)}
              sx={(theme) => ({
                width: "90%",
                maxHeight: 400,
                objectFit: "cover",
                my: 2,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="drawers" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              3.1. Drawers
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <br />

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", my: 4 }}>
              {Array.from({ length: 7 }).map((_, index) => {
                const src = mode === "dark" ? `/Guide/drawer-dark${index + 1}.png` : `/Guide/drawer${index + 1}.png`;
                return (
                  <Box
                    key={index}
                    sx={(theme) => ({
                      flex: "1 1 10%",
                      maxWidth: "10%",
                      aspectRatio: "370 / 620",
                      overflow: "hidden",
                      borderRadius: 1,
                      boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
                      cursor: "pointer",
                    })}
                    onClick={() => handleOpen(src)}
                  >
                    <Box
                      component="img"
                      src={src}
                      alt={`Image ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>

            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "90%",
                  maxHeight: "90%",
                  outline: "none",
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={handleClose}
                  sx={{
                    "position": "absolute",
                    "top": 8,
                    "right": 8,
                    "color": "#fff",
                    "backgroundColor": "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Full Image */}
                <Box
                  component="img"
                  src={selectedImage}
                  alt="Selected"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: 24,
                  }}
                />
              </Box>
            </Modal>

            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="map-viewer" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              3.3. Map viewer
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <br />

            <Box
              component="img"
              src={mode === "dark" ? "Guide/map-array-dark1.png" : "Guide/map-array1.png"}
              alt="Explore data"
              sx={(theme) => ({
                flex: "1 1 60%",
                maxWidth: "60%",
                aspectRatio: 1426 / 856,
                objectFit: "cover",
                my: 2,
                borderRadius: 1,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />

            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", my: 4 }}>
              {Array.from({ length: 2 }).map((_, index) => {
                const src = mode === "dark" ? `/Guide/map-array-dark${index + 2}.png` : `/Guide/map-array${index + 2}.png`;
                return (
                  <Box
                    key={index}
                    sx={(theme) => ({
                      flex: "1 1 45%",
                      maxWidth: "45%",
                      aspectRatio: "1684 / 620",
                      overflow: "hidden",
                      borderRadius: 1,
                      boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
                      cursor: "pointer",
                    })}
                    onClick={() => handleOpen(src)}
                  >
                    <Box
                      component="img"
                      src={src}
                      alt={`Image ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>

            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "90%",
                  maxHeight: "90%",
                  outline: "none",
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={handleClose}
                  sx={{
                    "position": "absolute",
                    "top": 8,
                    "right": 8,
                    "color": "#fff",
                    "backgroundColor": "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Full Image */}
                <Box
                  component="img"
                  src={selectedImage}
                  alt="Selected"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: 24,
                  }}
                />
              </Box>
            </Modal>

            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="select-risk" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              3.3. Selecting risks
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <br />
            <Box
              component="img"
              src={mode === "dark" ? "Guide/risk-dark.png" : "Guide/risk.png"}
              alt="Explore data"
              onClick={() => setOpen(true)}
              sx={(theme) => ({
                flex: "1 1 80%",
                maxWidth: "80%",
                aspectRatio: "1901 / 736",
                objectFit: "cover",
                my: 2,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="select-adaptation" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              3.3. Selecting adaptation options
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <br />
            <Box
              component="img"
              src={mode === "dark" ? "Guide/adapt-dark.png" : "Guide/adapt.png"}
              alt="Explore data"
              onClick={() => setOpen(true)}
              sx={(theme) => ({
                flex: "1 1 80%",
                maxWidth: "80%",
                aspectRatio: "1901 / 720",
                objectFit: "cover",
                my: 2,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="data-glance" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              4. Data at a glance
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography id="hazard-glance" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              4.1. Hazards at a glance
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <br />
            <Box
              component="img"
              src={mode === "dark" ? "Guide/hazard-glance-dark.png" : "Guide/hazard-glance.png"}
              alt="Explore data"
              onClick={() => setOpen(true)}
              sx={(theme) => ({
                flex: "1 1 7%",
                maxWidth: "70%",
                aspectRatio: "1582 / 954",
                objectFit: "cover",
                my: 2,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography id="adaptation-glance" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              4.2. Adaptation at a glance
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <Box
              component="img"
              src={mode === "dark" ? "Guide/adapt-glance-dark.png" : "Guide/adapt-glance.png"}
              alt="Explore data"
              onClick={() => setOpen(true)}
              sx={(theme) => ({
                flex: "1 1 70%",
                maxWidth: "70%",
                aspectRatio: "1582 / 954",
                objectFit: "cover",
                my: 3,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start", // Align at top
                gap: 2,
                flexWrap: "wrap", // Allows wrapping if screen is too small
                my: 2,
                //my: 4,
              }}
            >
              <Box
                component="img"
                src={mode === "dark" ? "Guide/adapt-drop-dark1.png" : "Guide/adapt-drop1.png"}
                alt="Explore data"
                onClick={() => setOpen(true)}
                sx={(theme) => ({
                  flex: "1 1 20%",
                  maxWidth: "20%",
                  aspectRatio: "308 / 194",
                  objectFit: "cover",
                  my: 2,
                  borderRadius: 2,
                  boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
                })}
              />
              <Box
                component="img"
                src={mode === "dark" ? "Guide/adapt-drop-dark2.png" : "Guide/adapt-drop2.png"}
                alt="Explore data"
                onClick={() => setOpen(true)}
                sx={(theme) => ({
                  flex: "1 1 20%",
                  maxWidth: "20%",
                  aspectRatio: "300 / 450",
                  objectFit: "cover",
                  my: 2,
                  borderRadius: 2,
                  boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
                })}
              />
            </Box>

            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="data-access" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              5. Data access
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <Box
              component="img"
              src={mode === "dark" ? "Guide/data-access-dark.png" : "Guide/data-access.png"}
              alt="Explore data"
              onClick={() => setOpen(true)}
              sx={(theme) => ({
                flex: "1 1 70%",
                maxWidth: "70%",
                aspectRatio: "1507 / 742",
                objectFit: "cover",
                my: 3,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography id="use-cases" variant="h6" gutterBottom align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              6. Use Cases
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet facilisis viverra. Nam quis mollis lorem. Vestibulum ex nibh, tincidunt sit amet elementum in, iaculis sed urna.
              Suspendisse pellentesque volutpat ligula ut varius. Morbi posuere posuere eros vitae commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo lorem, pulvinar id ex a,
              fringilla porta elit. Mauris rhoncus ipsum eget varius pellentesque. In sed interdum magna. Mauris luctus velit vel quam ultrices elementum. Quisque convallis sem in leo vulputate
              iaculis.
            </Typography>
            <Box
              component="img"
              src={mode === "dark" ? "Guide/use-case-dark.png" : "Guide/use-case.png"}
              alt="Explore data"
              onClick={() => setOpen(true)}
              sx={(theme) => ({
                flex: "1 1 70%",
                maxWidth: "70%",
                aspectRatio: "1920 / 500",
                objectFit: "cover",
                my: 3,
                borderRadius: 2,
                boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.3)" : 3,
              })}
            />
            <Typography variant="body2" align="left" sx={{ color: "text.primary", fontFamily: "revert" }}>
              <strong>Figure 3. </strong>Integer egestas, neque eu fermentum pharetra, nisl orci fringilla erat, a facilisis justo diam semper dui. Fusce et tempus eros. Nullam eget facilisis massa.
              Duis tempus dui nec congue auctor. Aliquam in hendrerit eros. Etiam sagittis ante nec nisl dictum placerat. Nam suscipit lacus quis eros tempor mollis. Nulla vitae turpis eget magna
              varius porttitor nec et turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam et blandit nunc, sed posuere felis.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Guidee;

/*import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { ReactTyped } from "react-typed";
import zIndex from "@mui/material/styles/zIndex";

// Define a component for the heading with a typewriter effect
const headingA = () => {
  return (
    <Box sx={headingBoxStyle}>
      <Typography
        sx={{
          fontSize: "34px",
          fontWeight: "bold",
          fontFamily: "Playfair Display",
          color: (theme) => (theme.palette.mode === "dark" ? "#6dd769" : "#4ba046"),
        }}
      >
        {" "}
        <ReactTyped strings={["How to use the Atlas?", "Your Navigation Buddy"]} typeSpeed={100} loop backSpeed={20} cursorChar="|" showCursor={true} />
      </Typography>
    </Box>
  );
};

// Styles for the heading box
const headingBoxStyle = {
  position: "relative",
  width: "fit-content",
  
  left: "10px",
  zIndex: 1000,
  backgroundColor: (theme) => theme.palette.background.default,
  padding: "10px",
  borderRadius: "8px",
  boxShadow: (theme) =>
    theme.palette.mode === "dark"
      ? "0px 0px 10px rgba(255, 255, 255, 0.1)" // Lighter shadow in dark mode
      : "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

// Styles for the timeline event images
const logoStyle = {
  width: "29vw",
  height: "16vw",
  margin: "10px",
  marginBottom: "8px",
  padding: "5px",
  border: (theme) => `3px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  borderRadius: "8px",
};

// Base styles for the tooltip boxes
const tooltipBoxStyleBase = {
  "padding": "20px",
  "border": (theme) => `1px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  "height": "auto",
  "width": "25vw",
  "position": "relative",
  "borderRadius": "8px",
  "boxShadow": (theme) => (theme.palette.mode === "dark" ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)"),
  "transition": "0.3s cubic-bezier(.47,1.64,.41,.8)",
  "&:hover": {
    boxShadow: (theme) => (theme.palette.mode === "dark" ? "0 4px 20px rgba(255, 255, 255, 0.15)" : "0 4px 20px rgba(0,0,0,0.12)"),
    transform: "scale(1.05)",
  },
};

// Styles for left-pointing arrow
const arrowStyleLeft = {
  content: '""',
  position: "absolute",
  top: "50%",
  left: "-10px",
  transform: "translateY(-50%)",
  width: "0",
  height: "0",
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderRight: (theme) => `10px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  filter: (theme) => `drop-shadow(1px 0 1px ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"})`,
};

// Styles for right-pointing arrow
const arrowStyleRight = {
  content: '""',
  position: "absolute",
  top: "50%",
  right: "-10px",
  transform: "translateY(-50%)",
  width: "0",
  height: "0",
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderLeft: (theme) => `10px solid ${theme.palette.mode === "dark" ? "#71c96d" : "#4b9e44"}`,
  filter: (theme) => `drop-shadow(1px 0 1px ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"})`,
};

// Main Guide component to render the timeline with events
export default function Guidee() {
  const events = [
    {
      step: "Step 1",
      img: "/timelineA.png",
      title: "Landing Page",
      subtitle: "Navigating the ACASA website",
      description:
        "To explore the comprehensive data available on the ACASA website, visit www.acasa-bisa.org. Click on the yellow Explore button or select your desired region from the drop-down menu. Additionally, choose the specific commodity you wish to access data for from the adjacent drop-down menu, and then click the green Explore button to proceed.",
      link: "/#/",
    },
    {
      step: "Step 2",
      img: "/timelineB.png",
      title: "Explore Data",
      subtitle: "Navigating the advanced Data Viewer",
      description:
        "Upon clicking the Explore button or selecting the Explore Data tab in the navigation bar, you will be seamlessly redirected to the South Asian Atlas, preconfigured with rice as the default commodity and the baseline scenario. Rest assured, you have the flexibility to customize your exploration by selecting your desired commodity, country, and state. Additionally, you can change your visualisation criteria by adjusting various parameters such as risk, impact, scenario, and adaptation using the options available in the vertical navigation bar.",
      link: "/#/viewer",
    },
    {
      step: "Step 3",
      img: "/timelineC.png",
      title: "Adaptation at a glance",
      subtitle: "Accessing the comprehensive Adaptation options of the Atlas",
      description:
        "Select the Adaptation at a glance Tab from the navigation bar to obtain a summarized view of the Atlas for any commodity and specific region. This section provides an overview of the Atlas based on various adaptation options and hazard index.",
      link: "/#/analytics",
    },
    {
      step: "Step 4",
      img: "/timelineD.png",
      title: "Data Access",
      subtitle: "Accessing the Data Access section",
      description:
        "Click the fourth tab in the navigation bar to navigate to the Data Access section. To obtain specific data sources or datasets, click the [Data Description] Tab. Additionally, by hovering over and clicking the [Data Description] tab, you can download datasets or reports for any commodity’s hazard or layer, or review the methodology used to compute the results.",
      link: "/#/access",
    },
    {
      step: "Step 5",
      img: "/timelineE.png",
      title: "Use Cases",
      subtitle: "Navigating the Use Cases Tab",
      description:
        "Click the fifth tab in the navigation bar to access the Use Cases section. Select the desired use case from the array of sub-buttons. Or the slides automatically changes & takes you to the desired Use-Case slide. Put the cursor on the desired slide to read and view the literature and pause the drifting",
      link: "/#/usecase",
    },
    {
      step: "Step 6",
      img: "/timelineG.png",
      title: "Resources",
      subtitle: "Exploring the Resources",
      description:
        "Click the sixth tab in the navigation bar to access the Resources section. Here, you can explore various options from the sub-navigation bar, such as blogs in ACASA Posts authored under the ACASA canopy, to know the latest inside deets about ACASA read the newsletter updates in ACASA Strides.",
      link: "#/resources",
    },
    {
      step: "Step 7",
      img: "/timelineF.png",
      title: "About Us",
      subtitle: "Know more from About Us",
      description:
        "Click the seventh tab in the navigation panel & visit the About Us tab to know more about ACASA-our approach, workstreams, Our developement partners- Investors, Partners in South Asia, External Partners, Other South Asian Partners & contributors, ACASA Advisory Panel, Country Team Leads & Core team.",
      link: "#/about",
    },
    {
      step: "Step 8",
      img: "/timelineH.png",
      title: "Feedback",
      subtitle: "Your Valuable Feedback",
      description:
        "Click the eighth tab in the navigation panel to provide us with your valuable feedback. Click on the Green Feedback form Button which will redirect you to a google form link where you can tell us about your experience & expectation from the website,",
      link: "#/feedback",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          minHeight: "100vh",
          width: "100%",
          position: "absolute",
        }}
      >
        <Box sx={{ paddingTop: "100px"}}>
          {headingA()}
          <Timeline position="alternate">
            {events.map((event, index) => {
              const isLeftSide = index % 2 !== 0; // Determines if it's on the left

              const tooltipBoxStyle = {
                ...tooltipBoxStyleBase,
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? (isLeftSide ? "#2f6742" : "#25292e") : index % 2 === 0 ? "#fff" : "#e0ebeb"), // Keep light mode unchanged
                color: (theme) => (theme.palette.mode === "dark" && isLeftSide ? "#fff" : "inherit"),
              };
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ mt: "15px" }}
                    align={index % 2 === 0 ? "right" : "left"}
                    variant="body2"
                    color={(theme) => (theme.palette.mode === "dark" ? "#ddd" : "text.secondary")}
                  >
                    <Typography color={(theme) => (theme.palette.mode === "dark" ? "#fff" : "#111")} fontSize={24}>
                      <strong>{event.step}</strong>
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <img src={event.img} style={logoStyle} alt={`Timeline${index + 1}`} />
                    <TimelineConnector />
                    <Box
                      sx={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#6dd769" : "#4b9e44"),
                        borderRadius: "50%",
                        marginTop: "8px",
                      }}
                    />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Box sx={tooltipBoxStyle}>
                      <Box sx={index % 2 === 0 ? arrowStyleLeft : arrowStyleRight}></Box>
                      <Typography
                        variant="h5"
                        component="span"
                        sx={{
                          color: (theme) => (theme.palette.mode === "dark" ? "#81c784" : "#4b9e44"),
                          fontWeight: "bold",
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          lineHeight: "22px",
                          fontSize: "18px",
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? isLeftSide
                                ? "#fff" // White text on green background
                                : "#e0e0e0" // Light gray text on dark background
                              : "#333333",
                          mt: "10px",
                        }}
                      >
                        {event.subtitle}
                      </Typography>
                      <Typography
                        sx={{
                          mt: "10px",
                          fontSize: "15px",
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? isLeftSide
                                ? "#fff" // White text on green background
                                : "#e0e0e0" // Light gray text on dark background
                              : "inherit",
                        }}
                      >
                        {event.description}
                      </Typography>
                      <Typography
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? isLeftSide
                                ? "#fff" // White text on green background
                                : "#ddd" // Slightly lighter text on dark background
                              : "#444444",
                          marginTop: "10px",
                        }}
                      >
                        <Box
                          component="a"
                          href={event.link}
                          target="_self"
                          rel="noopener noreferrer"
                          sx={{
                            "fontWeight": "bold",
                            "color": (theme) => (theme.palette.mode === "dark" ? "#81c784" : "#333333"),
                            "textDecoration": "none",
                            "&:hover": {
                              textDecoration: "underline", // Optional hover effect
                            },
                          }}
                        >
                          Click Here
                        </Box>
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Box>
      </Box>
    </div>
  );
}*/
