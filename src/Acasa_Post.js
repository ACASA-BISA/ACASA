// Imports necessary libraries and components from Material UI for styling and functionality:
// React for building the component
// ChevronRightRounded icon for the "Find Out More" button
// Button, Card, CardContent, CardMedia, CardHeader, Typography components for layout and content
// Box component for managing layout with flexbox
// KeyboardArrowDownIcon icon (conditionally rendered)

import React from "react";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//Defines styles using Javascript objects for various image sizes used in the component.

export default function Card_Posts() {
  const [blogs, setBlogs] = React.useState(false);

  //This is the main component that returns JSX code for the blog posts section.
  //It uses a useState hook from React to manage the state of blogs (initially set to false). This state controls whether to show additional blog posts.

  return (
    <div
      style={{ marginLeft: "70px", marginTop: "15px", marginBottom: "15px" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "15px",
        }}
      >
        <Card
          sx={(theme) => ({
            maxWidth: "30%",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 4px rgba(255,255,255,0.2)"
                : "0 0 2px rgba(0,0,0,0.12)",
            borderRadius: 0,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:hover": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255,255,255,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.12)",
              transform: "scale(1.04)",
            },
          })}
        >
          <CardMedia
            image="/blognew1.png"
            sx={(theme) => ({
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.08)",
            })}
          />
          <CardHeader
            titleTypographyProps={{
              sx: { fontSize: "16px", fontWeight: "bold" },
              marginTop: 2,
            }}
            subheaderTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#81c784" : "#52911f",
              marginTop: 1,
              sx: { fontSize: "12px" },
            }}
            title="Greater successes through NARS partnerships"
            subheader="By Tess Russo, BMGF, Seattle, USA"
            sx={{ marginTop: -1, marginBottom: -1 }}
          />
          <CardContent sx={{ marginBottom: -4 }}>
            <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
              BISA has been an exemplary partner in building and supporting a
              strong ACASA team and establishing strong, financially supported
              partnerships with NARS.
            </Typography>
          </CardContent>
          <CardContent>
            <a
              href="https://bisa.org/greater-successes-through-nars-partnerships/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                color={"success"}
                fullWidth
                sx={{ mt: 3, textTransform: "initial" }}
              >
                Find Out More <ChevronRightRounded />
              </Button>
            </a>
          </CardContent>
        </Card>
        {/* The component uses a div with styles for margin. */}
        {/* Inner content is wrapped in a Box component with flexbox for responsive layout (different screen sizes). */}
        <Card
          sx={(theme) => ({
            maxWidth: "30%",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 4px rgba(255,255,255,0.2)"
                : "0 0 2px rgba(0,0,0,0.12)",
            borderRadius: 0,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:hover": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255,255,255,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.12)",
              transform: "scale(1.04)",
            },
          })}
        >
          <CardMedia
            image="/blognew2.jpeg"
            sx={(theme) => ({
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.08)",
            })}
          />
          <CardHeader
            titleTypographyProps={{
              sx: { fontSize: "16px", fontWeight: "bold" },
              marginTop: 2,
            }}
            subheaderTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#81c784" : "#52911f",
              marginTop: 1,
              sx: { fontSize: "12px" },
            }}
            title="Gridded crop modelling to simulate impacts of climate change and adaptation benefits in ACASA"
            subheader="By Anooja Thomas, University of Florida, USA; Apurbo K Chaki, BARI, Bangladesh; Gerrit Hoogenboom, University of Florida, USA; and S Naresh Kumar, ICAR-IARI, India"
            sx={{ marginTop: -1, marginBottom: -1 }}
          />
          <CardContent sx={{ marginBottom: -4 }}>
            <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
              Gridded crop modelling builds an understanding of how climate
              change impacts crops, helping researchers to adapt agricultural
              methods and combat food insecurity.
            </Typography>
          </CardContent>
          <CardContent>
            <a
              href="https://bisa.org/gridded-crop-modelling-to-simulate-impacts-of-climate-change-and-adaptation-benefits-in-acasa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                color={"success"}
                fullWidth
                sx={{ mt: 3, textTransform: "initial" }}
              >
                Find Out More <ChevronRightRounded />
              </Button>
            </a>
          </CardContent>
        </Card>
        {/* More Blogs" Button (Conditional):
A Box component is conditionally rendered based on the blogs state.
If blogs is false, it displays a button "More Blogs" with a down arrow icon.
Clicking the button triggers a function using onClick that sets blogs to true (showing more posts). */}

        <Card
          sx={(theme) => ({
            maxWidth: "30%",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 4px rgba(255,255,255,0.2)"
                : "0 0 2px rgba(0,0,0,0.12)",
            borderRadius: 0,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:hover": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255,255,255,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.12)",
              transform: "scale(1.04)",
            },
          })}
        >
          <CardMedia
            image="/blognew3.png"
            sx={(theme) => ({
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.08)",
            })}
          />
          <CardHeader
            titleTypographyProps={{
              sx: { fontSize: "16px", fontWeight: "bold" },
              marginTop: 2,
            }}
            subheaderTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#81c784" : "#52911f",
              marginTop: 1,
              sx: { fontSize: "12px" },
            }}
            title="Harnessing econometric and statistical tools to support climate-resilient agriculture"
            subheader="By Kaushik Bora, BISA-CIMMYT, India and Prem Chand, ICAR-NIAP, India"
            sx={{ marginTop: -1, marginBottom: -1 }}
          />
          <CardContent sx={{ marginBottom: -4 }}>
            <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
              Econometric and statistical methods lead to informed
              decision-making and safeguards agricultural productivity in the
              face of climatic hazards in South Asia{" "}
            </Typography>
          </CardContent>
          <CardContent>
            <a
              href="https://bisa.org/harnessing-econometric-and-statistical-tools-to-support-climate-resilient-agriculture/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                color={"success"}
                fullWidth
                sx={{ mt: 3, textTransform: "initial" }}
              >
                Find Out More <ChevronRightRounded />
              </Button>
            </a>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Card
          sx={(theme) => ({
            maxWidth: "30%",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 4px rgba(255,255,255,0.2)"
                : "0 0 2px rgba(0,0,0,0.12)",
            borderRadius: 0,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:hover": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255,255,255,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.12)",
              transform: "scale(1.04)",
            },
          })}
        >
          <CardMedia
            image="/blognew4.png"
            sx={(theme) => ({
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.08)",
            })}
          />
          <CardHeader
            titleTypographyProps={{
              sx: { fontSize: "16px", fontWeight: "bold" },
              marginTop: 2,
            }}
            subheaderTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#81c784" : "#52911f",
              marginTop: 1,
              sx: { fontSize: "12px" },
            }}
            title="Unlocking insights from literature: Exploring adaptation options in ACASA"
            subheader="By Aniket Deo, BISA-CIMMYT, India; Niveta Jain, ICAR-IARI, India; Roshan B Ojha, NARC, Nepal; and Sayla Khandoker, Bangladesh"
            sx={{ marginTop: -1, marginBottom: -1 }}
          />
          <CardContent sx={{ marginBottom: -4 }}>
            <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
              Using systematic literature review, ACASA has identified key
              climate adaptation options and assessed their effectiveness.
            </Typography>
          </CardContent>
          <CardContent>
            <a
              href="https://bisa.org/unlocking-insights-from-literature-exploring-adaptation-options-in-acasa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                color={"success"}
                fullWidth
                sx={{ mt: 3, textTransform: "initial" }}
              >
                Find Out More <ChevronRightRounded />
              </Button>
            </a>
          </CardContent>
        </Card>
        <Card
          sx={(theme) => ({
            maxWidth: "30%",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 4px rgba(255,255,255,0.2)"
                : "0 0 2px rgba(0,0,0,0.12)",
            borderRadius: 0,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:hover": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255,255,255,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.12)",
              transform: "scale(1.04)",
            },
          })}
        >
          <CardMedia
            image="/Blog-5.jpg"
            sx={(theme) => ({
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.08)",
            })}
          />
          <CardHeader
            titleTypographyProps={{
              sx: { fontSize: "16px", fontWeight: "bold" },
              marginTop: 2,
            }}
            subheaderTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#81c784" : "#52911f",
              marginTop: 1,
              sx: { fontSize: "12px" },
            }}
            title="A new Climate Adaptation Atlas to safeguard South Asian agriculture"
            subheader="By Bram Govaerts, DG, CIMMYT & BISA and Arun Kumar Joshi, CIMMYT Asia Regional Representative and MD BISA"
            sx={{ marginTop: -1, marginBottom: -1 }}
          />
          <CardContent sx={{ marginBottom: -4 }}>
            <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
              Climate change is no longer a distant threat but a reality that
              profoundly affects our lives. Among the most vulnerable regions to
              climate change, South Asia stands out because it is...
            </Typography>
          </CardContent>
          <CardContent>
            <a
              href="https://www.cimmyt.org/blogs/a-new-climate-adaptation-atlas-to-safeguard-south-asian-agriculture/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                color={"success"}
                fullWidth
                sx={{ mt: 3, textTransform: "initial" }}
              >
                Find Out More <ChevronRightRounded />
              </Button>
            </a>
          </CardContent>
        </Card>
        <Card
          sx={(theme) => ({
            maxWidth: "30%",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 4px rgba(255,255,255,0.2)"
                : "0 0 2px rgba(0,0,0,0.12)",
            borderRadius: 0,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:hover": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255,255,255,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.12)",
              transform: "scale(1.04)",
            },
          })}
        >
          <CardMedia
            image="/Blog-1.jpg"
            sx={(theme) => ({
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.08)",
            })}
          />
          <CardHeader
            titleTypographyProps={{
              sx: { fontSize: "16px", fontWeight: "bold" },
              marginTop: 2,
            }}
            subheaderTypographyProps={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#81c784" : "#52911f",
              marginTop: 1,
              sx: { fontSize: "12px" },
            }}
            title="Adaptation Atlas is a Positive Step Towards Climate Resilient Agriculture"
            subheader="By Himanshu Pathak, Secretary (DARE) and Director General - ICAR, India"
            sx={{ marginTop: -1, marginBottom: -1 }}
          />
          <CardContent sx={{ marginBottom: -4 }}>
            <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
              India holds an impressive record in agricultural production. We
              are among the largest producers of milk, pulses, tea, spices,
              cashew, jute, and bananas.{" "}
            </Typography>
          </CardContent>
          <CardContent>
            <a
              href="https://www.cimmyt.org/blogs/adaptation-atlas-is-a-positive-step-towards-climate-resilient-agriculture/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                color={"success"}
                fullWidth
                sx={{ mt: 3, textTransform: "initial" }}
              >
                Find Out More <ChevronRightRounded />
              </Button>
            </a>
          </CardContent>
        </Card>
      </Box>
      {blogs === false && (
        <Box sx={{ marginTop: "20px", marginRight: "85px" }}>
          <Button
            color={"success"}
            fullWidth
            sx={{ textTransform: "initial" }}
            onClick={() => setBlogs(true)}
          >
            <Typography sx={(theme) => ({ color: (theme) => theme.palette.mode === "dark" ? "#e0e0e0" : "#222"})}>More Blogs </Typography>
            <KeyboardArrowDownIcon sx={(theme) => ({ color: (theme) => theme.palette.mode === "dark" ? "#e0e0e0" : "#222"})} />
          </Button>
        </Box>
      )}
      {blogs && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Card
            sx={(theme) => ({
              maxWidth: "30%",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 0 4px rgba(255,255,255,0.2)"
                  : "0 0 2px rgba(0,0,0,0.12)",
              borderRadius: 0,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:hover": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(255,255,255,0.2)"
                    : "0 4px 20px rgba(0,0,0,0.12)",
                transform: "scale(1.04)",
              },
            })}
          >
            <CardMedia
              image="/Blog-2.jpg"
              sx={(theme) => ({
                width: "100%",
                height: 0,
                paddingBottom: "56.25%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(0, 0, 0, 0.08)",
              })}
            />
            <CardHeader
              titleTypographyProps={{
                sx: { fontSize: "16px", fontWeight: "bold" },
                marginTop: 2,
              }}
              subheaderTypographyProps={{
                color: "#52911f",
                marginTop: 1,
                sx: { fontSize: "12px" },
              }}
              title="Bangladesh to improve risk characterization at a granular level with Atlas"
              subheader="By Shaikh Mohammad Bokhtiar, Executive Chairman, BARC, Bangladesh"
              sx={{ marginTop: -1, marginBottom: -1 }}
            />
            <CardContent sx={{ marginBottom: -4 }}>
              <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
                Bangladesh is one of the most climate-vulnerable countries in
                the world. The climate risks are impacting the country’s
                agricultural sector, which constitutes nearly 12% of the
                country’s GDP.{" "}
              </Typography>
            </CardContent>
            <CardContent>
              <a
                href="https://www.cimmyt.org/blogs/bangladesh-to-improve-risk-characterization-at-a-granular-level-with-atlas/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  color={"success"}
                  fullWidth
                  sx={{ mt: 3, textTransform: "initial" }}
                >
                  Find Out More <ChevronRightRounded />
                </Button>
              </a>
            </CardContent>
          </Card>
          <Card
            sx={(theme) => ({
              maxWidth: "30%",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 0 4px rgba(255,255,255,0.2)"
                  : "0 0 2px rgba(0,0,0,0.12)",
              borderRadius: 0,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:hover": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(255,255,255,0.2)"
                    : "0 4px 20px rgba(0,0,0,0.12)",
                transform: "scale(1.04)",
              },
            })}
          >
            <CardMedia
              image="/Blog-3.jpg"
              sx={(theme) => ({
                width: "100%",
                height: 0,
                paddingBottom: "56.25%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(0, 0, 0, 0.08)",
              })}
            />
            <CardHeader
              titleTypographyProps={{
                sx: { fontSize: "16px", fontWeight: "bold" },
                marginTop: 2,
              }}
              subheaderTypographyProps={{
                color: "#52911f",
                marginTop: 1,
                sx: { fontSize: "12px" },
              }}
              title="Atlas crucial to strengthen Nepal’s capacity to cope with climate change"
              subheader="By Dhruba Raj Bhattarai, Executive Director, NARC, Nepal"
              sx={{ marginTop: -1, marginBottom: -1 }}
            />
            <CardContent sx={{ marginBottom: -4 }}>
              <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
                Nepal, like other South Asian nations, faces significant
                environmental challenges, including climate change and air
                pollution. The impacts of climate change in Nepal are
                profound...{" "}
              </Typography>
            </CardContent>
            <CardContent>
              <a
                href="https://www.cimmyt.org/blogs/atlas-crucial-to-strengthen-nepals-capacity-to-cope-with-climate-change/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  color={"success"}
                  fullWidth
                  sx={{ mt: 3, textTransform: "initial" }}
                >
                  Find Out More <ChevronRightRounded />
                </Button>
              </a>
            </CardContent>
          </Card>
          <Card
            sx={(theme) => ({
              maxWidth: "30%",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 0 4px rgba(255,255,255,0.2)"
                  : "0 0 2px rgba(0,0,0,0.12)",
              borderRadius: 0,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:hover": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(255,255,255,0.2)"
                    : "0 4px 20px rgba(0,0,0,0.12)",
                transform: "scale(1.04)",
              },
            })}
          >
            <CardMedia
              image="/Blog-4.jpg"
              sx={(theme) => ({
                width: "100%",
                height: 0,
                paddingBottom: "56.25%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(0, 0, 0, 0.08)",
              })}
            />
            <CardHeader
              titleTypographyProps={{
                sx: { fontSize: "16px", fontWeight: "bold" },
                marginTop: 2,
              }}
              subheaderTypographyProps={{
                color: "#52911f",
                marginTop: 1,
                sx: { fontSize: "12px" },
              }}
              title="Climate Adaptation Atlas will support evidence-based solutions in Sri Lanka"
              subheader="By P. Malathy, DG-Agriculture, Sri Lanka"
              sx={{ marginTop: -1, marginBottom: -1 }}
            />
            <CardContent sx={{ marginBottom: -4 }}>
              <Typography sx={{ textAlign: "justify", fontSize: "14px" }}>
                We are all aware the immense challenges countries face due to
                climate change, particularly its impacts on vital sectors like
                agriculture, forestry and livestock.{" "}
              </Typography>
            </CardContent>
            <CardContent>
              <a
                href="https://www.cimmyt.org/news/climate-adaptation-atlas-will-support-evidence-based-solutions-in-sri-lanka/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  color={"success"}
                  fullWidth
                  sx={{ mt: 3, textTransform: "initial" }}
                >
                  Find Out More <ChevronRightRounded />
                </Button>
              </a>
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}

// First Row of Blog Posts:

// Renders three Card components in a row using a Box with flexbox.
// Each Card has styles for width, box shadow, hover effect, and responsiveness.
// CardMedia component displays the blog post image with a placeholder aspect ratio.
// CardHeader displays the title, subheader (author information), and custom styles for margins.
// CardContent holds the blog post description and a "Find Out More" button.
// Typography component displays the blog description text with justification and font size styles.
// Button component with "success" color, full width, custom styles, and hover effect.
// The button links to the blog post using an anchor tag with:
// href attribute for the blog post URL.
// target="_blank" to open the link in a new tab.
// rel="noopener noreferrer" for security reasons.

// Second Row of Blog Posts (Conditional):
// Another Box component with flexbox is conditionally rendered based on the blogs state.
// If blogs is true, it displays three more Card components in a similar structure as the first row.
